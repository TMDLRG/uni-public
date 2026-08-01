// build_coverage_manifest.cjs — the declared universe, assembled from measurement where it can be.
//
// The coverage manifest could have been hand-written. It is not, for the reason everything else on
// this site is generated: a hand-written list of what is covered is a claim about the work, made by
// the person who did the work, checked by nobody.
//
// So the ENTRY-POINT half of the manifest is derived. Every runnable thing in the estate is
// discovered, and an entry point counts as covered when a guide actually contains the command that
// starts it — measured against the built articles, not asserted. Anything that is neither covered nor
// on the exclusion list below makes THIS GENERATOR FAIL, so a gap cannot be resolved by forgetting it.
//
// The SUBSYSTEM and DOCUMENT-TYPE halves are editorial and are written here as literals. There is no
// mechanical definition of a subsystem, and inventing one would be worse than admitting the axis is a
// judgement.
//
//   node generators/build_coverage_manifest.cjs
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const REPO = path.resolve(__dirname, "..");
const OUT = path.join(REPO, "content", "coverage-manifest.json");

// ─────────────────────────────────────────────────────────────────────────────────────────────────
// EXCLUSIONS — every one carries a reason, and every reason was checked before it was written
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// A reason is a claim like any other. The first draft of this file excluded the control-plane ledger
// scripts on the grounds that re-running one would append duplicate rows to an append-only ledger.
// That was checked and it was FALSE — the scripts declare themselves idempotent and skip anything
// already accounted for. They are documented in the maintenance guide instead. An exclusion justified
// by a wrong reason is worse than no exclusion, because it looks decided.
const EXCLUSIONS = [
  {
    match: /powershell:uni-minecraft:hud\/(build_exe|download_nssm|_install_elevated_wrapper)\.ps1$/,
    reason:
      "Part of the native HUD's build-and-package chain: compiling the widget executable, fetching a " +
      "service-wrapper binary, and an elevation shim. These build the artifact rather than run or " +
      "maintain the system, and a reader who wants the HUD installs the built service rather than " +
      "compiling it. Named here so their existence is not hidden.",
  },
  {
    match: /powershell:uni-minecraft:hud\/native\/_(cert_and_sign|sign_widget|sign_and_reinstall|update_service_binaries|urlacl_and_networkservice|stop_service)_elevated\.ps1$/,
    reason:
      "Elevated steps of the native HUD's code-signing and service-registration chain, invoked while " +
      "developing the widget itself. Documenting a code-signing procedure for a certificate the reader " +
      "cannot possess would be a recipe that ends at a wall. The two elevated scripts a reader DOES " +
      "need — the launcher install and the service swap — are covered in the install guide, and the " +
      "two restart drills are covered in the maintenance guide.",
  },
  {
    match: /^npm-script:uni-workbench:/,
    reason:
      "The math workbench is a git WORKTREE of the flagellum repository on a different branch, so its " +
      "package file is the same package file. Measured 2026-08-01: 14 of its 15 scripts are " +
      "byte-identical to the flagellum ones already documented, and the 15th differs only by adding one " +
      "test file to the same test command. Documenting them twice would pad the coverage count without " +
      "telling a reader anything they do not already have. The workbench's own route is covered in the " +
      "run-it guide.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────────────────────────
// SUBSYSTEMS — editorial, layered. Each gets an UNDERSTAND layer and a RUN-IT-YOURSELF layer.
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// The anchors are real headings. The gate checks each one is still present in the article it names,
// so deleting a section is caught even though the article still exists — which is the failure a
// file-exists check would sail straight past.
const SUBSYSTEMS = [
  { id: "colony", label: "The colony", understand: "the-colony", run_it: "run-it",
    anchors: { understand: "## The pipe is the blanket", run_it: "## Run the colony" } },
  { id: "producer", label: "The Producer", understand: "the-producer", run_it: "run-it",
    anchors: { understand: "## What it can do", run_it: "## Run the Producer" } },
  { id: "brain", label: "The active-inference brain", understand: "the-brain", run_it: "run-it",
    anchors: { understand: "## Expected free energy, in two parts", run_it: "## Run the active-inference core" } },
  { id: "control-plane", label: "The scientific control plane", understand: "the-control-plane", run_it: "run-it",
    anchors: { understand: "## One writer", run_it: "## Run the control plane" } },
  { id: "operator-plane", label: "The operator plane", understand: "the-operator-plane", run_it: "run-it",
    anchors: { understand: "## The five surfaces", run_it: "## Run the operator plane" } },
  { id: "broadcast", label: "The broadcast suite", understand: "the-broadcast-suite", run_it: "the-broadcast-suite",
    anchors: { understand: "## The chain to air", run_it: "# RUN IT YOURSELF" } },
  { id: "flagellar-motor", label: "The flagellar-motor laboratory", understand: "the-flagellar-motor", run_it: "run-it",
    anchors: { understand: "## The boundary this laboratory is organised around", run_it: "## Run the flagellar-motor laboratory" } },
  { id: "math-workbench", label: "The math workbench", understand: "the-flagellar-motor", run_it: "run-it",
    anchors: { understand: "## The math workbench", run_it: "## Run the math workbench" } },
];

// ─────────────────────────────────────────────────────────────────────────────────────────────────
// DOCUMENT TYPES — the eight named as required
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// Three of the eight are not authored prose. Specs are the estate's own documents, reachable through
// the wiki; code citations are resolved markers rather than a page. Forcing all eight into the same
// shape would have meant writing an article ABOUT the specs and calling the specs covered.
const DOCUMENT_TYPES = [
  { id: "quick-start", label: "Quick start", articles: ["quick-start"], reachable_from: "/articles/" },
  { id: "install", label: "Install guide", articles: ["install"], reachable_from: "/articles/" },
  { id: "user-guides", label: "User guides", articles: ["run-it", "the-broadcast-suite"], reachable_from: "/articles/" },
  { id: "manuals", label: "Manuals", articles: ["the-operator-plane", "the-broadcast-suite"], reachable_from: "/articles/" },
  { id: "how-to", label: "How-to guides", articles: ["how-to"], reachable_from: "/articles/" },
  { id: "maintenance", label: "Maintenance guides", articles: ["maintenance"], reachable_from: "/articles/" },
  { id: "specs", label: "Specs", curated_group: "specs", min_pages: 8, reachable_from: "/wiki/" },
  { id: "code-citations", label: "Code citations", min_citations: 40, reachable_from: "/articles/" },
];

// ─── derive the entry-point half ─────────────────────────────────────────────────────────────────
const discovered = JSON.parse(
  execFileSync("node", [path.join(REPO, "safety", "verify_coverage.cjs"), "--discover"], { encoding: "utf8", maxBuffer: 1 << 26 })
);
const articles = JSON.parse(fs.readFileSync(path.join(REPO, "content", "generated", "articles.json"), "utf8")).articles;

const entry_points = [];
const unaccounted = [];
for (const d of discovered) {
  const ex = EXCLUSIONS.find((e) => e.match.test(d.id));
  if (ex) { entry_points.push({ id: d.id, command: d.command, excluded: true, reason: ex.reason }); continue; }
  const hit = articles.find((a) => a.body.includes(d.command));
  if (!hit) { unaccounted.push(d); continue; }
  entry_points.push({ id: d.id, command: d.command, article: hit.slug, anchor: d.command });
}

if (unaccounted.length) {
  console.error(`\nCOVERAGE MANIFEST NOT WRITTEN — ${unaccounted.length} runnable entry point(s) are neither documented nor excluded:\n`);
  for (const d of unaccounted) console.error(`  ${d.id}\n      ${d.command}`);
  console.error("\nEither write it into a guide, or add an exclusion with a reason you have checked.");
  console.error("This generator refuses to emit a manifest that is silently short of its own universe.");
  process.exit(1);
}

const manifest = {
  note: [
    "GENERATED by generators/build_coverage_manifest.cjs. Do not edit by hand.",
    "",
    "The entry_points list is DERIVED: every runnable thing in the estate is discovered from source,",
    "and is covered when a guide really contains the command that starts it. The subsystems and",
    "document_types lists are EDITORIAL and are written as literals in the generator, because neither",
    "has a mechanical definition and pretending otherwise would be a stronger claim than the evidence.",
    "",
    "safety/verify_coverage.cjs holds this file to the built articles and the ingested pages, so a",
    "manifest that agrees with itself and not with the site still fails.",
  ],
  schema_version: 1,
  generated_by: "generators/build_coverage_manifest.cjs",
  required_document_types: 8,
  subsystems: SUBSYSTEMS,
  document_types: DOCUMENT_TYPES,
  entry_points,
};

fs.writeFileSync(OUT, JSON.stringify(manifest, null, 1) + "\n", "utf8");
const cov = entry_points.filter((e) => !e.excluded).length;
const exc = entry_points.filter((e) => e.excluded).length;
console.log(`coverage manifest written: ${entry_points.length} entry point(s) — ${cov} documented, ${exc} excluded with a reason`);
console.log(`  ${SUBSYSTEMS.length} subsystems (understand + run-it each), ${DOCUMENT_TYPES.length} document types`);
