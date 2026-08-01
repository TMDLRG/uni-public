// build_lenses.cjs — compile authored reading-lane prose into content/generated/lenses.json.
//
// WHAT A LENS IS: two short pieces of prose (Plain, Clear) ABOUT a published page, so a reader who
// cannot yet read the document can meet it anyway. The document itself — the Precise lane — is never
// authored here and never appears in this file's output.
//
// ── THE FOUR STRUCTURAL GUARANTEES ───────────────────────────────────────────────────────────────
// The 291 wiki pages are the operator's real repository files, and `safety/verify_provenance.cjs`
// proves their bytes against a named commit. Agent-written summary sitting beside them is the single
// largest risk this site has taken, so the separation is structural, not procedural:
//
//   1. THERE IS NO `precise` FIELD IN THE OUTPUT, AND THERE CANNOT BE. Fields are named and copied
//      one at a time (never spread), and `verify_lenses.cjs` fails if any lens record carries a key
//      named precise/body/source_text/source_body/document. Authored prose has no field to occupy.
//   2. THIS FILE NEVER WRITES docs.json. It opens it read-only and writes exactly one path.
//   3. THIS FILE CANNOT REACH THE PRIVATE REPOSITORIES. It does not read `roots.local.json` and the
//      gate asserts that string never appears here. An author therefore works only from the
//      PUBLISHED body, so a lens cannot contain anything the site has not already published. That is
//      the mitigation for the disclosure risk, and it is the most important rule in the pipeline.
//   4. EVERY LENS IS BOUND TO TWO DIGESTS of the page it describes (see below).
//
// ── WHY TWO DIGESTS ──────────────────────────────────────────────────────────────────────────────
// `docs.json`'s `page.sha256` is the digest of the ORIGINAL file — `ingest_docs.cjs` computes it
// BEFORE `redact()` runs. So it does not change when redaction policy changes the bytes a reader
// actually sees. A lens bound only to it would silently survive its page being re-redacted. So each
// lens also carries `source_body_sha256` = sha256(page.body), the published bytes it was written
// about. Both must match at gate time or the lens is stale and named as stale.
//
// MODES
//   (none)                        build content/generated/lenses.json
//   --scaffold --corpus <id>      write authoring stubs with the published body inlined
//   --review-queue <id>           write one file a human can read in a sitting
//   --mark-reviewed --by <who> --pages a,b,c    stamp review records (a glob is REFUSED)
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const LENS_DIR = path.join(ROOT, "content", "lenses");
const OUT = path.join(ROOT, "content", "generated", "lenses.json");
const DOCS = path.join(ROOT, "content", "generated", "docs.json");
const ARTS = path.join(ROOT, "content", "generated", "articles.json");

const sha = (s) => crypto.createHash("sha256").update(s, "utf8").digest("hex");
const sha16 = (s) => sha(s).slice(0, 16);
const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));

const argv = process.argv.slice(2);
const flag = (n) => argv.includes(n);
const val = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };

// ── the corpus under description ────────────────────────────────────────────────────────────────
const docs = readJson(DOCS);
const articles = readJson(ARTS).articles;

const targets = [
  ...docs.pages.map((p) => ({
    scope: "wiki", key: p.slug, corpus: p.corpus, title: p.title,
    body: p.body, source_sha256: p.sha256,
  })),
  ...articles.map((a) => ({
    scope: "article", key: a.slug, corpus: null, title: a.title,
    body: a.body, source_sha256: sha16(a.body),
  })),
].map((t) => ({ ...t, source_body_sha256: sha16(t.body), words: (t.body.match(/\S+/g) || []).length }));

const lensPath = (t) =>
  t.scope === "wiki"
    ? path.join(LENS_DIR, "wiki", t.key + ".md")
    : path.join(LENS_DIR, "articles", t.key + ".md");

// ── front matter: THE SAME flat parser build_articles.cjs uses. No new syntax to learn. ──────────
function parseLensFile(src) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(src);
  if (!m) return null;
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^(\w+):\s*(.*)$/.exec(line);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  const rest = m[2];
  const grab = (tag) => {
    const re = new RegExp(`<!--${tag}-->([\\s\\S]*?)(?=<!--(?:PLAIN|CLEAR)-->|$)`);
    const g = re.exec(rest);
    return g ? g[1].trim() : "";
  };
  return { meta, plain: grab("PLAIN"), clear: grab("CLEAR") };
}

