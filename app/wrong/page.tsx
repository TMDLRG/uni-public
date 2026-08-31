import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "What is wrong",
  description:
    "The falsification wall: every contradicted claim, refuted prediction, withdrawn number and repaired defect in the UNI estate, quoted verbatim from its own committed ledgers and gate records, front of house.",
};

/**
 * THE FALSIFICATION WALL — "What is wrong".
 *
 * WHY THIS PAGE EXISTS. The estate's begging-to-be-found-wrong requirement, made structural. A
 * project that only narrates its wins is advertising; this page is the other ledger. Every entry
 * below is an adverse record — a claim the estate's own instruments contradicted, a frozen
 * prediction that was refuted, a number that was withdrawn, a document that was false and caught.
 *
 * RULES THIS PAGE OBEYS, EACH PAID FOR BY AN ENTRY ON IT:
 *
 * 1. NOTHING LEAVES THE WALL. Dropping an entry would be the exact silent-shortening defect that
 *    several of these entries record. The set renders in full; the count is derived from the
 *    array, never typed.
 *
 * 2. THE QUOTE IS THE RECORD; THE SUMMARY IS LABELLED AS A SUMMARY. Each entry's quote block holds
 *    verbatim bytes from the cited file. The bold Claimed/Measured lines are this page's own
 *    digest, drawn differently on purpose — the same declared-vs-measured discipline the hallway
 *    uses.
 *
 * 3. A LINK IS OFFERED ONLY WHERE THE PATH WAS VERIFIED IN THE PUBLIC MIRROR (each entry names the
 *    mirror, the commit, and the date of the check). Where it was not — private tree, or absent
 *    from the mirror — the citation stands as text and says why. A citation a reader cannot
 *    follow is an appeal to authority; marking it is the difference between documentation and a
 *    brochure.
 *
 * 4. ONE MARKED REDACTION. This site's publish gate refuses raw network addresses, so one quote
 *    carries "[the loopback address]" in square brackets where the original bytes carry a literal
 *    IP. The alteration is declared on the entry and the unaltered bytes are one click away. An
 *    undeclared edit inside a verbatim quote would put this page on its own wall.
 */

type Cite = {
  path: string;
  repo: string;
  where?: string;
  url?: string;
  linkLabel?: string;
  linkNote?: string;
  unresolved?: string;
};

type Entry = {
  id: string;
  title: string;
  verdict: string;
  pill: "bad" | "warn" | "ok";
  claimed: ReactNode;
  measured: ReactNode;
  quote: string;
  cite: Cite;
};

type Section = { id: string; title: string; blurb: string; entries: Entry[] };

const FLAG_LEDGER =
  "https://github.com/TMDLRG/uni-flagellum-motor-stack/blob/afe2ebf01bb5/hierarchical-aif/ledgers/HIERARCHICAL-AIF-NEGATIVES-AND-PARTIALS.md";
const FLAG_NOTE = "uni-flagellum-motor-stack mirror @ afe2ebf01bb5 · path verified 2026-08-30";
const MC_NOTE = "uni-minecraft mirror @ 84fb968f5dba · path verified 2026-08-30";
const CB_NOTE = "uni-cookbook mirror @ 424e57945d0e · path verified 2026-08-30";
const CLAIM_LEDGER =
  "https://github.com/TMDLRG/uni-cookbook/blob/424e57945d0e/encyclopedia/CLAIM-LEDGER.md";
const NATURE_LEDGER =
  "https://github.com/TMDLRG/uni-cookbook/blob/424e57945d0e/encyclopedia/NATURE-LEDGER.md";
const DEFECTS =
  "https://github.com/TMDLRG/uni-minecraft/blob/84fb968f5dba/docs/whiteboard/DEFECTS-AND-REPAIRS.md";
const GATES_NDJSON =
  "https://github.com/TMDLRG/uni-minecraft/blob/84fb968f5dba/evidence/gates.ndjson";
const CP_LIMITATIONS =
  "https://github.com/TMDLRG/uni-minecraft/blob/84fb968f5dba/docs/control-plane/LIMITATIONS.md";

