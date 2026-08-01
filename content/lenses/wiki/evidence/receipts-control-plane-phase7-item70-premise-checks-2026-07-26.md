---
lens_schema: 1
scope: wiki
key: evidence/receipts-control-plane-phase7-item70-premise-checks-2026-07-26
corpus: evidence
source_sha256: b2e5e9a448bce00c
source_body_sha256: b2e5e9a448bce00c
source_title: Phase 7 item 7.0 — premises checked, blind spots named, and the open failure **reproduced**
source_words: 890
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
Three assumptions checked before anything is built on them, and the headline is a self-correction. An earlier phase had blamed an unexplained test failure on a known flake, and that attribution was wrong. The failure reproduced, and it came from a test the same author had written: it spawned one subprocess per item while running concurrently, and a failed spawn looked exactly like a missing record. So the test meant to catch invented history was inventing a failure. It was fixed at the root rather than retried, and the honest claim is not-reproduced-since, not fixed. A third premise, that a picture alone can tell simulated from observed, is deliberately left unchecked: the author's own eye is not evidence.

<!--CLEAR-->
A premise check with an unusually blunt headline: an earlier attribution was wrong, and the author says so first. Three premises are examined, each with the way the check itself could be mistaken written alongside it.

The first premise was that an unexplained failure had been a known flake. It is false. Three full runs at fixed seeds were captured this time, and the failure appeared in one of them, claiming a commit did not exist. The commit does exist and is reachable right now.

The root cause is named as the author's own, and as structural rather than incidental. The test ran concurrently and spawned one subprocess for every item, and under contention a spawn intermittently failed, and a failed spawn is indistinguishable from a missing record if only the exit code is read. The sentence that follows is the point of the page: the test that exists to show the ledger is not asserting an invented history was itself asserting an invented failure.

The fix is at the root. No concurrency for a file that shells out, and one call for the whole set instead of one per item. A retry is explicitly rejected, because the point of this test is to be believed when it fails. The author then records getting the fix wrong once at the shell, checking the semantics directly rather than assuming twice in one item, and quotes both the failing form and the working one.

The blind spot is honoured rather than waved through. Runs that pass do not show absence, so the claim is written as reproduced once before the fix and not reproduced in the runs since, after a root-cause fix, and not as fixed.

The second premise is confirmed by contract, and its blind spot found something real: the surface in question already spawns processes and writes elsewhere. That is not a contract violation, since the contract forbids writing engine state and evidence rather than all input and output, but it does mean a blanket assertion would be false, so the coming tests must be scoped narrowly. It is recorded now so the scan is written correctly the first time.

The third premise, that a screenshot can tell simulated from observed with no text read, is deliberately not checked, and the reason is the strongest line on the page: the author's own eye is not evidence, so the judgement cannot be made by the person who built the thing. Marking it as requiring a review the author cannot perform on themselves is treated as a complete and correct answer rather than an omission.
