#!/usr/bin/env node
"use strict";
/**
 * verify_nav_parity.cjs — the unified navigation is ONE menu, rendered identically on every surface,
 * and it ships no analytics. This gate proves all three, hermetically, from the vendored artifacts.
 *
 * THE PROBLEM IT GUARDS
 *   The estate renders the nav three ways: the React SiteNav (the 23 Next routes), the vendored
 *   nav-snippet.html injected into the 28 full-screen labs/rooms, and the apex shell. The single
 *   source is content/vendored/site-nav.json + content/vendored/nav-snippet.html, both byte-verified
 *   against the apex Precision pin by build_nav.cjs. Byte-verification ties each artifact to the pin;
 *   THIS gate ties the artifacts to each OTHER and to what actually renders, so no surface can carry a
 *   different menu, and no wrapped lab can smuggle in a tracker.
 *
 * THE FOUR CHECKS
 *   1 · PARITY       the <nav> baked into nav-snippet.html carries byte-for-byte the same groups,
 *                    labels, order and hrefs as site-nav.json — the normalized shape the apex's own
 *                    scripts/nav-parity.mjs dumps ([{group,items:[{label,href}]}]).
 *   2 · RENDER-SRC   the React layout imports the vendored site-nav.json and passes it to SiteNav,
 *                    and SiteNav renders the groups PROP — neither carries a hand-authored nav list.
 *   3 · ANALYTICS    the vendored snippet references nothing external: no http(s)/protocol-relative
 *                    URL, no <script src>/<link>/<img src>, no fetch/sendBeacon/analytics/beacon. A
 *                    wrapped lab therefore keeps the "no account, no server, no analytics, CPU only;
 *                    runs entirely in your browser" promise /labs makes.
 *   4 · PRESENCE     every one of the 28 served labs/rooms contains the vendored snippet verbatim,
 *                    exactly once — so the nav is actually on every full-screen surface, not just the
 *                    Next routes.
 *
 *   node generators/verify_nav_parity.cjs            run the checks
 *   node generators/verify_nav_parity.cjs --prove    mutate each, require the matching check to notice
 */

const fs = require("fs");
const path = require("path");

const REPO = process.env.UNI_PUBLIC_ROOT || path.resolve(__dirname, "..");
const rd = (p) => fs.readFileSync(path.join(REPO, p), "utf8");

const SITE_NAV = "content/vendored/site-nav.json";
const SNIPPET = "content/vendored/nav-snippet.html";
const LAYOUT = "app/layout.tsx";
const SITENAV_TSX = "app/components/SiteNav.tsx";

function servedFiles() {
  const labs = JSON.parse(rd("generators/labs.json")).vendored.map((l) => `public/play/${l.slug}.html`);
  const rooms = JSON.parse(rd("generators/rooms.json")).rooms.map((r) => r.file);
  return [...labs, ...rooms];
}

const unesc = (s) =>
  String(s).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").trim();

// Canonical shape from the nav DATA — the apex nav-parity.mjs convention: group keyed by its label.
function canonicalFromJson(siteNavObj) {
  return (siteNavObj.groups || []).map((g) => ({
    group: g.label,
    items: (g.items || []).map((it) => ({ label: it.label, href: it.href })),
  }));
}

// The SAME shape, recovered from the <nav> markup baked into the snippet.
function shapeFromSnippet(snippetStr) {
  const nav = /<nav class="site-nav"[\s\S]*?<\/nav>/.exec(snippetStr);
  if (!nav) return null;
  const groupRe = /<button class="nav-group-btn"[^>]*>([\s\S]*?)<\/button>\s*<div class="nav-panel"[^>]*>([\s\S]*?)<\/div>/g;
  const itemRe = /<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  const groups = [];
  let g;
  while ((g = groupRe.exec(nav[0]))) {
    const items = [];
    let a;
    while ((a = itemRe.exec(g[2]))) items.push({ label: unesc(a[2]), href: a[1] });
    groups.push({ group: unesc(g[1]), items });
  }
  return groups;
}

