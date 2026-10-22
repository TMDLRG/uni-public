// build_science.cjs — publish the DDNA "follow the science" export, so the public can check it.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// WHAT THIS CONSUMES
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// The UNI.DDNA repository is private. Its `tools/public_export` writes a one-way, allowlisted export
// from its trunk at a named commit — sealed gate verdicts, pre-registrations, receipt hashes, drand
// rounds, the binding math rules and the parity map — and refuses to write anything unless its own
// publication gate passes (allowlist, claim fence, secret scan, provenance). This generator is the
// second gate's front door: it reads that export from the directory mapped to the root key
// `ddna-science-export` in generators/roots.local.json, and it never reads the DDNA repository.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// WHY IT REFUSES INSTEAD OF SCRUBBING
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// The page asks the visitor's browser to recompute the sha256 of every published file and compare it
// with the export's manifest. A generator that rewrote a byte would make that check fail by
// construction, or worse, tempt someone to re-hash after the rewrite and call it verified. So the
// files are copied byte for byte, and anything that should not be public — a denied value, an address,
// a path, a token — stops the build instead. The fix for a refused export is upstream, in DDNA.
//
// OUTPUT
//   public/evidence/ddna/data/*.json    the five export files, byte-identical (fetched and hashed by
//                                       the page's in-browser checks)
//   content/generated/science.json      the provenance record: source commits, the manifest's sha256
//                                       and the checks this generator ran. No wall-clock stamp: the
//                                       same export always produces the same bytes.
//
//   node generators/build_science.cjs
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { root } = require("./local_roots.cjs");

const REPO = path.resolve(__dirname, "..");
const OUT_DATA = path.join(REPO, "public", "evidence", "ddna", "data");
const OUT_INDEX = path.join(REPO, "content", "generated", "science.json");
const FILES = ["manifest.json", "verdicts.json", "preregs.json", "math.json", "parity.json"];
const SCHEMA = "ddna-science-export/1";
const TRUNK_REF = "s/2026-10-13-organisms";

const refuse = (msg) => {
  console.error(`REFUSING: ${msg}`);
  console.error("  The DDNA export is published whole or not at all; fix it upstream and re-export.");
  process.exit(1);
};
const sha256 = (b) => crypto.createHash("sha256").update(b).digest("hex");

let dir;
try {
  dir = root("ddna-science-export");
} catch (e) {
  refuse(e.message);
}
if (!fs.existsSync(dir)) refuse("the directory mapped to 'ddna-science-export' does not exist");

// 1 · exactly the allowlisted files, nothing else
const present = fs.readdirSync(dir).sort();
const extra = present.filter((f) => !FILES.includes(f));
const missing = FILES.filter((f) => !present.includes(f));
if (extra.length) refuse(`the export holds ${extra.length} file(s) outside its allowlist`);
if (missing.length) refuse(`the export is missing ${missing.join(", ")}`);
const bytes = Object.fromEntries(FILES.map((f) => [f, fs.readFileSync(path.join(dir, f))]));

// 2 · the manifest: schema, the DDNA-side gate, the trunk, the hash of every file
let manifest;
try {
  manifest = JSON.parse(bytes["manifest.json"].toString("utf8"));
} catch {
  refuse("manifest.json is not JSON");
}
if (manifest.schema !== SCHEMA) refuse("unknown export schema");
if (manifest.gate?.ddna_side !== "PASS") refuse("the export does not record a passing DDNA-side gate");
if (manifest.trunk?.ref !== TRUNK_REF || !/^[0-9a-f]{40}$/.test(manifest.trunk?.commit ?? "")) refuse("the export does not name a trunk commit");
if (!/^[0-9a-f]{40}$/.test(manifest.tool?.commit ?? "")) refuse("the export does not name the tool commit");
const listed = new Map((manifest.files ?? []).map((f) => [f.path, f]));
for (const f of FILES.slice(1)) {
  const m = listed.get(f);
  if (!m) refuse(`${f} is not in the manifest`);
  if (m.sha256 !== sha256(bytes[f]) || m.bytes !== bytes[f].length) refuse(`${f} does not match its manifest sha256`);
}
if (listed.size !== FILES.length - 1) refuse("the manifest lists files outside the allowlist");

