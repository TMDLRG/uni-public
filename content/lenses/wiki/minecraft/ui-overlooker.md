---
lens_schema: 1
scope: wiki
key: minecraft/ui-overlooker
corpus: minecraft
source_sha256: 5401c3f7750ae484
source_body_sha256: 5401c3f7750ae484
source_title: The Overlooker UI (Phoenix LiveView)
source_words: 515
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page describes a viewing interface: an outside, all-seeing, live view of the whole world at every tick, with a monitor that re-derives, tick by tick, whether the agent received only the opaque observation.

It is a separate application, kept apart on purpose. The core stays free of dependencies; the interface reads world state and recorded logs and never feeds the agent anything.

Three stacked panels are described. A boundary monitor with a large verdict badge, itemising four checks. Its verdict is re-derived each tick rather than trusted from a flag the engine set. A god view with heat maps of each layer per region, the body's cell outlined, and the graph of regions and seams. And an audit of the signals coming in and the actions going out, each marked as decoded, gated or in error.

The controls allow play, pause, step and reset, a live run with chosen settings, or scrubbing through a recorded log.

<!--CLEAR-->
This document describes an observer interface built as a separate application, and it is careful about the separation. The core of the project stays free of fetched dependencies; the interface consumes it as a local dependency, only ever reads world state and recorded evidence logs, and never feeds the agent.

What it offers is an outside, all-seeing view of the whole world at every tick, together with a monitor for the boundary around the agent. That monitor's verdict is re-derived on every tick rather than taken from a flag the engine set, which is the distinction the page keeps returning to.

Instructions for running it are given, including a headless mode used for automated checking that mounts the interface, steps it, asserts the verdict, then loads a deliberately tampered replay and asserts the badge turns red. A note explains which part is covered by tests and which part is ordinary manual running.

Three stacked panels are described. The first is the boundary monitor, drawn as three columns for the world, the body and its boundary, and the agent, which sits outside the world and is fed only the opaque channel-and-value observation. A large badge shows whether the boundary held, itemising four checks covering structure, a scan for meaningful tokens, whether every observed channel could have come from the organs the body actually had, and whether the observation is exactly the channelisation of the recorded signals. The second panel is the god view: per-region heat maps for each layer of the world, the body's own cell outlined, counts of materials, structures and organisms, readiness for expansion, and the graph of regions and seams. The third is an audit of the incoming signals with their data and the outgoing decoded actions with their status.

Controls allow playing, pausing, stepping and resetting at a chosen speed, configuring a fresh live run by seed, strategy and horizon, or picking a recorded log to scrub through.

A section contrasts the two modes. Live stepping advances the real simulation one tick at a time and records the same frame the evidence recorder produces, so what you watch is exactly what gets checked. Replay streams a recorded log, rebuilding the channel mapping from the seed and recomputing the verdict for each frame.

The closing notes make the architectural point explicit: the agent column's content comes solely from the recorded observation while the god-view panels read world state, mirroring the runtime boundary, and this separation is asserted by the interface's own tests. A limitation is named plainly, that stepping happens inside the viewing process and a shared runner for several simultaneous viewers would be a straightforward extension.
