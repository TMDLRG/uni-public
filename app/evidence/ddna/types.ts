// Shapes of the DDNA "follow the science" export (UNI.DDNA tools/public_export, schema
// ddna-science-export/1). The files are published byte for byte under public/evidence/ddna/data/.

export type Verdict = "PASS" | "PARTIAL" | "FAIL" | "WITHHELD";
export type Claim = "named-behaviour" | "partial" | "mechanism" | "not-shown" | "withheld";

export type Gate = {
  id: string;
  version: number;
  verdict: Verdict;
  class: "A" | "B" | "C" | "D";
  claim: Claim;
  superseded_by: string | null;
  domain: number | null;
  round: number;
  date: string;
  mode: string;
  f_tag: string;
  prereg_sha256: string;
  receipt_sha256: string;
  stats: { n: number; effective_n: number; median: number | null; per_seed: number[] | null } | null;
  lines: { behaviour: string; fence: string };
};

export type Round = {
  round: number;
  published_at: string;
  frozen_at: string;
  frozen_basis: string;
  commitment_pushed_at: string | null;
  randomness: string;
  gates: string[];
};

export type Verdicts = {
  schema: string;
  counts: { sealed: number; pass: number; partial: number; fail: number; withheld: number; superseded: number; claimable_pass: number };
  drand: { chain: string; chain_hash: string; genesis: number; period_s: number; margin_s: number };
  rounds: Round[];
  gates: Gate[];
};

export type Prereg = {
  id: string;
  version: number;
  prereg_sha256: string;
  hypothesis: string;
  arms: { name: string; note: string | null }[];
  falsifier: string;
  cites_03: string[];
};

export type Preregs = { schema: string; preregs: Prereg[] };

export type MathFile = {
  schema: string;
  sign_convention: string;
  bound_tags: { tag: string; quantity: string; bound: string }[];
  rules: { id: string; title: string }[];
  errata: { id: string; location: string; correction: string; test: string }[];
  spec_sections: { id: string; title: string; cited_by: string[] }[];
};

export type Parity = {
  schema: string;
  summary: string[];
  domains: { order: number; domain: string; status: string; sealed_pass: number; sealed_fail: number; gates: string[] }[];
  lifecycle: { order: number; stage: string; status: string }[];
  human_tests: { id: string; stage: string; test: string; paradigm: string; criterion: string; status: string }[];
};

export type Manifest = {
  schema: string;
  trunk: { ref: string; commit: string; commit_date: string };
  tool: { path: string; version: string; commit: string };
  gate: { ddna_side: string; checks: string[] };
  files: { path: string; sha256: string; bytes: number }[];
};
