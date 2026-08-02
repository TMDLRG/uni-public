// build_articles.cjs — authored prose whose citations cannot rot.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// THE PROBLEM
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// Everything else on this site is a document rendered as it is written, so it cannot be wrong about
// itself. The subsystem articles are different: they are PROSE ABOUT CODE, and prose about code goes
// stale the moment the code moves. An article stating "the Producer's actions include spawning and
// culling agents (producer.ex:406)" is true today and quietly false after one refactor, and a public
// site full of stale line numbers is worse than one with no citations at all — it looks checkable
// and isn't.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// THE SOLUTION WAS ALREADY SPECIFIED IN THIS ESTATE AND NEVER BUILT
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// viewer/verify_claims.cjs:78 records: "@claim count / @claim quote are specified but NOT
// IMPLEMENTED". That is exactly this idea — hold a written claim to the disk it describes — and it
// has been sitting unbuilt in the estate's own instrument. This implements it for the public site.
//
// Articles carry markers instead of hand-typed references:
//
//   {{cite:uni-minecraft:lib/sp/producer.ex:403-416}}   → a resolved citation block
//   {{quote:uni-minecraft:lib/sp/producer.ex:403-416}}  → the ACTUAL source lines, inlined
//   {{count:uni-minecraft:lib/sp/control_plane/*.ex}}   → a live file count
//
// At build time each marker is resolved against the real file at the real commit, and the build
// FAILS if:
//   - the source repo is not available,
//   - the path does not exist,
//   - the line range runs past the end of the file,
//   - a quote resolves to nothing.
//
// So a rotted citation is a RED BUILD, not a lie on a page. And a quote is the file's own bytes by
// construction — it cannot drift from the source, because it IS the source, fetched at build time.
//
// This is the most valuable machinery on the site and it generalises to everything written later.
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const HERE = __dirname;
const REPO = path.resolve(HERE, "..");
const ARTICLES = path.join(REPO, "content", "articles");
const OUT = path.join(REPO, "content", "generated");

const rootsFile = path.join(HERE, "roots.local.json");
const patternsFile = path.join(REPO, "safety", "patterns.local.json");
for (const [f, what] of [[rootsFile, "generators/roots.local.json"], [patternsFile, "safety/patterns.local.json"]]) {
  if (!fs.existsSync(f)) { console.error(`REFUSING TO BUILD ARTICLES: ${what} is absent.`); process.exit(1); }
}
const ROOTS = JSON.parse(fs.readFileSync(rootsFile, "utf8")).roots || {};
const DENIED = (JSON.parse(fs.readFileSync(patternsFile, "utf8")).values || []).map((v) => String(v).toLowerCase());
const SOURCES = JSON.parse(fs.readFileSync(path.join(HERE, "sources.json"), "utf8"));

// Whether a citation into this repo can be opened, and against which published snapshot. Derived
// from the declared manifest so a source with no snapshot (the math workbench) stays unresolvable
// and says so, rather than emitting a link that 404s. `commit` remains the PRIVATE source commit —
// the provenance the quoted bytes were fetched at — and is never overwritten by the snapshot sha.
function publication(repoKey) {
  const s = (SOURCES.sources || []).find((x) => x.id === repoKey || x.root_key === repoKey);
  if (!s || s.visibility !== "public" || !s.public_repo || !s.public_snapshot_commit) return { resolvable: false };
  return {
    resolvable: true,
    public_repo: s.public_repo,
    public_commit: s.public_snapshot_commit,
    public_commit_short: s.public_snapshot_commit.slice(0, 12),
  };
}

const git = (root, args) => {
  try { return execFileSync("git", ["-C", root, ...args], { encoding: "utf8", maxBuffer: 1 << 26 }).trim(); } catch { return ""; }
};

// Resolved once per repo so every citation in a build names the same commit.
const HEADS = {};
for (const [key, root] of Object.entries(ROOTS)) {
  if (!fs.existsSync(root)) continue;
  HEADS[key] = { commit: git(root, ["rev-parse", "HEAD"]), branch: git(root, ["rev-parse", "--abbrev-ref", "HEAD"]), root };
}

const failures = [];
function fail(article, msg) { failures.push(`${article}: ${msg}`); }

