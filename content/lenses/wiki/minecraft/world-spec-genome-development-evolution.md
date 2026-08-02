---
lens_schema: 1
scope: wiki
key: minecraft/world-spec-genome-development-evolution
corpus: minecraft
source_sha256: 3a049b5e5baa6652
source_body_sha256: 3a049b5e5baa6652
source_title: Genome, Development, and Evolution
source_words: 359
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page describes how a body is inherited, how it grows, and how it changes across generations.

A genome here is deliberately not a rulebook about the world. It is a prior structure that shapes how a body develops: a growth plan naming which organs it will attempt to grow and in what order, how quickly they ripen, and a bias about metabolism, plus bookkeeping about ancestry.

Growth is not free. It spends a budget that accrues only from surplus energy, and each mature organ adds ongoing upkeep, so a body must forage well enough to fund its own complexity. Because growth goes through a function that checks prerequisites and attachment, development cannot produce an impossible body.

Selection happens through the world rather than through a score. No fitness number is ever handed to the agent.

The last section describes the longer timescale, where lineages branch, survivors are selected by how they fared, and the next generation is seeded.

<!--CLEAR-->
This page covers the hereditary layer of the design: what a genome is here, how a body develops from one, what limits that development, and how change happens across generations.

The genome is defined by what it is not. It is a prior structure that parameterises the growth of a body, and explicitly not a symbolic rulebook about the world, which is named as a hard constraint. Its fields are few: an ordered list of organs the body will attempt to grow, a rate at which organs ripen, a metabolic bias, and bookkeeping for lineage, generation and parents.

Development consumes a growth budget that accrues only from surplus energy. On each developmental tick two things happen. Immature organs ripen a little at a small cost. And if the budget allows, the next organ in the plan whose prerequisites are already mature is grown and attached to its deepest prerequisite part. The developmental stage is derived from the deepest tier of organ present rather than tracked separately. Because growth goes through a function that checks prerequisites and parentage, the page states that development can never produce an impossible body graph, and names the invariant and the property test behind it.

A short section makes the economics explicit. Each mature organ adds upkeep, so morphology is never free and a body must forage well enough to fund its own complexity. Selection happens through the world itself: viability is an envelope, a preferred-state prior and a risk term, evaluated only by the evaluation harness. No fitness number is ever handed to the agent.

The genetic operators are then described: point changes to the plan with parameter jitter, one-point crossover with averaged parameters, and a repair operation that makes any genome developable. Every operator repairs its output, and property tests over many random genomes assert validity.

The last section covers the longer timescale across episodes: lineages branch, survivors are selected by how they fared in the world, and the next generation's genomes are seeded. The page is candid that the single-episode core already exercises development end to end, while the cross-episode controller is a thin loop over existing pieces.
