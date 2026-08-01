import { marked } from "marked";

// Render markdown to HTML, DEMOTING every heading one level (h1→h2 … h5→h6).
//
// Why: both the wiki and the article pages render a page title as the sole <h1>, then embed a source
// document whose own top-level headings are `#` — which `marked` renders as more <h1>s. Two or three
// <h1>s per page is a real accessibility defect (a screen-reader user relies on one document title),
// and the a11y gate fails the build on it. Demoting one level makes the embedded document start at
// <h2>, correctly subordinate to the page title, WITHOUT changing any heading text — the words and
// the nesting are identical, only the level shifts. Nothing is lost; the structure is made honest.
//
// Done as a post-process on marked's output rather than a custom renderer: marked v18 emits clean
// `<hN>…</hN>` with no id attributes, so the substitution is exact, and it keeps the renderer's
// typing out of it. Highest level first so a heading is never shifted twice.
export function renderMarkdown(src: string): string {
  const html = marked.parse(src, { gfm: true, breaks: false, async: false }) as string;
  return html
    .replace(/<(\/?)h5(\s|>)/g, "<$1h6$2")
    .replace(/<(\/?)h4(\s|>)/g, "<$1h5$2")
    .replace(/<(\/?)h3(\s|>)/g, "<$1h4$2")
    .replace(/<(\/?)h2(\s|>)/g, "<$1h3$2")
    .replace(/<(\/?)h1(\s|>)/g, "<$1h2$2");
}
