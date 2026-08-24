"use strict";
/**
 * local_roots.cjs — resolve a logical root_key to this machine's real path.
 *
 * WHY THIS EXISTS. An absolute path hardcoded in a committed generator publishes the operator's
 * username and filesystem layout to everyone who clones the repo. roots.local.json was created for
 * exactly that reason and is gitignored; its own note records that "the safety gate caught exactly
 * that leak in sources.json before the first commit". The leak reappeared anyway in two generators
 * written later (build_drift.cjs, build_estate.cjs), and the publish-safe gate had been failing on
 * both at HEAD. One shared resolver means there is now a single place to get this right.
 *
 * IT REFUSES, IT DOES NOT DEFAULT. If the key is unmapped this throws with the key name. A resolver
 * that guessed a plausible path would be a fallback asserting something substantive about the
 * machine it is running on — and a fallback string is a claim.
 */
const fs = require("fs");
const path = require("path");

const ROOTS_FILE = path.join(__dirname, "roots.local.json");

function roots() {
  if (!fs.existsSync(ROOTS_FILE)) {
    throw new Error(
      "generators/roots.local.json is absent. It maps logical root keys to this machine's paths and " +
      "is deliberately gitignored. Create it before running the generators."
    );
  }
  return JSON.parse(fs.readFileSync(ROOTS_FILE, "utf8")).roots || {};
}

/** Resolve a root key, or throw naming the key. Never returns a guess. */
function root(key) {
  const r = roots()[key];
  if (!r) {
    throw new Error(
      `no path mapped for root_key '${key}' in generators/roots.local.json — add it there rather ` +
      `than hardcoding an absolute path in a committed file`
    );
  }
  return r;
}

module.exports = { root, roots };
