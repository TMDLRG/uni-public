---
lens_schema: 1
scope: wiki
key: minecraft/lab-protocol
corpus: minecraft
source_sha256: 45f240b1796a7fac
source_body_sha256: 45f240b1796a7fac
source_title: Lab Protocol — evidence discipline, attribution, claim fence
source_words: 818
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
The project's standing rules live here, written as hard guardrails rather than preferences. Breaking one is treated as a bug.

The first rule is the one everything else rests on. Never stack changes so that you cannot say which single variable produced the result you are reporting. If two things changed at once, the outcome is unattributable and may not be claimed at all; it is logged as exploratory. One cure at a time, and a second cure waits until the first has a recorded verdict.

Other sections cover registering the conditions for success and failure in the plan before a run, collecting evidence continuously rather than in snapshots, confirming behaviour against an independent source rather than the system's own report, and a guard that keeps new work off the live colony without permission. Paired design is the default, with everything but the thing under test held identical.

One section is a fence. Passing a gate shows a named behaviour and never experience. The measures carry no evidential weight for awareness or life on their own.

<!--CLEAR-->
This document is the project's standing protocol. It is written as owner-set rules rather than advice, and it says that violations are bugs.

The first rule is about attribution. Every paired test must end with one answer to the question of which single variable produced the divergence being reported. If the answer names more than one thing, the outcome is unattributable and may not be claimed; it is logged as exploratory. The paired design is the default, with the code, the world, the body and the population held identical and only the thing under test varying. One cure ships at a time, and a second waits until the first has a recorded verdict. If a second variable enters a comparison by accident, the result is voided and the run redone.

The second section requires the gates to be registered before a run and names the documents they live in. A gate has a fixed shape, requiring all of several things for success and naming the observation that would refute it. Verdicts are words rather than percentages, and a partial verdict must name exactly which part holds and which does not.

The third section covers evidence collection: continuous time-series rather than single snapshots, with both arms sampled in step; collectors that live outside the assistant's session so they survive interruptions; independent confirmation of behaviour from the server's own view rather than the body's self-report, and of mechanism from direct probes; and receipts pointing at a commit, a saved file and a log that reproduces the number.

A guard section keeps new lineages off the live colony without the owner's go-ahead, in separate containers with their own memory, and requires an offline gate to pass first.

The mathematics section lists invariants: no foreign computation layers, no gradient training, no reinforcement learning; every new term must be a recognised quantity of the theory; no scalar attached to a single action may enter the policy, guarded by a test that clones identical actions; every extension additive and behind a switch that is off by default so the standard configuration is unchanged; and any information term must decay to nothing as evidence accumulates, which is described as the proof that no reward has been smuggled in.

The claim fence is stated as binding. Behavioural and organisational measures are necessary but not sufficient substrates, carrying no evidential weight on their own for awareness or life. Passing a gate shows the named behaviour and never experience, and internal values are not to be surfaced as felt states. The stated reason for carrying receipts is so that warranted claims and over-claims stay visibly separate when this becomes load-bearing in public.

A further section requires adversarial review by a persona team before any change touching the core mathematics ships.

The last section is a set of standing instructions the assistant writes for itself, and it is the most human part of the document: do not move past a running test before its evidence reaches a verdict, do not infer cause from one snapshot, do not confuse a frozen collector with a frozen colony, report a partial result as partial rather than spinning it, and write the verdict in the same document as the gate so the receipt sits beside the claim.
