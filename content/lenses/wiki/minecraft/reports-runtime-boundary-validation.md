---
lens_schema: 1
scope: wiki
key: minecraft/reports-runtime-boundary-validation
corpus: minecraft
source_sha256: 5123651416bcfb1f
source_body_sha256: 5123651416bcfb1f
source_title: Runtime Boundary Validation
source_words: 460
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This report checks that the deciding part of the system cannot reach out and change the world by itself. It may only return instructions, and something else carries them out.

The method is a set of deliberately awkward agents. One records exactly what type of value it is handed and shows it is nothing but numbers keyed by numbers. One returns nothing at all, so the world should keep evolving on its own while the body stays put. One returns garbage, and the runtime should validate it, count the failures, execute none of it, and finish the episode without crashing.

A table then maps each of a set of runtime design rules to a status, with one marked as specified rather than compiled in.

The last section is the strongest. A recorder writes a per-tick record, and a separate verifier recomputes the no-leak verdict from that record independently.

<!--CLEAR-->
This report verifies a boundary. The agent's decision logic must be pure: it may return instructions, and only the runtime may turn those into effects. Internal body operations must never touch the world, and the scripted strategies must stay as constrained as any learner.

The method is a set of deliberately awkward test agents. One inspects and records the type of value it is given, to confirm it is nothing richer than a mapping of numbers to numbers with no reference to the world or body modules. One returns no instructions at all, so that the world should continue to advance by its own dynamics while the body's position and inventory stay unchanged. One returns out-of-range and non-instruction values, so that validation and decoding should reject them, count the failures, execute none, and let the episode finish without raising.

The results follow those three in order and add two more. Body state transitions return only a body and telemetry, so they cannot reach the world at all, with the world-side consumption applied by the simulation instead. And every scripted strategy returns only one kind of instruction, with the random and probing strategies never touching the meaning of the channels.

A table then maps a set of runtime design rules onto statuses. Most pass with a named implementation. One is marked specified rather than implemented, and that row is what keeps the table honest.

The strongest section is the durable record. A recorder writes a frame per tick showing that the only thing crossing from world to agent was the opaque observation, and that the only things crossing back were the recorded instructions and decoded actions. A separate verifier recomputes the no-leak verdict from that log independently. In a stricter mode the channel mapping is removed from the agent's context entirely, so the observation is demonstrably the sole world-derived input, and that removal is itself recorded and asserted by a test. The recorder is a pure read, off by default, and determinism was tested with it both on and off.

The verdict is a pass, and the residual risk repeats that one live wrapper is specified rather than compiled into the offline core, with the note that the pure interpreter enforces the same boundary the adapter would.
