import estate from "../../content/generated/v2_estate.json";

export const metadata = {
  title: "Estate",
  description:
    "The repositories that make up the UNI estate, the services actually answering on their ports, the drifts where declaration and reality disagree, and the orphans nobody claims.",
};

/**
 * THE ESTATE, AS THE V2 AUDIT ACTUALLY MEASURED IT.
 *
 * Three sections and one register, in this order, deliberately:
 *
 *   1. REPOS — what code exists on disk, grouped by V2's own groups (minecraft / architect /
 *      flagellum / …). Head commit and uncommitted count come through so a reader can see whether a
 *      repository is a working tree in the middle of a change or a clean archive.
 *
 *   2. RUNTIME — for each host V2 visited, the services actually answering on their ports. The state
 *      column is NOT collapsed. UP_ANSWERING means "the socket answered with a real payload".
 *      UP_BUT_EMPTY means "the socket accepted a client and immediately handed back nothing" — which
 *      is exactly the shape that hid a dead camera on the lab for hours, and it is the whole reason
 *      the state vocabulary is not just UP/DOWN. Rendering UP_BUT_EMPTY the same as UP_ANSWERING
 *      would be the defect V2 was written to catch.
 *
 *   3. DRIFTS — places the declaration disagrees with reality. Ordered SILENT FAILURES FIRST, then
 *      by evidence class. A well-told failure teaches more than a clean success and the language of
 *      these findings is not softened. If a running server is executing bytes older than the commit
 *      that changed them, this page says so, with the process id and the commit and the difference
 *      in minutes.
 *
 *   4. ORPHANS — sockets and processes nobody in any audited repository claims. Named because a
 *      listener without an owner is a listener nobody will patch.
 *
 * WHAT THIS PAGE IS NOT LIVE. This is a static export. The V2 audit was taken between two specific
 * timestamps and the estate has moved since — a process referenced here by PID may already be gone,
 * a port that answered may not answer now. Nothing in the JSON was fabricated at build time; every
 * number here is the number V2 measured, and the page says so.
 */

type Repo = {
  name: string | null;
  branch: string | null;
  head_commit: string | null;
  is_git: boolean;
  uncommitted_count: number | null;
  ahead_behind: string | null;
  file_count: number | null;
  languages: string[];
  purpose_summary: string | null;
  purpose_full: string | null;
  evidence_class: string | null;
  entry_points: {
    name: string | null;
    kind: string | null;
    port: number | null;
    what_it_does: string | null;
  }[];
};

type Service = {
  name: string | null;
  port: number | null;
  state: string;
  evidence_class: string | null;
  how_observed: string | null;
  detail: string | null;
  started_at: string | null;
};

type Drift = {
  title: string | null;
  kind: string | null;
  claim: string | null;
  reality: string | null;
  locator: string | null;
  blast_radius: string | null;
  fails_silently: boolean;
  evidence_class: string | null;
};

const E = estate as unknown as {
  read_at: string;
  source: {
    v2_evidence_root: string;
    public_site_commit_short: string;
    public_site_branch: string;
  };
  summary: string | null;
  tally: {
    repo_groups: number;
    repos_total: number;
    hosts: number;
    services_total: number;
    services_by_state: Record<string, number>;
    drifts_total: number;
    drifts_silent: number;
    orphans_total: number;
    stops_total: number;
  };
  repo_groups: { group: string; repos: Repo[] }[];
  service_hosts: {
    host_label: string;
    reachable: boolean;
    notes: string | null;
    services: Service[];
  }[];
  drifts: Drift[];
  stops: { id: string | null; what: string | null; why_operator_only: string | null; current_state: string | null }[];
  orphans: string[];
  gaps: { gap: string | null; closed_by_vector: string | null }[];
  withheld: {
    checked: boolean;
    items_refused?: number;
    structural_references_redacted?: number;
    note: string;
  } | null;
};

