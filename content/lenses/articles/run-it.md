---
lens_schema: 1
scope: article
key: run-it
corpus: 
source_sha256: ca2481ee41d706ea
source_body_sha256: ca2481ee41d706ea
source_title: Run it
source_words: 1624
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

This is the reference page: every runnable entry point in the project, with the command that really
starts it, grouped by subsystem. Its most useful feature is that each section is marked with whether
you can actually run it — on an ordinary machine, partly, or not at all without the operator's
private infrastructure.

The entry points are discovered from the source automatically, so if something new appears and nobody
documents it, a check goes red naming it.

The page runs through the reasoning core, the colony, the broadcast director, the science control
plane, the operator surfaces, the motor laboratory, the maths workbench and the broadcast, giving the
commands for each and, more usefully, the reason the order matters.

It ends by collecting the boundary in one place: what a stranger can run, and what needs a private
repository, a specific machine, a private network, an unpublished dataset, paid keys and one named
person's typed confirmation. The page does not treat that boundary as an apology.

<!--CLEAR-->

This is the reference page rather than a narrative one: every runnable entry point in the estate,
with the command that really starts it. Entry points are discovered from the source repositories by
an automated check, so anything new that nobody documents turns that check red and names it.

Every section carries one of three markers, and the article insists they mean exactly what they say —
runnable on an ordinary machine with free software and no accounts; partly runnable, with some of it
needing something you may not have; or needing the operator's infrastructure, in which case you can
read it to understand the system but will not be able to execute it.

The tour begins with the inference core, which is fully offline and deterministic and includes an
unusual check that the agent's internal state is legible: a system whose beliefs cannot be inspected
cannot be falsified, and an unfalsifiable model is not a scientific object however well it performs.
Then the colony, where a single agent runs if you own the game and have the right platform version,
and where one option lets the same agent run blind or seen so that removing a sense can be tested —
an ablation that changes nothing tells you the sense was not being used. Then the broadcast director,
which runs, though the camera and overlays it drives need the studio.

Then the science control plane, whose gate runner is described as the single most useful command in
the estate for finding out what is actually true right now, and which lists the checks it cannot run
rather than dropping them, because a check quietly not run is indistinguishable from one that passes.

Then the operator surfaces, deliberately independent so that no single failure blinds the operator,
with a warning that one of them draws its plan from a hard-coded path elsewhere and renders an empty
plan rather than an error on any other machine. The last of its rooms is a checkpoint no check can
pass on the operator's behalf: two images side by side, and a person says whether they differ with no
text read.

Then the motor laboratory, with a standing instruction to run before verifying and never only the
second, because a verifier pointed at a stale artifact will happily confirm last week's result, and
with the honest note that the widest cross-study check and the observed experiment both need material
that is not redistributed. Then the maths workbench, which executes the committed model libraries
themselves rather than a second copy of the maths for display.

It ends by collecting the boundary in one place — what you can run and what you cannot — and says
that list is not an apology, because being told precisely where the wall is beats discovering it at
step nine.
