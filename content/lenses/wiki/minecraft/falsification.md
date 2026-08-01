---
lens_schema: 1
scope: wiki
key: minecraft/falsification
corpus: minecraft
source_sha256: d5e70d2c88ecbf84
source_body_sha256: d5e70d2c88ecbf84
source_title: How to PROVE — or FALSIFY — the UNI
source_words: 1070
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page is an invitation to break the project's own claims. For each group of claims it gives two things: how to observe the claim yourself, and exactly what you would have to find in order to show it is false. The argument at the top is blunt. A claim you cannot imagine falsifying is not science.

One command recomputes every group and prints a pass or fail with the evidence beside it. It needs no live game running and works on an ordinary machine.

The groups cover whether any borrowed language model is hiding inside; whether the mathematics really is what it says it is when checked against an independent implementation; whether the same seed gives the same run every time; whether the agents genuinely learn rather than follow a script; whether the narrating part reads and speaks by learning rather than by matching keywords; and whether the boundary around the deciding part holds, so that raw picture data never reaches it.

It also names its own ceiling: the speaking is short and on-topic, not fluent writing.

<!--CLEAR-->
This document is written the other way round from most claim pages. Each claim is followed immediately by the recipe for destroying it.

It opens with a single command that recomputes every claim group from the running code and prints a verdict with evidence. Two other commands are named for a gate checklist and the full test suite. None of them needs a live game.

The claim groups then follow in order. The first is that this is not a mimic: no language model, no foreign mind, no network calls, and no external libraries at all. To falsify it, add any of a named set of calls or library names to the relevant modules and watch the gates turn red. The page notes that the detectors themselves are unit-tested, so they can be shown to bite.

The second is that the mathematics is what it claims to be, checked against an independent implementation in another language to a stated tolerance. To falsify it, perturb an update equation in a specific way and watch a particular gate fail, or recompute the same equations yourself and find a disagreement.

The third is determinism: the same seed produces an identical sequence of actions and an identical model digest. To falsify it, find two runs at one seed that differ.

The fourth is that the agents learn, because their counts grow with experience and their likelihoods sharpen from a flat starting point rather than following a script. The fifth and sixth concern the narrating part: that it can classify unfamiliar rephrasings it was never given, and say it is unsure rather than guess; and that its surprise at text falls as it learns, which is a measurement rather than a mechanism. Here the page states an honest ceiling in its own words, saying the result is short and on-topic rather than fluent, and that fluent composition remains open.

A further group says that spoken lines stay grounded: every name and number in a line must be present in the state it came from, and the check rejects an injected fake name.

The last groups concern the boundary around the deciding part. Only symbolic channels cross it, never raw pixels. A newer opt-in vision path is described carefully: pixels are processed by a separate pure inference stage that produces one discrete scene value, and only that value crosses. The page says this extends the covenant rather than weakens it, and names what a reader would have to find to show otherwise.

It closes with a standing invitation: disconnect every tool the author has, and the checks still run.
