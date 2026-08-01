// verify_provenance.cjs — every published claim of origin, held against the commit it names.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// THE EVIDENTIARY CLAIM THIS TESTS
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// Every wiki page on this site carries a citation of the form {repo, branch, commit, path}, and every
// quoted block in an article carries the same plus a line range. The assertion a reader receives is:
//
//     "this is <path> in <repo> at <commit>"    — and for a quote, "these are its exact bytes"
//
// That is a provenance claim, and it is the strongest thing this site says. A citation that is merely
// decorative is worse than no citation at all, because it LOOKS checkable: it invites reliance it
// cannot support.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// WHY IT WAS NOT TRUE, AND HOW THAT WAS FOUND
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// Both generators read the WORKING TREE and label the result with `git rev-parse HEAD`. Those are the
// same thing only when the tree is clean at that path, and nothing tested it.
//
// A forensic pass on 2026-08-01 held all 292 published pages against their cited commits. Measured:
// 216 byte-identical, 75 identical apart from line endings, and ONE whose published bytes were an
// uncommitted working-tree edit published under a commit sha that did not contain them. 291 of 292
// sound. One page is a small defect; an unguarded mechanism is the larger one.
//
// A NOTE ON THE FIRST MEASUREMENT, because it matters more than the result. The first run of that
// pass reported 26% of pages mis-cited. That number was WRONG — an artifact of comparing a CRLF
// working tree against LF git blobs on Windows. It convicted every file in a perfectly clean
// repository. An audit that does not control for its own instrument produces exactly the kind of
// alarming figure that discredits the auditor, so line endings are normalised here and the
// normalisation is counted separately rather than folded silently into the favourable column.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// WHAT THIS CANNOT DO
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// It proves the published bytes match a named commit IN THE OPERATOR'S CLONE. It does not prove that
// commit is the one a third party would get, because the source repositories are private — so a
// reader cannot run this. It is evidence produced by the proponent about the proponent's own
// artifacts. That limitation is structural, is printed on every run, and is not curable by code.
//
//   node safety/verify_provenance.cjs
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const REPO = path.resolve(__dirname, "..");
const ROOTS_FILE = path.join(REPO, "generators", "roots.local.json");

for (const f of [ROOTS_FILE, path.join(REPO, "content/generated/docs.json"), path.join(REPO, "content/generated/articles.json")]) {
  if (!fs.existsSync(f)) {
    console.error(`PROVENANCE CANNOT BE VERIFIED: ${path.relative(REPO, f)} is absent.`);
    console.error("  It fails rather than passing vacuously — certifying an absence is worse than nothing.");
    process.exit(1);
  }
}

const ROOTS = JSON.parse(fs.readFileSync(ROOTS_FILE, "utf8")).roots;
const docs = JSON.parse(fs.readFileSync(path.join(REPO, "content/generated/docs.json"), "utf8"));
const arts = JSON.parse(fs.readFileSync(path.join(REPO, "content/generated/articles.json"), "utf8")).articles;

const git = (root, args) => {
  try { return execFileSync("git", ["-C", root, ...args], { encoding: "utf8", maxBuffer: 1 << 26, stdio: ["ignore", "pipe", "pipe"] }); }
  catch { return null; }
};
const norm = (s) => s.split("\r\n").join("\n");

let fatal = 0;

// ─── 1 · every published PAGE resolves to the commit it names ────────────────────────────────────
{
  const t = { exact: 0, eol: 0, modified: 0, untracked: 0, missing: 0 };
  const bad = [];
  for (const p of docs.pages) {
    const root = ROOTS[p.citation.repo];
    if (!root) { t.missing++; bad.push(`${p.slug} — no root mapped for '${p.citation.repo}'`); continue; }
    const at = git(root, ["show", `${p.citation.commit}:${p.citation.path}`]);
    if (at === null) {
      const tracked = git(root, ["ls-files", "--error-unmatch", p.citation.path]);
      if (tracked === null) { t.untracked++; bad.push(`${p.slug} — ${p.citation.path} is in NO commit at all`); }
      else { t.missing++; bad.push(`${p.slug} — ${p.citation.path} absent at ${p.citation.commit.slice(0, 12)}`); }
      continue;
    }
    if (crypto.createHash("sha256").update(at).digest("hex").slice(0, 16) === p.sha256) { t.exact++; continue; }
    let disk = null;
    try { disk = fs.readFileSync(path.join(root, p.citation.path), "utf8"); } catch { /* handled below */ }
    if (disk !== null && norm(disk) === norm(at)) { t.eol++; continue; }
    t.modified++;
    bad.push(`${p.slug} — published bytes are not what ${p.citation.commit.slice(0, 12)} contains`);
  }
  const sound = t.exact + t.eol;
  console.log(`PAGES — ${docs.pages.length} published`);
  console.log(`  ${String(sound).padStart(4)}  resolve to the commit they name  (${t.exact} byte-identical, ${t.eol} identical but for line endings)`);
  console.log(`  ${String(t.modified).padStart(4)}  published bytes differ from the cited commit`);
  console.log(`  ${String(t.untracked).padStart(4)}  cite a commit that has never contained them`);
  console.log(`  ${String(t.missing).padStart(4)}  unresolvable for another reason`);
  for (const b of bad.slice(0, 20)) console.log(`      ✗ ${b}`);
  if (bad.length > 20) console.log(`      … and ${bad.length - 20} more`);
  fatal += bad.length;
}

