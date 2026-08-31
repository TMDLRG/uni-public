import { estate, block } from "./lib/estate";
import { Cite } from "./components/Cite";
import docs from "../content/generated/docs.json";
import labs from "../content/generated/labs.json";
import course from "../content/generated/course.json";

type GateBlock = { total: number; ci_true: number; ci_false: number; citation: any };
type PlanBlock = { steps: number; stages: number; tally: Record<string, number>; citation: any };
type ModBlock = { count: number; lines: number; citation: any };

/**
 * CITATION RESOLVABILITY IS COUNTED, NEVER TYPED. The paragraph below used to assert that none of
 * the source repositories could be opened. That was true when written and stopped being true on
 * 2026-08-02, when three redacted snapshots were published and the citation machinery began
 * resolving against them -- and the sentence stayed on the FRONT PAGE for 22 days, contradicting
 * this site's own manifest. A typed number is a claim with a half-life; this one is derived.
 */
function citationTally() {
  const pages = (docs as { pages: { citation?: { resolvable?: boolean; repo?: string } }[] }).pages;
  const total = pages.length;
  const open = pages.filter((p) => p.citation?.resolvable).length;
  const closedRepos = [...new Set(pages.filter((p) => !p.citation?.resolvable).map((p) => p.citation?.repo).filter(Boolean))];
  return { total, open, closed: total - open, closedRepos };
}

