// verify_lenses.cjs — THE READING-LANE GATE.
//
// It answers one question that the whole site's credibility rests on:
//
//     IS THE "PRECISE" LANE ACTUALLY THE DOCUMENT, OR ONLY LABELLED AS IT?
//
// 291 of the 304 content pages are the operator's real repository files. Beside each one now sits
// agent-written prose (Plain, Clear) whose whole job is to be easier to read. That is the single
// largest disclosure and truth surface this site has ever taken on, and "we were careful" is not a
// control. So this gate MEASURES the separation:
//
//   * it re-renders every page's body from docs.json THROUGH THE SAME MODULE THE PAGE IMPORTED
//     (app/lib/markdown.mjs), and requires the bytes between the shipped page's UNI-PRECISE
//     sentinels to be byte-identical. Not similar. Identical.
//   * it requires the schema to have no field an authored summary could hide in.
//   * it holds every lens to two digests of the page it describes.
//   * it refuses a lens that introduces a NUMBER, a NAME, or a CERTAINTY the document does not have,
//     or that DROPS a hedge the document does have.
//
// WHY RE-RENDER RATHER THAN TRUST THE BUILD: because a gate that re-implements the renderer proves
// only that the gate agrees with itself. The page and this file load the same bytes; that is the
// entire point of app/lib/markdown.mjs existing as a shared ESM module.
//
// IT RUNS ON VERCEL. It needs no private repository — only committed artifacts and out/. So the
// strongest claim this site makes is re-proved in the venue that actually ships, which
// verify_provenance.cjs (which needs the private clones) structurally cannot be.
//
// WHAT IT CANNOT DO is printed on every run, and is not a footnote. See the end of this file.
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// DATA root — what the mutation harness swaps. ARTIFACTS and CONTENT come from here.
const ROOT = process.env.UNI_LENS_ROOT || path.resolve(__dirname, "..");
// CODE root — always the real repository. The renderer is not what a mutation tests: the harness
// breaks documents, lenses and shipped pages, never the module under which they are compared. It
// also has to be the real tree because a temp directory has no node_modules and cannot resolve
// `marked` — which is exactly how the CONTROL first failed, and why the control exists at all.
const CODE_ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "out");
const GEN = path.join(ROOT, "content", "generated");
const LENS_DIR = path.join(ROOT, "content", "lenses");
const PROVE = process.argv.includes("--prove");

const sha = (s) => crypto.createHash("sha256").update(s, "utf8").digest("hex");
const sha16 = (s) => sha(s).slice(0, 16);
const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));

const results = [];
const ok = (name, detail) => results.push({ pass: true, name, detail });
const bad = (name, detail) => results.push({ pass: false, name, detail });

const BEGIN = "UNI-PRECISE-BEGIN";
const END = "UNI-PRECISE-END";

