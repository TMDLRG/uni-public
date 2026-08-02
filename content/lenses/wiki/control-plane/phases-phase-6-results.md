---
lens_schema: 1
scope: wiki
key: control-plane/phases-phase-6-results
corpus: control-plane
source_sha256: 240e6ba9a26a56c4
source_body_sha256: 240e6ba9a26a56c4
source_title: Phase 6 — RESULTS
source_words: 1304
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

This records the sixth phase. Its headline is that checking premises first caught a false one for the second phase running, and this one would have cost a rebuild. The ledger entry — the record of results, only ever added to — allowed a single grant of authority, while an airlock needs two keys, so there was nowhere to put the second.

The next section is an adverse result the page refuses to tidy away. One full-suite run reported a single failure. The output was not captured before re-running, and two later runs were clean. So the honest statement is one unreproduced failure, test unknown, root cause not established. The suite has a documented history of timing-sensitive tests, and the page says that is the likely explanation — then says likely is not established, and declines to record it as a flake. It is written into the commit rather than dropped, because a failure you cannot name is exactly the kind that gets quietly assumed away.

One item was never started, because it needs a human co-sign, and that is the point of it.

<!--CLEAR-->

This page reports the sixth phase against its plan, written down before the work.

The headline: the premise-checking item found a false premise for the second phase running, and this one would have cost a rebuild. The ledger entry — the record only ever added to — carried a single grant of authority, while an airlock needs two keys, so there was nowhere to put the second. Had the check looked only at the command vocabulary, the author would have concluded the premise held, built the whole thing, and hit the wall at the end.

The first substantive section is an adverse result carried rather than tidied. One full-suite run reported a single failure, outside this work. The output was not captured before re-running, and two later runs were clean. So the honest statement is one unreproduced failure, test unknown, root cause not established. The suite has a known history of timing-sensitive tests, which the page names as the likely explanation — then says likely is not established, and declines to call it a flake. It is written into the commit rather than dropped, because a failure you cannot name is the kind that gets quietly assumed away.

The disposition table records the room transitions and the entry refusal that demands a receipt (a record of the run) on disk. It also records the airlock that demands two distinct parties with an operator among them, the absence of any override, and the exit that demands a contamination check and a recomputed manifest. One item is not started because it is gated on the operator; one inherited failure stands.

The section on what the premise checks found is the most useful. One premise was confirmed, with its blind spot stated. The author read the stated rule and watched the queue refuse a self-approval, but did not enumerate every action and watch each one gate. A path that quietly bypassed the queue would not have been caught. One was false, and the page notes that the pre-stated instruction to read the specification rather than only the code is what caught it. One was confirmed with a correction: searching for two obvious words returned far too many files to mean anything, while searching for the shape of the thing found a surface already modelling a gated progression.

The remedy is additive — an optional list of co-signers — and the entries already written carry none and still verify, asserted by a test that passed early for that reason. The shape is borrowed, not invented, mirroring an existing gated progression that says why a step is not yet done in words a reader can act on.

Decisions worth carrying follow. Two keys means two parties, because two agent keys are one party wearing two hats. A room's receipt must exist on disk — deliberately the opposite of the rule for authoring a verdict. Leaving is gated too: a sterile room is sterile only if what leaves it is accounted for. There is nothing to call rather than something that refuses, since a refused control still teaches that the door is there. And an unmet condition is not a failure, because a surface that paints it red teaches an operator to ignore red.

A further section records three of the author's own tests wrong while the code was right, including a scan whose pattern made it fire on itself. Each was corrected on the merits with the reasoning written into the test. The standing state ends where every phase ends: no verdict has been authored about any real scientific claim.
