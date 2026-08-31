#!/usr/bin/env node
/**
 * build_course.cjs — the /course page's syllabus, read out of the curriculum's own source of truth.
 *
 * WHAT THIS PRODUCES
 *   content/generated/course.json — the Workbench curriculum (chapters, sessions, minutes, the four
 *   learning paths), extracted from the two Elixir modules that ARE the curriculum, at the commit
 *   the local clone is on. Nothing on the course page is typed; the syllabus a visitor reads is the
 *   syllabus the running Workbench serves, or the build fails.
 *
 * WHY PARSE SOURCE INSTEAD OF DECLARING A COPY
 *   A hand-copied syllabus is a second source of truth, and second sources of truth are where this
 *   estate's stale numbers have always come from (a banner once carried six wrong numbers at once).
 *   WorkbenchWeb.Book.Sessions and .Chapters are literal data modules — the curriculum is DATA in
 *   the repository — so the honest move is to read it from there and carry the commit.
 *
 * THE PARSE REFUSES RATHER THAN SHORTENS
 *   The sessions module's own moduledoc states its arithmetic: 1 preface + 38 chapter sessions = 39.
 *   If this parser extracts any other number, it FAILS THE BUILD rather than publishing a shortened
 *   syllabus — a quietly shortened list is how an inventory starts lying. The same check binds
 *   chapters (11 including the preface).
 *
 *   Run:  node generators/build_course.cjs
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const ROOTS_FILE = path.join(__dirname, "roots.local.json");
const OUT = path.join(ROOT, "content", "generated", "course.json");

const EXPECTED_SESSIONS = 39; // the module's own declared total; a mismatch is a red build, not a shrug
const EXPECTED_CHAPTERS = 11; // preface + 10 chapters

const BOOK_DIR = "active_inference/apps/workbench_web/lib/workbench_web/book";

function main() {
  const roots = JSON.parse(fs.readFileSync(ROOTS_FILE, "utf8")).roots || {};
  const wbDir = roots["orc-workbench"];
  if (!wbDir || !fs.existsSync(path.join(wbDir, ".git"))) {
    console.error("FAIL — orc-workbench root unavailable; the syllabus cannot be read on this machine and will not be invented.");
    process.exit(1);
  }
  const head = execFileSync("git", ["rev-parse", "HEAD"], { cwd: wbDir, encoding: "utf8" }).trim();

  const sessionsSrc = fs.readFileSync(path.join(wbDir, BOOK_DIR, "sessions.ex"), "utf8");
  const chaptersSrc = fs.readFileSync(path.join(wbDir, BOOK_DIR, "chapters.ex"), "utf8");

  // Chapters: literal %{ num:, slug:, title:, part:, ... hero: } entries, authored in fixed order.
  const chapters = [];
  const chRe = /num:\s*(\d+),\s*\n\s*slug:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)",\s*\n\s*part:\s*:(\w+)[\s\S]*?hero:\s*"([^"]*)"/g;
  for (let m; (m = chRe.exec(chaptersSrc)); ) {
    chapters.push({ num: +m[1], slug: m[2], title: m[3], part: m[4], hero: m[5], sessions: [] });
  }

  // Sessions: chapter/slug/title/minutes/ordinal open every literal entry, in that authored order.
  const sessions = [];
  const seRe = /chapter:\s*(\d+),\s*\n\s*slug:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)",\s*\n\s*minutes:\s*(\d+),\s*\n\s*ordinal:\s*(\d+)/g;
  for (let m; (m = seRe.exec(sessionsSrc)); ) {
    sessions.push({ chapter: +m[1], slug: m[2], title: m[3], minutes: +m[4], ordinal: +m[5] });
  }

  if (sessions.length !== EXPECTED_SESSIONS || chapters.length !== EXPECTED_CHAPTERS) {
    console.error(
      `FAIL — parsed ${sessions.length} sessions (module declares ${EXPECTED_SESSIONS}) and ` +
      `${chapters.length} chapters (expected ${EXPECTED_CHAPTERS}). A partial parse must not publish ` +
      `a partial syllabus; fix the parser or update the expectation WITH the module.`
    );
    process.exit(1);
  }

  const byNum = new Map(chapters.map((c) => [c.num, c]));
  for (const s of sessions) {
    const c = byNum.get(s.chapter);
    if (!c) {
      console.error(`FAIL — session '${s.slug}' names chapter ${s.chapter}, which the chapter catalogue does not contain.`);
      process.exit(1);
    }
    c.sessions.push(s);
  }
  for (const c of chapters) c.sessions.sort((a, b) => a.ordinal - b.ordinal);

  const total_minutes = sessions.reduce((n, s) => n + s.minutes, 0);

  const out = {
    schema_version: 1,
    schema: "uni.public.course/1.0.0",
    generated_by: "generators/build_course.cjs",
    read_at: new Date().toISOString(),
    note: [
      "This syllabus was parsed out of WorkbenchWeb.Book.Sessions and .Chapters — the literal data",
      "modules the running Workbench serves its curriculum from — at the commit below. The parser",
      "fails the build if its counts disagree with the module's own declared arithmetic, so this",
      "page cannot silently publish a shortened course.",
    ],
    source: {
      repo: "TheORCHESTRATEActiveInferenceWorkbench",
      public_url: "https://github.com/TMDLRG/TheORCHESTRATEActiveInferenceWorkbench",
      sessions_path: `${BOOK_DIR}/sessions.ex`,
      chapters_path: `${BOOK_DIR}/chapters.ex`,
      commit: head,
      commit_short: head.slice(0, 12),
    },
    paths: {
      kid: "second person, grade-5 vocabulary, one concrete image",
      real: "plain English, grade-8 vocabulary, one analogy",
      equation: "the math in Unicode, tied to the labelled equation",
      derivation: "formal voice — proof sketch or citation",
    },
    counts: { chapters: chapters.length, sessions: sessions.length, total_minutes },
    chapters,
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
  console.log(`course: ${chapters.length} chapters, ${sessions.length} sessions, ${total_minutes} minutes @ ${head.slice(0, 12)} -> ${path.relative(ROOT, OUT)}`);
}

main();
