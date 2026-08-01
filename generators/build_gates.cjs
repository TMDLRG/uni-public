// build_gates.cjs — the gates page publishes VERDICTS, not just venue.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// WHY THIS EXISTS
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// The gates page used to render one pill per gate saying CI or external. That is WHERE a gate runs.
// A reader sees thirty-two green-ish pills and takes it for a clean bill of health, and it was not
// one: a forensic review on 2026-08-01 measured the source estate's CI at 77 runs, 77 failures, zero
// successes, with five gates failing and the Elixir job dying at compile so the suite never ran.
// Nothing on the page said so, while the site footer promised that failing gates are published.
//
// So this generator runs the REAL runner and records what it actually said, per gate.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// TWO VENUES, TWO ANSWERS, AND THE DIFFERENCE IS THE INTERESTING PART
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// The same command on the same commit does not give the same answer in both places. Measured
// 2026-08-01: the operator's machine reports 27 PASS / 2 FAIL; GitHub Actions reports 24 PASS /
// 5 FAIL. Publishing only the local number would be the proponent marking his own homework;
// publishing only CI's would hide that some gates need resources CI does not have. Both are
// recorded, side by side, and where they disagree the page says so.
//
// CI is the closest thing to an independent runner this estate has — a machine the operator does not
// control, invoking the gates on every push. That makes its verdict worth more evidentially than the
// local one, and it is the one that was not being published.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// THIS IS A DATED MEASUREMENT, NOT A LIVE STATUS
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// A static site cannot know whether a gate passes right now. Every figure here carries the commit it
// was measured at and the time it was taken, and the page renders it in the past tense. The estate's
// governing document was once wrong about a gate tally 176 seconds after writing it, in the present
// tense. The fix then was to generate the number; the fix here is to generate it AND date it.
//
//   node generators/build_gates.cjs
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const REPO = path.resolve(__dirname, "..");
const OUT = path.join(REPO, "content", "generated", "gates.json");
const ROOTS_FILE = path.join(__dirname, "roots.local.json");

if (!fs.existsSync(ROOTS_FILE)) {
  console.error("REFUSING: generators/roots.local.json is absent, so the real runner cannot be invoked.");
  console.error("  Publishing a verdict table without running the gates would be the exact defect this fixes.");
  process.exit(1);
}
const ROOTS = JSON.parse(fs.readFileSync(ROOTS_FILE, "utf8")).roots;
const MC = ROOTS["uni-minecraft"];

const git = (args, cwd = MC) => {
  try { return execFileSync("git", ["-C", cwd, ...args], { encoding: "utf8", maxBuffer: 1 << 24, stdio: ["ignore", "pipe", "pipe"] }).trim(); }
  catch { return null; }
};

