import docsBundle from "../../content/generated/docs.json";
import type { Citation } from "./estate";

export type WikiPage = {
  corpus: string;
  slug: string;
  title: string;
  body: string;
  bytes: number;
  sha256: string;
  citation: Citation;
};

export type Corpus = {
  id: string;
  title: string;
  blurb: string;
  exclude_reason: string | null;
  available: boolean;
  reason?: string;
  branch?: string;
  commit_short?: string;
  pages: number;
  refused: number;
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
};

export const pageBySlug = (slug: string): WikiPage | undefined =>
  docs.pages.find((p) => p.slug === slug);

export const pagesInCorpus = (id: string): WikiPage[] =>
  docs.pages.filter((p) => p.corpus === id);
