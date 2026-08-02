// build_curation.cjs — routes through the wiki, by intent rather than by alphabet.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// THE DEFECT THIS FIXES
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// The wiki published 304 correct documents and the largest corpus was 85 of them in a single flat
// alphabetical list. Every page was REACHABLE. None of it was FINDABLE. Those are different
// properties and only the first one had ever been checked.
//
// A reader arriving with a question — "how do I run this", "what does it claim", "where is the
// evidence it failed" — had no route. An index is not a guide; it is the raw material a guide is made
// from.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// WHY RULES, AND WHY THEY FAIL CLOSED
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// Grouping could be derived from filename patterns. The danger with derived grouping is not that it
// guesses — it is that it guesses SILENTLY, dropping whatever it fails to match into nothing, which
// reproduces the original defect one level down.
//
// So the rules below are ordered and first-match-wins, and A PAGE THAT MATCHES NO RULE MAKES THIS
// GENERATOR FAIL by name. There is no default bucket. Adding a document to the estate therefore
// forces a decision about where a reader should meet it, which is the decision that was never being
// made.
//
// Pages that genuinely belong in no group are declared UNCATEGORISED with a reason, and that reason
// is published. Covered + declared-uncategorised = all of them.
//
//   node generators/build_curation.cjs
"use strict";

const fs = require("fs");
const path = require("path");

const REPO = path.resolve(__dirname, "..");
const OUT = path.join(REPO, "content", "curation.json");
const docs = JSON.parse(fs.readFileSync(path.join(REPO, "content", "generated", "docs.json"), "utf8"));

// ─── the groups: a title a reader would recognise, and the question each one answers ─────────────
const GROUPS = [
  { id: "start", title: "Start here", intent: "What this is, what it claims, and how to check the claims yourself." },
  { id: "install-run", title: "Installing and running it", intent: "Getting the system onto a machine and making it go." },
  { id: "method", title: "The method and its discipline", intent: "How the estate decides something is true, and how it invites you to prove it wrong." },
  { id: "colony", title: "The colony and its world", intent: "What an agent is, what the world is made of, and how the two meet." },
  { id: "specs", title: "Typed specs — organs, world and runtime", intent: "The formal model of each organ and of the world it lives in, written before the code." },
  { id: "broadcast", title: "Broadcast, studio and run of show", intent: "Turning a running colony into a live public programme." },
  { id: "operator", title: "The operator plane", intent: "The surfaces a human uses to see the system and act on it." },
  { id: "architecture", title: "Architecture and decisions", intent: "The architecture of record and every decision that shaped it, with its reasoning intact." },
  { id: "flagellum", title: "The flagellar-motor laboratory", intent: "The one part measured against a real organism somebody else observed." },
  { id: "workbench", title: "The math workbench", intent: "The browser instrument that runs the committed model libraries." },
  { id: "reports", title: "Reports, audits and validation", intent: "What happened when the system was examined by something other than its own tests." },
  { id: "lab-team", title: "The adversarial review personas", intent: "Six named reviewers whose job is to attack the work from a fixed angle each." },
  { id: "encyclopedia-method", title: "Encyclopedia — method and ledgers", intent: "The method as a book: what is claimed, what is observed, and the two ledgers that keep them apart." },
  { id: "encyclopedia-nature", title: "Encyclopedia — the Natura wing", intent: "Nature as the authority: ratios, rhythms, scaling laws and the one loop." },
  { id: "encyclopedia-stack", title: "Encyclopedia — the stack, L0 to L12", intent: "Layer by layer, from genome to metacognition, with the frontier parked rather than claimed." },
  { id: "cookbook-kitchen", title: "Cookbook — kitchen rules", intent: "How to work: the rules, the pantry, and the consultation record." },
  { id: "cookbook-stack", title: "Cookbook — recipes for the stack", intent: "Recipes for each layer, in the order they have to be built." },
  { id: "cookbook-nature", title: "Cookbook — recipes from nature", intent: "Twelve recipes taken from real systems, from rocks to humans." },
  { id: "plans", title: "Plans, status and handover", intent: "Where the work was going, where it got to, and what the next person needed to know." },
  { id: "evidence-receipts", title: "Receipts — the dated record", intent: "Proof that a gate ran on a given day, including the days it failed." },
  { id: "evidence-prereg", title: "Pre-registrations and RED verdicts", intent: "Predictions committed BEFORE the observation, and what came back." },
  { id: "evidence-handoffs", title: "Handoffs and resume states", intent: "What one session told the next, written when the context was still fresh." },
  // ── the 2026-08-02 expansion ──────────────────────────────────────────────────────────────────
  { id: "pack-and-reader", title: "The GPT pack and the offline reader", intent: "How the corpus is distributed and read: the custom GPT, the offline reader, the note-taker, and the deploy bundle that is staged and not deployed." },
  { id: "builder", title: "The builder briefs", intent: "The paste-ready briefs that instantiate the agents and the visual builder — how a reader reproduces the team rather than reading about it." },
  { id: "haif-program", title: "Hierarchical active inference — the programme", intent: "The gap audit that says the active-inference machinery is essentially absent from the science pipeline, the gates, and the ledgers that keep the negatives." },
  { id: "haif-prereg", title: "Hierarchical AIF — predictions committed first", intent: "Pre-registered predictions, each grading its own prospectivity, including the ones that grade themselves NOT_SATISFIED." },
  { id: "haif-results", title: "Hierarchical AIF — results and adversarial verification", intent: "The corrected full-N cell reports, three independent verification tracks, and the incident record including a burned holdout channel." },
  { id: "science-lab", title: "The science lab — proofs, limits and sources", intent: "LaTeX proofs with their equations preserved exactly, what the lab does NOT establish, and every number's live source." },
  { id: "films", title: "The films", intent: "Scripts, narration and dossiers for the films — including a toolchain document stating that one film cannot be rebuilt from its own source today." },
];

