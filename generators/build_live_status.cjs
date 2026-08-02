// build_live_status.cjs — publish THE PLAN, so the public can follow along while the work happens.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// WHY THIS EXISTS
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// The operator's directive, given live on air on 2026-08-02: "the plan LIVE and update the tracks
// and all on the LIVE website so the public IS following along in real and live status."
//
// Until now the site published finished things — documents, gates, coverage, omissions. It published
// no answer to the two questions a stranger watching the broadcast actually has: *what are they
// doing right now*, and *what is left*. That answer already exists as a machine artifact —
// `evidence/remediation/phase9_plan.json` in the source estate is the single source of truth for the
// remediation programme, rendered live by the operator's private TRACK surface and projected by Gaia.
// It was simply never projected OUTWARD. This projects it.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// THE HONESTY PROBLEM, AND HOW IT IS SOLVED RATHER THAN FUDGED
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// This site is a STATIC EXPORT. It has no backend and no runtime fetch (CSP `default-src 'self'`).
// So a page here CANNOT know what is true right now, and a page that said "LIVE" while showing a
// week-old figure would be exactly the defect this estate has already been caught committing: its
// own governing banner once carried a gate tally that was false 176 seconds after it was written,
// in the present tense.
//
// The resolution is to be precise about WHICH of the two things is live:
//
//   * THE PLAN is live in the only sense a plan can be — it is read from the plan FILE at build
//     time, never transcribed, and the commit and timestamp it was read at are stamped on the page.
//     When a step completes the file changes and this page changes with it. No number here is typed.
//   * THE SYSTEM STATE is live only on the BROADCAST, where an honest health line and a full-frame
//     status board ride on the program feed, generated every six seconds from the same health probe
//     the operator's own private panel reads. That is genuinely live and genuinely public.
//
// The page says both of those things in plain words rather than implying a liveness it cannot have.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// WHAT IS DELIBERATELY NOT PUBLISHED
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// The plan file is an INTERNAL working artifact and it names internal surfaces. Every string that
// reaches this output is scrubbed of host addresses, loopback URLs, internal hostnames and port
// numbers before it is written (`scrub()`), because "publish the plan" must not become "publish a
// route into the estate". The scrub is applied to EVERY string in the tree, not to a chosen subset,
// so a new field added to the plan upstream cannot leak by being forgotten here.
//
// The watch link is NOT guessed. If the operator has declared one in `distribution.json` it is
// published; if he has not, the page says so. A guessed URL on a public page is a fabrication.
//
//   node generators/build_live_status.cjs
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const REPO = path.resolve(__dirname, "..");
const OUT = path.join(REPO, "content", "generated", "live_status.json");
const ROOTS_FILE = path.join(__dirname, "roots.local.json");

if (!fs.existsSync(ROOTS_FILE)) {
  console.error("REFUSING: generators/roots.local.json is absent, so the plan file cannot be read.");
  console.error("  Publishing a plan page with no plan behind it is worse than publishing no page.");
  process.exit(1);
}
const ROOTS = JSON.parse(fs.readFileSync(ROOTS_FILE, "utf8")).roots;
const MC = ROOTS["uni-minecraft"];
const PLAN = path.join(MC, "evidence", "remediation", "phase9_plan.json");

if (!fs.existsSync(PLAN)) {
  console.error(`REFUSING: the plan file is not at ${path.relative(MC, PLAN)} in the source estate.`);
  process.exit(1);
}

const git = (args, cwd = MC) => {
  try { return execFileSync("git", ["-C", cwd, ...args], { encoding: "utf8", maxBuffer: 1 << 24, stdio: ["ignore", "pipe", "pipe"] }).trim(); }
  catch { return null; }
};

