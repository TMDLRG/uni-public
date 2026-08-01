// ingest_docs.cjs — turn the estate's real documents into the wiki, refusing the ones that cannot go.
//
// WHAT WENT WRONG WITHOUT THIS. The first version of this site extracted 60 chapter TITLES into a
// JSON index and rendered a dashboard of counts. The operator's response was the correct one: the
// cookbook is not missing content, it is COMPLETE — 79 chapters, two sovereign ledgers, a
// 130-concept lexicon, all finished and sitting on disk. What was missing was publication. A table
// of contents is not a wiki. Measured at that moment: 495 documents / 19.5 MB available, 2 real
// pages shipped.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// THE HARD PART IS NOT INGESTION, IT IS REFUSAL
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// These corpora are NOT uniformly publishable and a blanket copy would leak on day one. Measured
// across the estate: 124 tracked files in UNI.Minecraft carry private LAN addresses, and one of them
// is named PUBLIC_README.md. docs/OPERATIONS_MANUAL.md is 422 lines of internal topology. So every
// document is judged individually:
//
//   CLEAN     → rendered as a wiki page
//   REFUSED   → NOT rendered, and LISTED on the omissions page with its reason and sha256
//
// Nothing is dropped silently. That rule is not invented here — the cookbook's own generator holds
// that "a silent omission would break 'always the real as-is repo knowledge'", and lists every
// unrendered file with its digest. A reader can therefore see the SHAPE of what is withheld, which
// is the difference between curation and concealment.
//
// A REFUSAL IS NOT A JUDGEMENT ABOUT QUALITY. Most refusals here are documents that are perfectly
// good and simply describe private infrastructure. They stay in the private repos where they belong.
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const HERE = __dirname;
const REPO = path.resolve(HERE, "..");
const OUT = path.join(REPO, "content", "generated");

// ─── the same two local-only inputs the rest of the pipeline uses ────────────────────────────────
const patternsFile = path.join(REPO, "safety", "patterns.local.json");
const rootsFile = path.join(HERE, "roots.local.json");
for (const [f, what] of [[patternsFile, "safety/patterns.local.json"], [rootsFile, "generators/roots.local.json"]]) {
  if (!fs.existsSync(f)) {
    console.error(`REFUSING TO INGEST: ${what} is absent.`);
    console.error("  This writes into a PUBLIC repository. Without it, documents cannot be judged and");
    console.error("  ingesting anyway would put the entire burden on a gate that runs afterwards — by");
    console.error("  which time the content is already on disk.");
    process.exit(1);
  }
}
const DENIED = (JSON.parse(fs.readFileSync(patternsFile, "utf8")).values || []).map((v) => String(v).toLowerCase());
const ROOTS = JSON.parse(fs.readFileSync(rootsFile, "utf8")).roots || {};

// ─── structural refusal patterns. Shapes, not secrets — safe to read in a public file. ───────────
const REFUSE = [
  ["private-ipv4", /\b(?:10\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])|192\.168)\.\d{1,3}\.\d{1,3}\b/],
  ["tailscale-ip", /\b100\.(?:6[4-9]|[7-9]\d|1\d\d|2[0-4]\d|25[0-5])\.\d{1,3}\.\d{1,3}\b/],
  ["tailnet-name", /\b[a-z0-9-]+\.ts\.net\b/i],
  ["internal-dns", /\b[a-z0-9-]+\.(?:uni-lab|lab)\.local\b/i],
  ["operator-path", /[A-Za-z]:[\\/]Users[\\/][A-Za-z0-9._-]+/],
  ["private-key", /-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/],
  ["token-shape", /\b(?:AKIA[0-9A-Z]{16}|gh[psuor]_[A-Za-z0-9]{20,}|sk-ant-[A-Za-z0-9_-]{20,}|xox[abprs]-[A-Za-z0-9-]{10,})\b/],
];

