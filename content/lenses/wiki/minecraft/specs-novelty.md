---
lens_schema: 1
scope: wiki
key: minecraft/specs-novelty
corpus: minecraft
source_sha256: b6797557992518af
source_body_sha256: d918da946f49e6e2
source_title: Typed Model Spec — `:novelty` (parameter information-gain EFE term)
source_words: 2287
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page is two things at once. It is the typed specification of one term that is already merged and live behind a switch, and it is the template every later organ specification has to follow, section by section, in the same order.

The term itself is described in one line at the top: a third component of the action score, measuring how much would be learned about the model's own parameters, which the flatter two-term version was missing. It rides the same channel as the existing information term, under the same weight, is independent of preference, and fades to nothing as evidence accumulates.

Nine sections follow, covering the state space, the channels, the actions, the preferences, the policy, the learning parameters, the precision schedule, the anchors that check it, and a claim fence.

The fence is blunt. The term shows an agent acting to reduce uncertainty about its parameters. It does not show curiosity, and its values are model variables, never felt states.

<!--CLEAR-->
This document does double duty. It is the typed specification of a term that is already merged and live behind a switch that is off by default, and it is the template that every later organ specification must reproduce, in the same nine sections and the same order, citing real source locations and carrying a claim fence.

A framing line defines the term compactly: a third component of the score used to choose actions, measuring expected information gain about the model's own learned parameters, which the flatter two-term version lacked. It names which of two possible mathematical forms was chosen and cites the consult that signed that choice with changes. Three properties are asserted immediately and recur throughout: it rides the same channel as the existing information term under the same weight, it is independent of preference, and it decays to nothing as counts grow.

The source files are listed with the exact lines that implement each piece, including the term itself, its integration into the real deep-planning decider, its mirror in the shallower path, the default value of its coupling, and the places where the inheritable setting is defaulted, back-filled, read defensively, and drawn during mutation and recombination.

The first section states that the term adds no hidden-state factor and changes no state space; it is a read-only function of quantities that already exist, defined per factor and consuming only that factor's own values, so the factorisation is preserved and no joint belief is built. A table lists each quantity it reads with its type and the line where it appears, and notes that the counts are seeded so their minimum is the prior pseudocount, which is exactly the floor used later.

The middle sections work through the remaining slots in order: the observation channels, the action space, the preference model, the policy set, the learning parameters where the floor and the decay live, the precision schedule, and the validation anchors that check each claim.

The ninth section is the claim fence, and it is the bluntest writing in the document. The term is described as measured information gain over counts: a necessary but not sufficient substrate, carrying no evidential weight for awareness, experience or life on its own. Passing any of its anchors shows the named behaviour and never experience. One anchor shows the agent acts to reduce uncertainty about its parameters, and the fence states explicitly that this does not show the agent is curious or drawn to explore. The coupling, the term's values and the per-cell information numbers are named as model variables rather than felt states, and must never be described as curiosity, interest, boredom or any subjective term. It closes by saying no claim about awareness follows from this term, this specification, or any single gate.

A final note explains why this is the template, listing five patterns every later organ inherits: gate at an inert default so the switched-off path is byte-identical and check that with a tolerance assertion over the real decision path; never attach a scalar to an action, so any action dependence enters through the transition column rather than the label; require decay and bounded amplitude for any information term; plumb an inheritable setting the same way, including appending a new random draw last so existing lineages keep their sequence; and carry a claim fence written with the same discipline.