// ─── the scrub ───────────────────────────────────────────────────────────────────────────────────
// Applied to every string in the published tree. Each pattern replaces with a VISIBLE marker rather
// than deleting, because a silent deletion changes the meaning of a sentence while looking clean,
// and the reader cannot tell that something was taken out. The house convention elsewhere on this
// site is exactly this: `[redacted: kind]`.
const SCRUBS = [
  [/\bhttps?:\/\/\d{1,3}(?:\.\d{1,3}){3}(?::\d+)?(?:\/\S*)?/gi, "[redacted: internal address]"],
  [/\bhttps?:\/\/localhost(?::\d+)?(?:\/\S*)?/gi, "[redacted: internal address]"],
  [/\bhttps?:\/\/[a-z0-9-]+\.(?:uni-lab|local|internal)\b(?::\d+)?(?:\/\S*)?/gi, "[redacted: internal host]"],
  [/\b\d{1,3}(?:\.\d{1,3}){3}\b/g, "[redacted: internal address]"],
  [/\b[a-z0-9-]+\.uni-lab\.local\b/gi, "[redacted: internal host]"],
  [/\b(?:ws|wss|rtmp|rtmps):\/\/\S+/gi, "[redacted: internal stream endpoint]"],
  [/(?<![\w.])(?:port\s+)?:\d{4,5}\b/gi, "[redacted: port]"],
];

// ─── the REFUSAL, which is a different act from the scrub above and must stay different ──────────
// The scrub REDACTS structural shapes — an address, a port — replacing them with a visible marker,
// because the sentence still means something without them.
//
// The operator's denied values are NOT redacted. They are third-party names, and the house rule is
// absolute: they are always REFUSED, never redacted. A marker reading "[redacted: name]" still tells
// a reader that a name was there and invites them to work out whose, and a sentence built around a
// removed name is often still identifying. So any ITEM whose text touches a denied value is dropped
// whole.
//
// It is dropped LOUDLY. The count ships and the page states it, because an omission nobody is told
// about is indistinguishable from there being nothing to omit — and this site's whole claim is that
// it publishes what it cannot show as well as what it can.
//
// Measured 2026-08-02: the first build of this page shipped TWO such items into out/live/index.html
// and verify_publish_safe.cjs caught them at the export scan. The generator's own scrub did not,
// because it only knew about shapes. That is the fence working exactly as designed, and it is the
// reason the denied list is loaded here rather than trusted to be handled upstream.
const DENIED = (() => {
  try {
    const p = JSON.parse(fs.readFileSync(path.join(REPO, "safety", "patterns.local.json"), "utf8"));
    const list = p.denied || p.values || p.deny || [];
    return list.map((d) => String(d.value || d.pattern || d)).filter(Boolean);
  } catch {
    return null;   // null, not [] — "could not check" must not look like "checked and clean"
  }
})();

let refusedCount = 0;
function touchesDenied(v) {
  if (!DENIED || !DENIED.length) return false;
  const hay = (typeof v === "string" ? v : JSON.stringify(v || "")).toLowerCase();
  return DENIED.some((d) => {
    try { return new RegExp(d, "i").test(hay); } catch { return hay.includes(d.toLowerCase()); }
  });
}
function refuseDenied(arr) {
  if (!Array.isArray(arr)) return arr;
  const kept = arr.filter((x) => {
    const bad = touchesDenied(x);
    if (bad) refusedCount++;
    return !bad;
  });
  return kept;
}

let scrubHits = 0;
function scrub(s) {
  if (typeof s !== "string") return s;
  let out = s;
  for (const [re, rep] of SCRUBS) {
    out = out.replace(re, () => { scrubHits++; return rep; });
  }
  return out;
}

// Walk EVERY string in the structure. A field-by-field scrub would leak the first time the plan
// upstream grows a field nobody remembered to add here.
function deepScrub(v) {
  if (typeof v === "string") return scrub(v);
  if (Array.isArray(v)) return v.map(deepScrub);
  if (v && typeof v === "object") {
    const o = {};
    for (const k of Object.keys(v)) o[k] = deepScrub(v[k]);
    return o;
  }
  return v;
}

// ─── read the plan ───────────────────────────────────────────────────────────────────────────────
const raw = JSON.parse(fs.readFileSync(PLAN, "utf8"));

const STATUS_ORDER = ["DONE", "IN_PROGRESS", "NEXT", "PLANNED", "BLOCKED", "OPERATOR", "STANDING"];

const tally = {};
const stages = (raw.stages || []).map((st) => {
  const steps = (st.steps || []).map((s) => {
    tally[s.status] = (tally[s.status] || 0) + 1;
    return {
      id: s.id,
      title: s.title,
      status: s.status,
      // p3/p4 are the plan's own prediction/falsifier fields. They are the most valuable thing in
      // the file for a reader trying to judge whether this is science or theatre, so they ship.
      prediction: s.p3 || null,
      falsifier: s.p4 || null,
      artifact: s.artifact || null,
      // The digest ships but the local filesystem path does not — `found` is a boolean about this
      // machine and means nothing to a reader.
      sha256: s.sha256 || null,
      builds: Array.isArray(s.builds)
        ? s.builds.map((b) => ({ id: b.id, title: b.title || null, status: b.status || null }))
        : null,
    };
  });
  return {
    id: st.id,
    name: st.name || st.title || null,
    status: st.status || null,
    why: st.why || null,
    checkpoint: st.checkpoint || null,
    steps,
  };
});

