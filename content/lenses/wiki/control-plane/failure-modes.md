---
lens_schema: 1
scope: wiki
key: control-plane/failure-modes
corpus: control-plane
source_sha256: f35e9bb38e016ede
source_body_sha256: f35e9bb38e016ede
source_title: Failure modes — every refusal as a testable statement
source_words: 2685
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

Refusals are what this page collects: things the system must decline to do, each written as a sentence that can become a test which fails for the right reason before the code exists. The form is always the same — given a condition, the system must refuse, and here is the observation that would show it does not.

Not all of them are built. The status line at the top says which are built and tested, which remain design, and it asks you to read the corrections at the foot before trusting anything above them. That instruction is worth taking literally.

The refusals are grouped: who may author a verdict and on what basis; how the ledger behaves when something is edited, deleted or written outside the one permitted path; what a run must do when it is empty, short, over-long, crashed, or has too many things changing at once; what a room does when a key or a receipt is missing; and what the renderer must do when evidence is absent.

The page states its own principle plainly: a refusal that cannot be demonstrated failing first is not a guard, it is a hope.

<!--CLEAR-->

This page turns every refusal the system owes into a statement that can be tested. The form is fixed: given some condition, the system must refuse in a stated way, and a falsifier names the observation that would show it does not. Each row carries the phase that owns it.

The status line at the top is not decoration. It says which refusals are built and tested, that one is refusing while the human-presence token it needs does not exist — so going live is closed rather than guarded — and that a group covering the renderer remains design. It then asks the reader to go to the foot of the page and read the corrections there before trusting anything above them.

The groups are readable on their own. Authorship: a verdict with no pre-registered gate is refused, as is one carrying a score, one that does not name which sub-claim holds, and an actor approving their own change. The ledger: editing, deleting or leaving a gap in the chain must fail verification, a write outside the one permitted path is refused, and a read must actuate nothing. Runs: more than one variable differing between arms makes a run void and unclaimable, an empty run is recorded as not run, a non-converged fit must halt before scoring and write no artifact, mismatched array lengths must raise before any average, and a crash is recorded as a failed run rather than a scientific negative. Rooms: no entry without the receipt or without two distinct keys, no exit without a contamination check, and no override path at all. Rendering: a node lacking its truth class or its receipt reference renders as fog; an unbacked state may be looked at but not authored from; liveness is shown only from a real probe; and no material may depict awareness, experience or life.

One amendment is worth reading in full. A refusal that had said fog was not enterable contradicted the architecture prose, which says you may stand in the unknown but may not author a verdict from inside it. The code had silently picked one of two disagreeing documents. It was resolved toward the prose on the operator's co-sign, and the page states plainly that this is a relaxation at the door — and that the guard was relocated rather than deleted.

The long status section records, phase by phase, what became real. One refusal has a stated limit: losing the end of a chain cannot be seen by the chain itself. One needed two guards, one of which was vacuous when written, which set a standing rule — a guard that passed vacuously is not counted until a mutation proves it bites. A distribution guard had two words where it needed three, so being unable to look and finding nothing both came out the same. A frozen-evidence check had no checker at all, because a human who remembers to run a command is a habit, and a habit is what a frozen baseline exists to stop relying on.

The final correction is the sharpest. An earlier paragraph on this same page claimed a residual risk had been closed, and the correction says that paragraph has been false for some time: a live capture shows the second custodian is not independent, so the corroboration that closure relied on does not hold. The claim is stated as tamper-evident, not the stronger word. The false paragraph is left standing rather than rewritten, for the same reason a ledger entry is, and removing the offending key is the one repair an agent must not perform.
