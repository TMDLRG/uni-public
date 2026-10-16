import Link from "next/link";
import labs from "../../content/generated/labs.json";
import course from "../../content/generated/course.json";

export const metadata = {
  title: "Find your way in",
  description:
    "One page that threads the whole estate by who you are and how far you want to go — a picture, a lab you can run, the gate that checks it, the course, the cookbook, the source. Pick the lane that fits you today.",
};

/**
 * THE PATHS SURFACE — the estate already holds every piece (a video, eight CBT labs, a course,
 * a cookbook, a wiki); they just don't thread together. This page is the thread: one lane per
 * AUDIENCE, each lane an ORDERED walk through the five doors — Picture it → Try it →
 * Check it → Go deeper → See it in UNI — pointing only at routes that already exist.
 *
 * WHAT THIS PAGE MAY AND MAY NOT CLAIM.
 *  - It links; it does not re-describe. The CBT module titles + hrefs and the course's session
 *    count are IMPORTED from content/generated/labs.json and course.json, never retyped, so a
 *    renamed module or a resized course cannot leave a stale number here.
 *  - The paths STRUCTURE (who the lanes are, which doors in which order) is editorial, not measured,
 *    so it is an inline const. The estate GENERATES WHAT IT MEASURES; a curated door order is not a
 *    measurement, so it gets no content/generated/paths.json and no generator.
 *  - The honesty fence rides every lane: what the labs and course model is a developmental
 *    SIMULATION, roughly two of eleven-plus rungs, never a person, never aware, never alive, and
 *    this page asserts only what the pages it links already prove. Stated once at the top and again
 *    on the AION door; every door lands on a page that already carries its own evidence and limits.
 *  - A static export cannot verify an external host, so the AION guided-video door is NOT a checked
 *    link: by default it opens the on-site video-first lane; the real AION URL is an open question.
 *  - Single <h1>; lane headings are <h2>; door labels are <b> inside links, not headings. Only
 *    existing CSS classes are used, so no colour pair is added and the contrast gate is untouched.
 *    Nothing is sent anywhere — pure links, no onClick, no beacon.
 *
 * LABELS/NAV: this page's <h1> ("Find your way in"), the five-door labels, and the audience-lane
 * labels are PROPOSED and parameterized in the maps below for one-edit reconciliation with the
 * shared nav manifest + the /start persona vocabulary. The /paths NAV entry and the apex mount are
 * the nav/flow session's to land; this file deliberately touches no nav.
 */

// ── DOOR VOCABULARY (labels TBD via nav manifest — kept in ONE map for reconciliation) ──
type DoorKey = "picture" | "try" | "check" | "deeper" | "source";
const DOOR_LABEL: Record<DoorKey, string> = {
  picture: "Picture it",
  try: "Try it",
  check: "Check it",
  deeper: "Go deeper",
  source: "See it in UNI",
};
const LADDER: { rung: string; door: DoorKey }[] = [
  { rung: "Curious", door: "picture" },
  { rung: "Learner", door: "try" },
  { rung: "Practitioner", door: "check" },
  { rung: "Researcher · build", door: "deeper" },
  { rung: "Researcher · source", door: "source" },
];

// ── CROSS-SURFACE DESTINATIONS (declared, not probed) ──
// Cookbook canonical reader = apex /cookbook (owner ruling 2026-10-15); on-site copies at /wiki/cookbook/*.
const COOKBOOK_HREF = "https://universalnaturalintelligence.com/cookbook";
// AION guided-video track: no verified public destination from a static export. Default = on-site
// video-first lane; `external` stays null until the owner confirms a public, live AION URL.
const AION_TRACK: { href: string; external: string | null } = { href: "/start/", external: null };

