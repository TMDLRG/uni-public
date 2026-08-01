import { marked } from "marked";
import Link from "next/link";
import { notFound } from "next/navigation";
import articlesBundle from "../../../content/generated/articles.json";

type Cite = { repo: string; path: string; range: string | null; commit_short: string; branch: string; resolvable: boolean };
type Quote = { text: string; lang: string; cite: Cite };
type Article = { slug: string; title: string; summary: string; order: number; body: string; cites: Cite[]; quotes: Quote[] };

const articles = (articlesBundle as unknown as { articles: Article[] }).articles;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  return { title: a?.title ?? "Not found", description: a?.summary };
}

const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] as string));

function citeHtml(c: Cite) {
  const where = `${c.path}${c.range ? ":" + c.range : ""}`;
  return (
    `<div class="cite">${esc(c.repo)} · ${esc(where)} @ ${esc(c.commit_short)} (${esc(c.branch)})` +
    ` <span class="unresolved">— source repo not public, so this citation cannot be opened</span></div>`
  );
}

function quoteHtml(q: Quote) {
  const where = `${q.cite.path}:${q.cite.range}`;
  return (
    `<figure class="quote">` +
    `<pre><code>${esc(q.text)}</code></pre>` +
    `<figcaption>${esc(q.cite.repo)} · ${esc(where)} @ ${esc(q.cite.commit_short)}` +
    ` — <b>these are the file's own bytes</b>, read at build time. If the range moves, the build fails.` +
    `</figcaption></figure>`
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();

  let html = await marked.parse(a.body, { gfm: true, breaks: false });
  // The generator left ordered placeholders where each marker was; swap in the resolved blocks.
  html = html.replace(/<!--CITE:(\d+)-->/g, (_, i) => citeHtml(a.cites[Number(i)]));
  html = html.replace(/<!--QUOTE:(\d+)-->/g, (_, i) => quoteHtml(a.quotes[Number(i)]));

  const others = articles.filter((x) => x.slug !== a.slug);

  return (
    <article>
      <p className="dim">
        <Link href="/">Overview</Link> · Written article
      </p>
      <h1>{a.title}</h1>
      {a.summary ? <p className="lede">{a.summary}</p> : null}

      <div className="note">
        <b>This page is written, not generated.</b> Everything else on this site is a document from
        the repositories rendered as it is written. This one is prose <i>about</i> code — so every
        citation and every quoted block in it is resolved against the real file at the real commit
        when the site is built, and <b>a citation that no longer resolves fails the build</b> rather
        than becoming a stale line number nobody notices.
      </div>

      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

      {others.length ? (
        <nav className="pager" style={{ flexWrap: "wrap", gap: 12 }}>
          {others.map((o) => (
            <Link key={o.slug} href={`/articles/${o.slug}/`}>
              {o.title} →
            </Link>
          ))}
        </nav>
      ) : null}
    </article>
  );
}
