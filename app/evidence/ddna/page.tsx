import Link from "next/link";
import index from "../../../content/generated/science.json";
import manifestJson from "../../../public/evidence/ddna/data/manifest.json";
import verdictsJson from "../../../public/evidence/ddna/data/verdicts.json";
import preregsJson from "../../../public/evidence/ddna/data/preregs.json";
import mathJson from "../../../public/evidence/ddna/data/math.json";
import parityJson from "../../../public/evidence/ddna/data/parity.json";
import ScienceChecks from "./ScienceChecks";
import { QUICKNET, secondsBefore } from "./checks";
import type { Gate, Manifest, MathFile, Parity, Preregs, Verdicts } from "./types";

export const metadata = {
  title: "Follow the science: DDNA",
  description:
    "Every sealed gate verdict of the DDNA active-inference project, with its pre-registration, receipt hash and beacon round, and the checks your browser can run on them.",
};

/**
 * THE DDNA "FOLLOW THE SCIENCE" PAGE (W-621).
 *
 * Fed one way from the private UNI.DDNA trunk at a named commit: its tools/public_export writes an
 * allowlisted export only when its own publication gate passes, generators/build_science.cjs copies it
 * here byte for byte, and this site's publish gate scans it again. The page renders those five files
 * and nothing else about DDNA. The one-line verdict descriptions are the project's own, written under
 * its claim fence and checked line by line by the export gate; every number comes from the export.
 */

const manifest = manifestJson as unknown as Manifest;
const v = verdictsJson as unknown as Verdicts;
const preregs = (preregsJson as unknown as Preregs).preregs;
const math = mathJson as unknown as MathFile;
const parity = parityJson as unknown as Parity;

const DATA = "/evidence/ddna/data/";
const short = (h: string, n = 12) => `${h.slice(0, n)}…`;
const pill = (verdict: string) => (verdict === "PASS" ? "ok" : verdict === "FAIL" ? "bad" : "warn");
const CLAIM_LABEL: Record<Gate["claim"], string> = {
  "named-behaviour": "named behaviour (Class A/B)",
  partial: "partial",
  mechanism: "mechanism only, not a claim (Class C/D)",
  integrity: "integrity check, never a capability PASS",
  "not-shown": "not shown",
  withheld: "no verdict",
};

/** Registered text keeps its own markup: `code` spans and **bold**. Rendered, never interpreted. */
function Registered({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((s, i) =>
        s.startsWith("`") ? <code key={i}>{s.slice(1, -1)}</code> : s.startsWith("**") ? <strong key={i}>{s.slice(2, -2)}</strong> : <span key={i}>{s}</span>,
      )}
    </>
  );
}

