import Link from "next/link";
import university from "../../content/generated/university.json";

export const metadata = {
  title: "The hallway",
  description:
    "One door per project in the UNI estate: what it is, what state it is honestly in, what it is written in, and the commit every number here was read from.",
};

/**
 * THE HALLWAY — one door per project.
 *
 * WHY A HALLWAY AND NOT A LIST. The estate's own diagnosis of itself was "a running instrument with
 * thirteen rooms and no corridor": the work exists, and there is no way to walk to it. Seven ports
 * and a bookmark folder is not a place you can be in. This page is the corridor, and every door on
 * it leads somewhere real or says plainly why it does not.
 *
 * THREE RULES THIS PAGE OBEYS, EACH PAID FOR BY A DEFECT SOMEWHERE IN THIS ESTATE:
 *
 * 1. A DECLARED CLAIM IS LABELLED AS DECLARED. `maturity` is a human's judgement — no generator can
 *    measure whether a thing is finished — so it renders with "declared" against it, next to the
 *    measurements which render bare. Drawing a claim and a measurement the same way is the
 *    laundering this whole estate exists to prevent, and it is exactly the mistake that let a gate
 *    verdict and a liveness probe be shown with one symbol.
 *
 * 2. A DOOR THAT DOES NOT OPEN SAYS SO ON ITS FACE. A private project is not hidden and is not
 *    greyed out; it is rendered in full with the reason it cannot be opened. Hiding it would make
 *    the hallway claim a completeness it does not have; a dead link would be worse. This follows
 *    Cite.tsx, which renders unresolvable citations rather than dropping them, for the same reason:
 *    "a citation a reader cannot open is an appeal to authority. Saying so is the difference
 *    between documentation and marketing."
 *
 * 3. WHAT COULD NOT BE MEASURED IS PRINTED, NOT DROPPED. Skipped projects appear at the foot of the
 *    page with the generator's stated reason. A quietly shortened list is how an inventory starts
 *    lying.
 *
 * NOT LIVE. This is a static export. Every figure is the figure read at the commit shown beside it,
 * at build time. It is not a probe of anything running now, and nowhere on this page claims to be.
 */

type Measured = {
  file_count: number;
  languages: { name: string; files: number }[];
  uncommitted: number | { not_established: true; why: string };
  ahead_behind: { ahead: number; behind: number } | { not_established: true; why: string };
};

type Project = {
  id: string;
  title: string;
  wing: string;
  maturity: { value: string; claim_type: string; measured: boolean };
  live?: { url: string; claim_type: string; note?: string } | null;
  one_line: string;
  why_it_is_here: string;
  measured: Measured;
  citation: {
    repo: string; title: string; branch: string; commit_short: string;
    visibility: "public" | "private"; resolvable: boolean;
    public_repo?: string; public_url?: string;
    mirror?: {
      kind: "mirror" | "frozen-snapshot"; repo: string; url: string; measured_on: string;
      updated?: string; tracks_commit?: string; mirror_commit?: string;
      taken?: string; commits?: number; history?: string; note?: string;
    } | null;
  };
};

const data = university as unknown as {
  read_at: string;
  note: string[];
  maturity_vocabulary: Record<string, string>;
  counts: { declared: number; measured: number; skipped: number };
  projects: Project[];
  skipped: { id: string; reason: string }[];
};

const WINGS: { key: string; label: string; blurb: string }[] = [
  { key: "teaching", label: "Teaching", blurb: "Where the ideas are explained and can be practised." },
  { key: "science", label: "Science", blurb: "Where a claim meets a real measured organism." },
  { key: "worlds", label: "Worlds", blurb: "Where agents are given a body and somewhere to live." },
  { key: "instruments", label: "Instruments", blurb: "The tools that stop the rest of it overclaiming." },
];

/**
 * Maturity to the site's existing pill vocabulary. `contradicted` is deliberately `bad` and NOT
 * hidden: a thing that was tried and lost is kept on the wall on purpose. `design-only` is `warn`
 * because a specified-but-unbuilt thing is the single easiest state to mistake for a built one.
 */
function pillFor(m: string): string {
  if (m === "running") return "ok";
  if (m === "contradicted") return "bad";
  if (m === "design-only") return "warn";
  return "";
}

function notEstablished(v: unknown): v is { not_established: true; why: string } {
  return typeof v === "object" && v !== null && (v as { not_established?: boolean }).not_established === true;
}

