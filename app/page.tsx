import rooms from "../content/generated/rooms.json";
import labs from "../content/generated/labs.json";
import course from "../content/generated/course.json";

/**
 * THE ENTRY ROOM. A visitor arrives INSIDE the laboratory, not at a directory of it.
 *
 * The hero below is the classroom itself — the vendored, byte-verified page, embedded whole. Not a
 * screenshot, not a mockup: the same /classroom.html this site serves, with its pixel-measured
 * hotspots live inside the frame. This page's own text stays out of its way: one sentence about
 * what this is, one row of doors, one honest line about what is and is not running here.
 *
 * WHY THIS PAGE EXISTS IN THIS SHAPE. The first University shipped as text pages bolted onto a
 * text site, with the classroom — the operator's ruled quality floor — listed under "built, not
 * yet hosted". His verdict: a firehose without clear purpose, missing most of what was built.
 * This is the corrected front door: the room first, the reading second. The estate overview that
 * used to be this page lives at /overview, intact.
 */

const d = rooms as unknown as {
  rooms: { slug: string; served_at: string; title: string; one_line: string; verified?: { match?: boolean } }[];
  counts: { rooms: number; assets: number };
};
const labCount = (labs as unknown as { counts: { vendored: number } }).counts.vendored;
const sessionCount = (course as unknown as { counts: { sessions: number } }).counts.sessions;

export default function Enter() {
  const classroom = d.rooms.find((r) => r.slug === "classroom");
  const allVerified = d.rooms.every((r) => r.verified && r.verified.match === true);

  return (
    <>
      <h1>Universal Natural Intelligence</h1>
      <p className="lede">
        A working laboratory for a different kind of intelligence — models you can read, mathematics
        you can touch, and instruments built to stop any of it claiming more than it has measured.
        You are standing in it.
      </p>

      <div className="enter-room">
        <iframe
          src={classroom ? "/classroom.html" : "/labs/"}
          title="The classroom — the laboratory's walk-in room. The whiteboard, the specimen bench, the frequency wall and the mind-body wall are clickable inside this frame."
        />
        <p className="dim" style={{ marginTop: 10 }}>
          This frame is the real room — the classroom of the flagellar-motor laboratory, served by
          this site as an exact copy of{" "}
          {classroom ? (
            <>
              <code>docs/classroom.html</code> from its public repository,{" "}
              {allVerified
                ? "byte-verified against the pinned source commit on every build"
                : "whose byte-verification is failing right now, and this sentence is wired to say so"}
              . The boards and benches inside are clickable.{" "}
              <a href="/classroom">Open it full screen</a>.
            </>
          ) : (
            <>unavailable in this build — the labs index below still works.</>
          )}
        </p>
      </div>

      <div className="enter-doors">
        <a className="door" href="/model">
          <b>The whiteboard</b>
          <span>
            Every matrix drawn, every step of the mathematics shown as it happens — the colony&rsquo;s
            generative model on one board, and its organism view beside it.
          </span>
        </a>
        <a className="door" href="/labs/">
          <b>Run a lab</b>
          <span>
            {labCount} laboratories served from this site — Bayes machines, free-energy forges,
            POMDP machines — each byte-verified against its public source commit. No install, no
            account, CPU only.
          </span>
        </a>
        <a className="door" href="/course/">
          <b>Take the course</b>
          <span>
            {sessionCount} sessions, each written four ways — for a ten-year-old, in plain English,
            as the equation, as the derivation — parsed from the curriculum&rsquo;s own source.
          </span>
        </a>
        <a className="door" href="/hall/">
          <b>Walk the hallway</b>
          <span>
            One door per project: what it is, what state it is honestly in, and the commit every
            number was read from.
          </span>
        </a>
        <a className="door" href="/wrong/">
          <b>What is wrong</b>
          <span>
            The falsification wall: every contradicted claim and negative result, front of house. A
            project that only narrates its wins is advertising.
          </span>
        </a>
        <a className="door" href="/contribute/">
          <b>Contribute</b>
          <span>
            Everything here lands by pull request — including the operator&rsquo;s own work. Code,
            lenses, labs, failed reproductions: all welcome.
          </span>
        </a>
      </div>

      <p className="dim">
        What is honest to say about this page: the rooms and labs run entirely in your browser; the
        living engines behind them run on the laboratory&rsquo;s own machines, and nothing here
        pretends otherwise — each room states what is static about itself. The estate&rsquo;s full
        measured record — every count generated from the repository it describes — is at{" "}
        <a href="/overview/">the overview</a>, and the registers live in the row above marked{" "}
        <i>the record</i>.
      </p>
    </>
  );
}
