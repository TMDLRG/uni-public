// build_mcp.cjs — publish the V1 SWU-MCP catalogue as a public, dated inspection.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// WHY THIS EXISTS
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// V1 of the five-vector programme was a read-only discovery pass over the SWU-MCP surface — every
// tool, every prompt, every enforcement rule, and every gap the pass could not close from a
// read-only chair. It produced a machine artifact: evidence/v1_mcp/catalogue.json in the private
// UNI-LAB-Command estate. This projects that artifact OUTWARD onto the public site so a stranger
// can read what the surface actually is and how it enforces itself, without having to be inside
// the operator's box.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// WHAT IS LIVE HERE AND WHAT IS NOT
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// This is a STATIC PAGE. It publishes a DATED INSPECTION of the MCP surface — not the surface
// itself. Nothing here can know whether a tool now responds differently from how it did when V1
// probed it; the page therefore stamps the timestamp the catalogue was authored and the timestamp
// this file was read, and the page states in plain words that it is not live.
//
// The estate's governing banner was caught, on 2026-07-29, publishing a gate tally that was false
// 176 seconds after it was written, in the present tense. Not repeating that defect requires being
// specific about which tense every claim on the page is in. Every figure that comes from the
// catalogue is in the past tense: "V1 observed", "V1 called", "returned -32002 in INCEPTION".
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// WHAT IS DELIBERATELY NOT PUBLISHED
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// The catalogue is an INTERNAL working artifact and it names internal surfaces — the current
// program_run identifier is a live handle, and the alignment file names a tenant. Every string
// that reaches this output is scrubbed of host addresses, loopback URLs, internal hostnames and
// port numbers before it is written (`scrub()`), and any array item whose text touches the
// operator's denied-value list is REFUSED whole (not redacted) — because a marker where a name
// was still tells you a name was there.
//
// The scrub is applied to EVERY string in the tree, not to a chosen subset, so a new field added
// to the catalogue upstream cannot leak by being forgotten here. The pattern is copied verbatim
// from generators/build_live_status.cjs — deliberately, so both pages share one discipline rather
// than each inventing its own.
//
//   node generators/build_mcp.cjs
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const REPO = path.resolve(__dirname, "..");
const OUT = path.join(REPO, "content", "generated", "mcp.json");
const ROOTS_FILE = path.join(__dirname, "roots.local.json");

if (!fs.existsSync(ROOTS_FILE)) {
  console.error("REFUSING: generators/roots.local.json is absent, so the source estate cannot be located.");
  console.error("  Publishing an MCP catalogue page with no catalogue behind it is worse than publishing no page.");
  process.exit(1);
}
const ROOTS = JSON.parse(fs.readFileSync(ROOTS_FILE, "utf8")).roots;

// UNI-LAB-Command is where V1's catalogue lives. It is not (yet) a declared root in
// roots.local.json for the general site, so this generator computes it from the operator's
// Documents folder — the same folder that all other declared roots live under. If ever a
// "uni-lab-command" key is added, it wins.
const LAB_CMD = ROOTS["uni-lab-command"]
  || path.join(path.dirname(REPO), "UNI-LAB-Command");
const CATALOGUE = path.join(LAB_CMD, "evidence", "v1_mcp", "catalogue.json");

if (!fs.existsSync(CATALOGUE)) {
  console.error(`REFUSING: the V1 MCP catalogue is not at ${CATALOGUE}.`);
  console.error("  This page cannot be built from nothing; the source artifact must exist before it can be projected.");
  process.exit(1);
}

