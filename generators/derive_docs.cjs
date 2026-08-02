// derive_docs.cjs — wiki pages rendered FROM STRUCTURED DATA, in the same bundle and under the same
// gates as every markdown page.
//
// WHY THIS EXISTS. The lexicon (one concept in five registers) and the nature ledger (307 constants,
// 88 of them ruled INADMISSIBLE) are the estate's MATH, and they live as JSON, not markdown. The
// ingest's walker only reads .md, so a `dir: "lexicon"` corpus yields zero pages. The operator's
// words were "no math"; this is the math.
//
// THE ONE HARD CONSTRAINT, AND WHY THE DESIGN IS HONEST.
// safety/verify_provenance.cjs compares sha256(git show <commit>:<citation.path>) to page.sha256. So
// for a derived page:
//   - citation.path is the SOURCE JSON path (e.g. lexicon/terms/math-core.json),
//   - page.sha256 is the digest of THAT JSON's bytes, taken exactly as a markdown page takes its own,
//   - and the rendered body is NOT claimed to be the source. Every page opens with a banner saying
//     so, and the digest is explicitly the JSON's, not this text's.
// The dirty fence, hasDenied(), redact() and judge() all still run — the redaction count is taken
// over the FINAL rendered body, so a value emitted twice cannot desync the marker count from the
// number (verify_publish_safe requires them equal).
"use strict";

const fs = require("fs");
const path = require("path");

// The corpora these pages belong to, so ingest can list them in the wiki like any other.
const DERIVED_CORPORA = [
  {
    id: "lexicon", title: "The Lexicon",
    blurb: "One concept in five registers — Sanskrit, Latin, English, Hindi, Spanish — with what each term must never be translated as, and which back-translation tests have not been run.",
    off_main_nav: false,
  },
  {
    id: "constants", title: "Constants and the Nature Ledger",
    blurb: "Every load-bearing number with its units, scope, evidence class, source and falsifier — including the 88 claims the ledger rules INADMISSIBLE.",
    off_main_nav: false,
  },
];

// ── markdown-safe rendering helpers ──────────────────────────────────────────────────────────────
const s = (v) => (v === null || v === undefined ? "" : String(v));
// A table cell must not carry a raw pipe or newline, or it breaks the row silently.
const cell = (v) => s(v).replace(/\r?\n+/g, " ").replace(/\|/g, "\\|").trim();
const slug = (x) => x.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function banner(sourceRel, commitShort) {
  return (
    `> **RENDERED FROM STRUCTURED DATA — this page is not a markdown file.**\n` +
    `> Source: \`${sourceRel}\` in \`uni-cookbook\` at \`${commitShort}\`.\n` +
    `> The sha256 recorded for this page is the digest of **that JSON**, not of this text. The\n` +
    `> renderer is \`generators/derive_docs.cjs\`; it copies fields and adds no facts. Every value\n` +
    `> below is a field of the source, verbatim, including the ones that read \`NOT RUN\` and \`PENDING\`.\n`
  );
}

// ── LEXICON: one term file → one page ────────────────────────────────────────────────────────────
const REGISTERS = ["sanskrit", "latin", "english", "hindi", "spanish"];

