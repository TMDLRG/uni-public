import Link from "next/link";
import { docs, pageBySlug } from "../lib/docs";
import { curation } from "../lib/coverage";

export const metadata = { title: "Wiki" };

/**
 * GROUPED BY INTENT, NOT BY ALPHABET.
 *
 * This page used to render each corpus as one flat list, and the largest of those lists was 85
 * documents with no headings and no route through it. Every page was reachable and none of it was
 * findable — two different properties, of which only the first had ever been checked.
 *
 * The routes come from content/curation.json, which is generated with no default bucket: a page that
 * matches no route fails the build. So this page cannot quietly stop covering something.
 *
 * The alphabetical view is kept, at the bottom, as a secondary index. It is a fine tool once you know
 * what you are looking for and a terrible one before that.
 */
export default function WikiIndex() {
  const evidence = docs.corpora.find((c) => c.off_main_nav);
  const redacted = docs.pages.filter((p) => p.redactions).length;
  const kb = Math.round(docs.pages.reduce((n, p) => n + p.bytes, 0) / 1024);

  return (
    <>
      <h1>The wiki</h1>
      <p className="lede">
        {docs.pages.length} documents from the estate&rsquo;s own repositories, rendered as they are
        written — {kb.toLocaleString()} KB of source prose, not summaries of it, arranged by what you
        might be trying to do.
      </p>

      <div className="note">
        <b>Start with a question, not a corpus.</b> These {curation.groups.length} routes are the
        answer to the way this page used to work: one alphabetical list per repository, 85 entries
        long. Every document below belongs to exactly one route, and a new document that fits none of
        them fails the build rather than landing in a list nobody reads to the bottom of.
      </div>

      <div className="note">
        <b>{docs.refused.count} documents were refused</b>, <b>{docs.duplicates.count} were
        deduplicated</b> against an identical copy, and <b>{redacted} carry visible redactions</b>. All
        three are accounted for on the <Link href="/omissions/">omissions page</Link>. Nothing is
        dropped in silence: a reader can see the shape of what is withheld, which is the difference
        between curation and concealment.
      </div>

      {evidence && evidence.available ? (
        <div className="note">
          <b>The {evidence.pages} receipts and verdicts are in their own section.</b> They are the
          dated record that this method was carried out — including a verdict that came back FAIL.
          Published, at <Link href="/evidence/">Evidence &amp; Verdicts</Link>, and kept out of the
          routes below so they do not bury the documents that explain the system.
        </div>
      ) : null}

      <h2>Routes</h2>
      <div className="card">
        <ul className="toc">
          {curation.groups.map((g) => (
            <li key={g.id}>
              <a href={`#${g.id}`}>{g.title}</a>{" "}
              <span className="dim">· {g.pages.length}</span>
            </li>
          ))}
        </ul>
      </div>

      {curation.groups.map((g) => (
        <section className="card" key={g.id} id={g.id}>
          <h3>{g.title}</h3>
          <p>{g.intent}</p>
          <p className="dim">{g.pages.length} document{g.pages.length === 1 ? "" : "s"}</p>
          <ul className="toc">
            {g.pages.map((slug) => {
              const p = pageBySlug(slug);
              if (!p) return null;
              return (
                <li key={slug}>
                  <Link href={`/wiki/${slug}/`}>{p.title}</Link>
                  {p.redactions ? <span className="dim"> · {p.redactions} redacted</span> : null}
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      {curation.uncategorised.length ? (
        <section className="card" id="uncategorised">
          <h3>In no route</h3>
          <p>
            Declared rather than dropped. A page with no route is a real editorial decision and it is
            published as one.
          </p>
          <ul className="toc">
            {curation.uncategorised.map((u) => (
              <li key={u.slug}>
                <Link href={`/wiki/${u.slug}/`}>{u.slug}</Link>{" "}
                <span className="dim">— {u.reason}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <h2 id="by-corpus">By repository</h2>
      <p>
        The secondary view: the same documents, grouped by where they came from and listed
        alphabetically. Useful once you know what you are looking for; this is what the whole page used
        to be.
      </p>
      {docs.corpora.filter((c) => !c.off_main_nav).map((c) => (
        <section className="card" key={c.id} id={c.id}>
          <h3>{c.title}</h3>
          <p>{c.blurb}</p>
          {!c.available ? (
            <p className="dim"><span className="pill warn">unavailable</span> {c.reason}</p>
          ) : (
            <>
              <p className="dim">
                {c.pages} page{c.pages === 1 ? "" : "s"}
                {c.refused > 0 ? ` · ${c.refused} refused` : " · none refused"}
                {c.deduped ? ` · ${c.deduped} duplicate` : ""} · from <code>{c.branch}</code> at{" "}
                <code>{c.commit_short}</code>
              </p>
              {c.exclude_reason ? <p className="dim"><b>Scope note:</b> {c.exclude_reason}</p> : null}
              <ul className="toc">
                {docs.pages.filter((p) => p.corpus === c.id).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/wiki/${p.slug}/`}>{p.title}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      ))}
    </>
  );
}
