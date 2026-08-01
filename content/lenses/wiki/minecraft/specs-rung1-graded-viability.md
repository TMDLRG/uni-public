---
lens_schema: 1
scope: wiki
key: minecraft/specs-rung1-graded-viability
corpus: minecraft
source_sha256: 008a4f339ca421c3
source_body_sha256: 008a4f339ca421c3
source_title: Rung-1 typed spec — graded per-subsystem viability + work/fatigue (cures 1+2+3)
source_words: 1728
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is the first buildable step of a larger depth design: graded per-subsystem viability plus work and fatigue, all behind one opt-in organ so the default configuration is unchanged.

It is motivated by a measured death. A flat preference shape died in half its worlds because it gave no reason to hold a reserve. The fix is a preference whose most preferred point is an interior buffer rather than the ceiling, so refilling pressure returns as soon as belief slips, while stuffing past that point is slightly less attractive.

Four internal factors are named with their transitions, their body stores and their coupling to the world. A fatigue factor lowers the gain of the movement loop, so a tired limb aims worse.

The paired test is decomposed into ablation arms so any win is attributable to a named coupling, and each factor has a severed-limb refuter: cut its link to the world and it must measurably differ. The live run is pending the owner.

<!--CLEAR-->
This is the first buildable step of a larger depth design, and the owner chose the deepest rung first. It is design and offline work only; the live paired experiment needs the owner's go-ahead. Everything sits behind one opt-in organ absent from the default configuration, so the default stays byte-identical, and one prerequisite blocker is recorded as already done.

The state space is four graded factors over a six-step gradient from critical to surplus, each seeded so it can sense itself. A table names each factor, its subsystem, how its transitions empty or fill, which body store it reads, and how it couples to the world. One factor runs the same gradient but reads in the opposite sense, from fresh to spent, and the page says so rather than leaving it implicit.

The preference model is the fix. Its shape has a positive gradient up to a high bin and then dips slightly, so the most preferred point is an interior buffer rather than the ceiling. The document is explicit about what it is not: not a monotone ramp, because that is the eat-to-full foil and would be reward smuggled in; and not the flat setpoint, because that is the measured death. It also states that anticipation comes free from the existing deep rollout rather than needing a new term.

The seams are named one by one: how preference routing is generalised from a hardcoded pair to a name-to-shape map, how the body gains per-subsystem stores advanced by elapsed time with attribution to whichever subsystem acted, how digestion transfers between two stores, how fatigue lowers the gain of the movement loop so a tired limb aims worse, and how fatigue runs on a faster clock than energy, which is the first split between factors. One line recurs: every cost enters through a transition and a felt observation, never through the policy score.

A list of invariant anchors follows, each a test that rejects on failure and each run before any live deployment. They cover identical behaviour when switched off, a clone test extended with a new history-invariance test requiring that permuting past actions changes nothing, the no-scalar-per-action rule, decay of information terms, no compounding of transient values, and three named things not to do.

The paired experiment is registered in advance and deliberately decomposed, with ablation arms so that a bundled win stays attributable to a named coupling. Its conditions require survival above a bar, an earlier onset of eating, satiation at both ends so the agent fights harder when scarce and stops when rich, beating both the baseline and the foil, measurable decoupling between two subsystems so the second factor is not merely renaming bins, and a pacing relationship that disappears when the coupling is ablated. Each factor also carries a severed-limb refuter: a twin whose link to the world is cut must measurably differ, and if it does not, that factor is a preference hack with no limb.

A claim fence states that every one of these values is a model variable and never a felt state, and that a tired arm is a proxy and must never be narrated as felt.

A build order and then a revision section follow. The revision records a five-persona review, the pinned control shapes with their argmax and their role, the gated fields that make the arms possible while leaving the default unchanged, the arm builders each flipping exactly one coupling, the anchors that hold them to that, and a ship-gate checklist. The last three items are unticked and named as the live prerequisites awaiting the owner.