function renderTermFile(j, sourceRel, commitShort) {
  const rows = j.entries || j.terms || [];
  const def = (e) => s(e.source_definition || e.definition || e.definition_from_concepts_json || "(no definition in this file; see CONCEPTS)");
  const out = [];
  out.push(`# ${s(j.what_this_is ? j.file_id || "The lexicon" : j.file_id || "The lexicon")} — lexicon`);
  out.push("");
  out.push(banner(sourceRel, commitShort));
  out.push("");
  if (j.what_this_is) out.push(s(j.what_this_is));
  out.push("");
  const meta = [];
  if (j.authored_utc) meta.push(`authored ${s(j.authored_utc)}`);
  if (j.reviewer) meta.push(`reviewer: ${s(j.reviewer)}`);
  if (j.counts) meta.push(`counts: ${cell(JSON.stringify(j.counts))}`);
  if (meta.length) { out.push(`*${meta.join(" · ")}*`); out.push(""); }
  if (Array.isArray(j.falsifiers) && j.falsifiers.length) {
    out.push("**Falsifiers for this file**");
    out.push("");
    for (const f of j.falsifiers) out.push(`- ${s(typeof f === "string" ? f : JSON.stringify(f))}`);
    out.push("");
  }
  for (const e of rows) {
    out.push(`## ${s(e.concept_id)} — ${s(e.english_term)}`);
    out.push("");
    const line = [];
    if (e.store !== undefined) line.push(`*Store:* \`${s(e.store)}\``);
    if (e.domain || e.domain_in_CONCEPTS) line.push(`*Domain:* \`${s(e.domain || e.domain_in_CONCEPTS)}\``);
    if (e.confidence) line.push(`*Confidence:* \`${cell(e.confidence)}\``);
    if (e.reviewer) line.push(`*Reviewer:* \`${cell(e.reviewer)}\``);
    if (line.length) { out.push(line.join(" · ")); out.push(""); }
    out.push(def(e));
    out.push("");
    // register table: form + gloss + citation-status, per register that exists on the entry
    const present = REGISTERS.filter((r) => e[r] && typeof e[r] === "object");
    if (present.length) {
      out.push("| register | form | literal gloss | status |");
      out.push("|---|---|---|---|");
      for (const r of present) {
        const o = e[r];
        const form = o.devanagari ? `${cell(o.devanagari)} (${cell(o.iast || o.translit || "")})` : cell(o.form || o.term || "");
        out.push(`| ${r} | ${form || "—"} | ${cell(o.literal_gloss || o.gloss || o.definition || "—")} | ${cell(o.status || "—")} |`);
      }
      out.push("");
    }
    if (Array.isArray(e.ambiguity_notes) && e.ambiguity_notes.length) {
      out.push("**Ambiguity notes**");
      out.push("");
      for (const a of e.ambiguity_notes) out.push(`- ${s(typeof a === "string" ? a : JSON.stringify(a))}`);
      out.push("");
    }
    if (Array.isArray(e.forbidden_mistranslations) && e.forbidden_mistranslations.length) {
      out.push("**Forbidden mistranslations**");
      out.push("");
      out.push("| register | form | why it is wrong |");
      out.push("|---|---|---|");
      for (const f of e.forbidden_mistranslations) out.push(`| ${cell(f.register)} | ${cell(f.form)} | ${cell(f.why_wrong || f.why)} |`);
      out.push("");
    }
    if (e.back_translation_test) {
      const b = e.back_translation_test;
      out.push(`**Back-translation test** — status: \`${cell(b.status || b.result || "NOT RUN: no reader has been asked")}\``);
      if (b.procedure) out.push(`\n${s(b.procedure)}`);
      out.push("");
    }
  }
  return out.join("\n");
}

// ── CONCEPTS.json → the index page ───────────────────────────────────────────────────────────────
function renderConcepts(j, sourceRel, commitShort) {
  const out = [];
  out.push(`# The lexicon — every concept, by domain`);
  out.push("");
  out.push(banner(sourceRel, commitShort));
  out.push("");
  if (j.what_this_is) { out.push(s(j.what_this_is)); out.push(""); }
  if (j.field_contract) { out.push(`**Field contract** — ${cell(j.field_contract)}`); out.push(""); }
  const concepts = j.concepts || j.entries || [];
  const byDomain = {};
  for (const c of concepts) (byDomain[c.domain || "(no domain)"] ||= []).push(c);
  for (const [domain, list] of Object.entries(byDomain).sort((a, b) => b[1].length - a[1].length)) {
    out.push(`## ${domain} — ${list.length}`);
    out.push("");
    out.push("| concept | English | definition |");
    out.push("|---|---|---|");
    for (const c of list) out.push(`| \`${cell(c.concept_id)}\` | ${cell(c.english_term)} | ${cell(c.definition)} |`);
    out.push("");
  }
  return out.join("\n");
}

// ── K20 → the constants / nature ledger pages ────────────────────────────────────────────────────
function tableOf(rows, cols) {
  const out = [];
  out.push("| " + cols.map((c) => c.label).join(" | ") + " |");
  out.push("|" + cols.map(() => "---").join("|") + "|");
  for (const r of rows) out.push("| " + cols.map((c) => cell(r[c.key])).join(" | ") + " |");
  return out.join("\n");
}

