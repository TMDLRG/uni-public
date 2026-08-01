import Link from "next/link";
import { coverage, manifest, curation } from "../lib/coverage";

export const metadata = { title: "Coverage" };

/**
 * THE SITE PUBLISHING ITS OWN COMPLETENESS RATHER THAN CLAIMING IT.
 *
 * Every number here is written by the gate that enforces it — the same evaluation, the same run. A
 * page that recomputed its own figure would be a second measurement free to disagree with the one
 * that actually holds, and then the site would have two completeness numbers and no way to say which
 * governs.
 *
 * The important column is `denominator`. Two axes take theirs from the world and two are editorial,
 * and those are not equally strong evidence. Printing them side by side without saying which is which
 * would be the more flattering presentation and the less honest one.
 */
export default function Coverage() {
  const excluded = manifest.entry_points.filter((e) => e.excluded);
  const totals = coverage.axes.reduce(
    (a, x) => ({ total: a.total + x.total, covered: a.covered + x.covered, excluded: a.excluded + x.excluded }),
    { total: 0, covered: 0, excluded: 0 }
  );

  return (
    <>
      <h1>Coverage</h1>
      <p className="lede">
        Every subsystem, every runnable command, every document type and every published page is either{" "}
        <b>covered</b> or <b>explicitly excluded with a reason</b>. Covered plus declared-excluded is
        the whole; anything that is neither fails the build by name.
      </p>

      <div className="note">
        <b>This is a gate, not a claim.</b> The site once published {"304"} correct documents and called
        itself a user guide — every page reachable, none of it findable, the largest section 85
        documents in one alphabetical list. &ldquo;100% coverage&rdquo; means nothing without a
        denominator, so two of the four denominators below are taken from the world rather than from a
        list somebody wrote.
      </div>

      <div className="note">
        <b>The scope of &ldquo;discovered&rdquo;, stated exactly — because it was overstated here
        until 2026-08-01.</b> This box used to say <i>&ldquo;add a server to the estate and this table
        goes red naming it.&rdquo;</i> That is not true of the estate; it is true of four directories.
        <p>
          Discovery walks <code>lib/mix/tasks</code>, <code>viewer</code> and <code>scripts</code> in
          the colony repository, plus the package manifests of two others. A forensic review found a
          real server outside those roots — <code>production/guest/pubgate/server.cjs</code>, which
          binds a port on all interfaces — that is in neither the covered list nor the excluded one,
          and 52 runnable scripts under <code>runs/</code> against the 16 under <code>scripts/</code>
          that form the denominator. The table below is honest about those four roots and says nothing
          about the rest of the estate.
        </p>
        <p className="dim">
          The mutation that was supposed to prove the claim could not have: it appended a fabricated
          entry to the discovery <i>result</i> rather than putting a file on <i>disk</i>, so it proved
          the axis reacts to a longer list and not that discovery finds a new file. It now writes a
          real file into a real walk root. A proof-of-bite that cannot bite is the defect this whole
          site is organised against, and it was sitting inside the check that says so.
        </p>
      </div>

      <h2>The four axes</h2>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Axis</th>
              <th>Denominator</th>
              <th style={{ textAlign: "right" }}>Total</th>
              <th style={{ textAlign: "right" }}>Covered</th>
              <th style={{ textAlign: "right" }}>Excluded</th>
              <th style={{ textAlign: "right" }}>Gap</th>
            </tr>
          </thead>
          <tbody>
            {coverage.axes.map((a) => {
              const gap = a.total - a.covered - a.excluded;
              return (
                <tr key={a.id}>
                  <td>{a.label}</td>
                  <td>
                    <span className={`pill ${a.denominator === "discovered" ? "" : "warn"}`}>
                      {a.denominator}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>{a.total}</td>
                  <td style={{ textAlign: "right" }}>{a.covered}</td>
                  <td style={{ textAlign: "right" }}>{a.excluded}</td>
                  <td style={{ textAlign: "right" }}>{gap}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={2}><b>All axes</b></td>
              <td style={{ textAlign: "right" }}><b>{totals.total}</b></td>
              <td style={{ textAlign: "right" }}><b>{totals.covered}</b></td>
              <td style={{ textAlign: "right" }}><b>{totals.excluded}</b></td>
              <td style={{ textAlign: "right" }}>
                <b>{totals.total - totals.covered - totals.excluded}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="dim">
        <b>Discovered</b> means the denominator is measured from the source repositories or from the
        ingest, so it grows on its own. <b>Declared</b> means the list is editorial — a shorter list
        would score the same, and saying so is the only defence against that.
      </p>

      <h2>The ratchet: 100% cannot collapse and cannot reduce</h2>
      <p>
        A percentage is the most collapsible statistic there is. Covered ÷ total stays at exactly
        1.0 under two completely different disasters, and the table above is blind to both because in
        each case the sum still closes and the gap is still zero:
      </p>
      <div className="card">
        <p>
          <b>Collapse</b> — the denominator shrinks. A repository moves, a discovery rule is tidied
          away, a corpus stops resolving. 100% of a smaller world, reported identically.
        </p>
        <p>
          <b>Reduction</b> — work moves from covered into excluded. Every exclusion carries a reason
          and the arithmetic still closes, so the gate is satisfied while the guides document less
          with each change.
        </p>
      </div>
      <p>
        So every measured quantity is also held against a <b>committed floor</b>, and the floor is
        compared against its own previous version in version control. Lowering one is allowed;
        lowering one <i>silently</i> is not — it requires a recorded amendment saying what moved and
        why. A floor that can be edited down in the same change that breaches it is not a floor.
      </p>

      <div className="grid">
        <div className="stat">
          <div className="n">{coverage.ratchet.bounds}</div>
          <div className="l">committed bounds</div>
        </div>
        <div className="stat">
          <div className="n">{coverage.ratchet.held}</div>
          <div className="l">held</div>
        </div>
        <div className="stat">
          <div className="n">{coverage.ratchet.breached}</div>
          <div className="l">breached</div>
        </div>
        <div className="stat">
          <div className="n">{coverage.ratchet.at_the_line}</div>
          <div className="l">exactly at the line</div>
        </div>
      </div>

      <p className="dim">
        Growth is free and needs no ceremony — this estate adds servers and documents constantly, and
        a gate that fights ordinary work gets switched off. Only going <i>backwards</i> costs
        anything.
      </p>

      {coverage.ratchet.amendments.length ? (
        <section className="card">
          <h3>Amendments</h3>
          <p>Every time a floor was deliberately lowered, with the reason given at the time.</p>
          <table>
            <thead><tr><th>Date</th><th>What</th><th>Why</th></tr></thead>
            <tbody>
              {coverage.ratchet.amendments.map((a, i) => (
                <tr key={i}><td className="mono">{a.date}</td><td>{a.what}</td><td>{a.why}</td></tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <p className="dim">
          <b>No amendments.</b> No floor has been lowered since the baseline was established, so every
          figure on this page is at or above where it started.
        </p>
      )}

      <details className="card">
        <summary>All {coverage.ratchet.bounds} bounds, and the distance to each</summary>
        <table>
          <thead>
            <tr><th>Bound</th><th>Kind</th><th style={{ textAlign: "right" }}>Now</th><th style={{ textAlign: "right" }}>Limit</th><th style={{ textAlign: "right" }}>Margin</th></tr>
          </thead>
          <tbody>
            {coverage.ratchet.rows.map((r) => (
              <tr key={r.label}>
                <td>{r.label}</td>
                <td className="dim">{r.kind === "min" ? "floor" : "ceiling"}</td>
                <td style={{ textAlign: "right" }} className="mono">{r.now}</td>
                <td style={{ textAlign: "right" }} className="mono">{r.bound}</td>
                <td style={{ textAlign: "right" }} className="mono">
                  {r.kind === "min" ? r.now - r.bound : r.bound - r.now}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="dim">
          A margin of zero is not a failure — it means the quantity is sitting exactly on its floor,
          which is where a freshly-measured baseline puts most things. It does mean the next
          reduction there fails the build.
        </p>
      </details>

      <h2>Subsystems, in two layers each</h2>
      <p>
        Understanding without the ability to run something does not transfer; the ability to run
        something without understanding it does not survive the first problem. So each subsystem is
        documented twice.
      </p>
      <div className="card">
        <table>
          <thead>
            <tr><th>Subsystem</th><th>Understand it</th><th>Run it yourself</th></tr>
          </thead>
          <tbody>
            {manifest.subsystems.map((s) => (
              <tr key={s.id}>
                <td>{s.label}</td>
                <td><Link href={`/articles/${s.understand}/`}>{s.understand}</Link></td>
                <td><Link href={`/articles/${s.run_it}/`}>{s.run_it}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>The eight document types</h2>
      <div className="card">
        <table>
          <thead>
            <tr><th>Type</th><th>Satisfied by</th><th>Reachable from</th></tr>
          </thead>
          <tbody>
            {manifest.document_types.map((t) => (
              <tr key={t.id}>
                <td>{t.label}</td>
                <td>
                  {t.articles
                    ? t.articles.map((a, i) => (
                        <span key={a}>
                          {i ? ", " : ""}
                          <Link href={`/articles/${a}/`}>{a}</Link>
                        </span>
                      ))
                    : t.curated_group
                    ? <>the <code>{t.curated_group}</code> route, at least {t.min_pages} pages</>
                    : <>at least {t.min_citations} resolved source citations</>}
                </td>
                <td><Link href={t.reachable_from}>{t.reachable_from}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="dim">
        Reachability is checked against the navigation component that actually renders the site, not
        against a copy of it kept here. A declared copy could certify a route the site no longer has.
      </p>

      <h2>What is deliberately excluded, and why</h2>
      <p>
        {excluded.length} runnable entry point{excluded.length === 1 ? " is" : "s are"} documented
        nowhere on this site. Each is named with its reason, because an exclusion nobody can see is an
        omission with better manners.
      </p>
      {excluded.map((e) => (
        <section className="card" key={e.id}>
          <h3><code>{e.command}</code></h3>
          <p className="dim">{e.reason}</p>
        </section>
      ))}

      <h2>Routes through the wiki</h2>
      <p>
        {curation.groups.length} routes covering{" "}
        {curation.groups.reduce((n, g) => n + g.pages.length, 0)} published pages. Every page belongs to
        a route; there is no default bucket, and a document that matches none of them fails the build
        rather than landing nowhere.
      </p>
      <div className="card">
        <ul className="toc">
          {curation.groups.map((g) => (
            <li key={g.id}>
              <Link href={`/wiki/#${g.id}`}>{g.title}</Link>{" "}
              <span className="dim">· {g.pages.length}</span>
            </li>
          ))}
        </ul>
      </div>

      <h2>What this table cannot tell you</h2>
      <section className="card">
        <p>
          <b>It cannot tell you a guide is followable.</b> Coverage proves nothing is unaccounted for.
          It says nothing about whether the quick start works on a machine that is not the author&rsquo;s,
          whether the ordering makes sense to somebody meeting this for the first time, or whether an
          explanation actually explains. Only a stranger following it can answer that, and no gate
          substitutes for one.
        </p>
        <p className="dim">
          It also cannot see sensitive narrative, which is the other thing no scanner here can do. Both
          limits are printed rather than left to be discovered.
        </p>
      </section>
    </>
  );
}