// ── THE CBT PART I TRACK, READ FROM labs.json (never retyped) ──
const CBT_ORDER = [
  "cbt-surprise", "cbt-the-wall", "cbt-belief-position", "cbt-free-energy",
  "cbt-landscape", "cbt-the-floor", "cbt-minimize-f", "cbt-scale-brain",
];
type Vend = { slug: string; title: string; served_at: string; minutes: string };
const vendored = (labs as unknown as { vendored: Vend[] }).vendored;
const cbt = CBT_ORDER.map((s) => vendored.find((v) => v.slug === s)).filter(Boolean) as Vend[];
const firstCbt = cbt[0];
const sessionCount = (course as unknown as { counts: { sessions: number } }).counts.sessions;

// ── THE LANES (editorial structure — inline, not generated) ──
// `plain` renders a bare <a> (apex / vendored-file routes Next does not own). `fenced` adds the
// 'declared destination — not probed' pill. Audience labels are PROPOSED — reconcile with the
// /start persona labels + the nav manifest.
type Door = { key: DoorKey; href: string; label: string; blurb: string; plain?: boolean; fenced?: boolean };
type Lane = { id: string; audience: string; invite: string; doors: Door[] };

const LANES: Lane[] = [
  {
    id: "newcomer",
    audience: "Never seen this before · caring for someone",
    invite: "No background needed, and nothing to decide. Three short doors, in order.",
    doors: [
      { key: "picture", href: "/start/", label: "begin where you are", blurb: "Five short cards, one guess each. It does not track you and sends nothing anywhere." },
      { key: "try", href: firstCbt.served_at, label: firstCbt.title, blurb: "One lab, in your browser. Build a number from a hunch — nothing is timed or scored.", plain: true },
      { key: "source", href: "/classroom", label: "step inside the room", blurb: "The laboratory's own classroom, served whole. Look around; nothing asks anything of you.", plain: true },
    ],
  },
  {
    id: "student",
    audience: "Student · educator",
    invite: "From a first picture to the full syllabus the labs teach inside.",
    doors: [
      { key: "picture", href: "/start/", label: "begin where you are", blurb: "The on-ramp, in a register you choose — ten-year-old to mathematician." },
      { key: "try", href: "/labs/", label: `the ${cbt.length} CBT modules — Part I`, blurb: "Run the computer-based course end to end in your browser, plus the Bayes and POMDP labs." },
      { key: "deeper", href: "/course/", label: `the course — ${sessionCount} sessions`, blurb: "The open syllabus the labs sit inside. CBT Part I closes where the course's Part II (action) opens." },
      { key: "check", href: "/coverage/", label: "see it measured", blurb: "Every claim on the estate is gated. The proof that nothing is unaccounted for — including what failed." },
      { key: "source", href: "/wiki/", label: "read the source", blurb: "The estate's own documents, searchable; the cookbook's recipes live here too." },
    ],
  },
  {
    id: "builder",
    audience: "Engineer · builder",
    invite: "Run it first, read the gates, then open the source.",
    doors: [
      { key: "try", href: "/labs/", label: "run the labs", blurb: "Every lab byte-verified against a pinned public commit — no account, no server, CPU only." },
      { key: "deeper", href: "/course/", label: "the course + the whiteboard", blurb: "The syllabus, four registers deep; the generative model drawn matrix by matrix is at /model." },
      { key: "check", href: "/gates/", label: "the gates", blurb: "The build's own gates, with the verdict the runner actually returned — the ones that failed included." },
      { key: "source", href: "/wiki/", label: "source, MCP, build, live", blurb: "The documents as written. The MCP surface, the build register and the live fronts are one hop on." },
    ],
  },
  {
    id: "skeptic",
    audience: "Skeptic · journalist",
    invite: "Start where a project usually hides things: what is wrong.",
    doors: [
      { key: "check", href: "/wrong/", label: "what is wrong", blurb: "The falsification wall: every contradicted claim and negative result, front of house." },
      { key: "check", href: "/coverage/", label: "what is measured", blurb: "Coverage and gates: every claim accounted for, each number carrying the commit it was read from." },
      { key: "try", href: firstCbt.served_at, label: `run the math yourself — ${firstCbt.title}`, blurb: "Derive it by hand in the browser. No account, nothing sent anywhere.", plain: true },
      { key: "deeper", href: "/course/", label: "the full course", blurb: "The complete open syllabus, built around a published textbook that is not redistributed and says so." },
      { key: "source", href: "/estate/", label: "the whole estate", blurb: "What is here, what is not, and the honest state of each piece. The source documents are at /wiki." },
    ],
  },
  {
    id: "aion",
    audience: "Video-first · reading is not the way in today",
    invite: "Watch first, read later. A narrated track, then one visual lab.",
    doors: [
      { key: "picture", href: AION_TRACK.external ?? AION_TRACK.href, label: "the guided video track", blurb: "A narrated way in. Live status of the AION track is not verified from this static page; this door opens the on-site video-first lane until a public URL is confirmed. The guided pages are English only today.", plain: true, fenced: true },
      { key: "try", href: firstCbt.served_at, label: firstCbt.title, blurb: "A lab built on pictures and one number, not prose.", plain: true },
      { key: "source", href: "/classroom", label: "step inside the room", blurb: "The laboratory's own classroom, served whole — click the boards and benches.", plain: true },
    ],
  },
];

