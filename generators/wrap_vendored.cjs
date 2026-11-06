"use strict";
/**
 * wrap_vendored.cjs — the ONE reproducible transform that gives every vendored full-screen lab and
 * room the SAME canonical navigation the Next routes and the apex shell carry, WITHOUT editing a
 * single byte of the pinned lab content.
 *
 * THE REFRAMED INTEGRITY CONTRACT
 *   build_labs.cjs / build_rooms.cjs no longer claim "served file == pinned source bytes" — a
 *   wrapped page is not its source, and pretending otherwise would be the lie this whole site exists
 *   to avoid. They claim the STRONGER, still-fully-verifiable statement:
 *
 *       served_file  ==  wrap( git show <pin>:<src> , content/vendored/nav-snippet.html )
 *
 *   byte-for-byte. The served bytes are a PURE FUNCTION of two pinned inputs — the lab at its
 *   workbench pin, the nav snippet at its Precision pin — and this published transform. No hand-
 *   edited bytes exist anywhere: the served copy is GENERATED, never edited, and anyone can recompute
 *   it from the two commits. The content pin NEVER moves to change the nav; only the nav pin does.
 *
 * ANALYTICS-FREE BY CONSTRUCTION
 *   The injected region is the vendored snippet VERBATIM. That snippet is self-contained — inline
 *   <style> + inline <script>, zero external requests, no analytics, no beacon, no measure-family.js
 *   — so a wrapped lab keeps the "no account, no server, no analytics, CPU only; runs entirely in
 *   your browser" promise the /labs page makes. verify_nav_parity.cjs re-proves that the injected
 *   region is byte-identical to the vendored snippet and that the snippet carries no external reference.
 *
 * THE INJECTION is exactly one insertion: the whole snippet block at the start of the page's body
 * (the anchor is chosen per document — see wrap() below; the full-document labs inject after <body>,
 * the loose walk-in rooms after their head <style>). The nav is position:sticky;top:0, so it rests
 * at the top and the page's own
 * content flows below it. Every vendored page is a scrollable document whose internal absolute
 * positioning is scoped to its own relatively-positioned containers (verified: none locks html/body
 * to the viewport), so nothing shifts out of place — the classroom's pixel-measured hotspots stay
 * aligned because they are positioned against .room, which simply flows below the nav.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const SNIPPET_PATH = path.join(__dirname, "..", "content", "vendored", "nav-snippet.html");

// A distinctive run from the snippet's own opening comment. Its presence in a file means that file
// is ALREADY wrapped — wrap() refuses to wrap twice, which makes a double-injection impossible and
// detectable rather than silent.
const SNIPPET_SENTINEL = "UNI canonical nav snippet";

const sha256 = (buf) => crypto.createHash("sha256").update(buf).digest("hex");

function loadSnippet() {
  if (!fs.existsSync(SNIPPET_PATH)) {
    throw new Error(`nav snippet missing at ${SNIPPET_PATH} — run generators/build_nav.cjs first`);
  }
  const buf = fs.readFileSync(SNIPPET_PATH);
  if (!buf.toString("utf8").includes(SNIPPET_SENTINEL)) {
    throw new Error(`nav snippet at ${SNIPPET_PATH} does not carry the expected sentinel — refusing to wrap with an unrecognised chrome`);
  }
  return buf;
}

/**
 * wrap(sourceBuf, snippetBuf) -> Buffer. Pure and deterministic: inserts the snippet VERBATIM (one
 * leading + one trailing newline, so the injected region stays byte-locatable) at the start of the
 * page's body, choosing the anchor by what the document actually has. Throws if already wrapped.
 *
 * ANCHOR PRIORITY — every vendored page falls into exactly one case:
 *   1. <body...>  present  → inject immediately after it (the full-document labs under public/play/).
 *   2. </head>    present  → inject after it, at the implied body start (head, but no body tag).
 *   3. </style>   present  → inject after the FIRST </style> (the "loose" walk-in rooms: a
 *                            <meta>/<title>/<style> head prefix and then content, with no
 *                            <html>/<head>/<body> tags at all). The snippet's own <style> stays in
 *                            the implied head; its <nav> is the first flow element, which is exactly
 *                            where the browser opens the implied <body> — so the nav lands at the top.
 *   4. otherwise           → a bare fragment; prepend the snippet.
 */
function wrap(sourceBuf, snippetBuf) {
  const src = sourceBuf.toString("utf8");
  if (src.includes(SNIPPET_SENTINEL)) {
    throw new Error("source is already wrapped (nav snippet sentinel present) — refusing to double-wrap");
  }
  const snip = snippetBuf.toString("utf8");
  const insertAt = (at) => Buffer.from(src.slice(0, at) + "\n" + snip + "\n" + src.slice(at), "utf8");

  let m = /<body[^>]*>/i.exec(src);
  if (m) return insertAt(m.index + m[0].length);
  m = /<\/head>/i.exec(src);
  if (m) return insertAt(m.index + m[0].length);
  m = /<\/style>/i.exec(src);
  if (m) return insertAt(m.index + m[0].length);
  return Buffer.from("\n" + snip + "\n" + src, "utf8");
}

