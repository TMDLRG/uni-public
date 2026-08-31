import Link from "next/link";
import labs from "../../content/generated/labs.json";

export const metadata = {
  title: "The labs",
  description:
    "Interactive mathematics laboratories: the ones served from this site byte-verified against a pinned public commit, the ones live on the campus, and the ones built but not yet hosted anywhere.",
};

/**
 * THE LABS INDEX — three kinds of entry, drawn differently on purpose.
 *
 * 1. A LAB SERVED HERE IS TIED TO ITS SOURCE BY BYTES, NOT BY ASSERTION. Every copy under /play/ is
 *    hashed on every build and compared against the same file at a pinned commit of the public
 *    Workbench repository. A mismatch fails the build rather than shipping. The cite line under
 *    each card prints the hash so a reader can rerun the comparison themselves.
 *
 * 2. A LINK TO ANOTHER HOST IS A DECLARED DESTINATION, NOT A PROBE. This is a static export; it
 *    cannot honestly claim what is answering right now, so it does not. The disclaimer is printed
 *    per lab, from the same generated file as the URL.
 *
 * 3. WHAT IS BUILT BUT HOSTED NOWHERE IS LISTED, NOT DROPPED. A shortened list is how an inventory
 *    starts lying. Each unhosted lab states what is missing and what would change it.
 *
 * Every count on this page renders from content/generated/labs.json. None is typed.
 */

type Vendored = {
  slug: string;
  title: string;
  one_line: string;
  math: string;
  minutes: string;
  served_at: string;
  source: { repo: string; url: string; path: string; commit: string; commit_short: string };
  served_sha256: string;
  bytes: number;
  verified: { match: boolean; method: string };
};

type External = {
  id: string;
  title: string;
  live_url: string;
  source_note: string;
  one_line: string;
  math: string;
  liveness: string;
};

type NotHosted = {
  id: string;
  title: string;
  state: string;
  why: string;
  what_would_change_this: string;
};

const d = labs as unknown as {
  read_at: string;
  note: string[];
  workbench: {
    branch: string;
    pinned_commit: string;
    public_repo: string;
    source_dir: string;
    measured: { head_commit: string; commits_since_pin: number };
  };
  counts: { vendored: number; external: number; not_hosted: number };
  vendored: Vendored[];
  external: External[];
  not_hosted: NotHosted[];
};

const workbenchDirUrl = `https://github.com/TMDLRG/${d.workbench.public_repo}/tree/${d.workbench.pinned_commit}/${d.workbench.source_dir}`;

function LabCard({ lab }: { lab: Vendored }) {
  return (
    <article className="project-door">
      <header>
        <h3>
          <a href={lab.served_at}>{lab.title}</a>
        </h3>
      </header>

      <p>{lab.one_line}</p>

      <dl className="measured">
        <div>
          <dt>The math</dt>
          <dd>{lab.math}</dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>{lab.minutes} minutes</dd>
        </div>
      </dl>

      <p>
        <a href={lab.served_at}>
          <b>Open the lab</b>
        </a>{" "}
        <span className="dim">— a single HTML file, served from this site, runs in your browser.</span>
      </p>

      <div className="cite">
        {lab.verified.match ? (
          <>
            byte-verified against <code>{lab.source.path}</code> @ {lab.source.commit_short} — sha256{" "}
            <code>{lab.served_sha256.slice(0, 16)}</code> —{" "}
            <a href={lab.source.url} rel="noreferrer">
              source
            </a>
          </>
        ) : (
          <span className="unresolved">
            the byte check against <code>{lab.source.path}</code> @ {lab.source.commit_short} did NOT
            match at the last read. This state is supposed to fail the build; if you are reading it,
            the served copy and the pinned source have diverged and the served copy should not be
            trusted as the pinned code.
          </span>
        )}
      </div>
    </article>
  );
}

