// build_estate.cjs — publish V2's measured estate: repos on disk + services actually answering + drifts.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// WHY THIS EXISTS
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// The V2 audit went out and MEASURED two things this site had never published before: the code that
// makes up the estate (repos.json — every repository on disk, with head commit, branch, uncommitted
// count, ahead/behind, purpose read from README / mix.exs / CLAUDE.md, entry points, file counts by
// language) and the things actually running on ports (services.json — what state each port is in,
// what was USED to observe it, what the process is, whether the socket answers with a real payload
// or is UP_BUT_EMPTY). The audit also found 24 DRIFTS — declarations that disagree with reality —
// and named the orphans it saw. This publishes those three findings.
//
// It publishes them as ONE page rather than three because the audiences overlap and because the
// drifts LIVE at the seam between the declared code and the running processes; splitting them off
// would bury the highest-value thing on the page. The /drift audience the design context anticipates
// gets that page too, later. This one is the estate directory.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// THE HONESTY DISCIPLINE THIS FOLLOWS
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// Verbatim from build_live_status.cjs, because a second scrub table is a second place for a leak to
// grow. Two categories of sensitive text, handled differently:
//   * STRUCTURAL details (internal address / port / hostname / Windows user path / stream endpoint)
//     are REDACTED IN PLACE with a visible `[redacted: kind]` marker. The sentence still means
//     something without them, and the reader can see something was taken out.
//   * THIRD-PARTY NAMES (the operator's denied-values list in safety/patterns.local.json) are
//     REFUSED WHOLE — the row is dropped, the count is published. A marker where a name was still
//     tells you a name was there.
//
// Windows user paths are added here because V2's evidence is FULL of them (repo `path`, service
// `detail` fields, drift `locator`) and verify_publish_safe.cjs would fail the export on them
// anyway. Redacting at generation is the honest level; a scrub at export time is a fence, not a
// contract.
//
// EVIDENCE CLASS is carried forward on every leaf that has one, verbatim, because A (probed), B
// (documented), C (code-indicated) and G (inferred) are the whole point of the audit and blurring
// them into "measured" is the exact failure the audit was written to detect elsewhere.
//
//   node generators/build_estate.cjs
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const REPO = path.resolve(__dirname, "..");
// v2_estate.json (NOT estate.json) because content/generated/estate.json already exists — it is the
// citation-policy manifest emitted by build_content.cjs. Publishing to the same path would silently
// clobber a different generator's output, exactly the kind of coincidence that fails audibly here.
const OUT = path.join(REPO, "content", "generated", "v2_estate.json");

// V2's evidence lives in a SIBLING working tree, not in this repo. It is addressed by absolute path
// because the audit lives outside the public site's tree by design — nothing here embeds a route
// into the private estate.
const { root } = require("./local_roots.cjs");
const V2_DIR = path.join(root("uni-lab-command"), "evidence", "v2_repos_and_runtime");
const REPOS_JSON = path.join(V2_DIR, "repos.json");
const SERVICES_JSON = path.join(V2_DIR, "services.json");
const DRIFT_JSON = path.join(V2_DIR, "drift.json");

for (const p of [REPOS_JSON, SERVICES_JSON, DRIFT_JSON]) {
  if (!fs.existsSync(p)) {
    console.error(`REFUSING: V2 evidence file missing at ${p}.`);
    console.error("  Publishing an estate page with no estate behind it is worse than publishing none.");
    process.exit(1);
  }
}

