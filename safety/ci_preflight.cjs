#!/usr/bin/env node
/**
 * ci_preflight.cjs — the part of the publish gate a CI runner can honestly execute.
 *
 * WHY THIS EXISTS. Until 2026-08-24 this repository had NO CI AT ALL — `gh api
 * repos/TMDLRG/uni-public/actions/workflows` returned 0 and nothing had ever run. Vercel deploys
 * every push to `main` regardless, so the only thing standing between a push and a public
 * deployment was somebody remembering to run `npm run gate` by hand. That is not a hypothetical
 * gap: on 2026-08-24 the gate was found RED at HEAD while the site was already deployed, carrying
 * an Erlang distribution cookie and a client project key, and nothing had noticed.
 *
 * ── WHY THIS IS NOT SIMPLY `npm run gate` ────────────────────────────────────────────────────────
 * Two of the gate's checks CANNOT run on a runner, and the gate is right to fail rather than skip
 * them. Its own words when the denylist is missing: "This gate does NOT fall back to structural
 * checks only — a safety gate that quietly drops its teeth when its input is missing produces a
 * green tick that means nothing."
 *
 *   1. `the operator's denied-value list is present` — safety/patterns.local.json is gitignored and
 *      holds the operator's client identifiers. It is deliberately not in the repository, so a
 *      runner cannot have it.
 *   2. `the exported site was scanned` — needs `out/`, which needs `npm run build`, which reads the
 *      PRIVATE source repositories. A runner has none of them.
 *
 * So running the gate in CI and calling a red result "expected" would train everyone to ignore it,
 * and running a stripped-down copy would be the green tick that means nothing.
 *
 * ── WHAT THIS DOES INSTEAD ───────────────────────────────────────────────────────────────────────
 * It runs the REAL gate, unmodified, and asserts that the set of failures is EXACTLY the two that
 * cannot run here. A third failure — or either of these two passing when it should not — is red.
 *
 * That means CI genuinely enforces every check that does not need a private input:
 *   - no forbidden path in the working tree OR ANYWHERE IN HISTORY (a committed .env, a .pem, a
 *     session-history dump — deleting a file does not unpublish it)
 *   - no private address, internal hostname, operator path or credential SHAPE in any tracked file
 *   - every [redacted: …] marker corresponds to a real recorded redaction, so a marker cannot be
 *     hand-typed to make a page look cleaned
 *   - a licence is present and package.json agrees
 *   - all 11 mutations, which prove the scanner still bites rather than passing everything
 *
 * AND IT SAYS, EVERY RUN, WHAT IT DID NOT CHECK. A green tick here does NOT mean the site is safe
 * to publish; it means nothing structural regressed. The full gate still has to be run by a human
 * with the private inputs before a deploy is trusted. Printing that on every run is the difference
 * between a pre-flight and a rubber stamp.
 */
"use strict";

const cp = require("child_process");
const fs = require("fs");
const path = require("path");

const REPO = path.resolve(__dirname, "..");

// The two the runner cannot answer. Matched on a distinctive substring of the gate's own check
// name, not on the whole line, so wording changes do not silently turn this into a no-op.
const CANNOT_RUN_HERE = [
  { key: "denied-value list", why: "safety/patterns.local.json is gitignored — the operator's client identifiers are deliberately not in this repository" },
  { key: "exported site was scanned", why: "out/ needs `npm run build`, which reads the private source repositories a runner does not have" },
];

// The generator-chain check needs NO private input, so unlike the two below it can run here in
// full. It is the check that would have caught build_university.cjs sitting outside `generate` for
// days while the page it feeds went stale — exactly the class of defect a runner should catch and
// a human reading a green page never will.
try {
  process.stdout.write(cp.execFileSync("node", [path.join(REPO, "safety", "verify_generator_chain.cjs")],
    { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 }));
} catch (e) {
  process.stdout.write((e.stdout || "") + (e.stderr || ""));
  console.error("PRE-FLIGHT FAIL — the generator chain is incomplete (see above).");
  process.exit(1);
}
let out = "";
try {
  out = cp.execFileSync("node", [path.join(REPO, "safety", "verify_publish_safe.cjs"), "--prove"],
    { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 28 });
} catch (e) {
  // The gate exits non-zero when anything fails, which is expected here. Its output is what matters.
  out = (e.stdout || "") + (e.stderr || "");
}
process.stdout.write(out);

