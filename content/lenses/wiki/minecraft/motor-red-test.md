---
lens_schema: 1
scope: wiki
key: minecraft/motor-red-test
corpus: minecraft
source_sha256: 9f5ad4b7e2b62ec6
source_body_sha256: 9f5ad4b7e2b62ec6
source_title: Motor-Inference Hierarchy — LIVE RED test (P4), pre-registered
source_words: 1032
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page registers a test before the run, so the result cannot be moved afterwards. It states exactly what is being claimed, what would count as passing, and what would count as failing.

The claim is narrow. A layered motor system can learn a chain of movements in the live game. A higher level projects a desired body configuration downward, and an inner loop works out which way to move by watching what comes back. The results fold upward into something like muscle memory.

What is not claimed is written just as plainly, and includes any claim that the agent learned to harvest, or anything about human-like motor control. If a gate fails, the result is withheld rather than scored.

The results section keeps offline work, simulation and the live run separate. Two parts pass live, one is still running, and the paired control is named as not yet done, with the simulated version standing in for now.

<!--CLEAR-->
This document registers an experiment before it runs, which is the point of it. Both the claim and the conditions that would refute it are fixed in advance so the outcome cannot be reinterpreted later.

The claim under test is stated as a single sentence and is deliberately narrow. A layered motor arrangement can learn a harvesting movement chain under stated conditions. The level above projects a desired body configuration downward. An inner loop reduces the difference between that target and the body's actual configuration, while inferring which direction its controls push by watching what comes back. That returning signal folds upward, so the transitions are learned.

Immediately beneath it is a list of what is not claimed, including that the agent learned to harvest, human-like motor control, or full human motor inference. If any gate fails, the result is withheld and recorded as partial, never scored as a percentage.

A section then lists what had already been shown away from the live world. The new pipeline is additive and leaves the standard configuration behaving identically. The motor parts do learn, and the learning survives being saved and reloaded. And the inner loop converges against a simulated body while working out its own control direction. The page is explicit about what these cannot do, which is show the loop closing through a real body in a real world.

The conditions are then fixed in detail: the size of the group, which configuration it runs, a separate memory location so a motor mind never loads into a standard one, and two deliberate removals. A helper script that used to do the approaching is switched off, and a coarse shortcut prior is not enabled, so that any success is attributable to the thing under test rather than to either crutch.

The gate has three parts and all must pass. A behavioural part requiring a minimum number of agents to reach a minimum amount of wood within a time window. A mechanism part requiring the trace to show the whole chain in order, from the choice of action through the fine movements to a real block breaking and the transitions updating. And an ablation part requiring two paired controls to do worse, with the honest addition that if neither control is worse then the arrangement is not the cause and the result is withheld.

Simulation results come next in a table, run through the same real decision path with a simulated body. The reading given is that the shuffled control collapses harvesting by a very large factor, which is what isolates the inner loop as the cause rather than chance or the higher-level prior. The page labels all of this as validated in simulation.

The live results are then reported separately and honestly. The mechanism passed, with the body's own logs showing real strikes on real logs and real wood entering. The behavioural part is described as passing early with the formal tally still accruing over a multi-hour window. And the paired control has not been run live at all, which the status list states plainly rather than letting the simulated collapse stand in for it.
