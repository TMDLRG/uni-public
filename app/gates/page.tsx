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
