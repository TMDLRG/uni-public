import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "./components/SiteNav";
import siteNav from "../content/vendored/site-nav.json";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Universal Natural Intelligence",
    template: "%s — Universal Natural Intelligence",
  },
  description:
    "The public technical documentation of the UNI estate: an active-inference research programme spanning a bacterial flagellar-motor laboratory, a scientific control plane, a colony of agents, and the instruments that keep them honest.",
  metadataBase: new URL("https://universalnaturalintelligence.com"),
  openGraph: {
    title: "Universal Natural Intelligence",
    description:
      "Active-inference research, documented from the source. Every number on this site is generated from the repository it describes.",
    type: "website",
  },
};

// THE PRIMARY NAV — ONE SOURCE OF TRUTH, NOT AUTHORED HERE. The six groups are rendered from
// content/vendored/site-nav.json, the apex's canonical nav DATA vendored and byte-verified against
// the Precision pin by generators/build_nav.cjs. The apex pages, these Next routes, and the wrapped
// vendored labs/rooms all render the SAME data from this ONE file, so the two halves cannot drift —
// the cross-repo parity gate (verify_nav_parity.cjs) proves it against the nav session's normalized
// dump. SiteNav renders the groups and marks the current page; /nav.css (also vendored, served at
// /nav.css) styles it identically to the apex. The nav-reading gates (verify_a11y,
// verify_public_consistency §5, verify_coverage) read the SAME vendored site-nav.json, slash-
// normalising owned-route reachability. Apex-only items (/about, /videos, the demo labs, /cookbook …)
// render as plain <a> and resolve on the apex, the canonical host — the declared-destination case.

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/nav.css" />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <SiteNav brand={siteNav.brand} groups={siteNav.groups} />

        <main id="main" className="wrap">{children}</main>

        <footer>
          <div className="wrap">
            <p>
              <b>Every number on this site is generated</b> from the repository it describes, and
              carries the commit it was read from. Nothing here is typed by hand and then left to
              rot — that failure is the reason the generator exists.
            </p>
            <p className="dim">
              Released under the MIT Licence. Adverse results, <Link href="/gates/">failing
              gates</Link> and known limitations are published alongside the work, not omitted from
              it. That promise was briefly untrue: for one day this footer claimed it while the gates
              page published each gate&rsquo;s venue and not its verdict. The page now carries the
              verdict the runner actually returned, in both venues, including the ones that failed.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