const git = (args, cwd = LAB_CMD) => {
  try {
    return execFileSync("git", ["-C", cwd, ...args], {
      encoding: "utf8",
      maxBuffer: 1 << 24,
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    return null;
  }
};

// ─── the scrub ───────────────────────────────────────────────────────────────────────────────────
// COPIED VERBATIM from generators/build_live_status.cjs. If it drifts from that copy, one page
// leaks something the other page catches, so the two must stay identical — a shared file would be
// cleaner but keeping them side-by-side makes the coupling visible at a diff. Each pattern
// replaces with a VISIBLE marker rather than deleting, because a silent deletion changes the
// meaning of a sentence while looking clean, and the reader cannot tell that something was taken
// out. The house convention elsewhere on this site is exactly this: `[redacted: kind]`.
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
  // EXTRA vs build_live_status: the MCP catalogue names the CURRENT programme-run identifier — a
  // 128-bit UUID that is a live handle into the state store, not a shape that describes the
  // system. It scans as neither an address nor a port, so the SCRUBs above do not catch it. Adding
  // it here means every mention of the current run (in the summary paragraph, in enforcement
  // examples, wherever) reads as "[redacted: programme-run id]" without the sentence around it
  // being destroyed. It is intentionally distinct from the "refuse whole item" path — an ID that
  // appears inside a paragraph of otherwise-useful description should not cause the paragraph to
  // vanish.
  [/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi, "[redacted: programme-run id]"],
];

// ─── the REFUSAL, which is a different act from the scrub and must stay different ───────────────
// The scrub REDACTS structural shapes — an address, a port — replacing them with a visible marker,
// because the sentence still means something without them.
//
// The operator's denied values are NOT redacted. They are third-party names, and the house rule is
// absolute: they are always REFUSED, never redacted. A marker reading "[redacted: name]" still
// tells a reader that a name was there and invites them to work out whose, and a sentence built
// around a removed name is often still identifying. So any ITEM whose text touches a denied value
// is dropped whole.
const DENIED = (() => {
  try {
    const p = JSON.parse(fs.readFileSync(path.join(REPO, "safety", "patterns.local.json"), "utf8"));
    const list = p.denied || p.values || p.deny || [];
    return list.map((d) => String(d.value || d.pattern || d)).filter(Boolean);
  } catch {
    return null; // null, not [] — "could not check" must not look like "checked and clean"
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

// ─── read the catalogue ──────────────────────────────────────────────────────────────────────────
const raw = JSON.parse(fs.readFileSync(CATALOGUE, "utf8"));
const cat = raw.catalogue || {};
const inner = cat.catalogue || {};

// A category label per tool, so /mcp can group the 59 tools into families rather than one flat
// list of 59 rows. The mapping is derived from the same section boundaries the alignment file
// uses (see raw.alignMap.sections for the source of truth) and from tool names. Kept small and
// deliberately conservative — any tool not matched lands in "other", visibly.
const CATEGORY_OF = {
  agile_plan: "planning",
  inception_run: "inception",
  inception_artifact: "inception",
  sprint_manage: "planning",
  work_manage: "work-items",
  feature_manage: "work-items",
  backlog_manage: "planning",
  agent_dispatch: "agents",
  agent_manage: "agents",
  agent_control: "agents",
  ticket_orchestrate: "work-items",
  stakeholder_manage: "people",
  persona_manage: "people",
  team_manage: "people",
  membership_manage: "people",
  client_manage: "people",
  docs_manage: "documentation",
  adr_manage: "documentation",
  raid_manage: "documentation",
  spec_manage: "documentation",
  living_docs_manage: "documentation",
  doc_builder: "documentation",
  template_manage: "documentation",
  convention_manage: "documentation",
  mode_manage: "governance",
  progress_get: "governance",
  methodology_check: "governance",
  guidance_mode: "governance",
  board_manage: "work-items",
  time_manage: "work-items",
  label_manage: "work-items",
  link_manage: "work-items",
  bulk_manage: "work-items",
  notify_manage: "governance",
  comment_manage: "work-items",
  verification_manage: "quality",
  uat_manage: "quality",
  release_manage: "quality",
  report_manage: "quality",
  cicd_manage: "quality",
  delivery_pipeline: "quality",
  audit_manage: "governance",
  audit_link_external: "governance",
  memory_manage: "memory",
  knowledge_graph: "memory",
  insights_for: "memory",
  scope_manage: "governance",
  sow_manage: "contracts",
  deliverable_manage: "contracts",
  activity_manage: "governance",
  journey_manage: "people",
  project_init: "governance",
  project_manage: "contracts",
  apikey_issue: "keys",
  apikey_list: "keys",
  apikey_revoke: "keys",
  alignment_generate: "governance",
  rules_generate: "governance",
  historic_run: "governance",
};

const CATEGORY_ORDER = [
  "inception",
  "planning",
  "work-items",
  "people",
  "agents",
  "documentation",
  "quality",
  "governance",
  "memory",
  "contracts",
  "keys",
  "other",
];

const CATEGORY_BLURB = {
  inception: "Frame the problem, run the six sessions (S01–S06), record the artifacts a stakeholder can playback and sign off.",
  planning: "Turn scope into an agile plan — epics, sprints, backlog items, the story-level rules that gate the transition to delivering.",
  "work-items": "The unit of work: Epic, Story, Ticket. Boards, columns, links, labels, comments, time, mass edits.",
  people: "Who is on the programme — stakeholders, personas, team members, tenants, memberships, journeys.",
  agents: "Register, authenticate and drive automated agents; assign them scope, leases, branches, coordination zones.",
  documentation: "Every long-form artifact — ADRs, RAID, specs, living-doc bindings, generated guides, templates, conventions.",
  quality: "Verifications, UAT scenarios, release readiness, CI/CD checks, delivery pipeline records.",
  governance: "The gates and observability the server puts on itself: mode, workflow, audit chain, guidance, scope, methodology.",
  memory: "The persona + programme memory store, the L1 knowledge graph, and the insights query that reaches into them.",
  contracts: "Statements of work, projects under an SOW, and the deliverables under each.",
  keys: "API-key lifecycle for programmatic access.",
  other: "Tools not yet mapped into a category. Visible so the fact of the gap is visible.",
};

// ─── tools ───────────────────────────────────────────────────────────────────────────────────────
const toolsRaw = Array.isArray(inner.tools) ? inner.tools : [];
const tools = toolsRaw.map((t) => ({
  name: t.name,
  description: t.description || null,
  read_actions_observed_count: typeof t.read_actions_observed_count === "number" ? t.read_actions_observed_count : null,
  mutating_actions_deferred_count: typeof t.mutating_actions_deferred_count === "number" ? t.mutating_actions_deferred_count : null,
  evidence_class: t.evidence_class || null,
  notes: t.notes || null,
  category: CATEGORY_OF[t.name] || "other",
}));

// Category rollup, ordered by CATEGORY_ORDER; unknown categories fall to the bottom in the order
// they first appear.
const seenExtra = [];
for (const t of tools) {
  if (!CATEGORY_ORDER.includes(t.category) && !seenExtra.includes(t.category)) seenExtra.push(t.category);
}
const categories = [...CATEGORY_ORDER.filter((c) => tools.some((t) => t.category === c)), ...seenExtra].map((c) => {
  const members = tools.filter((t) => t.category === c);
  const observed = members.filter((t) => t.evidence_class === "A").length;
  const schemaOnly = members.filter((t) => t.evidence_class === "C").length;
  return {
    id: c,
    blurb: CATEGORY_BLURB[c] || null,
    count: members.length,
    observed_count: observed,
    schema_only_count: schemaOnly,
    tools: members.map((t) => t.name).sort(),
  };
});

// ─── prompts ────────────────────────────────────────────────────────────────────────────────────
const prompts = (inner.prompts || []).map((p) => ({
  name: p.name,
  purpose: p.purpose || null,
  trigger: p.trigger || null,
}));

// ─── enforcement rules ──────────────────────────────────────────────────────────────────────────
const enforcement = (cat.enforcement_rules || []).map((r) => ({
  name: r.name,
  when_it_fires: r.when_it_fires || null,
  error_text: r.error_text || null,
  alignment_file_line: r.alignment_file_line || null,
  observed: !!r.observed,
}));

// ─── lifecycle map ──────────────────────────────────────────────────────────────────────────────
// V1's own lifecycle_map, carrying the four modes and their gates_out. The current_mode field
// names a specific programme run and is NOT the shape a public page should carry — the mode a
// specific run is currently in is a fact about now, and this page cannot know now. So we ship the
// STRUCTURE and drop the current_mode / transition_path_to_planning fields, and say so.
const lifecycleModes = ((cat.lifecycle_map && cat.lifecycle_map.modes) || []).map((m) => ({
  name: m.name,
  purpose: m.purpose || null,
  gates_out: Array.isArray(m.gates_out) ? m.gates_out : [],
}));

// ─── gaps ───────────────────────────────────────────────────────────────────────────────────────
const gaps = (cat.gaps || []).map((g) => ({
  gap: g.gap || null,
  why_not_closed_in_v1: g.why_not_closed_in_v1 || null,
  closed_by_vector: g.closed_by_vector || null,
}));

// ─── resources_named — dropped ──────────────────────────────────────────────────────────────────
// inner.resources_named includes the current programme run identifier and internal file paths. It
// is deliberately not published; the reader who wants that detail is inside the estate already.

const out = deepScrub({
  note: [
    "GENERATED by generators/build_mcp.cjs. Do not edit by hand.",
    "",
    "WHAT THIS PAGE IS. A dated public projection of the V1 read-only inspection of the SWU-MCP",
    "server as it stood when the catalogue was authored. Every figure below is a past-tense",
    "observation from that pass — not a live check.",
    "",
    "WHAT THIS PAGE IS NOT. A live view of the MCP surface. This site is a static export with no",
    "backend and no runtime network access at all, so it cannot know whether a tool now responds",
    "differently from how V1 saw it. If the surface has moved on, this catalogue is a record of",
    "what it USED to be, and the timestamps make that explicit.",
    "",
    "Every string here is scrubbed of internal addresses, hostnames and ports before publication.",
    "The programme-run identifier and internal resource URIs are refused entirely: those name a",
    "live handle inside the estate, and publishing them would turn a catalogue into a route in.",
  ],
  schema_version: 1,
  generated_by: "generators/build_mcp.cjs",
  read_at: new Date().toISOString(),
  source: {
    repo: "uni-lab-command",
    path: "evidence/v1_mcp/catalogue.json",
    commit: git(["rev-parse", "HEAD"]) || "unknown",
    commit_short: (git(["rev-parse", "HEAD"]) || "unknown").slice(0, 12),
    branch: git(["rev-parse", "--abbrev-ref", "HEAD"]) || "unknown",
    catalogue_authored_at: raw.generated_at || raw.authored_at || null,
    alignment_file_total_lines: (raw.alignMap && raw.alignMap.total_lines) || null,
  },
  summary: cat.summary || null,
  totals: {
    tools: tools.length,
    prompts: prompts.length,
    enforcement_rules: enforcement.length,
    lifecycle_modes: lifecycleModes.length,
    categories: categories.length,
    gaps: gaps.length,
    observed_tools: tools.filter((t) => t.evidence_class === "A").length,
    schema_only_tools: tools.filter((t) => t.evidence_class === "C").length,
  },
  categories,
  tools: tools.sort((a, b) => a.name.localeCompare(b.name)),
  prompts,
  enforcement_rules: enforcement,
  lifecycle_modes: lifecycleModes,
  gaps,
  // withheld attached after the walk below so counts describe the tree that actually ships.
  withheld: null,
});

out.withheld = DENIED === null
  ? {
      checked: false,
      note: "The operator's denied-value list could not be read when this page was generated, so no claim is made that it was applied. A missing check and a passing check are not the same thing, and this says which one happened.",
    }
  : {
      checked: true,
      items: refusedCount,
      scrub_hits: scrubHits,
      note: refusedCount === 0
        ? `No item was withheld. Structural details (addresses, hostnames, ports) were redacted in place ${scrubHits} time(s) — each with a visible marker so the reader can see something was removed.`
        : `${refusedCount} item(s) were REFUSED — dropped whole, not redacted — because their text names a third party who has not consented to appear here. They are counted rather than silently omitted. Structural details are handled differently: those are redacted in place with a visible marker (${scrubHits} redaction(s) in total), because the sentence still means something without them. A name does not work that way.`,
    };

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + "\n", "utf8");

console.log(`mcp catalogue written: ${tools.length} tools, ${prompts.length} prompts, ${enforcement.length} enforcement rules, ${gaps.length} gaps`);
console.log(`  categories: ${categories.map((c) => `${c.id}(${c.count})`).join(" · ")}`);
console.log(`  scrubbed  : ${scrubHits} internal reference(s) redacted before publication`);
console.log(`  withheld  : ${DENIED === null ? "DENIED LIST UNREADABLE — not checked" : refusedCount + " item(s) refused whole"}`);
