---
lens_schema: 1
scope: wiki
key: minecraft/observability-collector-rcon-brief
corpus: minecraft
source_sha256: 096be14351e3f644
source_body_sha256: e670c31944298260
source_title: Ground-Collector Brief — RCON + BEAM-probe read paths for the paired curiosity RED
source_words: 2635
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This brief specifies how evidence will be gathered for a paired experiment, and it is careful to say what it does not do: it changes no code, deploys nothing, and makes no verdict of its own. It specifies how to gather the receipts an argument will later be made from.

Two arms are polled in step on a fixed cadence. One arm has the thing under test switched on, the other has it off, and the bodies are otherwise identical.

Two read surfaces are documented. One is the game server's own remote console, which is authoritative for behaviour and independent of anything the agent says about itself. The other reaches into the running program for mechanism. The brief explains why the independence of the first matters.

Most of the page is exactness: which port is which and why they must not be confused, what to register once before the first reading, what to read each time, and what to do when a read fails.

<!--CLEAR-->
An operations and design brief for the collector that will gather evidence during a paired experiment. Its scope paragraph is precise about what it is not: it changes no source, deploys nothing, and asserts nothing about the verdict. It documents how to gather the receipts the verdict will later be argued from.

The two arms are named at the top. One carries the thing under test switched on; the other is the standard configuration with it off, described as a byte-identical body with the drive disabled. The naming convention for the individual agents is given so rows can be matched later.

A binding claim fence follows. Everything logged is an operational behavioural or organisational measure, named item by item, and all of it is necessary but not sufficient with no evidential weight for awareness or life. A passed gate shows the named behaviour and never experience. No field in the log is a felt state, and the mechanism values are called telemetry rather than sensation, with an instruction not to narrate them otherwise in anything built from this log.

The next section is a table of every connection parameter with the file and line it comes from, which is what makes the brief reproducible rather than merely descriptive. A note that follows is the one most likely to save someone a wasted afternoon: game traffic and the remote console live on different ports, and the brief states plainly which is which, which components use each, and not to point the collector at the wrong one. It also explains how to reach the console from outside the container network, and says to confirm the mapping before the first reading.

A further note records that the running image is headless, so only one other process holds a console connection and only for a light periodic reading, and that the collector opens its own independent connection so it never contends with or perturbs that one.

The behavioural section documents the client surface function by function, argues why this channel is the independent one, and then splits into two parts: what to register once at the start, before any reading, and what to read on every poll. The registration covers placed and used blocks, mined blocks and crafted items. The per-poll reading covers those counters, which agents are actually present so that an absence can be logged as offline rather than inferred as death, and a cross-check of inventory against what the agent reports about itself.

The mechanism section documents how to attach to the running program, how to look up an individual agent, and which internal values to log, with optional deeper readings listed separately if they are cheap.

The cadence section explains how the schedule is managed outside any assistant session so it survives interruption, and a schema section gives the exact shape of one record per agent per poll.

The final section is operating notes and traps, each cited: the port confusion again, a server setting that must already be in place or agents will drop, a warning that a block identifier must match the species actually present or a counter silently stays at zero, an assumption about one command being non-destructive that must be confirmed once before being trusted in a loop, and an instruction to reconnect rather than crash, writing a gap row so the cadence is preserved.
