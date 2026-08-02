---
lens_schema: 1
scope: wiki
key: evidence/receipts-control-plane-phase3-green-2026-07-25
corpus: evidence
source_sha256: 4351ddaccc0f9770
source_body_sha256: 4351ddaccc0f9770
source_title: Phase 3 — the green run, and the two premises that turned out wrong
source_words: 1434
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A green run whose headline is that two of the author's own premises, written down before the run, turned out wrong, and both were caught by trying to act on them. One rule, shipped in an earlier phase, confused a list's first entry with a subject's first entry, and no test covered it, which the page calls a comment that happens to run. The other assumed a formatting failure was only about line endings; tested directly, the file is genuinely unformatted, so the fix written down in advance is not available and the fallback is taken.

One of the rulings it writes down explicitly is about verdicts. Only one of them may be authored with no receipt — no file recording what was run — because it asserts nothing. A withheld verdict still needs one, since a withdrawal is itself a claim about evidence.

<!--CLEAR-->
A green receipt — the file recording what was run — with the counts before and after, and a note that the test count is identical, so nothing was added to make anything pass.

The first adverse finding is the author's own rule, shipped in a previous phase and enforced by code. It said one field could be empty only for the very first entry in the list. That confused the list's first entry with the first about a particular subject, a category error the page says reads as rigour. It survived because no test covered it, and the line that follows is worth keeping: a rule with no test is a comment that happens to run. The correction is stated with whose job each part is, and pinned by a test named after the case that broke it.

The second is a pre-registered fix — written down in advance — that turns out not to be available. Two options had been offered for an inherited failure, and the first assumed the problem was line endings alone, because the diff displays them prominently. Tested directly, the file still fails after that change, and a real reformat would be a substantial restructuring of a file in a guarded subsystem. So the second option is taken and recorded as a standing known failure with its reason. It was modified during the investigation and reverted to byte-identical twice, and that is recorded.

The page then draws the lesson: two pre-registered premises wrong in one phase, both assumptions written as facts, both caught by trying to act on them, which is the pre-registration working rather than failing.

A third section resolves a conflict between two of the author's own tests before either was committed. Requiring a digest on every piece of evidence would make authorship depend on a file already existing, which contradicts another test; the alternative was weakening the rule to admit an entry with no digest, a guard traded for a convenience. The resolution puts the pointer in a different field, so a reader of the list alone still reaches the receipt while the evidence list stays content-addressed. The reasoning is written into the test, so the tension is not rediscovered later as a bug.

A build table follows, then design decisions recorded rather than left implicit. How prospectivity is defined, so a later phase needs no change to the guard. Why the two-party rule lives with the writer rather than with the author, and why comparison ignores case and spacing. Which single verdict may be authored with no file recording what was run, and why a withdrawal may not. Why a near miss is refused rather than quietly normalised, and why one convenient function deliberately does not exist.

One item is explicitly partial, with the sub-claim holding it back named. The mechanism works and catches several kinds of tampering, but nothing persists across a process boundary, so in practice nothing holds what would be needed. A test asserts that limit directly and is written to fail the moment it stops being true, and it was mutation-tested.

A table then explains why four tests that passed in the red state did so for good reasons rather than vacuously, and which two were mutation-tested. A verification table follows, then a correction of a stale number in a commit message, with the receipt named as the number to trust and no history rewritten. The page closes with what the phase did not do and how to roll it back, noting one correction that should survive a rollback because it fixes a real defect independently.
