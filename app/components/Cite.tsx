import type { Citation } from "../lib/estate";

/**
 * A CITATION THAT SAYS WHETHER YOU CAN CHECK IT.
 *
 * Requirement R3 for this site is "real source code citation". A citation is only worth anything if
 * a reader can follow it. There were three ways to handle an unpublished source. Two of them are
 * dishonest: render a link that 404s, or quietly drop the citation and state the fact bare. This is
 * the third: render it, and mark it UNRESOLVABLE on its face.
 *
 * A citation a reader cannot open is an appeal to authority. Saying so is the difference between
 * documentation and marketing. Three sources were published on 2026-08-01 and now resolve; any
 * source without a published snapshot still renders unresolvable, from the declared manifest rather
 * than from an assumption.
 *
 * TWO COMMITS, DELIBERATELY NOT COLLAPSED. `commit` is the private source commit the bytes were read
 * from — the provenance the page's sha256 was taken over. `public_commit` is the snapshot commit the
 * link opens. They name the same tree under different sha values, and showing the provenance while
 * linking the snapshot is the only arrangement that is true about both.
 */
export function Cite({ c }: { c: Citation }) {
  const target = c.path ?? c.glob ?? "";
  if (c.resolvable && c.public_repo && c.public_commit) {
    const href = `https://github.com/TMDLRG/${c.public_repo}/blob/${c.public_commit}/${target}`;
    return (
      <div className="cite">
        <a href={href} rel="noreferrer">
          {c.title} · {target}
        </a>{" "}
        @ {c.commit_short} ({c.branch}) — opens the published snapshot {c.public_commit_short}
      </div>
    );
  }
  return (
    <div className="cite">
      {c.title} · {target} @ {c.commit_short} ({c.branch}){" "}
      <span className="unresolved">— source repo not public, so this citation cannot be opened</span>
    </div>
  );
}