async function main() {
  // The page's own renderer, loaded as the page loads it.
  const md = await import("file:///" + path.join(CODE_ROOT, "app", "lib", "markdown.mjs").replace(/\\/g, "/"));
  const ah = await import("file:///" + path.join(CODE_ROOT, "app", "lib", "article_html.mjs").replace(/\\/g, "/"));

  const docs = readJson(path.join(GEN, "docs.json"));
  const articles = readJson(path.join(GEN, "articles.json")).articles;
  const bundle = readJson(path.join(GEN, "lenses.json"));
  const lenses = bundle.lenses || [];
  const byKey = new Map(lenses.map((l) => [`${l.scope}:${l.key}`, l]));

  // ── 0 · the generator is walled off from the private repositories ─────────────────────────────
  // USE vs MENTION, and this check convicted its own generator on the first run — the seventh time
  // this defect class has fired in this programme. `build_lenses.cjs` PRINTS the sentence "it has no
  // access to roots.local.json, by design" in its output note. Stripping only `//` comments left that
  // string literal standing, so the gate reported a file for honestly documenting the very property
  // it was being checked for. A fence that punishes the sentence teaches people to delete the
  // sentence. So: blank quoted strings AND comments first (the same technique ip_fence.cjs uses),
  // then look for an actual READ — a require/readFile of the path — rather than the bare token.
  {
    const src = fs.readFileSync(path.join(CODE_ROOT, "generators", "build_lenses.cjs"), "utf8");
    const codeOnly = src
      .replace(/(["'`])(?:\\.|(?!\1)[^\\])*\1/g, (m) => " ".repeat(m.length))  // strings → blanks
      .replace(/^\s*\/\/.*$/gm, "")                                            // line comments
      .replace(/\/\*[\s\S]*?\*\//g, "");                                       // block comments
    const reaches = /roots\.local\.json/.test(codeOnly) ||
      /(?:require|readFileSync|readdirSync|existsSync)\s*\([^)]*roots\.local/i.test(src);
    reaches
      ? bad("the lens generator cannot reach the private repositories",
          "generators/build_lenses.cjs references roots.local.json in live code. An author must work " +
          "only from the PUBLISHED body; otherwise a lens can carry something the site never published.")
      : ok("the lens generator cannot reach the private repositories",
          "no roots.local.json access in live code — a lens is bounded by what is already public");
    docs.generated_by === "generators/ingest_docs.cjs"
      ? ok("docs.json is still written by the ingester alone", `generated_by = ${docs.generated_by}`)
      : bad("docs.json is still written by the ingester alone",
          `generated_by = ${docs.generated_by} — something other than ingest_docs.cjs is authoring the documents`);
  }

  // ── 1 · SCHEMA PURITY — authored prose has no field to occupy ─────────────────────────────────
  {
    const banned = ["precise", "body", "source_text", "source_body", "document"];
    const hits = [];
    for (const rec of [...lenses, ...(bundle.orientations || [])])
      for (const k of Object.keys(rec)) if (banned.includes(k)) hits.push(`${rec.scope || "orientation"}:${rec.key || rec.corpus} carries '${k}'`);
    hits.length
      ? bad("no lens record carries a source-document field", hits.join(" · "))
      : ok("no lens record carries a source-document field",
          `${lenses.length} lens + ${(bundle.orientations || []).length} orientation record(s); none has a ` +
          `${banned.join("/")} key. The Precise lane cannot be authored because there is nowhere to author it.`);
  }

  // ── 2 · THE PRECISE-IDENTITY CHECK — the reason this gate exists ──────────────────────────────
  const routes = [
    ...docs.pages.map((p) => ({
      scope: "wiki", key: p.slug, file: path.join(OUT, "wiki", ...p.slug.split("/"), "index.html"),
      expect: () => md.renderMarkdown(md.stripLeadingH1(p.body)),
      srcSha: p.sha256, bodySha: sha16(p.body), body: p.body,
    })),
    ...articles.map((a) => ({
      scope: "article", key: a.slug, file: path.join(OUT, "articles", a.slug, "index.html"),
      expect: () => ah.resolvePlaceholders(md.renderMarkdown(a.body), a.cites, a.quotes),
      srcSha: sha16(a.body), bodySha: sha16(a.body), body: a.body,
    })),
  ];

  if (!fs.existsSync(OUT)) {
    bad("the Precise lane is the document, byte for byte",
      `out/ does not exist — run \`next build\` first. This check reads what SHIPPED, not what was intended.`);
  } else {
    const faults = [];
    let checked = 0, missing = 0;
    for (const r of routes) {
      if (!fs.existsSync(r.file)) { missing++; continue; }
      const html = fs.readFileSync(r.file, "utf8");
      const b = html.indexOf(`<!--${BEGIN} `);
      const e = html.indexOf(`<!--${END}-->`);
      if (b < 0 || e < 0) { faults.push(`${r.scope}/${r.key}: no PRECISE sentinel pair in the shipped page`); continue; }
      if (e < b) { faults.push(`${r.scope}/${r.key}: sentinels out of order`); continue; }
      // EXACTLY ONE *RAW* REGION. A Next static export contains the page twice: once as real HTML,
      // and once as the RSC flight payload inside a <script>, where `<` is escaped to `<`. So
      // the bare token appears twice and the raw comment form appears once. This searches only the
      // raw form — deliberately, and stated here because it would otherwise look like luck. The
      // escaped copy is asserted separately below so that if a future Next stops escaping it, this
      // check goes RED rather than silently comparing against the wrong copy.
      if (html.indexOf(`<!--${BEGIN} `, b + 1) >= 0) { faults.push(`${r.scope}/${r.key}: more than one RAW PRECISE region — the RSC payload is no longer escaped, so this check can no longer identify the shipped HTML`); continue; }
      const openEnd = html.indexOf("-->", b);
      const marker = html.slice(b + 4 + BEGIN.length + 1, openEnd).trim().split(/\s+/);
      if (marker[0] !== r.srcSha || marker[1] !== r.bodySha)
        faults.push(`${r.scope}/${r.key}: sentinel digests ${marker.join(",")} != ${r.srcSha},${r.bodySha} — this page rendered a different document`);
      const shipped = html.slice(openEnd + 3, e);
      if (shipped !== r.expect())
        faults.push(`${r.scope}/${r.key}: shipped Precise bytes differ from a fresh render of docs.json — something was added, removed or reworded`);
      checked++;
    }
    if (missing && !checked) {
      bad("the Precise lane is the document, byte for byte",
        `${missing} route(s) have no built page — out/ is stale or empty. A zero here would be vacuous.`);
    } else if (faults.length) {
      bad("the Precise lane is the document, byte for byte",
        `${faults.length} fault(s):\n      ` + faults.slice(0, 12).join("\n      ") +
        (faults.length > 12 ? `\n      … and ${faults.length - 12} more` : ""));
    } else {
      ok("the Precise lane is the document, byte for byte",
        `${checked}/${routes.length} shipped page(s) re-rendered from docs.json through the page's own ` +
        `markdown module and compared byte-for-byte${missing ? ` (${missing} not built)` : ""}. ` +
        `This is measured on the artifact that ships, not asserted.`);
    }
  }

  // ── 3 · every lens is bound to a live page, at both digests ───────────────────────────────────
  {
    const known = new Map(routes.map((r) => [`${r.scope}:${r.key}`, r]));
    const faults = [];
    for (const l of lenses) {
      const r = known.get(`${l.scope}:${l.key}`);
      if (!r) { faults.push(`${l.scope}/${l.key}: names a page that is not published`); continue; }
      if (l.source_sha256 !== r.srcSha) faults.push(`${l.scope}/${l.key}: source_sha256 stale`);
      if (l.source_body_sha256 !== r.bodySha) faults.push(`${l.scope}/${l.key}: source_body_sha256 stale — the PUBLISHED bytes moved under this lens`);
    }
    faults.length
      ? bad("every lens is bound to its page at both digests", faults.slice(0, 10).join(" · "))
      : ok("every lens is bound to its page at both digests",
          `${lenses.length} lens record(s). Two digests, not one: page.sha256 is computed BEFORE redaction, so ` +
          `it alone cannot notice a re-redaction changing the bytes a reader sees.`);
  }

  // ── 4 · CONTAINMENT — a lens is paragraphs, and cannot impersonate the document ───────────────
  {
    const forbid = [
      [/<h[1-6][\s>]/i, "a heading (breaks the page's single-<h1> contract, and reads as document structure)"],
      [/<(script|style|iframe|img|table|pre|figure)[\s>]/i, "a script/style/iframe/img/table/pre/figure"],
      [/class=/i, "a class attribute (only the lane's own wrapper may carry classes)"],
      [/href="https?:\/\//i, "an off-site link"],
      [/\[redacted:/i, "a redaction marker (those belong to the document, never to prose about it)"],
    ];
    const faults = [];
    for (const l of lenses)
      for (const k of ["plain", "clear"])
        if (l[k]) for (const [re, why] of forbid)
          if (re.test(l[k].html)) faults.push(`${l.scope}/${l.key} ${k}: contains ${why}`);
    faults.length
      ? bad("a lens is prose, and contains nothing structural", faults.slice(0, 10).join(" · "))
      : ok("a lens is prose, and contains nothing structural",
          "no headings, tables, code blocks, images, classes, off-site links or redaction markers");
  }

  // ── 5 · L4/L5 — no number, name or path a lens invented ───────────────────────────────────────
  {
    const NUMWORD = { zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,
      eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,
      nineteen:19,twenty:20,hundred:100,thousand:1000,million:1000000 };
    const STOP = new Set(["The","This","That","These","Those","It","They","There","A","An","And","But",
      "For","If","In","On","Of","To","Is","Are","Was","Were","You","Your","We","Our","What","When",
      "Where","Which","Who","How","Why","Read","Plain","Clear","Precise","Every","Each","Some","No","Not"]);
    const text = (h) => h.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    const nums = (s) => new Set((s.match(/\d[\d,.]*/g) || []).map((n) => n.replace(/[,]/g, "").replace(/\.$/, "")));
    const names = (s) => new Set([
      ...(s.match(/\b[a-z0-9_]+_[a-z0-9_]+\b/gi) || []),
      ...(s.match(/\b[a-zA-Z0-9_-]+\.(?:ex|exs|cjs|mjs|js|ts|tsx|py|ps1|sh|ya?ml|json|md)\b/g) || []),
      ...(s.match(/\b[A-Z][a-z]+[A-Z][A-Za-z]*\b/g) || []),
    ]);
    const faults = [];
    for (const l of lenses) {
      const src = l.__body || null;
      const target = routes.find((r) => r.scope === l.scope && r.key === l.key);
      if (!target) continue;
      const sBody = target.body;
      const sNums = nums(sBody), sNames = names(sBody);
      for (const k of ["plain", "clear"]) {
        if (!l[k]) continue;
        const t = text(l[k].html);
        for (const n of nums(t)) {
          if (sNums.has(n)) continue;
          if (Object.values(NUMWORD).includes(Number(n))) continue;   // a spelled-out small number
          faults.push(`${l.scope}/${l.key} ${k}: the number ${n} is not in the document`);
        }
        for (const nm of names(t)) {
          if (sNames.has(nm) || STOP.has(nm)) continue;
          faults.push(`${l.scope}/${l.key} ${k}: '${nm}' is not in the document`);
        }
      }
    }
    faults.length
      ? bad("a lens introduces no number, name or path the document lacks", faults.slice(0, 12).join(" · "))
      : ok("a lens introduces no number, name or path the document lacks",
          "dropping detail is expected (a Plain lens should); ADDING it means a fact with no receipt");
  }

  // ── 6 · L6/L7/L8 — certainty may fall, never rise; hedges may not be dropped ───────────────────
  {
    const epi = readJson(path.join(LENS_DIR, "epistemic.json"));
    const forb = readJson(path.join(LENS_DIR, "forbidden.json"));
    const text = (h) => h.replace(/<[^>]+>/g, " ").toLowerCase();
    const has = (s, w) => new RegExp(`(^|[^a-z])${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z]|$)`, "i").test(s);
    const faults = [];
    for (const l of lenses) {
      const target = routes.find((r) => r.scope === l.scope && r.key === l.key);
      if (!target) continue;
      const s = target.body.toLowerCase();
      const srcHedges = epi.load_bearing_hedges.filter((w) => has(s, w));
      for (const k of ["plain", "clear"]) {
        if (!l[k]) continue;
        const t = text(l[k].html);
        for (const w of epi.strengtheners)
          if (has(t, w) && !has(s, w)) faults.push(`${l.scope}/${l.key} ${k}: raises certainty with '${w}', which the document does not use`);
        for (const f of forb.words)
          if (has(t, f.word) && !has(s, f.word)) faults.push(`${l.scope}/${l.key} ${k}: forbidden word '${f.word}' — ${f.why}`);
        if (srcHedges.length && !epi.load_bearing_hedges.some((w) => has(t, w)))
          faults.push(`${l.scope}/${l.key} ${k}: THE DOCUMENT HEDGES (${srcHedges.slice(0, 3).join(", ")}) AND THIS LENS DOES NOT — this is how "a simulation of X" becomes "X"`);
      }
    }
    faults.length
      ? bad("a lens never raises certainty, and never drops a load-bearing hedge", faults.slice(0, 12).join(" · "))
      : ok("a lens never raises certainty, and never drops a load-bearing hedge",
          "the hedge check is the most valuable one here: plain language makes hedges feel like clutter, " +
          "and deleting them is truth laundering by accident");
  }

  // ── 7 · length bounds and review-record integrity ─────────────────────────────────────────────
  {
    const faults = [];
    for (const l of lenses) {
      if (l.plain && (l.plain.words < 40 || l.plain.words > 220)) faults.push(`${l.key} plain ${l.plain.words}w outside 40-220`);
      if (l.clear && (l.clear.words < 90 || l.clear.words > 600)) faults.push(`${l.key} clear ${l.clear.words}w outside 90-600`);
      if (l.clear && l.clear.words >= l.source_words) faults.push(`${l.key}: the 'clear' lens is not shorter than the document — that is not a lens`);
      if (!l.authored_by || !l.authored_at) faults.push(`${l.key}: no authored_by/authored_at`);
      if (l.review_state === "reviewed" && (!l.reviewed_by || !l.reviewed_at)) faults.push(`${l.key}: claims reviewed with no reviewer or date`);
      if (!["absent", "draft", "reviewed"].includes(l.review_state)) faults.push(`${l.key}: review_state '${l.review_state}'`);
    }
    faults.length
      ? bad("length bounds hold and every review record names a person and a date", faults.slice(0, 10).join(" · "))
      : ok("length bounds hold and every review record names a person and a date",
          `Plain 40-220w · Clear 90-600w and shorter than its document · a 'reviewed' claim carries a name`);
  }

  // ── 8 · the safety re-scan, over authored prose ───────────────────────────────────────────────
  {
    const STRUCT = [
      [/\b(?:10|127|192\.168|172\.(?:1[6-9]|2\d|3[01]))\.\d{1,3}\.\d{1,3}\b/, "a private IPv4 address"],
      [/\b100\.(?:6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.\d{1,3}\.\d{1,3}\b/, "a CGNAT/tailnet address"],
      [/\b[\w-]+\.uni-lab\.(?:local|solwright\.com)\b/i, "an internal hostname"],
      [/\bts\.net\b/i, "a tailnet name"],
      [/[A-Za-z]:\\Users\\[\w.-]+/, "an operator filesystem path"],
    ];
    const faults = [];
    for (const l of lenses)
      for (const k of ["plain", "clear"])
        if (l[k]) for (const [re, why] of STRUCT)
          if (re.test(l[k].html)) faults.push(`${l.scope}/${l.key} ${k}: contains ${why}`);
    faults.length
      ? bad("no authored lens carries a structural secret", faults.join(" · "))
      : ok("no authored lens carries a structural secret",
          "addresses, internal hostnames and operator paths — scanned in prose as everywhere else");
  }

  // ── report ────────────────────────────────────────────────────────────────────────────────────
  const t = bundle.totals || {};
  console.log(`\nREADING LANE — ${t.lensed || 0}/${t.content_routes || 0} route(s) lensed · ` +
    `${t.reviewed || 0} with a recorded human review · ${t.draft || 0} draft · ${t.unlensed || 0} not yet written\n`);
  for (const r of results) console.log(`${r.pass ? "  ok" : "FAIL"}  ${r.name} - ${r.detail}`);

  console.log("\nWHAT THIS GATE CANNOT DO — the most important line in this output.");
  console.log("  It proves the Precise lane is the document rendered unaltered, and that a lens introduces");
  console.log("  no NUMBER, NAME or CERTAINTY the document does not contain. IT DOES NOT VERIFY MEANING,");
  console.log("  and no gate can. A lens can pass every check above and still be a bad summary: it can");
  console.log("  emphasise the wrong thing, omit the caveat that mattered, or be fluent and hollow.");
  console.log("  Nor can it verify that a review happened. `review_state: reviewed` is a CLAIM by a named");
  console.log("  person on a named date. It is recorded, it is published, and it is not a measurement.");
  console.log("  And it proves out/ matches docs.json — that docs.json matches a named commit is");
  console.log("  safety/verify_provenance.cjs's claim, which needs the private clones. Both are the chain.");

  const failed = results.filter((r) => !r.pass);
  const verdict = failed.length === 0 ? "PASS" : "FAIL";
  console.log(`\nGATE: ${verdict} - reading-lane, ${results.length - failed.length}/${results.length} checks`);
  return verdict === "PASS" ? 0 : 1;
}

// ── --prove ──────────────────────────────────────────────────────────────────────────────────────
// WHY THIS IS NOT OPTIONAL. With no lenses authored yet, checks 4-8 pass over an EMPTY SET. That is
// a vacuous green, and this estate has a standing rule about those: a zero is trustworthy only when
// the walk is proven to work AND proven to have run. So the harness INJECTS a synthetic lens over a
// real page, proves the unmutated copy passes (the control — without it, a gate that failed on
// everything would score a perfect mutation sweep), then breaks it one way at a time.
//
// Mutation 2 is the one that matters most: it moves authored prose INTO docs.pages[].body — the
// contamination event in its purest form, the thing the operator was right to worry about. It must
// be detected, not merely forbidden by convention.
async function prove() {
  const os = require("os");
  const cp = require("child_process");
  const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "lensprove-"));
  const copy = (rel) => {
    const from = path.join(path.resolve(__dirname, ".."), rel), to = path.join(TMP, rel);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.cpSync(from, to, { recursive: true });
  };
  for (const r of ["app/lib/markdown.mjs", "app/lib/article_html.mjs", "generators/build_lenses.cjs",
                   "content/generated/docs.json", "content/generated/articles.json",
                   "content/generated/lenses.json", "content/lenses/forbidden.json",
                   "content/lenses/epistemic.json", "content/lenses/AUTHORING.md"]) copy(r);

  const docs = readJson(path.join(TMP, "content/generated/docs.json"));
  // A page whose body genuinely hedges, so the hedge-laundering mutation is a real test.
  const page = docs.pages.find((p) => /simulat|hypothes|not yet|scaffold/i.test(p.body)) || docs.pages[0];
  copy(path.join("out", "wiki", ...page.slug.split("/"), "index.html").split(path.sep).join("/"));

  // Probe words for the two "forbidden word" mutations, derived from THIS page: a word the document
  // does not use, so injecting it is a genuine violation rather than a legitimate echo.
  const _forb = readJson(path.join(TMP, "content/lenses/forbidden.json")).words.map((w) => w.word);
  const _srcLower = page.body.toLowerCase();
  const _absent = (list) => list.find((w) => !_srcLower.includes(w.toLowerCase()));
  const absentForbidden = _absent(["guaranteed", "bulletproof", "unhackable", ...
    _forb.filter((w) => !/^(conscious|understands|proven|proves|proof)$/.test(w))]) || "guaranteed";
  const absentAnthro = _absent(["sentient", "self-aware", "alive", "wants", "knows", "feels"]) || "sentient";

  const FIX = {
    scope: "wiki", key: page.slug, corpus: page.corpus,
    source_sha256: page.sha256, source_body_sha256: sha16(page.body),
    source_words: (page.body.match(/\S+/g) || []).length,
    authored_by: "prove-fixture", authored_at: "2026-08-01",
    review_state: "reviewed", reviewed_by: "prove", reviewed_at: "2026-08-01",
    plain: { html: "<p>This page is part of a working record. It describes a simulation and a plan, not a finished result. It is written down so that anyone can check it later, and so that a mistake has somewhere to be found rather than somewhere to hide from view here.</p>", chars: 210, words: 45, sha256: "0000000000000000" },
    clear: null, note: "", source_file: "content/lenses/wiki/_prove.md",
  };
  const writeBundle = (mut) => {
    const b = readJson(path.join(TMP, "content/generated/lenses.json"));
    const lens = JSON.parse(JSON.stringify(FIX));
    b.lenses = [lens]; b.totals = { ...b.totals, lensed: 1, reviewed: 1 };
    if (mut) mut(b, lens);
    fs.writeFileSync(path.join(TMP, "content/generated/lenses.json"), JSON.stringify(b, null, 1));
  };
  const run = () => cp.spawnSync(process.execPath, [__filename],
    { env: { ...process.env, UNI_LENS_ROOT: TMP }, encoding: "utf8" }).status;

  const M = [
    ["CONTROL: the unmutated fixture passes", null, 0],
    ["append a sentence inside a shipped Precise panel", () => {
      const f = path.join(TMP, "out", "wiki", ...page.slug.split("/"), "index.html");
      const h = fs.readFileSync(f, "utf8");
      fs.writeFileSync(f, h.replace(`<!--${END}-->`, `<p>inserted</p><!--${END}-->`));
    }, 1],
    ["MOVE A LENS'S TEXT INTO docs.pages[].body (contamination)", () => {
      const d = readJson(path.join(TMP, "content/generated/docs.json"));
      const p = d.pages.find((x) => x.slug === page.slug);
      p.body = p.body + "\n\nThis page is part of a working record.\n";
      fs.writeFileSync(path.join(TMP, "content/generated/docs.json"), JSON.stringify(d));
    }, 1],
    ["delete the closing PRECISE sentinel", () => {
      const f = path.join(TMP, "out", "wiki", ...page.slug.split("/"), "index.html");
      fs.writeFileSync(f, fs.readFileSync(f, "utf8").replace(`<!--${END}-->`, ""));
    }, 1],
    ["add a 'precise' key to a lens record", () => writeBundle((b, l) => { l.precise = "<p>the document</p>"; }), 1],
    ["insert a number the document does not contain", () => writeBundle((b, l) => { l.plain.html = l.plain.html.replace("</p>", " It lists 4173 separate findings.</p>"); }), 1],
    ["turn a hedge into a measurement (simulated -> measured)", () => writeBundle((b, l) => { l.plain.html = "<p>This page records what the system measured directly in the world, observed end to end, and it is the finished result of that work rather than any kind of interim note for later.</p>"; }), 1],
    // THE WORD MUST BE ONE THE SOURCE GENUINELY LACKS, chosen at run time. The first version of this
    // mutation hard-coded "proven" and reported a HOLE — but the fixture page uses "proven" itself,
    // so the gate had CORRECTLY allowed it: a lens may echo the document's own certainty, and only
    // adding certainty is laundering. A hard-coded probe word turns a correct allowance into a false
    // hole report, and a mutation suite that cries wolf gets switched off. So it is derived.
    [`insert a forbidden certainty word absent from the document ('${absentForbidden}')`,
      () => writeBundle((b, l) => { l.plain.html = l.plain.html.replace("working record", `${absentForbidden} record`); }), 1],
    ["flip source_body_sha256", () => writeBundle((b, l) => { l.source_body_sha256 = "deadbeefdeadbeef"; }), 1],
    ["claim reviewed with no reviewer", () => writeBundle((b, l) => { l.reviewed_by = null; }), 1],
    ["put a class attribute in a lens body", () => writeBundle((b, l) => { l.plain.html = l.plain.html.replace("<p>", '<p class="quote">'); }), 1],
    ["put a private address in a lens body", () => writeBundle((b, l) => { l.plain.html = l.plain.html.replace("</p>", " See 10.190.245.121 for details.</p>"); }), 1],
    [`anthropomorphism the document never uses ('${absentAnthro}')`,
      () => writeBundle((b, l) => { l.plain.html = l.plain.html.replace("working record", `record of a colony that is ${absentAnthro}`); }), 1],
  ];

  console.log("\nPROVING — the control must pass and every mutation must be caught:\n");
  let caught = 0, holes = 0;
  const pristineDocs = fs.readFileSync(path.join(TMP, "content/generated/docs.json"));
  const pristineHtml = fs.readFileSync(path.join(TMP, "out", "wiki", ...page.slug.split("/"), "index.html"));
  for (const [name, mut, want] of M) {
    fs.writeFileSync(path.join(TMP, "content/generated/docs.json"), pristineDocs);
    fs.writeFileSync(path.join(TMP, "out", "wiki", ...page.slug.split("/"), "index.html"), pristineHtml);
    writeBundle(null);
    if (mut) mut();
    const got = run() === 0 ? 0 : 1;
    if (got === want) { console.log(`  ${want === 0 ? "PASSES" : "caught"}  ${name}`); caught++; }
    else { console.error(`  HOLE   ${name} — ${want === 0 ? "the control FAILED, so this sweep proves nothing" : "SURVIVED"}`); holes++; }
  }
  fs.rmSync(TMP, { recursive: true, force: true });
  console.log(`\n${caught}/${M.length} as expected, ${holes} hole(s) — fixture page: wiki/${page.slug}`);
  return holes ? 1 : 0;
}

main()
  .then(async (code) => process.exit(PROVE ? (await prove()) || code : code))
  .catch((e) => {
    console.log(`\nGATE: FAIL - reading-lane, harness error: ${(e && e.stack) || e}`);
    process.exit(1);
  });
