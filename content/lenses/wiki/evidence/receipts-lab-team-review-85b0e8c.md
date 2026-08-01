---
lens_schema: 1
scope: wiki
key: evidence/receipts-lab-team-review-85b0e8c
corpus: evidence
source_sha256: 93fb180c301c3799
source_body_sha256: 93fb180c301c3799
source_title: /lab-team-review MERGED VERDICT — 85b0e8c
source_words: 5537
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A review receipt for a proposed tool, produced by five reviewers reading the live repository rather than a template. The merged verdict is revise, under a rule that the worst verdict wins. The core finding is not about the mathematics but about the plumbing: the specification cannot produce its own example from the sources it names, one field has no storage anywhere to source it from, and a conformance claim is checkably false against the file it cites. No code was changed by this pass.

<!--CLEAR-->
A review receipt with a merged verdict of revise. Five reviewers read the actual state of the repository at a named commit, rather than the runner's placeholder mode, and the page says so explicitly, along with what that runner can and cannot do today.

The files each reviewer read are listed, which is what makes the findings checkable by somebody else.

The first reviewer's stated default is to reject and make a proposal earn its signature, and the rationale opens with what checks out before turning to what does not. That balance is the useful part. The gating set the proposal assumes really is the single source of truth it takes it for, and the sensitive term is not being re-litigated here, because it is already gated under an earlier precedent.

What fails is the plumbing rather than the mathematics. The section naming where each field comes from is demonstrably wrong: one source returns a different set of keys entirely, two fields need a heavier probe the specification never names, and one field has no storage representation anywhere in the codebase to source it from at all. The reviewer's phrasing is the sharp one: the specification cannot produce its own example payload from the sources it cites, and its own promised tests would not catch that.

Two further gaps are named. The quantity that most needs a determinism check gets none, with no canonical form specified and no test named for it. And a determinism test that is promised would not cover the real risk, which is a torn read racing a write that is not atomic.

A headline conformance claim is then shown to be false against the only builder that exists today, which emits a different shape from the schema it claims to match. The schema even says it was extracted from that code word for word, which is itself no longer true. The reviewer names this as pre-existing drift that the new proposal carries forward uncorrected instead of flagging.

Because none of that is a broken invariant or a smuggled term, a rejection is judged unwarranted, and the verdict is revise with a specific list attached: rewrite the sources against the real read paths, name whatever new mechanism is needed along with its cost, specify the canonical form and a test for it, and either fix the divergence or explicitly scope it out.

Another reviewer adds a feasibility note about where a boundary should be enforced, observing that no bridge exists today between the two runtimes, and arguing that wherever that bridge lands is exactly where the filtering belongs, so it should be decided together with the exposure design rather than afterwards.

The closing sections state the merge rule plainly, then list the ship-gate artifacts: one present, one argued as not applicable with an instruction to confirm that reasoning rather than assume it, and one still to be drafted. An honesty note records that nothing was implemented and that a change may only land after a signing verdict. A final line says this receipt has since been superseded by a re-review.
