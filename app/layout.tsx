import type { Metadata } from "next";
import Link from "next/link";
import NavLink from "./components/NavLink";
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

// Every entry here must resolve to a page that exists. The first draft of this list carried
// /estate/, /evidence/ and /contribute/ — three links to pages that had never been written, which
// would have shipped a navigation bar where three of five items 404. A nav is a promise about what
// the site contains.
//
// TWO TIERS, TWO ROWS, ONE LIST. On 2026-08-30 this nav grew to eighteen equal items in one row —
// it wrapped, the sticky header grew under content, and the operator's verdict was the right one:
// a firehose without clear purpose. Tier 1 is THE LAB — the rooms a visitor walks into and the
// pages that teach; it is short because a doorway is not a directory. Tier 2 is THE RECORD — the
// registers a visitor checks; it renders as a quieter second row. One literal, because two gates
// read the hrefs out of this exact array and a split list is how a nav and its checker drift.
//
// `file: true` marks routes served as VERBATIM VENDORED FILES through a rewrite (no trailing
// slash — the rewrite source is the bare path) and rendered as plain anchors, because next/link
// has nothing to prefetch for a route Next does not own.
const NAV = [
  { href: "/", label: "Enter", tier: 1 },
  { href: "/classroom", label: "The classroom", tier: 1, file: true },
  { href: "/model", label: "The whiteboard", tier: 1, file: true },
  { href: "/labs/", label: "Labs", tier: 1 },
  { href: "/course/", label: "The course", tier: 1 },
  { href: "/hall/", label: "The hallway", tier: 1 },
  { href: "/wrong/", label: "What is wrong", tier: 1 },
  { href: "/contribute/", label: "Contribute", tier: 1 },
  // ── the record ──────────────────────────────────────────────────────────────────────────────
  { href: "/overview/", label: "Overview", tier: 2 },
  { href: "/start/", label: "Begin here", tier: 2 },
  { href: "/live/", label: "Live", tier: 2 },
  { href: "/build/", label: "Build", tier: 2 },
  { href: "/not-an-llm/", label: "Not an LLM", tier: 2 },
  { href: "/articles/", label: "Articles", tier: 2 },
  { href: "/wiki/", label: "Wiki", tier: 2 },
  { href: "/gates/", label: "Gates", tier: 2 },
  { href: "/mcp/", label: "MCP", tier: 2 },
  { href: "/estate/", label: "Estate", tier: 2 },
  // /drift keeps its own entry: adverse results are never buried, and a reader reaches "what is
  // broken here" in one hop without first knowing what the word "estate" means.
  { href: "/drift/", label: "Drift", tier: 2 },
  { href: "/evidence/", label: "Evidence", tier: 2 },
  { href: "/coverage/", label: "Coverage", tier: 2 },
  { href: "/omissions/", label: "What is not here", tier: 2 },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <header>
          <div className="wrap head">
            <Link href="/" className="brand">
              <b>UNI</b> <span>Universal Natural Intelligence</span>
            </Link>
            <nav aria-label="Primary">
              {NAV.filter((n) => n.tier === 1).map((n) =>
                n.file
                  ? <a key={n.href} href={n.href}>{n.label}</a>
                  : <NavLink key={n.href} href={n.href} label={n.label} />
              )}
            </nav>
          </div>
          <div className="wrap head head--records">
            <span className="records-label" aria-hidden="true">the record</span>
            <nav aria-label="Records">
              {NAV.filter((n) => n.tier === 2).map((n) => (
                <NavLink key={n.href} href={n.href} label={n.label} />
              ))}
            </nav>
          </div>
        </header>

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