// ─── 2 · every QUOTED BLOCK is the source's own bytes at the commit it names ─────────────────────
// This is the strongest evidence on the site — the reader HOLDS the source text rather than a
// description of it — so it is held to the strictest form of the test.
{
  const quotes = arts.flatMap((a) => (a.quotes || []).map((q) => ({ ...q, article: a.slug })));
  let ok = 0; const bad = [];
  for (const q of quotes) {
    const root = ROOTS[q.cite.repo];
    const at = root ? git(root, ["show", `${q.cite.commit}:${q.cite.path}`]) : null;
    if (at === null) { bad.push(`${q.article}: ${q.cite.path} unresolvable at ${q.cite.commit.slice(0, 12)}`); continue; }
    const [a, b] = q.cite.range.split("-").map(Number);
    const lines = norm(at).split("\n");
    if (b > lines.length) { bad.push(`${q.article}: ${q.cite.path}:${q.cite.range} out of bounds (${lines.length} lines at that commit)`); continue; }
    if (lines.slice(a - 1, b).join("\n").replace(/\s+$/, "") === norm(q.text).replace(/\s+$/, "")) ok++;
    else bad.push(`${q.article}: ${q.cite.path}:${q.cite.range} — the published quote is not the source text at that commit`);
  }
  console.log(`\nQUOTED BLOCKS — ${quotes.length} published`);
  console.log(`  ${String(ok).padStart(4)}  byte-identical to the source at the commit they name`);
  console.log(`  ${String(bad.length).padStart(4)}  differ`);
  for (const b of bad) console.log(`      ✗ ${b}`);
  fatal += bad.length;
}

// ─── 3 · the fence that keeps it that way is actually operating ─────────────────────────────────
{
  const u = docs.unprovenanced || { count: 0, items: [] };
  console.log(`\nTHE FENCE — ${u.count} document(s) withheld because their own bytes are uncommitted`);
  for (const i of u.items) console.log(`      · ${i.corpus}: ${i.path}`);
  if (!u.count) console.log("      (every source path being published is committed)");
}

// ─── 4 · what a reader can and cannot check for themselves ──────────────────────────────────────
{
  const cites = arts.flatMap((a) => a.cites || []);
  const quotes = arts.flatMap((a) => a.quotes || []);
  const resolvable = cites.filter((c) => c.resolvable).length;
  console.log(`\nWHAT A READER CAN CHECK`);
  console.log(`  ${String(quotes.length).padStart(4)}  quoted blocks — the reader HAS the source bytes; checkable against any future public release`);
  console.log(`  ${String(cites.length).padStart(4)}  citations — of which ${resolvable} can be opened today`);
  console.log(`  ${String(docs.pages.length).padStart(4)}  pages carry a sha256 of the original, so a reader can verify a page against what was ingested`);
  if (resolvable === 0) {
    console.log(`      The source repositories are PRIVATE. Every citation names a real file at a real commit`);
    console.log(`      and NONE of them can be opened by a reader today. The site says so on its face. This`);
    console.log(`      check runs in the operator's clone, so it is evidence produced by the proponent about`);
    console.log(`      the proponent's own artifacts — corroborative, not independent.`);
  }
}

console.log(`\nPROVENANCE: ${fatal ? "FAIL" : "PASS"} — ${fatal} claim(s) of origin do not hold`);
console.log("  This proves published bytes match a named commit IN THIS CLONE. It cannot prove that");
console.log("  commit is what a third party would receive, and no amount of code here can. Only");
console.log("  publishing the source repositories, or an independent custodian, closes that gap.");
process.exit(fatal ? 1 : 0);
