---
lens_schema: 1
scope: wiki
key: control-plane/phases-phase-2-results
corpus: control-plane
source_sha256: 5f24d9b5d726cf30
source_body_sha256: 5f24d9b5d726cf30
source_title: Phase 2 — RESULTS
source_words: 1440
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

This records what the second phase actually did, against a plan committed beforehand and not edited afterwards. The headline is not that the code works. It is that the code, on the first day it could compile, found something wrong with the very ledger it was written to serve: the running list of results nobody may edit.

Writing the row validator by hand surfaced twelve rows in the gate ledger — the copy that counts — that break the schema the ledger is judged by, and that no existing guard catches. The page explains why nothing caught them: the enforcing test is more permissive than the thing it enforces, and the gap sits between two guards. The validator was not weakened and the ledger was not edited; the offending rows are pinned by name so that a further one fails the suite and so does a silent repair.

Two more adverse results are recorded. A chain where each entry is locked to the one before cannot detect truncation from the end, and nothing yet holds the anchor that would catch it. And one verification command, named in the plan before the work, fails on a file this phase never touched.

<!--CLEAR-->

This page reports the second phase against a plan written down before the work and not edited afterwards. It names the failing and passing commits and the bound it honoured: no verdict authored, no row appended to the gate ledger (a list only added to), and no confidence level moved.

Its headline: the code landed and immediately found something wrong with the ledger it was written to serve. All the tests named in advance were committed failing with their output recorded, then made to pass. But the interesting result is not the green: writing the schema validator by hand surfaced twelve rows in that ledger which violate the schema it is judged by, and which no guard catches.

A disposition table walks every item named in advance. The ledger is done with a stated limitation: verification cannot detect truncation from the tail, and while a second function can check against an outside anchor, nothing holds one yet. The row builder is done, written by hand against the existing schema with the standard library only, and its supersession follows the convention already in the ledger rather than an invented one. The single writer is done by two guards, both mutation-tested. Reads are shown pure and non-spawning. The absence of dependencies is shown by an empty difference in the build file. Cross-kind comparisons are refused at construction.

A second table records which of the named failure signs appeared. Most did not. One appeared partially — not by editing, which is caught, but by truncation from the end, which no chain of linked entries can catch; the page records this as a limitation of the mechanism, not something to design around. One appeared before the phase began, when something was built the same hour the operator ruled on it; it is recorded rather than back-dated.

Three adverse results follow, and they are the substance of the page. The first is the twelve rows, which carry an empty value where the schema demands text. Why nothing caught it is explained precisely: the enforcing test deliberately steps over the empty case because that line guards something else, and nothing else type-checks, so the gap sits between two guards. The response is careful. The validator was not weakened. The ledger was not edited, and its digest is identical before and after. The offending rows are pinned by name, so a further one fails the suite and so does a silent repair. And a third test asserts the tolerant line still reads as quoted, so the finding cannot rot into a claim about moved code. The remedy is named as the operator's decision.

The second is that a chain of linked entries cannot detect truncation from the end, because a prefix of a valid chain is a valid chain. The third is that a verification command named in advance fails on a file this phase never touched; it is not fixed here, because reformatting it would put an unrelated change inside an evidence commit.

A further section treats the failing-then-passing sequence as proven rather than asserted, and is candid about a subtlety: two tests passed vacuously, since a source scan cannot fail before the directory it scans exists. That was recorded at the time rather than counted as compliance, and both were later mutation-tested: each mutation made the guard fail as required, and both were reverted.

The verification table lists each command and its result, including the pre-existing failure. A short section records what did not change, including a parity claim still false and a gate still failing. The page ends by naming the next plan.
