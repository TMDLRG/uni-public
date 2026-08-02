/**
 * The single read of the generated bundle. Nothing in the app reads a private repo, computes a
 * count, or hardcodes a number — it reads this, and this is produced by generators/build_content.cjs
 * from the repositories declared in generators/sources.json.
 */
import bundle from "../../content/generated/estate.json";

export type Citation = {
  repo: string;
  title: string;
  branch: string;
  commit: string;
  commit_short: string;
  visibility: "public" | "private";
  resolvable: boolean;
  /** The published snapshot a permalink resolves against. Absent when the source is not public. */
  public_repo?: string;
  public_commit?: string;
  public_commit_short?: string;
  path?: string;
  glob?: string;
};

export type Block = {
  kind: string;
  citation: Citation;
  [k: string]: unknown;
};

export type Source = {
  id: string;
  title: string;
  one_line: string;
  inclusion: string;
  provenance: Citation;
  source_last_commit: string;
  blocks: Block[];
};

export const estate = bundle as unknown as {
  schema_version: number;
  generated_by: string;
  citation_policy: { rule: string; public_source: boolean; consequence: string[] };
  sources: Source[];
  omitted: {
    note: string;
    sources_skipped: { id: string; reason: string }[];
    paths_excluded: { source: string; path: string }[];
    exclude_reasons: { id: string; reason: string[] }[];
  };
};

export function block<T = Block>(sourceId: string, kind: string): T | undefined {
  const s = estate.sources.find((x) => x.id === sourceId);
  return s?.blocks.find((b) => b.kind === kind) as T | undefined;
}

export function allBlocks(kind: string): Block[] {
  return estate.sources.flatMap((s) => s.blocks.filter((b) => b.kind === kind));
}
