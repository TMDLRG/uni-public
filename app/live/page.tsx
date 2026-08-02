import live from "../../content/generated/live_status.json";
import { Cite } from "../components/Cite";

export const metadata = {
  title: "Live",
  description: "The plan being worked, the questions it is waiting on, and what the automated agent may never do.",
};

type Step = {
  id: string;
  title: string;
  status: string;
  prediction: string | null;
  falsifier: string | null;
  artifact: string | null;
  sha256: string | null;
  builds: { id: string; title: string | null; status: string | null }[] | null;
};
/**
 * `checkpoint` is an OBJECT, not a string — {id, status, he_sees, he_does, ready_note?}. The first
 * draft of this page typed it as a string and the static export died with "Objects are not valid as
 * a React child", which is the build doing its job: the page could not ship claiming to render the
 * plan while silently dropping the part of each stage that says what a human must look at and do.
 */
type Checkpoint = {
  id: string;
  status: string | null;
  he_sees: string | null;
  he_does: string | null;
  ready_note?: string | null;
};
type Stage = {
  id: number;
  name: string | null;
  status: string | null;
  why: string | null;
  checkpoint: Checkpoint | null;
  steps: Step[];
};
type Question = {
  id: string;
  kind: string;
  text: string;
  answered: boolean;
  answer: { at: string | null; answer: string | null; note: string | null } | null;
};

const L = live as unknown as {
  plan_read_at: string;
  source: { repo: string; path: string; commit_short: string; branch: string; plan_authored_at: string | null };
  phase: string | null;
  next_act: { id?: string; owner?: string; one_line?: string; where?: string; blocked_on?: string } | null;
  law: unknown;
  tally: { stages: number; steps: number; by_status: Record<string, number> };
  stages: Stage[];
  stops: { id: string; what: string; why?: string }[] | null;
  gates: {
    measured_at: string | null; commit: string | null; registered: number | null;
    local_tally: Record<string, number> | null; ci_available?: boolean;
    ci_latest?: { conclusion: string; commit: string } | null; note: string;
  };
  decisions: {
    available: boolean; note: string; claim_level?: string; caveat?: string;
    answered_count?: number; open_count?: number; chain_ok?: boolean; questions?: Question[];
  };
  distribution: { declared: boolean; note?: string; links?: { platform: string; url: string }[] };
  withheld: { checked: boolean; items?: number; note: string } | null;
};

/**
 * THE PAGE THAT LETS A STRANGER FOLLOW ALONG.
 *
 * The operator's directive, given live on air on 2026-08-02: publish the plan, so the public is
 * following along in real status — and keep the *answering* local, his click or his word.
 *
 * That is a read/write split and it is the whole design of this page. Everything below is READ. The
 * questions the plan is waiting on are published open, unanswered, by name. The acts the automated
 * agent is forbidden to perform are published in full. Nothing on this page can change any of it;
 * the only surface that can is on the operator's own machine, behind his own hand.
 *
 * WHAT "LIVE" HONESTLY MEANS HERE, because a page that overclaimed it would be the exact defect this
 * estate has already been caught committing — its governing banner once carried a gate tally that was
 * false 176 seconds after it was written, in the present tense:
 *
 *   - The PLAN is live in the only sense a plan can be. It is read from the plan file at build time,
 *     never transcribed. When a step completes, the file changes and this page changes with it.
 *   - The SYSTEM STATE is not, and cannot be, on a static export with no backend. Every figure of
 *     that kind carries the date it was measured and is written in the past tense.
 */
const TONE: Record<string, string> = {
  DONE: "ok",
  IN_PROGRESS: "warn",
  NEXT: "warn",
  PLANNED: "",
  BLOCKED: "bad",
  OPERATOR: "warn",
  STANDING: "",
};

