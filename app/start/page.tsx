import Link from "next/link";
import OnRamp from "../components/OnRamp";
import onramp from "../../content/generated/onramp.json";

export const metadata = {
  title: "Begin where you are",
  description:
    "A gentle way in to Universal Natural Intelligence — for anyone, at any age. Start from something you already do, guess before you look, and follow your own path in.",
};

type Persona = { id: string; label: string; invite: string; cards: { theme: string; kicker: string; question: string; choices: { label: string; peek: string; found: string }[] }[] };
const data = onramp as unknown as { default_persona: string; personas: Persona[] };

/**
 * THE ON-RAMP — the threshold the operator has asked for since the beginning: meet the traveler
 * where they are, on a continuum that starts from their OWN experience, with the moderate surprise
 * that re-opens learning mode built into the loop itself.
 *
 * The interactive loop needs JavaScript. If it is off, the reader is NOT stranded: the invites are
 * shown as plain text and the three doors are right there. Nobody is required to run a script to get
 * in — that would be the opposite of meeting them where they are.
 */
export default function StartPage() {
  return (
    <div className="threshold">
      <p className="eyebrow" style={{ textAlign: "center" }}>Begin where you are</p>
      <h1>You already do this.</h1>
      <p className="lede">
        Intelligence — the kind this whole project studies — is a loop you have run your whole life:
        you <b>guess</b> what is coming, you <b>look</b>, and the gap between the two is what you learn
        from. That is all it is. Start from something you already do, and follow your own way in.
      </p>

      <OnRamp personas={data.personas} defaultPersona={data.default_persona} />

      <noscript>
        <p className="reassure">
          The guided loop needs JavaScript, which is off. That is completely fine — here is the same
          welcome in words, and the doors are below.
        </p>
        <div className="personas">
          {data.personas.slice(0, 12).map((p) => (
            <div className="persona" key={p.id}>
              <b>{p.label}</b>
              <span>{p.invite}</span>
            </div>
          ))}
        </div>
        <div className="doors">
          <Link className="door" href="/articles/start-here/"><b>Understand it</b><span className="dim">The idea, in order.</span></Link>
          <Link className="door" href="/coverage/"><b>See it measured</b><span className="dim">Every claim is gated.</span></Link>
          <Link className="door" href="/wiki/"><b>Read the source</b><span className="dim">The documents themselves.</span></Link>
        </div>
      </noscript>

      <p className="reassure" style={{ marginTop: 26 }}>
        Nothing here asks you to decide, diagnose, or fix anything. It does not track you and it sends
        nothing anywhere. If a page ever feels too fast or too much, that is information too — slow
        down, or leave; it will still be here.
      </p>
    </div>
  );
}
