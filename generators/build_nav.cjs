#!/usr/bin/env node
/**
 * build_nav.cjs — verify the vendored site chrome is byte-identical to the pinned apex Precision
 * commit, and emit the record the site renders its nav from.
 *
 * THE CONTRACT (identical to generators/build_labs.cjs, applied to the nav):
 *   The unified navigation is authored ONCE in the apex Precision repo (nav/site-nav.json + nav.css +
 *   nav.js). It is vendored here so uni-public renders the SAME menu from the SAME source. On every
 *   build this reads the SOURCE BYTES at the PINNED COMMIT out of the local Precision clone
 *   (git show <commit>:<path> — the commit's bytes, not a dirty tree) and FAILS THE BUILD on any
 *   mismatch. A separately-authored nav in uni-public is how the two halves drift; this makes "same
 *   nav everywhere" a verified claim, not a hope.
 *
 *   Run:  node generators/build_nav.cjs
 */
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");
const { normalized } = require("./render_nav.cjs");

const ROOT = path.resolve(__dirname, "..");
const REGISTRY = path.join(__dirname, "nav.json");
const ROOTS_FILE = path.join(__dirname, "roots.local.json");
const OUT = path.join(ROOT, "content", "generated", "nav.json");

const sha256 = (buf) => crypto.createHash("sha256").update(buf).digest("hex");
const absent = (why) => ({ not_established: true, why });

function git(cwd, args) {
  try {
    return execFileSync("git", args, { cwd, encoding: "buffer", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 32 * 1024 * 1024 });
  } catch {
    return null;
  }
}

function main() {
  const reg = JSON.parse(fs.readFileSync(REGISTRY, "utf8")).precision;
  let roots = {};
  if (fs.existsSync(ROOTS_FILE)) roots = JSON.parse(fs.readFileSync(ROOTS_FILE, "utf8")).roots || {};
  const dir = roots[reg.root_key];

  const failures = [];
  const assets = [];
  for (const a of reg.assets) {
    const localPath = path.join(ROOT, a.vendored);
    const entry = { vendored: a.vendored, source: a.source, what: a.what };
    if (!fs.existsSync(localPath)) {
      failures.push(`${a.vendored}: vendored copy DOES NOT EXIST`);
      assets.push({ ...entry, verified: absent("vendored copy missing") });
      continue;
    }
    const localBytes = fs.readFileSync(localPath);
    entry.sha256 = sha256(localBytes);
    entry.bytes = localBytes.length;
    if (!dir || !fs.existsSync(path.join(dir, ".git"))) {
      entry.verified = absent(`Precision clone not available (root_key '${reg.root_key}') — cannot verify here`);
      failures.push(`${a.vendored}: source clone unavailable — byte-identity CANNOT be established here`);
      assets.push(entry);
      continue;
    }
    const srcBytes = git(dir, ["show", `${reg.pinned_commit}:${a.source}`]);
    if (srcBytes === null) {
      entry.verified = absent(`git show ${reg.pinned_commit.slice(0, 12)}:${a.source} failed — commit or path absent from the local clone`);
      failures.push(`${a.vendored}: pinned source bytes unreadable`);
      assets.push(entry);
      continue;
    }
    if (sha256(srcBytes) !== entry.sha256) {
      entry.verified = { match: false, source_sha256: sha256(srcBytes) };
      failures.push(`${a.vendored}: VENDORED BYTES DIFFER FROM PINNED SOURCE — vendored ${entry.sha256.slice(0, 16)}…, source ${sha256(srcBytes).slice(0, 16)}…`);
    } else {
      entry.verified = { match: true, method: "sha256(vendored) == sha256(git show <pin>:<source>)" };
    }
    assets.push(entry);
  }

  const out = {
    schema_version: 1,
    generated_by: "generators/build_nav.cjs",
    read_at: new Date().toISOString(),
    note: [
      "The site chrome is vendored byte-for-byte from the apex Precision repo and verified against the",
      "pinned commit on every build; a mismatch fails the build. uni-public renders its nav from the",
      "SAME canonical site-nav.json the apex uses — one source, both halves provably identical.",
    ],
    source: { repo: reg.public_repo, pinned_commit: reg.pinned_commit, root_key: reg.root_key },
    assets,
    groups: normalized(),
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");

  console.log(`nav: vendored chrome from ${reg.public_repo} @ ${reg.pinned_commit.slice(0, 12)} -> ${path.relative(ROOT, OUT)}`);
  for (const a of assets) {
    const ok = a.verified && a.verified.match === true;
    console.log(`  ${ok ? "verified" : "UNVERIFIED"}  ${a.vendored.padEnd(34)} ${String(a.bytes || 0).padStart(7)} bytes`);
  }
  console.log(`  nav: ${out.groups.length} groups, ${out.groups.reduce((n, g) => n + g.items.length, 0)} items`);
  if (failures.length) {
    console.error(`\nFAIL — ${failures.length} vendored chrome asset(s) failed byte verification:`);
    for (const f of failures) console.error(`  ${f}`);
    console.error("The copy is never edited; fixes land in the Precision repo and the pin advances.");
    process.exit(1);
  }
}

main();
