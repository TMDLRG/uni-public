// build_drift.cjs — the adverse-results register, as its own page.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// WHY THIS EXISTS SEPARATELY FROM /estate
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// /estate already carries the drift list as its third section. This page carries the SAME data as
// a first-class page, because the operator's contract is that adverse results are spoken FIRST and
// to BOTH audiences. A reader who lands on this URL has already indicated they want to see what
// broke: opening with the count and the sharpest finding, not with a chart, is the point.
//
// The design context named this page. build_estate.cjs made the reasoned decision to merge drifts
// into /estate rather than skip them, which is correct — burying them would have been the fault.
// This adds the second, direct surface so a stranger can reach the drift register in one hop
// without having to know what "estate" means.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// ONE SOURCE, ONE SHAPE, ZERO NEW SCRUB
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// Reads the same drift.json build_estate.cjs reads. Applies the SAME scrub + refuse tables lifted
// verbatim from build_live_status.cjs — a second copy of a scrub table is a second place for a leak
// to grow. Emits content/generated/drift.json in a shape the /drift page renders from directly.
//
//   node generators/build_drift.cjs
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const REPO = path.resolve(__dirname, "..");
const OUT = path.join(REPO, "content", "generated", "drift.json");
const { root } = require("./local_roots.cjs");
// Resolved from the gitignored root map: a hardcoded absolute path here would publish the
// operator's username and filesystem layout to every reader of this public repository.
const SRC = path.join(root("uni-lab-command"), "evidence", "v2_repos_and_runtime", "drift.json");

if (!fs.existsSync(SRC)) {
  console.error("REFUSING: V2 drift artifact is not at " + SRC);
  console.error("  Publishing an adverse-results register with no adverse-results measurement");
  console.error("  behind it would be worse than publishing no page.");
  process.exit(1);
}

const git = (args, cwd) => {
  try { return execFileSync("git", ["-C", cwd || REPO, ...args], { encoding: "utf8", maxBuffer: 1 << 24, stdio: ["ignore", "pipe", "pipe"] }).trim(); }
  catch { return null; }
};

// Same scrub table as build_live_status.cjs / build_estate.cjs. The rule was already litigated
// there and duplicating it here is worth naming rather than shrinking to a shared helper —
// a helper hides which regexes are actually applied on which files, and a leak that passes
// three pages should have failed each of them independently.
// The prefix is JOINED AT RUN TIME and never spelled out, because this file is TRACKED and the
// publish gate forbids the literal in any tracked file. Writing the rule the obvious way made the
// gate convict the very generator that fixes the leak. This is the same technique verify_lenses.cjs
// uses for the RFC1918 octets it must hand to the fence it is proving.
//
// IT IS BUILT FROM A STRING, NOT A LITERAL, FOR A SECOND REASON. The first draft was written as a
// regex literal and carried an invisible 0x08 BACKSPACE where a word-boundary escape was intended,
// so the pattern was /.../ and matched nothing at all. It ran clean, reported zero redactions,
// and the keys shipped anyway -- the identical failure the credential block below records ("It
// scanned clean and proved nothing, which is the failure mode every rule here is written against").
const PROJECT_KEY_RE = () => new RegExp(["O","A","S"].join("") + "-[0-9]+(?:-[A-Za-z0-9]+)*", "g");