function DoorLink({ d }: { d: Door }) {
  const inner = (
    <>
      <b>{DOOR_LABEL[d.key]} · {d.label}</b>
      <span className="dim">{d.blurb}</span>
      {d.fenced ? (
        <span className="pill warn" style={{ marginTop: 10, display: "inline-block" }}>declared destination — not probed</span>
      ) : null}
    </>
  );
  return d.plain || d.fenced
    ? <a className="door" href={d.href} rel="noreferrer">{inner}</a>
    : <Link className="door" href={d.href}>{inner}</Link>;
}

export default function Paths() {
  return (
    <>
      <p className="eyebrow">Paths</p>
      <h1>Find your way in</h1>
      <p className="lede">
        Everything here is already built — a picture to start from, eight labs you can run, a full
        course, a cookbook, the source documents. This page is the thread between them. Pick the lane
        that fits you today; each one is an ordered walk, and you can leave at any door.
      </p>

      <div className="note">
        <b>Read this first.</b> What the labs and course model is a developmental <b>simulation</b> —
        about two of eleven-plus rungs on a long ladder. Nothing here is a person, is aware, or is
        alive, and this page asserts only what the pages it links already prove. Every door below
        lands on a page that carries its own evidence and its own limits. It does not track you and
        sends nothing anywhere.
      </div>

      <h2>The five doors</h2>
      <p>
        Every lane is built from the same five doors, in the same order — from a first picture to
        the source. The order is also a ladder: how far along you want to be today.
      </p>
      <dl className="measured">
        {LADDER.map((l) => (
          <div key={l.door}>
            <dt>{l.rung}</dt>
            <dd>{DOOR_LABEL[l.door]}</dd>
          </div>
        ))}
      </dl>

      {LANES.map((lane) => (
        <section key={lane.id}>
          <h2>{lane.audience}</h2>
          <p className="dim">{lane.invite}</p>
          <ol style={{ paddingLeft: 24, listStyle: "decimal" }}>
            {lane.doors.map((d, i) => (
              <li key={lane.id + i} style={{ margin: "12px 0" }}>
                <DoorLink d={d} />
              </li>
            ))}
          </ol>
        </section>
      ))}

      <p className="dim">
        This is one way to read the estate, not the only one. The full measured record is at{" "}
        <Link href="/overview/">the overview</Link>, and every project has a door in{" "}
        <Link href="/hall/">the hallway</Link>. The cookbook's canonical reader is{" "}
        <a href={COOKBOOK_HREF} rel="noreferrer">the apex cookbook</a>.
      </p>
    </>
  );
}