// A service-state pill vocabulary that does NOT collapse the states. Each shade is chosen so a
// glance conveys the truth: UP_ANSWERING is ok; UP_SLOW is warn (the socket answers but the answer
// is late); UP_BUT_EMPTY and UP_NO_ANSWER are BAD, because a socket that accepts a client and gives
// back nothing is worse than a socket that isn't there — a health check will believe it. DOWN is
// bad (measured absent). NOT_MEASURED is warn (an honest gap, published as such).
const STATE_TONE: Record<string, string> = {
  UP_ANSWERING: "ok",
  UP_SLOW: "warn",
  UP_BUT_EMPTY: "bad",
  UP_NO_ANSWER: "bad",
  DOWN: "bad",
  NOT_MEASURED: "warn",
};
const STATE_LABEL: Record<string, string> = {
  UP_ANSWERING: "up · answering",
  UP_SLOW: "up · slow",
  UP_BUT_EMPTY: "up · empty payload",
  UP_NO_ANSWER: "up · no answer",
  DOWN: "down",
  NOT_MEASURED: "not measured",
};

const CLASS_LABEL: Record<string, string> = {
  A: "A · probed",
  B: "B · documented",
  C: "C · code-indicated",
  F: "F · historical",
  G: "G · inferred",
};

function ClassPill({ c }: { c: string | null }) {
  if (!c) return null;
  return (
    <span
      className="pill"
      title="Evidence class: A probed, B documented, C code-indicated, F historical, G inferred"
    >
      {CLASS_LABEL[c] ?? c}
    </span>
  );
}

