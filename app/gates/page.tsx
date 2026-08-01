import { block } from "../lib/estate";
import { Cite } from "../components/Cite";

export const metadata = { title: "Gates" };

type Gate = { id: string; file: string; ci: boolean; gate_row: string | null; why: string | null };
type GateBlock = { total: number; ci_true: number; ci_false: number; gates: Gate[]; citation: any };

export default function Gates() {
  const g = block<GateBlock>("uni-minecraft", "gate-registry");
  if (!g) return <p>No gate registry in the generated bundle.</p>;

  return (
    <>
      <h1>Gates</h1>
      <p className="lede">
        A gate is an executable check that can fail. This estate holds {g.total} of them, and each one
        carries, in its own registry entry, a statement of the defect it exists to catch.
      </p>

      <div className="note">
        <b>The rule that makes these worth reading.</b> A check that has never been shown to fail is
        not considered proven here. Gates are mutation-tested: a representative defect is deliberately
        introduced, the gate must go red, the defect is reverted, and it must go green again. A gate
        that stays green through its own mutation is a decoration, and is treated as one.
      </div>

      <h2>
        {g.total} registered · {g.ci_true} run in CI · {g.ci_false} external
      </h2>
      <p className="dim">
        The {g.ci_false} external gates need live resources (a running service, a broadcast surface)
        and are <b>listed and never run</b> rather than being silently dropped or fabricated as
        passes. An unrun check is not a passing check.
      </p>

      <div className="note">
        <b>&ldquo;Run in CI&rdquo; on this page means INVOKED, not PASSING — and this table shows
        venue, not verdict.</b> The pill beside each gate below says where it runs. It does not say
        whether it passes, and it should not be read as though it did.
        <p>
          Stated plainly, because a forensic review on 2026-08-01 found this page could be read as a
          clean bill of health and it is not one:{" "}
          <b>the continuous-integration pipeline for the source estate has never reported success on
          any commit</b> — measured that day as 77 runs, 77 failures, zero successes, across the
          entire recorded history of the workflow. On the most recent run the gate runner reported
          <b> 24 PASS and 5 FAIL</b>, and the Elixir job fails at compile, so the test suite does not
          execute in CI at all.
        </p>
        <p className="dim">
          That is disclosed here rather than left to be discovered because the alternative is a page
          that shows thirty-two rows of green-looking pills over an estate whose pipeline has never
          gone green. The registry is real, the mutation discipline is real, and the pass state is
          not what a reader would assume from the pills. Until this page carries a per-gate verdict
          generated from the runner rather than a venue label, treat it as an inventory of
          instruments, not as evidence that they currently pass.
        </p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Gate</th>
            <th>Runs in CI</th>
            <th>What it exists for</th>
          </tr>
        </thead>
        <tbody>
          {g.gates.map((x) => (
            <tr key={x.id}>
              <td className="mono">
                {x.id}
                <div className="dim" style={{ fontSize: 11 }}>{x.file}</div>
              </td>
              <td>
                <span className={"pill " + (x.ci ? "ok" : "warn")}>{x.ci ? "CI" : "external"}</span>
              </td>
              <td>{x.why ? <span className="dim">{x.why}</span> : <span className="dim">—</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Cite c={g.citation} />
    </>
  );
}
