---
lens_schema: 1
scope: wiki
key: control-plane/phases-phase-4
corpus: control-plane
source_sha256: b0638267982886e3
source_body_sha256: b0638267982886e3
source_title: Phase 4 — Persistence, runs, and the pairing guard
source_words: 1245
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

The fourth phase was planned from what the third phase observed. Its results are recorded separately.

The phase adds the missing pieces: somewhere durable for the ledger — the list of results only ever added to — to live, an identity for a run, and a guard that keeps a comparison to exactly one differing variable. It is the first phase to write to disk at all, and it is explicit that it still writes no row to the real gate ledger.

The opening section is unusually frank about why these items exist. Two of them are inherited defects rather than new features. The body could not record its own changes, because its ledger had a shape but nowhere to live. So its audit trail was a commit and a receipt — the file recording what was run — the very mechanism it exists to replace. And the anchor was a mechanism rather than a practice, because nothing held one across a restart.

It also names, in advance, the assumption the whole phase rests on, and says that if the assumption fails the phase halts for a decision rather than quietly adding a dependency.

<!--CLEAR-->

Before it ran, the fourth phase was planned from the previous phase's observed results, not its expectations, and written down in advance. It states its bound at the top: this phase writes to disk for the first time, it writes no row to the real gate ledger (only added to), and it moves no confidence level.

The opening section lists what the previous phase changed here; two of the four items are inherited defects, not new features. The body could not record its own changes: its first write to the evidence that counts went unrecorded in its own ledger, which had structure and no store. So its audit trail was a commit and a receipt, the file recording what was run — the mechanism this body exists to replace. The anchor was a mechanism rather than a practice, because nothing held one across a process boundary, so losing the end of a chain was noticed only when someone happened to hold one. The real gate ledger has mixed line endings, which had already cost one rolled-back write. And three premises committed in advance had been wrong in the previous phase, all of them the author's own. So every item here that rests on an assumption says so, and names the check that would show it false before anything is built on it.

The table gives each item an expected outcome and the result that would show it wrong. Persistence must let a ledger written by one process be read back by another, byte-identical, and still verify; what would show that wrong is a reload that loses, reorders or silently repairs an entry. The anchor must become a practice, so that a reload which has lost its tail fails to attest. A run must have an immutable identity recording code, environment, inputs, parameters, seeds, times, exit code and output fingerprints. A comparison with two or more differences must be marked void and unclaimable. The run-status refusals must give an empty run, a short run and an over-long one each their own honest word. The run-failure refusals must halt a non-converged fit before scoring and write no artifact, raise on mismatched lengths before any average, and record a crash as a failed run, not a scientific negative. And the line-ending hazard must be made mechanical, with the terminator taken from the last line and the write checked afterwards.

One paragraph names the premise the phase rests on — that durable persistence is possible with the standard library alone — and says that if it is not, the phase halts for a decision rather than quietly adding one.

A second table names each test before it is written, with the reason it must fail first. The standing procedure is restated: a guard that passes vacuously is not counted until a mutation proves it bites.

Verification, acceptance, rollback and stop conditions follow, with a list of what is out of scope. A separate section carries forward the previous phase's three corrections, so they are not made again. A field may be empty at any position. The corrective count was smaller than first recommended, because a count repeated from memory is not a count. And a formatting failure was misdiagnosed, because the symptom was read as the cause.

The exit condition requires the next plan to exist and answer specific questions. Whether the anchor now catches truncation in practice, and on what evidence. Whether persistence needed a dependency. And whether the body can now record its own changes, with a first entry that shows it.
