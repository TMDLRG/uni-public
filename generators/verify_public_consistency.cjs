// verify_public_consistency.cjs — the half of the coverage gate that can run WITHOUT the private estate.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// THE VACUITY VECTOR THIS CLOSES
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// safety/verify_coverage.cjs is a real gate and it has one structural weakness: IT ONLY RUNS WHERE
// THE PRIVATE REPOSITORIES ARE. It needs generators/roots.local.json to discover entry points, and
// that file is gitignored and exists on exactly one machine. There is no continuous integration here.
// The deploy runs `next build` and nothing else.
//
// So the published site could carry a coverage figure that no longer holds, and every mechanism built
// to prevent that would be sitting on a laptop. A gate that can only run where somebody remembers to
// run it is a gate with an availability problem, not a correctness one — and the availability problem
// is the one that actually bites, because it fails on the day attention lapses.
//
// This file is what CAN be checked from the public repository alone, and it runs on every build:
//
//   * the committed artifacts must agree WITH EACH OTHER — a manifest naming an article that is not
//     there, a route pointing at a page that is not published, an anchor whose section has been
//     deleted;
//   * the published coverage figure must agree with the artifacts it claims to summarise. STALENESS
//     IS THE POINT. content/generated/coverage.json is written by the private gate and committed. If
//     articles or pages change and it is not rewritten, the site publishes yesterday's number in
//     today's present tense — which is precisely the failure this estate wrote its generated-state
//     machinery to end.
//
// What it CANNOT check, stated so nobody mistakes a pass here for the full gate: it cannot discover
// entry points, so it cannot see a new server nobody documented, and it cannot verify the floors
// against the world. Those need the private repositories and safety/verify_coverage.cjs. This is the
// subset that is always available, not a replacement.
//
//   node generators/verify_public_consistency.cjs
"use strict";

const fs = require("fs");
const path = require("path");

