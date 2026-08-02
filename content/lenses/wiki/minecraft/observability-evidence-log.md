---
lens_schema: 1
scope: wiki
key: minecraft/observability-evidence-log
corpus: minecraft
source_sha256: 78d0b9193f5f58b3
source_body_sha256: 78d0b9193f5f58b3
source_title: Blanket Evidence Log & Independent Verification
source_words: 575
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page describes a recorded log of everything that crossed the boundary around the agent on each tick, and the separate command that re-derives the verdict from it.

The point is independence. The verdict is re-derived from the recorded bytes rather than taken from a flag the engine set. A third party needs only this repository and the run's seed.

Recording is off by default, is a pure read of state already computed, and does not affect behaviour or repeatability. A command produces a log; another command checks it and exits non-zero if anything leaked, naming the first frame that failed.

Four checks run per frame. The observation must be structurally clean, and it must contain no meaningful tokens. Every channel in it must be one the body's organs at that moment could have produced, and re-encoding the recorded signals must give back exactly the observation.

The frame layout is printed in full, and a closing section says what each check would catch.

<!--CLEAR-->
This document describes the evidence log: a record of everything that crossed the boundary around the agent on each tick, together with the independent means of checking it.

The framing sentence is the important one. The log is described as falsifiable because it can be re-checked by any third party with nothing but the repository and the run's seed, and because the verdict is re-derived rather than trusted from a flag the engine stamped.

Producing a log is one command, which writes a file with one record per recorded tick plus a sidecar carrying provenance. Options bound long runs. The page is explicit that recording is off by default, and is a pure read of state that has already been computed. So it does not change the agent's behaviour or the repeatability of a run, and it names the test behind that.

Re-checking is another command. The page shows the clean result and then shows what happens after tampering with a single observation value: the run fails, names the first frame, gives the reason, and exits non-zero.

The verifier rebuilds the mapping between channels and features from the recorded seed, using the same public algorithm, and then runs four checks on every frame. The first requires the observation to be structurally clean, with channels in range and only finite numbers. The second scans for meaningful tokens. The third checks provenance against morphology: every observed channel must map to a sense whose organ was present at the moment of sensing, so no channel may exist that the recorded body could not have produced. The fourth requires that re-encoding the recorded signals reproduces the observation exactly, which closes off any hidden side channel.

The frame layout is then printed in full, with annotations. It carries the tick, a snapshot of the world down to per-layer grids and infrastructure, the body, and the genome. Then the inbound side with its signals, the observation, a derivation table and the organs in play, and the outbound side with instructions and decoded actions. Last comes the engine's own claim about the boundary, labelled in the document as a claim that is re-derived and never trusted.

A paragraph handles a subtlety honestly. The derivation table and the sidecar do expose the mapping between channels and their meanings, which is correct for the observer and the verifier. They are produced only after the decision has already been made, so they never sit on the agent's path. A stricter mode additionally removes the mapping from the agent's decision context so the opaque observation can be shown to be the sole world-derived input.

The closing section states what the log would catch, and how the whole thing could be broken. Each check corresponds to a class of failure, the checking command exits non-zero when one fires, and negative tests inject each class to show the checks bite.
