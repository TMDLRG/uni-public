---
lens_schema: 1
scope: wiki
key: minecraft/runtime-signal-catalog
corpus: minecraft
source_sha256: b9f2e0b38f3abf60
source_body_sha256: b9f2e0b38f3abf60
source_title: Signal Catalog
source_words: 395
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is a reference page listing every signal the body can produce, and what each one carries.

All signals share a standard envelope, and one detail matters: the time on a signal is the world's own tick count, never a clock reading.

The table gives one row per sense. Each row says which organ has to exist and be mature before that sense emits anything at all, and which values it carries. Two notes below the table are worth the visit. Directions are given as relative neighbour indices rather than positions. And one sense is the only thing that exposes a mismatch between how attractive something appears and what is actually hidden there, which is how a new sense opens a new kind of information rather than just more of the same.

The page is explicit that the learner does not see any of this directly. It sees a numbered projection with the meanings stripped out. The semantic view here is for engineers.

<!--CLEAR-->
This is a reference catalogue of signals, written for engineers rather than for the learner.

It begins with the envelope. Every signal carries a standard set of attributes, and two of them are constrained: the time field is the logical world tick and never a clock reading, and the type must follow a dotted reverse-domain form that is checked by pattern.

A framing paragraph then draws the important boundary. Sensor signals are produced by the body's sensing component and are free of coordinates and material identities by construction. The learner does not see these signals at all; it sees a projection into numbered channels with the meanings removed. The semantic payloads shown on this page are described as the engineering view.

The main table gives one row per sense: the type, its source, the condition under which it is emitted, and the keys it carries. One sense is always available as the starting organ; the rest emit nothing until their organ exists and is mature. The senses cover the body's own internal state, contact chemistry and texture, a sense of the body's own configuration, distal gradients, hidden structure such as cavities and strain, spectral bands, readiness for expansion, and a meta sense.

Two notes follow the table and carry the most meaning. Directional values are relative neighbour indices, or a value meaning flat, and never absolute positions. And one value in the shallow chemical sense is only the apparent attractiveness, which a deceptive organism can inflate; the meta sense is the only place where the mismatch between appearance and hidden danger surfaces. The page draws the general point from that: a new sense unlocks a new information regime rather than simply more readings.

A short section describes the versioned observation schema: each source and key pair is mapped to an opaque channel by a per-seed permutation, values may additionally pass through a reversible per-channel transformation, and the encoded observation is nothing but channel numbers mapped to values.

A further section covers signals used for coordination between agents and spawned probes, carried in instructions rather than shared state, and it is careful to say these are conventions for a live runtime that the single-agent pure core does not require.

The page ends with the validation that every emitted signal must pass, and the audit that keeps material identities and coordinates out of payloads.
