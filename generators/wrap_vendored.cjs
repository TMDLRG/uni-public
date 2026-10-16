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

module.exports = { loadSnippet, wrap, sha256, SNIPPET_PATH, SNIPPET_SENTINEL };
