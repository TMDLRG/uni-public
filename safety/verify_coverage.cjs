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
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// AND THE PERCENTAGE ITSELF IS RATCHETED
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// Covered ÷ total stays at 1.0 under two different disasters — the denominator shrinking (COLLAPSE)
// and work moving into the exclusions (REDUCTION) — and the four axes above are blind to both,
// because in both cases the sum still closes and the gap is still zero. So every measured quantity is
// also held against a committed floor in content/coverage-baseline.json, and that floor is itself
// compared against its own version in git: lowering one requires a recorded amendment.
//
// Six of the mutations in --prove are caught by the ratchet ALONE. For all six the coverage table
// above prints a clean 100% with a zero gap.
//
//   node safety/verify_coverage.cjs             check, print the table, exit non-zero on any gap
//   node safety/verify_coverage.cjs --prove     the same, then MUTATE and require each mutation to
//                                               be caught BY THE HALF IT WAS WRITTEN FOR. A check
//                                               never shown to fail is not proven, and a mutation
//                                               caught by an unrelated check proves nothing at all.
//   node safety/verify_coverage.cjs --baseline  measure the present and write it down as the floor
//   node safety/verify_coverage.cjs --discover  print the discovered universe as a manifest skeleton
//   node safety/verify_coverage.cjs --json      emit the coverage table for the site to render
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const HERE = __dirname;
const REPO = path.resolve(HERE, "..");
const MANIFEST = path.join(REPO, "content", "coverage-manifest.json");
const BASELINE = path.join(REPO, "content", "coverage-baseline.json");
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

  // ── THE COLLAPSE VECTOR THIS CLOSES ────────────────────────────────────────────────────────────
  // The first version of this loop said `if (!root || !fs.existsSync(root)) continue;` — a missing
  // repository was silently skipped. That is the single worst failure this gate could have, because
  // it is INVISIBLE AND IT REPORTS SUCCESS: move a repo, rename a folder, work from a different
  // machine, and fifteen entry points stop existing. Coverage stays at 100% of a world that just got
  // smaller, and the number goes UP in confidence exactly as it goes DOWN in meaning.
  //
  // A denominator that can quietly shrink is worse than no denominator, because the reader is given a
  // figure and no reason to doubt it. So an unresolvable root is now FATAL and named.
  const missing = [];
  for (const [key, p] of Object.entries(roots)) if (!p || !fs.existsSync(p)) missing.push(key);
  if (missing.length) {
    return {
      available: false,
      reason:
        `${missing.length} declared source root(s) do not resolve: ${missing.join(", ")}. ` +
        "Coverage is refused rather than measured against whatever happens to be present — a shrinking " +
        "denominator reports 100% while covering less, which is the one failure this gate exists to " +
        "make impossible.",
      items: [],
    };
  }

  const items = [];
  const seen = new Set();
  for (const c of CLASSES) {
    const root = roots[c.root];

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
// THE RATCHET — 100% must not COLLAPSE and must not REDUCE
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// A percentage is the most collapsible statistic there is. Covered ÷ total stays at 1.0 under two
// completely different disasters, and neither of them looks like a failure from the outside:
//
//   COLLAPSE   the denominator shrinks. Fewer entry points discovered, fewer pages ingested, a
//              corpus that stopped resolving. 100% of a smaller world, reported identically.
//   REDUCTION  work moves from COVERED to EXCLUDED. Every exclusion carries a reason and the sum
//              still closes, so the gate is satisfied while the guides document less each time.
//
// Both are invisible to a check that only asks "does covered + excluded equal the total". So the
// gate also asserts against a COMMITTED FLOOR: every measured quantity must be at least what it was,
// and the excluded ceiling must be no higher.
//
// AND THE FLOOR ITSELF IS RATCHETED. A baseline file can be edited down as easily as anything else,
// so the working copy is compared against the version in git. Lowering any floor — or raising the
// excluded ceiling — requires a new entry in `amendments` saying what was lowered and why. That is
// the difference between a decision and a drift: both change the number, only one leaves a record.
//
// Growth is free and needs no ceremony, which matters because this estate adds servers and documents
// constantly and a gate that fights ordinary work gets switched off.
function ratchet({ manifest, curation, articles, docs, discovered, baseline }, opts = {}) {
  const problems = [];
  const notes = [];
  if (!baseline) {
    problems.push("content/coverage-baseline.json is absent — there is no floor, so coverage could fall to any level and still report 100%. Write one with: node safety/verify_coverage.cjs --baseline");
    return { problems, notes, rows: [] };
  }

  const F = baseline.floors || {};
  const C = baseline.ceilings || {};
  const rows = [];

  // `at least` / `at most` record every comparison so the table can be printed whether or not it
  // failed. A ratchet nobody can see the state of is a ratchet nobody maintains.
  const atLeast = (label, now, floor) => {
    rows.push({ label, now, bound: floor, kind: "min", ok: now >= floor });
    if (now < floor) problems.push(`REDUCED — ${label}: ${now}, below the committed floor of ${floor}. Coverage would still read 100%, of less.`);
  };
  const atMost = (label, now, ceiling) => {
    rows.push({ label, now, bound: ceiling, kind: "max", ok: now <= ceiling });
    if (now > ceiling) problems.push(`REDUCED — ${label}: ${now}, above the committed ceiling of ${ceiling}. Excluding more is how 100% is preserved while covering less.`);
  };

  // ── the discovered denominators: the collapse surface ─────────────────────────────────────────
  const byClass = {};
  for (const d of discovered.items) byClass[d.klass] = (byClass[d.klass] || 0) + 1;
  for (const [klass, floor] of Object.entries(F.entry_point_classes || {})) {
    atLeast(`entry points discovered · ${klass}`, byClass[klass] || 0, floor);
  }
  // A whole CLASS disappearing is the loudest version of the same defect: delete a row from the
  // discovery table and every entry point of that kind stops existing, silently.
  for (const klass of Object.keys(F.entry_point_classes || {})) {
    if (!(klass in byClass)) problems.push(`COLLAPSED — the '${klass}' discovery class now finds nothing at all. Either the shape it looks for is gone from the estate, or the rule that looks for it was removed.`);
  }
  atLeast("entry points discovered · total", discovered.items.length, F.entry_points_total || 0);

  const byCorpus = {};
  for (const p of docs.pages) byCorpus[p.corpus] = (byCorpus[p.corpus] || 0) + 1;
  for (const [corpus, floor] of Object.entries(F.corpora_pages || {})) {
    atLeast(`pages published · ${corpus}`, byCorpus[corpus] || 0, floor);
  }
  atLeast("pages published · total", docs.pages.length, F.pages_total || 0);

  // ── A ROOT THAT IS NO LONGER ASKED FOR ────────────────────────────────────────────────────────
  // discover() refuses a root that is DECLARED and does not resolve. Deleting the declaration is the
  // quiet version of the same act: nothing fails to resolve, because nothing is asked for. One root
  // here is named by no discovery class at all, so removing it does not even disturb the entry-point
  // count — and it contributes 73 of the 292 pages.
  {
    const declared = fs.existsSync(ROOTS_FILE) ? new Set(Object.keys(readJson(ROOTS_FILE).roots || {})) : new Set();
    const gone = (F.roots || []).filter((r) => !declared.has(r));
    if (gone.length) {
      problems.push(`COLLAPSED — ${gone.length} source repositor${gone.length === 1 ? "y" : "ies"} named in the committed floor ${gone.length === 1 ? "is" : "are"} no longer declared in generators/roots.local.json: ${gone.join(", ")}. Everything they contributed stops being discovered and the percentage does not move.`);
    }
  }

  // ── PER-ROUTE FLOORS ──────────────────────────────────────────────────────────────────────────
  // `curation_groups` counts HEADINGS, so 22 routes survive a route falling from 17 pages to 1 while
  // its pages are absorbed into a catch-all — still routed, still covered, still 100%. That is the
  // original 85-item-flat-list defect reproducing itself one level down, inside the very mechanism
  // built to prevent it. An audit reproduced it with no edit to any rule.
  //
  // The floor is per route and only downward: a route growing is free, which matters because this
  // estate emits dated receipts as routine output and a gate that reddens on ordinary work gets
  // switched off. What it catches is a route HOLLOWING OUT.
  {
    const size = new Map((curation.groups || []).map((g) => [g.id, (g.pages || []).length]));
    for (const [id, floor] of Object.entries(F.curation_routes || {})) {
      if (!size.has(id)) { problems.push(`COLLAPSED — the curated route '${id}' no longer exists. Its ${floor} page(s) are absorbed elsewhere or unrouted, and coverage still reads 100%.`); continue; }
      atLeast(`pages in route · ${id}`, size.get(id), floor);
    }
  }

  // ── RUNNABLE MARKERS, COUNTED ─────────────────────────────────────────────────────────────────
  // The per-subsystem check asks whether the marker appears ANYWHERE in the article. Seven subsystems
  // share one article, and that article opens with a legend listing all three marker phrases — so
  // deleting every per-section marker leaves the legend, and all seven checks still pass. Counting
  // them is the difference between "the words exist" and "each section says which it is".
  {
    const count = articles.articles.reduce((n, a) => n + (a.body.match(/RUNNABLE BY YOU|NEEDS THE OPERATOR.S INFRASTRUCTURE|PARTLY RUNNABLE BY YOU/g) || []).length, 0);
    if (F.runnable_markers !== undefined) atLeast("RUNNABLE markers", count, F.runnable_markers);
  }

  // ── the covered side: the reduction surface ───────────────────────────────────────────────────
  const eps = manifest.entry_points || [];
  atLeast("entry points documented", eps.filter((e) => !e.excluded).length, F.entry_points_covered || 0);
  atMost("entry points excluded", eps.filter((e) => e.excluded).length, C.entry_points_excluded ?? Infinity);
  atLeast("subsystems", (manifest.subsystems || []).filter((s) => !s.excluded).length, F.subsystems || 0);
  atLeast("document types", (manifest.document_types || []).filter((t) => !t.excluded).length, F.document_types || 0);
  atLeast("articles", articles.articles.length, F.articles || 0);
  atLeast("resolved citations", articles.articles.reduce((n, a) => n + (a.cites || []).length, 0), F.citations || 0);
  atLeast("quoted source blocks", articles.articles.reduce((n, a) => n + (a.quotes || []).length, 0), F.quotes || 0);
  atLeast("curated routes", (curation.groups || []).length, F.curation_groups || 0);
  atMost("pages in no route", (curation.uncategorised || []).length, C.pages_uncategorised ?? Infinity);

  // ── content depth: reduction that leaves every structural check satisfied ─────────────────────
  // Every anchor can still match in an article gutted to a list of headings. The document-type check
  // catches an outright stub at 400 characters; nothing catches a guide losing most of its substance
  // while staying above that. So each article carries its own floor.
  //
  // The tolerance is a JUDGEMENT and is written down as one. Prose gets edited and legitimately gets
  // shorter; a fraction of 1.0 would make every tightening pass a gate failure and teach people to
  // raise the floor reflexively, which is worse than a slightly loose bound. 0.75 says: tighten
  // freely, lose a quarter of a guide and say so out loud.
  const frac = (baseline.tolerance && baseline.tolerance.article_chars_fraction) || 0.75;
  const bySlug = new Map(articles.articles.map((a) => [a.slug, a]));
  for (const [slug, floor] of Object.entries(F.article_chars || {})) {
    const a = bySlug.get(slug);
    if (!a) { problems.push(`REDUCED — article '${slug}' is gone. It was in the committed baseline.`); continue; }
    const now = a.body.replace(/\s+/g, "").length;
    const bound = Math.floor(floor * frac);
    rows.push({ label: `substance · ${slug}`, now, bound, kind: "min", ok: now >= bound });
    if (now < bound) problems.push(`REDUCED — article '${slug}' has ${now} characters of substance, below ${bound} (${Math.round(frac * 100)}% of its committed ${floor}). Every anchor can still match in a guide that has been hollowed out.`);
  }

  // ── the ratchet on the ratchet ────────────────────────────────────────────────────────────────
  // Without this, everything above is a floor that can be lowered in the same commit that breaches
  // it. The previous baseline comes from git rather than from another file, because a second file
  // could be edited too — git history is the one record here that a working-tree edit cannot reach.
  let prev = null;
  try {
    if (opts.simulateUnreadablePrev) throw new Error("simulated");
    // stdio 'pipe' on stderr: on the very first run the file is not in HEAD and git says so loudly,
    // which would read as an error in a passing run.
    prev = JSON.parse(execFileSync("git", ["-C", REPO, "show", "HEAD:content/coverage-baseline.json"], { encoding: "utf8", maxBuffer: 1 << 24, stdio: ["ignore", "pipe", "pipe"] }));
  } catch { /* every failure mode lands here — which is exactly the problem, handled below */ }

  if (!prev) {
    // ── THIS BRANCH USED TO BE A NOTE, AND THAT MADE THE WHOLE RATCHET DECORATIVE ────────────────
    // An adversarial audit demonstrated it: with git simply absent from PATH, every floor set to 1,
    // the tolerance to 0.01, the ceilings to 9999 and two floor groups deleted outright — the gate
    // printed "COVERAGE 100%" and exited 0. The bound count fell from 36 to 11 and the very same
    // line read "11 held, 0 breached". The only trace was a friendly note saying the baseline was
    // not committed yet, which was untrue and misdiagnosed the cause.
    //
    // A bare catch swallows every failure identically: not-yet-committed, a fresh worktree whose
    // HEAD predates the file, a shallow CI checkout, a rename, or no git at all. Four of those five
    // are ordinary events and none of them means "the floors are fine".
    //
    // So it fails CLOSED, and it asks git a second, independent question to say WHICH case it is
    // rather than guessing. A genuine first run stays possible, but only if somebody says so out
    // loud with --first-baseline — consent stated, never inferred from a swallowed exception.
    let tracked = false, gitPresent = true;
    try {
      execFileSync("git", ["-C", REPO, "ls-files", "--error-unmatch", "content/coverage-baseline.json"], { stdio: ["ignore", "ignore", "ignore"] });
      tracked = true;
    } catch (e) { if (e && e.code === "ENOENT") gitPresent = false; }

    const why = !gitPresent ? "git is not available here" : tracked ? "the file IS tracked, so this is not a first run" : "the file is not tracked yet";
    if (tracked || !gitPresent || !ARGV.includes("--first-baseline")) {
      problems.push(
        `THE RATCHET ON THE RATCHET DID NOT RUN — the committed baseline could not be read (${why}).\n` +
        `    Every floor, ceiling and tolerance is UNENFORCED for this run. Any of them could have been\n` +
        `    lowered or deleted in this same edit and the line above would still say "held, 0 breached".\n` +
        `    Commit the baseline, or pass --first-baseline to declare this genuinely the first run.`
      );
    } else {
      notes.push("FIRST RUN — the baseline is untracked and --first-baseline was passed, so no previous floor exists to compare against. Every bound below is being established, not enforced.");
    }
  } else {
    const flat = (o, pre = "") => {
      const out = {};
      for (const [k, v] of Object.entries(o || {})) {
        if (v && typeof v === "object" && !Array.isArray(v)) Object.assign(out, flat(v, pre + k + "."));
        else if (typeof v === "number") out[pre + k] = v;
      }
      return out;
    };
    const nowF = flat(F), prevF = flat(prev.floors);
    const nowC = flat(C), prevC = flat(prev.ceilings);
    const loosened = [];
    for (const [k, v] of Object.entries(prevF)) if (k in nowF && nowF[k] < v) loosened.push(`floor ${k}: ${v} → ${nowF[k]}`);
    for (const [k, v] of Object.entries(prevF)) if (!(k in nowF)) loosened.push(`floor ${k} was DELETED (was ${v})`);
    for (const [k, v] of Object.entries(prevC)) if (k in nowC && nowC[k] > v) loosened.push(`ceiling ${k}: ${v} → ${nowC[k]}`);
    for (const [k, v] of Object.entries(prevC)) if (!(k in nowC)) loosened.push(`ceiling ${k} was DELETED (was ${v})`);
    const prevTol = (prev.tolerance && prev.tolerance.article_chars_fraction) ?? 0.75;
    if (frac < prevTol) loosened.push(`tolerance article_chars_fraction: ${prevTol} → ${frac}`);

    // `flat()` keeps only numbers and recurses only into non-array objects, so floors.roots — the
    // declared set of SOURCE REPOSITORIES, and the largest collapse surface there is — was compared
    // against nothing at all. An audit struck two of four roots from the committed floor and the gate
    // passed silently. The one non-numeric floor was the one that mattered most.
    const prevRoots = new Set((prev.floors && prev.floors.roots) || []);
    const nowRoots = new Set(F.roots || []);
    for (const r of prevRoots) if (!nowRoots.has(r)) loosened.push(`floor roots: source repository '${r}' was REMOVED from the declared floor`);

    // An amendment must NAME what moved. Otherwise one entry saying "tidied the floors" licenses any
    // number of unrelated loosenings, which turns the record into a receipt for a decision nobody
    // made. Matching on the field key is crude and it is enough: it forces the person lowering a
    // floor to write down which floor.
    const newAmendments = (baseline.amendments || []).slice((prev.amendments || []).length);
    const said = newAmendments.map((a) => `${a.what || ""} ${a.why || ""}`).join(" ").toLowerCase();
    const unexplained = loosened.filter((l) => {
      const key = (/(?:floor|ceiling|tolerance) ([A-Za-z0-9_.]+)/.exec(l) || [])[1];
      return key && !said.includes(key.toLowerCase()) && !said.includes(key.split(".").pop().toLowerCase());
    });

    if (loosened.length && !newAmendments.length) {
      problems.push(
        `THE FLOOR ITSELF WAS LOWERED WITH NO RECORDED AMENDMENT — ${loosened.length} change(s):\n    ` +
        loosened.join("\n    ") +
        "\n    A floor that can be edited down in the same commit that breaches it is not a floor." +
        "\n    Lowering one is allowed; doing it silently is not. Add an entry to `amendments` saying" +
        "\n    what was lowered and why, and this passes."
      );
    } else if (unexplained.length) {
      problems.push(
        `${unexplained.length} loosening(s) are not NAMED by any new amendment:\n    ` +
        unexplained.join("\n    ") +
        "\n    An amendment that does not say which bound moved lets one sentence license every change" +
        "\n    in the commit. Name the field in the amendment's `what`."
      );
    } else if (loosened.length) {
      notes.push(`${loosened.length} loosening(s), each named by one of ${newAmendments.length} new amendment(s): ${loosened.join("; ")}`);
    }
  }

  for (const a of baseline.amendments || []) {
    notes.push(`AMENDMENT ${a.date || "(undated)"} — ${a.what || "(unstated)"}: ${a.why || "(no reason given)"}`);
    if (!a.date || !a.what || !a.why) problems.push(`an amendment is missing its date, what, or why. An amendment without a reason is the silent edit it was supposed to replace.`);
  }

  return { problems, notes, rows };
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

    // A slug is a URL. This axis counts ENTRIES, and entries are not routes — two documents sharing a
    // slug means the build publishes one of them and the other is gone, with every total still
    // adding up. Measured once on a real bundle: 292 entries, 291 URLs, one page silently missing
    // from the site and a green gate. The denominator has to be the thing a reader can actually open.
    if (live.size !== docs.pages.length) {
      const counts = new Map();
      for (const p of docs.pages) counts.set(p.slug, (counts.get(p.slug) || 0) + 1);
      const dup = [...counts].filter(([, n]) => n > 1).map(([s]) => s);
      problems.push(`${docs.pages.length - live.size} page(s) share a slug with another and are therefore unpublishable: ${dup.join(", ")}. This axis counts entries; the site publishes URLs.`);
    }

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
  return {
    manifest: readJson(MANIFEST),
    curation: readJson(CURATION),
    articles: readJson(ARTICLES),
    docs: readJson(DOCS),
    baseline: fs.existsSync(BASELINE) ? readJson(BASELINE) : null,
  };
}

/** Measure the present and write it down as the floor. Run on purpose, never as a build step. */
function writeBaseline(state, discovered) {
  const byClass = {};
  for (const d of discovered.items) byClass[d.klass] = (byClass[d.klass] || 0) + 1;
  const byCorpus = {};
  for (const p of state.docs.pages) byCorpus[p.corpus] = (byCorpus[p.corpus] || 0) + 1;
  const arts = state.articles.articles;

  const out = {
    note: [
      "THE FLOOR. Every number here was MEASURED, and from now on coverage may not fall below it.",
      "",
      "This file exists because 'covered + excluded = total' stays true while the total shrinks and",
      "while work moves from covered to excluded. Both keep the figure at 100% and both mean the site",
      "documents less than it did. Neither is visible to the gate's other checks.",
      "",
      "Growth needs nothing: exceed a floor and the gate is happy. LOWERING one is allowed and must be",
      "declared — the gate compares this file against its own committed version in git and fails if a",
      "floor moved down with no new entry in `amendments`. A floor editable in the same commit that",
      "breaches it is not a floor.",
      "",
      "Regenerate deliberately with: node safety/verify_coverage.cjs --baseline",
    ],
    schema_version: 1,
    generated_by: "safety/verify_coverage.cjs --baseline",
    tolerance: {
      article_chars_fraction: 0.75,
      why:
        "Prose is edited and legitimately gets shorter. A fraction of 1.0 would make every tightening " +
        "a gate failure and would teach people to raise the floor reflexively, which is worse than a " +
        "slightly loose bound. This is a judgement, recorded as one.",
    },
    floors: {
      roots: Object.keys(JSON.parse(fs.readFileSync(ROOTS_FILE, "utf8")).roots || {}).sort(),
      entry_point_classes: byClass,
      entry_points_total: discovered.items.length,
      entry_points_covered: (state.manifest.entry_points || []).filter((e) => !e.excluded).length,
      corpora_pages: byCorpus,
      pages_total: state.docs.pages.length,
      subsystems: (state.manifest.subsystems || []).filter((s) => !s.excluded).length,
      document_types: (state.manifest.document_types || []).filter((t) => !t.excluded).length,
      articles: arts.length,
      citations: arts.reduce((n, a) => n + (a.cites || []).length, 0),
      quotes: arts.reduce((n, a) => n + (a.quotes || []).length, 0),
      curation_groups: (state.curation.groups || []).length,
      curation_routes: Object.fromEntries((state.curation.groups || []).map((g) => [g.id, (g.pages || []).length])),
      runnable_markers: arts.reduce((n, a) => n + (a.body.match(/RUNNABLE BY YOU|NEEDS THE OPERATOR.S INFRASTRUCTURE|PARTLY RUNNABLE BY YOU/g) || []).length, 0),
      article_chars: Object.fromEntries(arts.map((a) => [a.slug, a.body.replace(/\s+/g, "").length])),
    },
    ceilings: {
      entry_points_excluded: (state.manifest.entry_points || []).filter((e) => e.excluded).length,
      pages_uncategorised: (state.curation.uncategorised || []).length,
    },
    amendments: (state.baseline && state.baseline.amendments) || [],
  };
  fs.writeFileSync(BASELINE, JSON.stringify(out, null, 1) + "\n", "utf8");
  return out;
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

if (ARGV.includes("--baseline")) {
  const b = writeBaseline(state, discovered);
  console.log(`baseline written to content/coverage-baseline.json`);
  console.log(`  ${Object.keys(b.floors).length} floor group(s), ${Object.keys(b.ceilings).length} ceiling(s), ${b.amendments.length} amendment(s)`);
  console.log("  COMMIT IT. Until it is in git, the gate cannot tell whether a floor was lowered.");
  process.exit(0);
}

const evaluation = evaluate({ ...state, discovered });
const axes = evaluation.axes;
const ratchetResult = ratchet({ ...state, discovered });
const problems = [...evaluation.problems, ...ratchetResult.problems];

const table = {
  generated_by: "safety/verify_coverage.cjs",
  note: [
    "The coverage table the site renders. Written from the same evaluation that gates the build, so",
    "the published figure and the enforced figure cannot differ — a page that recomputed its own",
    "number would be a second measurement able to disagree with the one that actually holds.",
  ],
  axes,
  ratchet: {
    bounds: ratchetResult.rows.length,
    held: ratchetResult.rows.filter((r) => r.ok).length,
    breached: ratchetResult.rows.filter((r) => !r.ok).length,
    at_the_line: ratchetResult.rows.filter((r) => r.ok && r.now === r.bound).length,
    amendments: (state.baseline && state.baseline.amendments) || [],
    notes: ratchetResult.notes,
    rows: ratchetResult.rows,
  },
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

// The ratchet's state is printed on every run, passing or failing. A bound nobody can see the
// distance to is a bound nobody notices approaching.
const rows = ratchetResult.rows;
if (rows.length) {
  const breached = rows.filter((r) => !r.ok);
  const tight = rows.filter((r) => r.ok && (r.kind === "min" ? r.now === r.bound : r.now === r.bound));
  console.log(`\nTHE RATCHET — ${rows.length} committed bound(s): ${rows.length - breached.length} held, ${breached.length} breached, ${tight.length} exactly at the line.`);
  console.log("  100% cannot COLLAPSE (a shrinking denominator) or REDUCE (work moved into exclusions),");
  console.log("  because both keep the percentage at 1.0 and neither is visible to the table above.");
  for (const r of breached) console.log(`  ✗ ${r.label}: ${r.now} vs ${r.kind === "min" ? "floor" : "ceiling"} ${r.bound}`);
  for (const n of ratchetResult.notes) console.log(`  · ${n}`);
}

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

  // ATTRIBUTION, NOT JUST DETECTION. "Something went red" is a weaker result than it looks: a
  // mutation caught by an unrelated check says nothing about the check it was written for, and a
  // suite of those reads as thorough while proving nothing. So each mutation declares WHICH HALF of
  // the gate is supposed to catch it, and being caught by the other half alone is reported as a HOLE.
  //
  // This is not hypothetical here. Three of the reduction mutations below leave the coverage axes
  // reporting a clean 100% with a zero gap — they are invisible to everything except the ratchet.
  // Had the ratchet been broken, a plain "caught" would still have printed for two of them.
  const halves = (s, d, o) => ({
    axes: evaluate({ ...s, discovered: d || discovered }).problems.length > 0,
    ratchet: ratchet({ ...s, discovered: d || discovered }, o).problems.length > 0,
  });

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

  // ── RATCHET MUTATIONS ───────────────────────────────────────────────────────────────────────
  // Every one of these leaves covered + excluded = total, so the coverage table stays at 100% and
  // the gap stays zero. If the ratchet does not catch them, it does not exist.
  mutations.push(
    ["REDUCE: move a documented entry point into the exclusions", "ratchet", () => {
      const s = clone();
      const e = (s.manifest.entry_points || []).find((x) => !x.excluded);
      if (!e) return null;
      delete e.article; delete e.anchor;
      e.excluded = true;
      e.reason = "A perfectly plausible sentence of at least twenty characters, which is all the reason check asks for.";
      return s;
    }],
    ["REDUCE: hollow out a guide, leaving every anchor intact", "ratchet", () => {
      const s = clone();
      const a = s.articles.articles.find((x) => x.slug === "run-it");
      if (!a) return null;
      // Keep only the headings and the fenced commands — every anchor still matches, and the
      // article is now a table of contents. This is the mutation the 400-character stub check
      // cannot see, because the result is far longer than 400 characters.
      a.body = a.body.split(/\r?\n/).filter((l) => /^#{1,3} |^```|^mix |^npm |^node |^powershell |^curl /.test(l)).join("\n");
      return s;
    }],
    ["COLLAPSE: a source repository stops resolving", "ratchet", () => clone()],   // paired with a shrunken discovery below
    ["REDUCE: delete an article that the baseline recorded", "ratchet", () => {
      const s = clone();
      s.articles.articles = s.articles.articles.filter((a) => a.slug !== "how-to");
      // Keep the manifest consistent so ONLY the ratchet can catch this, never the coverage axes.
      s.manifest.document_types = (s.manifest.document_types || []).filter((t) => t.id !== "how-to");
      s.baseline.floors.document_types = Math.max(0, (s.baseline.floors.document_types || 1) - 1);
      return s;
    }],
    ["REDUCE: lower a floor in the same edit that breaches it", "ratchet", () => {
      const s = clone();
      s.baseline.floors.articles = 1;
      s.baseline.floors.citations = 1;
      s.baseline.ceilings.entry_points_excluded = 999;
      return s;
    }],
    ["REDUCE: raise the excluded ceiling with no amendment", "ratchet", () => {
      const s = clone();
      s.baseline.ceilings.entry_points_excluded = (s.baseline.ceilings.entry_points_excluded || 0) + 50;
      return s;
    }],
    ["REDUCE: delete a floor outright", "ratchet", () => {
      const s = clone();
      delete s.baseline.floors.entry_points_covered;
      return s;
    }],
    ["REDUCE: loosen the substance tolerance with no amendment", "ratchet", () => {
      const s = clone();
      s.baseline.tolerance.article_chars_fraction = 0.05;
      return s;
    }],
    ["an amendment with no reason", "ratchet", () => {
      const s = clone();
      s.baseline.floors.articles = 1;
      s.baseline.amendments = [...(s.baseline.amendments || []), { date: "2026-08-01", what: "lowered the article floor" }];
      return s;
    }],
    ["COLLAPSE: a source repository is no longer declared", "ratchet", () => {
      const s = clone();
      s.baseline.floors.roots = [...(s.baseline.floors.roots || []), "uni-a-repo-nobody-declares"];
      return s;
    }],
    ["REDUCE: remove a source repository from the committed floor", "ratchet", () => {
      const s = clone();
      s.baseline.floors.roots = (s.baseline.floors.roots || []).slice(1);
      return s;
    }],
    ["REDUCE: a curated route hollows out into a catch-all", "ratchet", () => {
      const s = clone();
      const from = s.curation.groups.find((g) => g.pages.length > 3 && g.id !== "evidence-receipts");
      const to = s.curation.groups.find((g) => g.id !== from.id);
      if (!from || !to) return null;
      to.pages = [...to.pages, ...from.pages.slice(1)];
      from.pages = from.pages.slice(0, 1);
      return s;
    }],
    ["COLLAPSE: a curated route disappears, its pages absorbed", "ratchet", () => {
      const s = clone();
      const gone = s.curation.groups[s.curation.groups.length - 1];
      s.curation.groups = s.curation.groups.filter((g) => g.id !== gone.id);
      s.curation.groups[0].pages = [...s.curation.groups[0].pages, ...gone.pages];
      return s;
    }],
    ["REDUCE: strip the per-section RUNNABLE markers, leaving the legend", "ratchet", () => {
      const s = clone();
      // The legend at the top of the run-it guide names all three markers, so the per-subsystem
      // presence check still passes with every section marker deleted. Only counting sees it.
      const a = s.articles.articles.find((x) => x.slug === "run-it");
      if (!a) return null;
      let first = true;
      a.body = a.body.replace(/RUNNABLE BY YOU|NEEDS THE OPERATOR.S INFRASTRUCTURE|PARTLY RUNNABLE BY YOU/g, (m) => {
        if (first) { first = false; return m; }
        return "(see the legend above)";
      });
      return s;
    }],
    ["REDUCE: an amendment that does not name the bound it moved", "ratchet", () => {
      const s = clone();
      s.baseline.floors.articles = 1;
      s.baseline.amendments = [...(s.baseline.amendments || []), { date: "2026-08-01", what: "tidied the baseline", why: "it was untidy and this sentence is comfortably over twenty characters" }];
      return s;
    }],
    ["COLLAPSE: remove the baseline entirely", "ratchet", () => {
      const s = clone();
      s.baseline = null;
      return s;
    }],
  );

  // The last two are different in kind: they change the WORLD, not the files. A new runnable thing
  // appears and nobody writes about it; a whole class of runnable thing stops being discovered.
  const withNewEntryPoint = () => ({
    available: true,
    items: [...discovered.items, { id: "server:uni-minecraft:brand_new_server.cjs", klass: "server", root: "uni-minecraft", what: "x", command: "node viewer/brand_new_server.cjs", defined_in: "viewer/brand_new_server.cjs" }],
  });
  // THE COLLAPSE THAT LOOKS LIKE SUCCESS: every remaining entry point is still documented, so the
  // coverage axes report a clean 100% — of a world that just lost a repository.
  const withShrunkenWorld = () => ({
    available: true,
    items: discovered.items.filter((d) => d.root !== "uni-flagellum"),
  });

  console.log("\nPROVING — each mutation must be caught:\n");
  let caught = 0, holes = 0, skipped = 0;
  for (const entry of mutations) {
    const [name, expectOrFn, maybeFn] = entry;
    const expect = typeof expectOrFn === "string" ? expectOrFn : "axes";
    const mutate = typeof expectOrFn === "string" ? maybeFn : expectOrFn;
    const s = mutate();
    if (!s) { console.log(`  SKIP   ${name} (nothing in the manifest to mutate)`); skipped++; continue; }
    // The collapse mutation is a world change, applied through the discovery instead of the files.
    const d = /^COLLAPSE: a source repository/.test(name) ? withShrunkenWorld() : discovered;
    const h = halves(s, d);
    const by = [h.axes ? "axes" : null, h.ratchet ? "ratchet" : null].filter(Boolean).join("+") || "nothing";
    if (h[expect]) { console.log(`  caught ${name.padEnd(58)} [${by}]`); caught++; }
    else if (h.axes || h.ratchet) {
      console.error(`  HOLE   ${name.padEnd(58)} [${by}] — caught, but NOT by the ${expect}, which is the check this mutation exists to test.`);
      holes++;
    } else { console.error(`  HOLE   ${name.padEnd(58)} — SURVIVED. This check does not bite.`); holes++; }
  }
  {
    const h = halves(state, withNewEntryPoint());
    if (h.axes) { console.log("  caught " + "a new undocumented server appearing in the estate".padEnd(58) + " [axes]"); caught++; }
    else { console.error("  HOLE   a new undocumented server appearing in the estate — SURVIVED."); holes++; }
  }
  // THE ONE THAT MADE EVERY OTHER BOUND DECORATIVE. With the previous baseline unreadable — no git
  // on PATH, a shallow checkout, a worktree whose HEAD predates the file — the ratchet used to
  // report "held, 0 breached" while every floor in it could have been lowered in the same edit.
  {
    const h = halves(state, discovered, { simulateUnreadablePrev: true });
    if (h.ratchet) { console.log("  caught " + "COLLAPSE: the committed baseline cannot be read at all".padEnd(58) + " [ratchet]"); caught++; }
    else { console.error("  HOLE   COLLAPSE: the committed baseline cannot be read at all — SURVIVED. Every floor is unenforced and the gate says nothing."); holes++; }
  }

  console.log(`\n${caught} caught, ${holes} hole(s), ${skipped} skipped`);
  if (holes) { console.error("A gate with holes reports green for reasons it cannot justify."); process.exit(1); }
  if (problems.length) process.exit(1);
  console.log("\nCOVERAGE 100% — and the gate is proved to bite in every direction it claims to.");
  process.exit(0);
}

console.log("\nCOVERAGE 100%.");
process.exit(0);
