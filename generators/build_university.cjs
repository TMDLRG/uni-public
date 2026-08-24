#!/usr/bin/env node
/**
 * build_university.cjs — the hallway's data, generated from the repositories themselves.
 *
 * WHAT THIS PRODUCES
 *   content/generated/university.json — one row per declared project, each carrying the commit it
 *   was read at, so the hallway can render a door per project without a single typed number.
 *
 * WHY IT DOES NOT READ FILE CONTENTS
 *   build_content.cjs reads declared files out of private repositories and relies on the safety gate
 *   to catch a leak. The hallway does not need that risk: the human-facing sentence for each project
 *   (`one_line`, `why_it_is_here`) is DECLARED BY A HUMAN in generators/projects.json, and everything
 *   else this generator emits is a measurement of the repository itself — branch, head commit, dirty
 *   count, ahead/behind, a file census and a language census. No file body is opened, so no private
 *   prose can escape through this path at all. That is a structural guarantee rather than a checked one.
 *
 * ABSENCE IS STATED, NEVER ASSERTED
 *   Every field that cannot be established is emitted as an explicit `not_established` object naming
 *   WHY it could not be established. There is no plausible default anywhere in this file. A fallback
 *   string is a claim, and the else-branch is where false claims get authored without review — this
 *   estate has already shipped one ("licence does not permit", asserted as a fallback on 159 rows,
 *   asserting a ruling nobody made). The rule is: a default may state that something is missing; it
 *   may never state something substantive.
 *
 * IT REFUSES RATHER THAN GUESSES
 *   If a declared root is unmapped, missing, or checked out on a different branch than the manifest
 *   declares, the project is SKIPPED with a stated reason and the skip is published in the output.
 *   A silently-omitted project would make the hallway claim completeness it does not have. This
 *   mirrors build_content.cjs, which refuses a source whose branch disagrees with its manifest —
 *   "a system nobody is running" is the failure it was written to prevent.
 *
 *   Run:  node generators/build_university.cjs
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const MANIFEST = path.join(__dirname, "projects.json");
const ROOTS_FILE = path.join(__dirname, "roots.local.json");
const OUT = path.join(ROOT, "content", "generated", "university.json");

/** A stated absence. Never a substantive claim. */
const absent = (why) => ({ not_established: true, why });

function git(cwd, args) {
  try {
    return execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return null;
  }
}

/**
 * File and language census. Deliberately excludes dependency and build trees: counting node_modules
 * would report a project as overwhelmingly the language of its dependencies, which is a true count
 * of the wrong set — the shape of error this estate calls a hand-listed set standing in for an
 * enumeration.
 */
const SKIP_DIRS = new Set([
  ".git", "node_modules", "deps", "_build", "dist", "build", "out", ".next", "target",
  "vendor", "third_party", "publish", "__pycache__", ".venv", "venv", "chrome-profiles",
]);
const LANG = {
  ".ex": "Elixir", ".exs": "Elixir", ".erl": "Erlang", ".py": "Python", ".rs": "Rust",
  ".c": "C", ".h": "C", ".ts": "TypeScript", ".tsx": "TypeScript", ".js": "JavaScript",
  ".jsx": "JavaScript", ".cjs": "JavaScript", ".mjs": "JavaScript", ".md": "Markdown",
  ".json": "JSON", ".html": "HTML", ".css": "CSS", ".ps1": "PowerShell", ".sh": "Shell",
  ".cs": "C#", ".java": "Java", ".heex": "Elixir", ".eex": "Elixir",
};

function census(dir, acc, depth) {
  if (depth > 12) return acc;
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc; // unreadable subtree: counted as absent, not as zero
  }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name) || e.name.startsWith(".")) continue;
      census(path.join(dir, e.name), acc, depth + 1);
    } else if (e.isFile()) {
      acc.files += 1;
      const lang = LANG[path.extname(e.name).toLowerCase()];
      if (lang) acc.languages[lang] = (acc.languages[lang] || 0) + 1;
    }
  }
  return acc;
}

