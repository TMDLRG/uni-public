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
const NAV = [
  { href: "/", label: "Overview" },
  { href: "/start/", label: "Begin here" },
  // Second, deliberately. A visitor who arrives mid-broadcast wants to know what is being worked on
  // and what it is stuck on before they want the archive.
  { href: "/live/", label: "Live" },
  { href: "/articles/", label: "Articles" },
  { href: "/wiki/", label: "Wiki" },
  { href: "/gates/", label: "Gates" },
  { href: "/evidence/", label: "Evidence" },
  { href: "/coverage/", label: "Coverage" },
  { href: "/omissions/", label: "What is not here" },
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
              {NAV.map((n) => (
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
