// verify_coverage.cjs — coverage as a GATE, never as a claim.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// WHY THIS EXISTS
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// This site shipped 304 correct documents and called itself a user guide. It was not one. Measured
// 2026-08-01, before this gate existed: 0 pages titled as a starting point, the largest corpus was 85
// documents in one flat alphabetical list, and across all six authored articles the phrase "run of
// show" appeared 0 times and "rundown" 0 times, in an estate whose whole broadcast operation turns on
// them. Every page was REACHABLE. None of it was FINDABLE. The two are not the same property and
// only one of them was ever checked.
//
// So the response is the estate's own: stop asserting and start computing. "100% coverage" is
// meaningless without a denominator, and a hand-written claim of completeness is exactly the kind of
// assertion this project has learned to distrust — the governing document upstream once carried six
// wrong numbers at once and one of them was false 176 seconds after it was written.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// THE DEFINITION
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// Every item in the universe must be either COVERED or EXPLICITLY EXCLUDED WITH A REASON.
//
//     covered + declared-excluded = 100%, and anything that is NEITHER fails this gate by name.
//
// That is the estate's "nothing is omitted silently" rule, applied to the guides themselves.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// DISCOVERED VS DECLARED — THE PART THAT MAKES THIS HARD TO GAME
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// A coverage gate whose denominator is hand-written proves nothing: shrink the list and you are at
// 100% forever. So two of the four axes take their denominator from the world, not from the manifest:
//
//   ENTRY POINTS   DISCOVERED by walking the real source repositories for runnable shapes — mix
//                  tasks, servers that bind a port, bring-up and watchdog scripts, npm scripts,
//                  benchmark and evidence scripts. Add a new server to the estate and this gate goes
//                  RED the next time it runs, naming it, until it is documented or excluded.
//   PAGES          DISCOVERED from the ingest bundle. Every published page must be reachable from a
//                  CURATED route, not merely from the alphabetical index. This axis is the one that
//                  catches the failure described above.
//
//   SUBSYSTEMS     DECLARED. There is no mechanical definition of a subsystem, and pretending one
//   DOC TYPES      exists would be worse than admitting the axis is editorial.
//
// The gate PRINTS which axis is which on every run, because a declared denominator is weaker evidence
// than a discovered one and a reader who is not told cannot tell.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// USAGE
// ─────────────────────────────────────────────────────────────────────────────────────────────────
//   node safety/verify_coverage.cjs             check, print the table, exit non-zero on any gap
//   node safety/verify_coverage.cjs --prove     the same, then MUTATE and require each mutation to
//                                               be caught. A check never shown to fail is not proven.
//   node safety/verify_coverage.cjs --discover  print the discovered universe as a manifest skeleton
//   node safety/verify_coverage.cjs --json      emit the coverage table for the site to render
"use strict";

const fs = require("fs");
const path = require("path");

const HERE = __dirname;
const REPO = path.resolve(HERE, "..");
const MANIFEST = path.join(REPO, "content", "coverage-manifest.json");
const CURATION = path.join(REPO, "content", "curation.json");
const ARTICLES = path.join(REPO, "content", "generated", "articles.json");
const DOCS = path.join(REPO, "content", "generated", "docs.json");
const ROOTS_FILE = path.join(REPO, "generators", "roots.local.json");

const ARGV = process.argv.slice(2);
const MODE = {
  prove: ARGV.includes("--prove"),
  discover: ARGV.includes("--discover"),
  json: ARGV.includes("--json"),
};

const readJson = (f) => JSON.parse(fs.readFileSync(f, "utf8"));

