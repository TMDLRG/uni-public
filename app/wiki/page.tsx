import Link from "next/link";
import { docs, pagesInCorpus } from "../lib/docs";

export const metadata = { title: "Wiki" };

export default function WikiIndex() {
  const total = docs.pages.length;
  const kb = Math.round(docs.pages.reduce((n, p) => n + p.bytes, 0) / 1024);

  return (
    <>
      <h1>The wiki</h1>
      <p className="lede">
        {total} documents from the estate&rsquo;s own repositories, rendered as they are written —
        {" "}{kb.toLocaleString()} KB of source prose, not summaries of it.
      </p>

      <div className="note">
        <b>{docs.refused.count} documents were refused</b> and are not here. They are listed, with
        the category of the reason and their sha256, on the{" "}
        <Link href="/omissions/">omissions page</Link>. Most describe private infrastructure and
        belong in the private repositories. Nothing is dropped in silence — a reader can see the
        shape of what is withheld, which is the difference between curation and concealment.
      </div>

      {docs.corpora.map((c) => {
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
