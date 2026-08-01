---
lens_schema: 1
scope: article
key: the-brain
corpus: 
source_sha256: 9376fc5b3bf50df5
source_body_sha256: 9376fc5b3bf50df5
source_title: The active-inference brain
source_words: 761
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

This page describes the reasoning engine every agent in the project runs, including the one that
directs the broadcast. Its central point is that there is no reward. The agent does not collect a
score. Perception reduces one quantity, and choosing what to do next reduces a related one that looks
ahead. The page argues this is an engineering property rather than a philosophical flourish: a reward
signal is the thing a system accidentally optimises, and there is not one here to game.

It then explains the rule that governs what may be added to the engine. Any proposed new term has to
belong to a short closed list, and the worked example had to decay to nothing as evidence built up,
stay independent of the agent's preferences, and leave behaviour unchanged when switched off.

The page is deliberately more cautious than the others on the site. It says this is not a claim about
experience, that passing tests are not biological parity, and that no diagram of this part exists
anywhere.

<!--CLEAR-->

This is the article about the inference engine every agent in the estate runs, the ones in the world
and the one directing the broadcast. It says up front that it is deliberately more cautious than its
neighbours, because this is where overclaiming would be easiest.

There is no reward anywhere. Perception minimises variational free energy; action minimises expected
free energy. No scalar return is accumulated. The article treats this as an engineering property
rather than a slogan: a reward signal is the thing a system is later discovered to have been gaming,
and there is not one here.

The generative model is a set of matrices plus precisions plus counts — what observations each state
produces, how states transition under each action, which observations are preferred, where things
start, and prior habits. Learning is counting what actually happened, and nothing else.

A realistic agent has many factors, and materialising their combined state space would finish you
before you start. The engine keeps the factors separate and leans on the result that expected free
energy is additive across them, so it can be computed factor by factor and summed, and the combined
space is never built.

Expected free energy splits in two: how much a policy is expected to reduce uncertainty about hidden
state, and how far its predicted observations sit from preferred ones. Planning is a depth-limited
beam search, which the article labels an approximation rather than describing as the real thing.

The most transferable idea here is the rule about what may be added. A proposed new term must be one
of a closed set, and nothing else enters the choice. The worked example is a novelty term. Its own
documentation states the properties that keep it from being a reward in disguise, and its tests
assert them by name. It decays to zero as counts grow. It is independent of preference, so it cannot
smuggle one in. And it is bounded, so it cannot swamp survival. The strongest is that with the term
at zero, the agent's decisions are byte-identical to the same agent without it.

Precision is treated as attention rather than as a spotlight. Internal states can go wrong, with
wrong defined by the model rather than by a designer's penalty term, and both of those modules carry
an explicit statement of what they do not demonstrate. Continuous motor control descends a gradient.

The closing section is the point of the page. This is not a claim about experience; the estate's own
phenomenology document records where that mapping fails. Passing tests are not biological parity. And
there is no rendered diagram of this subsystem anywhere, which is the largest such gap on the site.
