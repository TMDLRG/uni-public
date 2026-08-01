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

// ─── run ─────────────────────────────────────────────────────────────────────────────────────────
const pages = [];
const refused = [];
const corporaOut = [];

for (const c of CORPORA) {
  const root = ROOTS[c.root_key];
  if (!root || !fs.existsSync(root)) { corporaOut.push({ ...meta(c), available: false, reason: `no path mapped for root_key '${c.root_key}'`, pages: 0, refused: 0 }); continue; }
  const base = path.join(root, c.dir);
  if (!fs.existsSync(base)) { corporaOut.push({ ...meta(c), available: false, reason: `directory '${c.dir}' not present`, pages: 0, refused: 0 }); continue; }

  const commit = git(root, ["rev-parse", "HEAD"]);
  const branch = git(root, ["rev-parse", "--abbrev-ref", "HEAD"]);
  let kept = 0, dropped = 0;

  for (const rel of walkMd(base)) {
    if ((c.exclude || []).some((re) => re.test(rel))) continue;
    let text;
    try { text = fs.readFileSync(path.join(base, rel), "utf8"); } catch { continue; }
    const reasons = judge(text);
    const digest = sha256(text).slice(0, 16);
    if (reasons.length) {
      dropped++;
      refused.push({
        corpus: c.id, path: `${c.dir}/${rel}`, bytes: Buffer.byteLength(text), sha256: digest,
        // Categories only. Never the matched value — a refusal list that quotes what it refused
        // would republish exactly what it withheld.
        reasons: [...new Set(reasons)],
      });
      continue;
    }
    kept++;
    pages.push({
      corpus: c.id,
      slug: `${c.id}/${slugify(rel)}`,
      title: title(text, path.basename(rel, path.extname(rel))),
      body: text,
      bytes: Buffer.byteLength(text),
      sha256: digest,
      citation: { repo: c.root_key, title: c.title, branch, commit, commit_short: commit.slice(0, 12), path: `${c.dir}/${rel}`, visibility: "private", resolvable: false },
    });
  }
  corporaOut.push({ ...meta(c), available: true, branch, commit_short: commit.slice(0, 12), pages: kept, refused: dropped });
}

function meta(c) { return { id: c.id, title: c.title, blurb: c.blurb, exclude_reason: c.exclude_reason || null }; }

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
};
fs.writeFileSync(path.join(OUT, "docs.json"), JSON.stringify(bundle, null, 1) + "\n", "utf8");

const totalBytes = pages.reduce((n, p) => n + p.bytes, 0);
console.log(`ingested ${pages.length} page(s), ${(totalBytes / 1024).toFixed(0)} KB; REFUSED ${refused.length}`);
for (const c of corporaOut) {
  console.log(`  ${c.id.padEnd(16)} ${c.available ? String(c.pages).padStart(4) + " pages, " + String(c.refused).padStart(3) + " refused" : "UNAVAILABLE: " + c.reason}`);
}
const byReason = {};
for (const r of refused) for (const x of r.reasons) byReason[x] = (byReason[x] || 0) + 1;
if (refused.length) console.log("  refusal reasons: " + Object.entries(byReason).map(([k, v]) => `${k} x${v}`).join(", "));