// ─────────────────────────────────────────────────────────────────────────────────────────────────
// DISCOVERY — the entry-point universe, taken from the source repositories
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// Each class below is a SHAPE OF RUNNABLE THING, not a list of known files. That distinction is the
// whole point: a list goes stale silently, a shape catches the thing that was added yesterday.
//
// The classes deliberately do NOT include every file in the estate. A gate that demanded prose for
// all 2,780 tracked files would be ignored within a week, and a gate the operator learns to ignore is
// worse than no gate — that lesson is recorded upstream in verify_overlays.cjs, which used to cry
// wolf on every healthy music scene. These are the things a stranger could actually TYPE.
const CLASSES = [
  {
    id: "mix-task",
    root: "uni-minecraft",
    what: "Mix tasks — the estate's own CLI surface",
    walk: "lib/mix/tasks",
    match: /\.ex$/,
    // `mix sp.minecraft` is declared as `defmodule Mix.Tasks.Sp.Minecraft`.
    name: (rel, text) => {
      const m = /defmodule\s+Mix\.Tasks\.([A-Za-z0-9_.]+)\s+do/.exec(text);
      if (!m) return null;
      return "mix " + m[1].split(".").map((s) => s.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase()).join(".");
    },
  },
  {
    id: "server",
    root: "uni-minecraft",
    what: "Long-running servers that bind a port",
    walk: "viewer",
    match: /\.cjs$/,
    // A server is a file that CALLS .listen(. Grepping for the word "server" would catch every file
    // that mentions one; this catches the ones that ARE one.
    //
    // USE VERSUS MENTION, AND THIS GATE GOT IT WRONG FIRST TIME. The first version tested the raw
    // file text and convicted viewer/lab/verify_lab_l5.cjs — a GATE, whose line 711 is a prose
    // comment *about* `net.createServer().listen(0)` explaining an async pitfall. It never binds
    // anything. That is the defining defect class of this estate and it appeared here, inside the
    // instrument written to be rigorous about it. Comments are stripped before the test, so the
    // question asked is "does this file DO it", never "does this file SAY it".
    name: (rel, text) => (/\.listen\s*\(/.test(stripComments(text)) ? "node viewer/" + rel.replace(/\\/g, "/") : null),
  },
  {
    id: "powershell",
    root: "uni-minecraft",
    what: "Bring-up, watchdog, boot-install and certificate scripts",
    walk: "viewer",
    match: /\.ps1$/,
    name: (rel) => "powershell -File viewer/" + rel.replace(/\\/g, "/"),
  },
  {
    id: "elixir-script",
    root: "uni-minecraft",
    what: "Benchmark, demo and evidence scripts",
    walk: "scripts",
    match: /\.exs$/,
    name: (rel) => "mix run scripts/" + rel.replace(/\\/g, "/"),
  },
  {
    id: "npm-script",
    root: "uni-flagellum",
    what: "The flagellum laboratory's npm scripts",
    packageJson: "package.json",
  },
  {
    id: "npm-script",
    root: "uni-workbench",
    what: "The math workbench's npm scripts",
    packageJson: "package.json",
  },
];

// Strip line and block comments so a shape is matched where it is USED, never where it is DISCUSSED.
// Deliberately crude — it does not parse strings — because the failure mode that matters is a page of
// prose explaining a call, and erring toward stripping means a discovery MISS (loud, in review) rather
// than a false conviction (quiet, and it teaches the reader the gate is noise).
function stripComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|\n)\s*\/\/[^\n]*/g, "$1");
}

