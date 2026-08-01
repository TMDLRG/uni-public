---
lens_schema: 1
scope: wiki
key: minecraft/hud
corpus: minecraft
source_sha256: 79526a4e4a1edc46
source_body_sha256: 79526a4e4a1edc46
source_title: UNI HUD — the third independent surface
source_words: 4369
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
The canonical document for a glance surface — the third always-on display beside two others. It is a native desktop panel rather than a web page, so there is no address that will show it.

Two separate programs make it up. One is a service that speaks only data and listens on the local machine only. The other is the panel you actually look at, which floats above other windows, can be docked to any edge, and is recoverable three different ways if it ever goes missing.

The design rule that matters most concerns a single field. The panel never fabricates an off-air state. Stale, missing or unreachable all display as syncing, because not knowing something is not the same as it being off. The page records exactly what the old behaviour was and why it was dangerous.

Several later sections are honesty fixes an operator caught, each naming what the surface used to claim.

<!--CLEAR-->
Written to parallel the document for its sibling instrument, this is the canonical reference for a glance surface, and it asks to be read before anyone touches the code.

A framing note describes the architecture and its history in one breath: there is no markup anywhere in it and no page to load, because an earlier version built that way existed for a few hours in the same session and was retired. What replaced it is two separate programs. One is a service that serves only data and listens on the local machine, so it is deliberately not reachable across the network. The other is the panel itself, a native always-on-top desktop window.

The first section describes that window in unusual detail, and the detail is the point: several settings are called load-bearing because they are what make maximising respect the taskbar and make minimising land somewhere recoverable. The controls are listed, and recovery is guaranteed three separate ways, with an automatic snap back on screen if a saved position ever points at a display that is no longer there.

A later paragraph describes a rebuild into a mixer-board layout, and explains the defect it fixed: the previous grid had only one stretchy row, so several panels were squeezed to nothing and the footer could be pushed off-screen with no way to reach it. The new layout is three rows with a single scrolling body.

The most important item is the air-state display. It never fabricates an off-air reading. Stale, missing or unreachable all render as syncing, because not knowing is not the same as off. The page then records what the old behaviour was, which was scraping a free-text field with a default that read as a confident off, so an absent or reworded upstream string could show off air while the show was live. It also traces the root cause one layer upstream and records that both layers were fixed.

The following sections cover the data flow, described as a pure aggregation over other truth surfaces rather than a source of its own; a three-legged supervision arrangement for coming back after a restart; the endpoints; and a control path for arming and disarming the outward push, with a note that this deliberately does not run through the data service.

Two further sections solve specific problems honestly. One describes a staging path for audience figures that only accepts vouched values. The other describes a helper that exists because a service running under a machine identity cannot observe some user-scoped things, and the fix is a second tier rather than widening the service's own identity, which is stated as a deliberate choice.

A retirement section documents the discarded earlier architecture so nobody runs it by accident, and a list at the end marks those files as retired.

The remaining sections cover test coverage and an append-only gate ladder, which sorts the worst verdict to the top and leaves one boot-persistence claim honestly pending until a real power-cycle settles it. Then come two clusters of honesty fixes. Both are attributed to the operator catching something, and their headings quote him. Each fix names what the surface used to say, why that reading was wrong under fatigue, and what it says now. A closing section lists structural fences, among them a least-privilege machine identity that is never a person's account and stores no password, which make the surface honest by construction rather than by care.
