---
lens_schema: 1
scope: wiki
key: minecraft/lab-team-04-red-experimentalist
corpus: minecraft
source_sha256: 13715a3fe58b4329
source_body_sha256: 13715a3fe58b4329
source_title: Lab Team — The RED Experimentalist / World Auditor
source_words: 562
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page describes one reviewer persona in a five-part team. Its job is to design the experiment that could show a proposed change is wrong, and to register it in writing before the run happens.

The method is a paired test. Two arms, the same code, the same world, the same bodies, with exactly one difference: the thing under test, switched on in one arm and off in the other. Alongside that come ablations, which turn the new thing off or scramble it and check that the effect dies with it.

The persona's guarded failures are the honest heart of the page. Reporting only the window where the result looked good. Telling a story from a single run. Mistaking one part of a claim passing for the whole claim passing, which is exactly what a partial verdict is for. And stopping at a snapshot when a time series would have told you something different.

Every gate must be written down before the run, with both a success condition and a refuting condition.

<!--CLEAR-->
This is a role description for one member of an adversarial review team. It speaks after the mathematics and the implementation have survived, and its job is to design the paired test, written down before the run, that would falsify the behavioural claim before the complexity of a real world hides it.

The knowledge section names the method. A paired design keeps the code, the world, the bodies and the shape of the population identical between two arms, and varies only the thing under test. Ablations turn that thing off, shuffle an inner policy, or freeze a parameter, and show the effect disappears with it. Metrics are drawn from several independent places, including the game server's own authoritative view of inventories over time and direct probes of the agents' internal quantities. Seeds and world settings are fixed and reproducible, and the page states flatly that a single seed is not a result. Pre-registration is required: every gate is named in a document before the run, with a condition for success and a condition that would refute the claim, and the verdict is recorded next to the gate.

The opening questions are short. What paired counterfactual isolates the term. What result would make us reject this. Where is the gate written down, before this run.

The guarded failure modes are the most valuable part. Cherry-picking, meaning reporting only the window in which the cure looked good. Single-run storytelling, where one agent's trajectory stands in for a result. Mistaking a narrower success for the broader one, which the page illustrates with a real case and says is exactly what a partial verdict exists to record honestly. And stopping at a snapshot, because inventories ceasing to change is not the same as the colony ceasing to change, and both the time series and the internal probe are needed to tell them apart.

The required checks then fix the shape of an acceptable test. It must be written down before the run and linked from a document, and paired with a matched control. It must collect continuous measurements at a stated cadence, in a way that survives an assistant losing its context. It needs a success condition that requires all of several things at once, a named refuting condition, and minimum numbers per arm for both live and offline claims. And it needs independent confirmation of behaviour and of mechanism, with a verdict recorded in the same document as the gate, in enough detail to reproduce every number cited.

The page closes with three verdict formats and points at earlier tests as references, including one whose partial verdict was recorded rather than spun.