function walkFiles(base, rel = "") {
  const out = [];
  let entries;
  try { entries = fs.readdirSync(base, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    if (/^(node_modules|\.git|_build|deps|dist|\.next|out)$/.test(e.name)) continue;
    const r = rel ? rel + "/" + e.name : e.name;
    if (e.isDirectory()) out.push(...walkFiles(path.join(base, e.name), r));
    else out.push(r);
  }
  return out.sort();
}

function discover() {
  if (!fs.existsSync(ROOTS_FILE)) return { available: false, reason: "generators/roots.local.json is absent", items: [] };
  const roots = readJson(ROOTS_FILE).roots || {};
  const items = [];
  const seen = new Set();
  for (const c of CLASSES) {
    const root = roots[c.root];
    if (!root || !fs.existsSync(root)) continue;

    if (c.packageJson) {
      const pj = path.join(root, c.packageJson);
      if (!fs.existsSync(pj)) continue;
      const scripts = (readJson(pj).scripts) || {};
      for (const k of Object.keys(scripts)) {
        const id = `${c.id}:${c.root}:${k}`;
        if (seen.has(id)) continue;
        seen.add(id);
        items.push({ id, klass: c.id, root: c.root, what: c.what, command: `npm run ${k}`, defined_in: c.packageJson });
      }
      continue;
    }

    const base = path.join(root, c.walk);
    for (const rel of walkFiles(base)) {
      if (!c.match.test(rel)) continue;
      let text = "";
      try { text = fs.readFileSync(path.join(base, rel), "utf8"); } catch { continue; }
      const command = c.name(rel, text);
      if (!command) continue;
      const id = `${c.id}:${c.root}:${rel}`;
      if (seen.has(id)) continue;
      seen.add(id);
      items.push({ id, klass: c.id, root: c.root, what: c.what, command, defined_in: `${c.walk}/${rel}` });
    }
  }
  return { available: true, items };
}

// The navigation is read out of the component that RENDERS it, never restated in the manifest. A
// declared copy of the nav would let this gate certify reachability against a list that no longer
// matches the site — which is the same class of defect as a hand-written count, and this project has
// been bitten by that often enough to know better. The layout's own comment records the first draft
// shipping three nav links to pages that had never been written.
function navPaths() {
  const layout = path.join(REPO, "app", "layout.tsx");
  if (!fs.existsSync(layout)) return new Set();
  const src = fs.readFileSync(layout, "utf8");
  const block = /const\s+NAV\s*=\s*\[([\s\S]*?)\];/.exec(src);
  if (!block) return new Set();
  return new Set([...block[1].matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]));
}