export default function Live() {
  const read = L.plan_read_at.slice(0, 10);
  const t = L.tally.by_status;
  const d = L.decisions;
  const open = (d.questions || []).filter((q) => !q.answered);
  const answered = (d.questions || []).filter((q) => q.answered);

  return (
    <>
      <h1>Live</h1>
      <p className="lede">
        This is the plan actually being worked, read from the file that governs it. Not a summary of
        it, not a description of it — <b>the file</b>. {L.tally.steps} steps across {L.tally.stages}{" "}
        stages, {t.DONE || 0} of them done, and the {(d.open_count ?? 0)} questions the work is
        currently waiting on a human to answer.
      </p>

      <div className="note">
        <b>Two different things on this page are live in two different senses, and conflating them
        would be a lie.</b>{" "}
        The <b>plan</b> is live: it was read from{" "}
        <code>{L.source.path}</code> at commit <code>{L.source.commit_short}</code> on <b>{read}</b>,
        and no number on this page was typed by hand. The <b>state of the running system</b> is not
        live and cannot be — this site is a static export with no backend and no runtime network
        access at all. Anything measured is dated and written in the past tense.
      </div>

      {L.next_act ? (
        <>
          <h2>What happens next</h2>
          <section className="card">
            <p>
              <span className="pill warn">{L.next_act.id}</span>{" "}
              {L.next_act.owner ? <span className="dim">owner: {L.next_act.owner.toLowerCase()}</span> : null}
            </p>
            <p>{L.next_act.one_line}</p>
            {L.next_act.blocked_on ? (
              <p className="dim">
                <b>Blocked on:</b> {L.next_act.blocked_on}
              </p>
            ) : null}
            {L.next_act.where ? <p className="dim mono">{L.next_act.where}</p> : null}
          </section>
        </>
      ) : null}

      <h2>Where the work stands</h2>
      <div className="grid">
        {["DONE", "IN_PROGRESS", "BLOCKED", "PLANNED", "OPERATOR"].map((k) =>
          t[k] === undefined ? null : (
            <div className="stat" key={k}>
              <div className="n">{t[k]}</div>
              <div className="l">{k.toLowerCase().replace("_", " ")}</div>
            </div>
          )
        )}
      </div>
      <p className="dim">
        <b>{L.phase}.</b> A step marked <b>operator</b> is one no automated agent is permitted to
        perform, and a step marked <b>blocked</b> is stuck on something outside this repository. Both
        are counted in the open work rather than quietly excluded from it, because a plan that only
        counts what it can finish is not reporting the same thing as a plan that counts everything.
      </p>

      <h2>Every stage, every step</h2>
      {L.stages.map((st) => (
        <section className="card" key={st.id}>
          <h3>
            {st.name ? st.name : `Stage ${st.id}`}{" "}
            {st.status ? <span className={"pill " + (TONE[st.status] ?? "")}>{st.status.toLowerCase()}</span> : null}
          </h3>
          {st.why ? <p className="dim">{st.why}</p> : null}
          <table>
            <thead>
              <tr>
                <th>Step</th>
                <th>Status</th>
                <th>What it is, and what would falsify it</th>
              </tr>
            </thead>
            <tbody>
              {st.steps.map((s) => (
                <tr key={s.id}>
                  <td className="mono">{s.id}</td>
                  <td>
                    <span className={"pill " + (TONE[s.status] ?? "")}>{s.status.toLowerCase()}</span>
                  </td>
                  <td>
                    <div>{s.title}</div>
                    {s.prediction ? (
                      <div className="dim" style={{ fontSize: 12, marginTop: 4 }}>
                        <b>Predicted:</b> {s.prediction}
                      </div>
                    ) : null}
                    {s.falsifier ? (
                      <div className="dim" style={{ fontSize: 12, marginTop: 2 }}>
                        <b>Falsified if:</b> {s.falsifier}
                      </div>
                    ) : null}
                    {s.builds?.length ? (
                      <div className="dim" style={{ fontSize: 11, marginTop: 4 }}>
                        {s.builds.length} builds: {s.builds.map((b) => `${b.id} ${b.status ?? "?"}`).join(" · ")}
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {st.checkpoint ? (
            <div className="note">
              <p>
                <b>Checkpoint {st.checkpoint.id}</b>
                {st.checkpoint.status ? (
                  <> <span className={"pill " + (TONE[st.checkpoint.status] ?? "")}>{st.checkpoint.status.toLowerCase()}</span></>
                ) : null}
              </p>
              {/* This is the part of the plan a machine cannot do: a stage closes when a human LOOKS
                  at something and SAYS what he saw. Both halves are published, because a checkpoint
                  described only as "operator review" is indistinguishable from a rubber stamp. */}
              {st.checkpoint.he_sees ? <p><b>What he looks at:</b> {st.checkpoint.he_sees}</p> : null}
              {st.checkpoint.he_does ? <p><b>What he decides:</b> {st.checkpoint.he_does}</p> : null}
              {st.checkpoint.ready_note ? <p className="dim">{st.checkpoint.ready_note}</p> : null}
            </div>
          ) : null}
        </section>
      ))}

      <h2>The questions this plan is waiting on</h2>
      {d.available ? (
        <>
          <div className="note">
            <b>
              {d.answered_count} answered, {d.open_count} open.
            </b>{" "}
            {d.answered_count === 0 ? (
              <>
                <b>That first number is zero, and it is published rather than hidden.</b> A surface
                exists on the operator&rsquo;s own machine that records his answer into an append-only
                hash-chained ledger, and it has never been used. Every ruling he has given was given
                in conversation — which is not an artifact, cannot be cited, and disappears. Naming
                that here is the point: an estate that publishes its gates and hides its empty
                decision ledger would be publishing a curated subset of itself.
              </>
            ) : (
              d.note
            )}
          </div>
          <div className="note">
            <b>Anyone can see these. Only one person can answer them.</b> This page is read-only and
            so is every copy of it. Answering happens on the operator&rsquo;s own machine, from his own
            hand — and the system is explicit that even that is{" "}
            <code>{d.claim_level}</code>: {d.caveat}
          </div>
          {answered.length ? (
            <table>
              <thead>
                <tr><th>Question</th><th>Answer</th><th>When</th></tr>
              </thead>
              <tbody>
                {answered.map((q) => (
                  <tr key={q.id}>
                    <td className="mono">{q.id}<div className="dim" style={{ fontSize: 11 }}>{q.text}</div></td>
                    <td><b>{q.answer?.answer}</b>{q.answer?.note ? <div className="dim" style={{ fontSize: 11 }}>{q.answer.note}</div> : null}</td>
                    <td className="dim">{q.answer?.at?.slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
          <h3>Open</h3>
          <table>
            <thead>
              <tr><th>Id</th><th>Kind</th><th>The question</th></tr>
            </thead>
            <tbody>
              {open.map((q) => (
                <tr key={q.id}>
                  <td className="mono">{q.id}</td>
                  <td className="dim">{q.kind}</td>
                  <td>{q.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="note">
          <b>The decision ledger could not be read when this page was generated.</b> {d.note} It is
          reported as unreadable rather than omitted, because a missing record and an empty one are
          not the same thing.
        </div>
      )}

      {L.stops?.length ? (
        <>
          <h2>What the automated agent may never do</h2>
          <p>
            An agent does most of the building here. These are the acts it is forbidden to perform
            under any instruction, and they are published in full because a list of restraints that
            only its author can read is not a restraint — it is a claim about one.
          </p>
          <table>
            <thead>
              <tr><th>Id</th><th>Forbidden act</th><th>Why</th></tr>
            </thead>
            <tbody>
              {L.stops.map((s) => (
                <tr key={s.id}>
                  <td className="mono">{s.id}</td>
                  <td>{s.what}</td>
                  <td className="dim">{s.why || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}

      <h2>What was taken out of this page</h2>
      <div className="note">
        {!L.withheld ? (
          <>No withholding record was generated, which is itself a gap — read it as unknown, not as clean.</>
        ) : !L.withheld.checked ? (
          <><b>Not checked.</b> {L.withheld.note}</>
        ) : (
          <>
            <b>
              {L.withheld.items === 0
                ? "Nothing was withheld."
                : `${L.withheld.items} item${L.withheld.items === 1 ? " was" : "s were"} withheld.`}
            </b>{" "}
            {L.withheld.note}
          </>
        )}
        <p className="dim">
          Two different things happen to two different kinds of sensitive text, and the difference is
          deliberate. <b>Structural details</b> — an internal address, a hostname, a port — are{" "}
          <b>redacted in place</b> and leave a visible <code>[redacted: …]</code> marker, because the
          sentence still means something without them and you can see that something was removed.{" "}
          <b>Third-party names are refused, never redacted</b>: the whole item is dropped, because a
          marker where a name used to be still tells you a name was there, and a sentence built
          around a removed name is often still identifying. What you get instead is the count.
        </p>
      </div>

      <h2>The last time the gates were run</h2>
      <div className="note">
        {L.gates.measured_at ? (
          <>
            <b>
              {L.gates.registered} gates, measured {L.gates.measured_at.slice(0, 10)} at commit{" "}
              <code>{L.gates.commit}</code>
            </b>
            {L.gates.local_tally ? (
              <> — {Object.entries(L.gates.local_tally).map(([k, v]) => `${v} ${k.toLowerCase()}`).join(" · ")}.</>
            ) : null}{" "}
            {L.gates.note} The full table, including where continuous integration disagrees with the
            operator&rsquo;s machine, is on the <a href="/gates/">gates page</a>.
          </>
        ) : (
          <>{L.gates.note}</>
        )}
      </div>

      <h2>Watching it happen</h2>
      <section className="card">
        {L.distribution.declared && L.distribution.links?.length ? (
          <p>
            The work is broadcast live:{" "}
            {L.distribution.links.map((l) => (
              <span key={l.url} style={{ marginRight: 10 }}>
                <a href={l.url} rel="noopener noreferrer">{l.platform}</a>
              </span>
            ))}
          </p>
        ) : (
          <p>
            <b>No watch link is published here</b>, because the operator has not declared one in the
            file this page reads. A guessed URL on a public page is a fabrication, and this site does
            not print one to fill a gap.
          </p>
        )}
        <p className="dim">
          On the broadcast itself, the state of the running system <i>is</i> live: an honest health
          line and a full-frame status board are regenerated every few seconds from the same probe the
          operator&rsquo;s own private panel reads, and they name whatever is broken at the time. That
          is the surface where &ldquo;right now&rdquo; is answerable. This page is where{" "}
          <i>what we are trying to do, and what we are stuck on</i> is answerable, and it does not
          pretend to be the other one.
        </p>
      </section>

      <Cite
        c={{
          repo: L.source.repo,
          title: "UNI.Minecraft",
          branch: L.source.branch,
          commit: L.source.commit_short,
          commit_short: L.source.commit_short,
          path: L.source.path,
          visibility: "private",
          resolvable: false,
        } as never}
      />
    </>
  );
}
