---
lens_schema: 1
scope: wiki
key: control-plane/decisions-adr-0002-gaia-projects-never-computes
corpus: control-plane
source_sha256: fe04d527e2894991
source_body_sha256: fe04d527e2894991
source_title: ADR-0002 — Verdicts are authored by the Control Plane and projected by Gaia, never computed by Gaia
source_words: 1553
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

A decision and a later amendment to it share this page. Both concern the part of the platform whose only job is to show signals.

The rule it fixes: the body that runs the science authors every verdict and writes its receipt — the file showing what was run and what came out. The reporting body carries both along verbatim, with a note of where they came from, and adds nothing. It may not count, score, rank, total or narrate. A tidier arrangement had been proposed — let that body work out gate status for itself — and the record turns it down, because it would break the body's own law.

When a document and a receipt disagree, the reporting body says so and stops. A person resolves it. Reconciling it automatically is exactly the apparent harmony the project's truth contract forbids.

The amendment came later, after ten of those disagreement signals were looked at live. Most compared things that were not the same kind — a sentence against a filename, a label against a list — so they could never agree in any state of the world. The amendment requires both sides to be the same kind, and requires a repaired comparison to be shown to still bite.

<!--CLEAR-->

Two dated notes are stacked here: a decision, accepted, and a later amendment appended below it. Together they govern what the platform's signal-reporting body may and may not do.

The context for the first decision is drift. Gate status in one repository was hand-written prose spread across several files, and the same gate was recorded two different ways in two different places. The obvious fix — have one component work out gate status from the receipts, the files recording what was run, so it cannot drift — had been proposed and assigned to the reporting body. The record shows that this would have broken that body's own law, which says it shows only direct signals with a record of where each came from, and never summarises, scores, ranks, narrates or authors a verdict. The proposal would have been rejected by the system's own linter.

So the decision reads as follows. The body that runs the science authors every verdict and writes a receipt. The reporting body projects both verbatim, with a three-part note of where each came from, adding nothing. When a document and a receipt disagree, it emits a drift signal carrying both byte-sets verbatim, with no severity, no percentage and no judgment. And the body that runs the science resolves the drift; the reporting body reports it and never resolves it. A source's own computed verdict, carried unchanged, counts as projection rather than derivation, and is allowed.

The stated cost is that drift is surfaced but not fixed automatically, so a human decision is needed. The record says this is intentional.

The amendment is the more interesting half. Ten drift signals were measured live, and most of them turned out to compare things of different kinds: a prose line against a filename, a short label against a list of tracking rows, a small blob against a whole document. Two of them were well formed, and both reached agreement the moment the world became correct. The malformed ones stayed red through a day of real corrections and would have stayed red even if every correction had been perfect. One family compared digests — short fingerprints computed from the bytes — taken the same way but over differently-normalised copies, so even with no lag at all the digests differ.

The record is clear about why this matters, and the reason is not the red pixel. An inequality nobody can act on stops being read. One such signal had been unequal for days, was filed as an accepted oscillation, and was therefore pointing — unread — at a real defect.

So the amendment requires that both sides of a comparison be the same kind and the same normalisation, and that agreement be reachable in some achievable state of the world. Where two things legitimately differ forever, that belongs in a signal with its own relation, classified, dated and signed, rather than left looking like an unresolved fault. Pulling a cited path out of a prose line so it can be compared with a path counts as capture rather than judgment, and the comparison stays a mechanical byte-compare.

The amendment also names its own danger: repairing a comparison changes what the platform measures, and a changed measurement can be a way to make a problem disappear. So every repaired comparison must be shown to still bite — point it at a bad value and watch it go unequal — with the signal state captured before and after. A comparison repaired without that proof is indistinguishable from a comparison loosened.