// ─── ordered rules, first match wins. No default bucket, deliberately. ───────────────────────────
const RULES = [
  // ── the flat 85: the corpus this whole exercise exists for ────────────────────────────────────
  [/^minecraft\/(public-readme|agent-instant-status|evidence|architecture-overview)$/, "start"],
  [/^minecraft\/(falsification|lab-protocol|phenomenology|working-logic|motor-red-test|gates|gates-public-gate-log|public-reproducibility-bundle)$/, "method"],
  [/^minecraft\/(reproducibility|runbooks-)/, "install-run"],
  [/^minecraft\/(specs-|world-spec-|runtime-|metabolism-ground-model-brief)/, "specs"],
  [/^minecraft\/(reports-|observability-|security-|production-readiness-checklist|release-readiness)/, "reports"],
  [/^minecraft\/lab-team-/, "lab-team"],
  [/^minecraft\/(runbook-studio|runbook-live-stream|studio-|broadcast-|uni-production-platform)/, "broadcast"],
  [/^minecraft\/(operator-run-sheet|hud|gaia|door-lifecycle|ui-overlooker)/, "operator"],
  [/^minecraft\/(language|producer-language-uplift|uni-sight-plan|harvest-fix-plan)/, "colony"],
  [/^minecraft\/(limitations|control-plane-limitations)$/, "method"],   // the two limitations docs, newly published
  [/^minecraft\//, "plans"],   // resumes, deepening plans, migrations, agent prompts, status

  // ── the evidence corpus ───────────────────────────────────────────────────────────────────────
  [/^evidence\/handoffs-/, "evidence-handoffs"],
  [/^evidence\/receipts-(red-)?preregistration|^evidence\/receipts-.*-(red|preregistration)/, "evidence-prereg"],
  [/^evidence\//, "evidence-receipts"],

  // ── the two books ─────────────────────────────────────────────────────────────────────────────
  [/^encyclopedia\/wing-natura/, "encyclopedia-nature"],
  [/^encyclopedia\/wing-s-/, "encyclopedia-stack"],
  [/^encyclopedia\//, "encyclopedia-method"],
  [/^cookbook\/recipes-natura-/, "cookbook-nature"],
  [/^cookbook\/(recipes-l|continuity-substrate)/, "cookbook-stack"],
  [/^cookbook\//, "cookbook-kitchen"],

  // ── the rest ──────────────────────────────────────────────────────────────────────────────────
  [/^control-plane\//, "architecture"],
  [/^flagellum\/(audit-|ooda-review)/, "reports"],
  [/^flagellum\/(math-workbench)/, "workbench"],
  [/^flagellum\//, "flagellum"],
  [/^workbench\//, "workbench"],

  // ── the 2026-08-02 expansion. Distinct corpus prefixes, so these append safely; the readme→start
  //    and sub-prefix rules must precede their own catch-all (first match wins). ──────────────────
  [/^workbench-repo\//, "workbench"],
  [/^gpt-pack\//, "pack-and-reader"],
  [/^cookbook-repo\/readme$/, "start"],
  [/^cookbook-repo\//, "pack-and-reader"],
  [/^builder\//, "builder"],
  [/^colony-builder\//, "builder"],
  [/^hierarchical-aif\/protocols-/, "haif-prereg"],
  [/^hierarchical-aif\/reports-/, "haif-results"],
  [/^hierarchical-aif\//, "haif-program"],
  [/^audits\//, "reports"],
  [/^flagellum-repo\/readme$/, "start"],
  [/^flagellum-repo\/(claude|tests-red-readme)$/, "method"],
  [/^flagellum-repo\//, "reports"],
  [/^science-lab\//, "science-lab"],
  [/^films\//, "films"],
  [/^broadcast\/docs-receipts-/, "evidence-receipts"],   // dated deployment receipts, not platform docs
  [/^broadcast\//, "broadcast"],
  [/^estate\/(readme|assumptions|changelog)$/, "start"],
  [/^estate\/ops-/, "plans"],
  [/^estate\//, "operator"],
];

// Pages that belong in no route, each with a published reason. Kept as a mechanism even when empty:
// its absence would mean the only way to handle an awkward page is to invent a group for it.
const UNCATEGORISED = [];

const byGroup = new Map(GROUPS.map((g) => [g.id, []]));
const declared = new Set(UNCATEGORISED.map((u) => u.slug));
const unmatched = [];

for (const p of docs.pages) {
  if (declared.has(p.slug)) continue;
  const rule = RULES.find(([re]) => re.test(p.slug));
  if (!rule) { unmatched.push(p.slug); continue; }
  byGroup.get(rule[1]).push(p.slug);
}

if (unmatched.length) {
  console.error(`\nCURATION NOT WRITTEN — ${unmatched.length} page(s) match no rule and no declared exclusion:\n`);
  for (const s of unmatched) console.error("  " + s);
  console.error("\nThere is deliberately no default bucket. Decide where a reader should meet each of these,");
  console.error("or declare it uncategorised with a reason. A page nobody routed is a page nobody will find.");
  process.exit(1);
}

const empty = GROUPS.filter((g) => !byGroup.get(g.id).length);
if (empty.length) {
  console.error(`\nCURATION NOT WRITTEN — ${empty.length} group(s) are empty: ${empty.map((g) => g.id).join(", ")}`);
  console.error("An empty heading promises a route that leads nowhere.");
  process.exit(1);
}

const out = {
  note: [
    "GENERATED by generators/build_curation.cjs. Do not edit by hand.",
    "",
    "Every published page appears in exactly one route, or is declared uncategorised with a reason.",
    "The generator has no default bucket and FAILS on a page that matches no rule, so a document",
    "cannot join the estate and quietly land nowhere — which is how 85 pages came to share one",
    "alphabetical list with no route through it.",
  ],
  schema_version: 1,
  generated_by: "generators/build_curation.cjs",
  groups: GROUPS.map((g) => ({ ...g, pages: byGroup.get(g.id) })),
  uncategorised: UNCATEGORISED,
};

fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + "\n", "utf8");
console.log(`curation written: ${docs.pages.length} page(s) into ${GROUPS.length} route(s), ${UNCATEGORISED.length} declared uncategorised`);
for (const g of GROUPS) console.log(`  ${g.id.padEnd(22)} ${String(byGroup.get(g.id).length).padStart(4)}`);