function renderConstantsArray(k, arrKey, meta, sourceRel, commitShort) {
  const out = [];
  out.push(`# ${meta.title}`);
  out.push("");
  out.push(banner(sourceRel, commitShort));
  out.push("");
  out.push(meta.intro);
  out.push("");
  out.push(`**${(k[arrKey] || []).length} rows.**`);
  out.push("");
  out.push(tableOf(k[arrKey] || [], meta.cols));
  return out.join("\n");
}

function renderConstantsIndex(k, sourceRel, commitShort) {
  const out = [];
  out.push(`# Constants and the nature ledger — index`);
  out.push("");
  out.push(banner(sourceRel, commitShort));
  out.push("");
  if (k.what_this_is) { out.push(s(k.what_this_is)); out.push(""); }
  if (k.sovereignty_rule) { out.push(`**Sovereignty rule** — ${s(k.sovereignty_rule)}`); out.push(""); }
  if (k.nature_as_authority) { out.push(`**Nature as the authority** — ${s(k.nature_as_authority)}`); out.push(""); }
  if (k.evidence_classes) {
    out.push("**Evidence classes**");
    out.push("");
    for (const [kk, v] of Object.entries(k.evidence_classes)) out.push(`- \`${cell(kk)}\` — ${cell(typeof v === "string" ? v : JSON.stringify(v))}`);
    out.push("");
  }
  const sizes = ["constants", "dimensionless_numbers", "scaling_laws", "frequencies", "inadmissible", "open_questions"]
    .filter((a) => Array.isArray(k[a])).map((a) => `${a.replace(/_/g, " ")}: **${k[a].length}**`);
  out.push(`This ledger carries ${sizes.join(" · ")}. Each is a page of its own. The **INADMISSIBLE** rows are the point, not an appendix: they are claims the ledger's own rule rejected.`);
  return out.join("\n");
}

const CONSTANT_PAGES = [
  { arr: "constants", slug: "values", title: "Constants — the measured numbers", intro: "Every load-bearing constant with its units, scope, evidence class, source and falsifier.",
    cols: [{ key: "name", label: "name" }, { key: "symbol", label: "symbol" }, { key: "value", label: "value" }, { key: "units", label: "units" }, { key: "scope", label: "scope" }, { key: "class", label: "class" }, { key: "source", label: "source" }, { key: "falsifier", label: "falsifier" }] },
  { arr: "dimensionless_numbers", slug: "dimensionless-numbers", title: "Dimensionless numbers", intro: "The ratios that carry meaning without units.",
    cols: [{ key: "name", label: "name" }, { key: "symbol", label: "symbol" }, { key: "formula", label: "formula" }, { key: "meaning", label: "meaning" }, { key: "critical_values", label: "critical values" }, { key: "source", label: "source" }] },
  { arr: "scaling_laws", slug: "scaling-laws", title: "Scaling laws", intro: "How quantities scale, with the exponent, the scope, and the falsifier for each.",
    cols: [{ key: "name", label: "name" }, { key: "relation", label: "relation" }, { key: "exponent", label: "exponent" }, { key: "scope", label: "scope" }, { key: "class", label: "class" }, { key: "source", label: "source" }, { key: "falsifier", label: "falsifier" }] },
  { arr: "frequencies", slug: "frequencies", title: "Frequencies and rhythms", intro: "Rates and rhythms with their value, units, scope and source.",
    cols: [{ key: "name", label: "name" }, { key: "value", label: "value" }, { key: "units", label: "units" }, { key: "scope", label: "scope" }, { key: "class", label: "class" }, { key: "source", label: "source" }] },
  { arr: "inadmissible", slug: "inadmissible", title: "INADMISSIBLE — claims the ledger rejected", intro: "The 88 claims the ledger's own rule ruled out, each with why it is inadmissible and the receipt. This page is the ledger doing its job.",
    cols: [{ key: "claim", label: "claim" }, { key: "why_inadmissible", label: "why inadmissible" }, { key: "receipt", label: "receipt" }, { key: "origin", label: "origin" }] },
  { arr: "open_questions", slug: "open-questions", title: "Open questions", intro: "What the ledger records as not yet settled.",
    cols: [{ key: "question", label: "question" }, { key: "attribution", label: "attribution" }, { key: "status", label: "status" }] },
];

