import mcp from "../../content/generated/mcp.json";
import { Cite } from "../components/Cite";

export const metadata = {
  title: "MCP",
  description:
    "A dated, read-only public projection of the SWU-MCP surface as V1's inspection catalogued it — the 59 tools, the 14 prompts, the enforcement rules, the four lifecycle modes and the gaps V1 could not close from a read-only chair.",
};

type Tool = {
  name: string;
  description: string | null;
  read_actions_observed_count: number | null;
  mutating_actions_deferred_count: number | null;
  evidence_class: string | null;
  notes: string | null;
  category: string;
};
type Prompt = { name: string; purpose: string | null; trigger: string | null };
type EnforcementRule = {
  name: string;
  when_it_fires: string | null;
  error_text: string | null;
  alignment_file_line: number | null;
  observed: boolean;
};
type LifecycleMode = { name: string; purpose: string | null; gates_out: string[] };
type Gap = { gap: string | null; why_not_closed_in_v1: string | null; closed_by_vector: string | null };
type Category = {
  id: string;
  blurb: string | null;
  count: number;
  observed_count: number;
  schema_only_count: number;
  tools: string[];
};

const M = mcp as unknown as {
  read_at: string;
  source: {
    repo: string;
    path: string;
    commit_short: string;
    branch: string;
    catalogue_authored_at: string | null;
    alignment_file_total_lines: number | null;
  };
  summary: string | null;
  totals: {
    tools: number;
    prompts: number;
    enforcement_rules: number;
    lifecycle_modes: number;
    categories: number;
    gaps: number;
    observed_tools: number;
    schema_only_tools: number;
  };
  categories: Category[];
  tools: Tool[];
  prompts: Prompt[];
  enforcement_rules: EnforcementRule[];
  lifecycle_modes: LifecycleMode[];
  gaps: Gap[];
  withheld: { checked: boolean; items?: number; scrub_hits?: number; note: string } | null;
};

/**
 * THE PAGE THAT SAYS WHAT THE SWU-MCP IS, AND WHAT IT ISN'T.
 *
 * Design intent, from the V3 brief: publish V1's read-only inspection of the SWU-MCP surface —
 * every tool, every prompt, every enforcement rule, the four lifecycle modes and the gaps V1
 * could not close from a read-only chair. The page opens with V1's own summary paragraph
 * (class A) so a stranger gets the FINDING first, not the taxonomy. Every column of every table
 * carries the evidence class the catalogue itself declares (A observed, C code-indicated, F
 * historical), so no reader has to guess how firm a claim is.
 *
 * WHAT THIS PAGE IS. A DATED public projection of what V1 observed. Read the "when this was
 * read" line at the top — that is the moment the surface was catalogued, and every past-tense
 * claim below refers to it. If the MCP surface has moved on since, this page is a record of
 * what it USED to be.
 *
 * WHAT THIS PAGE IS NOT. A live view of the MCP. The site is a static export with no backend
 * and no runtime network access at all (CSP default-src 'self'); a page that implied it was
 * checking the server right now would be reproducing exactly the defect the governing banner
 * upstream was caught committing on 2026-07-29 — a present-tense claim that was false 176
 * seconds after it was written.
 */

// The evidence-class glossary shown on the page, so a reader who does not know the taxonomy is
// not left to guess what "class A" means. Kept short and IN THE PAGE (not linked out) because a
// glossary a reader has to click to read is a glossary most readers never see.
const EVIDENCE_CLASS_LABEL: Record<string, string> = {
  A: "observed — a tool call returned this value in the probe",
  B: "documented — carried by an authoritative document in the estate",
  C: "code-indicated — implied by a schema or an error message, not a returned value",
  F: "historical — transcribed from a source-of-truth file (e.g. the alignment file lines)",
  G: "inferred — derived by reasoning across other evidence",
};

const CATEGORY_LABEL: Record<string, string> = {
  inception: "Inception (S01–S06)",
  planning: "Planning",
  "work-items": "Work items",
  people: "People",
  agents: "Agents",
  documentation: "Documentation",
  quality: "Quality & release",
  governance: "Governance",
  memory: "Memory & knowledge",
  contracts: "Contracts",
  keys: "API keys",
  other: "Other",
};

function ClassPill({ c }: { c: string | null }) {
  if (!c) return null;
  const tone =
    c === "A" ? "ok"
    : c === "B" ? "ok"
    : c === "F" ? ""
    : c === "C" ? "warn"
    : "";
  return <span className={"pill " + tone} title={EVIDENCE_CLASS_LABEL[c] || c}>class {c}</span>;
}