// ─────────────────────────────────────────────────────────────────────────────────────────────────
// THE CHECKS
// ─────────────────────────────────────────────────────────────────────────────────────────────────
function evaluate({ manifest, curation, articles, docs, discovered }) {
  const problems = [];
  const axes = [];
  const bySlug = new Map(articles.articles.map((a) => [a.slug, a]));
  const bodyOf = (slug) => (bySlug.get(slug) ? bySlug.get(slug).body : null);

  const requireReason = (where, item) => {
    const r = (item.reason || "").trim();
    if (r.length < 20) {
      problems.push(`${where}: '${item.id}' is excluded with no usable reason. An exclusion without a reason is an omission wearing a label.`);
      return false;
    }
    return true;
  };

  // ── AXIS 1 · SUBSYSTEMS (declared) ─────────────────────────────────────────────────────────────
  // Layered, as the operator chose: each subsystem gets an UNDERSTAND layer and a RUN-IT-YOURSELF
  // layer. Understanding without capability does not transfer; capability without understanding does
  // not survive contact with a problem.
  {
    const subs = manifest.subsystems || [];
    let covered = 0, excluded = 0;
    for (const s of subs) {
      if (s.excluded) { if (requireReason("subsystems", s)) excluded++; continue; }
      const missing = [];
      for (const field of ["understand", "run_it"]) {
        const slug = s[field];
        if (!slug) { missing.push(`no ${field} layer declared`); continue; }
        const body = bodyOf(slug);
        if (body === null) { missing.push(`${field} names article '${slug}' which does not exist`); continue; }
        if (!s.anchors || !s.anchors[field]) { missing.push(`no ${field} anchor declared`); continue; }
        if (!body.includes(s.anchors[field])) {
          missing.push(`${field} anchor is not present in '${slug}' — the section it names is gone`);
        }
      }
      // The RUN-IT layer must say plainly whether a reader can actually run it. Telling people
      // exactly where the wall is IS the honest form of proliferation; a guide that lets a reader
      // discover at step 9 that step 1 needed hardware they do not have has wasted their evening.
      const runBody = bodyOf(s.run_it);
      if (runBody !== null && !/RUNNABLE BY YOU|NEEDS THE OPERATOR'S INFRASTRUCTURE|PARTLY RUNNABLE BY YOU/.test(runBody)) {
        missing.push(`'${s.run_it}' carries no RUNNABLE marker`);
      }
      if (missing.length) problems.push(`subsystem '${s.id}': ` + missing.join("; "));
      else covered++;
    }
    axes.push({ id: "subsystems", label: "Subsystems", denominator: "declared", total: subs.length, covered, excluded });
  }

  // ── AXIS 2 · ENTRY POINTS (discovered) ─────────────────────────────────────────────────────────
  {
    const map = new Map((manifest.entry_points || []).map((e) => [e.id, e]));
    let covered = 0, excluded = 0, unaccounted = 0;
    const uncovered = [];
    for (const d of discovered.items) {
      const e = map.get(d.id);
      if (!e) { unaccounted++; uncovered.push(`${d.id}  (${d.command})`); continue; }
      if (e.excluded) { if (requireReason("entry_points", e)) excluded++; continue; }
      const body = bodyOf(e.article);
      if (body === null) { problems.push(`entry point '${d.id}' names article '${e.article}' which does not exist`); continue; }
      // The anchor is the COMMAND ITSELF. Delete the section that runs it and the anchor vanishes.
      const anchor = e.anchor || d.command;
      if (!body.includes(anchor)) {
        problems.push(`entry point '${d.id}' is declared covered by '${e.article}' but the article does not contain '${anchor}'`);
        continue;
      }
      covered++;
    }
    if (unaccounted) {
      problems.push(
        `${unaccounted} runnable entry point(s) exist in the source and are NEITHER documented NOR excluded:\n    ` +
        uncovered.slice(0, 40).join("\n    ") +
        (uncovered.length > 40 ? `\n    … and ${uncovered.length - 40} more` : "")
      );
    }
    // A manifest entry naming something that no longer exists is the mirror failure — a guide that
    // documents a command the estate has deleted.
    const live = new Set(discovered.items.map((d) => d.id));
    for (const id of map.keys()) {
      if (!live.has(id)) problems.push(`entry point '${id}' is documented but NO LONGER EXISTS in the source. The guide outlived the command.`);
    }
    axes.push({ id: "entry_points", label: "Entry points", denominator: "discovered", total: discovered.items.length, covered, excluded });
  }

  // ── AXIS 3 · DOCUMENT TYPES (declared) ─────────────────────────────────────────────────────────
  // The eight the operator named. Each must EXIST, be substantial, and be reachable from the site's
  // real navigation — a document type that exists but that nobody can navigate to has not been
  // delivered. Three of the eight are not authored prose (specs are wiki pages, code citations are
  // resolved markers), so a type may be satisfied three ways and must declare which.
  {
    const types = manifest.document_types || [];
    const nav = navPaths();          // DISCOVERED from app/layout.tsx, never declared here
    const groups = new Map((curation.groups || []).map((g) => [g.id, g]));
    const citations = articles.articles.reduce((n, a) => n + (a.cites || []).length + (a.quotes || []).length, 0);
    let covered = 0, excluded = 0;
    for (const t of types) {
      if (t.excluded) { if (requireReason("document_types", t)) excluded++; continue; }
      let ok = true;

      if (t.articles && t.articles.length) {
        for (const slug of t.articles) {
          const body = bodyOf(slug);
          if (body === null) { problems.push(`document type '${t.id}' names article '${slug}' which does not exist`); ok = false; continue; }
          if (body.replace(/\s+/g, "").length < 400) { problems.push(`document type '${t.id}' article '${slug}' is a stub (<400 chars of substance) — a heading is not a guide`); ok = false; }
        }
      } else if (t.curated_group) {
        const g = groups.get(t.curated_group);
        if (!g) { problems.push(`document type '${t.id}' is satisfied by curated group '${t.curated_group}' which does not exist`); ok = false; }
        else if ((g.pages || []).length < (t.min_pages || 1)) { problems.push(`document type '${t.id}': group '${t.curated_group}' has ${(g.pages || []).length} page(s), fewer than the ${t.min_pages} it declares`); ok = false; }
      } else if (t.min_citations) {
        if (citations < t.min_citations) { problems.push(`document type '${t.id}': ${citations} resolved citation(s), fewer than the ${t.min_citations} declared`); ok = false; }
      } else {
        problems.push(`document type '${t.id}' (${t.label}) is satisfied by nothing — it was named as required and never written`);
        ok = false;
      }

      if (!t.reachable_from || !nav.has(t.reachable_from)) {
        problems.push(`document type '${t.id}' declares reachable_from='${t.reachable_from}' which is not a link in the site's navigation (app/layout.tsx) — unreachable`);
        ok = false;
      }
      if (ok) covered++;
    }
    const required = manifest.required_document_types || 8;
    if (types.filter((t) => !t.excluded).length < required) {
      problems.push(`only ${types.filter((t) => !t.excluded).length} of the ${required} required document types are present`);
    }
    axes.push({ id: "document_types", label: "Document types", denominator: "declared", total: types.length, covered, excluded });
  }

  // ── AXIS 4 · PUBLISHED PAGES (discovered) ──────────────────────────────────────────────────────
  // THE AXIS THAT CATCHES THE ORIGINAL FAILURE. Every published page must appear in at least one
  // curated group, or be declared uncategorised with a reason. An alphabetical index makes a page
  // reachable; only a curated route makes it findable.
  {
    const inGroup = new Map();
    for (const g of curation.groups || []) {
      for (const slug of g.pages || []) {
        if (!inGroup.has(slug)) inGroup.set(slug, []);
        inGroup.get(slug).push(g.id);
      }
    }
    const declaredUncategorised = new Map((curation.uncategorised || []).map((u) => [u.slug, u]));
    const live = new Set(docs.pages.map((p) => p.slug));

    let covered = 0, excluded = 0;
    const orphans = [];
    for (const p of docs.pages) {
      if (inGroup.has(p.slug)) { covered++; continue; }
      const u = declaredUncategorised.get(p.slug);
      if (u) { if (requireReason("curation.uncategorised", { id: p.slug, reason: u.reason })) excluded++; continue; }
      orphans.push(p.slug);
    }
    if (orphans.length) {
      problems.push(
        `${orphans.length} published page(s) are reachable ONLY from the flat alphabetical index — no curated route leads to them:\n    ` +
        orphans.slice(0, 40).join("\n    ") +
        (orphans.length > 40 ? `\n    … and ${orphans.length - 40} more` : "")
      );
    }
    // A group pointing at a page that no longer exists is a dead link in the curated route.
    for (const g of curation.groups || []) {
      for (const slug of g.pages || []) {
        if (!live.has(slug)) problems.push(`curation group '${g.id}' lists page '${slug}' which is not published — a dead route`);
      }
    }
    for (const g of curation.groups || []) {
      if (!g.title || !g.intent) problems.push(`curation group '${g.id}' has no title or no stated intent — a heading without an intent is the alphabetical list with extra steps`);
    }
    axes.push({ id: "pages", label: "Published pages", denominator: "discovered", total: docs.pages.length, covered, excluded });
  }

  return { problems, axes };
}