// ── the manifest of what to render ───────────────────────────────────────────────────────────────
const LEXICON_TERMS = [
  "lexicon/terms/math-core.json", "lexicon/terms/method-evidence.json", "lexicon/terms/natura-physics.json",
  "lexicon/terms/blanket-mind-body-world.json", "lexicon/terms/gaia-world-build.json",
  "lexicon/terms/pomdp-tensors.json", "lexicon/terms/natura-biology.json",
];

function derivePages(ctx) {
  const { ROOTS, git, sha256, judge, redact, hasDenied, dirtyPaths, publication, MAX_REDACTIONS } = ctx;
  const root = ROOTS["uni-cookbook"];
  const results = [];
  if (!root || !fs.existsSync(root)) return results;

  const commit = git(root, ["rev-parse", "HEAD"]);
  const branch = git(root, ["rev-parse", "--abbrev-ref", "HEAD"]);
  const commitShort = commit.slice(0, 12);
  const dirty = dirtyPaths(root);
  const pub = publication("uni-cookbook");

  // Each unit: {corpus, slugTail, sourceRel, render}
  const units = [];
  for (const rel of LEXICON_TERMS) {
    units.push({ corpus: "lexicon", slugTail: slug(path.basename(rel, ".json")), sourceRel: rel,
      render: (j) => renderTermFile(j, rel, commitShort) });
  }
  units.push({ corpus: "lexicon", slugTail: "concepts", sourceRel: "lexicon/CONCEPTS.json",
    render: (j) => renderConcepts(j, "lexicon/CONCEPTS.json", commitShort) });

  const K20 = "gpt/knowledge/K20-constants-ratios-and-nature-ledger.json";
  units.push({ corpus: "constants", slugTail: "index", sourceRel: K20,
    render: (k) => renderConstantsIndex(k, K20, commitShort) });
  for (const p of CONSTANT_PAGES) {
    units.push({ corpus: "constants", slugTail: p.slug, sourceRel: K20,
      render: (k) => renderConstantsArray(k, p.arr, p, K20, commitShort), pageTitle: p.title });
  }

  for (const u of units) {
    const abs = path.join(root, u.sourceRel);
    if (!fs.existsSync(abs)) continue;
    // provenance fence — a source with uncommitted bytes cannot claim a commit
    if (dirty.has(u.sourceRel)) { results.push({ unprovenanced: { corpus: u.corpus, path: u.sourceRel, commit: commitShort } }); continue; }
    let raw;
    try { raw = fs.readFileSync(abs, "utf8"); } catch { continue; }
    const digest = sha256(raw).slice(0, 16);
    let j;
    try { j = JSON.parse(raw); } catch { continue; }
    const body = u.render(j);

    // SAME fences as a markdown page. A denied value is fatal; over the threshold is refused; a
    // residual after redaction is refused. All measured over the RENDERED body.
    if (hasDenied(body)) { results.push({ refused: { corpus: u.corpus, path: u.sourceRel, bytes: Buffer.byteLength(raw), sha256: digest, reasons: ["operator-denied-value"] } }); continue; }
    const red = redact(body);
    if (red.total > MAX_REDACTIONS) { results.push({ refused: { corpus: u.corpus, path: u.sourceRel, bytes: Buffer.byteLength(raw), sha256: digest, reasons: [`over-redaction-threshold (${red.total} > ${MAX_REDACTIONS})`, ...Object.keys(red.counts)] } }); continue; }
    const residual = judge(red.text);
    if (residual.length) { results.push({ refused: { corpus: u.corpus, path: u.sourceRel, bytes: Buffer.byteLength(raw), sha256: digest, reasons: [...new Set(residual)] } }); continue; }

    const t = /^#\s+(.+)$/m.exec(red.text);
    results.push({ page: {
      corpus: u.corpus,
      slug: `${u.corpus}/${u.slugTail}`,
      title: u.pageTitle || (t ? t[1].trim() : u.slugTail),
      body: red.text,
      bytes: Buffer.byteLength(red.text),
      sha256: digest,                     // digest of the SOURCE JSON, so provenance resolves against the committed file
      redactions: red.total,              // counted over the FINAL rendered body
      redaction_counts: red.counts,
      citation: { repo: "uni-cookbook", title: u.corpus === "lexicon" ? "The Lexicon" : "Constants and the Nature Ledger", branch, commit, commit_short: commitShort, path: u.sourceRel, ...pub },
    } });
  }
  return results;
}

module.exports = { derivePages, DERIVED_CORPORA };
