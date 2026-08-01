import { marked } from "marked";
import Link from "next/link";
import { notFound } from "next/navigation";
import { docs, pageBySlug, pagesInCorpus } from "../../lib/docs";
import { Cite } from "../../components/Cite";

/**
 * Every ingested document becomes a real page here — not a title in an index.
 *
 * Markdown is rendered AT BUILD TIME by `marked`, so the export contains finished HTML and the
 * browser fetches nothing to read a chapter. That matters beyond speed: a documentation site that
 * pulls its own content at runtime has a network dependency it did not declare, and this site's
 * whole claim is that what shipped is what was checked.
 */

export function generateStaticParams() {
  return docs.pages.map((p) => ({ slug: p.slug.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = pageBySlug(slug.join("/"));
  return { title: page ? page.title : "Not found" };
}

export default async function WikiPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = pageBySlug(slug.join("/"));
  if (!page) notFound();

  const corpus = docs.corpora.find((c) => c.id === page.corpus);
  const siblings = pagesInCorpus(page.corpus);
  const idx = siblings.findIndex((p) => p.slug === page.slug);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  // The H1 is rendered by the page header below, so strip the leading one from the body to avoid
  // showing the title twice.
  const body = page.body.replace(/^#\s+.+\r?\n/, "");
  const html = await marked.parse(body, { gfm: true, breaks: false });

  return (
    <article>
      <p className="dim">
        <Link href="/wiki/">Wiki</Link>
        {corpus ? <> · <Link href={`/wiki/#${corpus.id}`}>{corpus.title}</Link></> : null}
      </p>

      <h1>{page.title}</h1>

      <Cite c={page.citation} />

      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

      <nav className="pager">
        {prev ? <Link href={`/wiki/${prev.slug}/`}>← {prev.title}</Link> : <span />}
        {next ? <Link href={`/wiki/${next.slug}/`}>{next.title} →</Link> : <span />}
      </nav>

      <p className="dim" style={{ marginTop: 26 }}>
        This page is the document itself, rendered from the repository at the commit above —{" "}
        <code>sha256 {page.sha256}</code>. It is not a summary of that document and nothing was
        rewritten for the web.
      </p>
    </article>
  );
}