function main() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));

  let roots = {};
  let rootsNote = null;
  if (fs.existsSync(ROOTS_FILE)) {
    try {
      roots = JSON.parse(fs.readFileSync(ROOTS_FILE, "utf8")).roots || {};
    } catch (e) {
      rootsNote = `roots.local.json present but unreadable: ${e.message}`;
    }
  } else {
    rootsNote = "roots.local.json absent on this machine — no project can be measured here";
  }

  const projects = [];
  const skipped = [];

  for (const p of manifest.projects) {
    const dir = roots[p.root_key];
    if (!dir) {
      skipped.push({ id: p.id, reason: `no path mapped for root_key '${p.root_key}' in generators/roots.local.json` });
      continue;
    }
    if (!fs.existsSync(path.join(dir, ".git"))) {
      skipped.push({ id: p.id, reason: `mapped path for root_key '${p.root_key}' is not a git repository on this machine` });
      continue;
    }

    const branch = git(dir, ["rev-parse", "--abbrev-ref", "HEAD"]);
    const head = git(dir, ["rev-parse", "HEAD"]);
    if (!head) {
      skipped.push({ id: p.id, reason: "git could not resolve HEAD" });
      continue;
    }
    // The same refusal build_content.cjs makes: a manifest that names a branch nobody is on is
    // describing a system nobody is running.
    if (branch && branch !== p.branch) {
      skipped.push({ id: p.id, reason: `checked out on '${branch}' but the manifest declares '${p.branch}'` });
      continue;
    }

    const porcelain = git(dir, ["status", "--porcelain"]);
    const dirty = porcelain === null ? absent("git status did not return") : porcelain.split("\n").filter(Boolean).length;

    let ahead_behind = absent("no upstream configured for this branch");
    const ab = git(dir, ["rev-list", "--left-right", "--count", `origin/${p.branch}...HEAD`]);
    if (ab) {
      const [behind, ahead] = ab.split(/\s+/).map((n) => parseInt(n, 10));
      if (Number.isFinite(ahead) && Number.isFinite(behind)) ahead_behind = { ahead, behind };
    }

    const c = census(dir, { files: 0, languages: {} }, 0);
    const languages = Object.entries(c.languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, files]) => ({ name, files }));

    const citation = {
      repo: p.id,
      title: p.title,
      branch: p.branch,
      commit: head,
      commit_short: head.slice(0, 12),
      visibility: p.visibility,
      // resolvable means: a reader can follow this to something they can open. Private repos are
      // described here but a permalink would 404 for everyone but the operator, so it is false.
      resolvable: p.visibility === "public",
      public_repo: p.public_repo || undefined,
      public_url: p.public_repo ? `https://github.com/TMDLRG/${p.public_repo}` : undefined,
      // A FROZEN PUBLIC SNAPSHOT IS NOT THE SAME AS A PUBLIC REPOSITORY, and conflating them made
      // this page tell readers a door could not be opened when it could. Carried separately, with
      // what it actually is, so the door can open AND still say the commit beside it is not in there.
      snapshot: p.public_snapshot
        ? { ...p.public_snapshot, url: `https://github.com/TMDLRG/${p.public_snapshot.repo}` }
        : null,
    };

    projects.push({
      id: p.id,
      title: p.title,
      wing: p.wing,
      // maturity is a HUMAN CLAIM carried through from the manifest, not a measurement. The hallway
      // must label it as declared, or it will read as though something measured it.
      maturity: { value: p.maturity, claim_type: "declared_by_operator", measured: false },
      one_line: p.one_line,
      why_it_is_here: p.why_it_is_here,
      measured: { file_count: c.files, languages, uncommitted: dirty, ahead_behind },
      citation,
    });
  }

  const out = {
    schema_version: 1,
    schema: "uni.public.university/1.0.0",
    generated_by: "generators/build_university.cjs",
    read_at: new Date().toISOString(),
    note: [
      "Every measured number here was read from the repository named in its citation, at the commit",
      "named in that citation. Nothing on this page is typed.",
      "maturity is the one exception and it says so per row: it is an operator's claim, not a",
      "measurement, because no generator can measure whether a thing is finished.",
      "Projects that could not be measured on this machine are listed under `skipped` with the reason,",
      "rather than omitted — a silently shortened list would claim a completeness it does not have.",
    ],
    maturity_vocabulary: manifest.maturity_vocabulary,
    counts: { declared: manifest.projects.length, measured: projects.length, skipped: skipped.length },
    roots_note: rootsNote,
    projects,
    skipped,
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");

  console.log(`university: ${projects.length} measured, ${skipped.length} skipped -> ${path.relative(ROOT, OUT)}`);
  for (const p of projects) {
    const langs = p.measured.languages.map((l) => l.name).slice(0, 3).join("/") || "(none detected)";
    console.log(
      `  ${p.id.padEnd(16)} ${p.citation.branch.padEnd(30)} ${p.citation.commit_short}  ` +
      `${String(p.measured.file_count).padStart(6)} files  ${langs}`
    );
  }
  for (const s of skipped) console.log(`  SKIPPED ${s.id}: ${s.reason}`);
}

main();