// ─── the corpora. Each declares WHY it is here, so the wiki's shape is explained not assumed. ────
const CORPORA = [
  {
    id: "encyclopedia", title: "The Encyclopedia", root_key: "uni-cookbook", dir: "encyclopedia",
    blurb: "The UNI method as a book: what is claimed, what is observed, and the two sovereign ledgers that keep those apart.",
    exclude: [/^appendix-TA\//],
    exclude_reason: "appendix-TA is Track-A, the commercial and delivery track. It is the operator's own material and his own published rate card — a SCOPE exclusion, not a secrecy one.",
  },
  {
    id: "cookbook", title: "The Cookbook", root_key: "uni-cookbook", dir: "cookbook",
    blurb: "The recipes: how the method is actually carried out, step by step, against real systems.",
  },
  {
    id: "control-plane", title: "Architecture & Decisions", root_key: "uni-flagellum", dir: "docs/control-plane",
    blurb: "The architecture of record, every ADR, the failure modes, and the rendered Structurizr views.",
  },
  {
    id: "flagellum", title: "The Flagellar Motor", root_key: "uni-flagellum", dir: "docs",
    blurb: "The laboratory itself: the motor model, the evidence manifests, and the walkthroughs.",
    exclude: [/^control-plane\//],
    exclude_reason: "rendered separately as Architecture & Decisions.",
  },
  {
    id: "workbench", title: "The Math Workbench", root_key: "uni-workbench", dir: "docs",
    blurb: "The browser instrument that executes the committed model libraries.",
  },
  // ── UNI.Minecraft, split in two ────────────────────────────────────────────────────────────────
  // The docs audit measured this corpus at 187 files: 129 clean, 58 contaminated, and — the number
  // that decided the split — 73 receipts and 12 handoffs, 45% of the whole. Receipts are evidence
  // that a gate ran on a given date. They are the PROOF that the method is real rather than
  // decorative, and one of them is a FAIL verdict, which is worth more to a sceptical reader than any
  // amount of architecture prose. But 85 dated evidence stubs in the main navigation would bury the
  // ~24 documents that actually explain the system. So they are published, and published SEPARATELY.
  {
    id: "minecraft", title: "The Colony &amp; the Method", root_key: "uni-minecraft", dir: "docs",
    blurb: "How the system is built and how it is held to account: the falsification invitation, the evidence discipline, the typed organ specs, and the world model.",
    exclude: [
      /^receipts\//, /^handoffs\//, /^work_orders\//, /^validation\//,   // → the evidence corpus
      /^prompts\//,                                                      // builder scaffolding, not corpus
      /^control-plane\/LIMITATIONS\.md$/,                                // generated; the flagellum copy is authoritative
      /^limitations\.md$/,                                               // self-declared dead: "referenced by nothing … no gate reads it"
    ],
    exclude_reason: "receipts, handoffs, work orders and validation move to the Evidence section; prompts are builder scaffolding (the same reason the cookbook's own generator excludes its prompts/); docs/limitations.md is excluded because its own first line declares it superseded and read by nothing.",
  },
  {
    id: "evidence", title: "Evidence &amp; Verdicts", root_key: "uni-minecraft", dir: "docs",
    blurb: "Receipts, pre-registrations and adversarial review verdicts — the dated record that the method above was actually carried out, including the times it failed.",
    include_only: [/^receipts\//, /^handoffs\//, /^work_orders\//, /^validation\//],
    off_main_nav: true,
  },
];

const sha256 = (s) => crypto.createHash("sha256").update(s).digest("hex");
const git = (root, args) => {
  try { return execFileSync("git", ["-C", root, ...args], { encoding: "utf8", maxBuffer: 1 << 26 }).trim(); } catch { return ""; }
};

function walkMd(dir, rel = "") {
  const out = [];
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    if (/^(node_modules|\.git|_build|deps|dist|\.next|reader)$/.test(e.name)) continue;
    const abs = path.join(dir, e.name);
    const r = rel ? rel + "/" + e.name : e.name;
    if (e.isDirectory()) out.push(...walkMd(abs, r));
    else if (/\.mdx?$/i.test(e.name)) out.push(r);
  }
  return out.sort();
}

const slugify = (s) => s.toLowerCase().replace(/\.mdx?$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const title = (text, fallback) => { const m = /^#\s+(.+)$/m.exec(text); return m ? m[1].trim() : fallback; };

function judge(text) {
  const reasons = [];
  for (const [label, re] of REFUSE) if (re.test(text)) reasons.push(label);
  const low = text.toLowerCase();
  DENIED.forEach((v, i) => { if (v && low.includes(v)) reasons.push(`denied#${i}`); });
  return reasons;
}

// ─────────────────────────────────────────────────────────────────────────────────────────────────
// REDACTION — the third outcome, between "publish" and "refuse"
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// The docs audit measured the case for this precisely: of 187 UNI.Minecraft documents, 58 are
// contaminated — but 26 of those are blocked by ONE OR TWO tokens. docs/PUBLIC_README.md, the file
// explicitly written for the public, is blocked by a single private IP on line 27. specs/metabolism.md
// is a 31 KB typed organ spec blocked by one SSH target. Refusing those wholesale throws away the
// document to preserve a token nobody wants.
//
// THREE RULES MAKE THIS SAFE RATHER THAN CLEVER:
//
//   1. THE MARKER IS VISIBLE. Every removal leaves `[redacted: category]` in the text and the page
//      banners the count. The reader sees exactly where and how much was taken out. A silent
//      redaction would make the published text differ from the source without saying so, which
//      breaks the one claim this whole site rests on — that a page IS the document.
//
//   2. THERE IS A CEILING. Past MAX_REDACTIONS the document is REFUSED instead. A document held
//      together by redaction markers is swiss cheese: it reads as though it says something while the
//      load-bearing parts are gone, which misleads more than an honest absence would.
//
//   3. OPERATOR-DENIED VALUES ARE NEVER REDACTED — ALWAYS REFUSED. A private address is
//      infrastructure trivia and a marker in its place costs nothing. A person's name, a client
//      identifier, or a resolvable hostname is not a formatting problem, and `[redacted: name]` still
//      tells a reader that a name was there and roughly where to start looking.
const MAX_REDACTIONS = 10;

// A third element, when present, is the capture group holding the VALUE. Only that group is replaced,
// so an RCON password assignment keeps its key, loses its value, and the sentence still reads.
// Blanking the whole match would delete the fact that a password is configured there at all, which is
// the thing a reader most needs to know.
//
// This comment used to demonstrate the rule with the real before-and-after text, which meant this
// file — in the PUBLIC repository — carried the very value the rule was written to remove. The gate
// caught it. Explaining a redaction is not a licence to reproduce what was redacted.
const REDACTABLE = [
  ["private-address", /\b(?:10\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])|192\.168)\.\d{1,3}\.\d{1,3}\b/g],
  ["tailscale-address", /\b100\.(?:6[4-9]|[7-9]\d|1\d\d|2[0-4]\d|25[0-5])\.\d{1,3}\.\d{1,3}\b/g],
  ["internal-hostname", /\b[a-z0-9-]+\.(?:uni-lab|lab)\.local\b/gi],
  ["operator-path", /[A-Za-z]:[\\/]Users[\\/][A-Za-z0-9._-]+/g],

  // ── CREDENTIAL VALUES ─────────────────────────────────────────────────────────────────────────
  // ADDED 2026-08-01, AFTER THIS SITE HAD ALREADY PUBLISHED THEM. The live site was serving a
  // Minecraft RCON password and, on nine pages, an Erlang distribution cookie — both in clear, each
  // inline beside the flag that sets it. An Erlang cookie is not a nuisance credential: it is the
  // BEAM's shared secret, and
  // possession of it plus reachability of the distribution port is remote code execution on the node.
  //
  // The pattern table above had a `token-shape` rule that matched AWS, GitHub, Slack and Anthropic key
  // FORMATS, and nothing at all matched the oldest credential shape there is — `name=value`. It looked
  // like credential coverage and was coverage of four vendors.
  //
  // Note the anchors. The first draft of this rule began `\b(?:--cookie|...)` and matched ZERO of the
  // nine pages, because a word boundary between a space and a hyphen does not exist. It scanned clean
  // and proved nothing, which is the failure mode every rule here is written against.
  ["credential", /(?:--cookie|-setcookie)[ =]+([^\s"'`]+)/gi, 1],
  ["credential", /(?:--password|--pass|--secret|--token)[ =]+([^\s"'`]+)/gi, 1],
  ["credential", /[A-Za-z_][A-Za-z0-9_.]*(?:password|passwd|secret|cookie|api_?key)\s*=\s*([^\s"'`,;)]+)/gi, 1],
  ["credential", /passwords?\b[^\n]{0,24}?`([A-Za-z0-9_.-]{1,40})`/gi, 1],
];

// A denied value present at all => refuse. Never redact these.
function hasDenied(text) {
  const low = text.toLowerCase();
  return DENIED.some((v) => v && low.includes(v));
}

function redact(text) {
  let out = text;
  const counts = {};
  for (const [label, re, valueGroup] of REDACTABLE) {
    out = out.replace(re, (match, ...groups) => {
      counts[label] = (counts[label] || 0) + 1;
      const marker = `[redacted: ${label}]`;
      if (!valueGroup) return marker;
      // Replace only the value, keeping the surrounding text: the reader must still be able to see
      // that a credential is configured, where, and under what name.
      const value = groups[valueGroup - 1];
      const at = match.lastIndexOf(value);
      return at < 0 ? marker : match.slice(0, at) + marker + match.slice(at + value.length);
    });
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return { text: out, counts, total };
}

// ─────────────────────────────────────────────────────────────────────────────────────────────────
// DEDUPLICATION — the same document is not two documents
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// Measured 2026-08-01: the math workbench is a git WORKTREE of the flagellum repository on a
// different branch, so its docs/ directory is largely the same docs/ directory. Of its 13 documents,
// ELEVEN were byte-identical to a flagellum page already ingested — the wiki was publishing them
// twice under two names. Two genuinely differ (the branch has moved on) and those stay.
//
// A duplicate page is not a neutral cost. This site's whole claim to being a guide rather than a
// dump rests on a reader being able to find the one right page, and two identical pages is the
// smallest possible version of the failure this rebuild exists to correct.
//
// The drop is RECORDED, not silent — same rule as a refusal. A reader can see which document was
// deduplicated and against what, and the sha256 proves the claim of identity rather than asserting it.
const duplicates = [];
const seenDigest = new Map();          // sha256 → the slug that got there first

// ─── run ─────────────────────────────────────────────────────────────────────────────────────────
const pages = [];
const refused = [];
const corporaOut = [];
let redactedCount = 0;

for (const c of CORPORA) {
  const root = ROOTS[c.root_key];
  if (!root || !fs.existsSync(root)) { corporaOut.push({ ...meta(c), available: false, reason: `no path mapped for root_key '${c.root_key}'`, pages: 0, refused: 0, deduped: 0 }); continue; }
  const base = path.join(root, c.dir);
  if (!fs.existsSync(base)) { corporaOut.push({ ...meta(c), available: false, reason: `directory '${c.dir}' not present`, pages: 0, refused: 0, deduped: 0 }); continue; }

  const commit = git(root, ["rev-parse", "HEAD"]);
  const branch = git(root, ["rev-parse", "--abbrev-ref", "HEAD"]);
  let kept = 0, dropped = 0, deduped = 0;

  for (const rel of walkMd(base)) {
    if ((c.exclude || []).some((re) => re.test(rel))) continue;
    if (c.include_only && !c.include_only.some((re) => re.test(rel))) continue;
    let text;
    try { text = fs.readFileSync(path.join(base, rel), "utf8"); } catch { continue; }
    const digest = sha256(text).slice(0, 16);

    // A denied value is fatal on sight — no redaction path, no threshold, no appeal.
    if (hasDenied(text)) {
      dropped++;
      refused.push({ corpus: c.id, path: `${c.dir}/${rel}`, bytes: Buffer.byteLength(text), sha256: digest, reasons: ["operator-denied-value"] });
      continue;
    }

    const red = redact(text);
    if (red.total > MAX_REDACTIONS) {
      dropped++;
      refused.push({
        corpus: c.id, path: `${c.dir}/${rel}`, bytes: Buffer.byteLength(text), sha256: digest,
        // Categories and counts only. Never the matched value — a refusal list that quotes what it
        // refused would republish exactly what it withheld.
        reasons: [`over-redaction-threshold (${red.total} > ${MAX_REDACTIONS})`, ...Object.keys(red.counts)],
      });
      continue;
    }

    // Anything still matching after redaction is a shape the redactor does not handle (a key blob, a
    // tailnet name). Refuse it rather than shipping a partially-cleaned document.
    const residual = judge(red.text);
    if (residual.length) {
      dropped++;
      refused.push({ corpus: c.id, path: `${c.dir}/${rel}`, bytes: Buffer.byteLength(text), sha256: digest, reasons: [...new Set(residual)] });
      continue;
    }

    // Identity is proved by digest, never by filename. Two files with the same name and different
    // contents are two documents; two files with different names and the same bytes are one.
    const full = sha256(text);
    if (seenDigest.has(full)) {
      deduped++;
      duplicates.push({ corpus: c.id, path: `${c.dir}/${rel}`, bytes: Buffer.byteLength(text), sha256: digest, same_as: seenDigest.get(full) });
      continue;
    }
    seenDigest.set(full, `${c.id}/${slugify(rel)}`);

    kept++;
    if (red.total) redactedCount++;
    pages.push({
      corpus: c.id,
      slug: `${c.id}/${slugify(rel)}`,
      title: title(text, path.basename(rel, path.extname(rel))),
      body: red.text,
      bytes: Buffer.byteLength(red.text),
      sha256: digest,                       // the digest of the ORIGINAL, so a reader can verify what was ingested
      redactions: red.total,
      redaction_counts: red.counts,
      citation: { repo: c.root_key, title: c.title, branch, commit, commit_short: commit.slice(0, 12), path: `${c.dir}/${rel}`, visibility: "private", resolvable: false },
    });
  }
  corporaOut.push({ ...meta(c), available: true, branch, commit_short: commit.slice(0, 12), pages: kept, refused: dropped, deduped });
}

function meta(c) { return { id: c.id, title: c.title, blurb: c.blurb, exclude_reason: c.exclude_reason || null, off_main_nav: !!c.off_main_nav }; }

fs.mkdirSync(OUT, { recursive: true });
const bundle = {
  schema_version: 1,
  generated_by: "generators/ingest_docs.cjs",
  corpora: corporaOut,
  pages,
  refused: {
    note: [
      "NOT RENDERED, and listed rather than dropped in silence. Most of these are perfectly good",
      "documents that describe private infrastructure and belong in the private repos. The reason is",
      "given as a CATEGORY and never as the matched text, because a refusal list that quoted what it",
      "refused would republish exactly what it withheld.",
    ],
    count: refused.length,
    items: refused,
  },
  duplicates: {
    note: [
      "NOT RENDERED because an identical document was already ingested from another corpus, proved by",
      "sha256 rather than by filename. Listed rather than dropped in silence: a reader can see that the",
      "document exists, which copy is published, and check the identity claim for themselves.",
    ],
    count: duplicates.length,
    items: duplicates,
  },
};
fs.writeFileSync(path.join(OUT, "docs.json"), JSON.stringify(bundle, null, 1) + "\n", "utf8");

const totalBytes = pages.reduce((n, p) => n + p.bytes, 0);
console.log(`ingested ${pages.length} page(s), ${(totalBytes / 1024).toFixed(0)} KB; REFUSED ${refused.length}; DEDUPLICATED ${duplicates.length}`);
for (const c of corporaOut) {
  console.log(`  ${c.id.padEnd(16)} ${c.available ? String(c.pages).padStart(4) + " pages, " + String(c.refused).padStart(3) + " refused, " + String(c.deduped).padStart(3) + " duplicate" : "UNAVAILABLE: " + c.reason}`);
}
const byReason = {};
for (const r of refused) for (const x of r.reasons) byReason[x] = (byReason[x] || 0) + 1;
if (refused.length) console.log("  refusal reasons: " + Object.entries(byReason).map(([k, v]) => `${k} x${v}`).join(", "));