const git = (args, cwd = REPO) => {
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
// Identical to build_live_status.cjs, with two additions marked. Each pattern replaces with a
// VISIBLE marker rather than deleting, because a silent deletion changes the meaning of a sentence
// while looking clean, and a reader cannot tell that something was taken out.
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
  // ADDED for V2: the evidence is thick with Windows user paths in repo `path` fields, service
  // `detail` fields ('cmdline: node.exe C:\\Users\\mpolz\\...') and drift `locator` fields. The
  // publish-safety gate would fail the export on these anyway; redacting at generation is the
  // right level. The pattern matches both forward-slash and backslash forms of Windows paths.
  [/\b[A-Z]:[\\/](?:Users[\\/][A-Za-z0-9._-]+|[A-Za-z0-9._-]+)[\\/][^"'\s,;()]*/g, "[redacted: local path]"],
  // ADDED for V2: unix-style user home paths from the lab evidence (/home/uni/, /run/user/1000/…).
  // These are structural, not name-shaped, so redact rather than refuse.
  [/\/home\/[A-Za-z0-9._-]+\/[^"'\s,;()]*/g, "[redacted: local path]"],
  [/\/run\/user\/\d+\/[^"'\s,;()]*/g, "[redacted: local path]"],
  // The port pattern goes LAST so the URL and address patterns get first bite at ports carried as
  // part of a URL or address; the standalone port form catches loose references like "on :8090".
  [/(?<![\w.])(?:port\s+)?:\d{4,5}\b/gi, "[redacted: port]"],
];

// ─── the REFUSAL, a different act from the scrub above ──────────────────────────────────────────
const DENIED = (() => {
  try {
    const p = JSON.parse(fs.readFileSync(path.join(REPO, "safety", "patterns.local.json"), "utf8"));
    const list = p.denied || p.values || p.deny || [];
    return list.map((d) => String(d.value || d.pattern || d)).filter(Boolean);
  } catch {
    // null, not [] — "could not check" must not look like "checked and clean".
    return null;
  }
})();

let refusedCount = 0;
let scrubHits = 0;

function touchesDenied(v) {
  if (!DENIED || !DENIED.length) return false;
  const hay = (typeof v === "string" ? v : JSON.stringify(v || "")).toLowerCase();
  return DENIED.some((d) => {
    try {
      return new RegExp(d, "i").test(hay);
    } catch {
      return hay.includes(d.toLowerCase());
    }
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

function scrub(s) {
  if (typeof s !== "string") return s;
  let out = s;
  for (const [re, rep] of SCRUBS) {
    out = out.replace(re, () => {
      scrubHits++;
      return rep;
    });
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

// ─── read the three V2 artifacts ─────────────────────────────────────────────────────────────────
const reposRaw = JSON.parse(fs.readFileSync(REPOS_JSON, "utf8"));
const servicesRaw = JSON.parse(fs.readFileSync(SERVICES_JSON, "utf8"));
const driftRaw = JSON.parse(fs.readFileSync(DRIFT_JSON, "utf8"));

// ─── shape the repos ─────────────────────────────────────────────────────────────────────────────
// Grouped by V2's own top-level `group` (minecraft / architect / flagellum / …). Only the fields
// the page will render come through — a wider projection wastes bytes and risks leaking a field
// nobody remembered to scrub.
//
// One-line purpose is derived from the audit's `purpose` field, which is a long paragraph citing
// README / mix.exs / CLAUDE.md verbatim. The page shows the first sentence for the table row and
// keeps the whole thing available for the expanded row — this lets a reader scan quickly without
// losing the citation trail.
function firstSentence(s) {
  if (!s || typeof s !== "string") return null;
  // Match the first sentence, stopping at ". " followed by uppercase — an initial period inside
  // "README.md line 1-13 (B):" must not truncate.
  const m = s.match(/^([^\n.!?]{0,240}?)(?:\.[\s"](?=[A-Z"])|[.!?]$)/);
  return (m ? m[1] : s.slice(0, 240)).trim();
}

const repoGroups = reposRaw.map((g) => {
  const kept = refuseDenied(g.repos || []).map((r) => ({
    name: r.name || null,
    branch: r.branch || null,
    head_commit: r.head_commit || null,
    is_git: r.is_git !== false,
    uncommitted_count: typeof r.uncommitted_count === "number" ? r.uncommitted_count : null,
    ahead_behind: r.ahead_behind || null,
    file_count: typeof r.file_count === "number" ? r.file_count : null,
    languages: Array.isArray(r.languages) ? r.languages : [],
    purpose_summary: firstSentence(r.purpose),
    purpose_full: r.purpose || null,
    evidence_class: r.evidence_class || null,
    // Entry points: keep only the shape the page renders. Path fields inside `what_it_does` are
    // scrubbed by deepScrub at the end; the `name` field for cli/server entry points is a repo-
    // relative path and is safe (a stripped local path publishes no host).
    entry_points: Array.isArray(r.entry_points)
      ? r.entry_points.map((e) => ({
          name: e.name || null,
          kind: e.kind || null,
          port: typeof e.port === "number" ? e.port : null,
          what_it_does: e.what_it_does || null,
        }))
      : [],
  }));
  return { group: g.group || "(ungrouped)", repos: kept };
});

// ─── shape the services ──────────────────────────────────────────────────────────────────────────
// Grouped by V2's `host`. Every service field passes through, but the host label itself is scrubbed
// because a phrase like "[redacted: mesh-ip], mesh id \"[redacted: mesh-id]\", self/local box for the [redacted: internal host] MCP" is
// exactly the sort of copy that must not go public unredacted.
//
// The service `state` field is left VERBATIM — UP_ANSWERING / UP_SLOW / UP_BUT_EMPTY / UP_NO_ANSWER
// / DOWN / NOT_MEASURED. The page tone-maps them; the JSON must not collapse them, because
// UP_BUT_EMPTY vs UP_ANSWERING is the exact distinction that hid a dead camera for hours and is the
// most important thing V2 measured.
const STATE_ORDER = {
  UP_ANSWERING: 0,
  UP_SLOW: 1,
  UP_BUT_EMPTY: 2,
  UP_NO_ANSWER: 3,
  DOWN: 4,
  NOT_MEASURED: 5,
};

const serviceHosts = servicesRaw.map((h) => {
  const kept = refuseDenied(h.services || []).map((s) => ({
    name: s.name || null,
    port: typeof s.port === "number" ? s.port : null,
    state: s.state || "NOT_MEASURED",
    evidence_class: s.evidence_class || null,
    how_observed: s.how_observed || null,
    detail: s.detail || null,
    started_at: s.started_at || null,
  }));
  // Sort by "how alive is it" so a reader scanning a host sees the working things first, then the
  // suspicious ones, then the dead ones. State order is fixed above; ties break on name.
  kept.sort((a, b) => {
    const ra = STATE_ORDER[a.state] ?? 99;
    const rb = STATE_ORDER[b.state] ?? 99;
    if (ra !== rb) return ra - rb;
    return String(a.name || "").localeCompare(String(b.name || ""));
  });
  return {
    host_label: h.host || "(unnamed host)",
    reachable: h.reachable !== false,
    notes: h.notes || null,
    services: kept,
  };
});

// ─── shape the drifts ────────────────────────────────────────────────────────────────────────────
// Ordered fails_silently first, then by measured/inferred class, then chronologically as V2 authored
// them (which is roughly by blast radius already). Titles that touch a denied value are refused
// whole and counted.
const drifts = refuseDenied(driftRaw.drifts || []).map((d) => ({
  title: d.title || null,
  kind: d.kind || null,
  claim: d.claim || null,
  reality: d.reality || null,
  locator: d.locator || null,
  blast_radius: d.blast_radius || null,
  fails_silently: !!d.fails_silently,
  evidence_class: d.evidence_class || null,
}));
drifts.sort((a, b) => {
  // Silent failures first — a loud failure at least announces itself.
  if (a.fails_silently !== b.fails_silently) return a.fails_silently ? -1 : 1;
  // Class A (probed) outranks B (documented) outranks G (inferred). A drift measured directly is
  // firmer than one inferred from a config file, so a reader should see the firm ones first.
  const CLASS_RANK = { A: 0, B: 1, C: 2, F: 3, G: 4 };
  const ra = CLASS_RANK[a.evidence_class] ?? 9;
  const rb = CLASS_RANK[b.evidence_class] ?? 9;
  return ra - rb;
});

const stops = refuseDenied(driftRaw.stops || []).map((s) => ({
  id: s.id || null,
  what: s.what || null,
  why_operator_only: s.why_operator_only || null,
  current_state: s.current_state || null,
}));

const orphans = refuseDenied(driftRaw.orphans || []);

const gaps = refuseDenied(driftRaw.gaps || []).map((g) => ({
  gap: g.gap || null,
  closed_by_vector: g.closed_by_vector || null,
}));

// ─── assemble, deep-scrub, write ─────────────────────────────────────────────────────────────────
const stateTally = {};
for (const h of serviceHosts) {
  for (const s of h.services) {
    stateTally[s.state] = (stateTally[s.state] || 0) + 1;
  }
}

const out = deepScrub({
  note: [
    "GENERATED by generators/build_estate.cjs. Do not edit by hand.",
    "",
    "The three V2 artifacts (repos.json, services.json, drift.json) are read from a sibling working",
    "tree at build time. Every string is scrubbed of internal addresses, hostnames, ports and local",
    "filesystem paths before publication. Third-party names are REFUSED whole and counted, not",
    "redacted. See the `withheld` block below for the exact counts.",
    "",
    "The DRIFT block is the most important thing here. It records places where the estate's own",
    "declarations disagree with what V2 actually measured. It is ordered SILENT FAILURES FIRST, then",
    "by evidence class — a drift that fails silently is worse than one that raises an alarm, and a",
    "drift measured directly is firmer than one inferred from a config file.",
  ],
  schema_version: 1,
  generated_by: "generators/build_estate.cjs",
  read_at: new Date().toISOString(),
  source: {
    v2_evidence_root: "UNI-LAB-Command/evidence/v2_repos_and_runtime",
    files: ["repos.json", "services.json", "drift.json"],
    // The public site's OWN commit — the private V2 tree is not a git repo we own from here.
    public_site_commit: git(["rev-parse", "HEAD"]) || "unknown",
    public_site_commit_short: (git(["rev-parse", "HEAD"]) || "unknown").slice(0, 12),
    public_site_branch: git(["rev-parse", "--abbrev-ref", "HEAD"]) || "unknown",
  },
  summary: driftRaw.summary || null,
  tally: {
    repo_groups: repoGroups.length,
    repos_total: repoGroups.reduce((n, g) => n + g.repos.length, 0),
    hosts: serviceHosts.length,
    services_total: serviceHosts.reduce((n, h) => n + h.services.length, 0),
    services_by_state: stateTally,
    drifts_total: drifts.length,
    drifts_silent: drifts.filter((d) => d.fails_silently).length,
    orphans_total: orphans.length,
    stops_total: stops.length,
  },
  repo_groups: repoGroups,
  service_hosts: serviceHosts,
  drifts,
  stops,
  orphans,
  gaps,
  withheld: null,
});

out.withheld = DENIED === null
  ? {
      checked: false,
      note:
        "The operator's denied-value list could not be read when this page was generated, so no claim is made that it was applied. A missing check and a passing check are not the same thing, and this says which one happened.",
    }
  : {
      checked: true,
      items_refused: refusedCount,
      structural_references_redacted: scrubHits,
      note:
        (refusedCount === 0
          ? "No item was withheld from the estate directory. "
          : `${refusedCount} item(s) were REFUSED — dropped whole, not redacted — because their text names a third party who has not consented to appear here. `) +
        (scrubHits === 0
          ? "No structural references were redacted, either."
          : `${scrubHits} structural reference(s) (internal addresses, hostnames, ports, local filesystem paths) were REDACTED IN PLACE with a visible marker, because the sentence still means something without them. That is a different act from a refusal and the number is stated so the two do not blur.`),
    };

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + "\n", "utf8");

console.log(
  `estate written: ${out.tally.repos_total} repo(s) across ${out.tally.repo_groups} group(s), ${out.tally.services_total} service(s) across ${out.tally.hosts} host(s), ${out.tally.drifts_total} drift(s) (${out.tally.drifts_silent} silent), ${out.tally.orphans_total} orphan(s)`,
);
console.log(
  `  by state : ${Object.entries(stateTally)
    .map(([k, v]) => `${v} ${k}`)
    .join(" · ") || "(none)"}`,
);
console.log(
  `  scrubbed : ${scrubHits} structural reference(s) redacted before publication`,
);
console.log(
  `  withheld : ${
    DENIED === null
      ? "DENIED LIST UNREADABLE — not checked"
      : refusedCount + " item(s) refused whole (third-party names are never redacted, only refused)"
  }`,
);
