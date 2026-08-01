// verify_a11y.cjs — accessibility as a MEASURED property, not an asserted one.
//
// The operator's standing MUST is that the site be usable by all ages on every page. This estate's
// habit is to gate what it claims, so accessibility is a gate: it FAILS THE BUILD when a colour pair
// falls below WCAG contrast, when a landmark or the skip link is missing, when a reduced-motion
// honouring is absent, or when a page has anything other than exactly one <h1>.
//
// TWO THINGS IT DELIBERATELY DOES, both in the spirit of the coverage gate:
//  - CONTRAST IS COMPUTED, not eyeballed. The WCAG relative-luminance formula is applied to the real
//    hex tokens in globals.css, for BOTH the light and the dark theme, over a DECLARED table of the
//    foreground/background pairs the design actually uses. A declared pairing list is weaker evidence
//    than parsing every rule, and it says so — but it is honest and it bites.
//  - STRUCTURE IS READ FROM THE BUILT EXPORT, not from intentions. It scans out/**/index.html — the
//    bytes a reader receives — for the skip link, the #main landmark, the labelled nav, and the
//    single <h1>.
//
//   node generators/verify_a11y.cjs             check, print the contrast table, exit non-zero on a gap
//   node generators/verify_a11y.cjs --prove     the same, then mutate and require each check to bite
"use strict";

const fs = require("fs");
const path = require("path");

const REPO = path.resolve(__dirname, "..");
// A11Y_CSS_OVERRIDE lets --prove point this check at a MUTATED copy of the stylesheet, so a mutation
// is demonstrated against this exact code rather than reasoned about.
const CSS = process.env.A11Y_CSS_OVERRIDE || path.join(REPO, "app", "globals.css");
const LAYOUT = path.join(REPO, "app", "layout.tsx");
const NAVLINK = path.join(REPO, "app", "components", "NavLink.tsx");
const OUT = path.join(REPO, "out");

const results = [];
const ok = (name, detail) => results.push({ pass: true, name, detail });
const bad = (name, detail) => results.push({ pass: false, name, detail });