// The same structural shapes the ingest refuses. Authored prose is scanned too — an article is not
// exempt from the rules the documents it describes are held to.
const REFUSE = [
  ["private-ipv4", /\b(?:10\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])|192\.168)\.\d{1,3}\.\d{1,3}\b/],
  ["tailscale-ip", /\b100\.(?:6[4-9]|[7-9]\d|1\d\d|2[0-4]\d|25[0-5])\.\d{1,3}\.\d{1,3}\b/],
  ["tailnet-name", /\b[a-z0-9-]+\.ts\.net\b/i],
  ["internal-dns", /\b[a-z0-9-]+\.(?:uni-lab|lab)\.local\b/i],
  ["operator-path", /[A-Za-z]:[\\/]Users[\\/][A-Za-z0-9._-]+/],
];

function readLines(repoKey, rel, article) {
  const h = HEADS[repoKey];
  if (!h) { fail(article, `unknown source repo '${repoKey}' — declare it in generators/roots.local.json`); return null; }
  const abs = path.join(h.root, rel);
  if (!fs.existsSync(abs)) { fail(article, `CITATION DOES NOT RESOLVE — ${repoKey}:${rel} does not exist at ${h.commit.slice(0, 12)}`); return null; }
  return { lines: fs.readFileSync(abs, "utf8").split(/\r?\n/), head: h };
}

function parseRange(spec) {
  if (!spec) return null;
  const m = /^(\d+)(?:-(\d+))?$/.exec(spec);
  if (!m) return null;
  const a = Number(m[1]);
  return { start: a, end: m[2] ? Number(m[2]) : a };
}

/** {{cite:repo:path:lines}} → a citation record the page renders. */
function resolveCite(article, repoKey, rel, rangeSpec) {
  const r = readLines(repoKey, rel, article);
  if (!r) return null;
  const range = parseRange(rangeSpec);
  if (rangeSpec && !range) { fail(article, `bad line spec '${rangeSpec}' for ${repoKey}:${rel}`); return null; }
  if (range && range.end > r.lines.length) {
    fail(article, `CITATION OUT OF BOUNDS — ${repoKey}:${rel}:${rangeSpec} but the file has ${r.lines.length} lines at ${r.head.commit.slice(0, 12)}. The code moved and the article did not.`);
    return null;
  }
  return { repo: repoKey, path: rel, range: range ? `${range.start}${range.end !== range.start ? "-" + range.end : ""}` : null, commit: r.head.commit, commit_short: r.head.commit.slice(0, 12), branch: r.head.branch, ...publication(repoKey) };
}

/** {{quote:repo:path:lines}} → the file's OWN bytes, so the quote cannot drift from the source. */
function resolveQuote(article, repoKey, rel, rangeSpec) {
  const r = readLines(repoKey, rel, article);
  if (!r) return null;
  const range = parseRange(rangeSpec);
  if (!range) { fail(article, `a quote needs a line range: ${repoKey}:${rel}`); return null; }
  if (range.end > r.lines.length) {
    fail(article, `QUOTE OUT OF BOUNDS — ${repoKey}:${rel}:${rangeSpec} but the file has ${r.lines.length} lines at ${r.head.commit.slice(0, 12)}.`);
    return null;
  }
  const slice = r.lines.slice(range.start - 1, range.end);
  const text = slice.join("\n").replace(/\s+$/, "");
  if (!text.trim()) { fail(article, `QUOTE IS EMPTY — ${repoKey}:${rel}:${rangeSpec} resolved to blank lines.`); return null; }
  // A quote lifts real source into a public page, so it is scanned like everything else.
  for (const [label, re] of REFUSE) {
    if (re.test(text)) { fail(article, `QUOTE CONTAINS ${label} — ${repoKey}:${rel}:${rangeSpec}. Quote a different range; do not redact a quote, because a redacted quote is no longer the source.`); return null; }
  }
  const low = text.toLowerCase();
  if (DENIED.some((v) => v && low.includes(v))) { fail(article, `QUOTE CONTAINS A DENIED VALUE — ${repoKey}:${rel}:${rangeSpec}.`); return null; }
  return { text, lang: path.extname(rel).replace(".", ""), cite: { repo: repoKey, path: rel, range: `${range.start}-${range.end}`, commit: r.head.commit, commit_short: r.head.commit.slice(0, 12), branch: r.head.branch, ...publication(repoKey) } };
}

