import type { Citation } from "../lib/estate";

/**
 * A CITATION THAT SAYS WHETHER YOU CAN CHECK IT.
 *
 * Requirement R3 for this site is "real source code citation". A citation is only worth anything if
 * a reader can follow it — and today none of the source repositories is public, so none of these
 * links resolve. There were three ways to handle that. Two of them are dishonest: render a link that
 * 404s, or quietly drop the citation and state the fact bare. This is the third: render it, and mark
 * it UNRESOLVABLE on its face.
 *
 * A citation a reader cannot open is an appeal to authority. Saying so is the difference between
 * documentation and marketing. When a source repo is published, `visibility` flips to "public" in
 * generators/sources.json and the identical citation becomes a permalink — no page changes.
 */
export function Cite({ c }: { c: Citation }) {
  const target = c.path ?? c.glob ?? "";
  if (c.resolvable) {
    const href = `https://github.com/TMDLRG/${c.repo}/blob/${c.commit}/${target}`;
    return (
      <div className="cite">
        <a href={href} rel="noreferrer">
          {c.title} · {target}
        </a>{" "}
        @ {c.commit_short}
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
