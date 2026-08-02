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

The phase builds the parts that register a gate before it is run, and author a verdict in words rather than numbers. It also holds the expected head of the ledger — the list of results only ever added to — outside the chain, so that losing the end of it can be noticed.

The most interesting section is not a build item. It is a question the plan refuses to answer itself: twelve rows in the ledger that counts break the schema, and what to do about them is the operator's decision, not an agent's. Three options are laid out with their costs. The page later records the answer, and — unusually — records that the first attempt at carrying it out was wrong and was rolled back before anything was committed, along with the two fixes that came out of it.

<!--CLEAR-->

Written from the previous phase's observed results and committed in writing before execution, this third-phase plan already carries the outcome of two items in its status line: one landed partial, and one became a standing known failure.

An opening section says what the previous phase changed here. The first item is not a build task but a question that must be answered before code answers it wrongly. Twelve rows in the ledger that counts (a record only ever added to) break the schema the ledger is judged by. This phase builds the thing that authors rows, so it must neither add another instance nor quietly normalise the existing ones. The second is that the chain of linked entries has no anchor, so losing the end of it goes unnoticed in practice. The third is an inherited formatting failure on a file this work does not own.

The decision section is the most striking part. It states the question and lays out three options with their costs: append corrective rows, widen the schema, or leave the disagreement standing and pinned. It then says plainly that this is not the author's to pick, while naming which option he would propose and why. The answer is recorded afterwards, with two corrections made before acting. The count was eleven distinct names rather than twelve. And the claim that the ledger conforms can only mean its effective state, because a record only added to keeps the original rows non-conformant forever. The stronger claim is unavailable and is not made.

Then comes something a plan rarely contains: an account of getting it wrong. The first attempt chose the wrong line terminator, because the ledger has mixed line endings and the appender asked whether one kind occurred anywhere instead of looking at the last line. It left a stray blank line in the evidence that counts, was caught when added lines did not match the number of rows, and was rolled back before anything was committed. Two permanent fixes came out of it, including a post-write self-check that restores the original and stops if the write cannot prove what it did.

The page also records a gap it exposed and did not close: the write was not recorded in the body's own ledger, which has structure but no store yet. So the audit trail for its first write to the evidence that counts is a commit and a receipt, the file recording what was run — the very mechanism this body exists to replace.

The table then gives each remaining item its expected outcome and what would show it wrong. Registration must precede any run that references it. A verdict must be a controlled word plus a receipt reference, never a number. The structural refusals must refuse and name what is missing. A co-signer may not be the proposer. And the anchor must make truncation detectable in practice, not only in a test.

A second table names each test before it is written, with the reason it must fail first. A standing procedure is stated: where failing-then-passing is not achieved — including a guard that passes vacuously because its subject does not exist yet — that is said, and the guard is mutation-tested before it counts.

Verification, rollback and stop conditions follow, including that the one authorised write to real evidence begins in a stop state and does not leave it without a human answer. The exit condition requires the next plan to exist, carrying every disposition, every failure sign that fired, and several named hazards inherited from this one.