// The root is overridable so --prove can run this very script against a MUTATED copy of the
// artifacts. Proving a check by reasoning about it is how a check that does not bite gets shipped;
// the only convincing demonstration is to break something and watch this exact code go red.
const REPO = process.env.UNI_PUBLIC_ROOT || path.resolve(__dirname, "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(REPO, p), "utf8"));

// ─── --prove: copy the artifacts, break one thing at a time, require this script to notice ──────
if (process.argv.includes("--prove")) {
  const os = require("os"), cp = require("child_process");
  const SRC = path.resolve(__dirname, "..");
  const FILES = [
    "content/generated/articles.json", "content/generated/docs.json", "content/generated/coverage.json",
    "content/coverage-manifest.json", "content/coverage-baseline.json", "content/curation.json",
    "app/layout.tsx", "package.json",
  ];
  const MUT = [
    ["delete an article the manifest points at", (a) => {
      const m = JSON.parse(a["content/coverage-manifest.json"]);
      const slug = m.subsystems.find((s) => !s.excluded).run_it;
      const arts = JSON.parse(a["content/generated/articles.json"]);
      arts.articles = arts.articles.filter((x) => x.slug !== slug);
      a["content/generated/articles.json"] = JSON.stringify(arts);
    }],
    ["move the section an entry point names", (a) => {
      const m = JSON.parse(a["content/coverage-manifest.json"]);
      const e = m.entry_points.find((x) => !x.excluded);
      const arts = JSON.parse(a["content/generated/articles.json"]);
      const art = arts.articles.find((x) => x.slug === e.article);
      art.body = art.body.split(e.anchor).join("<<moved>>");
      a["content/generated/articles.json"] = JSON.stringify(arts);
    }],
    ["strip the RUNNABLE marker", (a) => {
      const m = JSON.parse(a["content/coverage-manifest.json"]);
      const slug = m.subsystems.find((s) => !s.excluded).run_it;
      const arts = JSON.parse(a["content/generated/articles.json"]);
      const art = arts.articles.find((x) => x.slug === slug);
      art.body = art.body.replace(/RUNNABLE BY YOU|NEEDS THE OPERATOR.S INFRASTRUCTURE|PARTLY RUNNABLE BY YOU/g, "x");
      a["content/generated/articles.json"] = JSON.stringify(arts);
    }],
    ["give two documents the same URL", (a) => {
      // The real defect this was written after: entries still total 292, so every count adds up and
      // one page is simply not on the site.
      const d = JSON.parse(a["content/generated/docs.json"]);
      d.pages[1].slug = d.pages[0].slug;
      a["content/generated/docs.json"] = JSON.stringify(d);
    }],
    ["drop a page out of every route", (a) => {
      const c = JSON.parse(a["content/curation.json"]);
      const slug = c.groups[0].pages[0];
      for (const g of c.groups) g.pages = g.pages.filter((x) => x !== slug);
      a["content/curation.json"] = JSON.stringify(c);
    }],
    ["point a route at a page that is not published", (a) => {
      const c = JSON.parse(a["content/curation.json"]);
      c.groups[0].pages.push("ghost/not-published");
      a["content/curation.json"] = JSON.stringify(c);
    }],
    ["let the published figure go stale against the artifacts", (a) => {
      const arts = JSON.parse(a["content/generated/articles.json"]);
      const m = JSON.parse(a["content/coverage-manifest.json"]);
      // A brand-new entry point is documented and added, and nobody re-emits coverage.json. The
      // site keeps rendering the old total in the present tense. This is THE staleness failure.
      const art = arts.articles[0];
      art.body += "\n\n## New\n\n```bash\nnode viewer/newly_added_server.cjs\n```\n";
      m.entry_points.push({ id: "server:uni-minecraft:newly_added_server.cjs", command: "node viewer/newly_added_server.cjs", article: art.slug, anchor: "node viewer/newly_added_server.cjs" });
      a["content/generated/articles.json"] = JSON.stringify(arts);
      a["content/coverage-manifest.json"] = JSON.stringify(m);
    }],
    ["breach a ratchet floor without touching the published record", (a) => {
      const arts = JSON.parse(a["content/generated/articles.json"]);
      const b = JSON.parse(a["content/coverage-baseline.json"]);
      const slug = Object.keys(b.floors.article_chars)[0];
      const art = arts.articles.find((x) => x.slug === slug);
      art.body = art.body.slice(0, Math.floor(art.body.length * 0.2));
      a["content/generated/articles.json"] = JSON.stringify(arts);
    }],
    ["unhook a document type from the navigation", (a) => {
      a["app/layout.tsx"] = a["app/layout.tsx"].replace(/href: "\/articles\/",/, 'href: "/gone/",');
    }],
    ["emit the published record from a failing run", (a) => {
      const c = JSON.parse(a["content/generated/coverage.json"]);
      c.ok = false;
      a["content/generated/coverage.json"] = JSON.stringify(c);
    }],
  ];

  // ── THE CONTROL, AND WHY IT IS NOT OPTIONAL ──────────────────────────────────────────────────
  // Run the harness on an UNMUTATED copy first. If that fails, every "caught" below is worthless:
  // the script is dying for a reason unrelated to the mutation, and the suite reports a clean sweep
  // while testing nothing at all.
  //
  // NOT HYPOTHETICAL — THIS EXACT THING HAPPENED WHILE THIS FILE WAS BEING EDITED. Adding the
  // "every script this project tells you to run exists" check made the harness read package.json,
  // which was not in FILES. The temp copy was therefore incomplete, the run died on a missing file,
  // and --prove reported 10 caught / 0 holes having detected NOTHING. The check that broke it was a
  // check about gates that cannot run.
  //
  // A mutation suite with no control is not evidence. This is the cheapest possible proof of that,
  // and it costs one extra run.
  {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "uni-pc-ctl-"));
    for (const f of FILES) {
      fs.mkdirSync(path.join(dir, path.dirname(f)), { recursive: true });
      fs.copyFileSync(path.join(SRC, f), path.join(dir, f));
    }
    const r = cp.spawnSync(process.execPath, [__filename], { env: { ...process.env, UNI_PUBLIC_ROOT: dir }, encoding: "utf8" });
    fs.rmSync(dir, { recursive: true, force: true });
    if (r.status !== 0) {
      console.error("CONTROL FAILED — an UNMUTATED copy of the artifacts does not pass.\n");
      console.error("Every mutation below would report 'caught' for a reason having nothing to do with");
      console.error("the mutation. Refusing to run a suite that cannot tell those apart.\n");
      console.error((r.stdout || "") + (r.stderr || ""));
      process.exit(1);
    }
    console.log("control: an unmutated copy PASSES, so any failure below is attributable to its mutation\n");
  }

  console.log("PROVING public consistency — each mutation must be caught:\n");
  let caught = 0, holes = 0;
  for (const [name, mutate] of MUT) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "uni-pc-"));
    const store = {};
    for (const f of FILES) store[f] = fs.readFileSync(path.join(SRC, f), "utf8");
    try { mutate(store); } catch (err) { console.error(`  SKIP   ${name} (${err.message})`); continue; }
    for (const f of FILES) {
      fs.mkdirSync(path.join(dir, path.dirname(f)), { recursive: true });
      fs.writeFileSync(path.join(dir, f), store[f], "utf8");
    }
    const r = cp.spawnSync(process.execPath, [__filename], { env: { ...process.env, UNI_PUBLIC_ROOT: dir }, encoding: "utf8" });
    fs.rmSync(dir, { recursive: true, force: true });
    if (r.status !== 0) { console.log(`  caught ${name}`); caught++; }
    else { console.error(`  HOLE   ${name} — SURVIVED. This check does not bite.`); holes++; }
  }
  console.log(`\n${caught} caught, ${holes} hole(s)`);
  process.exit(holes ? 1 : 0);
}