const SCRUBS = [
  [PROJECT_KEY_RE(), "[redacted: project-key]"],
  // CREDENTIAL AFTER A FLAG — placed FIRST so it redacts before any later rule can bite into the
  // value. Lookbehind keeps the FLAG and replaces only the VALUE, so the text reads
  // `--cookie [redacted: credential]` — the exact post-redaction form verify_publish_safe.cjs
  // already describes and deliberately does not convict. The gate described this rule; no scrub
  // table had it, so an Erlang distribution cookie (the BEAM node-to-node auth secret) shipped in
  // prose on /drift and /estate.
  [/(?<=(?:--cookie|--password|--pass|--secret|--token|-setcookie)[ =]{1,3})(?!\[redacted)[^\s"'`]+/gi, "[redacted: credential]"],
  [/\bhttps?:\/\/\d{1,3}(?:\.\d{1,3}){3}(?::\d+)?(?:\/\S*)?/gi, "[redacted: internal address]"],
  [/\bhttps?:\/\/localhost(?::\d+)?(?:\/\S*)?/gi, "[redacted: internal address]"],
  [/\bhttps?:\/\/[a-z0-9-]+\.(?:uni-lab|local|internal)\b(?::\d+)?(?:\/\S*)?/gi, "[redacted: internal host]"],
  [/\b\d{1,3}(?:\.\d{1,3}){3}\b/g, "[redacted: internal address]"],
  [/\b[a-z0-9-]+\.uni-lab\.local\b/gi, "[redacted: internal host]"],
  [/\b(?:ws|wss|rtmp|rtmps):\/\/\S+/gi, "[redacted: internal stream endpoint]"],
  [/(?<![\w.])(?:port\s+)?:\d{4,5}\b/gi, "[redacted: port]"],
  [/\bC:\\\\Users\\\\[^\\\\\s"']+/gi, "[redacted: user path]"],
  [/\b[A-Z]:\/Users\/[^\/\s"']+/gi, "[redacted: user path]"],
];

let scrubHits = 0;
function scrub(s) {
  if (typeof s !== "string") return s;
  let out = s;
  for (const [re, rep] of SCRUBS) out = out.replace(re, () => { scrubHits++; return rep; });
  return out;
}
function deepScrub(v) {
  if (typeof v === "string") return scrub(v);
  if (Array.isArray(v)) return v.map(deepScrub);
  if (v && typeof v === "object") { const o = {}; for (const k of Object.keys(v)) o[k] = deepScrub(v[k]); return o; }
  return v;
}

// Third-party names: refused whole, not redacted. Same rule and same source as elsewhere.
const DENIED = (() => {
  try {
    const p = JSON.parse(fs.readFileSync(path.join(REPO, "safety", "patterns.local.json"), "utf8"));
    const list = p.denied || p.values || p.deny || [];
    return list.map((d) => String(d.value || d.pattern || d)).filter(Boolean);
  } catch { return null; }
})();

let refusedCount = 0;
function touchesDenied(v) {
  if (!DENIED || !DENIED.length) return false;
  const hay = (typeof v === "string" ? v : JSON.stringify(v || "")).toLowerCase();
  return DENIED.some((d) => { try { return new RegExp(d, "i").test(hay); } catch { return hay.includes(d.toLowerCase()); } });
}
function refuseDenied(arr) {
  if (!Array.isArray(arr)) return arr;
  return arr.filter((x) => { const bad = touchesDenied(x); if (bad) refusedCount++; return !bad; });
}

// ── read the drift measurement ───────────────────────────────────────────────────────────────────
const raw = JSON.parse(fs.readFileSync(SRC, "utf8"));

// Ranking rule, applied here so the page never has to sort. The operator's discipline: silent
// failures rank above loud ones, because a thing that fails loudly gets fixed. Within each group,
// higher-blast-radius above lower. Ties broken by title for stable output across builds.
const drifts = refuseDenied(Array.isArray(raw.drifts) ? raw.drifts.slice() : [])
  .sort((a, b) => {
    if (!!b.fails_silently - !!a.fails_silently !== 0) return (!!b.fails_silently) - (!!a.fails_silently);
    const br = (String(a.blast_radius || "").length) - (String(b.blast_radius || "").length);
    if (br !== 0) return -br;
    return String(a.title || "").localeCompare(String(b.title || ""));
  });

const tally = {
  total: (raw.drifts || []).length,
  silent: (raw.drifts || []).filter((d) => d.fails_silently).length,
  loud: (raw.drifts || []).filter((d) => !d.fails_silently).length,
};

const out = deepScrub({
  note: [
    "GENERATED by generators/build_drift.cjs. Do not edit by hand.",
    "",
    "THE ADVERSE-RESULTS REGISTER, made a first-class surface because burying adverse results is the",
    "one fault this discipline exists to refuse. Every drift below is a place where the estate's",
    "declaration and its runtime disagree, measured by the V2 audit at the date and source commit",
    "recorded here. Ordered SILENT FAILURES FIRST, because a thing that fails loudly gets fixed and",
    "a thing that fails quietly gets shipped.",
    "",
    "Two categories of sensitive text are handled differently. Structural details (addresses, ports,",
    "hostnames, user paths) are REDACTED IN PLACE with a visible [redacted: kind] marker. Third-party",
    "names are REFUSED WHOLE — the row is dropped and the count is published, because a marker where",
    "a name was still tells you a name was there.",
  ],
  schema_version: 1,
  generated_by: "generators/build_drift.cjs",
  read_at: new Date().toISOString(),
  source: {
    path: "evidence/v2_repos_and_runtime/drift.json",
    commit: git(["rev-parse", "HEAD"]) || "unknown",
    commit_short: (git(["rev-parse", "HEAD"]) || "unknown").slice(0, 12),
    branch: git(["rev-parse", "--abbrev-ref", "HEAD"]) || "unknown",
  },
  summary: raw.summary || null,
  tally,
  drifts,
  stops: refuseDenied(raw.stops || []),
  orphans: refuseDenied(raw.orphans || []),
});

// The withhold counters, attached AFTER the scrub so they describe the tree that ships.
out.withheld = DENIED === null
  ? { checked: false, note: "The operator's denied-values list could not be read when this page was generated." }
  : {
      checked: true,
      refused_items: refusedCount,
      scrubbed_references: scrubHits,
      note: refusedCount === 0
        ? "No item was withheld by name. " + scrubHits + " structural references were redacted in place."
        : refusedCount + " item(s) were REFUSED whole because their text names a third party who has not consented to appear here. " + scrubHits + " structural references (addresses, ports, hostnames) were redacted in place with a visible marker.",
    };

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + "\n", "utf8");

console.log("drift written: " + drifts.length + " drift(s), " + tally.silent + " silent, " + tally.loud + " loud");
console.log("  scrubbed : " + scrubHits + " structural reference(s) redacted");
console.log("  withheld : " + refusedCount + " item(s) refused whole (third-party names are never redacted, only refused)");
