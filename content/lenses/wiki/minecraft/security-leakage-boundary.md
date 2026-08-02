---
lens_schema: 1
scope: wiki
key: minecraft/security-leakage-boundary
corpus: minecraft
source_sha256: 7e30f836cec4bf68
source_body_sha256: 7e30f836cec4bf68
source_title: Security / Leakage Boundary Note
source_words: 419
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This note states one boundary and how it is kept. The benchmark is only scientifically meaningful if the learner cannot cheat by reading the simulator's insides.

The boundary is narrow. The learner couples to the world through encoded observations, which are numbers keyed by numbers, and through actions requested as opaque numbers. Everything else sits on the engineering side.

A table then lists what must never cross and, next to each, the thing that stops it. True positions, object labels, and hidden layers without the organ that senses them. Region law, raw material identities, any success flag, and semantic action names.

Five layers of defence follow, from a structural check on every observation, through a scan for forbidden words, to per-seed shuffling that stops a learner hard-coding what a channel means.

The residual risks are stated rather than hidden, including that some scripted helpers deliberately use the debug view and must never be deployed as policies.

<!--CLEAR-->
This is a short boundary note, and its first sentence gives the reason it exists: the scientific validity of the benchmark depends on the learner being unable to cheat by reading the simulator's internals.

The boundary itself is defined narrowly. The learner couples to the environment through exactly two things: encoded observations, which are numbers keyed by numbers, and actions requested as an opaque channel number with parameters. Everything else is declared to be on the engineering side.

A table then lists what is forbidden across that boundary together with the mechanism that prevents it in each case. True positions are prevented because observations carry no keys at all, only channel numbers, and because action parameters reject positional keys. Object labels and material classes are prevented because observations are numeric and payloads are audited. Hidden layers are prevented because a layer emits nothing until its organ is mature. Region law is never serialised into any signal or observation. Raw material identities exist only internally. No success flag, score, reward or return field exists anywhere on the learner's path. And semantic action names are replaced by per-seed channel numbers whose decoding needs a private mapping.

Five layers of defence follow. A structural check requires every observation to be a number-to-number mapping within range, so any other type or an out-of-range key counts as a leak. A deep scan looks for forbidden meaningful words. Per-seed opacity means the same channel number means different things in different scenarios, so a learner cannot hard-code what any channel stands for. Actions are relative only, with absolute positions rejected at decode. And the semantic inverse and the debug lens live only in engineering code, with a trap in the loop that raises on any leak.

An audit procedure names the exact commands that exercise the leakage and fuzz suites and print the live audit.

The residual-risk section is where the note is most careful. Several scripted reference strategies deliberately use the debug view; they are validation tools rather than learners, and the note says plainly that they must not be deployed as policies, while two blind strategies show the interface is usable without semantics. And inferring what a channel means by watching its distribution over many observations is named as the learner's intended problem rather than a leak, with per-seed remapping preventing that knowledge carrying across scenarios.
