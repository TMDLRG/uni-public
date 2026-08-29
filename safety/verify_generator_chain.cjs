#!/usr/bin/env node
/**
 * verify_generator_chain.cjs — every generator that WRITES is in `npm run generate`.
 *
 * WHY THIS EXISTS, and it is a defect this repository actually shipped.
 *
 * `generators/build_university.cjs` was written on 2026-08-24, produced
 * `content/generated/university.json`, and was NEVER ADDED TO THE `generate` SCRIPT. So the hallway
 * — the one page whose entire argument is that its numbers are generated from the repositories they
 * describe rather than typed — only updated when somebody happened to run that file by hand. Every
 * other generator refreshed around it on each build while it sat frozen at whatever was last
 * produced manually.
 *
 * That is the exact stale-generated-number failure this estate exists to prevent, and it hid for
 * days. It was not found by review; it was found when a change to the manifest failed to appear on
 * the page, and the doors kept rendering a sentence that had already been corrected.
 *
 * ── THE RULE, AND WHY IT IS SHAPED THIS WAY ─────────────────────────────────────────────────────
 * A file in generators/ that WRITES something must be in the chain. A file that writes nothing is a
 * library and must not be.
 *
 * The discriminator is `fs.writeFileSync`, not the filename, and not `module.exports`. Naming is a
 * convention nobody is obliged to follow, and several producers legitimately export helpers too.
 * What cannot be argued with is whether a file emits an artifact: if it does, something downstream
 * reads that artifact, and if nothing runs it that artifact goes stale in place — which is worse
 * than it being absent, because a stale file still renders.
 *
 * Measured 2026-08-24: 14 files, 13 producers (all in the chain), 1 library — derive_docs.cjs,
 * which writes nothing and is required by ingest_docs.cjs.
 *
 * ── WHAT THIS DOES NOT CHECK ────────────────────────────────────────────────────────────────────
 * That the chain's ORDER is right. build_lenses must run after ingest_docs, build_curation after
 * everything that emits pages, and nothing here proves that. Order is currently enforced only by a
 * build failing loudly when it is wrong — which it does, but a QA phase should not mistake this
 * check for coverage of that.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const REPO = path.resolve(__dirname, "..");
const GEN = path.join(REPO, "generators");

const chain = JSON.parse(fs.readFileSync(path.join(REPO, "package.json"), "utf8")).scripts.generate || "";
const inChain = new Set((chain.match(/generators\/[A-Za-z_0-9]+\.cjs/g) || []).map((s) => s.replace("generators/", "")));

const files = fs.readdirSync(GEN).filter((f) => f.endsWith(".cjs"));
const producers = [];
const libraries = [];
for (const f of files) {
  const src = fs.readFileSync(path.join(GEN, f), "utf8");
  // A verifier is not a producer even if it writes a report; it is invoked by `gate`, not `generate`.
  if (/^verify_/.test(f)) continue;
  (/\bfs\.writeFileSync\s*\(/.test(src) ? producers : libraries).push(f);
}

const orphans = producers.filter((f) => !inChain.has(f));
const strays = [...inChain].filter((f) => libraries.includes(f));

console.log(`  generators/*.cjs      : ${files.length}`);
console.log(`  producers (write)     : ${producers.length}`);
console.log(`  libraries (write not) : ${libraries.length}${libraries.length ? " — " + libraries.join(", ") : ""}`);
console.log(`  in \`generate\`         : ${inChain.size}`);

let bad = 0;
if (orphans.length) {
  bad += orphans.length;
  console.error(`\nFAIL  ${orphans.length} generator(s) WRITE an artifact but are not in \`npm run generate\`:`);
  for (const f of orphans) console.error(`        generators/${f}`);
  console.error(`      Whatever they emit only refreshes when somebody runs them by hand, and a stale\n` +
                `      generated file still renders. That is how the hallway's data froze for days.`);
}
if (strays.length) {
  bad += strays.length;
  console.error(`\nFAIL  ${strays.length} file(s) are in \`generate\` but write nothing:`);
  for (const f of strays) console.error(`        generators/${f}`);
  console.error(`      Either it is a library and does not belong in the chain, or it has stopped\n` +
                `      emitting what it used to and something downstream is reading a stale artifact.`);
}

if (bad) { console.error(`\nGATE: FAIL - generator chain, ${bad} problem(s)\n`); process.exit(1); }
console.log(`\nGATE: PASS - generator chain, ${producers.length}/${producers.length} producer(s) wired, ${libraries.length} library correctly excluded`);
console.log(`  NOT CHECKED: chain ORDER. build_lenses must follow ingest_docs and build_curation must`);
console.log(`  follow everything that emits pages; nothing here proves that.\n`);
