---
lens_schema: 1
scope: wiki
key: evidence/receipts-lab-team-review-mc-codec-versioning-85b0e8c-v2
corpus: evidence
source_sha256: 32123e27e85f2aa6
source_body_sha256: f24a20419161f8c3
source_title: /lab-team-review MERGED VERDICT (v2, post-fix) — C-C4a mc_codec version bytes
source_words: 5517
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A review of a proposed change, adding version markers to saved files, whose first finding is that the original targeted the wrong module entirely. The corrected version retargets everything at the real save and load path. The most careful decision is what it refuses to change. The loading function's existing behaviour of never returning an error is preserved, because every caller depends on that shape today. A version mismatch falls into the same existing fallback, and is merely made loud instead.

<!--CLEAR-->
A review round over a corrected specification, with a passing verdict, covering one document. No source code was touched by the pass.

The first finding is that the specification named the wrong module. The module it cited does something else entirely and contains no such logic, and a third, similarly named module also exists, which the correction notes explicitly to prevent the same confusion later. Every citation is retargeted.

The second finding retargets the contract onto the real save and load path, verified live, including the detail that the write is not atomic and that loading already fails open. The careful decision is what is left alone. The existing behaviour of always returning a plain value and never an error is preserved. A check of every caller shows they all match on that shape today, so changing it would silently break all of them, which is out of scope for a document-only pass. A mismatch therefore falls into the same existing fallback branch, and is simply made loud with a warning.

Two supporting checks are worth noting. The new layer is documented as orthogonal to an existing mechanism for a different kind of drift, rather than as a replacement for it. And the chosen marker is checked empirically against how old files actually begin, so a collision is ruled out rather than assumed away.

The third finding demands that the removal mechanism be named, and it is, down to the attribute, the comparison and an override so that tests can be deterministic. The justification for hardcoding rather than configuring is checked against the fact that the project has nowhere to put configuration.

One clause is deliberately removed rather than implemented, and the reasoning is the best passage on the page. It referenced a corpus of files that does not exist in the repository, so the figure is unverifiable and unfalsifiable, and the author declines to invent a check against it. It becomes an item on an operator's checklist instead, with a named prerequisite before any future document may promote it to code.

The test coverage and the non-goals are rewritten, and the non-goals are specific about what will not change. No public signature, no duplication of an existing mechanism, no change to how routine saves handle atomicity, and no gate enforced in code.

The reviewers' concerns are then resolved one at a time, and several are notable for being small in the best way. A proposed warning would have logged a full path, which is inconsistent with a convention already established for the same family of files, so a requirement is added and the sketch changed to log only the file name.

A closing summary counts the concerns and observes that several reviewers independently reported the same mis-citation. It notes that none required an out-of-scope note, because each was a defect in the document itself rather than a bug in running code. Every citation used was re-verified against the live repository, rather than copied from the review's prose.
