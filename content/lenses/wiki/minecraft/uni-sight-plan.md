---
lens_schema: 1
scope: wiki
key: minecraft/uni-sight-plan
corpus: minecraft
source_sha256: bcddc7745a437f8e
source_body_sha256: bcddc7745a437f8e
source_title: UNI SIGHT — real pixels: per-UNI field-of-view + producer full-feed → UNI.OS visual world model
source_words: 867
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is a plan for letting agents see real pixels, with a status section added later saying what was built and what is still switched off.

The plan's central move is a separation. One system is symbolic by design, and its no-leakage claim requires that pixels never enter it. The other already ingests raw frames without any neural network. So pixels live in the second system, and if sight ever informs action, only one small discrete value crosses back.

Four phases follow, each with a stated way to show it false: capture real first-person frames, learn a world model from each stream, check whether the learned states track scenes, and optionally feed one discrete percept back.

The later status section records real work: a capture route found after a build failed, a latent collapse fixed, free energy dropping on real frames, and an audit for the absence of neural networks. Switching it on live is deliberately still pending.

<!--CLEAR-->
This document began as a plan and later gained a status section, so it reads as both. Its header says plainly that it was a plan, not yet implemented, with the build pending a go-ahead.

The context sets up a separation that the whole design rests on. One system is a tabular, symbolic engine whose input is a deliberate proxy, and whose no-leakage and no-foreign-layer claims require that pixels never enter it, since its categorical machinery cannot ingest a frame at all. The other system already takes raw frames in a way that uses no neural network, converting a frame into discrete patch codes and learning over them with exact inference, so that free energy can be read as evidence. The plan's conclusion is that pixels belong in the second system.

Four phases follow, and each names how it could be shown false. The first captures real first-person views per body at low resolution and frame rate, outside the lockstep of the symbolic senses, plus a full-frame feed from the camera; the refuting check is simply dumping the images and comparing. The second builds a real-time bridge so each stream trains its own world model online, with the refuting check being that free energy must drop and that regeneration of unseen frames must improve. The third asks whether the learned hidden states cluster into recognisable scenes, checked by correlating states with context and by beating a trivial baseline at prediction. The fourth is optional and deliberately covenant-safe: reduce a visual belief to one small discrete value and add it as an ordinary channel, so actions can be informed by sight without any pixel crossing.

A risks section is candid. This is research-grade and heavy, since real-time vision per agent means many renderers and many models learning at frame rate; understanding the world is called a direction rather than a destination. A specific technical feasibility question is flagged, and so is the awkwardness of three runtimes in one loop. It repeats that the covenant is not broken because the vision stays outside and only a discrete value would cross.

A recommended first step is a de-risking spike: show one body's view rendering to real frames and one model's free energy dropping on them.

The status section added later records what was built. A capture route was chosen after a native component had no build available for the current runtime, and real renders were captured. The visual side gained a real-time service with a warm start and online refinement, and a latent collapse was found and fixed where a symmetric start made every state identical and therefore useless; an asymmetric start now yields states that discriminate day from night. Free energy drops on real frames and held-out material generalises, and an audit checks the absence of neural networks. A bridge and a per-body view were built, and an opt-in factor lets the categorical side ingest the discrete scene value while default agents stay unchanged. The covenant is described as extended rather than weakened.

The last paragraph is the honest one: switching this on live is still pending and deliberate, and vision-primary agents would be a fresh lineage distinct from the saved ones.
