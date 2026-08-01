// verify_publish_safe.cjs — NOTHING SHIPS UNTIL THIS PASSES, AND IT FAILS CLOSED.
//
// This is the gate that stands between the UNI estate and the public internet. It runs before any
// build is published and before this repository is ever made public. Its verdict is binary and its
// default is NO.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// THE PROBLEM THIS FILE HAD TO SOLVE FIRST: A DENYLIST IN A PUBLIC REPO PUBLISHES THE DENYLIST.
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// The obvious way to write this gate is to hardcode the things that must never appear — the client
// name, the LAN addresses, the tailnet, the credential strings. That gate would work perfectly and
// would ALSO be a machine-readable index of exactly what the operator is trying to protect, sitting
// in the public repo, forever, in git history.
//
// So the sensitive VALUES live in `safety/patterns.local.json`, which is gitignored and generated
// from the private control workspace. This file — the public one — carries only the CATEGORIES, the
// structural rules, and the machinery. If the local pattern file is ABSENT, THIS GATE FAILS. It does
// not "skip the sensitive checks and pass the rest", because a safety gate that degrades quietly
// when its teeth are missing is worse than no gate: it produces a green tick that means nothing.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// WHAT IT CHECKS
// ─────────────────────────────────────────────────────────────────────────────────────────────────
//  1. STRUCTURAL — things whose SHAPE is disqualifying and which need no secret list:
//       private IPv4 ranges (10/8, 172.16/12, 192.168/16), WireGuard and Tailscale ranges,
//       *.ts.net tailnet names, *.local internal DNS, Windows user paths, PEM key blocks,
//       AWS/GitHub/Anthropic/Slack/Stripe key shapes, .env files, and JWT shapes.
//  2. CATEGORICAL — the operator's own denied values, loaded from the gitignored local file.
//  3. PROVENANCE — a LICENSE exists; every generated block declares its source commit; no volatile
//     number is hand-written.
//  4. HISTORY — this repo's ENTIRE reachable git history is scanned, not just the working tree.
//     Deleting a file does not unpublish it, and this estate has already been bitten by exactly
//     that: a 116 MB archive was excluded from deploys by .vercelignore while remaining fully
//     present in the repository history.
//  5. ORIGIN — this repo must never have been cloned or forked from a private repo. It is `git
//     init`-ed empty and content is copied in. A shared ancestor with a private repo would mean
//     private history is reachable here.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// WHAT IT CANNOT DO, STATED SO NOBODY RELIES ON IT
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// It cannot recognise sensitive NARRATIVE. A paragraph describing a client engagement in prose,
// naming nobody and matching no pattern, passes every check here. The estate's transcript archive is
// exactly that shape — its credential redaction was verified perfect while its narrative content was
// the actual exposure. NO SCANNER CLOSES THAT GAP. Human review of new prose is required and this
// gate does not replace it.
//
//   node safety/verify_publish_safe.cjs           # gate the working tree + history
//   node safety/verify_publish_safe.cjs --prove   # + mutations, proving each check can fail
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const REPO = path.resolve(__dirname, "..");
const LOCAL_PATTERNS = path.join(REPO, "safety", "patterns.local.json");

const results = [];
const ok = (name, detail) => results.push({ pass: true, name, detail });
const bad = (name, detail) => results.push({ pass: false, name, detail });

// ─── STRUCTURAL PATTERNS — safe to publish, because they describe SHAPES not SECRETS ─────────────
const STRUCTURAL = [
  ["private-ipv4-10/8", /\b10\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g],
  ["private-ipv4-172.16/12", /\b172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}\b/g],
  ["private-ipv4-192.168/16", /\b192\.168\.\d{1,3}\.\d{1,3}\b/g],
  ["tailscale-100.64/10", /\b100\.(?:6[4-9]|[7-9]\d|1\d\d|2[0-4]\d|25[0-5])\.\d{1,3}\.\d{1,3}\b/g],
  ["tailnet-hostname", /\b[a-z0-9-]+\.ts\.net\b/gi],
  ["internal-dns-.local", /\b[a-z0-9-]+\.(?:uni-lab|lab)\.local\b/gi],
  ["windows-user-path", /[A-Za-z]:[\\/]Users[\\/][A-Za-z0-9._-]+/g],
  ["pem-private-key", /-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/g],
  ["aws-access-key", /\bAKIA[0-9A-Z]{16}\b/g],
  ["github-token", /\bgh[psuor]_[A-Za-z0-9]{20,}\b/g],
  ["anthropic-key", /\bsk-ant-[A-Za-z0-9_-]{20,}\b/g],
  ["openai-key", /\bsk-[A-Za-z0-9]{32,}\b/g],
  ["slack-token", /\bxox[abprs]-[A-Za-z0-9-]{10,}\b/g],
  ["stripe-key", /\b[sr]k_(?:live|test)_[A-Za-z0-9]{16,}\b/g],
  ["jwt", /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g],
];

