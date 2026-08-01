import coverageBundle from "../../content/generated/coverage.json";
import manifestBundle from "../../content/coverage-manifest.json";
import curationBundle from "../../content/curation.json";

export type Axis = {
  id: string;
  label: string;
  /** "discovered" — the denominator comes from the world. "declared" — it is editorial. */
  denominator: string;
  total: number;
  covered: number;
  excluded: number;
};

export type EntryPoint = {
  id: string;
  command: string;
  article?: string;
  anchor?: string;
  excluded?: boolean;
  reason?: string;
};

export type Subsystem = {
  id: string;
  label: string;
  understand: string;
  run_it: string;
  anchors: { understand: string; run_it: string };
};

export type DocumentType = {
  id: string;
  label: string;
  articles?: string[];
  curated_group?: string;
  min_pages?: number;
  min_citations?: number;
  reachable_from: string;
};

export type CurationGroup = {
  id: string;
  title: string;
  intent: string;
  pages: string[];
};

export const coverage = coverageBundle as unknown as {
  generated_by: string;
  axes: Axis[];
  ok: boolean;
  problems: string[];
};

export const manifest = manifestBundle as unknown as {
  subsystems: Subsystem[];
  document_types: DocumentType[];
  entry_points: EntryPoint[];
};

export const curation = curationBundle as unknown as {
  groups: CurationGroup[];
  uncategorised: { slug: string; reason: string }[];
};

export const groupOf = (slug: string): CurationGroup | undefined =>
  curation.groups.find((g) => g.pages.includes(slug));