const results = [];
const ok = (name, detail) => results.push({ pass: true, name, detail });
const bad = (name, detail) => results.push({ pass: false, name, detail });

const REQUIRED = [
  "content/generated/articles.json",
  "content/generated/docs.json",
  "content/generated/coverage.json",
  "content/coverage-manifest.json",
  "content/coverage-baseline.json",
  "content/curation.json",
];

// Fails closed, like everything else here. A missing input is not "skip the check".
const absent = REQUIRED.filter((f) => !fs.existsSync(path.join(REPO, f)));
if (absent.length) {
  console.error("PUBLIC CONSISTENCY CANNOT RUN — missing committed artifact(s):");
  for (const f of absent) console.error("  " + f);
  console.error("\nThese are committed precisely so this site builds from this repository alone.");
  process.exit(1);
}

const articles = read("content/generated/articles.json").articles;
const docs = read("content/generated/docs.json");
const coverage = read("content/generated/coverage.json");
const manifest = read("content/coverage-manifest.json");
const baseline = read("content/coverage-baseline.json");
const curation = read("content/curation.json");

const bySlug = new Map(articles.map((a) => [a.slug, a]));
const pageSlugs = new Set(docs.pages.map((p) => p.slug));

// ─── 1 · the manifest must describe articles that exist, at the sections it names ────────────────
{
  const problems = [];
  for (const s of manifest.subsystems || []) {
    if (s.excluded) continue;
    for (const layer of ["understand", "run_it"]) {
      const a = bySlug.get(s[layer]);
      if (!a) { problems.push(`subsystem '${s.id}' ${layer} → article '${s[layer]}' does not exist`); continue; }
      const anchor = s.anchors && s.anchors[layer];
      if (!anchor || !a.body.includes(anchor)) problems.push(`subsystem '${s.id}' ${layer} anchor is gone from '${s[layer]}'`);
    }
    const run = bySlug.get(s.run_it);
    if (run && !/RUNNABLE BY YOU|NEEDS THE OPERATOR.S INFRASTRUCTURE|PARTLY RUNNABLE BY YOU/.test(run.body)) {
      problems.push(`subsystem '${s.id}': '${s.run_it}' carries no RUNNABLE marker`);
    }
  }
  for (const e of manifest.entry_points || []) {
    if (e.excluded) continue;
    const a = bySlug.get(e.article);
    if (!a) { problems.push(`entry point '${e.id}' → article '${e.article}' does not exist`); continue; }
    if (!a.body.includes(e.anchor || e.command)) problems.push(`entry point '${e.id}': '${e.article}' no longer contains '${e.anchor || e.command}'`);
  }
  problems.length
    ? bad("the manifest describes articles that exist, at the sections it names", problems.slice(0, 12).join(" · ") + (problems.length > 12 ? ` · and ${problems.length - 12} more` : ""))
    : ok("the manifest describes articles that exist, at the sections it names", `${(manifest.subsystems || []).length} subsystem(s) × 2 layers and ${(manifest.entry_points || []).filter((e) => !e.excluded).length} documented entry point(s), every anchor still present`);
}

// ─── 1b · one document, one URL ──────────────────────────────────────────────────────────────────
// A slug IS a URL. Two documents sharing one means the static build emits a single route and the
// loser is unreachable — and every count still adds up, which is why this needs its own check rather
// than being implied by the totals. Measured once, on a real bundle: 292 pages, 291 distinct slugs,
// one page silently gone from the site while the coverage gate reported 100%.
{
  const bySlugCount = new Map();
  for (const p of docs.pages) bySlugCount.set(p.slug, (bySlugCount.get(p.slug) || 0) + 1);
  const collisions = [...bySlugCount].filter(([, n]) => n > 1);
  collisions.length
    ? bad("one document, one URL", `${collisions.length} slug collision(s): ${collisions.map(([s]) => s).join(", ")} — the build emits one route per slug, so a page is unreachable while every count still adds up`)
    : ok("one document, one URL", `${docs.pages.length} page(s), ${bySlugCount.size} distinct slug(s); counting entries is not the same as counting the URLs the site publishes`);
}

