"use client";

import Link from "next/link";
import { useState } from "react";

// THE COMMIT-BEFORE-PEEK LOOP, ported from the Precision site's gentle-entry.
//
// The reader picks a lane written in their own language, then walks five short cards. Each card asks
// them to COMMIT to a guess before anything is revealed — and the gap between their guess and the
// world's answer is the "moderate surprise" that re-opens learning mode. No card advances on its own;
// there is no forced next step; three doors are always the exit. Nothing is timed, nothing is scored,
// nothing is sent anywhere (the source's analytics beacon is deliberately not ported — see
// build_onramp.cjs). Reduced-motion is honoured by globals.css.

type Choice = { label: string; peek: string; found: string };
type Card = { theme: string; kicker: string; question: string; choices: Choice[] };
type Persona = { id: string; label: string; invite: string; cards: Card[] };

const emit = () => {}; // no-op: this site sends nothing. The pedagogy is ported, the beacon is not.

export default function OnRamp({ personas, defaultPersona }: { personas: Persona[]; defaultPersona: string }) {
  const [personaId, setPersonaId] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const persona = personas.find((p) => p.id === personaId) || null;

  // ── the threshold: pick a lane, or take the pre-selected "just curious" one ──
  if (!persona) {
    return (
      <div>
        <p className="reassure">
          No sign-up, no funnel, no rush. Pick the description that fits you today — or just start.
          You can leave whenever you like, and nothing here is sent anywhere.
        </p>
        <div style={{ textAlign: "center", margin: "18px 0 8px" }}>
          <button
            className="door"
            style={{ display: "inline-block", cursor: "pointer", border: "1px solid var(--acc)", maxWidth: 420 }}
            onClick={() => { setPersonaId(defaultPersona); setStep(0); setPicked(null); emit(); }}
          >
            <b>Just start</b>
            <span className="dim">Five short cards. One guess each. Begin where anyone would.</span>
          </button>
        </div>
        <div className="personas">
          {personas.map((p) => (
            <button
              key={p.id}
              className="persona"
              style={{ cursor: "pointer", textAlign: "left" }}
              onClick={() => { setPersonaId(p.id); setStep(0); setPicked(null); emit(); }}
            >
              <b>{p.label}</b>
              <span>{p.invite}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const card = persona.cards[step];
  const done = step >= persona.cards.length;

  // ── the three doors, at the end (and always reachable) ──
  if (done || !card) {
    return (
      <div>
        <p className="lede" style={{ textAlign: "center" }}>
          That is the whole idea: you never arrive blank — you arrive already leaning, and the world
          corrects you. Where would you like to go next?
        </p>
        <Doors />
        <p style={{ textAlign: "center", marginTop: 18 }}>
          <button className="pill" style={{ cursor: "pointer", background: "transparent" }} onClick={() => { setPersonaId(null); setStep(0); setPicked(null); }}>
            ← start over
          </button>
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="dim" aria-live="polite">
        {persona.label} · card {step + 1} of {persona.cards.length}
      </p>
      <section className="card" aria-labelledby="onramp-q">
        <p className="eyebrow">{card.kicker}</p>
        <p id="onramp-q" className="lede" style={{ marginBottom: 14 }}>{card.question}</p>

        {card.choices.map((ch, i) => {
          const chosen = picked === i;
          return (
            <div key={i} style={{ margin: "8px 0" }}>
              <button
                className="persona"
                style={{ cursor: "pointer", width: "100%", borderColor: chosen ? "var(--acc)" : undefined }}
                aria-pressed={chosen}
                onClick={() => { if (picked === null) { setPicked(i); emit(); } }}
                disabled={picked !== null && !chosen}
              >
                <b>{ch.label}</b>
                {chosen ? <span style={{ marginTop: 8, display: "block" }}>{ch.peek}</span> : null}
              </button>
            </div>
          );
        })}

        {picked !== null ? (
          <p style={{ marginTop: 16 }}>
            <button
              className="door"
              style={{ display: "inline-block", cursor: "pointer", padding: "12px 18px" }}
              onClick={() => { setStep(step + 1); setPicked(null); emit(); }}
            >
              <b>{step + 1 < persona.cards.length ? "Next →" : "See where to go →"}</b>
            </button>
          </p>
        ) : (
          <p className="dim" style={{ marginTop: 12 }}>Commit to a guess to see what is actually there.</p>
        )}
      </section>
    </div>
  );
}

function Doors() {
  return (
    <div className="doors">
      <Link className="door" href="/articles/start-here/">
        <b>Understand it</b>
        <span className="dim">The idea, in the order you have to meet it. Six ideas, each needed for the next.</span>
      </Link>
      <Link className="door" href="/coverage/">
        <b>See it measured</b>
        <span className="dim">Every claim here is gated. The proof that nothing is unaccounted for — including what failed.</span>
      </Link>
      <Link className="door" href="/wiki/">
        <b>Read the source</b>
        <span className="dim">The estate's own documents, rendered as written, grouped by what you might be trying to do.</span>
      </Link>
    </div>
  );
}
