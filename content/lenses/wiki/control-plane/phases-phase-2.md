---
lens_schema: 1
scope: wiki
key: control-plane/phases-phase-2
corpus: control-plane
source_sha256: f15f72022c058fb2
source_body_sha256: f15f72022c058fb2
source_title: Phase 2 — The ledger and the command path
source_words: 968
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

The second phase, planned before the work and from what the first phase actually observed rather than from what it had assumed. Its results are recorded elsewhere.

The phase builds the first real code of the body that runs the science: an append-only, hash-chained ledger; a validated gate row; and a single command path that is the only thing allowed to write. It is bounded — no verdict authored, no row appended to the real ledger, no confidence level moved.

A short opening section says what the first phase changed here. Because most of the disagreement signals compared different kinds of thing and could never converge, this phase's own comparison must compare like with like, and any surface showing a disagreement must show both sides rather than a bare true-or-false.

The tests are named before they are written, each with the reason it must fail first. The page states that red-then-green is to be proven rather than asserted, and that where it is not achieved this must be said rather than presented as compliance.

<!--CLEAR-->

Planned and pre-registered before it ran, the second phase was written from the previous phase's observed results rather than from its assumptions. It names its bound at the top: the first code of the body that runs the science, in the dependency-free root application, with no verdict authored, no row appended to the real ledger, and no confidence level moved.

It opens by saying what the earlier phase changed about this one. Most of the disagreement signals under watch compared different kinds of thing and could never converge; that is not a documentation problem, and it reshapes the plan in three ways. This body's own drift detection must compare like with like — receipt to receipt, digest to digest — and never prose against a file listing. A work item about copies of the ledger differing from the canonical one is struck through and marked done ahead of the phase, out of order, with a note explaining how. And an unequal reading is not evidence of staleness, so any surface that renders a disagreement must show both sides.

The pre-registration table then gives each build item its expected outcome and its falsifier. The ledger must link each entry to the one before and fail verification when a past entry is tampered with; its falsifier is that an entry can be edited or deleted while verification still passes. The gate row must be validated by hand against an existing schema, using only the standard library, and a revision must chain without mutating what it supersedes. The command path must record who acted, under what authority, when, what the state was before and after, how it was authorised and on what evidence — and its falsifier is any write path that avoids it. A read must actuate nothing. The absence of dependencies must be shown rather than asserted. And a comparison between two different kinds of thing must be refused at construction.

One row is unusual and worth reading: an item that had been pre-registered as a decision was instead built the same hour the operator ruled on it, which fired that item's own falsifier. The page records this rather than back-dating it, and says so explicitly.

A second table names each test before it is written, together with the reason it must fail first — an editable entry, a truncated chain that still verifies, a row with an invalid verdict accepted, a revision that mutates what it supersedes, a write outside the one permitted path, a read with a side effect, and a cross-kind comparison being constructible. Each is to be committed failing, with its failure output recorded, then made to pass. The page states that this is to be proven rather than asserted, and that where it is not achieved, that must be stated rather than presented as compliance.

Verification lists what must hold afterwards: every named test recorded failing and then passing, the build file unchanged, the real ledger byte-identical because this phase writes no row, and the user-owned test file untouched. Rollback is deleting the added directory, since the work is additive apart from one clarifying line of documentation.

Sections then list what is out of scope — authoring a verdict, writing to the real ledger, the lab view, rooms and airlocks, anything touching the web application — and give the exit condition. The phase is complete only when the next plan exists, committed and pre-registered in the same form, written from what this phase observed. Passing all the tests is not completion.