export default function MCP() {
  const read = M.read_at.slice(0, 10);
  const t = M.totals;
  const observedPct = t.tools > 0 ? Math.round((t.observed_tools / t.tools) * 100) : 0;

  return (
    <>
      <h1>MCP</h1>
      <p className="lede">
        The <b>SWU-MCP</b> is a lifecycle-gated agile-orchestration server. It exposes{" "}
        <b>{t.tools} tools</b> and <b>{t.prompts} prompts</b> to any agent that connects, and it
        refuses whole tools that are called in the wrong mode. This page is a{" "}
        <b>dated public projection</b> of the V1 read-only inspection of that surface. Every
        figure below is a past-tense observation from that pass, not a live check.
      </p>

      <div className="note">
        <b>What is live here, and what is not.</b> This page is a static export with no backend
        and no runtime network access. It cannot know whether the MCP now responds differently
        from how V1 saw it. The catalogue was read from <code>{M.source.path}</code> in the{" "}
        <code>{M.source.repo}</code> estate at commit <code>{M.source.commit_short}</code> on{" "}
        <b>{read}</b>; any claim below is a claim about that moment, not about now.
      </div>

      <h2>What V1 found, in one paragraph</h2>
      {/* The catalogue's own summary. It carries [class X] markers inline; those are left in
          verbatim because they ARE the evidence discipline the page is meant to demonstrate.
          The UUID of the currently bound programme run is redacted by the generator's scrub —
          the reader sees "[redacted: programme-run id]" in place of it and can see the fact
          that a redaction happened, which is the whole point of a marker over a silent drop. */}
      {M.summary ? (
        <section className="card">
          <p>{M.summary}</p>
        </section>
      ) : (
        <p className="dim">The catalogue did not include a summary paragraph, which is stated rather than filled in.</p>
      )}

      <h2>Where the surface stands</h2>
      <div className="grid">
        <div className="stat"><div className="n">{t.tools}</div><div className="l">tools</div></div>
        <div className="stat"><div className="n">{t.prompts}</div><div className="l">prompts</div></div>
        <div className="stat"><div className="n">{t.enforcement_rules}</div><div className="l">enforcement rules</div></div>
        <div className="stat"><div className="n">{t.lifecycle_modes}</div><div className="l">lifecycle modes</div></div>
        <div className="stat"><div className="n">{t.observed_tools}</div><div className="l">observed (class A)</div></div>
        <div className="stat"><div className="n">{t.schema_only_tools}</div><div className="l">schema-only (class C)</div></div>
      </div>
      <p className="dim">
        <b>{observedPct}% of the {t.tools} tools were observed by an actual call</b> — V1&rsquo;s
        rule was <i>uncertain is write</i>, so any action whose read/write semantics were
        ambiguous was deferred rather than exercised. The remaining tools carry evidence class{" "}
        <code>C</code>: their behaviour is known only from the schema they declare and from the
        error messages they returned, never from a body they successfully produced.
      </p>

      <h2>The four lifecycle modes, and what they gate</h2>
      <p>
        The MCP refuses whole tools that are called in the wrong mode. Transitioning between modes
        is itself a call, and each mode names the specific gates the next transition must clear.
        The mode structure below is <ClassPill c="B" /> — it comes from the alignment file the
        server publishes, not from a per-call observation.
      </p>
      {M.lifecycle_modes.map((m) => (
        <section className="card" key={m.name}>
          <h3>
            {m.name} <ClassPill c="B" />
          </h3>
          {m.purpose ? <p>{m.purpose}</p> : null}
          {m.gates_out.length ? (
            <>
              <p className="dim"><b>Gates out of {m.name}:</b></p>
              <ul>
                {m.gates_out.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </>
          ) : null}
        </section>
      ))}

      <h2>Enforcement rules — the [BLOCK] messages the server emits</h2>
      <p>
        Two layers of enforcement run on every call. <b>Mode-level</b> allow/block lists refuse
        whole tools in the wrong mode (a <code>-32002</code> LIFECYCLE_VIOLATION response).{" "}
        <b>Content-level</b> gates emit <code>[BLOCK]</code> messages when a Story lacks
        acceptance criteria, a RAID risk lacks a mitigation, an ADR field is too short, and so on.
        Each row cites the line in the alignment file where the rule is declared.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Rule</th>
              <th>When it fires</th>
              <th>Error text the server returns</th>
              <th>Alignment file</th>
              <th>Observed live?</th>
            </tr>
          </thead>
          <tbody>
            {M.enforcement_rules.map((r) => (
              <tr key={r.name}>
                <td>
                  <b>{r.name}</b>
                  <div className="dim" style={{ fontSize: 11 }}>
                    <ClassPill c={r.observed ? "A" : "F"} />
                  </div>
                </td>
                <td>{r.when_it_fires}</td>
                <td className="mono" style={{ fontSize: 12 }}>{r.error_text}</td>
                <td className="mono">line {r.alignment_file_line ?? "?"}</td>
                <td>
                  {r.observed ? (
                    <span className="pill ok">yes</span>
                  ) : (
                    <span className="pill" title="Transcribed from the alignment file, never triggered live by V1 — a live trigger would have required a mutating call.">no — F</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>The {t.tools} tools, grouped by what they do</h2>
      <p>
        The SWU-MCP itself does not declare categories; the grouping below is this page&rsquo;s,
        derived from tool names and from the section boundaries in the alignment file{" "}
        {M.source.alignment_file_total_lines ? (
          <>(a {M.source.alignment_file_total_lines}-line document)</>
        ) : null}
        . Every tool row carries the evidence class V1 assigned to it: <ClassPill c="A" /> means a
        call returned a body; <ClassPill c="C" /> means the tool exposes only mutating actions and
        was deferred entirely under the <i>uncertain is write</i> rule.
      </p>
      {M.categories.map((c) => (
        <section className="card" key={c.id}>
          <h3>
            {CATEGORY_LABEL[c.id] || c.id}{" "}
            <span className="dim">
              — {c.count} tool{c.count === 1 ? "" : "s"}, {c.observed_count} observed, {c.schema_only_count} schema-only
            </span>
          </h3>
          {c.blurb ? <p className="dim">{c.blurb}</p> : null}
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>What it does</th>
                  <th>Reads / writes</th>
                  <th>Evidence</th>
                  <th>V1 note</th>
                </tr>
              </thead>
              <tbody>
                {c.tools.map((name) => {
                  const tool = M.tools.find((tt) => tt.name === name);
                  if (!tool) return null;
                  return (
                    <tr key={name}>
                      <td className="mono">{tool.name}</td>
                      <td>{tool.description}</td>
                      <td className="mono" style={{ fontSize: 12 }}>
                        {tool.read_actions_observed_count ?? "?"} read ·{" "}
                        {tool.mutating_actions_deferred_count ?? "?"} write
                      </td>
                      <td><ClassPill c={tool.evidence_class} /></td>
                      <td className="dim" style={{ fontSize: 12 }}>{tool.notes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <h2>The {t.prompts} prompts</h2>
      <p>
        Prompts are named orchestration recipes the server offers agents. V1 catalogued their
        names and purposes from the alignment file but did not fetch or execute any of them —
        their parameter schemas and output shapes remain <ClassPill c="F" />.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr><th>Prompt</th><th>Purpose</th><th>When it fires</th></tr>
          </thead>
          <tbody>
            {M.prompts.map((p) => (
              <tr key={p.name}>
                <td className="mono">{p.name}</td>
                <td>{p.purpose}</td>
                <td className="dim">{p.trigger}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>What V1 could not close from a read-only chair</h2>
      <p>
        V1 was deliberately read-only. Any tool whose behaviour required a mutation to observe was
        left for a later vector, and every such gap is named here in full rather than quietly
        excluded. Publishing the gap list is the point: an inspection that only reports what it
        could reach is not the same as an inspection that reports both.
      </p>
      <ol>
        {M.gaps.map((g, i) => (
          <li key={i} style={{ marginBottom: 12 }}>
            <div>{g.gap}</div>
            {g.why_not_closed_in_v1 ? (
              <div className="dim" style={{ fontSize: 12, marginTop: 4 }}>
                <b>Why V1 could not close it:</b> {g.why_not_closed_in_v1}
              </div>
            ) : null}
            {g.closed_by_vector ? (
              <div className="dim" style={{ fontSize: 12, marginTop: 2 }}>
                <b>Owned by:</b> {g.closed_by_vector}
              </div>
            ) : null}
          </li>
        ))}
      </ol>

      <h2>Evidence-class glossary</h2>
      <p className="dim">
        Every claim on this page carries a class marker. The taxonomy is the same one the
        catalogue itself uses; it is included in the page rather than linked out, because a
        glossary a reader has to click to open is a glossary most readers never see.
      </p>
      <table>
        <thead><tr><th>Class</th><th>Means</th></tr></thead>
        <tbody>
          {Object.entries(EVIDENCE_CLASS_LABEL).map(([k, v]) => (
            <tr key={k}><td className="mono">{k}</td><td>{v}</td></tr>
          ))}
        </tbody>
      </table>

      <h2>What was taken out of this page</h2>
      <div className="note">
        {!M.withheld ? (
          <>No withholding record was generated, which is itself a gap — read it as unknown, not as clean.</>
        ) : !M.withheld.checked ? (
          <><b>Not checked.</b> {M.withheld.note}</>
        ) : (
          <>
            <b>
              {(M.withheld.items ?? 0) === 0
                ? "Nothing was refused."
                : `${M.withheld.items} item${M.withheld.items === 1 ? " was" : "s were"} refused.`}
            </b>{" "}
            {M.withheld.note}
          </>
        )}
        <p className="dim">
          Two different things happen to two different kinds of sensitive text, and the difference
          is deliberate. <b>Structural details</b> — an internal address, a hostname, a port, and
          the current programme-run identifier — are <b>redacted in place</b> and leave a visible{" "}
          <code>[redacted: …]</code> marker, because the sentence still means something without
          them and the reader can see that something was removed. <b>Third-party names are refused,
          never redacted</b>: the whole item is dropped, because a marker where a name used to be
          still tells you a name was there.
        </p>
      </div>

      <Cite
        c={{
          repo: M.source.repo,
          title: "UNI-LAB-Command",
          branch: M.source.branch,
          commit: M.source.commit_short,
          commit_short: M.source.commit_short,
          path: M.source.path,
          visibility: "private",
          resolvable: false,
        } as never}
      />
    </>
  );
}