const totalSteps = stages.reduce((n, s) => n + s.steps.length, 0);

// ─── the last measured gate figures, taken from the SIBLING artifact, never recomputed here ──────
// build_gates.cjs runs the real runner and that takes minutes of CPU. This generator must be safe to
// run while the estate is broadcasting, so it READS that generator's output and carries its date
// forward rather than measuring again. Two dates on one page is the honest outcome: the plan was
// read now, the gates were measured then.
let gatesSummary = null;
try {
  const g = JSON.parse(fs.readFileSync(path.join(REPO, "content", "generated", "gates.json"), "utf8"));
  gatesSummary = {
    measured_at: g.measured_at || null,
    commit: (g.source && g.source.commit_short) || null,
    registered: Array.isArray(g.gates) ? g.gates.length : null,
    local_tally: (g.local && g.local.tally) || null,
    ci_available: !!(g.ci && g.ci.available),
    ci_latest: (g.ci && g.ci.latest) || null,
    ci_not_passing: (g.ci && g.ci.not_passing) || null,
    note: "Measured by generators/build_gates.cjs at the date above, NOT at this page's build time. A static page cannot know whether a gate passes right now.",
  };
} catch {
  gatesSummary = { measured_at: null, note: "gates.json has not been generated, so no gate figures are published here rather than published stale." };
}

// ─── the decisions: the questions the plan is waiting on, and the answers given ──────────────────
// The operator's directive, 2026-08-02: "this must be public for all to see, and approvals local
// with my approval here or click in the UI." That is a READ/WRITE SPLIT, and it is the whole design:
// everyone can see which questions the plan is waiting on and what was answered; only the operator,
// from his own box, can answer one. Nothing here is a write path — this generator reads the ledger
// and the derived question set and publishes both.
//
// The claim level ships WITH the rows, verbatim and unsoftened. `presence_evident` does not prove a
// human answered; it proves the row came from that box and that the chain would show tampering. A
// public page that showed the answers without that caveat would be claiming an authentication the
// system does not perform.
let decisions = { available: false, note: "the decision ledger could not be read from the source estate" };
try {
  const dl = require(path.join(MC, "viewer", "track", "decisions.cjs"));
  const rows = dl.readRows();
  const chain = dl.verify(rows);
  const subjects = dl.subjects();
  const answered = new Set(rows.map((r) => r.subject));
  decisions = {
    available: true,
    claim_level: dl.CLAIM_LEVEL,
    caveat: dl.CLAIM_CAVEAT,
    answered_count: rows.length,
    open_count: subjects.filter((s) => !answered.has(s.id)).length,
    chain_ok: !!chain.ok,
    chain_faults: (chain.faults || []).length,
    // Every question, whether answered or not. An open question is not a defect to be hidden; it is
    // the most informative thing on the page about where a human is actually still required.
    questions: refuseDenied(subjects).map((s) => {
      const mine = rows.filter((r) => r.subject === s.id);
      const last = mine.length ? mine[mine.length - 1] : null;
      return {
        id: s.id,
        kind: s.kind,
        text: s.text,
        answered: !!last,
        answer: last ? { at: last.utc || null, answer: last.answer || null, note: last.note || null } : null,
      };
    }),
    note: rows.length === 0
      ? "MEASURED AND ADVERSE: this ledger has ZERO rows. The surface that writes it exists and works, and it has never been used -- every ruling the operator has given was given in conversation, which is not an artifact. It is published in this state rather than omitted."
      : "Append-only and hash-chained. Rows can be added but not quietly changed or removed.",
  };
} catch (e) {
  decisions = { available: false, note: "the decision ledger could not be read: " + String(e.message || e).slice(0, 140) };
}

