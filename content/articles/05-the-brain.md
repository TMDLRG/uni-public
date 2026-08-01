---
title: The active-inference brain
summary: Perception as free-energy minimisation, action as expected-free-energy minimisation, and a hard rule about what may enter the logits.
order: 5
---

This is the engine every agent in the system runs — the UNIs in the world and the Producer that films
them. {{count:uni-minecraft:lib/sp/brain/*.ex}} modules,
{{count:uni-minecraft:test/sp/brain/*_test.exs}} test files.

It is also the part of this site where claims have to be handled most carefully, so this article is
deliberately more cautious than the others.

## There is no reward

The agent does not maximise a score. Perception minimises variational free energy; action minimises
*expected* free energy. Nowhere is there a scalar return to accumulate.

{{cite:uni-minecraft:lib/sp/brain/infer.ex}}

This is not a philosophical flourish, it is an engineering property. A reward signal is the thing a
system accidentally optimises — the thing you later discover it was gaming. There isn't one to game.

## The model

A generative model here is `(A, B, C, D, E)` plus precisions plus Dirichlet counts: what observations
each state produces, how states transition under each action, which observations are preferred, where
things start, and prior habits.

{{cite:uni-minecraft:lib/sp/brain/model.ex}}

Learning is Dirichlet accumulation — counting what actually happened — and nothing else.

{{cite:uni-minecraft:lib/sp/brain/learn.ex}}

## Why the joint state is never built

A realistic agent has many factors, and the joint state space is their product. Materialise it and you
are finished before you start.

The engine is mean-field multi-factor: the posterior factorises, and — the result that makes it
work — **expected free energy is additive across factors**. So `G(π)` can be computed per factor and
summed, and the joint `N_x = Π N_f` is never constructed.

{{cite:uni-minecraft:lib/sp/brain/factors.ex}}

## Expected free energy, in two parts

`G` decomposes into an epistemic term — how much a policy is expected to reduce uncertainty about
hidden state — and a pragmatic term — how far predicted observations sit from preferred ones.

{{cite:uni-minecraft:lib/sp/brain/efe.ex}}

Planning is a depth-limited beam search over policies, which is an approximation to sophisticated
inference and is labelled as such rather than described as the real thing.

{{cite:uni-minecraft:lib/sp/brain/plan.ex}}

## The invariant that governs what may be added

This is the most transferable idea in the subsystem. When a new term is proposed for the engine, it
must be one of a closed set: pragmatic, state-epistemic, parameter-novelty, or a precision. Nothing
else enters the logits.

Novelty — the parameter-information-gain term — shows what that discipline costs and buys. Its own
docstring states the property that keeps it from being a reward in disguise:

{{quote:uni-minecraft:lib/sp/brain/novelty.ex:13-15}}

Then the test file asserts exactly those properties by name: that `W` decays monotonically to zero as
counts grow, that it is **independent of `C`** (so it cannot smuggle in a preference), and that it is
bounded so it cannot swamp survival.

{{cite:uni-minecraft:lib/sp/brain/novelty.ex}}

And the strongest one: with the novelty gain at zero, the agent's decisions are **byte-identical** to
the agent without the term, over the full planning path. A new capability must leave the old
behaviour bit-for-bit unchanged when switched off.

## Precision is attention

Two precisions are tracked and updated: confidence in policies, and confidence in each observation
modality. Attention, in this framing, is not a spotlight — it is the optimisation of confidence.

{{cite:uni-minecraft:lib/sp/brain/precision.ex}}

## The viability edge is real

Homeostasis and metabolism are not decoration. An agent has internal states that can go wrong, and
"wrong" is defined by the model rather than by a designer's penalty term. Both modules carry an
explicit claim fence in their own docstrings — a paragraph stating what the module does *not*
demonstrate.

{{cite:uni-minecraft:lib/sp/brain/homeostat.ex}}

## Continuous action

Discrete policy selection is not the whole story. Motor control is continuous predictive coding:
action descends the free-energy gradient, `ȧ = −∂F/∂a`, proportional to precision times the difference
between target and sense.

{{cite:uni-minecraft:lib/sp/brain/motor.ex}}

Thirty-nine lines, most of them the derivation.

## What is NOT established

Stated plainly, because this is where overclaiming would be easiest:

- **This is not a claim about consciousness or experience.** The estate's phenomenology document maps
  human phenomenological categories onto implemented mechanisms and records where the mapping *fails*.
  The failures are the point of the document.
- **Passing tests are not biological parity.** The contract governing this work says so in as many
  words, and separates observation from reconstruction from simulation as a rule.
- **There is no rendered architecture diagram of the brain** — factors, EFE, action selection —
  anywhere in the estate. Of the five subsystems documented on this site, this is the largest
  diagramming gap, and it is recorded rather than glossed.

What *is* established is narrower and more interesting: a working multi-factor active-inference engine
with no reward signal, whose additions are gated by an invariant that requires them to change nothing
when switched off.
