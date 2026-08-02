import drift from "../../content/generated/drift.json";

export const metadata = {
  title: "Drift",
  description:
    "Every place the estate's declaration and its runtime disagree, measured and published. Silent failures first, because a thing that fails loudly gets fixed.",
};

/**
 * THE ADVERSE-RESULTS REGISTER.
 *
 * This page exists because of one rule the whole project is built on: adverse results are never
 * buried. They are said first, in plain words, to everyone — not appended at the end where they
 * read as a caveat.
 *
 * A "drift" is a place where what the code or documentation SAYS disagrees with what the running
 * system DOES. Every row below was measured, not inferred, and each carries the evidence class of
 * the measurement so a reader can see exactly how firm the claim is.
 *
 * ORDERING IS THE ARGUMENT. Silent failures come first. A fault that announces itself gets fixed
 * within the hour; a fault that reports success while doing nothing can run for a night. The single
 * clearest example is on this page: a camera whose health check opened a TCP connection
 * successfully, every second, onto a process that was dying before it could send a byte. Every
 * indicator was green. The picture was blank for hours.
 */

type Drift = {
  title: string;
  kind: string;
  claim: string;
  reality: string;
  locator: string;
  blast_radius: string;
  fails_silently: boolean;
  evidence_class: string;
};

type Stop = { id: string; what: string; current_state: string; why_operator_only?: string };

const d = drift as unknown as {
  read_at: string;
  source: { path: string; commit_short: string; branch: string };
  summary: string | null;
  tally: { total: number; silent: number; loud: number };
  drifts: Drift[];
  stops: Stop[];
  orphans: string[];
  withheld: { checked: boolean; refused_items?: number; scrubbed_references?: number; note: string };
};

const CLASS_MEANING: Record<string, string> = {
  A: "directly observed at runtime",
  B: "observed in a file or tool output",
  C: "indicated by the code",
  F: "a documented claim",
  G: "inferred",
};

export default function DriftPage() {
  const read = d.read_at.slice(0, 10);
  const silent = d.drifts.filter((x) => x.fails_silently);
  const loud = d.drifts.filter((x) => !x.fails_silently);

  return (
    <>
      <h1>Drift</h1>
      <p className="lede">
        A <b>drift</b> is a place where what this estate <i>says</i> disagrees with what it{" "}
        <i>does</i>. There are <b>{d.tally.total}</b> of them, and <b>{d.tally.silent}</b> fail
        silently — reporting success while doing nothing. Those are listed first, because a fault
        that announces itself gets fixed and a fault that stays quiet gets shipped.
      </p>

      <div className="note">
        <b>Measured on {read}</b> at commit <code>{d.source.commit_short}</code> of{" "}
        <code>{d.source.branch}</code>, from <code>{d.source.path}</code>. This is a dated
        measurement and is written in the past tense, because a static page cannot know what is true
        right now. Some of these may already be fixed; none of them are hidden.
      </div>

      {d.summary ? (
        <>
          <h2>What the audit found</h2>
          <section className="card">
            <p>{d.summary}</p>
          </section>
        </>
      ) : null}

      <h2>Silent failures — {silent.length}</h2>
      <p className="dim">
        Each of these reported success, or reported nothing at all, while not doing its job. They are
        the dangerous kind. A green indicator over an empty pipe is worse than a red one, because
        nobody goes looking.
      </p>
      {silent.map((x, i) => (
        <section className="card" key={"s" + i}>
          <h3>
            {x.title} <span className="pill bad">silent</span>
          </h3>
          <p>
            <b>It said:</b> {x.claim}
          </p>
          <p>
            <b>It actually did:</b> {x.reality}
          </p>
          <p className="dim">
            <b>What breaks:</b> {x.blast_radius}
          </p>
          <p className="dim mono" style={{ fontSize: 12 }}>
            {x.locator}
          </p>
          <p className="dim" style={{ fontSize: 12 }}>
            Evidence: class {x.evidence_class} — {CLASS_MEANING[x.evidence_class] || "unclassified"}.
            Kind: {x.kind}.
          </p>
        </section>
      ))}

      <h2>Loud failures — {loud.length}</h2>
      <p className="dim">
        These announce themselves. They are still defects, but they are the survivable kind: someone
        sees them.
      </p>
      {loud.map((x, i) => (
        <section className="card" key={"l" + i}>
          <h3>
            {x.title} <span className="pill warn">loud</span>
          </h3>
          <p>
            <b>It said:</b> {x.claim}
          </p>
          <p>
            <b>It actually did:</b> {x.reality}
          </p>
          <p className="dim">
            <b>What breaks:</b> {x.blast_radius}
          </p>
          <p className="dim mono" style={{ fontSize: 12 }}>
            {x.locator}
          </p>
          <p className="dim" style={{ fontSize: 12 }}>
            Evidence: class {x.evidence_class} — {CLASS_MEANING[x.evidence_class] || "unclassified"}.
          </p>
        </section>
      ))}

      {d.stops?.length ? (
        <>
          <h2>Acts no automated agent may perform</h2>
          <p>
            These are published in full because a list of restraints only its author can read is not
            a restraint — it is a claim about one. Each carries the state it was in when measured.
          </p>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>The forbidden act</th>
                <th>State when measured</th>
              </tr>
            </thead>
            <tbody>
              {d.stops.map((s) => (
                <tr key={s.id}>
                  <td className="mono">{s.id}</td>
                  <td>
                    {s.what}
                    {s.why_operator_only ? (
                      <div className="dim" style={{ fontSize: 12 }}>{s.why_operator_only}</div>
                    ) : null}
                  </td>
                  <td className="dim">{s.current_state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}

      {d.orphans?.length ? (
        <>
          <h2>Orphans — {d.orphans.length}</h2>
          <p className="dim">
            Processes running that no file in any audited repository claims to launch. An orphan is
            not necessarily wrong, but nothing knows how to restart it, and nothing will notice when
            it dies.
          </p>
          <ul>
            {d.orphans.map((o, i) => (
              <li key={i} className="dim" style={{ fontSize: 13 }}>
                {o}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <h2>What was taken out of this page</h2>
      <div className="note">
        <b>{d.withheld.checked ? "" : "Not checked. "}</b>
        {d.withheld.note}
        <p className="dim">
          Two kinds of sensitive text are handled differently, deliberately.{" "}
          <b>Structural details</b> — an internal address, a port, a hostname, a user path — are{" "}
          <b>redacted in place</b> and leave a visible <code>[redacted: …]</code> marker, because the
          sentence still means something without them and you can see something was removed.{" "}
          <b>Third-party names are refused, never redacted</b>: the whole item is dropped, because a
          marker where a name used to be still tells you a name was there. What you get instead is
          the count.
        </p>
      </div>
    </>
  );
}
