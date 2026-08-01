---
lens_schema: 1
scope: wiki
key: evidence/receipts-control-plane-phase3-item31-schema-correction-2026-07-25
corpus: evidence
source_sha256: 135121085bf32572
source_body_sha256: 135121085bf32572
source_title: Phase 3 item 3.1 — the schema-conformance correction
source_words: 1117
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A record of the first write that a new authoring path made to the canonical evidence, and it changes no verdict. Before acting, it corrects two things the author had said earlier: the number of corrective rows was wrong, and the claim that the ledger conforms can only mean its effective state, since the original rows stay non-conformant forever. Then it records breaking the write on the first attempt, catching it by counting added lines against rows, rolling back to the exact recorded digest, and adding a self-check that rolls back on its own next time.

<!--CLEAR-->
A correction receipt, authorised by the operator choosing between two options an earlier phase had left open, and the first write to canonical evidence made through the new authoring path. It changes no verdict.

It opens by correcting itself twice, before acting rather than afterwards. The recommended number of corrective rows was wrong, because two of the violations share a gate name and one row per name is fewer. And the claim that the ledger conforms can only be about the effective state, since the file is append-only and the original rows stay where they are, non-conformant, permanently. The stronger claim is named as unavailable and is not made.

Then the adverse section. The first write completed and looked right and was not. The file has mixed line endings, and the detector asked whether one kind appeared anywhere, so it chose the minority form and then added a separator that was not needed. The result was eleven correct rows with the wrong terminator, preceded by a blank line in canonical evidence that nobody authorised, harmless to every parser in use, which is exactly why it would have survived unnoticed. It was caught by counting added lines against rows written, then rolled back to the recorded digest and checked byte-identical before anything was committed.

Two permanent fixes follow. The terminator is now taken from the last line, which is what appending actually depends on, with the reasoning written into the script so it cannot be re-derived wrongly. And a post-write self-check with five conditions restores the original and exits non-zero if any of them fails.

What was written is then shown: digests before and after, the row counts, and a table with one row per gate name, each carrying the same verdict as the row it supersedes. The rows were authored through the module built for that purpose rather than by hand or by editing text, and the script refuses the write if any field outside the few that should change differs. One field is deliberately left alone, with the reason given: bumping it would imply a verdict event that did not happen. Every corrective row opens its notes with a phrase saying why it exists, so a reader of the ledger alone can tell, and a test asserts that.

A red-then-green pair is quoted, with the note that two of the tests passed in the red state correctly rather than vacuously, because they are invariants that must hold on both sides: that the historical violations survive where they are, and that the effective tally does not move. Both the older test and the new one are kept, because they assert two different claims that must not be confused.

The most valuable section names a gap this write exposed and does not close. The mutation was not recorded through the intended chain, because that structure exists but has nowhere to persist, so the audit trail for this write is a commit and this receipt, which is the very mechanism the effort exists to replace. That is called honest and a real gap, and handed to the next phase. A closing note explains that rollback here is not deletion but a further superseding row.