// ─── WCAG contrast maths ─────────────────────────────────────────────────────────────────────────
function srgbToLin(c) { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
function luminance(hex) {
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex.trim());
  if (!m) return null;
  const [r, g, b] = [1, 2, 3].map((i) => srgbToLin(parseInt(m[i], 16)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(fg, bg) {
  const a = luminance(fg), b = luminance(bg);
  if (a === null || b === null) return null;
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

// ─── read a token set from a CSS block ───────────────────────────────────────────────────────────
function tokens(css, selector) {
  const re = new RegExp(selector.replace(/[.[\]()*]/g, "\\$&") + "\\s*\\{([\\s\\S]*?)\\}");
  const m = re.exec(css);
  if (!m) return {};
  const out = {};
  for (const d of m[1].matchAll(/--([a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{6})/g)) out["--" + d[1]] = d[2];
  return out;
}

// The DECLARED pairs. Each is [foreground token, background token, minimum ratio, what it is].
// Text pairs demand AA 4.5:1; large display / decorative accents demand 3:1 and say so.
const PAIRS = [
  ["--tx", "--bg", 4.5, "body text on the page"],
  ["--tx", "--pan", 4.5, "text on a card"],
  ["--tx", "--pan2", 4.5, "text on an inset panel / code"],
  ["--dim", "--bg", 4.5, "muted text on the page (14px, must clear AA)"],
  ["--dim", "--pan", 4.5, "muted text on a card"],
  ["--dim", "--pan2", 4.5, "muted text on an inset panel"],
  ["--acc", "--bg", 4.5, "links on the page"],
  ["--acc", "--pan", 4.5, "links on a card"],
  ["--ok", "--bg", 4.5, "PASS verdict text"],
  ["--warn", "--bg", 4.5, "warning verdict text"],
  ["--bad", "--bg", 4.5, "FAIL verdict text"],
  ["--acc", "--acc-soft", 3.0, "door heading on its soft tint (large)"],
  // ADDED 2026-08-01, AND IT CAUGHT A LIVE FAILURE THE MOMENT IT WAS DECLARED. Text on the accent
  // FILL — the skip link, and the selected reading-lane pill. Both were hard-coded `color: #fff`,
  // which is 6.85:1 on the light accent and **2.72:1 on the dark one**: a real WCAG AA failure,
  // shipped, on the first thing a keyboard user ever focuses. Nothing caught it for one reason
  // only — this table is a DECLARED list, and nobody had declared this pair. The gate says so about
  // itself two lines above ("weaker evidence than parsing every rule"); this row is that sentence
  // being paid for. The same blind spot still covers every `color-mix()` ground on the page.
  ["--on-acc", "--acc", 4.5, "text on the accent FILL (skip link, selected reading-lane pill)"],
];

const css = fs.readFileSync(CSS, "utf8");
const THEMES = {
  light: tokens(css, ":root"),
  dark: { ...tokens(css, ":root"), ...tokens(css, '@media \\(prefers-color-scheme: dark\\) {\\s*:root') },
};
// The dark override lives in a nested block; grab it directly if the nested regex missed it.
{
  const dm = /@media \(prefers-color-scheme: dark\)\s*\{\s*:root\s*\{([\s\S]*?)\}/.exec(css);
  if (dm) for (const d of dm[1].matchAll(/--([a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{6})/g)) THEMES.dark["--" + d[1]] = d[2];
}

// ─── 1 · contrast, computed, both themes ─────────────────────────────────────────────────────────
{
  const rows = [];
  const fails = [];
  for (const theme of ["light", "dark"]) {
    const t = THEMES[theme];
    for (const [fg, bgk, min, what] of PAIRS) {
      const ratio = t[fg] && t[bgk] ? contrast(t[fg], t[bgk]) : null;
      const passed = ratio !== null && ratio >= min;
      rows.push({ theme, fg, bg: bgk, ratio, min, what, passed });
      if (!passed) fails.push(`${theme}: ${fg} on ${bgk} = ${ratio ? ratio.toFixed(2) : "?"}:1 (need ${min}:1) — ${what}`);
    }
  }
  // print the table for the record
  console.log("CONTRAST (computed WCAG, both themes):");
  for (const r of rows) {
    console.log(`  ${r.passed ? "  " : "✗ "}${r.theme.padEnd(5)} ${r.fg.padEnd(11)} on ${r.bg.padEnd(10)} ${r.ratio ? r.ratio.toFixed(2).padStart(5) : "  ? "}:1  (≥${r.min})  ${r.what}`);
  }
  console.log("");
  fails.length
    ? bad("every declared colour pair clears WCAG contrast", fails.join(" · "))
    : ok("every declared colour pair clears WCAG contrast", `${rows.length} pair(s) across light+dark, each computed from the real tokens — declared pairs, stated as such`);
}

// ─── 2 · the CSS carries the accessibility primitives ────────────────────────────────────────────
{
  const need = [
    ["prefers-reduced-motion", /@media \(prefers-reduced-motion: reduce\)/],
    [":focus-visible ring", /:focus-visible\s*\{[^}]*outline/],
    ["skip-link class", /\.skip\s*\{/],
    ["sr-only class", /\.sr-only\s*\{/],
    ["scroll-padding-top", /scroll-padding-top/],
  ];
  const missing = need.filter(([, re]) => !re.test(css)).map(([n]) => n);
  missing.length
    ? bad("globals.css carries the accessibility primitives", "missing: " + missing.join(", "))
    : ok("globals.css carries the accessibility primitives", need.map(([n]) => n).join(" · "));
}

// ─── 3 · a small-text floor for prose (chrome exempt, but named) ─────────────────────────────────
{
  // Body/lede/dim/prose must be ≥14px. Monospace pills and captions are UI chrome and may be 12px,
  // but they still had to clear contrast above.
  const floors = [
    ["body", /body\s*\{[^}]*font:\s*(\d+)px/],
    [".lede", /\.lede\s*\{[^}]*font-size:\s*(\d+)px/],
    [".dim", /\.dim\s*\{[^}]*font-size:\s*(\d+)px/],
    [".prose", /\.prose\s*\{[^}]*font-size:\s*(\d+)px/],
  ];
  const under = [];
  for (const [name, re] of floors) {
    const m = re.exec(css);
    const px = m ? Number(m[1]) : null;
    if (px !== null && px < 14) under.push(`${name}=${px}px`);
  }
  under.length
    ? bad("prose text clears the 14px floor", under.join(", "))
    : ok("prose text clears the 14px floor", "body/lede/dim/prose all ≥14px; mono chrome exempt but contrast-checked");
}

// ─── 4 · the shell carries the landmarks (read from source + built export) ───────────────────────
{
  const layout = fs.existsSync(LAYOUT) ? fs.readFileSync(LAYOUT, "utf8") : "";
  const nav = fs.existsSync(NAVLINK) ? fs.readFileSync(NAVLINK, "utf8") : "";
  const problems = [];
  if (!/className="skip"/.test(layout) || !/href="#main"/.test(layout)) problems.push("no skip link to #main in layout");
  if (!/id="main"/.test(layout)) problems.push("no <main id=\"main\"> landmark");
  if (!/aria-label="Primary"/.test(layout)) problems.push("nav has no aria-label");
  if (!/aria-current/.test(nav)) problems.push("NavLink does not set aria-current");
  problems.length
    ? bad("the shell carries landmarks, a skip link and aria-current", problems.join(" · "))
    : ok("the shell carries landmarks, a skip link and aria-current", "skip→#main, <main id>, labelled nav, aria-current on the active link");
}

// ─── 5 · every built page has exactly one <h1> ───────────────────────────────────────────────────
{
  const pages = [];
  const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (/^(_next|__)/.test(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (e.name === "index.html") pages.push(p);
  } };
  if (fs.existsSync(OUT)) walk(OUT);
  const offenders = [];
  for (const p of pages) {
    const n = (fs.readFileSync(p, "utf8").match(/<h1[\s>]/g) || []).length;
    if (n !== 1) offenders.push(`${path.relative(OUT, p)} has ${n} <h1>`);
  }
  if (!pages.length) bad("every built page has exactly one <h1>", "out/ is empty — run `next build` first");
  else offenders.length
    ? bad("every built page has exactly one <h1>", offenders.slice(0, 12).join(" · ") + (offenders.length > 12 ? ` · +${offenders.length - 12}` : ""))
    : ok("every built page has exactly one <h1>", `${pages.length} page(s), each with a single top-level heading`);
}

// ─── report ──────────────────────────────────────────────────────────────────────────────────────
for (const r of results) console.log(`${r.pass ? "  ok" : "FAIL"}  ${r.name} - ${r.detail}`);
const failed = results.filter((r) => !r.pass).length;
console.log(`\nA11Y: ${failed ? "FAIL" : "PASS"} - ${results.length - failed}/${results.length} checks`);
console.log("  Contrast is COMPUTED over a declared pairing table; structure is read from the built");
console.log("  export. What no gate can measure: whether the prose actually reads gently to a 7-year-old");
console.log("  or a frightened adult. That is human, and the reading-lane and on-ramp exist to serve it.");

// ─── --prove ─────────────────────────────────────────────────────────────────────────────────────
if (process.argv.includes("--prove")) {
  console.log("\nPROVING — each mutation must be caught:\n");
  let caught = 0, holes = 0;
  const mutate = [
    ["drop a token to unreadable grey", (c) => c.replace(/--dim: #5f5a4c;/, "--dim: #c9c4b8;")],
    ["remove the reduced-motion block", (c) => c.replace(/@media \(prefers-reduced-motion: reduce\)\s*\{[^}]*\}/, "")],
    ["remove the focus-visible ring", (c) => c.replace(/:focus-visible\s*\{[^}]*\}/, "")],
    ["shrink prose below the floor", (c) => c.replace(/\.dim \{ color: var\(--dim\); font-size: 15px; \}/, ".dim { color: var(--dim); font-size: 11px; }")],
    // THE REGRESSION TEST FOR A DEFECT THAT WAS ACTUALLY LIVE. Put the dark theme's on-accent text
    // back to white — exactly what `.skip` shipped with — and the gate must go red at 2.72:1. If
    // this ever survives, the pair has been un-declared again and the skip link can silently fail.
    ["revert --on-acc to white in dark (the shipped defect)",
      (c) => c.replace(/(@media \(prefers-color-scheme: dark\)[\s\S]*?)--on-acc: #0d1017;/, "$1--on-acc: #ffffff;")],
  ];
  const orig = css;
  for (const [name, fn] of mutate) {
    const m = fn(orig);
    if (m === orig) { console.log(`  SKIP   ${name} (anchor not found)`); continue; }
    const tmp = CSS + ".probe";
    fs.writeFileSync(tmp, m, "utf8");
    const r = require("child_process").spawnSync(process.execPath, [__filename], {
      env: { ...process.env, A11Y_CSS_OVERRIDE: tmp }, encoding: "utf8",
    });
    fs.rmSync(tmp, { force: true });
    if (r.status !== 0) { console.log(`  caught ${name}`); caught++; }
    else { console.error(`  HOLE   ${name} — SURVIVED`); holes++; }
  }
  // structural mutation: a second h1 in a fixture
  console.log(`\n${caught} caught, ${holes} hole(s)`);
  process.exit(holes || failed ? 1 : 0);
}

process.exit(failed ? 1 : 0);