export default function Home() {
  const cites = citationTally();
  const gates = block<GateBlock>("uni-minecraft", "gate-registry");
  const plan = block<PlanBlock>("uni-minecraft", "plan");
  const mods = block<ModBlock>("uni-minecraft", "module-map");
  const chapters = estate.sources
    .find((s) => s.id === "uni-cookbook")
    ?.blocks.filter((b) => b.kind === "chapter-index")
    .reduce((n, b) => n + ((b as any).count as number), 0);

  return (
    <>
      <h1>Universal Natural Intelligence</h1>
      <p className="lede">
        An active-inference research programme: a bacterial flagellar-motor laboratory, a scientific
        control plane that authors verdicts, a colony of agents living in a running world, and the
        instruments built to stop any of it claiming more than it has measured.
      </p>

      <div className="note">
        <b>Read this first.</b> Every count on this page was generated from the repository it
        describes, at the commit named beneath it. None of it is typed. The estate arrived at that
        rule the hard way — its governing documents once carried six wrong numbers at once, and one of
        them was false 176 seconds after it was written.
      </div>

      <h2>Where to start</h2>
      <div className="card">
        <p>
          Four routes in, depending on what you came for. Every command in them is quoted from the
          file that defines it, so a command that moves fails this site&rsquo;s build rather than
          rotting on the page.
        </p>
        <ul className="toc">
          <li>
            <a href="/articles/quick-start/"><b>Quick start</b></a> — fifteen minutes from nothing to a
            running active-inference engine. No GPU, no accounts, no network after the first fetch.
          </li>
          <li>
            <a href="/articles/start-here/"><b>Start here</b></a> — what this is, in the order you have
            to meet it. Six ideas, each needed for the next.
          </li>
          <li>
            <a href="/articles/install/"><b>Install</b></a> and{" "}
            <a href="/articles/run-it/"><b>Run it</b></a> — every prerequisite with the version the
            estate really declares, then every runnable entry point with its real command.
          </li>
          <li>
            <a href="/coverage/"><b>Coverage</b></a> — the proof that nothing here is unaccounted for,
            computed and gated rather than claimed.
          </li>
        </ul>
      </div>

      <h2>The University</h2>
      <div className="card">
        <p>
          This site is also a place to <i>learn and build</i> this science, not only to read about
          it. All of it is free, open source, runs in your browser on the CPU, and is pinned to the
          public commit it came from.
        </p>
        <ul className="toc">
          <li>
            <a href="/labs/"><b>The labs</b></a> — {(labs as any).counts.vendored} laboratories
            served from this site, byte-verified against their public source commit on every build,
            plus the campus labs at{" "}
            <a href="https://universalnaturalintelligence.com/" rel="noreferrer">
              universalnaturalintelligence.com
            </a>. Real inference, no install, no account.
          </li>
          <li>
            <a href="/course/"><b>The course</b></a> — {(course as any).counts.sessions} sessions
            across {(course as any).counts.chapters} chapters, every session written four ways (for
            a ten-year-old, in plain English, as the equation, as the derivation), read at build
            time out of the curriculum&rsquo;s own source modules.
          </li>
          <li>
            <a href="/build/"><b>Build with UNI</b></a> — how a model is declared, compiled and run
            here: a card you can read, never a checkpoint you must trust.
          </li>
          <li>
            <a href="/not-an-llm/"><b>Not an LLM</b></a> — what these models are and are not, with
            the one benchmark that exists quoted both ways.
          </li>
          <li>
            <a href="/wrong/"><b>What is wrong</b></a> — the falsification wall: every contradicted
            claim and negative result, front of house. A project that only narrates its wins is
            advertising.
          </li>
          <li>
            <a href="/contribute/"><b>Contribute</b></a> — the co-op: everything lands by pull
            request, including the operator&rsquo;s own work.
          </li>
        </ul>
      </div>

      <h2>Measured right now</h2>
      <div className="grid">
        {gates && (
          <div className="stat">
            <div className="n">{gates.total}</div>
            <div className="l">registered gates · {gates.ci_true} run in CI</div>
          </div>
        )}
        {plan && (
          <div className="stat">
            <div className="n">{plan.steps}</div>
            <div className="l">plan steps across {plan.stages} stages</div>
          </div>
        )}
        {mods && (
          <div className="stat">
            <div className="n">{mods.count}</div>
            <div className="l">Elixir modules · {mods.lines.toLocaleString()} lines</div>
          </div>
        )}
        {chapters !== undefined && (
          <div className="stat">
            <div className="n">{chapters}</div>
            <div className="l">encyclopedia &amp; cookbook chapters</div>
          </div>
        )}
      </div>
      {gates && <Cite c={gates.citation} />}

      <h2>What the parts are</h2>
      {estate.sources.map((s) => (
        <section className="card" key={s.id}>
          <h3>{s.title}</h3>
          <p>{s.one_line}</p>
          <p className="dim">
            Documented from <code>{s.provenance.branch}</code> at{" "}
            <code>{s.provenance.commit_short}</code> · {s.blocks.length} generated block
            {s.blocks.length === 1 ? "" : "s"}
          </p>
        </section>
      ))}

      <h2>What this site does not claim</h2>
      <section className="card">
        <p>
          <b>Most citations open, and what they open is a mirror, not the private tree.</b> Every
          citation here names a real repo, branch, commit and path. {cites.open} of {cites.total}{" "}
          page citations resolve into a public, <i>redacted live mirror</i> of the source
          repository — updated by promotion, one commit per promotion, each recording the private
          commit it came from, merged by a person through a pull request — at the exact mirror
          commit the cited bytes were read from. The working repositories themselves stay private.
          The remaining {cites.closed} belong to {cites.closedRepos.join(", ")}, which has no
          published mirror, and they say so on their face rather than emitting a link that would
          404. A citation you cannot follow is an appeal to authority, and marking it is the
          difference between documentation and a brochure.
        </p>
        <p className="dim">
          <b>Corrected 2026-08-30.</b> This paragraph read <i>&ldquo;what they open is frozen … a
          redacted, frozen snapshot … taken 2026-08-02 — one commit, no history.&rdquo;</i> That
          stopped being true on 2026-08-24, when the operator ruled the snapshots into live mirrors
          and all three were promoted and merged — and the sentence stayed here for the six days
          since. Same failure as the correction below it, on the same page, one paragraph apart.
        </p>
        <p className="dim">
          <b>Corrected 2026-08-24.</b> This paragraph read <i>“The source repositories are not public
          yet … today none of them can be opened.”</i> That stopped being true on 2026-08-02, when the
          snapshots were published and the citations began resolving against them, and the sentence
          stayed on this page for the 22 days since — contradicting the site&rsquo;s own manifest, on
          the one page most readers see. The counts above are now derived from the manifest at build
          time rather than typed, because that is the only version of this sentence that cannot rot
          again. The original wording is quoted rather than removed.
        </p>
        <p>
          <b>Passing gates are not proof of biological parity.</b> The estate's own contract is
          explicit that software tests are necessary and nowhere near sufficient, that observation and
          reconstruction may never be relabelled as one another, and that failed, blocked and not-run
          work stays visible rather than being quietly dropped.
        </p>
        {estate.omitted.exclude_reasons.map((e) => (
          <p className="dim" key={e.id}>
            <b>Excluded from {e.id}:</b> {e.reason.join(" ")}
          </p>
        ))}
      </section>
    </>
  );
}
