// build_onramp.cjs — inline the gentle-entry pedagogy into the static site.
//
// WHY THIS EXISTS, AND WHAT IT DELIBERATELY LEAVES BEHIND.
// The Precision site's gentle-entry already implements exactly the operator's brief: meet the
// traveler where they are (28 dignity-first personas in their own language), and a
// commit-before-peek loop where the gap between your guess and the world's answer is the "moderate
// surprise that re-opens learning mode." It is the single most valuable reusable asset for the
// all-ages requirement.
//
// But its live plumbing breaks the docs site's contract: it FETCHES its cards at runtime from
// /gentle-entry-data/*.json (a network call) and BEACONS analytics to an external origin. The docs
// site is a static export under a strict CSP (default-src 'self', no external connect-src) with a
// no-analytics promise. So this generator PORTS THE PEDAGOGY and LEAVES THE PLUMBING: it reads the
// EN data at BUILD time, keeps only the content fields (no beacon keys survive), and writes a single
// committed onramp.json the page imports. Nothing is fetched at runtime and nothing is emitted.
//
//   node generators/build_onramp.cjs
"use strict";

const fs = require("fs");
const path = require("path");

const REPO = path.resolve(__dirname, "..");
const OUT = path.join(REPO, "content", "generated", "onramp.json");
const ROOTS_FILE = path.join(__dirname, "roots.local.json");

if (!fs.existsSync(ROOTS_FILE)) { console.error("REFUSING: generators/roots.local.json is absent."); process.exit(1); }
const roots = JSON.parse(fs.readFileSync(ROOTS_FILE, "utf8")).roots || {};
const SRC = roots["uni-precision"];
if (!SRC || !fs.existsSync(SRC)) {
  console.error("REFUSING: the uni-precision root is not mapped or not present.");
  console.error("  The on-ramp content lives in the Precision repo's gentle-entry-data/. Map it in");
  console.error("  roots.local.json, or the site would ship an empty threshold.");
  process.exit(1);
}
const DATA = path.join(SRC, "gentle-entry-data");
const read = (f) => JSON.parse(fs.readFileSync(path.join(DATA, f), "utf8"));

// EN only. The multilingual variants exist (cards.es/fr/hi/ar) and are a future decision; shipping
// one language cleanly beats shipping five half-wired. Recorded here so the omission is not silent.
// Each collection may be an array OR an object keyed by id — normalise to an array.
const asArray = (v) => (Array.isArray(v) ? v : Object.values(v || {}));

const personas = asArray(read("personas.json").personas).filter((p) => (p.lang_default || "en") === "en");
const pathwaysById = new Map(asArray(read("pathways.json").pathways).map((p) => [`${p.persona}-${p.lang}`, p]));
const cardsRaw = read("cards.json").cards;
// cards may be keyed by id (object) or a list with an .id field.
const cardsById = new Map(
  Array.isArray(cardsRaw)
    ? cardsRaw.map((c) => [c.id, c])
    : Object.entries(cardsRaw).map(([id, c]) => [id, { id, ...c }])
);

// Keep ONLY content fields. Any stray analytics/beacon key in the source is dropped by construction —
// we name the fields we copy rather than spreading the object.
const cleanChoice = (ch) => ({ label: String(ch.label), peek: String(ch.peek), found: String(ch.found || "") });
const cleanCard = (c) => ({
  theme: String(c.theme || ""),
  kicker: String(c.kicker || ""),
  question: String(c.question || ""),
  choices: (c.choices || []).map(cleanChoice),
});

const out = [];
let missing = 0;
for (const p of personas) {
  const pw = pathwaysById.get(p.pathway) || pathwaysById.get(`${p.id}-en`);
  if (!pw) { missing++; continue; }
  const cards = (pw.nodes || []).map((id) => cardsById.get(id)).filter(Boolean).map(cleanCard);
  if (!cards.length) { missing++; continue; }
  out.push({ id: p.id, label: String(p.label), invite: String(p.invite), cards });
}

if (!out.length) { console.error("REFUSING: resolved zero personas — the data shape changed."); process.exit(1); }

// A "just curious" default lane, chosen so a first arrival is never asked to self-classify before
// they can begin. Prefer an explicit general persona if one exists; else the first.
const preferred = out.find((p) => /curious|beginner|anyone|start|general/i.test(p.id + " " + p.label)) || out[0];

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({
  schema_version: 1,
  generated_by: "generators/build_onramp.cjs",
  note: [
    "The gentle-entry pedagogy, ported from the Precision site's gentle-entry-data (EN), inlined at",
    "build time. No runtime fetch, no analytics — the source's beacon plumbing is left behind. The",
    "loop is commit-before-peek: the reader guesses, THEN the world answers, and the gap is the",
    "lesson.",
  ],
  default_persona: preferred.id,
  personas: out,
}, null, 1) + "\n", "utf8");

const nCards = out.reduce((n, p) => n + p.cards.length, 0);
console.log(`on-ramp written: ${out.length} persona(s), ${nCards} card(s)${missing ? `, ${missing} skipped (no pathway/cards)` : ""}`);
console.log(`  default lane: ${preferred.id} (${preferred.label})`);
