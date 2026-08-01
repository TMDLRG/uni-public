---
lens_schema: 1
scope: wiki
key: minecraft/runtime-action-catalog
corpus: minecraft
source_sha256: 42482723e1164866
source_body_sha256: 42482723e1164866
source_title: Action Catalog
source_words: 464
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page is a reference table of everything an agent can ask to do, and what it takes to be allowed to do it.

An action is requested as a number rather than a name. The number is shuffled differently for each seed, so it carries no meaning by itself. The runtime decodes it, checks whether the body has the organ that action requires, and only then applies the effect. A request the body cannot perform is recorded and has no effect.

One rule is stated up front. Parameters are relative only. Absolute positions are rejected when the action is decoded, so an agent cannot aim at somewhere it should not be able to name.

The table lists each action with the organ that gates it, its parameters and its effect. A short section then shows the ladder of prerequisites, which is why the action set unlocks in stages, and why a starting body can only move, turn and probe.

<!--CLEAR-->
This is a reference page: the catalogue of actions an agent can request, with the conditions attached to each.

It opens with the mechanism. An action is requested as an opaque number rather than a name, and that number is a per-seed shuffle of the underlying catalogue, so it means different things in different runs. The runtime decodes it, checks whether the body has the organ the action requires, and only then applies the effect through the single component allowed to change the world. A request the body cannot satisfy is recorded in the trace and has no effect, which makes attempted-but-ungated actions visible rather than silent.

One constraint is stated immediately after: parameters are relative only, and absolute positions are rejected at decode time with a named error. That is what stops an agent from aiming at a place it should have no way to name.

The main table lists each action with its gating organ, its parameters and its effect. Movement, turning and probing need no organ. Manipulating and depositing need a hand. Digging needs a digger and opens a cavity. Transport moves material between neighbouring cells while conserving mass. A family of building actions needs a constructor and produces shelter, support, conduits, an external memory substrate, or a device that drives readiness for expansion. Repair restores structural integrity at a cost. Field shaping and instrument mounting need their own organs. Writing and reading memory need a hand. Opening a seam needs a specialist organ and produces a new region, relocating the body.

A short section gives the cost in feedstock for each thing that can be built, sourced from held material, and notes that building simply fails without effect if there is not enough.

The capability ladder is then drawn as a chain of prerequisites, and the page explains what it implies: the action set unlocks in stages, and a starting body can only move, turn and probe.

The closing section covers determinism and safety. Decoding is total, so arbitrary or garbage numbers return an error rather than raising, and this is fuzz-tested. Targeting is relative to the body's own position and senses. And every effect on the world goes through one component that the agent's decision function cannot reach.
