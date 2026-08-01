import type { Metadata } from "next";
import Link from "next/link";
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
  { href: "/wiki/", label: "Wiki" },
  { href: "/gates/", label: "Gates" },
  { href: "/evidence/", label: "Evidence" },
  { href: "/omissions/", label: "What is not here" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="wrap head">
            <Link href="/" className="brand">
              <b>UNI</b> <span>Universal Natural Intelligence</span>
            </Link>
            <nav>
              {NAV.map((n) => (
                <Link key={n.href} href={n.href}>
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="wrap">{children}</main>

        <footer>
          <div className="wrap">
            <p>
              <b>Every number on this site is generated</b> from the repository it describes, and
              carries the commit it was read from. Nothing here is typed by hand and then left to
              rot — that failure is the reason the generator exists.
            </p>
            <p className="dim">
              Released under the MIT Licence. Adverse results, failing gates and known limitations are
              published alongside the work, not omitted from it.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
