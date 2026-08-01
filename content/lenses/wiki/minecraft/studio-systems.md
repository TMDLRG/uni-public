---
lens_schema: 1
scope: wiki
key: minecraft/studio-systems
corpus: minecraft
source_sha256: 4f4751bbbdb8978c
source_body_sha256: c90fad992570926a
source_title: STUDIO SYSTEMS — the canonical map (read this FIRST, it overrides every older studio doc)
source_words: 2948
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page declares itself canonical and says it overrides every older studio document on conflict. It was written after a night of repeated failures caused by two systems being confused with each other, and by claims being made from the mere fact that a process was running.

Its central content is a table separating those two systems, with what each is, what it is for, and which documents describe it. Two of its own rows are then marked stale by a banner above, and the corrected picture is given instead, which makes the page unusually honest about its own age. One piece of work is recorded as pending rather than done.

A later section describes a trap that caused the same failure five times, and what makes that class of failure impossible now.

The binding part is at the end: a numbered set of claim rules saying exactly what evidence is needed before saying overlays are up, before stating a colony size, and before saying anything is live.

<!--CLEAR-->
This document declares itself the canonical studio map and states that if any other studio document contradicts it, this one wins. Its own account of why it exists is candid: it was written after a night of repeated bring-up failures caused by two systems being conflated and by claims being made from the existence of a running process.

Two banners sit above the body and correct it. The first records that after three days of failed attempts to run a mixer on a machine without a graphics chip, the mixer returned to where it worked, and it restates which machine renders, which one only relays, and which has no broadcast surface at all. The second, set by the owner, corrects where the colony runs and states that the other machine captures it over the network and never hosts it. Both banners then say which parts of the body below are stale, and two rows of the main table are individually marked as such with their corrected reading given in place. A document that annotates its own rows as out of date is doing something most do not.

The central content is a table separating the two systems: one a fleet of loose processes launched by a script on a desktop machine, the other a containerized platform of services on a node. For each, the table gives what it is, its status, the design documents that describe it, and its role going forward.

Service maps follow for both, listing what each part is and where it listens, which makes the page usable as a reference rather than only as an argument.

Three further sections introduce surfaces that are explicitly not part of either system and must not be conflated with them: an introspection instrument, a one-click triage entry point, and a glance surface with a native architecture. A section on the console's previews describes how a bounded live feel was achieved while keeping the signals honest.

One section is an incident pattern rather than a description. It names a trap that produced the same failure five times, and explains what now makes that whole class mechanically impossible rather than merely discouraged.

The binding part is the numbered claim rules, and they are the reason to read the page. Overlays may be called up only on a specific check passing together with a screenshot, never from a server having started or a script having exited cleanly. A colony size may be claimed only when two independent sources agree, and the failure that motivated the rule is described: a publishing gap made one side see nothing, so the system spawned repeatedly up to its limit. A live state may be claimed only from a fresh probe the claimant ran themselves, with the previous rule also passing. Going live is typed by a human, always, and keys never touch disk, version control or an agent. And nothing non-default reaches the streamed colony without an explicit go-ahead.

A closing list records deprecations, including one that bans any studio claim made from process existence instead of the gates above.
