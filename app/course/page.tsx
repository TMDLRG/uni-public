import Link from "next/link";
import course from "../../content/generated/course.json";

export const metadata = {
  title: "The course",
  description:
    "The University's full open syllabus: every chapter and session of the active-inference curriculum, read at build time out of the two data modules the running Workbench serves it from.",
};

/**
 * THE COURSE — the University's full open syllabus.
 *
 * RULES THIS PAGE OBEYS:
 *
 * 1. NO COUNT ON THIS PAGE IS TYPED. Chapters, sessions, minutes — every figure renders from
 *    content/generated/course.json, which the generator parses out of the two Elixir data modules
 *    the running Workbench serves its curriculum from, at a pinned commit. The build fails if the
 *    parse disagrees with the modules' own declared arithmetic, so this page cannot silently
 *    publish a shortened course. A typed number is a claim with a half-life; the estate's
 *    governing banner once carried six wrong numbers at once, and one was false in 176 seconds.
 *
 * 2. WHAT CANNOT RUN HERE SAYS SO, AND SAYS WHY. The Workbench's deep surfaces are a
 *    Phoenix/LiveView application; a static export cannot embed a live BEAM process, and this page
 *    does not imitate one. It quotes the real launch commands verbatim from the repo's own
 *    RUN_LOCAL.md instead — quoted, never paraphrased, because a paraphrased command is an
 *    invented one.
 *
 * 3. THE BOOK IS NOT HERE. The curriculum is built around a published textbook that is not
 *    redistributed and never will be. Saying that plainly, near the top, is the difference
 *    between a syllabus and a scanned copy.
 */

type Session = { chapter: number; slug: string; title: string; minutes: number; ordinal: number };
type Chapter = {
  num: number;
  slug: string;
  title: string;
  part: string;
  hero: string;
  sessions: Session[];
};

const d = course as unknown as {
  read_at: string;
  note: string[];
  source: {
    repo: string;
    public_url: string;
    sessions_path: string;
    chapters_path: string;
    commit: string;
    commit_short: string;
  };
  paths: { kid: string; real: string; equation: string; derivation: string };
  counts: { chapters: number; sessions: number; total_minutes: number };
  chapters: Chapter[];
};

const blob = (path: string) => `${d.source.public_url}/blob/${d.source.commit}/${path}`;
const repoAtCommit = `${d.source.public_url}/tree/${d.source.commit}`;
const chapterMinutes = (c: Chapter) => c.sessions.reduce((n, s) => n + s.minutes, 0);
const preface = d.chapters.find((c) => c.part === "preface");

const PATHS: { key: "kid" | "real" | "equation" | "derivation"; label: string }[] = [
  { key: "kid", label: "kid" },
  { key: "real", label: "real" },
  { key: "equation", label: "equation" },
  { key: "derivation", label: "derivation" },
];