// ─── 2 · every published page is on a curated route, and no route is a dead link ─────────────────
{
  const routed = new Set();
  const dead = [];
  for (const g of curation.groups || []) for (const s of g.pages || []) {
    routed.add(s);
    if (!pageSlugs.has(s)) dead.push(`${g.id} → ${s}`);
  }
  const declared = new Set((curation.uncategorised || []).map((u) => u.slug));
  const orphans = docs.pages.filter((p) => !routed.has(p.slug) && !declared.has(p.slug)).map((p) => p.slug);
  const problems = [
    ...dead.map((d) => `dead route ${d}`),
    ...orphans.map((o) => `no route to ${o}`),
  ];
  problems.length
    ? bad("every published page is on a curated route", problems.slice(0, 12).join(" · ") + (problems.length > 12 ? ` · and ${problems.length - 12} more` : ""))
    : ok("every published page is on a curated route", `${docs.pages.length} page(s) across ${(curation.groups || []).length} route(s); reachable is not the same property as findable, and this checks the second one`);
}

// ─── 3 · the PUBLISHED figure must still be true ─────────────────────────────────────────────────
// The staleness check, and the reason this file exists. coverage.json is written by the private gate
// and committed; if the artifacts move underneath it, the site renders a number that was true once.
{
  const axis = (id) => (coverage.axes || []).find((a) => a.id === id);
  const now = {
    subsystems: (manifest.subsystems || []).length,
    entry_points: (manifest.entry_points || []).length,
    document_types: (manifest.document_types || []).length,
    pages: docs.pages.length,
  };
  const problems = [];
  for (const [id, total] of Object.entries(now)) {
    const a = axis(id);
    if (!a) { problems.push(`the published table has no '${id}' axis`); continue; }
    if (a.total !== total) problems.push(`'${id}': the site publishes ${a.total}, the artifacts now say ${total}`);
    if (a.total - a.covered - a.excluded !== 0) problems.push(`'${id}': the published figure itself carries a gap of ${a.total - a.covered - a.excluded}`);
  }
  const pubExcluded = (axis("entry_points") || {}).excluded;
  const realExcluded = (manifest.entry_points || []).filter((e) => e.excluded).length;
  if (pubExcluded !== undefined && pubExcluded !== realExcluded) {
    problems.push(`entry-point exclusions: the site publishes ${pubExcluded}, the manifest now has ${realExcluded}`);
  }
  if (coverage.ok === false) problems.push("the published coverage record itself says ok:false — it was emitted from a failing run");

  problems.length
    ? bad("the published coverage figure still holds", problems.join(" · ") + " — regenerate with: node safety/verify_coverage.cjs --emit")
    : ok("the published coverage figure still holds", `4 axes agree with the committed artifacts; a figure that was true once and is rendered in the present tense is the failure this checks for`);
}

// ─── 4 · the ratchet's published state must match the committed floor ────────────────────────────
{
  const problems = [];
  const rows = (coverage.ratchet && coverage.ratchet.rows) || [];
  if (!rows.length) problems.push("the published record carries no ratchet bounds at all");
  const breached = rows.filter((r) => !r.ok);
  if (breached.length) problems.push(`${breached.length} published bound(s) are already breached: ${breached.map((r) => r.label).join(", ")}`);

  // Independent recomputation of the bounds this repository can see without the private estate.
  const F = baseline.floors || {};
  const C = baseline.ceilings || {};
  const check = (label, now, bound, kind) => {
    if (bound === undefined) return;
    if (kind === "min" ? now < bound : now > bound) problems.push(`${label}: ${now} vs ${kind === "min" ? "floor" : "ceiling"} ${bound}`);
  };
  check("articles", articles.length, F.articles, "min");
  check("citations", articles.reduce((n, a) => n + (a.cites || []).length, 0), F.citations, "min");
  check("quotes", articles.reduce((n, a) => n + (a.quotes || []).length, 0), F.quotes, "min");
  check("curated routes", (curation.groups || []).length, F.curation_groups, "min");
  check("pages total", docs.pages.length, F.pages_total, "min");
  check("entry points documented", (manifest.entry_points || []).filter((e) => !e.excluded).length, F.entry_points_covered, "min");
  check("entry points excluded", (manifest.entry_points || []).filter((e) => e.excluded).length, C.entry_points_excluded, "max");
  for (const [corpus, floor] of Object.entries(F.corpora_pages || {})) {
    check(`pages · ${corpus}`, docs.pages.filter((p) => p.corpus === corpus).length, floor, "min");
  }
  const frac = (baseline.tolerance && baseline.tolerance.article_chars_fraction) || 0.75;
  for (const [slug, floor] of Object.entries(F.article_chars || {})) {
    const a = bySlug.get(slug);
    if (!a) { problems.push(`article '${slug}' is gone; the baseline recorded it`); continue; }
    check(`substance · ${slug}`, a.body.replace(/\s+/g, "").length, Math.floor(floor * frac), "min");
  }

  problems.length
    ? bad("the ratchet holds against the committed floor", problems.slice(0, 12).join(" · "))
    : ok("the ratchet holds against the committed floor", `${rows.length} published bound(s), and the ones checkable from this repository alone recomputed independently rather than trusted`);
}

