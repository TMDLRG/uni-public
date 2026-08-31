#!/usr/bin/env node
/**
 * build_labs.cjs — the /labs page's data, and the hash chain that makes "runnable" a verified claim.
 *
 * WHAT THIS PRODUCES
 *   content/generated/labs.json — every laboratory the University serves, links to, or admits it has
 *   not hosted, each carrying how that claim was established.
 *
 * THE VENDORING CONTRACT, WHICH IS THE POINT OF THIS FILE
 *   Seven labs are served by this site from public/play/. Serving a copy is how a static export can
 *   host a lab at all — but a copy is a claim ("this is the lab from that repository") and claims
 *   here are checked, not asserted. For every vendored lab this generator:
 *
 *     1. reads the served copy public/play/<slug>.html and hashes it;
 *     2. reads the SOURCE BYTES at the PINNED COMMIT out of the local clone of the public source
 *        repository (git show <commit>:<path> — the commit's bytes, not the working tree's, so a
 *        dirty or drifted clone cannot contaminate the check);
 *     3. FAILS THE BUILD on any mismatch, naming the file and both digests.
 *
 *   The build failing is the feature. An edited copy would be bytes that exist in no repository,
 *   which nobody on earth could verify. The rule stated in generators/labs.json is: fixes land in
 *   the source repo and the pin advances; the copy is never edited.
 *
 * WHAT THIS DOES NOT CLAIM
 *   - It does not claim the external labs are UP. A build-time generator probing a live site would
 *     bake "it answered at build time" into a page that renders for months. The URLs are declared
 *     destinations, labelled as such.
 *   - It does not claim the pinned commit is the LATEST commit. It measures the local clone's HEAD
 *     and records ahead/behind of the pin so the page can say "vendored from a commit N behind the
 *     current head" when that becomes true — visible staleness instead of silent staleness.
 *
 *   Run:  node generators/build_labs.cjs
 */
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const REGISTRY = path.join(__dirname, "labs.json");
const ROOTS_FILE = path.join(__dirname, "roots.local.json");
const OUT = path.join(ROOT, "content", "generated", "labs.json");

const sha256 = (buf) => crypto.createHash("sha256").update(buf).digest("hex");
const absent = (why) => ({ not_established: true, why });

