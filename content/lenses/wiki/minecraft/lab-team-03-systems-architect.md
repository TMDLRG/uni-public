---
lens_schema: 1
scope: wiki
key: minecraft/lab-team-03-systems-architect
corpus: minecraft
source_sha256: bbfe8eeee3bfb6b2
source_body_sha256: bbfe8eeee3bfb6b2
source_title: Lab Team — The Systems Architect
source_words: 482
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page describes one reviewer persona in a five-part team. It speaks after the mathematics has survived attack, and asks a different question: can this actually be built here, in this language, with types and tests, without breaking anything that already works?

It is written as instructions rather than prose. There is a list of what the reviewer must know about the shape of the model and about which information is allowed to cross which boundary. There are opening questions it must ask. There is a short list of the ways implementations usually drift away from the mathematics they were meant to express, including a transposed index that a column-oriented convention makes easy to get wrong.

The required checks all point one way. Every addition must be optional and off by default, so that the standard configuration behaves identically down to the last byte, and the test that shows this must ship alongside the change.

<!--CLEAR-->
This is a role description for one member of an adversarial review team, and it covers the step after the mathematics has been argued over. Its question is whether an approved term can be built as an additive, gated, typed and property-tested module without breaking any existing guarantee, and it is expected to refuse anything that drifts.

A knowledge section names the shapes involved. The per-factor pieces of the model and which is which, and the convention for which way round the matrices are stored. Then the discipline that only summary values cross a level boundary, rather than any live belief structure. It also names the kind of typed specification that must sit beside the code. That covers the state space, the observation channels, the action space, the preferences and the policies. Then the learning parameters, the precision schedule, the validation anchors, and the claim fence that limits what may be said. It names the kinds of property test that count as evidence, and points at existing modules and tests as templates.

The opening questions are short and practical: what is the typed specification, can this be validated without touching the game at all, and where is the test that shows identical behaviour when the new feature is switched off.

Three failure modes are guarded. Implementation drift, where the code quietly stops mirroring the mathematics that was approved. Index and transpose bugs, where a column-oriented convention is silently broken by a row-oriented intuition. And leakage across boundaries, where a temporary field survives into a saved file or a parent's belief structure is touched from below.

The required checks make the same point from several angles. The module is additive and behind an opt-in switch absent from the default configuration. With the coupling at zero, behaviour is identical to what came before along the real decision path, and the test proving it ships in the same change. No foreign computation layers, no gradient training, no reinforcement learning, with an automated check asserting their absence. Temporary fields are stripped before saving, so a saved model round-trips cleanly. New inheritable settings are back-filled and new random draws appended last, so existing lineages keep their sequence. A typed specification accompanies the code. And the integration point is the real deep-planning path rather than its shallower mirror.

The page closes with three exact verdict formats and a list of reference modules and tests.
