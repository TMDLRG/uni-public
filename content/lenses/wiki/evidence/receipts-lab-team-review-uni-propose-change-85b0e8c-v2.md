---
lens_schema: 1
scope: wiki
key: evidence/receipts-lab-team-review-uni-propose-change-85b0e8c-v2
corpus: evidence
source_sha256: 80c03238dbe2e600
source_body_sha256: 80c03238dbe2e600
source_title: /lab-team-review MERGED VERDICT (v2, post-fix) — C-C1 uni_propose_change
source_words: 6574
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A review of a specification for a proposed tool, coming back passing. The most instructive decision is one the author refused to make. Rather than tightening a shared schema so it would demand three fields, which would have forced unrelated future tools to carry fields that do not apply to them, an additive variant enforces those fields for this tool alone, and both behaviours were then checked with a real validator. Several of the concerns turned out to be the same defect, found independently.

<!--CLEAR-->
A review round over a corrected specification and its schema, with a passing verdict. Every citation was re-checked against the live repository before editing, and none had drifted.

The most instructive part is a change the author declined to make. Tightening the shared schema so it required three fields would have been the obvious fix, but that schema is generic across any mutating call, so tightening it would have forced unrelated future tools to carry fields that do not apply to them. Instead an additive variant is defined that requires those fields for this tool only, leaving the base untouched, and both halves are checked live with a real validator: a bundle missing the fields is refused by the variant while still being accepted by the base.

The registration section is rewritten as explicit numbered steps, and one step is marked non-optional with the reason attached: a consistency check raises an error at start-up if it is missing, so leaving it out would not be a quiet omission but a refusal to boot.

One refusal check is rewritten to point at the schema variant rather than describe the rule in prose, which turns it from something a person has to remember into something a machine can enforce.

The test section is grounded rather than invented. The proposed test tree does not exist, and there is no framework scaffolding anywhere in the repository, so the one real precedent for this kind of test is found and followed, with the need for a framework named as a future prerequisite instead of assumed. The same is done for the adversarial script, which is moved to sit beside the one real existing example rather than into a tree that turns out to be for something else entirely.

A parallel problem in a sibling document is noticed and deliberately not fixed, because it is out of scope, but it is recorded in the cross-references so that the two stay consistent when it is corrected.

Two judgement calls are flagged honestly rather than settled quietly. One is which testing convention to follow, where the lower-complexity route was chosen and the alternative named as a future prerequisite. The other is left open at the end: an operational caveat about committing the working tree before treating this verdict as durable, which the page classifies as a note about repository state and timing rather than a defect in the document, with the underlying rule already binding elsewhere.

The concern list at the end reads as a picture of how the review actually works. Around a dozen distinct concerns came from five reviewers, and several were the same underlying defect found independently by several of them: a mismatch in how a call was shaped, a stale cross-reference, and a false conformance claim. One fix each closes every mention, and the page says so rather than counting them as separate pieces of work.

New tests are also added specifically to cover the positive path, prompted by a reviewer noticing that a hardcoded implementation would have passed every existing test, which is the kind of gap only an adversarial reading finds.
