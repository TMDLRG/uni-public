---
lens_schema: 1
scope: wiki
key: cookbook/recipes-l5-sensorimotor
corpus: cookbook
source_sha256: a5eccba95bc70272
source_body_sha256: a5eccba95bc70272
source_title: L5 — Sensorimotor / motor hierarchy (embodied action)
source_words: 1535
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This recipe is the rung where the simulated agent moves. The body senses its own configuration, a servo carries out goals handed down from above, and the sensory consequences of its own actions teach it how the world responds. It is a simulation of embodied action, never a person.

The one thing this page says is that a positive result and a negative result are carried together and mean different things. On a fast axis where reward arrives immediately, the active channel mattered. On a slow axis where reward is delayed and the body's own signals are squeezed through a narrow bottleneck, it did not. Both were sealed, both are reported, and the negative delimits the positive rather than being hidden by it.

The page is precise about what the positive allows. It is a synthetic protocol rather than a live appliance or recorded hardware, and it is not near-optimal control: the agent plateaus far below an oracle. That the active channel mattered at all is the entire permitted claim.

A further design has been signed off to run next. It has not been run, it raises nothing, and it does not erase the negative.
<!--CLEAR-->
This chapter is the mind-and-body rung. It builds a motor hierarchy on the same engine as every other rung: the body infers its own configuration, a continuous error-correcting servo fulfils goals projected down the hierarchy, and the sensory consequences of the agent's own movement train the model of how things change. The page opens by disclaiming the obvious reading — nothing here is a demonstration of the underlying theory, and the composed system is exact only at one narrow interface, never globally.

The first build step is the most interesting, because it is a fix for a genuine defect. A single uniform sensory channel for proprioception is not identifiable at all: the posterior simply sits at nothing. Installing a structured prior breaks that symmetry and the posterior moves, which is what lets the body infer its own configuration at all. From there the servo and the reafference are modelled on the same loop, with no new optimiser and no gradient methods, and the organ ships as an opt-in addition so the default colony stays byte-identical.

Two quite different gates are then run and the chapter refuses to blur them. One is a live mechanism gate on a real server, where a lineage bootstraps a crafting chain and the result is confirmed by the server rather than by the agent's own report, with a registered discriminator: remove the motor organ and the harvest must collapse. The other is a synthetic held-once protocol, where a bar is registered, the held set is sealed and touched once, and the verdict is read off the interval that excludes the threshold across several disjoint seeds. The chapter even flags a scoring trap in this protocol — a score that sums over time penalises survival, so a fast-dying control could masquerade as a negative unless survival and per-step scores are reported separately.

The results are symmetric and both are sealed. One design, on a fast immediate-reward axis, passed with its interval clear of no-difference. The other, on a slow delayed-reward axis with the body's signals compressed through a narrow bottleneck, held negative. The chapter says the shape of that pairing is the finding: the active channel mattered on one axis and did not matter on the other. It also counts carefully — this is the only sealed motor negative so far, so no formal negative bound is owed yet, since a bound requires several structurally distinct negatives.

A signed consultation design is folded in for what to run next, aimed at a positive rather than at farming further negatives. It changes several structural dimensions at once relative to the earlier designs — the coupling becomes a closed loop, the trigger becomes an error crossing a threshold, the bottleneck becomes a small local residual, and the control path becomes a shim producing continuous corrections. It specifies its bars, its discriminator of perturbed trials, and the ablations that must collapse the gain. It also spells out the conditions under which it would not even count toward a future bound. Its status is designed and not run: it raises nothing.

The closing fence carries the pass and the negative inseparably, and lists what is not claimed — not general motor intelligence, not human-like embodiment, not created life, not a demonstration of the theory. The live behavioural tallies are parked and still accruing rather than sealed.
