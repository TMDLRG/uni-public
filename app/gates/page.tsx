import gatesBundle from "../../content/generated/gates.json";
import { Cite } from "../components/Cite";

export const metadata = { title: "Gates" };

type Gate = {
  id: string;
  file: string;
  ci: boolean;
  gate_row: string | null;
  why: string | null;
  /** PASS | FAIL | PARTIAL | PENDING | WITHHELD | INCONCLUSIVE | NOT_RUN | NOT_RUN_EXTERNAL | KILLED */
  state: string;
  exit: number | null;
  law_ok: boolean | null;
};

const g = gatesBundle as unknown as {
  measured_at: string;
  source: { repo: string; commit_short: string; branch: string; clean: boolean };
  local: { ran: number; law_violations: number; registry_complete: boolean; runner_ok: boolean; tally: Record<string, number> };
  ci: {
    available: boolean; reason?: string; runs_examined?: number; successes?: number;
    tally?: Record<string, number>; not_passing?: string[]; verdict_tally?: string;
    latest?: { id: number; conclusion: string; at: string; commit: string; workflow: string } | null;
  };
  gates: Gate[];
};

/**
 * VERDICT, NOT VENUE.
 *
 * This page used to show one pill per gate saying CI or external — that is WHERE a gate runs. A
 * reader saw thirty-two green-ish pills and took it for a clean bill of health. It was not one: on
 * 2026-08-01 the source estate's CI had 77 runs, 77 failures and zero successes, with five gates
 * failing, and nothing here said so while the site footer promised failing gates are published.
 *
 * Every state below is now produced by invoking the real runner and recording what it said, per gate.
 * Two venues are shown because they disagree, and the disagreement is the informative part.
 */
const TONE: Record<string, string> = {
  PASS: "ok",
  FAIL: "bad",
  PARTIAL: "warn",
  PENDING: "warn",
  WITHHELD: "warn",
  INCONCLUSIVE: "warn",
  KILLED: "bad",
  NOT_RUN: "warn",
  NOT_RUN_EXTERNAL: "warn",
};
const LABEL: Record<string, string> = { NOT_RUN_EXTERNAL: "not run · external", NOT_RUN: "not run", KILLED: "killed" };

