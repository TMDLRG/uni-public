---
lens_schema: 1
scope: wiki
key: minecraft/specs-collector
corpus: minecraft
source_sha256: 969608ae090e9530
source_body_sha256: 438f2aab5dd1a56e
source_title: Spec: Phase-2 RED Evidence Collector (ARTIFACT #2 — hardened, self-surviving)
source_words: 2270
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is a design for the thing that records evidence during a long experiment. It is design only: nothing is deployed, the source has not been edited, and the deploy steps wait on the owner.

It exists because of a specific failure. An earlier collector lived inside an assistant's session and died with it, silently, part-way through a run. So the design is redundancy: four independent collectors on different machines with different schedulers, each writing its own stream with its own identifier.

The clever part is what that redundancy buys. If one layer stops writing while the others continue, the gap is itself the signal that a collector died. A silent failure becomes an observable event.

Two channels are read every cycle in step: behaviour, taken from the game server's own authoritative counts, and mechanism, taken from probes inside the running program. The reads are stated to be read-only: the collector cannot change what it watches.

A binding fence opens the page: none of the values it logs is a felt state, and none of it carries weight for awareness or life.

<!--CLEAR-->
This is the design of an evidence collector for a long paired experiment. It states plainly that it is design only, that no source has been edited, that nothing is deployed, and that the deployment steps are written for the owner to approve.

It opens with the reason it exists. An earlier collector ran inside an assistant's session and died with it after about an hour and a half, without saying so. A longer experiment across many agents and many hours needs something that survives a session ending, a connection dropping, an assistant losing its context, a container restarting, or a whole machine failing. The owner's ruling is quoted: redundant independent collectors, so that a single death is itself a visible signal.

A claim fence comes before any design. What the collector measures is behaviour, taken from the game server's authoritative counters, and mechanism, taken from values inside the running model. Both are named as necessary-but-not-sufficient operational substrates carrying no evidential weight for awareness or life. No field is a felt state, and when internal factors exist their logged values are described as posteriors and preference products rather than hunger or comfort. Passing a gate shows the named behaviour, never experience, and only once that gate has its own registered verdict.

The design proper is four layers, each on a different host or scheduler, each surviving something the others do not, and each writing its own stream tagged with its own identifier. One runs as a timed unit on the colony machine, one as a container beside it, one on the control plane, and one on a remote machine on the mesh. The remote one additionally acts as a heartbeat of heartbeats, reading the others' heartbeats and emitting an event when one goes stale, so the death of an on-machine collector is recorded off it. All four sample on the same cadence anchored to wall-clock boundaries so their rows reconcile in a shared window, with one deliberately allowed to drift because it only needs to be independently alive rather than aligned.

Two read channels are written every cycle in step: one from the game server, which is authoritative for behaviour, and one from inside the running program, for mechanism. A section states the read-only guarantee.

The rest is schema and procedure: the exact shape of a data line, the shape of a heartbeat line which is written unconditionally, a rule for reconciling rows across collectors, a readiness checklist the collector must satisfy before an experiment can start, deployment and approval steps that are explicitly not to be run automatically, and an index of the files that make up the artifact.