export default function Course() {
  const hours = Math.floor(d.counts.total_minutes / 60);
  const rem = d.counts.total_minutes % 60;

  return (
    <>
      <h1>The course</h1>
      <p className="lede">
        A complete, free, open-source active-inference curriculum: {d.counts.chapters} chapters,{" "}
        {d.counts.sessions} sessions, {d.counts.total_minutes} minutes of guided work end to end.
        Every session is written four times over, so a ten-year-old and a mathematician walk the
        same corridor.
      </p>

      <div className="note">
        <b>Read this first.</b> This syllabus is not typed onto this page. It is parsed at build
        time out of the two Elixir data modules the running Workbench serves its curriculum from —{" "}
        <code>{d.source.sessions_path}</code> and <code>{d.source.chapters_path}</code>, read at
        commit <code>{d.source.commit_short}</code> — and the build fails if the parse disagrees
        with the modules&rsquo; own declared totals, so a shortened course cannot ship quietly.
        What this page cannot claim: that a Workbench is running anywhere right now (this is a
        static export, not a probe), or that the minute figures measure anyone&rsquo;s reading —
        they are the course&rsquo;s own declared session lengths. The curriculum is built around
        the textbook <i>Active Inference</i> (Parr, Pezzulo &amp; Friston, 2022, MIT Press). The
        book is not redistributed here; the course pairs its own sessions, labs, quizzes and
        narration with the reader&rsquo;s own copy.
      </div>

      <div className="grid">
        <div className="stat">
          <div className="n">{d.counts.chapters}</div>
          <div className="l">chapters, the preface included</div>
        </div>
        <div className="stat">
          <div className="n">{d.counts.sessions}</div>
          <div className="l">sessions, each in four registers</div>
        </div>
        <div className="stat">
          <div className="n">{d.counts.total_minutes}</div>
          <div className="l">
            declared minutes — {hours} h {rem} min end to end
          </div>
        </div>
      </div>
      <div className="cite">
        {d.source.repo} @ {d.source.commit_short} —{" "}
        <a href={blob(d.source.chapters_path)} rel="noreferrer">
          chapters.ex
        </a>{" "}
        ·{" "}
        <a href={blob(d.source.sessions_path)} rel="noreferrer">
          sessions.ex
        </a>{" "}
        — the repository is fully public, and both links open the exact files, at the pinned
        commit, that these counts were parsed from.{" "}
        <span className="dim">(read at {d.read_at})</span>
      </div>

      <h2>Four ways through every session</h2>
      <p>
        Every session exists in four registers. Pick one, switch at any moment — the corridor is
        the same corridor, only the voice changes. This is how one syllabus serves a child and a
        mathematician without lying to either.
      </p>
      <dl className="measured">
        {PATHS.map((p) => (
          <div key={p.key}>
            <dt>{p.label}</dt>
            <dd>{d.paths[p.key]}</dd>
          </div>
        ))}
      </dl>

      <h2>The syllabus</h2>
      {preface && (
        <p className="dim">
          Chapter {preface.num} is the preface — it is part of the {d.counts.chapters}-chapter
          count above, not extra to it.
        </p>
      )}
      {d.chapters.map((c) => (
        <section className="card" key={c.slug}>
          <h3>
            {c.num}. {c.title}
          </h3>
          <p className="dim">
            <span className="pill">{c.part}</span> · {c.sessions.length}{" "}
            {c.sessions.length === 1 ? "session" : "sessions"} · {chapterMinutes(c)} min
            {c.part === "preface" ? " · this chapter is the preface" : ""}
          </p>
          <p>{c.hero}</p>
          <ul>
            {c.sessions.map((s) => (
              <li key={s.slug}>
                {s.title} <span className="dim">— {s.minutes} min</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h2>Run the whole Workbench yourself</h2>
      <p>
        The deep surfaces of this course — the visual model builder at <code>/builder</code>, the
        glass inspection views, the tutor — are a Phoenix/LiveView application. A static site
        cannot embed a live BEAM process, and this one does not pretend to; those surfaces are run
        locally instead. One command, no account:
      </p>
      <figure className="quote">
        <pre>{`# from repo root
./scripts/start_suite.sh      # macOS / Linux / Git-Bash
./scripts/start_suite.ps1     # Windows PowerShell`}</pre>
        <figcaption>
          <b>quoted verbatim</b> from{" "}
          <a href={blob("RUN_LOCAL.md")} rel="noreferrer">
            RUN_LOCAL.md
          </a>{" "}
          in {d.source.repo} @ {d.source.commit_short} — not paraphrased, because a paraphrased
          command is an invented one
        </figcaption>
      </figure>
      <p>And to stop it:</p>
      <figure className="quote">
        <pre>{`./scripts/stop_suite.sh
./scripts/stop_suite.ps1`}</pre>
        <figcaption>
          <b>quoted verbatim</b> from the same{" "}
          <a href={blob("RUN_LOCAL.md")} rel="noreferrer">
            RUN_LOCAL.md
          </a>{" "}
          @ {d.source.commit_short}
        </figcaption>
      </figure>
      <p>
        Said plainly rather than discovered later: the launcher boots more than the Workbench. It
        also starts the optional local services behind the narrator and the tutor&rsquo;s help
        drawer, and none of them is required — the same RUN_LOCAL.md documents, service by
        service, how the app degrades when each is absent. First-run setup (dependencies, content
        sync) lives in that file too, and is deliberately not re-typed here, where it would rot.
      </p>
      <p>
        The source is fully public at the pinned commit this whole page was parsed from:{" "}
        <a href={repoAtCommit} rel="noreferrer">
          {d.source.repo} @ {d.source.commit_short}
        </a>
        .
      </p>
      <p>
        And some of the course needs no BEAM at all: the learning labs are standalone simulations
        that run in the browser, and those run <Link href="/labs/">right here</Link>. (Seven of
        them, by RUN_LOCAL.md&rsquo;s own count at {d.source.commit_short} — that figure is quoted
        from the source, not measured by this page.)
      </p>

      <p className="dim">
        This course is one door of the estate. <Link href="/hall/">The hallway</Link> lists the
        rest, each with the state it is honestly in and the commit its numbers were read from.
      </p>
    </>
  );
}
