---
lens_schema: 1
scope: wiki
key: cookbook/recipes-l0-genome-zygote
corpus: cookbook
source_sha256: f5363793d302e101
source_body_sha256: f5363793d302e101
source_title: L0 — Molecular / genome → zygote (the conception prior)
source_words: 902
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This recipe is the smallest scale in the cookbook: the very first division of a single cell, modelled as an exact Bayesian update with no gradients. It is a simulation of conception, and the page repeats that it is never a person, never a baby, never life.

The one thing it says is that the result is real but its precision is bounded, and the bound is the point. The calculation runs on hardware using a coarser number format, so its anchors hold only to that level. A finer tier exists elsewhere in the project, and this page names it only to mark the line you must not cross when describing this rung.

The recipe reads like a recipe. It lists the ingredients it draws from the shared shelf, gives numbered build steps, states one exact pass condition, and names the observations that would sink it. It also records a negative inline: a comment in the code once claimed the finer precision tier for a result computed at the coarser one. That overclaim was caught and corrected, and the page treats the catch as the discipline working rather than as a failure to hide.
<!--CLEAR-->
This is the first rung of the cookbook's ladder and the smallest scale the engine is shown at. A genome is encoded as a starting expectation, and the zygote's first division is modelled as an exact conjugate Bayesian update in which the only learning is the addition of counts. The page frames it in its opening lines as a developmental simulation of conception — never a person, never a baby, never life — and returns to that framing at the end.

The ingredients are named from the shared pantry: a routine that recombines an inherited blueprint and seeds the starting tensors, the discrete engine that supplies the update, and a separate higher-precision path that is named here only as a boundary. Three method rules are called by name too — one engine with no gradient methods, honesty about numeric precision, and a strict separation between the world, the body and the mind.

The build steps are short and concrete. Encode the blueprint as a categorical starting expectation and use it to seed the initial tensors, keeping the split between model and process strict so the agent never reads the world's hidden state directly. Model the first division as the exact update rather than as an approximation. Hold a guard live across the whole step that scans for any gradient machinery and finds none. Run the ontogeny test suite and check the identity of the division. An optional control is offered. Compare the recombination against a scramble that preserves the same overall statistics, so that any surviving effect is attributable to inherited structure rather than to those statistics. Even then, a positive signal is treated as development-only rather than as a held result.

The pass condition is stated once, exactly: the suite green, the first-division posterior matching the closed-form value to the coarser precision tier, the identity check within its stated bound, and the guard never tripping. The list of results that would sink it mirrors that, item for item.

The most interesting part of the page is the limit it sets on precision, because the page makes it load-bearing rather than a footnote. The engine's host runs at the coarser numeric format, so anchors computed there hold only to that level; the finer tier lives only in the other path. A code comment once asserted the finer tier for a result computed at the coarser one. It was caught as an overclaim and corrected, and it is recorded inline as the reason this rung is labelled where it is.

The closing lines are unusually specific about what is not claimed here: not created life, not an aware infant, not exactness at the finer tier. The vocabulary of self-awareness is not even in scope at this rung, and the language of active inference is described as a framing lens at textbook level rather than as something shown.
