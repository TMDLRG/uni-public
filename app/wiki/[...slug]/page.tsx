import { createHash } from "crypto";
import { renderMarkdown, stripLeadingH1 } from '../../lib/md';
import Link from "next/link";
import { notFound } from "next/navigation";
import { docs, pageBySlug, pagesInCorpus } from "../../lib/docs";
import { Cite } from "../../components/Cite";
import { ReadingLane } from "../../components/ReadingLane";
import { lensFor, orientationFor } from "../../lib/lenses";

/**
 * Every ingested document becomes a real page here — not a title in an index.
 *
 * Markdown is rendered AT BUILD TIME by `marked`, so the export contains finished HTML and the
 * browser fetches nothing to read a chapter. That matters beyond speed: a documentation site that
 * pulls its own content at runtime has a network dependency it did not declare, and this site's
 * whole claim is that what shipped is what was checked.
 */

export function generateStaticParams() {
  const params = docs.pages.map((p) => ({ slug: p.slug.split("/") }));
  // A page whose slug ends in /index ALSO answers at its parent path. Not cosmetics: the apex
  // domain proxies this site with cleanUrls on, which 308s any …/index/ URL to the parent BEFORE
  // its proxy rewrite fires — so without this alias, exactly those pages 404 for every reader on
  // the apex. Measured 2026-08-30: /wiki/constants/index/ was the one page that shape caught.
  // The alias set is ENUMERATED from the corpus (every /index slug, not a hand-picked one), and a
  // parent that is already a real page is never shadowed.
  const taken = new Set(docs.pages.map((p) => p.slug));
  for (const p of docs.pages) {
    if (p.slug.endsWith("/index")) {
      const parent = p.slug.slice(0, -"/index".length);
      if (parent && !taken.has(parent)) params.push({ slug: parent.split("/") });
    }
  }
  return params;
}

/** Resolve a slug to its page, accepting the parent-of-/index alias emitted above. */
function pageForSlug(joined: string) {
  return pageBySlug(joined) || pageBySlug(`${joined}/index`);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = pageForSlug(slug.join("/"));
  return { title: page ? page.title : "Not found" };
}

export default async function WikiPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = pageForSlug(slug.join("/"));
  if (!page) notFound();

  const corpus = docs.corpora.find((c) => c.id === page.corpus);
  const siblings = pagesInCorpus(page.corpus);
  const idx = siblings.findIndex((p) => p.slug === page.slug);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  // The H1 is rendered by the page header below, so strip the leading one from the body to avoid
  // showing the title twice. Both steps come from `lib/md` — NOT inlined here — because the
  // Precise-identity gate re-runs this exact pair over `docs.json` and requires the result to match
  // the shipped bytes. A transform that lives inline in a component cannot be imported by a gate,
  // and an unverifiable transform is how "this page is the document" becomes an unchecked claim.
  const body = stripLeadingH1(page.body);
  const html = renderMarkdown(body);
  // The digest of the PUBLISHED bytes, distinct from page.sha256 (which ingest_docs computes before
  // redaction). Both go into the lane's sentinel so a re-redaction cannot slip past unnoticed.
  const bodySha = createHash("sha256").update(page.body, "utf8").digest("hex").slice(0, 16);

  return (
    <article>
      <p className="dim">
        <Link href="/wiki/">Wiki</Link>
        {corpus ? <> · <Link href={`/wiki/#${corpus.id}`}>{corpus.title}</Link></> : null}
      </p>

      <h1>{page.title}</h1>

      <Cite c={page.citation} />

      {page.redactions ? (
        <div className="note">
          <b>
            {page.redactions} value{page.redactions === 1 ? " was" : "s were"} removed from this page.
          </b>{" "}
          Each one is marked in place as{" "}
          <code>[redacted: category]</code> — {" "}
          {Object.entries(page.redaction_counts ?? {})
            .map(([k, n]) => `${n} ${k.replace(/-/g, " ")}`)
            .join(", ")}
          . Nothing else was altered. The document is otherwise exactly as it is written in the
          repository, and the sha256 below is of the <i>original</i>, so what was ingested stays
          checkable.
        </div>
      ) : null}

      <ReadingLane
        preciseHtml={html}
        preciseSha256={page.sha256}
        preciseBodySha256={bodySha}
        lens={lensFor("wiki", page.slug)}
        orientation={orientationFor(page.corpus)}
        sourceStamp={
          <p className="lane__stamp lane__stamp--source">
            <b>This is the document.</b> Rendered from the repository at the commit above, with
            nothing rewritten for the web. A gate re-renders it on every deploy and fails the build
            if a single byte differs.
          </p>
        }
        sourceNote={
          <p className="dim" style={{ marginTop: 26 }}>
            <code>sha256 {page.sha256}</code> — of the <i>original</i> file, so what was ingested
            stays checkable.
          </p>
        }
      />

      <nav className="pager">
        {prev ? <Link href={`/wiki/${prev.slug}/`}>← {prev.title}</Link> : <span />}
        {next ? <Link href={`/wiki/${next.slug}/`}>{next.title} →</Link> : <span />}
      </nav>
    </article>
  );
}