// ─────────────────────────────────────────────────────────────────────────────────────────────────
// CBT prev/next FOOTER — the small reader-nav that lets a learner walk the 15-module CBT path by
// clicking, without leaving the module. Injected ONLY into the 15 CBT labs (track part-1|part-2),
// computed from their track+order in generators/labs.json by build_labs.cjs, and byte-verified by
// the same recompute-and-compare the top nav uses. Self-contained (inline style, no script, no
// external reference) so it stays inside the analytics-free promise the /labs page makes.
// ─────────────────────────────────────────────────────────────────────────────────────────────────

const CBT_FOOTER_SENTINEL = "UNI CBT prev/next footer";

const htmlEscape = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function buildCbtFooterHtml(cfg) {
  // cfg: { prev: {href,label}|null, next: {href,label}|null, index: {href,label}, position }
  const prev = cfg.prev
    ? `<a class="cbt-nav-link cbt-nav-prev" href="${htmlEscape(cfg.prev.href)}" rel="prev">` +
      `<span class="cbt-nav-arrow" aria-hidden="true">&larr;</span>` +
      `<span class="cbt-nav-dir">Previous</span>` +
      `<span class="cbt-nav-title">${htmlEscape(cfg.prev.label)}</span>` +
      `</a>`
    : `<span class="cbt-nav-placeholder" aria-hidden="true"></span>`;
  const next = cfg.next
    ? `<a class="cbt-nav-link cbt-nav-next" href="${htmlEscape(cfg.next.href)}" rel="next">` +
      `<span class="cbt-nav-dir">Next</span>` +
      `<span class="cbt-nav-title">${htmlEscape(cfg.next.label)}</span>` +
      `<span class="cbt-nav-arrow" aria-hidden="true">&rarr;</span>` +
      `</a>`
    : `<span class="cbt-nav-placeholder" aria-hidden="true"></span>`;
  const index =
    `<a class="cbt-nav-index" href="${htmlEscape(cfg.index.href)}">` +
    `<span class="cbt-nav-index-label">${htmlEscape(cfg.index.label)}</span>` +
    `<span class="cbt-nav-position">${htmlEscape(cfg.position)}</span>` +
    `</a>`;
  return (
    `<!-- ${CBT_FOOTER_SENTINEL}. Generated by generators/wrap_vendored.cjs from labs.json track+order. ` +
    `Self-contained: inline style, no script, no external reference. -->\n` +
    `<nav class="cbt-nav" aria-label="Computer-based training — module navigation">\n` +
    `<style>` +
    `.cbt-nav{display:grid;grid-template-columns:1fr auto 1fr;gap:12px 20px;align-items:stretch;` +
    `max-width:980px;margin:48px auto 24px;padding:14px 18px;border:1px solid var(--line,#d8d0bf);` +
    `border-radius:12px;background:var(--panel,#fffdf8);font:14px/1.35 var(--sans,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif);` +
    `color:var(--ink,#20242a)}` +
    `.cbt-nav a{color:inherit;text-decoration:none;border:1px solid transparent;border-radius:9px;padding:10px 12px;display:flex;flex-direction:column;gap:2px;transition:background .14s,border-color .14s}` +
    `.cbt-nav a:hover,.cbt-nav a:focus-visible{background:var(--accent-soft,#e2efec);border-color:var(--line2,#cabfa9);outline:none}` +
    `.cbt-nav-prev{align-items:flex-start;text-align:left}` +
    `.cbt-nav-next{align-items:flex-end;text-align:right}` +
    `.cbt-nav-index{align-items:center;text-align:center;justify-content:center;background:var(--panel2,#ece6d9);border-color:var(--line,#d8d0bf)}` +
    `.cbt-nav-dir{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted,#595347);font-weight:700}` +
    `.cbt-nav-title{font-size:14px;font-weight:600}` +
    `.cbt-nav-index-label{font-size:13px;font-weight:700;color:var(--accent-ink,#0a544b)}` +
    `.cbt-nav-position{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted,#595347)}` +
    `.cbt-nav-arrow{font-size:16px;color:var(--muted,#595347)}` +
    `.cbt-nav-placeholder{display:block}` +
    `@media (max-width:640px){.cbt-nav{grid-template-columns:1fr 1fr;grid-auto-flow:row;gap:10px}.cbt-nav-index{grid-column:1/-1;order:-1}}` +
    `</style>\n` +
    prev +
    index +
    next +
    `\n</nav>`
  );
}

/**
 * wrapCbtFooter(buf, cfg) -> Buffer. Inserts the CBT prev/next footer immediately before </body>
 * (or at end-of-file if no </body>). Refuses to inject twice (sentinel-guarded).
 */
function wrapCbtFooter(buf, cfg) {
  const src = buf.toString("utf8");
  if (src.includes(CBT_FOOTER_SENTINEL)) {
    throw new Error("source already carries the CBT prev/next footer sentinel — refusing to double-inject");
  }
  const footer = buildCbtFooterHtml(cfg);
  const m = /<\/body>/i.exec(src);
  if (m) return Buffer.from(src.slice(0, m.index) + "\n" + footer + "\n" + src.slice(m.index), "utf8");
  return Buffer.from(src + "\n" + footer + "\n", "utf8");
}

module.exports = {
  loadSnippet,
  wrap,
  wrapCbtFooter,
  buildCbtFooterHtml,
  sha256,
  SNIPPET_PATH,
  SNIPPET_SENTINEL,
  CBT_FOOTER_SENTINEL,
};
