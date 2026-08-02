---
lens_schema: 1
scope: wiki
key: control-plane/phases-phase-3-results
corpus: control-plane
source_sha256: ef284711d4e6d215
source_body_sha256: ef284711d4e6d215
source_title: Phase 3 — RESULTS
source_words: 1491
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

The third phase, reported against its own pre-registered plan — written down before any of the work began. The headline says the code landed and the suite is green, and then says that is not the result.

The result is that three things the phase was built on turned out to be false when acted upon, and all three were the author's own. His data specification. His count of the rows needing correction. His diagnosis of an inherited failure. Each had been written as a fact when it was an assumption. Each was caught by trying to use it.

Two items did not fully land. The anchor is partial: the mechanism holds and catches several kinds of truncation, but the phrase the item pre-registered — in practice — does not. The ledger — the list of results, only ever added to — has no store yet, so nothing carries an anchor across a restart. A test asserts that limit and will fire when it stops being true. The inherited formatting failure is recorded as a standing known failure, with the reason given.

The closing state is the part to carry away. The vocabulary for authoring verdicts now exists and refuses correctly, and no verdict has yet been authored about any real scientific claim.

<!--CLEAR-->

Commits, receipts and the bound it honoured open this report on the third phase — a receipt records what was run — with one authorised write to the evidence that counts, and no other.

The headline says the code landed and the suite is green, and then says that is not the result. The result is that three premises this phase was built on turned out to be false when acted upon, and all three were the author's own. His data specification. His count of the rows needing correction. His diagnosis of an inherited failure. Each was an assumption written as a fact, and each was caught by trying to use it. The test counts are given side by side, with a note that nothing was added between them to make anything pass.

The first adverse result: a rule in the data specification was wrong and had already shipped. It said one field could be empty only for the very first entry in the ledger — a list only added to — and the ledger enforced exactly that. But registering a new gate part-way through genuinely has no prior state, so the rule confused the ledger's first entry with the subject's first entry. The page calls this a category error that reads as rigour, notes that it survived the previous phase because no test covered it, and states the lesson: a rule with no test is a comment that happens to run.

The second is that the inherited formatting failure had been misdiagnosed. The plan had offered either a clean line-ending fix or a recorded known failure. The first option assumed line endings were the whole problem, because the failure output showed them prominently and the symptom was read as the cause. Tested directly, converting them was not enough — the file is genuinely unformatted, and a real reformat would be a substantial change inside a subsystem whose rules are guarded. So the known failure was recorded instead: a deliberate style change belongs in its own commit, not inside an evidence commit.

The anchor item is reported as partial, and the split is stated precisely. What holds: the mechanism exists, round-trips through the bytes that count, and catches truncation by one entry, truncation by many, unexpected growth, and a forged head at the right length. There is deliberately no function claiming soundness, because soundness cannot be claimed without something held outside the chain. What does not hold is the phrase the item committed in advance — in practice — because there is no persistence, so nothing carries an anchor across a process boundary. A test asserts that limit and fires when it stops being true.

The account of the authorised write repeats the corrected count, records the rollback of a first attempt that chose the wrong line terminator, and repeats that conformance holds only of the effective state.

A further section describes a conflict between two of the author's own tests, resolved before either was committed rather than found later as a bug, and written into the test's own documentation. A table records which of the named failure signs fired and which did not, including one not fully closed, and why.

Two closing sections are the most quietly honest. A commit message carries a stale number, and rather than rewriting history the page says which number to trust and why the message differs. The standing state records that a parity claim remains false, a gate remains failing, and no verdict has yet been authored about any real scientific claim: the vocabulary exists, refuses correctly, and has adjudicated nothing.
