import React from "react";

/**
 * ReadingLane — the three-lens reading control, on every content page.
 *
 * WHAT IT IS FOR
 * --------------
 * A person meeting this estate for the first time may be seven, or frightened, or an expert, or
 * reading in their fourth language. The documents are written for the last of those. The lane ADDS
 * two easier rungs — Plain and Clear — without touching the document, so depth is never reduced and
 * an easier way in is never a different set of facts.
 *
 * THE ONE RULE THIS COMPONENT EXISTS TO ENFORCE
 * ---------------------------------------------
 * **Precise is the document. Plain and Clear are prose ABOUT the document, written for this website.**
 * That distinction is load-bearing, because the ingested pages are the operator's real repository
 * files and `safety/verify_provenance.cjs` proves their bytes against a named commit. If agent-written
 * summary could be mistaken for source, the site's central claim dies. So:
 *
 *   1. Precise is the DEFAULT — twice over (`data-default` on the wrapper AND `checked` on its radio),
 *      so it is what a reader sees, what a JS-less browser shows, and what prints.
 *   2. The Precise HTML is wrapped in `UNI-PRECISE-BEGIN/END` sentinels carrying two digests. The
 *      gate re-renders the body from `docs.json` through the SAME module the page used and requires
 *      the bytes between those sentinels to match exactly. "This is the document" is measured.
 *   3. Every authored panel carries `data-authored="true"`, a machine-readable HTML comment, and a
 *      visible stamp in REAL TEXT — not a CSS `::before`, which a screen reader may not announce and
 *      which disappears if the stylesheet fails.
 *   4. There is no `precise` field in the lens schema, so authored prose has no field to occupy.
 *
 * NO CLIENT JAVASCRIPT. The switch is a radio group plus `:has()` selectors in `globals.css`.
 * A control that needs JS to reveal the plain-language version fails exactly the reader it is for.
 *
 * IDs ARE DOCUMENT-GLOBAL, SO THERE MUST BE EXACTLY ONE LANE PER PAGE. The shipped CSS keys off
 * `#lane-plain` / `#lane-clear` / `#lane-precise`. Two lanes on one page would make the second a
 * silent remote control for the first. `verify_a11y.cjs` asserts one lane per content route and zero
 * elsewhere, so this is an enforced invariant rather than a convention someone has to remember.
 */

export type LensPanel = { html: string; words: number };
export type LensRecord = {
  scope: "wiki" | "article";
  key: string;
  authored_by: string;
  authored_at: string;
  review_state: "absent" | "draft" | "reviewed";
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  plain?: LensPanel | null;
  clear?: LensPanel | null;
};
export type OrientationRecord = { corpus: string; title: string; html: string };

export const PRECISE_BEGIN = "UNI-PRECISE-BEGIN";
export const PRECISE_END = "UNI-PRECISE-END";

function Stamp({ lane, lens }: { lane: "plain" | "clear"; lens: LensRecord }) {
  const draft = lens.review_state !== "reviewed";
  return (
    <p className="lane__stamp lane__stamp--authored">
      <b>Written for this website — not the document.</b> This is a {lane === "plain" ? "plain-language" : "clearer"}{" "}
      retelling, written to help you meet the document. It is not the source, and it is not evidence.
      {draft ? <> <b>It has not yet been checked by a person.</b></> : null}{" "}
      <label htmlFor="lane-precise" className="lane__jump">Read the document itself →</label>
      <span className="sr-only"> (or choose Precise in the reading-level control above)</span>
    </p>
  );
}

function Foot({ lane, lens, sha }: { lane: string; lens: LensRecord; sha: string }) {
  return (
    <p className="dim lane__foot">
      {lane} · written {lens.authored_at} by {lens.authored_by}
      {lens.review_state === "reviewed" && lens.reviewed_by
        ? <> · checked {lens.reviewed_at} by {lens.reviewed_by}</>
        : <> · <b>not yet checked by a person</b></>}
      {" "}· about the document whose sha256 is <code>{sha.slice(0, 16)}</code>
    </p>
  );
}

