"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// THE SITE CHROME, converged on the apex's owner-approved 6-group nav (D-1) so the menu is identical
// across the whole estate — the apex pages and these uni-public estate pages now render the same
// grouped primary nav. The nav DATA stays a literal `const NAV = [...]` in app/layout.tsx: two gates
// read that literal to prove the nav leads to the pages the manifest promises, and a component that
// invented its own list is how a nav and its checker drift. This component only RENDERS the groups
// (dropdown panels mirroring the apex markup), marks the current page, and adds the progressive-
// enhancement behaviour ported in behaviour from the apex nav.js: click/tap to open a group, the
// mobile hamburger, close on Escape, close on outside click, aria-expanded kept in sync. Desktop
// open-on-hover/focus is pure CSS (globals.css), so the nav works with no JS at all.
//
// Every link is a plain <a>, exactly as the apex renders them. Most group targets are apex routes
// the uni-public Next app does not own (/about, /videos, the demo labs, /cookbook, …); there is
// nothing for next/link to prefetch, and a full navigation resolves them on the apex, the canonical
// public host that serves these estate pages. The uni-public-owned targets resolve there too.
type Item = { href: string; label: string };
type Group = { id: string; label: string; items: Item[] };
type Brand = { href: string; mark: string; label: string };

const norm = (h: string) => h.replace(/\/+$/, "") || "/";
function isActive(href: string, cur: string): boolean {
  const n = norm(href);
  return n === "/" ? cur === "/" : cur === n || cur.startsWith(n + "/");
}

export default function SiteNav({ brand, groups }: { brand: Brand; groups: Group[] }) {
  const cur = norm(usePathname() || "/");
  const navRef = useRef<HTMLElement>(null);

  // Progressive enhancement, ported in behaviour from the apex nav.js.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const toggle = nav.querySelector<HTMLButtonElement>(".site-nav-toggle");
    const groupEls = Array.from(nav.querySelectorAll<HTMLElement>(".nav-group"));
    const closeGroups = (except: Element | null) => {
      for (const g of groupEls) {
        if (g === except) continue;
        g.classList.remove("open");
        g.querySelector(".nav-group-btn")?.setAttribute("aria-expanded", "false");
      }
    };
    const closeMenu = () => {
      nav.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    };
    const onToggle = () => {
      const open = nav.classList.toggle("open");
      toggle?.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open) closeGroups(null);
    };
    toggle?.addEventListener("click", onToggle);
    const handlers: Array<[HTMLElement, (e: Event) => void]> = [];
    for (const g of groupEls) {
      const btn = g.querySelector<HTMLButtonElement>(".nav-group-btn");
      if (!btn) continue;
      const h = (e: Event) => {
        e.preventDefault();
        const willOpen = !g.classList.contains("open");
        closeGroups(g);
        g.classList.toggle("open", willOpen);
        btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      };
      btn.addEventListener("click", h);
      handlers.push([btn, h]);
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeGroups(null); closeMenu(); }
    };
    const onDocClick = (e: MouseEvent) => {
      if (!nav.contains(e.target as Node)) { closeGroups(null); closeMenu(); }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onDocClick);
    return () => {
      toggle?.removeEventListener("click", onToggle);
      for (const [btn, h] of handlers) btn.removeEventListener("click", h);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  return (
    <nav className="site-nav" aria-label="Primary" ref={navRef}>
      <div className="site-nav-inner">
        <a className="site-brand" href={brand.href}>
          <span className="mark">{brand.mark}</span>
          <span className="full">{brand.label}</span>
        </a>
        <button
          className="site-nav-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="site-nav-groups"
          aria-label="Open menu"
        >
          &#9776;
        </button>
        <div className="site-nav-groups" id="site-nav-groups">
          {groups.map((g) => {
            const groupCurrent = g.items.some((it) => isActive(it.href, cur));
            return (
              <div className="nav-group" key={g.id} {...(groupCurrent ? { "data-current": "" } : {})}>
                <button
                  className="nav-group-btn"
                  type="button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  aria-controls={"navp-" + g.id}
                >
                  {g.label}
                </button>
                <div className="nav-panel" id={"navp-" + g.id} role="menu">
                  {g.items.map((it) => {
                    const active = isActive(it.href, cur);
                    return (
                      <a
                        key={it.href}
                        href={it.href}
                        role="menuitem"
                        className={active ? "current" : undefined}
                        aria-current={active ? "page" : undefined}
                      >
                        {it.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
