---
lens_schema: 1
scope: wiki
key: cookbook/recipes-l4-affect-as-precision
corpus: cookbook
source_sha256: 423455401097fcda
source_body_sha256: 423455401097fcda
source_title: L4 — Interoceptive / Autonomic + Affect-as-Precision
source_words: 926
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This recipe adds something like mood to the engine, and is careful about what that means. A small set of body signals is turned into a dial that controls how sharply the system reads its world and how it balances chasing a goal against gathering information. The page says it in italics and repeats it at the end: affect is modelled, never felt — a simulation, a toy world, never a person.

The dial is a modulator, not a reward. It does not add a new goal to the system. It changes how confidently the existing model is read and how the planner weighs its options, and nothing about the learning rule changes.

The test is built around removal. The claim counts only if the effect appears when the dial is live and disappears when it is taken away. That is registered in advance as what would sink it: if taking the dial out leaves perception equally sharp and planning unchanged, the claim is dead.

A boundary is recorded beside the result. One affect parameter produced no behavioural change on a particular kind of probe, and the page carries that inline to delimit the positive rather than inflate it. The closing lines are mostly a list of what is not claimed: no awareness, no mind, no feeling.
<!--CLEAR-->
This chapter builds a global affect modulator and treats it strictly as a dial over precision. A small vector of interoceptive and autonomic channels — things like energy, arousal, fatigue, pain, threat and safety — is coupled to the engine's control surface. There it sets how sharply observations are weighted, how sharply transitions are weighted, and how sharp the policy choice is. It also sets how strongly preferences pull, how strong habits are, how fast learning happens, and how far ahead the planner looks. The framing is stated at the top and never loosened: this is one rung of a developmental simulation, and affect is modelled, never felt.

The method has four steps, and the first is the conceptual one. The dial is wired as a modulator rather than as a reward. It changes how sharply the existing model is read, not what the system is trying to achieve. The learning rule stays the same count-based update, with the no-gradient guard live. The second step shows the sharpening effect — raise arousal or threat and the observation likelihood concentrates, so the posterior tightens around what is sensed. The third shows a flip: shifting the dial re-weights the planner's balance between goal-seeking and information-seeking, so the chosen kind of action changes as a function of affect on the same engine. The fourth step registers the discriminator in advance — remove the dial, and both effects must vanish.

The gate is that pairing, and the chapter is careful about its class. This is a development-gate result rather than a machine-exact anchor, and the page says explicitly not to label it higher. What would sink it is quoted from the row in the ledger itself, the append-only record of claims. If removing the modulator leaves precision-weighting unchanged and no flip appears under the grounded reader, or the effect collapses under a control, the claim is dead.

The recorded boundary is small but the chapter treats it as first-class. Varying one affect-personality parameter produced no behavioural change under a probe that offered only two sharply separated levels of surprise; exposing such an effect would need a graded task instead. The chapter draws the right conclusion from it: the dial demonstrably modulates precision and the planner's balance, but that does not license a claim that every affect parameter drives behaviour on every task. The negative delimits the positive.

The closing lines spend most of their space on what is not claimed. Feeling itself is disclaimed rather than tested, and the page notes that no test that could show it wrong is offered for it precisely because it is disclaimed. The modulator is a latent quantity inside a model, never an experience of the machine. Nothing here is awareness, a mind, a feeling, human-level ability, or a demonstration of the underlying theory. No signed design attaches to this rung, so it stands on its own single ledger row and nothing lifts it.
