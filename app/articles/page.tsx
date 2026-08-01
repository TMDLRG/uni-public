import Link from "next/link";
import articlesBundle from "../../content/generated/articles.json";

type Article = { slug: string; title: string; summary: string; order: number; cites: unknown[]; quotes: unknown[] };
const articles = (articlesBundle as unknown as { articles: Article[] }).articles;

export const metadata = { title: "Articles" };

export default function ArticlesIndex() {
  const cites = articles.reduce((n, a) => n + a.cites.length, 0);
  const quotes = articles.reduce((n, a) => n + a.quotes.length, 0);

  return (
    <>
      <h1>Articles</h1>
      <p className="lede">
        {articles.length} written explanations of the system, in the order they should be read. These
        are the only pages on this site that are authored rather than published.
      </p>

      <div className="note">
        <b>Why these are different, and why that is risky.</b> Every other page here is a document from
        a repository, rendered as written — it cannot be wrong about itself. These are prose{" "}
        <i>about</i> code, which goes stale the moment the code moves. So all {cites} citations and{" "}
        {quotes} quoted blocks are resolved against the real files at their real commits when this site
        is built, and <b>a citation that no longer resolves fails the build</b>. A quoted block is the
        file&rsquo;s own bytes, not a transcription.
      </div>

      {articles.map((a) => (
        <section className="card" key={a.slug}>
          <h3>
            <Link href={`/articles/${a.slug}/`}>{a.title}</Link>
          </h3>
          <p>{a.summary}</p>
          <p className="dim">
            {a.cites.length} citation{a.cites.length === 1 ? "" : "s"}
            {a.quotes.length ? ` · ${a.quotes.length} quoted source block${a.quotes.length === 1 ? "" : "s"}` : ""}
          </p>
        </section>
      ))}

      <h2>What these articles are careful about</h2>
      <section className="card">
        <p>
          Each one ends with a section saying what is <b>not</b> established. That is not modesty — it
          is the load-bearing part. The estate&rsquo;s own contract holds that passing software tests
          is necessary and nowhere near sufficient for a claim about biology, intelligence, or
          experience, and that observation, reconstruction and simulation may never be relabelled as
          one another.
        </p>
        <p className="dim">
          Where the articles record a gap — a subsystem with no diagram, a surface with no canonical
          document, a component with thin tests — that gap is real and was measured, not softened.
        </p>
      </section>
    </>
  );
}
