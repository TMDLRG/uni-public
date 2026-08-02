---
lens_schema: 1
scope: wiki
key: minecraft/uni-in-emergence-world
corpus: minecraft
source_sha256: 4b356fc8ed2f34ae
source_body_sha256: 4b356fc8ed2f34ae
source_title: UNI in Emergence-World — Implementation Plan
source_words: 3662
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is an implementation plan, not a result. It proposes porting this project's agents into a locally rebuilt simulation of a world specified by another group, and writing down what would count as a match before running anything, so the bar cannot be moved afterwards, then comparing against that group's published outcomes.

The hypothesis is stated as a hypothesis. In the published season, no cohort of language-model agents grew its population; two collapsed entirely and two held steady. The plan predicts this project's agents will do better, by growing the population through a path the constitution allows but no published cohort took. It says plainly that a negative result is publishable, and that freezing the criteria in this document before the run is the discipline.

Because the other repository publishes specifications rather than an engine, the plan rebuilds the world locally, which it argues makes the experiment self-contained and reproducible.

The rest is a long numbered sequence, from cloning specifications through to publishing replayable records.

<!--CLEAR-->
This is an implementation plan with a pre-registration attached, its conditions written down before the run. It carries an attribution note explaining that the world it targets is specified by another project under a non-commercial licence, while the simulator here is an original rebuild.

The context section summarises a published experiment in which several parallel worlds were each populated with language-model agents for a fixed number of days under a shared constitution. The published population outcomes are given: two cohorts collapsed entirely, one lost members, and two held steady. The line that matters is that no cohort grew its population, because a governance gate on births was never crossed. The working hypothesis is stated as a hypothesis: that this project's agents will avoid the collapse and also exceed the holding baseline by growing the population through a mating-and-citizenship path the constitution allows but no published cohort took.

A practical observation follows. A read-only fetch showed the upstream repository publishes specifications and results but no engine. So the plan is a faithful local rebuild rather than a deployment onto someone else's system, which it argues makes the experiment self-contained, reproducible and free of a third-party runtime dependency.

The recommended approach keeps the existing decision core untouched and world-agnostic, and adds three new pieces. The first is a deterministic simulator of the grid, running turn-based under a real-time clock with decay, an economy and a voting threshold. The second is a bridge that replaces the process boundary with an in-process one, so the brain still only ever sees numbers keyed by numbers. The third watches for two co-located agents that have both signalled willingness, recombines their inherited material, and spawns a child whose first act is to propose its own citizenship. Vision is reused almost unchanged from the existing pipeline.

A long numbered sequence then covers the whole of it. It starts with cloning the specifications and consolidating them into a machine-readable dump, then the data layer, the simulator, and the translation of senses and actions into this world's vocabulary. Then governance, economy, the mating subsystem, vision plumbing, a camera re-point, and extensions to the verification harness. Then a sandbox pre-training run with a stated pass criterion, and the commit that writes the conditions down before the run. Then the production run, a mid-run safety net that halts the deployment automatically if any gate fails, the final analysis, and publication.

Two details stand out. The mating action is described carefully as a public co-located signal rather than a decision to mate, with the actual recombination happening elsewhere. And a child lives as an observer until its citizenship proposal passes, so its birth into the public world is itself part of the record.

The risks section is candid. The rebuild may diverge from the reference implementation, and the mitigation is that every constant traces to a published citation with a pre-registered acknowledgement that fidelity is only as published. Population growth could run away, so pruning and a cap are named alongside the vote itself as a brake. Vision capture has a memory cost with a fallback registered in advance. A silent semantic drift in the translation layer is named, with the sandbox pre-training as the mitigation. And confirmation bias is addressed directly: the hypothesis is pre-registered here, a negative result is publishable, and the discipline is that the criteria are frozen before the run.

The closing section defines what finished looks like as a sequence of commands that must be reproducible by a third party from a fresh checkout at a fixed seed.