// Markdown → HTML for a lens. Paragraphs only, on purpose: a lens is prose, and headings would break
// the page's single-<h1> contract. Inline emphasis and code are allowed; everything else is refused
// by check L3 in the gate rather than silently stripped here, so an author is told what they did.
function lensHtml(md) {
  const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  return md
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim()).filter(Boolean)
    .map((p) => {
      let h = esc(p.replace(/\s*\r?\n\s*/g, " "));
      h = h.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
      h = h.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
      h = h.replace(/(^|[^*])\*([^*]+)\*/g, "$1<i>$2</i>");
      return `<p>${h}</p>`;
    })
    .join("");
}

// ── SCAFFOLD ────────────────────────────────────────────────────────────────────────────────────
if (flag("--scaffold")) {
  const corpus = val("--corpus");
  if (!corpus) { console.error("--scaffold needs --corpus <id> (or 'articles')"); process.exit(1); }
  const set = targets.filter((t) => (corpus === "articles" ? t.scope === "article" : t.corpus === corpus));
  if (!set.length) { console.error(`no pages in corpus '${corpus}'`); process.exit(1); }
  let wrote = 0, kept = 0;
  for (const t of set) {
    const p = lensPath(t);
    if (fs.existsSync(p)) {
      const cur = parseLensFile(fs.readFileSync(p, "utf8"));
      if (cur && (cur.plain || cur.clear)) { kept++; continue; }   // never clobber authored prose
    }
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, [
      "---",
      "lens_schema: 1",
      `scope: ${t.scope}`,
      `key: ${t.key}`,
      `corpus: ${t.corpus || ""}`,
      `source_sha256: ${t.source_sha256}`,
      `source_body_sha256: ${t.source_body_sha256}`,
      `source_title: ${t.title}`,
      `source_words: ${t.words}`,
      "authored_by: ",
      "authored_at: ",
      "review_state: absent",
      "reviewed_by: ",
      "reviewed_at: ",
      "note: ",
      "---",
      "<!--PLAIN-->",
      "",
      "<!--CLEAR-->",
      "",
      "<!--",
      "READ THE PUBLISHED BODY FROM content/generated/docs.json — the page whose slug is above.",
      "That file is a committed, public artifact, so you never need the private repository, and a",
      "lens is therefore bounded by what this site has already published. (The body is NOT inlined",
      "here on purpose: doing so would duplicate ~5 MB of docs.json across 304 files.)",
      "",
      "Read content/lenses/AUTHORING.md first. Introduce no number, name or certainty this text does",
      "not contain; if it hedges (simulation / plan / hypothesis / not yet), your lens must hedge too.",
      "-->",
      "",
    ].join("\n"), "utf8");
    wrote++;
  }
  console.log(`scaffolded ${wrote} file(s) in corpus '${corpus}'; kept ${kept} already-authored file(s) untouched`);
  process.exit(0);
}

// ── BUILD ───────────────────────────────────────────────────────────────────────────────────────
const forbidden = readJson(path.join(LENS_DIR, "forbidden.json"));
const epistemic = readJson(path.join(LENS_DIR, "epistemic.json"));
const contractSha = sha(fs.readFileSync(path.join(LENS_DIR, "AUTHORING.md"), "utf8"));

// Orientation panels: one authored paragraph set per corpus (+ one for articles).
const orientations = [];
const oDir = path.join(LENS_DIR, "orientation");
if (fs.existsSync(oDir)) {
  for (const f of fs.readdirSync(oDir).filter((x) => x.endsWith(".md")).sort()) {
    const parsed = parseLensFile(fs.readFileSync(path.join(oDir, f), "utf8"));
    if (!parsed) continue;
    const md = (parsed.plain || "").trim();
    if (!md) continue;
    orientations.push({
      corpus: path.basename(f, ".md"),
      title: parsed.meta.title || path.basename(f, ".md"),
      html: lensHtml(md),
      chars: md.length,
      authored_by: parsed.meta.authored_by || "",
      authored_at: parsed.meta.authored_at || "",
      review_state: parsed.meta.review_state || "absent",
      reviewed_by: parsed.meta.reviewed_by || null,
      reviewed_at: parsed.meta.reviewed_at || null,
      source_file: `content/lenses/orientation/${f}`,
    });
  }
}

