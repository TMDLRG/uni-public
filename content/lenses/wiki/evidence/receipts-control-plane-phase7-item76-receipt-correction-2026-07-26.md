---
lens_schema: 1
scope: wiki
key: evidence/receipts-control-plane-phase7-item76-receipt-correction-2026-07-26
corpus: evidence
source_sha256: 0b2bd04a4cdfe208
source_body_sha256: 0b2bd04a4cdfe208
source_title: Correction — the item 7.6 green receipt was not reproducible from the commit that carried it
source_words: 543
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A correction, and a small one that matters more than its size. A receipt, the file that records what was run, captured the output of a test run, but one line of that output came from a file sitting uncommitted in the working tree. So a clean copy of the commit that carries the receipt could not have produced the receipt's own output. The discrepancy itself is one warning line, with no assertion, no count and no verdict behind it. The page does not edit the receipt. It commits the missing file, adds a step to the standing procedure, and notes that a drift signal had been pointing at this for days while being filed as normal and therefore going unread.

<!--CLEAR-->
A correction written by the agent that caused it. The defect: a receipt — the file recording what was run — was captured from a test run while a file in the working tree was modified and uncommitted, and one warning line in the captured output came from that file. A clean clone of the commit carrying the receipt would not reproduce the receipt.

The severity section is careful in both directions. The discrepancy is one warning line, with no assertion, no count and no verdict behind it, and the totals in the receipt are unaffected because the tripwire warns rather than fails. But the class of fault is exactly the one the programme exists to catch. That programme's whole subject is that a claim must be reproducible from its recorded artifacts, and the fault was committed by the agent running it.

The root cause is procedural. Every earlier receipt in the phase was scoped to a narrow set of tests that the uncommitted file does not touch. This was the first to capture the whole suite, and the standing procedure had no step for checking the tree first. The file was long-standing and user-owned, correctly not the agent's to commit, which is why it had become invisible.

Two things are named, one not done and one done. The receipt is not edited, because history is extended rather than rewritten, so a reader sees the bytes that were captured and finds this correction beside them. And the missing file was committed unaltered, on explicit instruction, so that from that commit forward a clean clone reproduces the output.

The procedure gains one step: record the state of the working tree in the receipt itself, because a receipt captured from a dirty tree is evidence about a state no commit contains. The closing section prices the whole episode. The cost was one commit and this note. What it bought was the discovery that a drift signal had been reading unequal for days while filed as an accepted oscillation, which is the second trap the programme had already named. The page then says what that label must mean, and what it must never mean.
