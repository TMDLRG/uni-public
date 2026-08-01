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
        list somebody wrote: add a server to the estate, or a document, and this table goes red naming
        it until somebody decides where a reader should meet it.
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