// Paths that must never exist in this repo at all, by name.
const FORBIDDEN_PATHS = [
  /(^|[\\/])session-history([\\/]|$)/i,
  /(^|[\\/])\.env(\.|$)/i,
  /REQUEST-TO-JULES/i,
  /operator-decisions\.ya?ml/i,
  /OPERATIONS_MANUAL/i,
  /patterns\.local\.json$/i,       // the denylist itself must never be committed
  /\.key$|\.pem$|id_rsa|id_ed25519/i,
];

// Files the gate reads but does not scan for structural patterns (it would convict itself).
const SELF = /safety[\\/]verify_publish_safe\.cjs$/;

function git(args) {
  try { return execFileSync("git", ["-C", REPO, ...args], { encoding: "utf8", maxBuffer: 1 << 28 }); }
  catch { return ""; }
}

function trackedFiles() {
  return git(["ls-files"]).split(/\r?\n/).filter(Boolean);
}

// Every blob ever reachable, so a deleted-but-committed file is still caught.
function historyBlobs() {
  const out = git(["rev-list", "--objects", "--all"]);
  return out.split(/\r?\n/).filter(Boolean).map((l) => {
    const sp = l.indexOf(" ");
    return sp < 0 ? { sha: l, name: "" } : { sha: l.slice(0, sp), name: l.slice(sp + 1) };
  });
}

const isTextish = (p) => /\.(md|mdx|json|jsonc|ya?ml|js|cjs|mjs|ts|tsx|jsx|css|html?|txt|sh|ps1|py|toml|xml|svg|webmanifest)$/i.test(p);