export default function Gates() {
  const ciNotPassing = new Set((g.ci.not_passing || []).map((s) => s.split("=")[0].trim()));
  const t = g.local.tally;
  const measured = g.measured_at.slice(0, 10);

  return (
    <>
      <h1>Gates</h1>
      <p className="lede">
        A gate is an executable check that can fail. This estate holds {g.gates.length} of them, each
        carrying a statement of the defect it exists to catch — and, below, <b>the verdict it actually
        returned</b>.
      </p>

      <div className="note">
        <b>This is a dated measurement, not a live status.</b> A static site cannot know whether a gate
        passes right now. Everything here was measured on <b>{measured}</b> at commit{" "}
        <code>{g.source.commit_short}</code> of <code>{g.source.branch}</code>
        {g.source.clean ? "" : " (working tree not clean at the time of measurement)"}. Read it in the
        past tense, because that is the only tense it can honestly be written in.
      </div>

      <h2>What the runner said, here</h2>
      <div className="grid">
        {["PASS", "FAIL", "NOT_RUN_EXTERNAL"].map((k) =>
          t[k] === undefined ? null : (
            <div className="stat" key={k}>
              <div className="n">{t[k]}</div>
              <div className="l">{LABEL[k] || k.toLowerCase()}</div>
            </div>
          )
        )}
        <div className="stat">
          <div className="n">{g.local.law_violations}</div>
          <div className="l">law violations</div>
        </div>
      </div>
      <p className="dim">
        The runner asserts a law separate from any gate&rsquo;s own verdict: <b>a gate exits zero if
        and only if the verdict it prints is PASS</b>. A gate that printed FAIL and exited zero would
        pass a pipeline reading only the exit code while its own words said otherwise. That law held
        for all {g.local.ran} gates that ran, and the registry was{" "}
        {g.local.registry_complete ? "complete" : <b>INCOMPLETE</b>} — a gate file on disk but absent
        from the registry fails the runner, so a check cannot dodge the law by being left out.
      </p>

      <h2>What continuous integration said</h2>
      {g.ci.available ? (
        <div className="note">
          <p>
            <b>
              {g.ci.successes} successful runs out of {g.ci.runs_examined} examined.
            </b>{" "}
            {g.ci.successes === 0 ? (
              <>
                The pipeline has <b>never reported success on any commit</b> in its recorded history.
              </>
            ) : null}{" "}
            {g.ci.latest ? (
              <>
                Most recent run <code>{g.ci.latest.id}</code> at commit{" "}
                <code>{g.ci.latest.commit}</code>: <b>{g.ci.latest.conclusion}</b>.
              </>
            ) : null}
          </p>
          {g.ci.verdict_tally ? <p>Its gate-runner tally: <b>{g.ci.verdict_tally}</b>.</p> : null}
          {g.ci.not_passing?.length ? (
            <p>
              Not passing there: {g.ci.not_passing.map((s) => <code key={s} style={{ marginRight: 6 }}>{s}</code>)}
            </p>
          ) : null}
          <p className="dim">
            <b>CI and this machine disagree, and that is the informative part.</b> The same gates on
            the same commit return {t.PASS} PASS / {t.FAIL || 0} FAIL here and{" "}
            {g.ci.verdict_tally || "a different tally"} there. Some gates need resources CI does not
            have — a running service, a display, a network the runner cannot reach. Publishing only
            the local number would be the proponent marking his own homework; publishing only
            CI&rsquo;s would hide why those gates fail there. Both are shown, and where a gate passes
            here and fails there the row below says so.
          </p>
          <p className="dim">
            CI is the closest thing to an independent runner this estate has — a machine the operator
            does not control, invoking the gates on every push. That makes its verdict worth more
            evidentially than the local one, and it is the one that was not being published until
            2026-08-01.
          </p>
        </div>
      ) : (
        <div className="note">
          <b>CI state could not be read when this was generated.</b> {g.ci.reason} It is reported as
          unavailable rather than omitted, because a missing measurement and a passing one are not the
          same thing.
        </div>
      )}

      <div className="note">
        <b>The rule that makes these worth reading.</b> A check that has never been shown to fail is
        not considered proven here. Gates are mutation-tested: a representative defect is deliberately
        introduced, the gate must go red, the defect is reverted, and it must go green again. A gate
        that stays green through its own mutation is a decoration, and is treated as one.
      </div>

      <h2>Every gate, and what it returned</h2>
      <table>
        <thead>
          <tr>
            <th>Gate</th>
            <th>Verdict here</th>
            <th>In CI</th>
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
                <span className={"pill " + (TONE[x.state] || "warn")}>{LABEL[x.state] || x.state}</span>
                {x.exit !== null ? <div className="dim" style={{ fontSize: 11 }}>exit {x.exit}</div> : null}
              </td>
              <td>
                {!x.ci ? (
                  <span className="dim">not run</span>
                ) : ciNotPassing.has(x.id) ? (
                  <span className="pill bad">FAIL</span>
                ) : g.ci.available && g.ci.not_passing ? (
                  <span className="pill ok">PASS</span>
                ) : (
                  <span className="dim">unknown</span>
                )}
              </td>
              <td>{x.why ? <span className="dim">{x.why}</span> : <span className="dim">—</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>What this table does not tell you</h2>
      <section className="card">
        <p>
          <b>It is not live.</b> It is what the runner said on {measured}. A gate that passed then may
          fail now, and the only way to know is to run it — which needs the source repositories, and
          those are private.
        </p>
        <p>
          <b>A PASS is the absence of a specific named defect, not the presence of correctness.</b>{" "}
          Each gate tests one failure mode. Thirty-two of them passing means thirty-two named ways of
          being wrong were checked for and not found. It does not mean the system is right.
        </p>
        <p className="dim">
          Three gates are <b>external</b>: they need live resources and are listed and never run,
          rather than being silently dropped or fabricated as passes. An unrun check is not a passing
          check, and it is coloured as neither.
        </p>
      </section>

      <Cite
        c={{
          repo: g.source.repo,
          title: "UNI.Minecraft",
          branch: g.source.branch,
          commit: g.source.commit_short,
          commit_short: g.source.commit_short,
          path: "viewer/gate_registry.json",
          visibility: "private",
          resolvable: false,
        } as any}
      />
    </>
  );
}
