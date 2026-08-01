import Link from "next/link";
import { docs, pagesInCorpus } from "../lib/docs";

export const metadata = { title: "Wiki" };

export default function WikiIndex() {
  const main = docs.corpora.filter((c) => !c.off_main_nav).map((c) => c.id);
  const shown = docs.pages.filter((p) => main.includes(p.corpus));
  const total = shown.length;
  const kb = Math.round(shown.reduce((n, p) => n + p.bytes, 0) / 1024);
  const evidence = docs.corpora.find((c) => c.off_main_nav);
  const redacted = shown.filter((p) => p.redactions).length;

  return (
    <>
      <h1>The wiki</h1>
      <p className="lede">
        {total} documents from the estate&rsquo;s own repositories, rendered as they are written —
        {" "}{kb.toLocaleString()} KB of source prose, not summaries of it.
      </p>

      <div className="note">
        <b>{docs.refused.count} documents were refused</b> and are not here, and{" "}
        <b>{redacted} carry redactions</b>. Both are accounted for on the{" "}
        <Link href="/omissions/">omissions page</Link> — refusals with the category of the reason and
        their sha256, redactions with a count. Most refusals describe private infrastructure and
        belong in the private repositories. Nothing is dropped in silence: a reader can see the shape
        of what is withheld, which is the difference between curation and concealment.
      </div>

      {evidence && evidence.available ? (
        <div className="note">
          <b>The {evidence.pages} receipts and verdicts are in their own section.</b> They are the
          dated record that this method was actually carried out — including a verdict that came back
          FAIL. They are published, at <Link href="/evidence/">Evidence &amp; Verdicts</Link>, but
          kept out of the list below: {evidence.pages} dated evidence stubs in the main index would
          bury the documents that explain the system.
        </div>
      ) : null}

      {docs.corpora.filter((c) => !c.off_main_nav).map((c) => {
        const pages = pagesInCorpus(c.id);
        return (
          <section className="card" key={c.id} id={c.id}>
            <h3>{c.title}</h3>
            <p>{c.blurb}</p>
            {!c.available ? (
              <p className="dim">
                <span className="pill warn">unavailable</span> {c.reason}
              </p>
            ) : (
              <>
                <p className="dim">
                  {c.pages} page{c.pages === 1 ? "" : "s"}
                  {c.refused > 0 ? ` · ${c.refused} refused` : " · none refused"} · from{" "}
                  <code>{c.branch}</code> at <code>{c.commit_short}</code>
                </p>
                {c.exclude_reason ? <p className="dim"><b>Scope note:</b> {c.exclude_reason}</p> : null}
                <ul className="toc">
                  {pages.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/wiki/${p.slug}/`}>{p.title}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        );
      })}
    </>
  );
}