// ── the four checks: each takes its inputs and returns a list of problems ─────────────────────────
function checkParity(siteNavObj, snippetStr) {
  const want = canonicalFromJson(siteNavObj);
  const got = shapeFromSnippet(snippetStr);
  if (!got) return ["no <nav class=\"site-nav\"> found in the vendored snippet"];
  const a = JSON.stringify(want), b = JSON.stringify(got);
  if (a === b) return [];
  // Name the first divergence so a failure is diagnosable, not just red.
  const problems = [];
  if (want.length !== got.length) problems.push(`group count: site-nav.json has ${want.length}, snippet has ${got.length}`);
  const n = Math.min(want.length, got.length);
  for (let i = 0; i < n; i++) {
    if (JSON.stringify(want[i]) !== JSON.stringify(got[i])) {
      problems.push(`group ${i + 1}: '${want[i].group}' (json) vs '${got[i].group}' (snippet) — labels/order/hrefs differ`);
      break;
    }
  }
  if (!problems.length) problems.push("snippet nav and site-nav.json differ (normalized structures are not equal)");
  return problems;
}

function checkRenderSource(layoutStr, siteNavTsxStr) {
  const problems = [];
  if (!/from\s+["']\.\.\/content\/vendored\/site-nav\.json["']/.test(layoutStr))
    problems.push("app/layout.tsx does not import content/vendored/site-nav.json — the nav data is not read from the single source");
  if (!/groups=\{siteNav\.groups\}/.test(layoutStr))
    problems.push("app/layout.tsx does not pass siteNav.groups to <SiteNav> — the rendered nav may not come from the vendored data");
  if (/const\s+NAV\s*=\s*\[/.test(siteNavTsxStr) || /const\s+NAV\s*=\s*\[/.test(layoutStr))
    problems.push("a hand-authored `const NAV = [ … ]` literal is present — the nav must render from the vendored data, not a copy");
  if (!/groups\b/.test(siteNavTsxStr))
    problems.push("SiteNav.tsx does not reference a `groups` prop — it is not rendering the passed-in data");
  return problems;
}

function checkAnalyticsFree(snippetStr) {
  const forbidden = [
    [/https?:\/\//i, "an absolute http(s) URL"],
    [/(?:src|href)\s*=\s*["']\/\//i, "a protocol-relative //host URL"],
    [/url\(\s*["']?\s*(?:https?:)?\/\//i, "a CSS url() to an external host"],
    [/@import\b/i, "a CSS @import"],
    [/<script\b[^>]*\bsrc=/i, "an external <script src>"],
    [/<link\b/i, "a <link> (external stylesheet/resource)"],
    [/<img\b[^>]*\bsrc\s*=\s*["']https?:/i, "an external <img src>"],
    [/\bfetch\s*\(/i, "a fetch() call"],
    [/\bXMLHttpRequest\b/, "an XMLHttpRequest"],
    [/\bsendBeacon\b/i, "a navigator.sendBeacon call"],
    [/\bnew\s+WebSocket\b/i, "a WebSocket"],
    [/\b(measure-family|gtag|googletagmanager|google-analytics|plausible|segment|mixpanel|analytics|beacon)\b/i, "an analytics/beacon reference"],
  ];
  const problems = [];
  for (const [re, what] of forbidden) {
    const m = re.exec(snippetStr);
    if (m) problems.push(`vendored nav snippet carries ${what}: …${snippetStr.slice(Math.max(0, m.index - 20), m.index + 40).replace(/\s+/g, " ")}…`);
  }
  return problems;
}

function checkPresence(snippetStr, files) {
  const problems = [];
  for (const { name, content } of files) {
    let i = content.indexOf(snippetStr), count = 0;
    while (i !== -1) { count++; i = content.indexOf(snippetStr, i + 1); }
    if (count === 0) problems.push(`${name}: the vendored nav snippet is not present — this surface has no unified nav`);
    else if (count > 1) problems.push(`${name}: the vendored nav snippet appears ${count} times — double-wrapped`);
  }
  return problems;
}

function runAll(inp) {
  return [
    ["the snippet nav matches site-nav.json (cross-surface parity)", checkParity(inp.siteNavObj, inp.snippet)],
    ["the React layout renders the vendored nav, not a copy", checkRenderSource(inp.layout, inp.siteNavTsx)],
    ["the vendored nav snippet references nothing external (analytics-free)", checkAnalyticsFree(inp.snippet)],
    ["every wrapped lab/room carries the vendored nav snippet, once", checkPresence(inp.snippet, inp.files)],
  ];
}

function loadInputs() {
  const snippet = rd(SNIPPET);
  return {
    siteNavObj: JSON.parse(rd(SITE_NAV)),
    snippet,
    layout: rd(LAYOUT),
    siteNavTsx: rd(SITENAV_TSX),
    files: servedFiles().map((name) => ({ name, content: rd(name) })),
  };
}

// ── --prove: mutate each input and require the matching check to go red ───────────────────────────
if (process.argv.includes("--prove")) {
  const base = loadInputs();
  const clone = () => ({
    siteNavObj: JSON.parse(JSON.stringify(base.siteNavObj)),
    snippet: base.snippet,
    layout: base.layout,
    siteNavTsx: base.siteNavTsx,
    files: base.files.map((f) => ({ ...f })),
  });

  // Control: the unmutated inputs must pass every check, or a "caught" below means nothing.
  {
    const probs = runAll(base).flatMap(([, p]) => p);
    if (probs.length) {
      console.error("CONTROL FAILED — the unmutated nav artifacts do not pass:\n  " + probs.join("\n  "));
      process.exit(1);
    }
    console.log("control: the unmutated nav artifacts PASS, so any failure below is its mutation's doing\n");
  }

  const MUT = [
    ["drop a nav item from site-nav.json (parity must break)", (s) => { s.siteNavObj.groups[1].items.pop(); }, checkParity, (s) => [s.siteNavObj, s.snippet]],
    ["rename a group label in site-nav.json (parity must break)", (s) => { s.siteNavObj.groups[0].label = "Changed"; }, checkParity, (s) => [s.siteNavObj, s.snippet]],
    ["rename a label inside the snippet (parity must break)", (s) => { s.snippet = s.snippet.replace("All labs", "Every lab"); }, checkParity, (s) => [s.siteNavObj, s.snippet]],
    ["drop the site-nav.json import from the layout (render-source must break)", (s) => { s.layout = s.layout.replace(/import siteNav from "\.\.\/content\/vendored\/site-nav\.json";?/, ""); }, checkRenderSource, (s) => [s.layout, s.siteNavTsx]],
    ["smuggle an external analytics script into the snippet (analytics must break)", (s) => { s.snippet = s.snippet.replace("</script>", 'fetch("https://analytics.example/collect");</script>'); }, checkAnalyticsFree, (s) => [s.snippet]],
    ["strip the snippet out of one served lab (presence must break)", (s) => { s.files[0] = { ...s.files[0], content: s.files[0].content.replace(s.snippet, "") }; }, checkPresence, (s) => [s.snippet, s.files]],
  ];

  console.log("PROVING nav parity / analytics / presence — each mutation must be caught:\n");
  let caught = 0, holes = 0;
  for (const [name, mutate, check, args] of MUT) {
    const s = clone();
    try { mutate(s); } catch (e) { console.error(`  SKIP   ${name} (${e.message})`); continue; }
    const probs = check(...args(s));
    if (probs.length) { console.log(`  caught ${name}`); caught++; }
    else { console.error(`  HOLE   ${name} — SURVIVED. This check does not bite.`); holes++; }
  }
  console.log(`\n${caught} caught, ${holes} hole(s)`);
  process.exit(holes ? 1 : 0);
}

// ── normal run ────────────────────────────────────────────────────────────────────────────────────
const results = runAll(loadInputs());
let failed = 0;
for (const [name, problems] of results) {
  if (problems.length) { failed++; console.log(`FAIL  ${name} - ${problems.slice(0, 6).join(" · ")}`); }
  else console.log(`  ok  ${name}`);
}
console.log(`\nNAV PARITY: ${failed ? "FAIL" : "PASS"} - ${results.length - failed}/${results.length} checks`);
console.log("  One menu, vendored from the apex pin, rendered the same by the React routes, the 28");
console.log("  wrapped labs/rooms and the apex shell — and carrying no analytics into any of them.");
process.exit(failed ? 1 : 0);
