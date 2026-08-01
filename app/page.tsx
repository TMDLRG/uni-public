import { estate, block } from "./lib/estate";
import { Cite } from "./components/Cite";

type GateBlock = { total: number; ci_true: number; ci_false: number; citation: any };
type PlanBlock = { steps: number; stages: number; tally: Record<string, number>; citation: any };
type ModBlock = { count: number; lines: number; citation: any };

export default function Home() {
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
          <b>The source repositories are not public yet.</b> Every citation here names a real repo,
          branch, commit and path — and today none of them can be opened, so each one says so on its
          face. That is deliberate. A citation you cannot follow is an appeal to authority, and
          marking it is the difference between documentation and a brochure.
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