/** {{count:repo:glob}} → a live count, so the article never carries a hand-typed number. */
function resolveCount(article, repoKey, globSpec) {
  const h = HEADS[repoKey];
  if (!h) { fail(article, `unknown source repo '${repoKey}'`); return null; }
  const rx = new RegExp("^" + globSpec.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, " ").replace(/\*/g, "[^/]*").replace(/ /g, ".*") + "$");
  let n = 0;
  const walk = (dir, rel) => {
    let entries; try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (/^(node_modules|\.git|_build|deps|dist|\.next)$/.test(e.name)) continue;
      const r = rel ? rel + "/" + e.name : e.name;
      if (e.isDirectory()) walk(path.join(dir, e.name), r);
      else if (rx.test(r)) n++;
    }
  };
  walk(h.root, "");
  if (n === 0) fail(article, `COUNT RESOLVED TO ZERO — ${repoKey}:${globSpec} matched nothing. Either the glob is wrong or the thing being counted is gone.`);
  return n;
}

// ─── build ───────────────────────────────────────────────────────────────────────────────────────
if (!fs.existsSync(ARTICLES)) { console.log("no content/articles/ directory — nothing to build"); process.exit(0); }

const articles = [];
for (const file of fs.readdirSync(ARTICLES).filter((f) => /\.md$/.test(f)).sort()) {
  const slug = file.replace(/\.md$/, "").replace(/^\d+[-_]/, "");
  let src = fs.readFileSync(path.join(ARTICLES, file), "utf8");

  const meta = {};
  const fm = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(src);
  if (fm) {
    for (const line of fm[1].split(/\r?\n/)) {
      const m = /^(\w+):\s*(.*)$/.exec(line);
      if (m) meta[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
    src = src.slice(fm[0].length);
  }

  const cites = [];
  const quotes = [];

  src = src.replace(/\{\{count:([a-z0-9-]+):([^}]+)\}\}/g, (_, repo, glob) => {
    const n = resolveCount(file, repo, glob.trim());
    return n === null ? "«COUNT FAILED»" : String(n);
  });

  src = src.replace(/\{\{quote:([a-z0-9-]+):([^:}]+)(?::([\d-]+))?\}\}/g, (_, repo, rel, range) => {
    const q = resolveQuote(file, repo, rel.trim(), range);
    if (!q) return "«QUOTE FAILED»";
    const i = quotes.push(q) - 1;
    return `\n<!--QUOTE:${i}-->\n`;
  });

  src = src.replace(/\{\{cite:([a-z0-9-]+):([^:}]+)(?::([\d-]+))?\}\}/g, (_, repo, rel, range) => {
    const c = resolveCite(file, repo, rel.trim(), range);
    if (!c) return "«CITE FAILED»";
    const i = cites.push(c) - 1;
    return `\n<!--CITE:${i}-->\n`;
  });

  for (const [label, re] of REFUSE) if (re.test(src)) fail(file, `the article's own prose contains ${label}`);
  const low = src.toLowerCase();
  if (DENIED.some((v) => v && low.includes(v))) fail(file, "the article's own prose contains a denied value");

  articles.push({
    slug,
    title: meta.title || slug,
    summary: meta.summary || "",
    order: Number(meta.order || 99),
    body: src,
    cites,
    quotes,
  });
}

if (failures.length) {
  console.error(`\nARTICLE BUILD FAILED — ${failures.length} unresolved citation(s):\n`);
  for (const f of failures) console.error("  " + f);
  console.error("\nA citation that no longer resolves is a claim the reader cannot check. The build stops");
  console.error("here rather than publishing a page that looks verifiable and is not.");
  process.exit(1);
}

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "articles.json"), JSON.stringify({ schema_version: 1, generated_by: "generators/build_articles.cjs", articles: articles.sort((a, b) => a.order - b.order) }, null, 1) + "\n", "utf8");

const nc = articles.reduce((n, a) => n + a.cites.length, 0);
const nq = articles.reduce((n, a) => n + a.quotes.length, 0);
console.log(`built ${articles.length} article(s): ${nc} citation(s) and ${nq} quote(s), all resolved against live source`);
for (const a of articles) console.log(`  ${a.slug.padEnd(22)} ${String(a.cites.length).padStart(3)} cites, ${String(a.quotes.length).padStart(3)} quotes`);
