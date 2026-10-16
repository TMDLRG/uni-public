"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// A nav link that marks itself aria-current="page" when it is the page you are on. Screen-reader and
// keyboard users get told where they are; sighted users get the underline from globals.css. This is
// a client component only because it needs the current path — the nav data itself is the vendored
// content/vendored/site-nav.json (byte-verified against the apex Precision pin by build_nav.cjs),
// which two gates read to prove the navigation leads only to pages that exist.
export default function NavLink({ href, label }: { href: string; label: string }) {
  const path = usePathname();
  const active = href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, ""));
  return (
    <Link href={href} aria-current={active ? "page" : undefined}>
      {label}
    </Link>
  );
}
