---
lens_schema: 1
scope: wiki
key: control-plane/phases-phase-3
corpus: control-plane
source_sha256: 0fbb2c735317d1b3
source_body_sha256: 0fbb2c735317d1b3
source_title: Phase 3 — Registration, verdict authorship, and the anchor
source_words: 1825
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

For the third phase, the plan was written from what the second phase observed rather than from what it expected. Its results are recorded separately, and the status line already tells you that one item landed only partly and one is a standing known failure.

The phase builds the parts that register a gate before it is run, author a verdict in words rather than numbers, and hold the ledger's expected head outside the chain so that losing the end of it can be noticed.

The most interesting section is not a build item. It is a question the plan refuses to answer itself: twelve rows in the canonical ledger break the schema, and what to do about them is the operator's decision, not an agent's. Three options are laid out with their costs. The page later records the answer, and — unusually — records that the first attempt at carrying it out was wrong and was rolled back before anything was committed, along with the two fixes that came out of it.

<!--CLEAR-->

Written from the previous phase's observed results and pre-registered before execution, this third-phase plan already carries the outcome of two items in its status line: one landed partial, and one became a standing known failure.

An opening section says what the previous phase changed here, and the first item is not a build task but a question that has to be answered before code that would answer it wrongly gets written. Twelve rows in the canonical ledger break the schema the ledger is judged by, and this phase builds the thing that authors rows, so it must neither add another instance nor quietly normalise the existing ones. The second is that the hash chain has no anchor, so losing the end of it goes unnoticed in practice. The third is an inherited formatting failure on a file this work does not own.

The decision section is the most striking part. It states the question, lays out three options with their costs — append corrective rows, widen the schema, or leave the disagreement standing and pinned — and then says plainly that this is not the author's to pick, while naming which option he would propose and why. The answer is recorded afterwards, together with two corrections made before acting: the count was eleven distinct names rather than twelve, and the claim that the ledger conforms can only mean its effective state, because append-only means the original rows stay non-conformant forever. The stronger claim is described as unavailable and is not made.

Then comes something a plan rarely contains: an account of getting it wrong. The first attempt chose the wrong line terminator, because the ledger has mixed line endings and the appender asked whether one kind occurred anywhere rather than looking at the last line. It left an undeclared blank line in canonical evidence, was caught by a count of added lines not matching the number of rows, and was rolled back to the exact digest before anything was committed. Two permanent fixes came out of it, including a post-write self-check that restores the original and exits non-zero if the write cannot prove what it did.

The page also records a gap this exposed and did not close: the write was not recorded in the body's own ledger, because that ledger has structure but no store yet. So the audit trail for its first write to canonical evidence is a commit and a receipt — the very mechanism this body exists to replace.

The pre-registration table then gives each remaining item its expected outcome and falsifier: registration must precede any run that references it; a verdict must be a controlled word plus a receipt reference and never a number; the structural refusals must refuse and must name what is missing; a co-signer may not be the proposer; and the anchor must make truncation detectable in practice rather than only in a test.

A second table names each test before it is written, with the reason it must fail first. A standing procedure is stated: where failing-then-passing is not achieved — including a guard that passes vacuously because its subject does not exist yet — that is stated, and the guard is mutation-tested before it is counted.

Verification, rollback and stop conditions follow, including that the one authorised write to real evidence begins in a stop state and does not leave it without a human answer. The exit condition requires the next plan to exist, carrying every disposition, every falsifier that fired, and several named hazards inherited from this one.
