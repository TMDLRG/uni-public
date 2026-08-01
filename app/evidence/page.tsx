import Link from "next/link";
import { docs, pagesInCorpus } from "../lib/docs";

export const metadata = { title: "Evidence & Verdicts" };

/**
 * The receipts, given their own room.
 *
 * These are the least glamorous documents in the estate and, to a sceptical reader, the most
 * important ones. Anyone can write an architecture page describing a rigorous method. A dated ledger
 * of the method actually running — including the runs that failed — is the part that cannot be
 * faked cheaply.
 *
 * They are OFF the main wiki index for a reason that is about the reader, not about secrecy: 87
 * dated evidence stubs in the same list as the 24 documents that explain the system would bury the
 * explanation under the proof.
 */
export default function Evidence() {
  const corpus = docs.corpora.find((c) => c.id === "evidence");
  if (!corpus || !corpus.available) {
    return (
      <>
        <h1>Evidence &amp; Verdicts</h1>
        <p className="dim">This corpus is not available in the current build: {corpus?.reason ?? "not declared"}.</p>
      </>
    );
  }

  const pages = pagesInCorpus("evidence");
  const group = (re: RegExp) => pages.filter((p) => re.test(p.slug));
  const preregs = group(/red[_-]?prereg|_red$|-red-/i);
  const verdicts = group(/lab[_-]team[_-]review/i);
  const rest = pages.filter((p) => !preregs.includes(p) && !verdicts.includes(p));

  const Section = ({ title, blurb, items }: { title: string; blurb: string; items: typeof pages }) =>
    items.length ? (
      <section className="card">
        <h3>{title} <span className="dim">({items.length})</span></h3>
        <p className="dim">{blurb}</p>
        <ul className="toc">
          {items.map((p) => (
            <li key={p.slug}>
              <Link href={`/wiki/${p.slug}/`}>{p.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    ) : null;

  return (
    <>
      <h1>Evidence &amp; Verdicts</h1>
      <p className="lede">
        {pages.length} dated documents recording that the method described in the{" "}
        <Link href="/wiki/">wiki</Link> was actually carried out — and what happened when it was.
      </p>

      <div className="note">
        <b>Why this is a separate section, and why it exists at all.</b> Anyone can publish an
        architecture page describing a rigorous method. What is expensive to fake is a dated ledger of
        that method running, kept whether or not the result was flattering. These are those records.
        They are here rather than in the main index because {pages.length} evidence stubs would bury
        the two dozen documents that actually explain the system.
      </div>

      <h2>What a receipt is</h2>
      <section className="card">
        <p>
          A <b>pre-registration</b> is written <i>before</i> a run, and pins what would count as a
          pass and what would count as a falsification. Writing it afterwards is the failure mode it
          exists to prevent — you cannot decide what the evidence meant once you have seen it.
        </p>
        <p>
          A <b>verdict</b> is the output of an adversarial review in which five separate personas
          attack a proposed change independently, and a sixth defends the human who will have to
          operate it. <b>One of the verdicts published here came back FAIL and held a ship gate.</b>{" "}
          That one is worth more than the rest combined, because it is the evidence that the review
          is real rather than decorative.
        </p>
        <p className="dim">
          A <b>receipt</b> is the record of a specific run: what was measured, on what commit, with
          what result — including the adverse ones.
        </p>
      </section>

      <Section
        title="Pre-registrations"
        blurb="Written before the run, pinning the pass and falsification criteria in advance."
        items={preregs}
      />
      <Section
        title="Adversarial review verdicts"
        blurb="Five personas attacking a change independently, merged into one verdict. Includes at least one FAIL."
        items={verdicts}
      />
      <Section
        title="Receipts and handoffs"
        blurb="Dated records of individual runs, incidents and session boundaries."
        items={rest}
      />
    </>
  );
}