// ─── 4b · every script this project tells you to run must exist ─────────────────────────────────
// A GATE THAT CANNOT BE RUN IS NOT A GATE, AND THIS PROJECT SHIPPED ONE. package.json's composite
// `gate` script referenced generators/verify_generated.cjs from the repository's FIRST COMMIT
// (8c8c5e5). That file has never existed in any commit. So `npm run gate` ran all four real gates,
// printed PASS for every one of them, and then died on a missing module — green-looking output and a
// non-zero exit, which is the worst combination available: it rewards anyone who reads the output
// and punishes only the person who checks the exit code.
//
// It survived a full session of active work on those very gates because they were always invoked
// individually. This check is the cheap, permanent version of noticing.
{
  // Resolve against the REAL repository, never the overridable root. This check is about the
  // project's own scripts, not about the artifact set under test — and --prove runs this file
  // against a temp directory holding only artifacts. Using REPO here made the control fail with
  // "safety/verify_publish_safe.cjs does not exist", which is true of the temp copy and false of
  // the repository. The control caught it; without a control it would have shipped as 10/10.
  const SELF_ROOT = path.resolve(__dirname, "..");
  const pkg = JSON.parse(fs.readFileSync(path.join(SELF_ROOT, "package.json"), "utf8"));
  const problems = [];
  let checked = 0;
  for (const [name, cmd] of Object.entries(pkg.scripts || {})) {
    for (const m of String(cmd).matchAll(/node\s+([\w./-]+\.(?:cjs|mjs|js))/g)) {
      checked++;
      if (!fs.existsSync(path.join(SELF_ROOT, m[1]))) problems.push(`script '${name}' runs ${m[1]}, which does not exist`);
    }
  }
  problems.length
    ? bad("every script this project tells you to run exists", problems.join(" · "))
    : ok("every script this project tells you to run exists", `${checked} node invocation(s) across ${Object.keys(pkg.scripts || {}).length} script(s); a gate that dies on a missing module still prints PASS for everything before it`);
}

// ─── 5 · the navigation must lead to the pages the manifest promises ─────────────────────────────
{
  const layout = fs.readFileSync(path.join(REPO, "app", "layout.tsx"), "utf8");
  const block = /const\s+NAV\s*=\s*\[([\s\S]*?)\];/.exec(layout);
  const nav = new Set(block ? [...block[1].matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]) : []);
  const problems = [];
  if (!nav.size) problems.push("no navigation could be read out of app/layout.tsx");
  for (const t of manifest.document_types || []) {
    if (t.excluded) continue;
    if (!nav.has(t.reachable_from)) problems.push(`document type '${t.id}' declares '${t.reachable_from}', which the site's navigation does not contain`);
  }
  problems.length
    ? bad("the navigation leads to what the manifest promises", problems.join(" · "))
    : ok("the navigation leads to what the manifest promises", `${nav.size} nav link(s); reachability is read out of the component that RENDERS the nav, never from a copy of it that could drift`);
}

// ─── report ──────────────────────────────────────────────────────────────────────────────────────
for (const r of results) console.log(`${r.pass ? "  ok" : "FAIL"}  ${r.name} - ${r.detail}`);
const failed = results.filter((r) => !r.pass).length;
console.log(`\nPUBLIC CONSISTENCY: ${failed ? "FAIL" : "PASS"} - ${results.length - failed}/${results.length} checks`);
console.log("  THIS IS THE SUBSET THAT RUNS ANYWHERE. It cannot discover entry points, so it cannot");
console.log("  see a new server nobody documented, and it cannot hold the floors against the world.");
console.log("  Those need the private repositories and safety/verify_coverage.cjs --prove. A pass here");
console.log("  is not a pass there, and reading it as one would be the mistake this paragraph exists for.");
process.exit(failed ? 1 : 0);
