import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "./components/SiteNav";
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

const BRAND = { href: "/", mark: "UNI", label: "Universal Natural Intelligence" };

// THE PRIMARY NAV, converged on the apex's owner-approved 6-group structure (D-1) so the menu is
// IDENTICAL across the whole estate — the apex pages and these uni-public estate pages now carry the
// same grouped nav. The groups, labels and hrefs mirror the apex single source of truth
// (nav/site-nav.json on the Precision repo); SiteNav renders them and marks the current page.
//
// WHY A LITERAL, STILL. Two gates read `const NAV = [...]` straight out of this file — verify_a11y
// for the landmark/skip-link, and verify_public_consistency to prove the nav reaches every document
// type the manifest promises. A nav that built its list anywhere else is how a nav and its checker
// drift, so the data stays here and SiteNav only renders it.
//
// HREFS ARE THE APEX FORM (no trailing slash), so the menu is byte-identical to the apex and every
// target resolves on the apex — the canonical public host that actually serves these estate pages.
// Most group items are apex routes this uni-public Next app does not own (/about, /videos, the demo
// labs, /cookbook, /science …); SiteNav renders every item as a plain <a>, because there is nothing
// for next/link to prefetch on a route Next does not own and a full navigation resolves it on the
// apex. The uni-public-owned targets (/labs, /course, /wiki, /articles, /overview, /wrong, /gates,
// /coverage, /mcp, /build, /start, /hall, /not-an-llm, /contribute, /evidence, /classroom) resolve
// there too; on the bare uni-public.vercel.app host, trailingSlash sends them one hop to their
// canonical slash form and the apex-only items are the declared-destination case this site already
// documents elsewhere. The consistency gate normalises the trailing slash when it checks reachability.
const NAV = [
  { id: "start", label: "Start here", items: [
    { href: "/gentle-entry", label: "Gentle Entry" },
    { href: "/start", label: "Begin here" },
    { href: "/not-an-llm", label: "Not an LLM" },
    { href: "/hall", label: "The hallway" },
  ] },
  { id: "labs", label: "Labs", items: [
    { href: "/labs", label: "All labs" },
    { href: "/explorer", label: "Organism Explorer" },
    { href: "/", label: "Precision Lab" },
    { href: "/echo-lab", label: "Echo Lab" },
    { href: "/loop-lab", label: "Loop Lab" },
    { href: "/heart-lab", label: "Heart Lab" },
    { href: "/cell-lab", label: "Cell Lab" },
    { href: "/sensorium", label: "Sensorium" },
    { href: "/classroom", label: "The classroom" },
  ] },
  { id: "learn", label: "Learn", items: [
    { href: "/science", label: "The Science" },
    { href: "/history", label: "History of Inference" },
    { href: "/course", label: "The course" },
    { href: "/workshop", label: "The UNI Workshop" },
    { href: "/videos", label: "Videos" },
    { href: "/blog", label: "Blog" },
  ] },
  { id: "docs", label: "Docs", items: [
    { href: "/docs", label: "Docs home" },
    { href: "/cookbook", label: "The Cookbook" },
    { href: "/articles", label: "Articles" },
    { href: "/wiki", label: "Wiki" },
    { href: "/build", label: "Build with UNI" },
    { href: "/mcp", label: "MCP" },
  ] },
  { id: "evidence", label: "Evidence", items: [
    { href: "/overview", label: "Overview" },
    { href: "/cookbook/claim-ledger", label: "The Claim Ledger" },
    { href: "/wrong", label: "What is wrong" },
    { href: "/gates", label: "Gates" },
    { href: "/coverage", label: "Coverage" },
    { href: "/evidence", label: "Evidence & Verdicts" },
    { href: "/transparency", label: "Transparency" },
  ] },
  { id: "about", label: "About", items: [
    { href: "/about", label: "About" },
    { href: "/michael", label: "The Record" },
    { href: "/book", label: "Big Brains Need Big Worlds" },
    { href: "/run-on-rhythm", label: "Run on Rhythm" },
    { href: "/contribute", label: "Contribute" },
  ] },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <SiteNav brand={BRAND} groups={NAV} />

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
