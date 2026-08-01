---
lens_schema: 1
scope: wiki
key: evidence/receipts-red-preregistration-motor-shuffle-live-ablation
corpus: evidence
source_sha256: 407665ebac21edea
source_body_sha256: 407665ebac21edea
source_title: RED pre-registration — motor-shuffle-live-ablation
source_words: 239
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page is a plan for a control experiment, written before it happened. Two earlier tests came out well, but on their own they leave a hole: something other than the part being studied could explain the result. The fix is a shuffled control, a twin that is identical except that the weights doing the work have been scrambled. If the scrambled twin does as well as the trained one, the page says in advance that the claim fails. No verdict is recorded here.

<!--CLEAR-->
A pre-registration, not a result. The verdict is withheld and the evidence is marked pending.

The motivation is a named gap. An offline test and a live mechanism test have both landed, but a design note had already flagged the step that was missing: a live ablation with a shuffled control. Without it, the live result could be explained by things other than the part under study, and the shuffle is what isolates it.

The protocol pairs two lineages from the same starting point. One keeps the trained weights, frozen. The other is the same genome with the working weights permuted at each step. They get the same seed, the same start and the same window of time in the world, and the outcome is counted through an independent channel that queries the world directly rather than trusting the system's own report of itself.

The verdict table is written in advance with three rungs: a clear ratio in favour of the trained twin, a smaller ratio that counts only as partial, and the trained twin failing to beat the shuffled one, which is a failure. Two closing rules require a default behaviour to stay byte-identical, and a review to agree, before the related code may change.