function Door({ p }: { p: Project }) {
  const c = p.citation;
  const langs = p.measured.languages;
  return (
    <article className="project-door">
      <header>
        <h3>
          {c.resolvable ? <a href={c.public_url} rel="noreferrer">{p.title}</a>
            : c.mirror ? <a href={c.mirror.url} rel="noreferrer">{p.title}</a>
            : p.title}
        </h3>
        <p className="door-state">
          <span className={`pill ${pillFor(p.maturity.value)}`}>{p.maturity.value}</span>
          <span className="declared-note"> declared, not measured</span>
        </p>
      </header>

      <p>{p.one_line}</p>
      <p className="dim">{p.why_it_is_here}</p>

      {p.live && (
        <p>
          Serving at <a href={p.live.url} rel="noreferrer">{p.live.url}</a>{" "}
          <span className="declared-note">
            — a declared destination, not a probe. This static page cannot honestly claim what is
            answering right now.
          </span>
        </p>
      )}

      <dl className="measured">
        <div><dt>Files</dt><dd>{p.measured.file_count.toLocaleString()}</dd></div>
        <div>
          <dt>Written in</dt>
          <dd>{langs.length ? langs.map((l) => `${l.name} (${l.files})`).join(" · ") : "no recognised language files found"}</dd>
        </div>
        <div>
          <dt>Uncommitted</dt>
          <dd>
            {notEstablished(p.measured.uncommitted)
              ? <span className="unresolved">not established — {p.measured.uncommitted.why}</span>
              : `${p.measured.uncommitted} file(s)`}
          </dd>
        </div>
        <div>
          <dt>Vs. its remote</dt>
          <dd>
            {notEstablished(p.measured.ahead_behind)
              ? <span className="unresolved">not established — {p.measured.ahead_behind.why}</span>
              : `${p.measured.ahead_behind.ahead} ahead, ${p.measured.ahead_behind.behind} behind`}
          </dd>
        </div>
      </dl>

      <div className="cite">
        {c.title} @ {c.commit_short} ({c.branch}){" "}
        {c.resolvable
          ? <>— <a href={c.public_url} rel="noreferrer">open the repository</a></>
          : c.mirror && c.mirror.kind === "mirror"
            ? <>
                — the working repository is private. A redacted{" "}
                <a href={c.mirror.url} rel="noreferrer">live mirror</a> of it is public, updated{" "}
                {c.mirror.updated}: it tracks this repository by promotion, one commit per
                promotion, each recording the private commit it came from, and every promotion is
                merged by a person through a pull request. This door opens on the tree promoted from{" "}
                <code>{c.mirror.tracks_commit}</code> — the same commit the figures above were read
                at, so what you open is what this page was built from.{" "}
                <span className="dim">(mirror state measured {c.mirror.measured_on})</span>
              </>
          : c.mirror
            ? <>
                — the working repository is private. A redacted{" "}
                <a href={c.mirror.url} rel="noreferrer">frozen snapshot</a> of it is public: taken{" "}
                {c.mirror.taken}, {c.mirror.commits} commit, {c.mirror.history}.{" "}
                <span className="unresolved">
                  The commit above is the private working commit these figures were read at and is
                  not in that snapshot, so nothing here deep-links into it. Anything you open there
                  is as the tree stood on {c.mirror.taken}, not as it stands now.
                  {c.mirror.note ? ` (${c.mirror.note})` : ""}
                </span>{" "}
                <span className="dim">(snapshot state measured {c.mirror.measured_on})</span>
              </>
            : <span className="unresolved">— this repository is not public and has no published snapshot, so this door cannot be opened. It is listed because leaving it out would make this hallway claim a completeness it does not have.</span>}
      </div>
    </article>
  );
}

export default function Hall() {
  const byWing = WINGS.map((w) => ({ ...w, projects: data.projects.filter((p) => p.wing === w.key) }))
    .filter((w) => w.projects.length > 0);
  const unplaced = data.projects.filter((p) => !WINGS.some((w) => w.key === p.wing));

  return (
    <>
      <h1>The hallway</h1>
      <p className="lede">
        One door per project. What it is, what state it is honestly in, what it is written in, and
        the commit every number beside it was read from.
      </p>

      <div className="note">
        <b>Read this first.</b> The estate once described itself as{" "}
        <i>a running instrument with thirteen rooms and no corridor</i>. This is the corridor. Two
        kinds of statement sit on every door and they are drawn differently on purpose: the{" "}
        <b>measurements</b> — files, languages, uncommitted work, distance from the remote — were
        read out of the repository at the commit shown. The <b>maturity</b> word is a person&rsquo;s
        judgement, because no program can measure whether a thing is finished, and it is labelled{" "}
        <i>declared</i> wherever it appears. Nothing on this page is live; it is a static export.
      </div>

      <p className="dim">
        {data.counts.measured} of {data.counts.declared} declared projects measured
        {data.counts.skipped > 0 ? `, ${data.counts.skipped} skipped (listed at the foot of this page)` : ""} · read at{" "}
        {data.read_at}
      </p>

      {byWing.map((w) => (
        <section key={w.key}>
          <h2>{w.label}</h2>
          <p className="dim">{w.blurb}</p>
          <div className="project-doors">
            {w.projects.map((p) => <Door key={p.id} p={p} />)}
          </div>
        </section>
      ))}

      {unplaced.length > 0 && (
        <section>
          <h2>Not yet placed in a wing</h2>
          <div className="project-doors">{unplaced.map((p) => <Door key={p.id} p={p} />)}</div>
        </section>
      )}

      <section>
        <h2>What the maturity words mean</h2>
        <dl className="measured">
          {Object.entries(data.maturity_vocabulary).map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </section>

      {data.skipped.length > 0 && (
        <section>
          <h2>Declared but not measured</h2>
          <p className="dim">
            These are named in the manifest and could not be read on the machine that built this
            page. They are printed rather than dropped, because a quietly shortened list is how an
            inventory starts lying.
          </p>
          <ul>
            {data.skipped.map((s) => (
              <li key={s.id}><b>{s.id}</b> — {s.reason}</li>
            ))}
          </ul>
        </section>
      )}

      <p className="dim">
        Looking for the numbers behind the estate rather than the doors?{" "}
        <Link href="/estate/">The estate audit</Link> carries the repository census, the services that
        answered, and the places where declaration and reality disagree.
      </p>
    </>
  );
}
