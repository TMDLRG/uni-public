import { docs } from "../lib/docs";

export const metadata = { title: "Omissions" };

/**
 * THE PAGE THAT MAKES THE REST OF THE SITE READABLE.
 *
 * A documentation site that quietly publishes a subset is indistinguishable from one that has
 * covered everything — the reader has no way to tell, and so has no reason to trust either. This
 * page removes that ambiguity by naming every document that was withheld, why, and its digest.
 *
 * The reason is always a CATEGORY, never the matched text. A refusal list that quoted what it
 * refused would republish exactly what it withheld, which is a real and easy mistake to make.
 */
export default function Omissions() {
  const byCorpus: Record<string, typeof docs.refused.items> = {};
  for (const r of docs.refused.items) (byCorpus[r.corpus] ||= []).push(r);

  const reasonCounts: Record<string, number> = {};
  for (const r of docs.refused.items) for (const x of r.reasons) reasonCounts[x] = (reasonCounts[x] || 0) + 1;

  return (
    <>
      <h1>What is not here</h1>
      <p className="lede">
        {docs.refused.count} document{docs.refused.count === 1 ? " was" : "s were"} withheld from
        this site. Each is named below with the category of the reason and its sha256.
      </p>

      <div className="note">
        <b>A refusal is not a judgement about quality.</b> Most of these are perfectly good documents
        that describe private infrastructure — internal addresses, hostnames, operator paths — and
        they stay in the private repositories where they belong. The reason is given as a category
        and never as the matched text, because a list that quoted what it refused would republish
        exactly what it withheld.
      </div>

      <h2>Why documents were refused</h2>
      <div className="grid">
        {Object.entries(reasonCounts).sort((a, b) => b[1] - a[1]).map(([reason, n]) => (
          <div className="stat" key={reason}>
            <div className="n">{n}</div>
            <div className="l">{reason.replace(/-/g, " ")}</div>
          </div>
        ))}
      </div>

      {Object.entries(byCorpus).map(([corpus, items]) => (
        <section className="card" key={corpus}>
          <h3>{docs.corpora.find((c) => c.id === corpus)?.title ?? corpus}</h3>
          <table>
            <thead>
              <tr>
                <th>Document</th>
                <th>Reason</th>
                <th>Size</th>
                <th>sha256</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.path}>
                  <td className="mono">{r.path}</td>
                  <td>
                    {r.reasons.map((x) => (
                      <span className="pill warn" key={x} style={{ marginRight: 4 }}>{x}</span>
                    ))}
                  </td>
                  <td className="mono">{(r.bytes / 1024).toFixed(1)} KB</td>
                  <td className="mono">{r.sha256}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}

      <h2>Deduplicated</h2>
      <section className="card">
        <p>
          {docs.duplicates.count} document{docs.duplicates.count === 1 ? " was" : "s were"} not
          rendered because an <b>identical</b> document had already been ingested from another
          repository — proved by sha256, never by filename. Two files with the same name and different
          contents are two documents; two files with different names and the same bytes are one.
        </p>
        <p className="dim">
          These arise because one repository is a git worktree of another on a different branch, so
          its documentation directory is largely the same directory. Publishing both copies would put
          the same page in the wiki twice under two names, which is the smallest possible version of
          the findability problem this site is built to avoid.
        </p>
        {docs.duplicates.count ? (
          <table>
            <thead>
              <tr><th>Not rendered</th><th>Identical to</th><th>Size</th><th>sha256</th></tr>
            </thead>
            <tbody>
              {docs.duplicates.items.map((d) => (
                <tr key={`${d.corpus}/${d.path}`}>
                  <td className="mono">{d.path}</td>
                  <td className="mono">{d.same_as}</td>
                  <td className="mono">{(d.bytes / 1024).toFixed(1)} KB</td>
                  <td className="mono">{d.sha256}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </section>

      <h2>Everything that IS here, accounted for</h2>
      <section className="card">
        <p>
          This page is one half of a pair. It names what was withheld; the{" "}
          <a href="/coverage/">coverage page</a> names what was kept and proves that every subsystem,
          every runnable command, every document type and every published page is either covered or
          excluded on purpose.
        </p>
        <p className="dim">
          A site that only publishes its omissions still leaves a reader unable to tell thorough from
          selective. Both halves are needed and both are computed rather than asserted.
        </p>
      </section>

      <h2>The limit of this page</h2>
      <section className="card">
        <p>
          Everything above was caught by a <b>pattern</b> — an address shape, a hostname shape, a key
          shape. No scanner recognises sensitive <b>narrative</b>. A document describing a client
          engagement in prose, naming nobody and matching no pattern, passes every check that
          produced this page.
        </p>
        <p className="dim">
          That is not hypothetical in this estate. A large archive of development transcripts was
          verified to have had its credentials redacted perfectly — zero surviving tokens across 1.74
          GB — while its narrative content was the actual exposure. Human review of new prose is
          required, and nothing here replaces it.
        </p>
      </section>
    </>
  );
}
