---
title: The Producer
summary: The broadcast is not run by a script. It is run by an agent, using the same engine as the bots it films — and its action space includes their birth and death.
order: 3
---

There is a live broadcast of the colony: cameras, narration, scene cuts. The obvious way to build that
is a rules engine — if drama is high, cut to the drama; every ninety seconds, do a recap.

That is not how it works. **The Producer is an active-inference agent.** It runs the same categorical
engine as the UNIs it films, minimising the same quantity, with a different action space.

{{cite:uni-minecraft:lib/sp/producer.ex}}

## What it senses

Every beat — 1500 ms — the Producer assembles telemetry into a set of discrete outcomes: how much is
happening in the world, how the colony is doing, server health, what it has recently shown. A
discretiser turns continuous board state into one outcome per modality.

{{cite:uni-minecraft:lib/sp/producer/codec.ex}}

This is where the design earns its keep. Because the Producer's senses are *the show*, "drama" is not
a metaphor — it is a five-bin outcome computed from live colony state, and it is an observation the
agent has beliefs about, not a threshold somebody tuned.

## What it can do

Fourteen actions, with designed preferences. Hold. Cut to drama. Cut to subject. B-roll. Widen. Beat
on crisis, on the social, on a mind, on a recap. Check health. Restart a camera.

And two more:

- **spawn an agent**
- **cull an agent**

{{cite:uni-minecraft:lib/sp/producer/genome.ex}}

## The line that makes the point

Read the dispatch. An expected-free-energy minimum — computed by the same code path that decides
whether a bot mines a block — terminates here:

{{quote:uni-minecraft:lib/sp/producer.ex:354-355}}

`maybe_spawn/1` calls into the colony and a new UNI is born. `maybe_cull/2` stops one. The population
is bounded, and the bounds are the only thing standing between an inference procedure and an
unbounded one, but within them **the decision to create or end a living agent is an inference, not a
rule.**

That is the sentence to sit with. It is also the sentence that ought to make you want to see the
bounds, which is why they are constants in the source and not configuration.

## The planning horizon is a measured trade

The Producer plans ahead with a depth-limited beam search. The depth is 5 and the beam is 4, and the
comment justifying it does not appeal to taste — it gives the measurement: depth 5 costs roughly
1.1 s per beat and buys about 7.5 s of show planned ahead; depth 6 costs 2.3 s and makes the cuts
feel sluggish.

{{cite:uni-minecraft:lib/sp/producer/brain.ex}}

A number chosen because someone timed it, with the timing left in the file.

## It can sense itself

The Producer reads its own error rate. A lock-free counter-based log handler lets it observe how much
is going wrong as an *observation*, not as an exception path.

{{cite:uni-minecraft:lib/sp/runtime/log_sensor.ex}}

An agent whose senses include its own failures is a different kind of thing from one that only sees
the world.

## The narration has no language model

The voice that answers questions about the show answers from live belief state. There is no LLM
anywhere in the released product — that is a contract, not an implementation detail.

{{cite:uni-minecraft:lib/sp/brain/anchor.ex}}

## What is not established

The Producer is the **thinnest-tested** of the subsystems described on this site:
{{count:uni-minecraft:test/producer/*_test.exs}} test files against a module of nearly 600 lines. The
claim that it is an agent rather than a rules engine is supported by the code path — the same
`Plan.action_values` call, the same EFE — but the *quality* of its direction is not something any
test here establishes.

There is also **no architecture diagram for the Producer anywhere in the estate.** It is not in the
Structurizr model. That is a real gap, recorded here rather than papered over.
