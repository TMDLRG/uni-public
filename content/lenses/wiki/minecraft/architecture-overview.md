---
lens_schema: 1
scope: wiki
key: minecraft/architecture-overview
corpus: minecraft
source_sha256: be08942074e2805f
source_body_sha256: be08942074e2805f
source_title: Architecture Overview
source_words: 400
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page describes how one piece of software is put together. It is a map of the parts, and of the rules about which part may talk to which.

The project is a single program in a single language, with no outside libraries needed while it runs. That was chosen on purpose. With nothing external to fetch, a test run works offline, and the same starting seed produces the same run again. The parts are stacked so that dependencies point one way only, never round in a circle.

A boundary runs through the middle of the design. On one side sit the world and the body. On the other sits the learner. The learner does not read the world directly. It only receives encoded observations, and sends actions back through channels that carry no meaning of their own.

The page also sets out four nested clocks, from the smallest tick of physics up to whole lineages, and says where every piece of randomness is allowed to come from. It is an account of a design, not a report of a result.

<!--CLEAR-->
This document is an architecture overview: an account of how the codebase is arranged, and why, rather than a report of anything it has achieved.

It opens with the choice that shapes everything else. The project is one application in one language, with strict boundaries between modules and no outside dependencies while it runs. Two reasons are given. First, the value of the work lies in a world kernel that behaves the same way twice, so a test run must work offline and a seed must fully determine a trace, with no hidden state creeping in. Second, module namespaces already give the separation that a multi-application layout would give, so splitting things apart later would be mechanical packaging work rather than redesign.

Next comes the dependency direction, drawn as a stack whose arrows point one way. Below the interface line, nothing may read raw world or body state across the learner boundary. Only the sensor, which turns world state into signals, and the runtime, which carries out effects, touch both sides. The document says plainly that those two are the boundary, and that they touch both sides by design.

A short table maps the roles of that boundary onto real code. External states are the world and body structures, which are never crossed to the learner. Sensory states are the signals the sensor produces. Active states are the effects the runtime carries out, and internal states belong to the learner alone. The learner couples only through encoded observations and opaque action channels, and a separate audit plus a leakage suite is named as the thing that checks this.

Two further sections follow. One describes four nested timescales, from the smallest physical step, through a decision tick, to a slower developmental tick, and finally to lineages across episodes. The other says that all randomness flows through a single generator threaded through the program as a plain value, with regions given split sub-streams so that adding a region never disturbs another's sequence.

The page closes on an effects boundary: the agent's decision logic is pure and returns instructions only, and just one component interprets those and changes the world.