const failures = out.split(/\r?\n/).filter((l) => /^FAIL\b/.test(l.trim()));
const expected = [];
const unexpected = [];
for (const line of failures) {
  const hit = CANNOT_RUN_HERE.find((c) => line.includes(c.key));
  (hit ? expected : unexpected).push(line.trim());
}
const missing = CANNOT_RUN_HERE.filter((c) => !failures.some((l) => l.includes(c.key)));

const bar = "─".repeat(100);
console.log(`\n${bar}\nCI PRE-FLIGHT — this is NOT the publish gate.\n${bar}`);
console.log(`  ran      : every check that needs no private input, plus all mutations`);
console.log(`  NOT run  : ${CANNOT_RUN_HERE.length} check(s) that cannot be answered on a runner —`);
for (const c of CANNOT_RUN_HERE) console.log(`             · ${c.key} — ${c.why}`);
console.log(`
  A GREEN TICK HERE DOES NOT MEAN THE SITE IS SAFE TO PUBLISH. It means nothing structural
  regressed. The two checks above are the ones that caught a live Erlang distribution cookie and a
  client project key on 2026-08-24, and neither can run here. Before trusting a deploy, run
  \`npm run prepublish:check\` on a machine that has the private inputs.
`);

if (missing.length) {
  // A CHECK THAT SHOULD BE UNANSWERABLE HERE ANSWERED. There are two very different reasons, and
  // conflating them makes this either a false alarm on the operator's own machine or a MISSED
  // emergency on a runner. The discriminator is whether the private input is TRACKED:
  //   present and untracked -> not a runner; a machine that legitimately holds it. Not a fault.
  //   present and TRACKED   -> a private input has been committed. That is the emergency.
  const tracked = (name) => {
    try {
      return cp.execFileSync("git", ["-C", REPO, "ls-files", "--error-unmatch", name],
        { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim().length > 0;
    } catch { return false; }
  };
  const LOCAL_INPUTS = ["safety/patterns.local.json", "generators/roots.local.json"];
  const committed = LOCAL_INPUTS.filter(tracked);
  const untracked = LOCAL_INPUTS.filter((f) => fs.existsSync(path.join(REPO, f)) && !tracked(f));

  if (committed.length) {
    console.error("PRE-FLIGHT FAIL — a private input is COMMITTED: " + committed.join(", "));
    console.error("  This is the emergency the gate exists to prevent. Remove it from the index AND from");
    console.error("  history -- deleting a file does not unpublish it -- and rotate anything it named.");
    process.exit(1);
  }
  if (untracked.length) {
    console.log("PRE-FLIGHT NOT APPLICABLE — this machine holds the private inputs, untracked:");
    for (const f of untracked) console.log("  · " + f + " (present, not tracked — correct)");
    console.log("");
    console.log("  So the two checks a runner cannot answer were answered, and that is not a fault.");
    console.log("  This pre-flight is for CI. Here, run `npm run prepublish:check` — the full gate,");
    console.log("  which is strictly stronger than anything this file can do.");
    process.exit(0);
  }
  console.error("PRE-FLIGHT FAIL — check(s) that cannot run here did not fail, and no private input is");
  console.error("  present to explain it. The gate's wording has probably changed, which would make this");
  console.error("  pre-flight match nothing and become a rubber stamp. Needs a human.");
  for (const c of missing) console.error("  · " + c.key);
  process.exit(1);
}
if (unexpected.length) {
  console.error(`PRE-FLIGHT FAIL — ${unexpected.length} real failure(s), beyond the two that cannot run here:`);
  for (const l of unexpected) console.error(`  ${l}`);
  process.exit(1);
}
console.log(`PRE-FLIGHT PASS — ${expected.length} expected-absent check(s), 0 unexpected failure(s).`);
