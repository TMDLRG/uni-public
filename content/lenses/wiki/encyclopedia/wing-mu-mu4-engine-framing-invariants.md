---
lens_schema: 1
scope: wiki
key: encyclopedia/wing-mu-mu4-engine-framing-invariants
corpus: encyclopedia
source_sha256: 57f213c688899263
source_body_sha256: 57f213c688899263
source_title: mu4 - Engine and framing invariants (one engine, no backprop)
source_words: 2088
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

Nothing in this chapter is a win; everything in it is a discipline. It records the structural rules that keep the program's results legible and falsifiable, and the thing those rules fence is a developmental active-inference simulation, a bounded peek inside a toy world and never a person. The rules run like this. One discrete engine, reused across scales. A learning rule that is exact count addition and nothing else. A machine-enforced guard against gradient descent slipping into the loop. A three-layer framing with a strict split between a model and the process it couples to. A textbook statement of variational free energy, carrying one correction a human reviewer forced. A rule against counting a prior twice. And precision accounting that keeps a lower-precision anchor from being dressed up as a higher-precision result. The single framing fact the chapter exists to fence is that the composed appliance is variationally controlled, exact only at one single-step interface, and is not globally exact.

<!--CLEAR-->

There is one engine. A single module exposes the discrete loop, and every agent in the program is a thin wrapper owning only a generative model and coupling to a world process through a typed boundary. The engine is not re-implemented per experiment, and the only learning rule is exact conjugate count addition, with no gradient anywhere in the loop.

The model and process split is treated as sacred: an agent reads the world only through its typed sensory channel and acts only through its typed active channel, never reading raw hidden host state. That is enforced two ways at once, by a runtime assertion and by a static scan using an allowlist rather than a blocklist, so the failure mode is deny-by-default rather than having forgotten to ban something.

The most aggressive guard is the static scan against gradient descent, which runs in continuous integration. The chapter is precise about what it buys and what it does not: the guard shows an absence, not a presence. There is no inference loop in the compiled crate, and the live system's loop is a separate reimplementation that is not matched to the gates the science earned, so the engine being real and gradient-free is engineering evidence and never a result.

The framing section names three layers separated by two typed boundaries, with interoception as hardware self-signals and exteroception as system observations, and carries the chapter's load-bearing fence: exactness is a property of one interface, not of the assembled system, and writing that the whole is globally exact where only that interface is exact is exactly the calibration-up the constitution refuses.

Two further rows are corrections rather than achievements. One sharpens what minimising variational free energy does, since it tightens an upper bound rather than reducing already-observed surprise, and its provenance is a reviewer who would not sign the first draft. The other divides an upstream prior out rather than counting it twice, and records that a cheaper factored approximation was implemented, measured as lossy, and rejected.

The final row pins the word exact to a tier, and records a docstring that once claimed the tighter tier for a lower-precision path and was corrected.
