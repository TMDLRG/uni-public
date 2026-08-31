#!/usr/bin/env node
/**
 * build_rooms.cjs — the walk-in rooms, byte-verified against their source repositories.
 *
 * Same contract as build_labs.cjs, across TWO source repositories: every served room file and
 * every served asset must be byte-identical to its named path at the pinned commit of its source
 * repo (git show — the commit's bytes, never the working tree's). A mismatch or a missing file
 * FAILS THE BUILD. The copies are never edited; fixes land in the source repo and the pin
 * advances.
 *
 * WHY THIS EXISTS AS ITS OWN GENERATOR rather than a footnote on /labs: on 2026-08-30 the
 * University shipped with the classroom — the operator's ruled quality floor — listed under
 * "built, not yet hosted" while seven smaller labs went live. The room the whole design is held
 * to was a footnote on its own site. This generator exists so the rooms are first-class served
 * surfaces with the same hash chain as everything else.
 *
 *   Run:  node generators/build_rooms.cjs
 */
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const REGISTRY = path.join(__dirname, "rooms.json");
const ROOTS_FILE = path.join(__dirname, "roots.local.json");
const OUT = path.join(ROOT, "content", "generated", "rooms.json");

const sha256 = (b) => crypto.createHash("sha256").update(b).digest("hex");
const absent = (why) => ({ not_established: true, why });

function gitShow(dir, commit, p) {
  try {
    return execFileSync("git", ["show", `${commit}:${p}`], { cwd: dir, stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 * 1024 * 1024 });
  } catch {
    return null;
  }
}

function main() {
  const reg = JSON.parse(fs.readFileSync(REGISTRY, "utf8"));
  const roots = fs.existsSync(ROOTS_FILE) ? (JSON.parse(fs.readFileSync(ROOTS_FILE, "utf8")).roots || {}) : {};

  const failures = [];
  const verify = (sourceKey, srcPath, servedFile) => {
    const src = reg.sources[sourceKey];
    const dir = roots[src.root_key];
    const abs = path.join(ROOT, servedFile);
    if (!fs.existsSync(abs)) { failures.push(`${servedFile}: served copy DOES NOT EXIST`); return absent("served copy missing"); }
    const served = fs.readFileSync(abs);
    const rec = { served_sha256: sha256(served), bytes: served.length };
    if (!dir || !fs.existsSync(path.join(dir, ".git"))) {
      failures.push(`${servedFile}: source clone '${src.root_key}' unavailable — byte-identity CANNOT be established here`);
      rec.verified = absent("source repository not available on this machine");
      return rec;
    }
    const blob = gitShow(dir, src.pinned_commit, srcPath);
    if (blob === null) { failures.push(`${servedFile}: git show ${src.pinned_commit.slice(0, 12)}:${srcPath} failed`); rec.verified = absent("pinned source bytes unreadable"); return rec; }
    const srcSha = sha256(blob);
    if (srcSha !== rec.served_sha256) {
      failures.push(`${servedFile}: SERVED BYTES DIFFER FROM PINNED SOURCE — served ${rec.served_sha256.slice(0, 16)}…, source ${srcSha.slice(0, 16)}…`);
      rec.verified = { match: false, source_sha256: srcSha };
    } else {
      rec.verified = { match: true };
    }
    return rec;
  };

  const rooms = reg.rooms.map((r) => {
    const src = reg.sources[r.source];
    return {
      ...r,
      ...verify(r.source, r.source_path, r.file),
      source_repo: src.public_repo,
      source_url: `https://github.com/TMDLRG/${src.public_repo}/blob/${src.mirror_commit}/${r.source_path}`,
      mirror_commit_short: src.mirror_commit.slice(0, 12),
    };
  });

  let assetCount = 0;
  const asset_sets = reg.asset_sets.map((s) => {
    const src = reg.sources[s.source];
    const dir = roots[src.root_key];
    let names = s.files;
    if (!names) {
      // The set is ENUMERATED from the pinned commit, not from what happens to sit in public/ —
      // a copy that exists with no source, or a source with no copy, both fail by name.
      try {
        names = execFileSync("git", ["ls-tree", "--name-only", src.pinned_commit, s.source_prefix], { cwd: dir, encoding: "utf8" })
          .trim().split("\n").filter(Boolean).map((p) => path.posix.basename(p));
      } catch {
        failures.push(`${s.served_prefix}: could not enumerate ${s.source_prefix} at the pinned commit`);
        names = [];
      }
      const onDisk = fs.existsSync(path.join(ROOT, s.dir)) ? fs.readdirSync(path.join(ROOT, s.dir)) : [];
      for (const extra of onDisk.filter((n) => !names.includes(n))) failures.push(`${s.dir}/${extra}: served asset has NO SOURCE at the pinned commit`);
    }
    const files = names.map((n) => ({ file: n, ...verify(s.source, s.source_prefix + n, `${s.dir}/${n}`) }));
    assetCount += files.length;
    return { ...s, count: files.length, files };
  });

  const out = {
    schema_version: 1,
    schema: "uni.public.rooms/1.0.0",
    generated_by: "generators/build_rooms.cjs",
    read_at: new Date().toISOString(),
    note: reg.note,
    sources: reg.sources,
    counts: { rooms: rooms.length, assets: assetCount },
    rooms,
    asset_sets,
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");

  console.log(`rooms: ${rooms.length} rooms + ${assetCount} assets verified -> ${path.relative(ROOT, OUT)}`);
  for (const r of rooms) console.log(`  ${r.verified && r.verified.match ? "verified" : "UNVERIFIED"}  ${String(r.served_at).padEnd(12)} ${String(r.bytes || 0).padStart(8)} bytes  <- ${r.source_path}`);
  if (failures.length) {
    console.error(`\nFAIL — ${failures.length} room file(s) failed byte verification:`);
    for (const f of failures) console.error(`  ${f}`);
    console.error("The copy is never edited; fixes land in the source repository and the pin advances.");
    process.exit(1);
  }
}

main();