// ─── the local run: invoke the real runner in-process and take its own structured results ───────
const { runGates } = require(path.join(MC, "viewer", "gate_runner.cjs"));
const registryPath = path.join(MC, "viewer", "gate_registry.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const entries = registry.gates || registry;

console.error("running the real gate runner (this takes a couple of minutes) …");
const rep = runGates({ repoRoot: MC, registryPath, includeExternal: false });

const byId = new Map(rep.results.map((r) => [r.id, r]));
const gates = entries.map((e) => {
  const r = byId.get(e.id);
  // "external" is not a verdict and is never rendered as one. A gate that is listed and never run is
  // a distinct state from one that ran and passed, and collapsing them is how an unrun check comes
  // to look like a passing check.
  const state = !e.ci ? "NOT_RUN_EXTERNAL"
    : !r || !r.ran ? "NOT_RUN"
    : r.timedOut ? "KILLED"
    : (r.verdict || "UNKNOWN");
  return {
    id: e.id,
    file: e.file,
    ci: !!e.ci,
    gate_row: e.gate_row || null,
    why: e.why || null,
    state,
    exit: r && r.ran ? r.exit : null,
    // The runner's own law: exit === 0 if and only if the printed verdict is PASS.
    law_ok: r && r.ran ? !!r.lawOk : null,
  };
});

const localTally = {};
for (const g of gates) localTally[g.state] = (localTally[g.state] || 0) + 1;

// ─── the CI run: the closest thing to an independent runner, and the one that was not published ──
let ci = { available: false, reason: "the GitHub CLI is not available here, so CI state could not be read" };
try {
  const runs = JSON.parse(execFileSync("gh", ["run", "list", "--limit", "200", "--json", "conclusion,headSha,createdAt,databaseId,workflowName"],
    { cwd: MC, encoding: "utf8", maxBuffer: 1 << 24, stdio: ["ignore", "pipe", "pipe"] }));
  const tally = {};
  for (const r of runs) tally[r.conclusion || "in_progress"] = (tally[r.conclusion || "in_progress"] || 0) + 1;
  const latest = runs[0] || null;
  ci = {
    available: true,
    runs_examined: runs.length,
    tally,
    successes: tally.success || 0,
    latest: latest ? { id: latest.databaseId, conclusion: latest.conclusion, at: latest.createdAt, commit: (latest.headSha || "").slice(0, 12), workflow: latest.workflowName } : null,
  };
  // The per-gate CI verdicts, taken from the runner's own --require-pass line in the failed log.
  if (latest) {
    try {
      const log = execFileSync("gh", ["run", "view", String(latest.databaseId), "--log-failed"],
        { cwd: MC, encoding: "utf8", maxBuffer: 1 << 27, stdio: ["ignore", "pipe", "pipe"] });
      const m = /--require-pass: \d+ gate\(s\) not PASS[^:]*:\s*([^\n\r]+)/.exec(log);
      if (m) ci.not_passing = m[1].split(",").map((s) => s.trim()).filter(Boolean);
      const t = /Verdict tally:\s*([^\n\r.]+)/.exec(log);
      if (t) ci.verdict_tally = t[1].trim();
      const jobs = [...log.matchAll(/^([^\t]+)\t/gm)].map((x) => x[1]);
      ci.failing_jobs = [...new Set(jobs)].slice(0, 8);
    } catch { /* the log may have expired; the run conclusions above still stand */ }
  }
} catch (e) {
  ci = { available: false, reason: "the GitHub CLI could not read run history: " + String(e.message || e).slice(0, 120) };
}

const out = {
  note: [
    "GENERATED by generators/build_gates.cjs. Do not edit by hand.",
    "",
    "A DATED MEASUREMENT, NOT A LIVE STATUS. A static site cannot know whether a gate passes right",
    "now. Every figure carries the commit it was measured at and the time it was taken, and the page",
    "renders it in the past tense.",
    "",
    "Two venues are recorded because they disagree. The operator's machine and GitHub Actions run the",
    "same gates on the same commit and return different tallies -- some gates need resources CI does",
    "not have. Publishing only the local number would be the proponent marking his own homework;",
    "publishing only CI's would hide why some gates fail there. Both, side by side.",
  ],
  schema_version: 1,
  generated_by: "generators/build_gates.cjs",
  measured_at: new Date().toISOString(),
  source: {
    repo: "uni-minecraft",
    commit: git(["rev-parse", "HEAD"]) || "unknown",
    commit_short: (git(["rev-parse", "HEAD"]) || "unknown").slice(0, 12),
    branch: git(["rev-parse", "--abbrev-ref", "HEAD"]) || "unknown",
    clean: (git(["status", "--porcelain"]) || "") === "",
  },
  local: {
    ran: rep.results.filter((r) => r.ran).length,
    law_violations: rep.violations.length,
    registry_complete: !!rep.complete,
    runner_ok: !!rep.ok,
    tally: localTally,
  },
  ci,
  gates,
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + "\n", "utf8");

console.log(`gates written: ${gates.length} registered`);
console.log(`  local  : ${Object.entries(localTally).map(([k, v]) => `${v} ${k}`).join(" · ")}`);
console.log(`  CI     : ${ci.available ? `${ci.runs_examined} runs examined, ${ci.successes} success(es); latest ${ci.latest ? ci.latest.conclusion : "?"}` : ci.reason}`);
if (ci.not_passing) console.log(`  CI not passing: ${ci.not_passing.join(", ")}`);