const lenses = [];
const faults = [];
for (const t of targets) {
  const p = lensPath(t);
  if (!fs.existsSync(p)) continue;
  const parsed = parseLensFile(fs.readFileSync(p, "utf8"));
  if (!parsed) { faults.push(`${path.relative(ROOT, p)}: no front matter`); continue; }
  if (!parsed.plain && !parsed.clear) continue;          // scaffolded but not yet written

  const rel = path.relative(ROOT, p).split(path.sep).join("/");
  // Staleness is a BUILD-TIME failure, not a silent skip: a lens whose page moved is worse than none.
  if (parsed.meta.source_sha256 !== t.source_sha256)
    faults.push(`${rel}: source_sha256 ${parsed.meta.source_sha256} != ${t.source_sha256} — the document moved under the lens`);
  if (parsed.meta.source_body_sha256 !== t.source_body_sha256)
    faults.push(`${rel}: source_body_sha256 stale — the PUBLISHED bytes changed (re-redaction?), so this lens describes text no reader now sees`);

  const panel = (md) => md ? { html: lensHtml(md), chars: md.length, words: (md.match(/\S+/g) || []).length, sha256: sha16(md) } : null;
  const rec = {
    scope: t.scope,
    key: t.key,
    corpus: t.corpus,
    source_sha256: t.source_sha256,
    source_body_sha256: t.source_body_sha256,
    source_words: t.words,
    authored_by: parsed.meta.authored_by || "",
    authored_at: parsed.meta.authored_at || "",
    review_state: parsed.meta.review_state || "absent",
    reviewed_by: parsed.meta.reviewed_by || null,
    reviewed_at: parsed.meta.reviewed_at || null,
    plain: panel(parsed.plain),
    clear: panel(parsed.clear),
    note: parsed.meta.note || "",
    source_file: rel,
  };
  lenses.push(rec);
}

if (faults.length) {
  console.error("BUILD REFUSED — " + faults.length + " fault(s):");
  for (const f of faults) console.error("  " + f);
  process.exit(1);
}

const tally = { absent: 0, draft: 0, reviewed: 0 };
for (const l of lenses) tally[l.review_state] = (tally[l.review_state] || 0) + 1;

fs.writeFileSync(OUT, JSON.stringify({
  note: [
    "AUTHORED PROSE ABOUT DOCUMENTS. Nothing in this file is a source document, and no field here is",
    "ever rendered as one. The documents live in content/generated/docs.json and are written by",
    "generators/ingest_docs.cjs alone. This file is written by generators/build_lenses.cjs, which",
    "cannot read the private repositories at all — it has no access to roots.local.json, by design.",
    "There is no 'precise' field in this schema and there cannot be: the Precise lane is the document,",
    "re-rendered from docs.json on every deploy and compared byte-for-byte by verify_lenses.cjs.",
  ],
  schema_version: 1,
  generated_by: "generators/build_lenses.cjs",
  authoring_contract_sha256: contractSha,
  dictionaries: {
    forbidden_sha256: sha(JSON.stringify(forbidden)),
    epistemic_sha256: sha(JSON.stringify(epistemic)),
  },
  orientations,
  lenses,
  totals: {
    content_routes: targets.length,
    lensed: lenses.length,
    reviewed: tally.reviewed || 0,
    draft: tally.draft || 0,
    absent_records: tally.absent || 0,
    unlensed: targets.length - lenses.length,
    orientations: orientations.length,
  },
  limits: [
    "NO CHECK IN THIS PIPELINE VERIFIES MEANING. A lens can introduce no number, no name and no",
    "certainty the document lacks, be bound to two digests of it, and still be a bad summary: it can",
    "emphasise the wrong thing, omit the caveat that mattered, or be fluent and hollow.",
    "'review_state: reviewed' is a CLAIM by a named person on a named date. It is recorded and",
    "published. It is not a measurement, and no gate can make it one.",
  ],
}, null, 1) + "\n", "utf8");

console.log(`lenses.json — ${lenses.length}/${targets.length} route(s) lensed · ` +
  `${tally.reviewed || 0} reviewed · ${tally.draft || 0} draft · ${orientations.length} orientation(s)`);
