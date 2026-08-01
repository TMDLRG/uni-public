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

const NAV = [
  { href: "/", label: "Overview" },
  { href: "/estate/", label: "The estate" },
  { href: "/gates/", label: "Gates" },
  { href: "/evidence/", label: "Evidence & truth classes" },
  { href: "/contribute/", label: "Contribute" },
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