export function ReadingLane(props: {
  preciseHtml: string;
  preciseSha256: string;
  preciseBodySha256: string;
  sourceStamp: React.ReactNode;
  sourceNote?: React.ReactNode;
  lens?: LensRecord | null;
  orientation?: OrientationRecord | null;
}) {
  const { preciseHtml, preciseSha256, preciseBodySha256, sourceStamp, sourceNote, lens, orientation } = props;
  const plain = lens?.plain ?? null;
  const clear = lens?.clear ?? null;
  const hasAuthored = Boolean(plain || clear);

  // The sentinels go through the SAME dangerouslySetInnerHTML as the body, so the gate sees exactly
  // what shipped. The digests are inside the marker: a page that rendered a different document
  // cannot carry a matching one.
  const sentinelled =
    `<!--${PRECISE_BEGIN} ${preciseSha256} ${preciseBodySha256}-->` + preciseHtml + `<!--${PRECISE_END}-->`;

  return (
    <>
      <section className="lane-intro" aria-labelledby="lane-intro-h">
        <h2 id="lane-intro-h" className="sr-only">How to read this page</h2>
        {hasAuthored ? (
          <p className="dim" style={{ fontSize: 15, margin: 0 }}>
            <b>Three ways to read this page.</b> <b>Precise</b> is the document itself, exactly as it
            is written in the repository. <b>Plain</b> and <b>Clear</b> were written for this website
            to help you meet that document — they are <i>about</i> it. They are not it, and they are
            not evidence.
          </p>
        ) : null}
        {orientation ? (
          <div className="orient" dangerouslySetInnerHTML={{ __html: orientation.html }} />
        ) : null}
      </section>

      <div className="lanes" data-default="precise">
        {hasAuthored ? (
          <>
            <div className="lanes__pick" role="radiogroup" aria-label="Reading level for this page">
              {plain ? (
                <>
                  <input type="radio" id="lane-plain" name="lane" value="plain" />
                  <label htmlFor="lane-plain">
                    Plain<span className="sr-only"> — written for this site, not the source document</span>
                  </label>
                </>
              ) : null}
              {clear ? (
                <>
                  <input type="radio" id="lane-clear" name="lane" value="clear" />
                  <label htmlFor="lane-clear">
                    Clear<span className="sr-only"> — written for this site, not the source document</span>
                  </label>
                </>
              ) : null}
              <input type="radio" id="lane-precise" name="lane" value="precise" defaultChecked />
              <label htmlFor="lane-precise">
                Precise<span className="sr-only"> — the source document itself</span>
              </label>
            </div>
            <p className="lanes__nohas">
              Your browser cannot switch reading levels, so the document itself is shown.
            </p>
          </>
        ) : (
          <p className="lanes__pending">
            A Plain and a Clear version of this page have not been written yet. What follows is the
            document itself.
          </p>
        )}

        <div className="lane lane--precise" data-lens="precise">
          <h2 className="sr-only">Precise — the source document</h2>
          {sourceStamp}
          <div className="prose" dangerouslySetInnerHTML={{ __html: sentinelled }} />
          {sourceNote}
        </div>

        {plain && lens ? (
          <div className="lane lane--plain" data-lens="plain" data-authored="true">
            <h2 className="sr-only">Plain — written for this website, not the source document</h2>
            <Stamp lane="plain" lens={lens} />
            <div className="lane__body" dangerouslySetInnerHTML={{ __html: plain.html }} />
            <Foot lane="Plain" lens={lens} sha={preciseSha256} />
          </div>
        ) : null}

        {clear && lens ? (
          <div className="lane lane--clear" data-lens="clear" data-authored="true">
            <h2 className="sr-only">Clear — written for this website, not the source document</h2>
            <Stamp lane="clear" lens={lens} />
            <div className="lane__body" dangerouslySetInnerHTML={{ __html: clear.html }} />
            <Foot lane="Clear" lens={lens} sha={preciseSha256} />
          </div>
        ) : null}
      </div>
    </>
  );
}
