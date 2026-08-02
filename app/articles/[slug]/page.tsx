import { renderMarkdown } from '../../lib/md';
// Plain ESM sibling, shared verbatim with generators/verify_lenses.cjs so the page and the gate
// cannot disagree about how an article's HTML is assembled.
import { resolvePlaceholders } from '../../lib/article_html.mjs';
import { createHash } from "crypto";
import Link from "next/link";
import { ReadingLane } from "../../components/ReadingLane";
import { lensFor, orientationFor } from "../../lib/lenses";
import { notFound } from "next/navigation";
import articlesBundle from "../../../content/generated/articles.json";

type Cite = { repo: string; path: string; range: string | null; commit_short: string; branch: string; resolvable: boolean; public_repo?: string; public_commit?: string; public_commit_short?: string };
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

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();

  // Render, then swap the generator's ordered placeholders for the resolved citation blocks.
  // BOTH steps come from `lib/` rather than living here, because the Precise-identity gate re-runs
  // this exact pair and compares against the shipped bytes. An article's HTML is not just rendered
  // markdown — miss the placeholder pass and the gate reports a false mismatch on all 13 articles.
  const html = resolvePlaceholders(renderMarkdown(a.body), a.cites, a.quotes);
  const bodySha = createHash("sha256").update(a.body, "utf8").digest("hex").slice(0, 16);

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

      <ReadingLane
        preciseHtml={html}
        preciseSha256={bodySha}
        preciseBodySha256={bodySha}
        lens={lensFor("article", a.slug)}
        orientation={orientationFor("articles")}
        sourceStamp={
          <p className="lane__stamp lane__stamp--source">
            <b>This is the article as written.</b> Every citation and quoted block in it is resolved
            against the real file at the real commit when the site is built.
          </p>
        }
      />

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