export default function Estate() {
  const read = E.read_at.slice(0, 10);
  const t = E.tally;
  const w = E.withheld;

  return (
    <>
      <h1>Estate</h1>
      <p className="lede">
        The code that makes up the UNI estate, and the services that were actually answering on their
        ports when the V2 audit went out. <b>{t.repos_total} repositories</b> across{" "}
        <b>{t.repo_groups} groups</b>, <b>{t.services_total} services</b> on <b>{t.hosts} hosts</b>,
        and <b>{t.drifts_total} drifts</b> — places the declaration disagrees with reality —{" "}
        <b>{t.drifts_silent}</b> of them silent.
      </p>

      <div className="note">
        <b>What is measured here, and what is not.</b> The three V2 evidence files were read from{" "}
        <code>{E.source.v2_evidence_root}</code> at build time, on <b>{read}</b>. The page was
        assembled from this site at commit <code>{E.source.public_site_commit_short}</code>. Every
        number below is the number V2 measured; nothing was fabricated at build time. The estate has
        moved since the audit — a PID referenced here may already be gone, a port that answered may
        not answer now. Live probes are not available on this site by design (static export, no
        runtime network access), so the honest thing is to date the reading and write in the past
        tense.
      </div>

      {E.summary ? (
        <>
          <h2>V2&rsquo;s own summary</h2>
          <section className="card">
            <p style={{ whiteSpace: "pre-wrap" }}>{E.summary}</p>
          </section>
        </>
      ) : null}

      <h2>Where the runtime stands</h2>
      <p className="dim">
        A count of services by state, across every host V2 visited.{" "}
        <b>UP_ANSWERING</b> means a real payload came back;{" "}
        <b>UP_BUT_EMPTY</b> means the socket accepted a client and immediately handed back nothing —
        the exact shape that hid a dead camera for hours;{" "}
        <b>UP_NO_ANSWER</b> means the port answered a probe but with no useful body;{" "}
        <b>UP_SLOW</b> means the socket answered but late enough to be noticed;{" "}
        <b>DOWN</b> means measured absent;{" "}
        <b>NOT_MEASURED</b> means the audit deliberately did not probe it (and says why).
      </p>
      <div className="grid">
        {["UP_ANSWERING", "UP_SLOW", "UP_BUT_EMPTY", "UP_NO_ANSWER", "DOWN", "NOT_MEASURED"].map((k) =>
          t.services_by_state[k] === undefined ? null : (
            <div className="stat" key={k}>
              <div className="n">{t.services_by_state[k]}</div>
              <div className="l">{STATE_LABEL[k] ?? k.toLowerCase()}</div>
            </div>
          ),
        )}
      </div>

      <h2 id="repos">Repositories on disk</h2>
      <p className="dim">
        Grouped by V2&rsquo;s own top-level groupings. The purpose column carries the first sentence
        V2 lifted from the repository&rsquo;s own README, <code>mix.exs</code> or <code>CLAUDE.md</code>{" "}
        — the same source it cites in the evidence.
      </p>
      {E.repo_groups.map((g) => (
        <section className="card" key={g.group}>
          <h3>
            {g.group}{" "}
            <span className="dim" style={{ fontSize: 14, fontWeight: 400 }}>
              {g.repos.length} repo{g.repos.length === 1 ? "" : "s"}
            </span>
          </h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Purpose (in one line)</th>
                <th>Branch / HEAD</th>
                <th>Files</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>
              {g.repos.map((r) => (
                <tr key={r.name ?? Math.random()}>
                  <td>
                    <div>
                      <b>{r.name ?? "(unnamed)"}</b>
                    </div>
                    {r.uncommitted_count !== null && r.uncommitted_count > 0 ? (
                      <div className="dim" style={{ fontSize: 12, marginTop: 2 }}>
                        {r.uncommitted_count} uncommitted file{r.uncommitted_count === 1 ? "" : "s"}
                        {r.ahead_behind ? ` · ${r.ahead_behind}` : ""}
                      </div>
                    ) : r.ahead_behind ? (
                      <div className="dim" style={{ fontSize: 12, marginTop: 2 }}>
                        {r.ahead_behind}
                      </div>
                    ) : null}
                    {r.entry_points.length ? (
                      <div className="dim" style={{ fontSize: 11, marginTop: 4 }}>
                        {r.entry_points.length} entry point{r.entry_points.length === 1 ? "" : "s"}
                      </div>
                    ) : null}
                  </td>
                  <td>{r.purpose_summary || <span className="dim">(no purpose recorded)</span>}</td>
                  <td className="mono">
                    {r.branch ?? "?"}
                    {r.head_commit ? (
                      <div className="dim" style={{ fontSize: 11 }}>{r.head_commit}</div>
                    ) : null}
                  </td>
                  <td className="mono">{r.file_count ?? "—"}</td>
                  <td>
                    <ClassPill c={r.evidence_class} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}

      <h2 id="runtime">Services actually answering</h2>
      <p className="dim">
        One block per host V2 reached. Ordered within each host so the healthy things come first,
        then the suspicious ones, then the dead. <b>Every state is verbatim</b> — a socket that
        answers with nothing is not rounded up to &ldquo;up&rdquo;, and a socket that was
        deliberately not probed is not rounded up either.
      </p>
      {E.service_hosts.map((h) => (
        <section className="card" key={h.host_label}>
          <h3>
            {h.host_label}{" "}
            {h.reachable ? (
              <span className="pill ok">reachable</span>
            ) : (
              <span className="pill bad">not reachable</span>
            )}
          </h3>
          {h.services.length === 0 ? (
            <p className="dim">No services listed on this host. See the host notes below.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Port</th>
                  <th>State</th>
                  <th>How observed</th>
                  <th>Detail</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {h.services.map((s, i) => (
                  <tr key={`${s.name}-${i}`}>
                    <td>
                      <b>{s.name ?? "(unnamed)"}</b>
                      {s.started_at ? (
                        <div className="dim" style={{ fontSize: 11, marginTop: 2 }}>
                          started {s.started_at}
                        </div>
                      ) : null}
                    </td>
                    <td className="mono">{s.port ?? "—"}</td>
                    <td>
                      <span className={"pill " + (STATE_TONE[s.state] ?? "")}>
                        {STATE_LABEL[s.state] ?? s.state.toLowerCase()}
                      </span>
                    </td>
                    <td className="dim" style={{ fontSize: 12 }}>
                      {s.how_observed ?? "—"}
                    </td>
                    <td style={{ fontSize: 13 }}>{s.detail ?? "—"}</td>
                    <td>
                      <ClassPill c={s.evidence_class} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {h.notes ? (
            <details style={{ marginTop: 12 }}>
              <summary className="dim">
                <b>Host notes</b> — the audit&rsquo;s own paragraph, verbatim
              </summary>
              <p style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>{h.notes}</p>
            </details>
          ) : null}
        </section>
      ))}

      <h2 id="drifts">Where declaration disagrees with reality</h2>
      <p className="dim">
        <b>{E.drifts.length} drifts,</b> ordered <b>silent failures first</b> — a loud failure at
        least announces itself. Then by evidence class: measured (A) outranks documented (B)
        outranks inferred (G). This is the register V2 exists to keep. The language is not softened.
      </p>
      {E.drifts.map((d, i) => (
        <section className="card" key={i}>
          <h3>
            {d.title ?? "(untitled drift)"}{" "}
            {d.fails_silently ? (
              <span className="pill bad" title="No alarm fires when this drifts">
                silent
              </span>
            ) : (
              <span className="pill warn" title="This drift raises an alarm somewhere">
                loud
              </span>
            )}{" "}
            <ClassPill c={d.evidence_class} />
          </h3>
          {d.kind ? (
            <p className="dim" style={{ fontSize: 13 }}>
              <b>Kind:</b> <code>{d.kind}</code>
            </p>
          ) : null}
          {d.claim ? (
            <p>
              <b>Claim.</b> {d.claim}
            </p>
          ) : null}
          {d.reality ? (
            <p>
              <b>Reality.</b> {d.reality}
            </p>
          ) : null}
          {d.blast_radius ? (
            <p>
              <b>What breaks.</b> {d.blast_radius}
            </p>
          ) : null}
          {d.locator ? (
            <p className="dim mono" style={{ fontSize: 12 }}>
              {d.locator}
            </p>
          ) : null}
        </section>
      ))}

      {E.stops.length ? (
        <>
          <h2 id="stops">The acts the automated agent may never do (as this vector held them)</h2>
          <p className="dim">
            V2 was a read-only vector. These are the acts it declared out-of-scope, and how each one
            stood at the end of the run — held or fired.
          </p>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Forbidden act</th>
                <th>Current state (as V2 left it)</th>
              </tr>
            </thead>
            <tbody>
              {E.stops.map((s) => (
                <tr key={s.id ?? Math.random()}>
                  <td className="mono">{s.id ?? "?"}</td>
                  <td>{s.what ?? "—"}</td>
                  <td style={{ fontSize: 13 }}>{s.current_state ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}

      {E.orphans.length ? (
        <>
          <h2 id="orphans">Orphans — listeners and processes nobody claims</h2>
          <p className="dim">
            {E.orphans.length} of them. An orphan is a socket, a process or an artifact that no
            file in any audited repository claims responsibility for. A listener without an owner is
            a listener nobody will patch.
          </p>
          <ul>
            {E.orphans.map((o, i) => (
              <li key={i} style={{ marginBottom: 10 }}>
                {o}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {E.gaps.length ? (
        <>
          <h2 id="gaps">Gaps V2 left open, and what would close them</h2>
          <p className="dim">
            What V2 could not measure this pass, said plainly, alongside the vector that could.
          </p>
          <table>
            <thead>
              <tr>
                <th>Gap</th>
                <th>Closed by</th>
              </tr>
            </thead>
            <tbody>
              {E.gaps.map((g, i) => (
                <tr key={i}>
                  <td style={{ fontSize: 13 }}>{g.gap ?? "—"}</td>
                  <td style={{ fontSize: 13 }} className="dim">
                    {g.closed_by_vector ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}

      <h2 id="withheld">What was taken out of this page</h2>
      <div className="note">
        {!w ? (
          <>No withholding record was generated, which is itself a gap — read it as unknown, not as clean.</>
        ) : !w.checked ? (
          <>
            <b>Not checked.</b> {w.note}
          </>
        ) : (
          <>
            <b>
              {(w.items_refused ?? 0) === 0
                ? "No item was refused."
                : `${w.items_refused} item${w.items_refused === 1 ? " was" : "s were"} refused whole.`}{" "}
              {(w.structural_references_redacted ?? 0) === 0
                ? "No structural reference was redacted."
                : `${w.structural_references_redacted} structural reference${
                    w.structural_references_redacted === 1 ? " was" : "s were"
                  } redacted in place.`}
            </b>{" "}
            {w.note}
          </>
        )}
        <p className="dim">
          Two different things happen to two different kinds of sensitive text, and the difference
          is deliberate. <b>Structural details</b> — an internal address, a hostname, a port, a
          local filesystem path — are <b>redacted in place</b> and leave a visible{" "}
          <code>[redacted: …]</code> marker, because the sentence still means something without them
          and you can see something was removed. <b>Third-party names are refused, never redacted</b>
          : the whole item is dropped, because a marker where a name used to be still tells you a
          name was there, and a sentence built around a removed name is often still identifying.
          What you get instead is the count.
        </p>
      </div>
    </>
  );
}