// ─── the watch link: declared or absent, never guessed ───────────────────────────────────────────
let distribution = { declared: false, note: "The operator has not declared a watch URL, so none is published. A guessed link would be a fabrication." };
const DIST = path.join(MC, "production", "distribution.json");
if (fs.existsSync(DIST)) {
  try {
    const d = JSON.parse(fs.readFileSync(DIST, "utf8"));
    const links = (d.links || d.watch || []).filter((l) => l && /^https:\/\//i.test(l.url || ""));
    if (links.length) distribution = { declared: true, links: links.map((l) => ({ platform: l.platform || "watch", url: l.url })) };
  } catch { /* a malformed file publishes nothing, which is the safe direction */ }
}

const out = deepScrub({
  note: [
    "GENERATED by generators/build_live_status.cjs. Do not edit by hand.",
    "",
    "WHAT IS LIVE HERE AND WHAT IS NOT. The PLAN below is read from the source estate's plan file at",
    "build time and is never transcribed -- when a step completes, the file changes and this page",
    "changes with it. The SYSTEM STATE is a different thing: a static page cannot know it, so the gate",
    "figures below carry the date they were measured and are written in the past tense. The live system",
    "state rides on the broadcast itself, where an honest health line and a full-frame status board are",
    "regenerated every six seconds from the same probe the operator's own private panel reads.",
    "",
    "Every string here is scrubbed of internal addresses, hostnames and ports before publication.",
    "Publishing the plan must not become publishing a route into the estate.",
  ],
  schema_version: 1,
  generated_by: "generators/build_live_status.cjs",
  plan_read_at: new Date().toISOString(),
  source: {
    repo: "uni-minecraft",
    path: "evidence/remediation/phase9_plan.json",
    commit: git(["rev-parse", "HEAD"]) || "unknown",
    commit_short: (git(["rev-parse", "HEAD"]) || "unknown").slice(0, 12),
    branch: git(["rev-parse", "--abbrev-ref", "HEAD"]) || "unknown",
    plan_authored_at: raw.authored_at || null,
  },
  phase: raw.phase || null,
  next_act: raw.next_act || null,
  law: raw.law || null,
  status_vocabulary: raw.status_vocabulary || STATUS_ORDER,
  tally: { stages: stages.length, steps: totalSteps, by_status: tally },
  stages,
  road_to_air: raw.road_to_air || null,
  // The stops are the most important thing on this page for a reader deciding whether to trust any
  // of it: they are the list of acts the automated agent is forbidden to perform, published in full.
  stops: refuseDenied(raw.stops || []),
  not_mine: refuseDenied(raw.not_mine || []),
  gates: gatesSummary,
  decisions,
  distribution,
  // Set after the walk below — declared here so the shape is stable.
  withheld: null,
});

// The counts are attached AFTER deepScrub so they describe the tree that actually ships. Stated as
// a number and a reason, never as content.
out.withheld = DENIED === null
  ? {
      checked: false,
      note: "The operator's denied-value list could not be read when this page was generated, so no claim is made that it was applied. A missing check and a passing check are not the same thing, and this says which one happened.",
    }
  : {
      checked: true,
      items: refusedCount,
      note: refusedCount === 0
        ? "No item was withheld. Every question and every restraint the plan declares is published in full."
        : `${refusedCount} item(s) were REFUSED — dropped whole, not redacted — because their text names a third party who has not consented to appear here. They are counted rather than silently omitted. Structural details (addresses, hostnames, ports) are handled differently: those are redacted in place with a visible marker, because the sentence still means something without them. A name does not work that way.`,
    };

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + "\n", "utf8");

console.log(`live status written: ${stages.length} stages, ${totalSteps} steps`);
console.log(`  by status: ${STATUS_ORDER.filter((k) => tally[k]).map((k) => `${tally[k]} ${k}`).join(" · ")}`);
console.log(`  next act : ${out.next_act ? String(out.next_act.id || "").slice(0, 40) : "(none declared)"}`);
console.log(`  decisions: ${decisions.available ? `${decisions.answered_count} answered, ${decisions.open_count} open, chain ${decisions.chain_ok ? "ok" : "FAULTED"}` : decisions.note}`);
console.log(`  scrubbed : ${scrubHits} internal reference(s) redacted before publication`);
 console.log(`  withheld : ${DENIED === null ? "DENIED LIST UNREADABLE — not checked" : refusedCount + " item(s) refused whole (third-party names are never redacted, only refused)"}`);
console.log(`  watch    : ${distribution.declared ? distribution.links.map((l) => l.platform).join(", ") : "not declared by the operator — none published"}`);
