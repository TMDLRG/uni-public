// markdown.mjs — THE ONE MARKDOWN RENDERER. Plain ESM on purpose.
//
// WHY THIS FILE EXISTS AS `.mjs` AND NOT AS PART OF `md.ts`
// --------------------------------------------------------
// The reading lane makes a claim that has to be MEASURED, not asserted: **the Precise lane is the
// ingested document, rendered, with nothing added, removed, or reworded.** The only honest way to
// check that is for the gate (`generators/verify_lenses.cjs`, a CommonJS script that runs on Vercel
// after `next build`) to re-render the body from `docs.json` and compare, byte for byte, against
// what actually shipped in `out/`.
//
// If the gate re-implemented the renderer, it would prove the gate agrees WITH ITSELF — which is
// worth nothing. A heading-demotion regex that drifted in one copy and not the other would produce
// a green gate over a page that no longer matches its source. So the page and the gate must load
// the SAME BYTES. This module is that shared implementation: importable by Next (ESM) and by a CJS
// gate via `await import()`, with no build step and no duplicated logic.
//
// `app/lib/md.ts` now re-exports from here and is kept only so existing imports keep working.
//
// NOTHING ABOUT THE OUTPUT CHANGED WHEN THIS WAS EXTRACTED. That is not a hope, it is a check: the
// full `out/` export was hashed before and after (2823 files) and required to be byte-identical.
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
// This is also why the three lens panels need no special handling: each renders through here, so a
// lane contributes ZERO <h1> elements and the page's own title stays the only one.
//
// Done as a post-process on marked's output rather than a custom renderer: marked v18 emits clean
// `<hN>…</hN>` with no id attributes, so the substitution is exact, and it keeps the renderer's
// typing out of it. Highest level first so a heading is never shifted twice.
export function renderMarkdown(src) {
  const html = marked.parse(src, { gfm: true, breaks: false, async: false });
  return html
    .replace(/<(\/?)h5(\s|>)/g, "<$1h6$2")
    .replace(/<(\/?)h4(\s|>)/g, "<$1h5$2")
    .replace(/<(\/?)h3(\s|>)/g, "<$1h4$2")
    .replace(/<(\/?)h2(\s|>)/g, "<$1h3$2")
    .replace(/<(\/?)h1(\s|>)/g, "<$1h2$2");
}

// Strip a document's own leading `# Title` line, because the page renders that title as its <h1>
// and showing it twice is a defect the reader sees.
//
// LIFTED VERBATIM from `app/wiki/[...slug]/page.tsx`, where it lived inline as
// `page.body.replace(/^#\s+.+\r?\n/, "")`. It moved here for exactly one reason: the Precise-identity
// gate has to reproduce the page's transform EXACTLY, and a transform that lives inline in a React
// component cannot be imported by a gate. The regex is unchanged — deliberately, including its
// quirks: it is anchored at the start, it requires a following newline, and it therefore does not
// touch a document whose first line is not a level-1 heading.
export function stripLeadingH1(body) {
  return body.replace(/^#\s+.+\r?\n/, "");
}
