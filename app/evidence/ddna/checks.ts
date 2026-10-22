// The checks a visitor's browser runs on the DDNA export. Pure functions over fetched bytes: nothing
// is sent anywhere, and the only requests are for this site's own copies of the five export files.
// What can be checked in a browser is integrity (sha256) and arithmetic (closed forms recomputed from
// the published values). The experiments themselves are not re-run here; that is stated on the page.

import type { Gate, Manifest, Preregs, Verdicts } from "./types";

// drand's quicknet chain, as drand publishes it. Hardcoded here, independently of the export, so the
// export's own drand block is checked against something it did not supply.
export const QUICKNET = {
  chain_hash: "52db9ba70e0cc0f6eaf7803dd07447a1f5477735fd3f661792ba94600c84e971",
  genesis: 1692803367,
  period_s: 3,
};
// RC-48 in the DDNA lab protocol: the round must publish more than 600 s after the freeze.
export const MARGIN_S = 600;
// Receipts print scores and medians to 6 decimals; a recomputed median agrees to within 1e-6.
export const MEDIAN_TOLERANCE = 1e-6 + 1e-12;

export const DATA_FILES = ["verdicts.json", "preregs.json", "math.json", "parity.json"] as const;

export type Check = { group: string; name: string; ok: boolean; detail: string };

export async function sha256Hex(buf: ArrayBuffer): Promise<string> {
  const d = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(d), (b) => b.toString(16).padStart(2, "0")).join("");
}

export function roundTime(round: number): string {
  return new Date((QUICKNET.genesis + (round - 1) * QUICKNET.period_s) * 1000).toISOString().replace(".000Z", "Z");
}

/** Seconds from `iso` to the round's publication. A time recorded to the minute counts as its last second. */
export function secondsBefore(round: number, iso: string): number {
  const t = /T\d{2}:\d{2}Z$/.test(iso) ? iso.replace("Z", ":59Z") : iso;
  return Math.round((Date.parse(roundTime(round)) - Date.parse(t)) / 1000);
}

export function median(xs: number[]): number {
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

export function expectedClaim(g: Pick<Gate, "verdict" | "class" | "kind">): Gate["claim"] {
  if (g.verdict === "WITHHELD") return "withheld";
  if (g.verdict === "FAIL") return "not-shown";
  if (g.kind === "integrity") return "integrity";
  if (g.class === "C" || g.class === "D") return "mechanism";
  return g.verdict === "PASS" ? "named-behaviour" : "partial";
}

const parse = <T,>(b: ArrayBuffer): T => JSON.parse(new TextDecoder().decode(b)) as T;

export async function runChecks(get: (file: string) => Promise<ArrayBuffer>, expectedManifestSha256: string): Promise<Check[]> {
  const out: Check[] = [];
  const add = (group: string, name: string, ok: boolean, detail: string) => out.push({ group, name, ok, detail });

  // 1 · integrity: the manifest this page was built from, then every file against the manifest
  const mBytes = await get("manifest.json");
  const mSha = await sha256Hex(mBytes);
  add("Integrity", "manifest.json is the one this page was built from", mSha === expectedManifestSha256, `sha256 ${mSha.slice(0, 16)}…`);
  const manifest = parse<Manifest>(mBytes);
  const bytes: Record<string, ArrayBuffer> = {};
  for (const f of DATA_FILES) {
    bytes[f] = await get(f);
    const want = manifest.files.find((x) => x.path === f);
    const got = await sha256Hex(bytes[f]);
    add("Integrity", `${f} matches its sha256 in the manifest`, !!want && want.sha256 === got && want.bytes === bytes[f].byteLength, `sha256 ${got.slice(0, 16)}…, ${bytes[f].byteLength} bytes`);
  }
  const v = parse<Verdicts>(bytes["verdicts.json"]);
  const p = parse<Preregs>(bytes["preregs.json"]);

  // 2 · the beacon: the chain, each round's publication time, and the order freeze → publication
  add(
    "Beacon",
    "the export names drand's quicknet chain",
    v.drand.chain_hash === QUICKNET.chain_hash && v.drand.genesis === QUICKNET.genesis && v.drand.period_s === QUICKNET.period_s,
    `chain ${v.drand.chain_hash.slice(0, 12)}…, genesis ${v.drand.genesis}, period ${v.drand.period_s} s`,
  );
  for (const r of v.rounds) {
    const t = roundTime(r.round);
    add("Beacon", `round ${r.round} published at genesis + (round − 1) × 3 s`, t === r.published_at, `computed ${t}`);
    const gap = secondsBefore(r.round, r.frozen_at);
    add("Beacon", `round ${r.round} published more than ${MARGIN_S} s after the freeze`, gap > MARGIN_S, `${gap} s after the freeze (${r.frozen_basis})`);
    if (r.commitment_pushed_at) {
      const lead = secondsBefore(r.round, r.commitment_pushed_at);
      add("Beacon", `round ${r.round} was chosen and pushed before it published`, lead > 0, `pushed ${lead} s before publication`);
    }
  }

  // 3 · the records agree with each other
  for (const g of v.gates) {
    const r = v.rounds.find((x) => x.round === g.round);
    add("Records", `${g.id} is listed under its seal round`, !!r && r.gates.includes(g.id), `round ${g.round}`);
    const want = expectedClaim(g);
    add("Records", `${g.id} is shown as ${want}`, g.claim === want, `${g.verdict}, Class ${g.class}`);
    const pr = p.preregs.find((x) => x.id === g.id);
    add("Records", `${g.id} pre-registration hash matches its verdict record`, !!pr && pr.prereg_sha256 === g.prereg_sha256, g.prereg_sha256.slice(0, 16) + "…");
    if (g.stats?.per_seed && g.stats.median !== null) {
      const m = median(g.stats.per_seed);
      add("Statistics", `${g.id} median recomputes from its ${g.stats.per_seed.length} per-seed scores`, g.stats.per_seed.length === g.stats.n && Math.abs(m - g.stats.median) <= MEDIAN_TOLERANCE, `recomputed ${m.toFixed(7)}, sealed ${g.stats.median}`);
    }
  }
  const c = { sealed: 0, pass: 0, partial: 0, fail: 0, withheld: 0, superseded: 0, claimable_pass: 0, integrity_pass: 0 };
  for (const g of v.gates) {
    c.sealed++;
    c[g.verdict.toLowerCase() as "pass" | "partial" | "fail" | "withheld"]++;
    if (g.superseded_by) c.superseded++;
    if (expectedClaim(g) === "named-behaviour") c.claimable_pass++;
    if (expectedClaim(g) === "integrity") c.integrity_pass++;
  }
  const same = (Object.keys(c) as (keyof typeof c)[]).every((k) => v.counts[k] === c[k]);
  add("Records", "the verdict counts recompute from the gate records", same, `${c.sealed} sealed: ${c.pass} PASS, ${c.fail} FAIL, ${c.withheld} WITHHELD`);
  return out;
}
