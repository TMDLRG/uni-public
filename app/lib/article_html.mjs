// article_html.mjs — the citation/quote placeholder resolution for authored articles.
//
// LIFTED VERBATIM out of `app/articles/[slug]/page.tsx`, for the same reason `markdown.mjs` exists:
// the Precise-identity gate must reproduce an article's shipped HTML EXACTLY, and it cannot import a
// `.tsx` React component. An article's body is not simply `renderMarkdown(body)` — the generator
// leaves ordered `<!--CITE:n-->` / `<!--QUOTE:n-->` placeholders that the page swaps for resolved
// blocks AFTER rendering. A gate that skipped this step would compare rendered-markdown against
// shipped-HTML, see the placeholders replaced, and report a false mismatch on all 13 articles.
//
// The escaping and markup are byte-identical to what the page emitted before the extraction; the
// full `out/` export was hashed before and after and required to be identical.

const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

export function citeHtml(c) {
  const where = `${c.path}${c.range ? ":" + c.range : ""}`;
  return (
    `<div class="cite">${esc(c.repo)} · ${esc(where)} @ ${esc(c.commit_short)} (${esc(c.branch)})` +
    ` <span class="unresolved">— source repo not public, so this citation cannot be opened</span></div>`
  );
}

export function quoteHtml(q) {
  const where = `${q.cite.path}:${q.cite.range}`;
  return (
    `<figure class="quote">` +
    `<pre><code>${esc(q.text)}</code></pre>` +
    `<figcaption>${esc(q.cite.repo)} · ${esc(where)} @ ${esc(q.cite.commit_short)}` +
    ` — <b>these are the file's own bytes</b>, read at build time. If the range moves, the build fails.` +
    `</figcaption></figure>`
  );
}

// The whole post-render step, in one place, so the page and the gate cannot disagree about it.
export function resolvePlaceholders(html, cites, quotes) {
  return html
    .replace(/<!--CITE:(\d+)-->/g, (_, i) => citeHtml(cites[Number(i)]))
    .replace(/<!--QUOTE:(\d+)-->/g, (_, i) => quoteHtml(quotes[Number(i)]));
}
