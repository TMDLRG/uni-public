---
lens_schema: 1
scope: wiki
key: evidence/receipts-colony-v5-redeploy-2026-07-19
corpus: evidence
source_sha256: a9145df935284564
source_body_sha256: a9145df935284564
source_title: Colony redeploy v2 → v5-9e6cee1 — the chip stops running 3-week-old bytes (receipt, 2026-07-19)
source_words: 935
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A record of replacing a long-running deployment that had been running bytes built weeks before the layer everyone needed. The interesting part is the trap avoided: two newer-looking images existed, and both also predate that layer, so deploying either would have destroyed live state for a sideways move. The real next version had never been built, so it was built from a pushed reference. The minds were captured and their integrity checked before anything was removed, a mistake in the first swap is recorded rather than smoothed over, and the claim is fenced to plumbing.

<!--CLEAR-->
A redeploy receipt with a pass verdict and a stated evidence class, and a claim fence at the top saying what it does not show. It demonstrates the named behaviour, and it is not evidence of awareness, experience or life.

The problem is stated with dates. The running image predated the show-runner layer by more than two weeks, so the colony worked at the body level and was blind at the camera. Then the trap: two later-numbered images exist and look like the obvious next step, and a table of build times shows they also predate the layer. Deploying one would have destroyed live state for a sideways move. The real next version had never been built, so it was built here.

The capture procedure is honoured and recorded as a table of captures, with times, counts and where each was committed. An integrity check passed before any destructive step, and a second capture was taken immediately before the swap so the loss window was minutes rather than an hour. One sentence matters more than the rest: the original minds are preserved and not restored. The new colony started empty and bred fresh ones, and restoring the older lineage is fenced behind an owner decision and a review.

Two things are checked rather than assumed. The named genome is confirmed by reading the code path and then checking that the running container carries no override. And the build comes from an immutable pushed reference rather than from the working tree, which also means uncommitted local edits could not leak into the image. The image is then compared against the old one to show the missing layer is present, before anything was destroyed.

The swap section records a mistake. The first attempt omitted the hostname, so the node name did not match what another component targets, and the result was that component reporting live with a count of zero. The page cites the project's own rule that this reading means an empty colony, and says it is recorded as such rather than glossed. It was fixed by re-running with the hostname, and the lesson is named: the hostname was not part of the captured configuration and should have been. A restart policy was deliberately left alone rather than improved mid-deploy, with the follow-up recommended instead.

The proof is probes rather than the existence of processes: the real driver, a frame advancing between two probes, and a count rule reconciling two independent sources. The canonical checker could not be used because of a pre-existing gap, which is named as pre-existing rather than blamed on this deploy. A closing section gives the rollback position and its asymmetry: code rolls back in seconds, minds do not, which is exactly why the capture ran immediately before the swap.
