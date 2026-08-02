---
lens_schema: 1
scope: wiki
key: minecraft/runtime-jido-alignment
corpus: minecraft
source_sha256: daad4d921768a542
source_body_sha256: daad4d921768a542
source_title: Runtime Boundary & Jido Alignment
source_words: 703
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page maps an external runtime contract onto this codebase, one rule at a time. The external materials are treated as the authority on how agents and runtimes should be structured, and this page shows where each of their rules is enforced here.

The contract in question is short. Agents hold state and expose one decision function. Actions do work. Signals carry events in. Instructions describe effects for a runtime to carry out. And the decision logic is the purity boundary, which cannot reach the world.

Two tables do most of the work: one lists each rule with the place in this codebase that enforces it, the other translates each concept into its local counterpart.

The honest note is that the live adapter is specified rather than compiled in, deliberately, so the benchmark core needs no external dependencies at test time. A closing section states what the boundary forbids, including that the decision function has no reference to the world at all.

<!--CLEAR-->
This document is a mapping rather than an argument. It takes an external runtime and agent-architecture contract, treats those materials as the authority, and shows where each of its rules is enforced in this codebase.

The contract is quoted in five short lines. Agents hold state and implement a single command function. Actions do work and transform that state. Signals route events into the system. Instructions describe effects for the runtime to carry out, and the purity boundary sits at the agent's decision logic.

A table then lists each rule with the place it is enforced. Signals are the only thing agents consume, in a shape borrowed from a public event standard. Sensors act as pure transducers from event to signal to consumer. The decision function returns instructions and state and performs no effects. Instructions are inert structures that only one component interprets. Body updates never touch the world. Spawned probes communicate by emitting signals rather than writing shared state. Short-lived children are distinguished from long-lived ones. And testing is layered with logical time only, so no sleeping appears in the suite.

A second table translates each concept into its local counterpart, naming the signal structure, the sensing component, the agent behaviour and its decision function.

A code block sketches how a live adapter would delegate to the same pure decision function, encoding an incoming signal into the opaque observation, calling the same policy, and translating the returned instructions. Around it, short notes describe how short-lived probes would be started under a supervisor and stopped again, reporting back only by emitting signals. They describe when a long-lived collaborator is justified, which is only when state must outlive one decision, and how testing would be handled.

The honest note follows, and it is the sentence to carry away. This adapter is specified rather than compiled into the offline core, so the benchmark kernel never depends on fetched packages at test time. A separate limitations document is named for the scope note.

The closing section states what the boundary forbids. The learner never receives a signal with meaningful fields; it receives the encoded projection into numbered channels. The decision function cannot reach the world or the body, because it holds no reference to them. And instructions cannot be used as a hidden channel for changing state, because each one is checked and only the documented effect is applied.