function load() {
  for (const [f, what] of [[MANIFEST, "content/coverage-manifest.json"], [CURATION, "content/curation.json"], [ARTICLES, "content/generated/articles.json"], [DOCS, "content/generated/docs.json"]]) {
    if (!fs.existsSync(f)) {
      console.error(`COVERAGE GATE CANNOT RUN: ${what} is absent.`);
      console.error("  It fails rather than passing vacuously. A gate that cannot see its inputs and");
      console.error("  reports green has done worse than nothing — it has certified an absence.");
      process.exit(1);
    }
  }
  return { manifest: readJson(MANIFEST), curation: readJson(CURATION), articles: readJson(ARTICLES), docs: readJson(DOCS) };
}

// ─── discover mode ───────────────────────────────────────────────────────────────────────────────
if (MODE.discover) {
  const d = discover();
  if (!d.available) { console.error("cannot discover: " + d.reason); process.exit(1); }
  const byClass = {};
  for (const i of d.items) (byClass[i.klass] = byClass[i.klass] || []).push(i);
  console.error(`discovered ${d.items.length} entry point(s):`);
  for (const [k, v] of Object.entries(byClass)) console.error(`  ${k.padEnd(16)} ${String(v.length).padStart(4)}`);
  console.log(JSON.stringify(d.items, null, 1));
  process.exit(0);
}

