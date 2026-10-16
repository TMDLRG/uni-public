"use strict";
// render_nav.cjs — reads the VENDORED canonical nav DATA (content/vendored/site-nav.json, byte-
// verified against the apex Precision pin by build_nav.cjs) and exposes it in two shapes:
//   NAV           the raw parsed site-nav.json: { brand, groups:[{id,label,items:[{href,label}]}], … }
//   normalized()  [{group,label,items:[{label,href}]}] — the record build_nav.cjs emits
//
// SINGLE SOURCE OF TRUTH is this nav DATA. The apex renders it (scripts/render-nav.mjs) into its
// pages and into nav/nav-snippet.html; uni-public renders it two ways from the SAME vendored file —
// the React SiteNav for the Next routes, and the vendored nav-snippet.html injected into the full-
// screen labs/rooms by generators/wrap_vendored.cjs. The cross-repo parity gate (verify_nav_parity.cjs)
// proves each of those surfaces carries the SAME group/label/order/href as this data, so the surfaces
// cannot drift from one another or from the apex. There is no hand-authored copy of the nav anywhere.

const fs = require("fs");
const path = require("path");

const SITE_NAV = path.join(__dirname, "..", "content", "vendored", "site-nav.json");
const NAV = JSON.parse(fs.readFileSync(SITE_NAV, "utf8"));

// Normalized structure for the parity record / gate: [{group,label,items:[{label,href}]}].
function normalized() {
  return NAV.groups.map((g) => ({
    group: g.id,
    label: g.label,
    items: g.items.map((it) => ({ label: it.label, href: it.href })),
  }));
}

module.exports = { NAV, normalized };
