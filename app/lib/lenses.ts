import bundle from "../../content/generated/lenses.json";
import type { LensRecord, OrientationRecord } from "../components/ReadingLane";

/**
 * Typed access to the authored reading-lane prose.
 *
 * This module reads `lenses.json` and NOTHING ELSE. It cannot reach `docs.json`, so there is no path
 * by which authored prose could be substituted for a document — the two live in separate files
 * written by separate generators, and `verify_lenses.cjs` asserts that separation on every deploy.
 *
 * A missing lens is the NORMAL case, not an error: the lane ships before any prose is written, and a
 * page with no lens renders exactly as it did before — the document, alone. That is what makes it
 * safe to land the machinery first and author into it afterwards.
 */

type Bundle = { lenses: LensRecord[]; orientations: OrientationRecord[] };
const data = bundle as unknown as Bundle;

const byKey = new Map<string, LensRecord>(
  (data.lenses ?? []).map((l) => [`${l.scope}:${l.key}`, l])
);
const byCorpus = new Map<string, OrientationRecord>(
  (data.orientations ?? []).map((o) => [o.corpus, o])
);

/** The authored Plain/Clear prose for one page, or null if nobody has written it yet. */
export function lensFor(scope: "wiki" | "article", key: string): LensRecord | null {
  return byKey.get(`${scope}:${key}`) ?? null;
}

/** The one authored orientation panel for a corpus ("what this is, who it's for, what to read first"). */
export function orientationFor(corpus: string | null | undefined): OrientationRecord | null {
  return corpus ? byCorpus.get(corpus) ?? null : null;
}

export const lensTotals = (bundle as unknown as { totals: Record<string, number> }).totals;