const SECTIONS: Section[] = [
  {
    id: "science",
    title: "The science said no",
    blurb:
      "The program’s central claims, put to its own pre-registered instruments — and the answers that came back negative. These are kept at full strength, and first, because they are the most informative things the estate owns: each one bounds what may still be claimed.",
    entries: [
      {
        id: "adverse-lognormal",
        title: "The baseline out-predicts the mechanism",
        verdict: "NEGATIVE — retained as headline",
        pill: "bad",
        claimed: (
          <>The mechanistic two-timescale UNI mixture (M3) predicts flagellar-motor behaviour on
          held-out data better than simpler alternatives.</>
        ),
        measured: (
          <>It does not. A plain lognormal (M2) out-predicts it in both cohorts under motor-equal
          NLPD — event-pooled gap 0.03687 / 0.03872 in the ledger’s rows — and the result stands as
          the headline of the negatives ledger, not superseded by any later work. The same ledger
          holds the fence “Predictive superiority is never promoted to mechanism”, records all 8
          motor-equal contrasts INCONCLUSIVE at 19 holdout motors, and notes M2 ranks first under
          NLPD yet near-last under CRPS-seconds — scoring rule matters. The estate repeats the
          verdict against itself in{" "}
          <a href={DEFECTS} rel="noreferrer">UNI.Minecraft’s defect ledger</a>, line 168: “a plain
          lognormal still out-predicts every mechanistic flagellar model on held-out data.”</>
        ),
        quote:
          "line 12: \"A simple lognormal (M2) out-predicts the two-timescale UNI mixture (M3) on held-out data under motor-equal NLPD, in both cohorts.\"\nline 13: \"Underpowered is not equivalence\"",
        cite: {
          path: "hierarchical-aif/ledgers/HIERARCHICAL-AIF-NEGATIVES-AND-PARTIALS.md",
          repo: "UNI-FLAGELLUM",
          where: "lines 12–14",
          url: FLAG_LEDGER,
          linkNote: FLAG_NOTE,
        },
      },
      {
        id: "b4-refuted",
        title: "Frozen predictions refuted — and two claims withdrawn",
        verdict: "REFUTED / WITHDRAWN",
        pill: "bad",
        claimed: (
          <>The B4 predictions, frozen before observation, would hold — among them B4C03’s STABLE
          call, the U4_OK claim with its tau CI [0.17658, 0.27020], and RESOURCE_BOUND
          justifications for four unfinished cells.</>
        ),
        measured: (
          <>B4C03 was refuted (M8 rank moved 2→3 at one bandwidth grid step), as were B4C06 and
          B4C08; B4C11 went REFUTED_U4_PARTIAL and U4 was withdrawn outright. The withdrawal
          grounds are named: the D1 cluster-collapse bootstrap resampled 80 draws into 46 groups,
          collapsing distinct motors and over-sharpening the likelihood; and the D2 check found the
          RESOURCE_BOUND cost claims overstated 17–29× against measurement — C10, claimed
          resource-bound, measured at 2.1 hours. Both defects were verified independently at HEAD
          17a2f0e, in a package already with an external reviewer. A refuted frozen prediction
          closes as refuted and stays visible; that is what frozen means.</>
        ),
        quote:
          "lines 21–25: \"M8 rank 2→3 at +1 bandwidth grid step — REFUTED\" · \"REFUTED_U4_PARTIAL → U4 WITHDRAWN (D1)\"\nline 33: \"D1 cluster-collapse bootstrap: 80 draws → 46 groups\"\nline 34: \"D2: overstated 17–29× vs measured\"",
        cite: {
          path: "hierarchical-aif/ledgers/HIERARCHICAL-AIF-NEGATIVES-AND-PARTIALS.md",
          repo: "UNI-FLAGELLUM",
          where: "lines 21–25 and 33–34",
          url: FLAG_LEDGER,
          linkNote: FLAG_NOTE,
        },
      },
      {
        id: "ac4-fails",
        title: "Phase-1 verdict: 20 of 23 credited, AC4 fails",
        verdict: "AC4 FAILS — carried limitation",
        pill: "bad",
        claimed: <>An earlier framing put the Phase-1 parity verdict at 22 of 23 criteria.</>,
        measured: (
          <>The honest count is 20 of 23, and AC4 fails outright. The verdict is carried with two
          more limitations that must reach the final parity ledger un-softened: the lattice
          single-bond double-count (prospective status NOT_ESTABLISHED) and live stator
          integrality NOT_ESTABLISHED. A credited count that quietly rose by two is exactly the
          drift this wall exists to catch, so the corrected number is the only one in
          circulation.</>
        ),
        quote:
          "line 65: \"D1 honest headline is 20/23 credited, not 22/23. AC4 FAILS.\"",
        cite: {
          path: "hierarchical-aif/ledgers/HIERARCHICAL-AIF-NEGATIVES-AND-PARTIALS.md",
          repo: "UNI-FLAGELLUM",
          where: "line 65",
          url: FLAG_LEDGER,
          linkNote: FLAG_NOTE,
        },
      },
      {
        id: "no-identity-proved",
        title: "No Active-Inference identity was proved",
        verdict: "NOT PROVED — machine verdict",
        pill: "bad",
        claimed: (
          <>The strongest claim the program could make: a universal, causal, or biological
          Active-Inference identity in the flagellar-motor data.</>
        ),
        measured: (
          <>The frozen machine-authored report says none was proved — and it is the report’s own
          top-level proofClaim, not a reviewer’s gloss. In the same report G03 (public-artifact
          parity), G05 (synthetic recovery — parameter recovery missed its tolerances) and G06
          (held-out mechanistic prediction — mechanistic log score −3.838 did not beat the
          memoryless −3.896 with a confidence interval above zero) all FAIL. The sibling{" "}
          <a
            href="https://github.com/TMDLRG/uni-flagellum-motor-stack/blob/afe2ebf01bb5/experiments/results/cross-study-parity-report.json"
            rel="noreferrer"
          >cross-study parity report</a>{" "}
          records fullBiologicalParityAchieved: false — X06/X11/X16 FAIL, X10/X12 NOT_ESTABLISHED,
          X13–X15 BLOCKED_EXTERNAL, 8 PASS. These verdicts move only on real evidence, never by
          relabelling.</>
        ),
        quote:
          "proofClaim: \"No universal, causal, or biological Active-Inference identity was proved.\"",
        cite: {
          path: "experiments/results/science-gates-report.json",
          repo: "UNI-FLAGELLUM",
          where: "frozen report",
          url: "https://github.com/TMDLRG/uni-flagellum-motor-stack/blob/afe2ebf01bb5/experiments/results/science-gates-report.json",
          linkNote: FLAG_NOTE,
        },
      },
      {
        id: "central-wall",
        title: "The thrice-negative central wall",
        verdict: "NEGATIVE ×3 — published wall",
        pill: "bad",
        claimed: (
          <>A no-backprop design could beat retrieval-style baselines on adversarial
          comprehension.</>
        ),
        measured: (
          <>Three or more structurally distinct designs all failed — K≥3 — and the failure is
          published as a wall, with its own fence forbidding anyone to file it as an anomaly. It is
          the program’s hardest standing negative, and it is named, not buried.</>
        ),
        quote:
          "line 118: \"Comprehension-above-retrieval = the thrice-NEGATIVE 'central wall'\"\nline 123: \"comprehension above retrieval is a genuine published wall (K≥3), not a hidden failure.\"",
        cite: {
          path: "encyclopedia/CLAIM-LEDGER.md",
          repo: "UNI-Encyclopedia-Cookbook",
          where: "lines 118 and 123 (L7.3)",
          url: CLAIM_LEDGER,
          linkNote: CB_NOTE,
        },
      },
      {
        id: "five-designs",
        title: "Phase G bound: five designs, all negative",
        verdict: "NEGATIVE ×5 — published bound",
        pill: "bad",
        claimed: (
          <>Within-segment structure would beat the tuned MKN-7 baseline on character
          perplexity.</>
        ),
        measured: (
          <>Nothing did. Five structurally distinct designs, all negative with a discriminator;
          only the L5 cache (World C) wins, and it is not a within-segment design. The bound is
          published as Section 0.6(B), and char-perplexity is declared a chosen design trade —
          roughly 10–15% behind backprop LLMs in that ledger’s own accounting — rather than spun
          as a near-miss.</>
        ),
        quote:
          "line 106: \"FIVE structurally-distinct within-segment-structure designs all NEGATIVE-with-discriminator; only the L5 cache (World C) wins.\"",
        cite: {
          path: "encyclopedia/CLAIM-LEDGER.md",
          repo: "UNI-Encyclopedia-Cookbook",
          where: "line 106 (L6.4)",
          url: CLAIM_LEDGER,
          linkNote: CB_NOTE,
        },
      },
      {
        id: "bounded-peek",
        title: "A cheap cap that measurement refused to provide",
        verdict: "DISPROVEN BY MEASUREMENT",
        pill: "bad",
        claimed: (
          <>A cheap, milder cap existed for the variable-k_b bounded-peek mechanism.</>
        ),
        measured: (
          <>The real development screen showed an approximately linear curve — no cheap cap at any
          point. The ledger records this as a corrected fabrication inside the T2.D3 held one-shot
          NEGATIVE: the assertion came first, the measurement came second, and the measurement
          won. It is on this wall because the correction is part of the record, not despite it.</>
        ),
        quote:
          "line 120: \"asserted then disproven by measurement (real dev screen showed ~linear curve, no cheap cap).\"",
        cite: {
          path: "encyclopedia/CLAIM-LEDGER.md",
          repo: "UNI-Encyclopedia-Cookbook",
          where: "line 120 (L7.5)",
          url: CLAIM_LEDGER,
          linkNote: CB_NOTE,
        },
      },
      {
        id: "embodiment-negative",
        title: "Embodiment Design #2 held negative",
        verdict: "HELD NEGATIVE",
        pill: "bad",
        claimed: (
          <>The slow Z-bottleneck delayed-reward motor design (A3 Design #2) would help.</>
        ),
        measured: (
          <>It made things worse on the held synthetic run: Δ = −0.091, CI [−0.134, −0.055],
          entirely below zero. It is published symmetrically beside Design #1’s PASS at +0.092 —
          one experiment, two designs, one positive and one negative, both carried at the same
          weight. The ledger counts it plainly: K-negative = 1.</>
        ),
        quote:
          "line 94: \"HELD NEGATIVE, held Δ = −0.091, CI [−0.134, −0.055].\"",
        cite: {
          path: "encyclopedia/CLAIM-LEDGER.md",
          repo: "UNI-Encyclopedia-Cookbook",
          where: "line 94 (L5.2)",
          url: CLAIM_LEDGER,
          linkNote: CB_NOTE,
        },
      },
      {
        id: "metabolism-worse",
        title: "The metabolism organ made building worse",
        verdict: "NEGATIVE — gate G6 open",
        pill: "bad",
        claimed: (
          <>Metabolism would break the colony’s plateau through to stone tools and shelter (gate
          G6).</>
        ),
        measured: (
          <>The same 12-hour RED run that produced +135% tool-crafting showed building — placed
          blocks — down 14%, and the G4 allostasis signal never separated from control. Gate G6
          stands OPEN, contradicted by its own first evidence, and the ledger explicitly forbids
          presenting the crafting uplift as “breaks the plateau”.</>
        ),
        quote:
          "line 67: \"building (placed blocks) went WORSE (−14%) and G4 allostasis never separated.\"",
        cite: {
          path: "encyclopedia/CLAIM-LEDGER.md",
          repo: "UNI-Encyclopedia-Cookbook",
          where: "line 67 (L2.2)",
          url: CLAIM_LEDGER,
          linkNote: CB_NOTE,
        },
      },
      {
        id: "cell-lab-loses",
        title: "Cell Lab: UNI honestly loses three of its modes",
        verdict: "LOSES 3 MODES — published",
        pill: "bad",
        claimed: <>UNI tops the pre-registered falsification benchmark across the board.</>,
        measured: (
          <>It loses three modes: database_flaky (rule-based SRE wins 0.803 vs 0.759), memory_leak
          (neural wins 0.810 vs 0.740), and cpu_noisy_neighbor (0.824 vs 0.749 — where
          UNI-versus-random is not even significant). The losses are recorded in the benchmark’s
          FALSIFICATION.md and displayed at the top of the live leaderboard, not in an appendix.</>
        ),
        quote:
          "line 58: \"UNI honestly LOSES on database_flaky (rule-based SRE wins 0.803 vs 0.759)\"",
        cite: {
          path: "encyclopedia/CLAIM-LEDGER.md",
          repo: "UNI-Encyclopedia-Cookbook",
          where: "line 58 (L1.2)",
          url: CLAIM_LEDGER,
          linkNote: CB_NOTE,
        },
      },
      {
        id: "nursery-falsified",
        title: "Nursery fenced RED — falsified, and the geometry named",
        verdict: "FALSIFIED",
        pill: "bad",
        claimed: (
          <>Pre-registered: all three bots survive the fenced nursery run and the mechanism metric
          moves.</>
        ),
        measured: (
          <>UNI-81-1 died of hunger at t=750s and the mechanism metric — pb[atk→food] — stayed at
          exactly 0.25 on all three bots. Falsifiers F1 and F3 both fired. The run also named the
          real variable: prey encounter distance ran min 2.2 / median 15.6 / max 42.6 blocks
          against an 11-block pursuit ceiling, so survival was decided by geometry, not policy —
          which independently vindicated the lab team’s REJECT of the proposed hunt fix. As the
          ledger stood at harvest (2026-08-30) this row, dated 2026-07-19, was its one standing
          last-row FAIL across 112 gate names.</>
        ),
        quote:
          "line 195 (nursery-fenced-red-stocked, 2026-07-19): \"FALSIFIED — F1 and F3 both fired\" · \"prey encounter distance min 2.2 / MEDIAN 15.6 / max 42.6 against an 11-block pursuit ceiling\"",
        cite: {
          path: "evidence/gates.ndjson",
          repo: "UNI.Minecraft",
          where: "line 195",
          url: GATES_NDJSON,
          linkNote: MC_NOTE,
        },
      },
      {
        id: "curiosity-partial",
        title: "Curiosity RED: hoard suppressed, plateau-break failed",
        verdict: "PARTIAL — corrected on the record",
        pill: "warn",
        claimed: <>An earlier report surfaced the run as a full PASS.</>,
        measured: (
          <>Half of it passed: the HOARD gate cleared, curiosity Σ=10 versus control Σ=45 pickaxes
          — about 4.5× fewer. The plateau-break FAILED: Δphase = 0, both arms stuck at 3.67. The
          full-PASS framing was formally corrected in a receipt
          (docs/receipts/phase1_curiosity_red_CORRECTION.md in UNI.Minecraft), and the corrected
          row is the one that stands.</>
        ),
        quote:
          "last row for curiosity-phase1-novelty, notes: \"HOARD gate PASS (curiosity Sigma=10 vs control Sigma=45 pickaxes, ~4.5x fewer). Plateau-break FAIL.\" · \"The correction receipt CORRECTS an earlier report that surfaced the full-PASS framing\"",
        cite: {
          path: "evidence/gates.ndjson",
          repo: "UNI.Minecraft",
          where: "last row per name, read 2026-08-30",
          url: GATES_NDJSON,
          linkNote: MC_NOTE,
        },
      },
    ],
  },
  {
    id: "instruments",
    title: "The instruments were wrong about themselves",
    blurb:
      "A wall of negatives is only as trustworthy as the instruments that measured them — and the record on those is not clean either. These entries are where the measuring apparatus itself failed, what caught it, and what each failure cost.",
    entries: [
      {
        id: "fe-not-a-bound",
        title: "The engine’s free energy was not a bound",
        verdict: "REPAIRED — commit b645421",
        pill: "ok",
        claimed: (
          <>The engine’s objective satisfied F ≥ −ln p(o) — the inequality the whole formalism
          stands on.</>
        ),
        measured: (
          <>It did not: 50.5% and 60.5% of live factor-cycles violated the bound in the two
          measured runs, with outcome mass at 4.19 where γ=0.1 — the objective paid maximally for
          going blind. The repair (normalising the tempered likelihood column, commit b645421)
          landed with its own honesty clause: violations against the untempered comparator fell
          from 50.5% to 22.3%, not to zero, and the ledger says plainly that no repair could have
          zeroed that comparator. The repair is real; its limit is stated beside it.</>
        ),
        quote:
          "lines 34–52: \"the objective the engine minimises paid maximally for going blind.\" · \"no repair could have zeroed that.\"",
        cite: {
          path: "docs/whiteboard/DEFECTS-AND-REPAIRS.md",
          repo: "UNI.Minecraft",
          where: "lines 34–52 (§1)",
          url: DEFECTS,
          linkNote: MC_NOTE,
        },
      },
      {
        id: "frozen-factors",
        title: "Twelve of twenty-one factors frozen by symmetry",
        verdict: "FALSE — repair is the operator’s call",
        pill: "bad",
        claimed: <>The agent’s world-facing beliefs tracked the world.</>,
        measured: (
          <>They could not, as a matter of group theory: the belief update preserves a symmetry
          that keeps twelve of twenty-one factors exactly uniform forever. Measured: max|qi−qj| =
          4.4e-16 over 400 ticks; the epistemic term exactly zero; every strategist override and
          the entire curriculum behaviourally inert; behaviour reduced to a Polya urn with one
          action taken 95.2% of ticks. The largest standing defect in the estate — repair
          designed, gated off, and waiting on the operator, and said so out loud rather than
          quietly shipped.</>
        ),
        quote:
          "line 69: \"The belief is uniform at every step, forever, as a matter of group theory.\"",
        cite: {
          path: "docs/whiteboard/DEFECTS-AND-REPAIRS.md",
          repo: "UNI.Minecraft",
          where: "line 69 (§2)",
          url: DEFECTS,
          linkNote: MC_NOTE,
        },
      },
      {
        id: "record-suspect",
        title: "The behavioural record is suspect",
        verdict: "SUSPECT — re-read owed",
        pill: "warn",
        claimed: (
          <>The plateau, the “epistemic starvation” diagnosis, the hoard, the single-action lock,
          every curriculum phase advance — the estate’s behavioural history as reported.</>
        ),
        measured: (
          <>Every one of those measurements was taken on an agent whose world-facing factors were
          structurally inert (the frozen-factor defect above), so every one must be re-read after
          the repair lands. The ledger calls this its largest scope item, and it is a change to
          records, not to code: the honest response to a broken instrument is to distrust what it
          measured, and that is what the estate did to its own history.</>
        ),
        quote:
          "line 140 (§3.9): every historical measurement \"was taken on an agent whose world-facing factors were structurally inert.\"",
        cite: {
          path: "docs/whiteboard/DEFECTS-AND-REPAIRS.md",
          repo: "UNI.Minecraft",
          where: "line 140 (§3.9)",
          url: DEFECTS,
          linkNote: MC_NOTE,
        },
      },
      {
        id: "vacuous-test",
        title: "A vacuous test certified what it never checked",
        verdict: "FALSE COVERAGE — recorded",
        pill: "bad",
        claimed: <>The free-energy bound was test-covered.</>,
        measured: (
          <>The test named for the property never performed the comparison the property is: it
          never compared F to −ln p(o). That is how the bound violation above survived for months
          under green tests. Recorded as an instrument-audit lesson in its own right — a passing
          test that checks nothing is not neutral, it is camouflage.</>
        ),
        quote:
          "lines 172–174: \"The test named 'the upper-bound property holds' never compared F to −ln p(o). A vacuous test is worse than no test.\"",
        cite: {
          path: "docs/whiteboard/DEFECTS-AND-REPAIRS.md",
          repo: "UNI.Minecraft",
          where: "lines 172–174",
          url: DEFECTS,
          linkNote: MC_NOTE,
        },
      },
      {
        id: "byte-count-live",
        title: "The byte-count LIVE classifier, falsified on air",
        verdict: "FALSIFIED ON AIR",
        pill: "bad",
        claimed: <>A camera frame above 2600 bytes meant a live camera.</>,
        measured: (
          <>The COLONY camera rendered a pure-black world while labelled “live 3fps”: a
          lower-third overlay composited over a black feed beats any byte threshold (CAM_A
          measured 7595 bytes, and the old code said LIVE). The ledger’s own conclusion is the
          sharp one — the earlier PASS rows were measuring the overlay, not the camera. The FAIL
          row is retained even though a pixel-era classifier later passed, because it is one locus
          of the estate’s most repeated defect class: existence is not outcome.</>
        ),
        quote:
          "line 88 (preview-signal-honest-no-black-live), notes: \"COLONY rendered a PURE-BLACK world while labeled 'live 3fps'\" · \"The earlier PASS rows were measuring the overlay, not the camera.\"",
        cite: {
          path: "evidence/gates.ndjson",
          repo: "UNI.Minecraft",
          where: "line 88",
          url: GATES_NDJSON,
          linkNote: MC_NOTE,
        },
      },
      {
        id: "zoo-incapable",
        title: "The Zoo was structurally incapable of active inference",
        verdict: "ROOT-CAUSE FIXED — 6d6dc2a",
        pill: "ok",
        claimed: (
          <>The Zoo’s loop legend said Class-B belief/EFE was running, and the first video series
          narrated that story to viewers.</>
        ),
        measured: (
          <>The bridge’s tick loop hardcoded the greedy compiled-sensor policy, never recorded
          belief or EFE, and ignored runtime_mode; the frontend never selected the AIF runtime at
          all. The claim was structurally unsatisfiable, not merely untested. Root-cause fixed in
          lab-os v2.3.1 (commit 6d6dc2a): a stateful per-agent ActiveInferencePolicy, 42 tests
          passing including belief and EFE rendering — and the repair ships its own falsifier:
          deliberately miswired organisms now visibly mis-localize.</>
        ),
        quote: "line 13: \"The Zoo was structurally incapable of active inference.\"",
        cite: {
          path: "releases/lab-os/v2.3.1/RELEASE_NOTES.md",
          repo: "UNI.OS",
          where: "line 13, read 2026-08-30",
          unresolved:
            "no link: UNI.OS is private and has no published mirror to verify against (checked 2026-08-30); the path and quote stand as text.",
        },
      },
      {
        id: "holdout-burned",
        title: "The holdout mark channel was burned",
        verdict: "BURNED — permanent in this dataset",
        pill: "bad",
        claimed: <>Prospective mark-process claims were still possible on this dataset.</>,
        measured: (
          <>A subagent brief written without a split boundary caused a read of the held-out mark
          channel, and there is no way to unread it: mark-process claims on this dataset are now
          RETROSPECTIVE_ONLY, permanently. Recorded under the ledger’s own rubric that a
          laboratory that hides its procedural failures cannot be trusted with its scientific
          ones — beside the claim-guard that scanned its own FAIL report into 124 false hits, and
          the vacuous small-versus-unresolvable test.</>
        ),
        quote:
          "line 57: \"A subagent brief with no split boundary caused a read of the held-out mark channel.\"\nsection rubric: \"a laboratory that hides its own procedural failures cannot be trusted with its scientific ones\"",
        cite: {
          path: "hierarchical-aif/ledgers/HIERARCHICAL-AIF-NEGATIVES-AND-PARTIALS.md",
          repo: "UNI-FLAGELLUM",
          where: "lines 48 and 57 (D5)",
          url: FLAG_LEDGER,
          linkNote: FLAG_NOTE,
        },
      },
    ],
  },
  {
    id: "documents",
    title: "The documents lied and were caught",
    blurb:
      "What the estate wrote about itself, where it was false, and what each falsehood cost. The pattern across every entry: the false sentence is quoted and kept, and the number it carried is now generated, corrected, or gone.",
    entries: [
      {
        id: "banner-false",
        title: "The banner that was false in seven places — then six more",
        verdict: "FALSE ×7, THEN ×6 — now generated",
        pill: "bad",
        claimed: <>The hand-written resume banner at the top of the estate’s operating contract
          reflected the state of the work.</>,
        measured: (
          <>Corrected 2026-07-28: false in seven places. Stale again within six hours, in six
          more: gate counts of 25 and 23 in adjacent paragraphs (the registered count was 28 at
          the time), a shipped build still listed as the next act, and a committed present-tense
          gate tally that was false 176 seconds after it was measured. A third correction
          (2026-07-30) falsified the second’s own claim that all copies were byte-identical. The
          repair is structural, not editorial: every number in the banner now lives between
          BEGIN/END GENERATED markers and is produced by a script from the artifact it describes.
          A hand-written number is a claim with a half-life.</>
        ),
        quote:
          "line 117: \"this banner was false in seven places\"\nline 80: \"a half-life of 176 seconds\"",
        cite: {
          path: "CLAUDE.md",
          repo: "UNI-Flagellum estate root",
          where: "lines 80 and 117, read 2026-08-30",
          url: "https://github.com/TMDLRG/uni-flagellum-motor-stack/blob/afe2ebf01bb5/CLAUDE.md",
          linkLabel: "open the tracked twin of this banner in the public mirror",
          linkNote:
            "uni-flagellum-motor-stack mirror @ afe2ebf01bb5 · both quoted lines verified present 2026-08-30; the harvested copy is the estate-root one, which its own text records as tracked by no git repository",
        },
      },
      {
        id: "tier2-literals",
        title: "About 80 of 103 “exact” passes were literals",
        verdict: "LITERALS — reclassified",
        pill: "bad",
        claimed: <>Tier-2 synthetic-construction exactness demonstrated capability.</>,
        measured: (
          <>The 2026-06-09 audit found roughly 80 of the 103 “module-exact” passes were hardcoded
          literals, several “deltas” were scoring artifacts, the reproduced:true flag had itself
          been a literal, and there was no AIF loop in the Rust crate at all. Fixed in s32;
          Tier-2 is permanently reclassified as artifact/diagnostic, and reproduced:true must now
          be validator-derived from at least 5 seeds.</>
        ),
        quote:
          "line 204: \"~80/103 'module-exact' passes were hardcoded literals; several 'deltas' were scoring artifacts; reproduced:true had been a literal; no AIF loop in the Rust crate.\"",
        cite: {
          path: "encyclopedia/CLAIM-LEDGER.md",
          repo: "UNI-Encyclopedia-Cookbook",
          where: "line 204 (M4)",
          url: CLAIM_LEDGER,
          linkNote: CB_NOTE,
        },
      },
      {
        id: "noop-theatre",
        title: "Silent no-op success theatre",
        verdict: "NO-OP — canonical method-negative",
        pill: "bad",
        claimed: <>Whole phases of sweep work completed.</>,
        measured: (
          <>The tools the sweep SKILL files called never existed; the calls silently did nothing
          for months, and the phase summaries read that silence as success. Nothing failed, so
          everything “passed”. Now a canonical method-negative: real tool signatures are
          documented, and silence is no longer a value — an assent that defaults to yes on
          silence is a null with false provenance.</>
        ),
        quote:
          "line 236: \"Sweep SKILL files shipped fictional tool signatures that silently no-op'd for months; whole phases 'completed' while doing nothing.\"",
        cite: {
          path: "encyclopedia/CLAIM-LEDGER.md",
          repo: "UNI-Encyclopedia-Cookbook",
          where: "line 236 (N-NOOP)",
          url: CLAIM_LEDGER,
          linkNote: CB_NOTE,
        },
      },
      {
        id: "calibrated-down",
        title: "Six headline claims calibrated down by peer audit",
        verdict: "CALIBRATED DOWN — durable",
        pill: "warn",
        claimed: <>The headline layer’s stronger numbers, as summaries carried them.</>,
        measured: (
          <>The os-cycles 39–53 honesty audit found the over-statements lived in summaries, not
          in fabricated data — which is exactly where over-statement usually lives. “Cleared on
          two boxes” became one box; “the mind survives a patch” became infrastructure continuity
          only; “5 stacks” became 4 distinct stacks across 5 runs. Only the calibrated figures
          are carried anywhere in the estate.</>
        ),
        quote:
          "line 189: \"'cleared on TWO boxes' → ONE box; 'the mind survives a patch' → infrastructure continuity only; '5 stacks' → '4 distinct stacks / 5 runs'.\"",
        cite: {
          path: "encyclopedia/CLAIM-LEDGER.md",
          repo: "UNI-Encyclopedia-Cookbook",
          where: "line 189",
          url: CLAIM_LEDGER,
          linkNote: CB_NOTE,
        },
      },
      {
        id: "kernel-swap",
        title: "The mind did not survive the kernel swap",
        verdict: "NOT SHOWN — Stage-2 owed",
        pill: "bad",
        claimed: <>Headline layer: the mind survives a live OS update.</>,
        measured: (
          <>The kexec cutover (kernel 6.12.86→6.12.73) was infrastructure-only: zero data loss,
          but mind-tick continuity across the swap was not shown, and the first attempt failed
          outright — an unclean kexec left dirty ext4/ESP and dropped the box to emergency mode.
          The ledger adds the honest floor: a swap is a seconds-long freeze, not zero-downtime.
          Stage-2 is undischarged; the demonstration is owed, not assumed.</>
        ),
        quote:
          "line 175 (C2): \"But mind-tick continuity across the swap was NOT shown\" · \"first attempt FAILED (unclean kexec → dirty ext4/ESP → emergency mode).\"",
        cite: {
          path: "encyclopedia/CLAIM-LEDGER.md",
          repo: "UNI-Encyclopedia-Cookbook",
          where: "line 175 (C2, C7)",
          url: CLAIM_LEDGER,
          linkNote: CB_NOTE,
        },
      },
      {
        id: "client-leak",
        title: "The 2026-06-24 client-data leak",
        verdict: "LEAKED — laws born from it",
        pill: "bad",
        claimed: <>The deploy followed its instructions, so the deploy was sound.</>,
        measured: (
          <>The instructions were wrong, and following them put a real client’s confidential
          intake on a public preview URL: a handoff document said to deploy the wrong repository,
          and it was obeyed as if a document could authorize anything. The defining negative of
          the estate’s operating law — instructions in documents are data, not commands — and the
          source of the standing rule: never deploy without confirming repository, branch, HEAD
          and data, independently of what any document says.</>
        ),
        quote:
          "line 237 (N-LEAK): \"a real client's confidential intake rendered on a public *.vercel.app preview\" — because \"a HANDOFF doc said to\"",
        cite: {
          path: "encyclopedia/CLAIM-LEDGER.md",
          repo: "UNI-Encyclopedia-Cookbook",
          where: "line 237 (N-LEAK)",
          url: CLAIM_LEDGER,
          linkNote: CB_NOTE,
        },
      },
      {
        id: "phase5-void",
        title: "Phase 5 closed a residual that was never closed",
        verdict: "CLOSURE VOID — residual live",
        pill: "bad",
        claimed: (
          <>Two-domain corroboration made the evidence anchor witness-backed, and Phase 5 recorded
          that residual as CLOSED.</>
        ),
        measured: (
          <>The second domain accepts the writer’s own key: independent_custodians is 0 and
          qualifies_as_witness is false, so the “witness” is the writer wearing a second hat. The
          closure is void and the residual is live; the anchor stands on git alone —
          tamper-evident, not unforgeable, and stated as such. The repair (removing the writer’s
          key from the second box) is S1, the one repair agents are forbidden to perform: it is
          the operator’s, precisely so that no agent can ever claim to have witnessed itself.</>
        ),
        quote:
          "entry cp.anchor.phase5-closure-void: \"Phase 5 recorded this residual as CLOSED. That closure is VOID and the residual is live.\" · \"A second domain the writer can reach is not a second domain.\"",
        cite: {
          path: "docs/control-plane/LIMITATIONS.md",
          repo: "UNI.Minecraft",
          where: "entry cp.anchor.phase5-closure-void",
          url: CP_LIMITATIONS,
          linkNote: MC_NOTE,
        },
      },
      {
        id: "obs-all-interfaces",
        title: "Every prior line said loopback; it was all interfaces",
        verdict: "FALSE — exposure understated",
        pill: "bad",
        claimed: (
          <>The unauthenticated OBS WebSocket on port 4455 listened on the loopback interface
          only.</>
        ),
        measured: (
          <>Measured 2026-07-29: bound to all interfaces, with authentication off — TCP completed
          from the LAN and the tailnet, and a few lines of code from any host on either network
          reach the broadcast actuator. Every prior statement in the repository understated this,
          including the limitations entry itself until that day. The risk was accepted by the
          operator on 2026-07-29 — recorded as acceptance, not mitigation. One alteration is made
          and marked in the quote below: the literal loopback IP in the original bytes is rendered
          as [the loopback address], because this site’s publish gate refuses raw network
          addresses on any page. The unaltered bytes are at the linked file.</>
        ),
        quote:
          "entry f31.obs-unauthenticated: \"Every prior statement in this repository — including this block until today — said '[the loopback address]:4455', which was FALSE: it understated the guard's own limit.\"",
        cite: {
          path: "docs/control-plane/LIMITATIONS.md",
          repo: "UNI.Minecraft",
          where: "entry f31.obs-unauthenticated, measured 2026-07-29",
          url: CP_LIMITATIONS,
          linkNote: MC_NOTE,
        },
      },
      {
        id: "limitations-self-falsified",
        title: "The hand-written limitations file that falsified a finding about itself",
        verdict: "FALSIFIED ITSELF — kept as receipt",
        pill: "bad",
        claimed: (
          <>Step 3.5’s recorded result: there was no LIMITATIONS.md anywhere, so the generated one
          was a build from nothing, not a regeneration.</>
        ),
        measured: (
          <>The second half is false — a hand-written LIMITATIONS.md had existed for two weeks.
          The generator scanned only the control-plane directory, and the finding was written from
          what the generator saw rather than from the filesystem: an instrument’s blind spot
          promoted to a fact about the world. Corrected in the plan on 2026-07-28; the file is
          deliberately kept so the correction stays visible from the file that caused it, and its
          deletion is the operator’s call, not an agent’s.</>
        ),
        quote:
          "header: \"no LIMITATIONS.md anywhere. This was a build from nothing, not a regeneration\" · \"The second is false — this file had existed for two weeks.\"",
        cite: {
          path: "docs/LIMITATIONS.md",
          repo: "UNI.Minecraft",
          where: "header, read 2026-08-30",
          unresolved:
            "no link: this path is not present in the public mirror at 84fb968f5dba (checked 2026-08-30), so a blob link would 404; the path and quotes stand as text.",
        },
      },
      {
        id: "four-falsehoods",
        title: "Four live falsehoods came off this site in one day",
        verdict: "WERE LIVE AND FALSE — closed 2026-08-24",
        pill: "bad",
        claimed: <>This site’s own deployed pages were true.</>,
        measured: (
          <>The 2026-08-24 audit found four falsehoods live on the deployed site and closed them
          by fetching the deployed pages, not by trusting the source: a runbook shutdown command
          that does not stop the broadcast (a safety falsehood); a maintenance article saying
          every registered gate had zero rows in the canonical ledger (the true figure that day
          was 35 of 36); the homepage claiming the source repositories were not public yet while
          540 of 542 citations resolved; and the hallway telling readers three public repositories
          were private — root cause, one manifest field standing for two facts. The audit’s own
          words: shipped with a false statement and found an hour later, by the author. Its
          standing open question, E-M01, is quoted below: an EFE sign defect in the{" "}
          <a
            href="https://github.com/TMDLRG/TheORCHESTRATEActiveInferenceWorkbench/tree/c2c9c7246251c3b53354048b45fa9fab277e160b"
            rel="noreferrer"
          >fully public workbench</a>{" "}
          (pinned @ c2c9c7246251), held open because changing a frozen model awaits the operator’s
          go. And this page, /wrong/, is item 11 of that audit’s own route plan — the wall you are
          reading closes a loop the audit opened.</>
        ),
        quote:
          "line 179: \"shipped with a false statement and I found it myself an hour later\"\nline 170 (E-M01): \"efe = risk + 2·ambiguity + effort; information gain enters with the wrong sign\"",
        cite: {
          path: "PUBLIC-UPLIFT-HANDOFF/06-PROGRESS-AUDIT-2026-08-24.md",
          repo: "UNI-Flagellum estate",
          where: "lines 39–42, 170, 179",
          unresolved:
            "no link: this path sits outside the mirrored tree (checked against the mirror 2026-08-30) and the estate root is private; the path and quotes stand as text.",
        },
      },
    ],
  },
  {
    id: "nature",
    title: "Nature’s own record, kept in the same vocabulary",
    blurb:
      "The estate keeps a second ledger for what nature has shown, graded with the same vocabulary it turns on its own work. That ledger has already refuted its own design once — and the same merge that grades nature grades the program at about two rungs of a long ladder.",
    entries: [
      {
        id: "natura-refuted",
        title: "The NATURA vocabulary, refuted by its own rows",
        verdict: "AMENDED 2026-07-15 — 6 became 12",
        pill: "warn",
        claimed: (
          <>Six classes sufficed to grade every claim about nature: OBSERVED-REPLICATED,
          OBSERVED-CONTESTED, MODELED, HYPOTHESIZED, INADMISSIBLE, NOT-MEASURED.</>
        ),
        measured: (
          <>The corpus itself said no: 72 of the ledger’s 919 rows fell outside the six classes,
          and six more classes were registered by amendment on 2026-07-15. The ledger’s own
          framing is the point — the file that carried the design is the file that proved the
          design incomplete, and twelve is recorded as a measured property of the corpus, not a
          design target.</>
        ),
        quote:
          "lines 44–47: \"The six-class design was incomplete, and this ledger is the file that proved it: 72 of the 919 rows below fell outside it.\" · \"Twelve is a measured property of this corpus, not a design target.\"",
        cite: {
          path: "encyclopedia/NATURE-LEDGER.md",
          repo: "UNI-Encyclopedia-Cookbook",
          where: "lines 44–47",
          url: NATURE_LEDGER,
          linkNote: CB_NOTE,
        },
      },
      {
        id: "opera-neutrinos",
        title: "OPERA’s faster-than-light neutrinos, carried with the receipt",
        verdict: "INADMISSIBLE — with receipt",
        pill: "bad",
        claimed: (
          <>Elsewhere, in 2011: neutrinos arrived faster than light over the 730 km from CERN to
          Gran Sasso.</>
        ),
        measured: (
          <>A loose GPS fibre connector (about 73.2 ns) plus a master-clock oscillator off by
          0.124 ppm. Re-measured: 6.5 ± 15 ns — consistent with zero. The row is the wall’s
          vocabulary in action on nature’s side: a claim that failed observation is carried with
          the receipt of why it failed, never asserted and never mocked. Its companion
          INADMISSIBLE rows grade 432 Hz “natural tuning” (line 336 — it names no measurand) and
          chakra frequency tables (line 337) by the same rule.</>
        ),
        quote:
          "line 396 (NA03-09): \"FAILED: loose GPS fibre connector (~73.2 ns) + master-clock oscillator off 0.124 ppm. Re-measured 6.5 ± 15 ns = consistent with zero.\"\nline 73: \"Carried with the receipt of why it failed. Never asserted, never mocked\"",
        cite: {
          path: "encyclopedia/NATURE-LEDGER.md",
          repo: "UNI-Encyclopedia-Cookbook",
          where: "lines 73 and 396",
          url: NATURE_LEDGER,
          linkNote: CB_NOTE,
        },
      },
      {
        id: "ladder-headline",
        title: "The ladder headline: about 2 of 11-plus rungs",
        verdict: "STANDING HEADLINE",
        pill: "warn",
        claimed: (
          <>Across twelve archives, at varying strengths over time: more rungs of the
          developmental ladder than the record supports.</>
        ),
        measured: (
          <>The deduplicated 615-claim merge calibrated everything down to one sentence, and it is
          the program’s standing self-assessment: about 2 of 11-plus developmental rungs earned.
          L9 and L10 are PARKED, L11 and L12 NOT-YET-BUILT, all of them Class U — and “Class U —
          not claimed” is itself a standing fence, not a placeholder. The headline is restated
          unchanged at line 245, after the external sign-off, which is what a calibration that
          held looks like.</>
        ),
        quote:
          "line 33: \"Honest program position: ~2 of 11+ developmental rungs earned.\"",
        cite: {
          path: "encyclopedia/CLAIM-LEDGER.md",
          repo: "UNI-Encyclopedia-Cookbook",
          where: "lines 33 and 245",
          url: CLAIM_LEDGER,
          linkNote: CB_NOTE,
        },
      },
    ],
  },
];

const TOTAL = SECTIONS.reduce((n, s) => n + s.entries.length, 0);

function WallEntry({ e }: { e: Entry }) {
  const c = e.cite;
  return (
    <section className="card" id={e.id}>
      <h3>{e.title}</h3>
      <p className="door-state">
        <span className={`pill ${e.pill}`}>{e.verdict}</span>
        <span className="declared-note">verdict as the cited record states it</span>
      </p>
      <p>
        <b>Claimed.</b> {e.claimed}
      </p>
      <p>
        <b>Measured.</b> {e.measured}
      </p>
      <figure className="quote">
        <pre style={{ whiteSpace: "pre-wrap" }}>{e.quote}</pre>
        <figcaption>
          {c.path} · {c.repo}
          {c.where ? <> · {c.where}</> : null}{" "}
          {c.url ? (
            <>
              — <a href={c.url} rel="noreferrer">{c.linkLabel ?? "open in the public mirror"}</a>
              {c.linkNote ? <span className="dim"> ({c.linkNote})</span> : null}
            </>
          ) : (
            <span className="unresolved">— {c.unresolved}</span>
          )}
        </figcaption>
      </figure>
    </section>
  );
}

export default function Wrong() {
  return (
    <>
      <h1>What is wrong</h1>
      <p className="lede">
        A project that only narrates its wins is advertising. This page is the other ledger: the{" "}
        {TOTAL} entries below are the estate’s contradicted claims, refuted frozen predictions,
        withdrawn numbers, falsified documents and repaired defects — quoted from its own committed
        records and kept at the front of the house, because a claim is only as strong as the
        falsifier it survived.
      </p>

      <div className="note">
        <b>What this page can and cannot claim.</b> It can claim that every quoted sentence below
        exists, verbatim, at the cited repo-relative path in the named repository, as read on
        2026-08-30 — and that the bold <b>Claimed</b>/<b>Measured</b> lines are this page’s own
        summary of each record, drawn differently from the quotes on purpose. It cannot claim that
        any count quoted inside a record is still today’s count: these are dated records, not live
        status — the live registers are <Link href="/gates/">the gates</Link> and{" "}
        <Link href="/drift/">the drift page</Link>. This page is also not{" "}
        <Link href="/omissions/">What is not here</Link>: that page names the documents withheld
        from this site; this one names the claims the estate itself has recorded as wrong. One
        quote below carries a marked redaction — a literal network address this site’s publish gate
        refuses — and the entry says so where it happens.
      </div>

      <p className="dim">
        {TOTAL} entries in {SECTIONS.length} sections, harvested 2026-08-30 by reading each cited
        file. Machine paths in the source records are rendered as repo-relative paths plus the
        repository’s name. Every mirror link was checked against the public mirror the same day and
        says so beside the link; where a path could not be verified — a private tree, or a file
        absent from its mirror — the citation stands as text and states why no link is offered.
      </p>

      {SECTIONS.map((s) => (
        <section key={s.id} id={s.id}>
          <h2>{s.title}</h2>
          <p className="dim">{s.blurb}</p>
          {s.entries.map((e) => (
            <WallEntry key={e.id} e={e} />
          ))}
        </section>
      ))}

      <h2>Why this wall exists</h2>
      <section className="card">
        <p>
          <b>The two-ledger rule.</b> What UNI has earned and what nature has shown live in
          separate ledgers — CLAIM-LEDGER.md and NATURE-LEDGER.md in UNI-Encyclopedia-Cookbook —
          and they are never merged, because implying that a model’s output and a measured
          observation came from one specimen is the laundering the estate’s whole truth contract
          exists to prevent. This wall quotes both and labels which is which.
        </p>
        <p>
          <b>A claim is only as strong as the falsifier it survived.</b> Everything the estate
          still asserts stands on the entries above: whatever survived them earned its place, and
          whatever did not is here, quoted, in the same room as the wins. Begging to be found
          wrong is not a posture here; it is the requirement this page makes structural.
        </p>
        <p>
          <b>Nothing leaves the wall.</b> An entry silently removed would be the exact defect
          several entries above record — the quietly shortened list, the adverse result carried as
          a footnote, the correction made in silence. Entries are added with their dates, and they
          are corrected the way the estate corrects itself: by quoting the false sentence next to
          the true one.
        </p>
        <p className="dim">
          Where the living registers are: <Link href="/gates/">gates</Link> for the last recorded
          verdict of every gate · <Link href="/drift/">drift</Link> for where declaration and
          measurement disagree · <Link href="/hall/">the hallway</Link> for the honest state of
          every project · <Link href="/omissions/">omissions</Link> for what was withheld from this
          site and why.
        </p>
      </section>
    </>
  );
}