// 3 · nothing that must not be public: the operator's denied values (by index only) and the shapes
// this site's publish gate also refuses. Checked here so a bad export never reaches the tree.
const DENIED = (() => {
  try {
    const p = JSON.parse(fs.readFileSync(path.join(REPO, "safety", "patterns.local.json"), "utf8"));
    return (p.values || []).map(String).filter(Boolean);
  } catch {
    return null;
  }
})();
if (!DENIED || !DENIED.length) refuse("safety/patterns.local.json is absent or empty, so the export cannot be checked");
const SHAPES = [
  ["private-ipv4", /\b(?:10\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])|192\.168|100\.(?:6[4-9]|[7-9]\d|1[01]\d|12[0-7]))\.\d{1,3}\.\d{1,3}\b/],
  ["tailnet-hostname", /\b[a-z0-9-]+\.ts\.net\b/i],
  ["internal-dns", /\b[a-z0-9-]+\.(?:local|lan|internal)\b/i],
  ["windows-user-path", /\b[A-Za-z]:[\\/]+Users[\\/]/i],
  ["posix-home-path", /(?:^|[\s"'`(])\/(?:home|Users|root)\//],
  ["private-key", /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ["token", /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-(?:ant-|proj-)?[A-Za-z0-9_-]{16,}|xox[abprs]-[A-Za-z0-9-]{10,}|(?:AKIA|ASIA)[A-Z0-9]{16})/],
  ["url", /\b(?:https?|ftp|ssh|file):\/\//i],
];
// The operator's committed CATEGORY rules are not repeated here: their strings would themselves trip
// the publish gate's tracked-file scan (it did, on the first gate run of this file). The gate applies
// them to the copied export files, which are tracked, and to out/; the DDNA-side scan applies them too.
for (const f of FILES) {
  const text = bytes[f].toString("utf8");
  const lower = text.toLowerCase();
  DENIED.forEach((v, i) => {
    if (lower.includes(v.toLowerCase())) refuse(`${f} carries denied value #${i + 1}`);
  });
  for (const [label, rx] of SHAPES) if (rx.test(text)) refuse(`${f} carries a ${label} shape`);
}

// 4 · copy byte for byte; write the provenance record
fs.mkdirSync(OUT_DATA, { recursive: true });
for (const f of fs.readdirSync(OUT_DATA)) if (!FILES.includes(f)) fs.unlinkSync(path.join(OUT_DATA, f));
for (const f of FILES) fs.writeFileSync(path.join(OUT_DATA, f), bytes[f]);

const index = {
  note: [
    "Provenance of the DDNA 'follow the science' export published at /evidence/ddna/.",
    "The five files under public/evidence/ddna/data/ are byte-identical to the export written by UNI.DDNA tools/public_export at the trunk commit below; the page's browser checks re-hash them against manifest_sha256.",
    "UNI.DDNA is a private repository: the commits below cannot be opened from here.",
  ],
  schema_version: 1,
  generated_by: "generators/build_science.cjs",
  source: {
    repo: "TMDLRG/UNI.DDNA (private)",
    ref: manifest.trunk.ref,
    commit: manifest.trunk.commit,
    commit_short: manifest.trunk.commit.slice(0, 12),
    commit_date: manifest.trunk.commit_date,
    tool_commit: manifest.tool.commit,
    tool_version: manifest.tool.version,
  },
  manifest_sha256: sha256(bytes["manifest.json"]),
  files: FILES.map((f) => ({ path: `evidence/ddna/data/${f}`, sha256: sha256(bytes[f]), bytes: bytes[f].length })),
  checked: {
    allowlisted_files: FILES.length,
    manifest_hashes: FILES.length - 1,
    denied_values: DENIED.length,
    structural_shapes: SHAPES.length,
  },
};
fs.writeFileSync(OUT_INDEX, JSON.stringify(index, null, 1) + "\n");
console.log(`science: ${FILES.length} files copied byte-for-byte from DDNA trunk ${index.source.commit_short}; manifest ${index.manifest_sha256.slice(0, 16)}…`);