function git(cwd, args, opts = {}) {
  try {
    return execFileSync("git", args, { cwd, encoding: opts.raw ? "buffer" : "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 32 * 1024 * 1024 });
  } catch {
    return null;
  }
}

function main() {
  const reg = JSON.parse(fs.readFileSync(REGISTRY, "utf8"));
  const wb = reg.workbench;

  let roots = {};
  if (fs.existsSync(ROOTS_FILE)) roots = JSON.parse(fs.readFileSync(ROOTS_FILE, "utf8")).roots || {};
  const wbDir = roots[wb.root_key];

  // ── the vendored labs: verify byte-identity against the pinned commit ─────────────────────────
  const failures = [];
  const vendored = [];
  let wbMeasured = absent(`no path mapped for root_key '${wb.root_key}' in generators/roots.local.json — vendored bytes CANNOT be verified on this machine`);

  if (wbDir && fs.existsSync(path.join(wbDir, ".git"))) {
    const head = (git(wbDir, ["rev-parse", "HEAD"]) || "").trim();
    const behindPin = (git(wbDir, ["rev-list", "--count", `${wb.pinned_commit}..HEAD`]) || "").trim();
    wbMeasured = {
      head_commit: head || absent("git could not resolve HEAD"),
      commits_since_pin: behindPin === "" ? absent("pin not an ancestor of HEAD, or git failed") : parseInt(behindPin, 10),
    };
  }

  for (const lab of reg.vendored) {
    const servedPath = path.join(ROOT, "public", "play", `${lab.slug}.html`);
    const entry = {
      slug: lab.slug, title: lab.title, one_line: lab.one_line, math: lab.math, minutes: lab.minutes,
      served_at: `/play/${lab.slug}.html`,
      source: {
        repo: wb.public_repo,
        url: `https://github.com/TMDLRG/${wb.public_repo}/blob/${wb.pinned_commit}/${wb.source_dir}/${lab.source_file}`,
        path: `${wb.source_dir}/${lab.source_file}`,
        commit: wb.pinned_commit,
        commit_short: wb.pinned_commit.slice(0, 12),
      },
    };

    if (!fs.existsSync(servedPath)) {
      failures.push(`${lab.slug}: served copy public/play/${lab.slug}.html DOES NOT EXIST`);
      continue;
    }
    const servedBytes = fs.readFileSync(servedPath);
    entry.served_sha256 = sha256(servedBytes);
    entry.bytes = servedBytes.length;

    if (!wbDir || !fs.existsSync(path.join(wbDir, ".git"))) {
      // Absence of the source clone is stated on the entry — but it also fails the build, because a
      // machine that cannot verify the vendored bytes must not be the machine that publishes them.
      entry.verified = absent("source repository not available on this machine");
      failures.push(`${lab.slug}: source clone unavailable — byte-identity CANNOT be established here`);
      vendored.push(entry);
      continue;
    }

    const srcBytes = git(wbDir, ["show", `${wb.pinned_commit}:${wb.source_dir}/${lab.source_file}`], { raw: true });
    if (srcBytes === null) {
      entry.verified = absent(`git show ${wb.pinned_commit.slice(0, 12)}:${wb.source_dir}/${lab.source_file} failed — commit or path absent from the local clone`);
      failures.push(`${lab.slug}: pinned source bytes unreadable`);
      vendored.push(entry);
      continue;
    }
    const srcSha = sha256(srcBytes);
    if (srcSha !== entry.served_sha256) {
      entry.verified = { match: false, source_sha256: srcSha };
      failures.push(`${lab.slug}: SERVED BYTES DIFFER FROM PINNED SOURCE — served ${entry.served_sha256.slice(0, 16)}…, source ${srcSha.slice(0, 16)}…`);
    } else {
      entry.verified = { match: true, method: "sha256(public/play copy) == sha256(git show <pinned_commit>:<source path>)" };
    }
    vendored.push(entry);
  }

  // ── external + not-hosted entries pass through with their labels intact ───────────────────────
  const external = reg.external.map((e) => ({
    ...e,
    liveness: "NOT PROBED — the URL is a declared destination; a static build cannot honestly claim what answers right now",
  }));

  const out = {
    schema_version: 1,
    schema: "uni.public.labs/1.0.0",
    generated_by: "generators/build_labs.cjs",
    read_at: new Date().toISOString(),
    note: [
      "Vendored labs are served by this site and their bytes are verified against a pinned commit of",
      "the public source repository on every build; a mismatch fails the build rather than shipping.",
      "External labs carry declared URLs, never a liveness claim. Labs that exist but are hosted",
      "nowhere are listed with what is missing — a shortened list is how an inventory starts lying.",
    ],
    workbench: { ...wb, measured: wbMeasured },
    counts: { vendored: vendored.length, external: external.length, not_hosted: reg.not_hosted.length },
    vendored,
    external,
    not_hosted: reg.not_hosted,
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");

  console.log(`labs: ${vendored.length} vendored, ${external.length} external, ${reg.not_hosted.length} not hosted -> ${path.relative(ROOT, OUT)}`);
  for (const v of vendored) {
    const ok = v.verified && v.verified.match === true;
    console.log(`  ${ok ? "verified" : "UNVERIFIED"}  ${v.slug.padEnd(22)} ${String(v.bytes).padStart(7)} bytes  ${String(v.served_sha256 || "").slice(0, 16)}`);
  }
  if (failures.length) {
    console.error(`\nFAIL — ${failures.length} vendored lab(s) failed byte verification:`);
    for (const f of failures) console.error(`  ${f}`);
    console.error("The copy is never edited; fixes land in the source repository and the pin advances.");
    process.exit(1);
  }
}

main();