// ─── check ───────────────────────────────────────────────────────────────────────────────────────
const state = load();
const discovered = discover();
if (!discovered.available) {
  console.error("COVERAGE GATE CANNOT RUN: " + discovered.reason);
  console.error("  The entry-point axis takes its denominator from the real source repositories. Without");
  console.error("  them the gate could only check the manifest against itself, which is not a check.");
  process.exit(1);
}

const { problems, axes } = evaluate({ ...state, discovered });

const table = {
  generated_by: "safety/verify_coverage.cjs",
  note: [
    "The coverage table the site renders. Written from the same evaluation that gates the build, so",
    "the published figure and the enforced figure cannot differ — a page that recomputed its own",
    "number would be a second measurement able to disagree with the one that actually holds.",
  ],
  axes,
  ok: problems.length === 0,
  problems,
};

if (MODE.json) {
  console.log(JSON.stringify(table, null, 1));
  process.exit(problems.length ? 1 : 0);
}

// Committed so the site builds from this repository alone, with no access to anything private.
if (ARGV.includes("--emit")) {
  const out = path.join(REPO, "content", "generated", "coverage.json");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(table, null, 1) + "\n", "utf8");
  console.log(`wrote ${path.relative(REPO, out)}`);
}

console.log("COVERAGE — every item COVERED or DECLARED-EXCLUDED-WITH-REASON\n");
console.log("  axis                denominator     total   covered  excluded   gap");
console.log("  ─────────────────────────────────────────────────────────────────────");
for (const a of axes) {
  const gap = a.total - a.covered - a.excluded;
  console.log(
    "  " + a.label.padEnd(20) + a.denominator.padEnd(16) +
    String(a.total).padStart(5) + String(a.covered).padStart(10) + String(a.excluded).padStart(10) +
    String(gap).padStart(6) + (gap ? "  ← " : "")
  );
}
console.log("");
console.log("  DISCOVERED means the denominator is taken from the world — add a server to the estate and");
console.log("  this gate goes red naming it. DECLARED means the denominator is editorial and a smaller");
console.log("  list would score the same. Both are printed because they are not equally strong evidence.");

if (problems.length) {
  console.error(`\nCOVERAGE FAILED — ${problems.length} gap(s):\n`);
  for (const p of problems) console.error("  ✗ " + p);
  console.error("\nCovered + declared-excluded must equal the whole. An item that is neither is an omission");
  console.error("nobody decided to make.");
  if (!MODE.prove) process.exit(1);
}

