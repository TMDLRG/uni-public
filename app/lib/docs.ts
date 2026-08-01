import docsBundle from "../../content/generated/docs.json";
import type { Citation } from "./estate";

export type WikiPage = {
  corpus: string;
  slug: string;
  title: string;
  body: string;
  bytes: number;
  sha256: string;
  /** How many values were removed and replaced with a visible [redacted: …] marker. 0 for most pages. */
  redactions?: number;
  redaction_counts?: Record<string, number>;
  citation: Citation;
};

export type Corpus = {
  id: string;
  title: string;
  blurb: string;
  exclude_reason: string | null;
  /** Rendered, but kept out of the main wiki index — see the Evidence section. */
  off_main_nav?: boolean;
  available: boolean;
  reason?: string;
  branch?: string;
  commit_short?: string;
  pages: number;
  refused: number;
  /** Dropped because an identical document was already ingested elsewhere, proved by sha256. */
  deduped?: number;
};

export type Refusal = {
  corpus: string;
  path: string;
  bytes: number;
  sha256: string;
  reasons: string[];
};

export const docs = docsBundle as unknown as {
  schema_version: number;
  generated_by: string;
  corpora: Corpus[];
  pages: WikiPage[];
  refused: { note: string[]; count: number; items: Refusal[] };
  duplicates: { note: string[]; count: number; items: Duplicate[] };
};

export type Duplicate = {
  corpus: string;
  path: string;
  bytes: number;
  sha256: string;
  /** The slug of the copy that IS published. Identity is proved by digest, never by filename. */
  same_as: string;
};

export const pageBySlug = (slug: string): WikiPage | undefined =>
  docs.pages.find((p) => p.slug === slug);

export const pagesInCorpus = (id: string): WikiPage[] =>
  docs.pages.filter((p) => p.corpus === id);