export default function Labs() {
  const pinIsHead = d.workbench.measured.head_commit === d.workbench.pinned_commit;

  return (
    <>
      <h1>The labs</h1>
      <p className="lede">
        Real mathematics you can run: Bayes&rsquo; theorem, variational free energy, predictive
        coding and the POMDP machinery behind every UNI agent — each one an interactive laboratory,
        not a slideshow.
      </p>

      <div className="note">
        <b>Read this first.</b> Three kinds of entry are listed here and they are drawn differently
        on purpose. <b>Run them here</b> are labs served from this site, byte-verified on every
        build against a pinned commit of the public Workbench repository. <b>Live on the campus</b>{" "}
        are labs on another host: the links are declared destinations, never probed, and this page
        does not claim they answer right now. <b>Built, not yet hosted</b> are labs that exist and
        are served from nowhere — they are listed with what is missing rather than dropped. The labs
        are MIT-licensed and come from the public Workbench repository. Every lab served here runs
        entirely in your browser: no account, no server, no analytics, CPU only.
      </div>

      <p className="dim">
        {d.counts.vendored} served from this site · {d.counts.external} live on the campus ·{" "}
        {d.counts.not_hosted} built but hosted nowhere · read at {d.read_at}
      </p>

      <p>
        These labs are the practical half of a curriculum: <Link href="/course/">the course</Link>{" "}
        is the syllabus they teach inside, and <Link href="/hall/">the hallway</Link> places them
        among the rest of the estate.
      </p>

      <section>
        <h2>Run them here</h2>
        <p>
          These {d.counts.vendored} labs are copies of files from the public{" "}
          <a href={workbenchDirUrl} rel="noreferrer">
            Workbench repository
          </a>
          , pinned at commit <code>{d.workbench.pinned_commit.slice(0, 12)}</code>. On every build
          of this site, each served copy is hashed and compared byte-for-byte against the same file
          at that pinned commit; a mismatch fails the build rather than shipping. That check is
          what ties the lab you run to the real code — the cite line under each card carries the
          hash so you can rerun the comparison yourself.{" "}
          <span className="dim">
            (At the last read, the public repository&rsquo;s head{" "}
            {pinIsHead
              ? "was the pinned commit itself"
              : `had moved ${d.workbench.measured.commits_since_pin} commit(s) past the pin`}
            .)
          </span>
        </p>
        <div className="project-doors">
          {d.vendored.map((lab) => (
            <LabCard key={lab.slug} lab={lab} />
          ))}
        </div>
      </section>

      <section>
        <h2>Live on the campus</h2>
        <p>
          These {d.counts.external} labs run on the campus site, not here.{" "}
          <span className="declared-note">
            Every link below is a declared destination, not a probe — this page is a static export
            and cannot honestly claim what is answering right now.
          </span>
        </p>
        <div className="project-doors">
          {d.external.map((x) => (
            <article className="project-door" key={x.id}>
              <header>
                <h3>
                  <a href={x.live_url} rel="noreferrer">
                    {x.title}
                  </a>
                </h3>
              </header>
              <p>{x.one_line}</p>
              <dl className="measured">
                <div>
                  <dt>The math</dt>
                  <dd>{x.math}</dd>
                </div>
              </dl>
              <p className="declared-note">{x.liveness}</p>
              <div className="cite">
                <span className="unresolved">
                  {x.source_note} — no source link is offered, because the repository it lives in is
                  not public.
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Built, not yet hosted</h2>
        <p className="dim">
          These exist and are served from nowhere. They are printed rather than dropped, because a
          quietly shortened list is how an inventory starts lying.
        </p>
        {d.not_hosted.map((n) => (
          <article className="card" key={n.id}>
            <h3>{n.title}</h3>
            <p>
              <span className="pill warn">not hosted</span>{" "}
              <span className="declared-note">state as declared: {n.state}</span>
            </p>
            <p>{n.why}</p>
            <p className="dim">What would change this: {n.what_would_change_this}</p>
          </article>
        ))}
      </section>

      <p className="dim">
        Wondering how this connects to the rest of the estate? <Link href="/hall/">The hallway</Link>{" "}
        has one door per project, and <Link href="/course/">the course</Link> walks these labs in
        teaching order.
      </p>
    </>
  );
}