function GateCard({ g }: { g: Gate }) {
  const s = g.stats;
  return (
    <section className="card" id={`gate-${g.id}`}>
      <h3 style={{ marginTop: 0 }}>
        {g.id} <span className={`pill ${pill(g.verdict)}`}>{g.verdict}</span> <span className="pill warn">Class {g.class}</span>{" "}
        {g.kind === "integrity" && <span className="pill warn">integrity check</span>}{" "}
        {g.superseded_by && <span className="dim">superseded by {g.superseded_by}</span>}
      </h3>
      <p>{g.lines.behaviour}</p>
      <p className="note">
        <b>Fence.</b> {g.lines.fence}
      </p>
      <table>
        <tbody>
          <tr>
            <th>shown as</th>
            <td>{CLAIM_LABEL[g.claim]}</td>
            <th>sealed</th>
            <td className="mono">
              {g.date}, round {g.round}
            </td>
          </tr>
          {g.scoring !== "not assessed" && (
            <tr>
              <th>scored</th>
              <td colSpan={3}>{g.scoring === "live organism" ? "from the live organism's own behaviour" : g.scoring}</td>
            </tr>
          )}
          <tr>
            <th>node mode</th>
            <td className="mono">{g.mode}</td>
            <th>F bound tag</th>
            <td className="mono">{g.f_tag}</td>
          </tr>
          <tr>
            <th>N (effective)</th>
            <td className="mono">{s ? `${s.n} (${s.effective_n})` : "—"}</td>
            <th>median score</th>
            <td className="mono">{s?.median ?? "—"}</td>
          </tr>
          <tr>
            <th>pre-registration</th>
            <td className="mono" title={g.prereg_sha256}>
              {short(g.prereg_sha256)}
            </td>
            <th>receipt</th>
            <td className="mono" title={g.receipt_sha256}>
              {short(g.receipt_sha256)}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default function DdnaScience() {
  const current = v.gates.filter((g) => !g.superseded_by);
  const superseded = v.gates.filter((g) => g.superseded_by);
  const htSealed = parity.human_tests.filter((h) => h.status.startsWith("sealed")).length;
  const drandLink = (round: number) => `https://api.drand.sh/${QUICKNET.chain_hash}/public/${round}`;

  return (
    <>
      <p className="eyebrow">Evidence · DDNA</p>
      <h1>Follow the science: DDNA</h1>
      <p className="lede">
        DDNA is a hierarchy of active-inference nodes: a research organism developed in a private repository, with its results
        published here. Each of its capability gates is written down and frozen before it runs, then run once on seeds drawn from a
        public randomness beacon, and then sealed with its verdict, whether that verdict is PASS or FAIL. This page shows every
        sealed verdict, and your browser checks their integrity and arithmetic, not the experiments.
      </p>
      <p className="note">
        <b>A note on words.</b> &quot;Organism&quot;, &quot;womb&quot;, &quot;birth&quot;, &quot;life&quot; and &quot;offspring&quot; are the project&apos;s names
        for stages of a software schedule. They do not claim that DDNA is alive, aware or feels anything. A human-test stage names
        the human age band the test comes from, not an age of DDNA.
      </p>

      <section className="card">
        <p className="eyebrow">Where this comes from</p>
        <p>
          Read from the private UNI.DDNA repository at trunk commit <code>{index.source.commit_short}</code> ({index.source.commit_date}), through
          an allowlist and a claim-fence check that refuse the whole export if a single line fails, then scanned again by this
          site&apos;s publish gate. The repository is private, so the commit cannot be opened from here; the hashes below are what
          stays checkable.
        </p>
        <p className="dim">
          export manifest sha256 <code title={index.manifest_sha256}>{short(index.manifest_sha256, 16)}</code> · export tool {manifest.tool.version} at{" "}
          <code>{manifest.tool.commit.slice(0, 12)}</code> · DDNA-side gate {manifest.gate.ddna_side}: {manifest.gate.checks.join(", ")}
        </p>
        <p className="dim">
          References in the quoted text, such as ADR numbers, &quot;08 §5.6&quot;, &quot;CATALOGUE §0&quot; or &quot;[r2: C-1]&quot;, point to the
          project&apos;s private design records. They are kept as written so that quoted text still matches its hash.
        </p>
      </section>

      <h2>Where things stand</h2>
      <div className="grid">
        <div className="stat">
          <div className="n">{v.counts.sealed}</div>
          <div className="l">sealed verdicts</div>
        </div>
        <div className="stat">
          <div className="n">
            {v.counts.pass} / {v.counts.fail} / {v.counts.withheld}
          </div>
          <div className="l">PASS / FAIL / WITHHELD</div>
        </div>
        <div className="stat">
          <div className="n">{v.counts.claimable_pass}</div>
          <div className="l">PASS with claimable evidence (Class A/B capability)</div>
        </div>
        <div className="stat">
          <div className="n">{v.counts.integrity_pass}</div>
          <div className="l">integrity checks, never a capability PASS</div>
        </div>
        <div className="stat">
          <div className="n">
            {htSealed} / {parity.human_tests.length}
          </div>
          <div className="l">human-test items sealed</div>
        </div>
      </div>
      <ul>
        {parity.summary.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <h2>Check it yourself</h2>
      <p>
        Your browser fetches this site&apos;s copies of the five export files, recomputes their sha256 hashes, and recomputes what can be
        recomputed from the published numbers: when each beacon round published, whether that came after the pre-registration froze,
        each median from its per-seed scores, and the counts. Nothing is sent anywhere. The experiments themselves are not re-run
        here: they ran on the project&apos;s lab machines, and their receipts are private. Each receipt&apos;s sha256 is published so it
        can be checked if it is ever released.
      </p>
      <section className="card">
        <ScienceChecks manifestSha256={index.manifest_sha256} base={DATA} />
      </section>
      <p>
        <b>What these checks cannot do.</b>
      </p>
      <ul>
        <li>
          They catch a damaged or partly altered file. They cannot catch a consistent forgery by whoever builds this site: the
          expected hash comes from this same site. Someone who rewrote a verdict and also its counts, medians and hashes would
          pass every check.
        </li>
        <li>
          Freeze and push times are the project&apos;s own records from a private repository. Your browser checks the arithmetic on
          them, not that they are true.
        </li>
        <li>
          The full text of each pre-registration is not published, so its sha256 cannot be checked from this page. Like the
          receipt hashes, it can be checked only if the text is released.
        </li>
        <li>
          The beacon&apos;s BLS signature is not verified here, and the lab&apos;s seal code does not verify it either. The lab reads
          the randomness from drand&apos;s public API over HTTPS.
        </li>
      </ul>

      <h2>How a seal works</h2>
      <p>
        A sealed run takes its random seeds from a number that did not exist when the plan was frozen. The pre-registration is
        hashed and pushed first; a drand beacon round that has not yet been published is chosen; the seeds are then derived from the
        pre-registration&apos;s hash and that round&apos;s randomness. A round&apos;s publication time is fixed by arithmetic alone, so
        your browser can recompute it: genesis {QUICKNET.genesis} + (round − 1) × {QUICKNET.period_s} s. If the gap below were
        negative, the plan could have been frozen after its seeds were known; the lab&apos;s rule asks for more than {v.drand.margin_s} s.
      </p>
      <table>
        <thead>
          <tr>
            <th>round</th>
            <th>published</th>
            <th>plan frozen</th>
            <th>gap</th>
            <th>round chosen</th>
            <th>randomness</th>
            <th>gates sealed</th>
          </tr>
        </thead>
        <tbody>
          {v.rounds.map((r) => (
            <tr key={r.round}>
              <td className="mono">{r.round}</td>
              <td className="mono">{r.published_at}</td>
              <td className="mono">
                {r.frozen_at} ({r.frozen_basis})
              </td>
              <td className="mono">{secondsBefore(r.round, r.frozen_at)} s</td>
              <td className="mono">{r.commitment_pushed_at ?? "not recorded"}</td>
              <td className="mono">
                <a href={drandLink(r.round)} title={r.randomness} rel="noopener noreferrer">
                  {short(r.randomness, 10)}
                </a>
              </td>
              <td>{r.gates.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="dim">
        The randomness links open drand&apos;s own public record of each round, so you can compare the value yourself; this site
        makes no request to drand. The beacon&apos;s BLS signature is checked neither here nor by the lab&apos;s seal code.
      </p>

      <h2>Sealed verdicts</h2>
      <p>
        Each verdict concerns one named behaviour or property in the worlds its pre-registration declared. A PASS demonstrates it
        there; a FAIL or WITHHELD does not. Some are arithmetic identity checks or censuses, not an organism&apos;s behaviour. A PASS is
        not a claim of human parity. Class C and D results are shown as mechanism and are never claims. An integrity check confirms
        that machinery stays inside its registered fence; it is never a capability PASS and raises no ability domain. The line under
        each verdict says which, and what it does not show.
      </p>
      {current.map((g) => (
        <GateCard key={g.id} g={g} />
      ))}
      <details>
        <summary>Superseded verdicts ({superseded.length}): kept, never erased</summary>
        {superseded.map((g) => (
          <GateCard key={g.id} g={g} />
        ))}
      </details>

      <h2>What was registered before each run</h2>
      <p>
        The first paragraph of each frozen pre-registration&apos;s hypothesis and falsifier, verbatim, with its arms. The sha256 of the
        whole frozen text is the hash in the verdict record above. The whole text is not published; like the receipt hashes, this
        hash can be checked only if the text is released.
      </p>
      {preregs.map((p) => (
        <details key={p.id}>
          <summary>
            {p.id} <span className="dim">pre-registration {short(p.prereg_sha256)}</span>
          </summary>
          <p>
            <b>Hypothesis.</b> <Registered text={p.hypothesis} />
          </p>
          <ul>
            {p.arms.map((a) => (
              <li key={a.name}>
                <code>{a.name}</code>
                {a.note ? (
                  <>
                    : <Registered text={a.note} />
                  </>
                ) : null}
              </li>
            ))}
          </ul>
          <p>
            <b>Falsifier.</b> <Registered text={p.falsifier} />
          </p>
          {p.cites_03.length > 0 && <p className="dim">Math cited: 03 {p.cites_03.join(", ")}</p>}
        </details>
      ))}

      <h2>The math these gates rest on</h2>
      <p>
        DDNA reports free energy F with the Friston sign, as an upper bound on surprisal: <code>{math.sign_convention}</code>. Every F
        it reports carries a bound tag, and only two tags guarantee the bound.
      </p>
      <table>
        <thead>
          <tr>
            <th>tag</th>
            <th>quantity</th>
            <th>guaranteed F ≥ −ln p(o)?</th>
          </tr>
        </thead>
        <tbody>
          {math.bound_tags.map((t) => (
            <tr key={t.tag}>
              <td className="mono">{t.tag}</td>
              <td>{t.quantity}</td>
              <td>{t.bound}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Sections of the math specification these gates cite</h3>
      <p className="dim">Section titles name outside sources as citations (for example AXIOM); no AXIOM code is used in DDNA.</p>
      <ul>
        {math.spec_sections.map((s) => (
          <li key={s.id}>
            <b>{s.id}</b> {s.title} <span className="dim">— cited by {s.cited_by.join(", ")}</span>
          </li>
        ))}
      </ul>
      <details>
        <summary>The binding math rules (MR-1 to MR-18)</summary>
        <ul>
          {math.rules.map((r) => (
            <li key={r.id}>
              <b>{r.id}</b> {r.title}
            </li>
          ))}
        </ul>
      </details>
      <details>
        <summary>Book errata the project corrected (BK-01 to BK-21)</summary>
        <p className="dim">The corrected form only, cited by location; the book&apos;s printed text is not reproduced.</p>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>location</th>
              <th>correction</th>
              <th>test</th>
            </tr>
          </thead>
          <tbody>
            {math.errata.map((e) => (
              <tr key={e.id}>
                <td className="mono">{e.id}</td>
                <td>{e.location}</td>
                <td>{e.correction}</td>
                <td className="mono">{e.test}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>

      <h2>The parity map</h2>
      <p>
        The project aims at one hierarchical model with the abilities a human has. This map shows how far that is: each of the 14
        ability domains is tied to its sealed gates. A gate verdict is not a parity claim; parity would be claimed only per sealed
        human test, and none is sealed.
      </p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>domain</th>
            <th>status</th>
            <th>current sealed PASS / FAIL (superseded not counted)</th>
            <th>gates</th>
          </tr>
        </thead>
        <tbody>
          {parity.domains.map((d) => (
            <tr key={d.order}>
              <td className="mono">{d.order}</td>
              <td>{d.domain}</td>
              <td>
                <span className={`pill ${d.status === "narrow PASS" ? "ok" : d.status === "nothing" ? "bad" : "warn"}`}>
                  {d.status === "nothing" ? "nothing operational" : d.status}
                </span>
              </td>
              <td className="mono">
                {d.sealed_pass} / {d.sealed_fail}
              </td>
              <td>
                {d.gates.map((id, i) => (
                  <span key={id}>
                    {i > 0 && ", "}
                    <a href={`#gate-${id}`}>{id}</a>
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Life cycle</h3>
      <ul>
        {parity.lifecycle.map((l) => (
          <li key={l.order}>
            {l.stage}: <span className="dim">{l.status}</span>
          </li>
        ))}
      </ul>
      <h3>Human tests</h3>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>stage</th>
            <th>test</th>
            <th>paradigm</th>
            <th>criterion</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {parity.human_tests.map((h) => (
            <tr key={h.id}>
              <td className="mono">{h.id}</td>
              <td>{h.stage}</td>
              <td>{h.test}</td>
              <td>{h.paradigm}</td>
              <td>{h.criterion}</td>
              <td>{h.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>What this page does not claim</h2>
      <ul>
        <li>No human parity. Gate verdicts demonstrate named behaviours; human-test items sealed: {htSealed}.</li>
        <li>No integrated organism. The sealed PASS verdicts are narrow demonstrations, each in its own organism.</li>
        <li>
          Expected free energy G is computed in DDNA; the organism choosing its actions by G is held open — &quot;built to&quot;, not
          &quot;does&quot;.
        </li>
        <li>
          Not &quot;any signal&quot;: the signal claims cover family SF-A only (S1 PASS); the held-out family SF-C failed (S-HOLD FAIL).
        </li>
        <li>
          Not &quot;any motor&quot;: no motor gate is sealed; the declared motor families are MF-A and MF-B, with MF-C held out.
        </li>
        <li>No re-run. Your browser checks integrity and arithmetic, not the experiments.</li>
      </ul>
      <p className="dim">
        More receipts and verdicts from across the estate are on the <Link href="/evidence/">evidence page</Link>.
      </p>
    </>
  );
}
