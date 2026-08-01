---
lens_schema: 1
scope: wiki
key: minecraft/runbooks-operator
corpus: minecraft
source_sha256: 6bf40df79c514218
source_body_sha256: 6bf40df79c514218
source_title: Operator Runbook
source_words: 484
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is the day-to-day runbook for whoever is running the benchmark. It is mostly tables of commands.

The first table covers everyday tasks: compile, run the whole suite, produce a benchmark table, dump the validation evidence, regenerate a stored artifact, record a run, independently verify a recorded run, and start a viewing interface.

The rest fills in around that. How to inspect a single episode from an interactive session. Which surfaces exist for looking at what happened. And a clear distinction between the mode a learner is served in, where it receives nothing but numbers keyed by numbers, and a debug mode that raises immediately if anything unclean ever reaches it.

The most useful table is the failure one. It pairs each symptom with what it means and what to do, and several rows say the honest thing: this is expected on some seeds, and the runtime already handles it safely.

<!--CLEAR-->
This is the operator's runbook: the page you keep open while running the benchmark. It is built from tables rather than prose.

It opens with prerequisites, which are short because the core has no dependencies to fetch, and then gives a table of everyday commands: compiling, running the full quality suite, producing a table of reference results, dumping the validation evidence, regenerating the stored regression artifact, running a scenario, recording an evidence log for a run, independently verifying such a log with a command that exits non-zero on a violation, and starting a viewing interface.

A short section describes two ways of observing from outside. One is a live interface showing the whole world each tick together with a per-tick verdict on whether the boundary held. The other is the headless counterpart: a recorded log plus the command that re-derives the verdict from it. Recording is opt-in and does not affect determinism.

An inspection section shows, as a block of interactive commands, how to construct and run an episode and then look at its summary, its provenance, its per-tick trajectory, and aggregate counts of sensor use, actions, structures built and expansions.

A list of observability surfaces follows, covering the viability trajectory, the aggregated signal and action audit, the state of resources and regions, the provenance record, and export to a portable format.

The distinction between two modes is stated plainly. In the mode a learner is served in, agents receive only numbers keyed by numbers, and this is the default path. In debug mode a trap in the loop raises immediately if any observation reaching the learner is ever unclean, and the runbook says to use it in development rather than when serving. The functions that reveal meaning, and the debug lens, are described as engineering-only and must never be wired into a learner.

The most practically useful table pairs each failure symptom with its meaning and the action to take. Several rows do not treat the symptom as a defect at all: an early death is expected on harsh seeds, garbage actions are already ignored safely by the runtime, and attempts at actions a body cannot yet perform are informational during development. Others point at a real decision, such as reviewing a difference before regenerating a stored artifact.

It closes with two health checks: a green suite means the invariants hold, and the evidence dump should show reproducibility, leakage and conservation passing with difficulty inside its band.