// ─── prove ───────────────────────────────────────────────────────────────────────────────────────
// A check never shown to fail is not proven. Each mutation below breaks one thing and the gate must
// notice; a mutation that survives is printed as a HOLE, because it means that check does not bite.
if (MODE.prove) {
  const clone = () => JSON.parse(JSON.stringify(state));
  const run = (s, d) => evaluate({ ...s, discovered: d || discovered }).problems.length > 0;

  const mutations = [
    ["delete a subsystem's run-it article", () => {
      const s = clone();
      const sub = (s.manifest.subsystems || []).find((x) => !x.excluded && x.run_it);
      if (!sub) return null;
      s.articles.articles = s.articles.articles.filter((a) => a.slug !== sub.run_it);
      return s;
    }],
    ["move the section an entry point points at", () => {
      const s = clone();
      const e = (s.manifest.entry_points || []).find((x) => !x.excluded);
      if (!e) return null;
      const a = s.articles.articles.find((x) => x.slug === e.article);
      if (!a) return null;
      a.body = a.body.split(e.anchor).join("«moved»");
      return s;
    }],
    ["strip the RUNNABLE marker from a run-it layer", () => {
      const s = clone();
      const sub = (s.manifest.subsystems || []).find((x) => !x.excluded && x.run_it);
      if (!sub) return null;
      const a = s.articles.articles.find((x) => x.slug === sub.run_it);
      if (!a) return null;
      a.body = a.body.replace(/RUNNABLE BY YOU|NEEDS THE OPERATOR'S INFRASTRUCTURE|PARTLY RUNNABLE BY YOU/g, "x");
      return s;
    }],
    ["empty a document type", () => {
      const s = clone();
      const t = (s.manifest.document_types || []).find((x) => !x.excluded);
      if (!t) return null;
      // Clear every satisfaction route, not just the first — a mutation that leaves a back door open
      // proves nothing about the door it did close.
      delete t.articles; delete t.curated_group; delete t.min_citations;
      return s;
    }],
    ["unhook a document type from the navigation", () => {
      const s = clone();
      const t = (s.manifest.document_types || []).find((x) => !x.excluded);
      if (!t) return null;
      t.reachable_from = "/nowhere/";
      return s;
    }],
    ["drop a page from every curated group", () => {
      const s = clone();
      const slug = (s.curation.groups[0] || {}).pages[0];
      if (!slug) return null;
      for (const g of s.curation.groups) g.pages = (g.pages || []).filter((x) => x !== slug);
      s.curation.uncategorised = (s.curation.uncategorised || []).filter((u) => u.slug !== slug);
      return s;
    }],
    ["exclude something with an empty reason", () => {
      const s = clone();
      const sub = (s.manifest.subsystems || [])[0];
      if (!sub) return null;
      sub.excluded = true; sub.reason = "";
      return s;
    }],
    ["point a curated group at a page that is not published", () => {
      const s = clone();
      if (!s.curation.groups.length) return null;
      s.curation.groups[0].pages = [...(s.curation.groups[0].pages || []), "ghost/does-not-exist"];
      return s;
    }],
    ["let a document type become a stub", () => {
      const s = clone();
      const t = (s.manifest.document_types || []).find((x) => !x.excluded && (x.articles || []).length);
      if (!t) return null;
      const a = s.articles.articles.find((x) => x.slug === t.articles[0]);
      if (!a) return null;
      a.body = "# " + a.title + "\n\ncoming soon\n";
      return s;
    }],
  ];

  // The tenth mutation is different in kind: it changes the WORLD, not the manifest. A new runnable
  // thing appears in the estate and nobody writes about it.
  const withNewEntryPoint = () => ({
    available: true,
    items: [...discovered.items, { id: "server:uni-minecraft:brand_new_server.cjs", klass: "server", root: "uni-minecraft", what: "x", command: "node viewer/brand_new_server.cjs", defined_in: "viewer/brand_new_server.cjs" }],
  });

  console.log("\nPROVING — each mutation must be caught:\n");
  let caught = 0, holes = 0, skipped = 0;
  for (const [name, mutate] of mutations) {
    const s = mutate();
    if (!s) { console.log(`  SKIP   ${name} (nothing in the manifest to mutate)`); skipped++; continue; }
    if (run(s)) { console.log(`  caught ${name}`); caught++; }
    else { console.error(`  HOLE   ${name} — SURVIVED. This check does not bite.`); holes++; }
  }
  if (run(state, withNewEntryPoint())) { console.log("  caught a new undocumented server appearing in the estate"); caught++; }
  else { console.error("  HOLE   a new undocumented server appearing in the estate — SURVIVED."); holes++; }

  console.log(`\n${caught} caught, ${holes} hole(s), ${skipped} skipped`);
  if (holes) { console.error("A gate with holes reports green for reasons it cannot justify."); process.exit(1); }
  if (problems.length) process.exit(1);
  console.log("\nCOVERAGE 100% — and the gate is proved to bite in every direction it claims to.");
  process.exit(0);
}

console.log("\nCOVERAGE 100%.");
process.exit(0);