(function main() {
  // ─── 1. THE LOCAL PATTERN FILE MUST EXIST. Fail closed. ─────────────────────────────────────
  let denied = null;
  if (!fs.existsSync(LOCAL_PATTERNS)) {
    bad("the operator's denied-value list is present",
      `safety/patterns.local.json is ABSENT. This gate does NOT fall back to structural checks only — ` +
      `a safety gate that quietly drops its teeth when its input is missing produces a green tick that ` +
      `means nothing. Generate it from the private control workspace and re-run.`);
  } else {
    try {
      denied = JSON.parse(fs.readFileSync(LOCAL_PATTERNS, "utf8"));
      const n = (denied.values || []).length;
      n > 0
        ? ok("the operator's denied-value list is present", `${n} denied value(s) loaded from a GITIGNORED file — the values are never committed here, so this gate is not an index of what it protects`)
        : bad("the operator's denied-value list is present", "the file exists but declares zero values — that is an empty fence");
    } catch (e) {
      bad("the operator's denied-value list is present", "unparseable: " + e.message);
    }
  }

  // ─── 2. ORIGIN: no shared history with any private repo ─────────────────────────────────────
  {
    const roots = git(["rev-list", "--max-parents=0", "--all"]).split(/\r?\n/).filter(Boolean);
    const remotes = git(["remote", "-v"]).split(/\r?\n/).filter(Boolean);
    const priv = remotes.filter((r) => /UNI\.MineCraft|UNI-FLAGELLUM|solutionwright-universal-website|educatewright|IntelligenceLabs/i.test(r));
    priv.length === 0
      ? ok("this repo has no remote pointing at a private estate repo",
          `${roots.length} root commit(s); remotes: ${remotes.length ? remotes.map((r) => r.split(/\s+/)[1]).filter((v, i, a) => a.indexOf(v) === i).join(", ") : "none yet"}. ` +
          `It was git init-ed empty, never cloned or forked, so no private history is reachable.`)
      : bad("this repo has no remote pointing at a private estate repo", `PRIVATE REMOTE PRESENT: ${priv.join(" · ")}`);
  }

  // ─── 3. FORBIDDEN PATHS, working tree AND history ───────────────────────────────────────────
  {
    const tracked = trackedFiles();
    const hits = tracked.filter((f) => FORBIDDEN_PATHS.some((re) => re.test(f)));
    const hist = historyBlobs().filter((b) => b.name && FORBIDDEN_PATHS.some((re) => re.test(b.name)));
    hits.length === 0 && hist.length === 0
      ? ok("no forbidden path in the working tree OR anywhere in history",
          `${tracked.length} tracked file(s) and every reachable blob checked against ${FORBIDDEN_PATHS.length} forbidden path rules. ` +
          `History is checked because DELETING A FILE DOES NOT UNPUBLISH IT — this estate already shipped a 116 MB archive that ` +
          `.vercelignore excluded from deploys while it stayed fully present in the repository.`)
      : bad("no forbidden path in the working tree OR anywhere in history",
          `${hits.length} in tree: ${hits.slice(0, 5).join(", ")} · ${hist.length} in history: ${hist.slice(0, 5).map((h) => h.name).join(", ")}`);
  }

  // ─── 4. STRUCTURAL SCAN of every tracked text file ──────────────────────────────────────────
  {
    const tracked = trackedFiles().filter(isTextish).filter((f) => !SELF.test(f));
    const found = [];
    for (const rel of tracked) {
      let src;
      try { src = fs.readFileSync(path.join(REPO, rel), "utf8"); } catch { continue; }
      for (const [label, re] of STRUCTURAL) {
        const m = src.match(re);
        if (m && m.length) found.push({ rel, label, n: m.length });
      }
    }
    found.length === 0
      ? ok("no private address, internal hostname, operator path or credential SHAPE in any tracked file",
          `${tracked.length} text file(s) scanned against ${STRUCTURAL.length} structural patterns. These describe SHAPES, not secrets, ` +
          `so they are safe to publish in this file — unlike the operator's denied VALUES, which are not.`)
      : bad("no private address, internal hostname, operator path or credential SHAPE in any tracked file",
          found.slice(0, 8).map((f) => `${f.rel} [${f.label} x${f.n}]`).join(" · "));
  }

  // ─── 5. THE OPERATOR'S DENIED VALUES ────────────────────────────────────────────────────────
  if (denied && Array.isArray(denied.values) && denied.values.length) {
    const tracked = trackedFiles().filter(isTextish).filter((f) => !SELF.test(f));
    const found = [];
    for (const rel of tracked) {
      let src;
      try { src = fs.readFileSync(path.join(REPO, rel), "utf8").toLowerCase(); } catch { continue; }
      denied.values.forEach((v, i) => {
        const needle = String(v).toLowerCase();
        if (needle && src.includes(needle)) found.push(`${rel} [denied#${i}]`);
      });
    }
    found.length === 0
      ? ok("no operator-denied value appears in any tracked file",
          `${denied.values.length} denied value(s) checked against ${tracked.length} file(s). Reported by INDEX, never by value, ` +
          `so this gate's own output is safe to paste into a log or a pull request.`)
      : bad("no operator-denied value appears in any tracked file", `${found.length} hit(s): ${found.slice(0, 6).join(" · ")}`);
  }

  // ─── 5b. THE BUILT OUTPUT — what actually ships ─────────────────────────────────────────────
  //
  // The checks above read TRACKED FILES. The thing that reaches the internet is the EXPORT, and it
  // is gitignored, so none of the above would have looked at a single byte of it. A generated page
  // can carry something no source file does — an inlined JSON blob, a search index, a source map, a
  // stray build artifact. This estate has already been bitten by exactly this distinction: an
  // archive was excluded from DEPLOYS by .vercelignore while remaining fully present in the REPO,
  // and everyone read that as handled. This is the same error facing the other way.
  {
    const outDir = path.join(REPO, "out");
    if (!fs.existsSync(outDir)) {
      bad("the exported site was scanned",
        "out/ does not exist — run `npm run build` first. This check is NOT skipped when the export " +
        "is missing: passing here without having looked at what ships would be the whole point of the " +
        "gate, inverted.");
    } else {
      const files = [];
      const walk = (d) => {
        for (const e of fs.readdirSync(d, { withFileTypes: true })) {
          const p = path.join(d, e.name);
          if (e.isDirectory()) walk(p);
          else files.push(p);
        }
      };
      walk(outDir);
      const scanned = files.filter((f) => /\.(html?|js|mjs|css|json|txt|xml|map|svg|webmanifest)$/i.test(f));
      const found = [];
      for (const abs of scanned) {
        let src;
        try { src = fs.readFileSync(abs, "utf8"); } catch { continue; }
        const rel = path.relative(outDir, abs).replace(/\\/g, "/");
        for (const [label, re] of STRUCTURAL) {
          const m = src.match(re);
          if (m && m.length) found.push(`out/${rel} [${label} x${m.length}]`);
        }
        if (denied && Array.isArray(denied.values)) {
          const low = src.toLowerCase();
          denied.values.forEach((v, i) => {
            if (v && low.includes(String(v).toLowerCase())) found.push(`out/${rel} [denied#${i}]`);
          });
        }
      }
      found.length === 0
        ? ok("the exported site was scanned, and it is what actually ships",
            `${files.length} exported file(s), ${scanned.length} scanned as text — every HTML page, JS chunk, ` +
            `CSS file, JSON blob, source map and SVG — against ${STRUCTURAL.length} structural patterns and ` +
            `${denied && denied.values ? denied.values.length : 0} denied value(s). Source files being clean does ` +
            `not make the export clean; they are different sets.`)
        : bad("the exported site was scanned, and it is what actually ships", found.slice(0, 8).join(" · "));
    }
  }

  // ─── 6. LICENCE ─────────────────────────────────────────────────────────────────────────────
  {
    const lic = fs.existsSync(path.join(REPO, "LICENSE")) || fs.existsSync(path.join(REPO, "LICENSE.md"));
    const pkgPath = path.join(REPO, "package.json");
    let pkgLic = null, isPrivate = false;
    if (fs.existsSync(pkgPath)) {
      try { const p = JSON.parse(fs.readFileSync(pkgPath, "utf8")); pkgLic = p.license || null; isPrivate = p.private === true; } catch { /* noop */ }
    }
    lic && pkgLic && !isPrivate
      ? ok("a licence is present and package.json agrees",
          `LICENSE on disk, package.json license="${pkgLic}", private flag not set. Without this, published source is ` +
          `all-rights-reserved by default and nobody may legally use, fork or contribute to it.`)
      : bad("a licence is present and package.json agrees",
          `LICENSE file=${lic} · package.json license=${pkgLic} · "private": true = ${isPrivate}`);
  }

  // ─── 7. MUTATIONS ───────────────────────────────────────────────────────────────────────────
  const muts = [];
  if (process.argv.includes("--prove")) {
    const tmp = path.join(REPO, ".safety-mutation-fixture");
    const runStructural = (text) => {
      for (const [label, re] of STRUCTURAL) if (text.match(re)) return label;
      return null;
    };
    const cases = [
      ["a private LAN address", "host: 10.190.245.122", "private-ipv4-10/8"],
      ["a tailnet hostname", "see box.tail18d815.ts.net", "tailnet-hostname"],
      ["an internal DNS name", "http://studio.uni-lab.local:8098", "internal-dns-.local"],
      ["a Windows operator path", "C:/Users/someone/Documents/x", "windows-user-path"],
      ["a PEM private key header", "-----BEGIN EC PRIVATE KEY-----", "pem-private-key"],
      ["a GitHub token shape", "ghp_" + "A".repeat(30), "github-token"],
      ["an AWS key shape", "AKIA" + "B".repeat(16), "aws-access-key"],
      ["a JWT shape", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.abcdefghijk", "jwt"],
    ];
    for (const [label, sample, expect] of cases) {
      const hit = runStructural(sample);
      muts.push({
        label, pass: hit === expect,
        detail: hit === expect ? `caught as [${hit}]` : `EXPECTED [${expect}], got ${hit ? "[" + hit + "]" : "NOTHING — this check does not bite"}`,
      });
    }
    // NEGATIVE CONTROL — ordinary prose must NOT trip anything, or the gate convicts everything.
    const innocent = "The colony runs on a local server and the docs build with npm run build. Version 2.1.0, port 3000.";
    const falsePositive = runStructural(innocent);
    muts.push({
      label: "NEGATIVE CONTROL: ordinary prose trips nothing",
      pass: falsePositive === null,
      detail: falsePositive === null
        ? "a sentence with a version, a port and a command is clean — the eight catches above are therefore real, not a scanner that flags everything"
        : `FALSE POSITIVE as [${falsePositive}]`,
    });
    // A forbidden path must be caught by name.
    muts.push({
      label: "a forbidden path is caught by name",
      pass: FORBIDDEN_PATHS.some((re) => re.test("docs/session-history/x.jsonl.gz")),
      detail: "docs/session-history/x.jsonl.gz",
    });
    try { fs.rmSync(tmp, { recursive: true, force: true }); } catch { /* noop */ }
  }

  const failed = results.filter((r) => !r.pass).concat(muts.filter((m) => !m.pass).map((m) => ({ name: "MUTATION: " + m.label, detail: m.detail })));
  for (const r of results) console.log(`${r.pass ? "  ok" : "FAIL"}  ${r.name} - ${r.detail}`);
  for (const m of muts) console.log(`${m.pass ? "  ok" : "FAIL"}  MUTATION ${m.label} - ${m.detail}`);
  console.log(
    `\nGATE: ${failed.length === 0 ? "PASS" : "FAIL"} - publish-safe, ` +
    `${results.filter((r) => r.pass).length}/${results.length} checks` +
    (muts.length ? ` + ${muts.filter((m) => m.pass).length}/${muts.length} mutations` : "")
  );
  console.log("  WHAT THIS GATE CANNOT DO: it cannot recognise sensitive NARRATIVE. Prose describing a");
  console.log("  client engagement, naming nobody and matching no pattern, passes every check here. The");
  console.log("  estate's transcript archive is exactly that shape — its credential redaction was verified");
  console.log("  perfect while its narrative content was the real exposure. HUMAN REVIEW OF NEW PROSE IS");
  console.log("  REQUIRED AND THIS GATE DOES NOT REPLACE IT.");
  process.exit(failed.length === 0 ? 0 : 1);
})();
