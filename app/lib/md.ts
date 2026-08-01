// md.ts — a typed re-export. The implementation moved to `markdown.mjs`.
//
// It moved because the reading-lane gate (`generators/verify_lenses.cjs`) must re-render a document
// body with THE SAME CODE the page used, in order to prove the Precise lane is that document
// unaltered. A CJS gate cannot import a `.ts` module without a build step; it can `await import()` a
// `.mjs` one. Two copies of a heading-demotion regex would let the gate go green while the page
// drifted, which is the exact failure this whole lane is built to make impossible.
//
// This file is kept so existing imports (`from "../../lib/md"`) keep working unchanged.
import { renderMarkdown as _render, stripLeadingH1 as _strip } from "./markdown.mjs";

export const renderMarkdown: (src: string) => string = _render;
export const stripLeadingH1: (body: string) => string = _strip;
