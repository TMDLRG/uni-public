---
lens_schema: 1
scope: wiki
key: control-plane/phases-phase-1
corpus: control-plane
source_sha256: 6ac489964a974113
source_body_sha256: 6ac489964a974113
source_title: Phase 1 — Drift disposition and baseline truth
source_words: 1305
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

The first phase of work, planned and committed in writing before any of it was done. Its results are recorded separately, so what you are reading here is a prediction, not an outcome.

The phase is bounded tightly: documentation and audit corrections only, no new code, no verdict authored, no confidence level moved. Its purpose is to test one claim — that when a document and a receipt disagree, the disagreement is surfaced, resolved by a person, and clears. If a disagreement will not clear, the plan says, the source is wrong rather than the document, and that is a finding about the system rather than a chore.

The pre-registration table names each item, what is expected, and what observation would show the expectation false. One item is marked in advance as not clearable, because the file involved belongs to the user. The plan states the standing expectation that some disagreements are not the author's to clear, and warns that a phase reporting everything cleared has either touched something it should not have or laundered something.

<!--CLEAR-->

A phase plan, pre-registered: the expectations and the falsifiers were committed before the work began, so that anything contradicting them counts as a finding rather than an embarrassment. The results live in a separate document.

The bound is narrow and stated at the top: documentation and audit corrections only, no new code, no verdict authored, no confidence level moved, with the exact commits named.

The reason the phase exists is not a warm-up. It is a falsification test of one decision record's central claim: that a disagreement between a document and a receipt is surfaced, resolved, and then clears. If a disagreement will not clear, the plan says, the source is wrong rather than the document. It runs before any code, because building a fix for a defect you have not measured is how you get a fix aimed at the wrong thing.

The pre-registration table gives each item its expected outcome and its falsifier. Several are documentation corrections where a document cites one path and the real one is different. One is expected in advance not to clear by an edit, because one side is a declared plan and the other is an observation of reality — and its falsifier is that it clears trivially, which would mean the author had misread which side was authoritative. One is marked as not the author's to clear at all, because the file is owned by the user, and its falsifier is simply that he touched it. One item is to make a failing gate visible in every status written, with its falsifier quoted and its claim fence intact; that fence gives no weight to awareness, experience or life.

A standing expectation is written out: some of the disagreements are clearable and at least one is structurally not, and a phase that reports everything cleared has either touched a user-owned file or laundered something.

A section of retractions is carried into the phase rather than quietly replaced, because a superseded finding must stay visible. Each names the claim withdrawn, what turned out to be true, and how the mistake happened. The pattern behind them is stated plainly: a deployed copy was measured and reported as the system, more than once. The page also notes that nothing currently detects the difference between a deployed copy and the canonical one.

The work items say for each one: act, observe, record a disposition — and not-cleared with a named reason is a valid, complete outcome. One instruction is repeated in bold: do not edit code to make a disagreement go away.

Verification lists what must hold afterwards: only documentation changed, the test suite unchanged, a generated file byte-identical after re-rendering, and the user-owned file untouched. The falsifier for the whole phase is a disagreement that clears because code was edited rather than a document.

The exit condition has the longest reach. The phase does not end when the work ends. It is complete only when the next phase's document exists, is committed, and is pre-registered in the same form — written from what was observed rather than from this plan's assumptions, and carrying every disposition and its reason. The page states the recursion as a rule rather than a flourish: every phase document ends by requiring the next, and stopping is legitimate only under a declared stop condition.

A closing section lists what the phase explicitly does not do, ending with the most telling item — it does not claim the system is free of drift.
