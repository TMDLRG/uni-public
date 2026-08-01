---
lens_schema: 1
scope: wiki
key: minecraft/specs-sensorium
corpus: minecraft
source_sha256: 267678186317231e
source_body_sha256: 267678186317231e
source_title: Spec — Binocular true-signal vision, the perceptual layer
source_words: 1264
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is part two of a paired design: replacing hand-crafted vision categories with a full two-eyed pipeline that delivers true signals through an existing port. It is design only, and it runs only after the other half has a verdict.

The rule it works under is narrow. Only the likelihood is swapped; the categorical engine itself is untouched. Pixels and everything continuous stay on the far side of the boundary, and only discrete indices cross.

The most valuable passage is a self-criticism. Learning what a bin means is not the same as learning where the bin edges are. If the depth boundaries were designer thresholds, they would be the same forbidden hand-authored categories laundered through a learned likelihood. So the edges must be clustered without supervision, or the central honesty claim is unproven.

A further fix concerns an assumption in existing code that particular factors sit last, which the page shows is already untrue.

<!--CLEAR-->
This is part two of a paired design, read with a backbone document and its sibling. It is design-only, and it states that its experiment runs only after the other half has reached a verdict, because only one cure moves at a time.

The goal is to replace hand-crafted vision categories, which the project's own guidance forbids, with a full two-eyed pipeline delivering true signals through a port that already exists. The working rule is narrow and repeated: swap only the likelihood; the categorical engine is untouched.

The apparatus is described per eye as a chain of stages, each said to correspond to a real biological mechanism and to be arithmetic only, covering contrast gain control, fixation, aperture integration and an active rotation stage. One design choice is recorded honestly: a passive alternative was measured as negative and is kept switched off. A second section adds two eyes and places the fusion of their difference on the far side of the boundary where pixels legally live.

The brain then gains two discrete factors, one for what is seen and one for depth, with a third deferred to a later step. Here comes a load-bearing correction. Existing documentation notes that a factor of one particular shape with a flat likelihood is not identifiable, so its belief stays uniform and its counts smear. The earlier version of this specification declared both new factors that way. The consequence is spelled out precisely: an inert factor would make a key ablation refute the claim for the wrong reason, namely non-identifiability rather than the stereo signal being decorative. The fix is a weak seeded prior that only breaks the symmetry, plus an activation probe registered in advance requiring the likelihoods to leave uniform on held-out frames before any behavioural measurement.

A channels section requires the cardinality contract to raise an error rather than clamp, because the current code silently folds an out-of-range index onto the top bin and corrupts the counts with no error at all.

The central honesty fix follows, and it is the passage that gives the page its integrity. Learning the meaning of a bin by co-occurrence is not the same as learning where the bin edges lie. If the depth boundaries were fixed designer thresholds, they would be categorically identical to the forbidden hand-crafted categories, merely laundered through a learned likelihood. So the edges must be clustered without supervision from the statistics themselves, which is exactly why the other factor escapes the same criticism. An alternative is allowed only with a registered ablation showing the boundary placement does not carry the result. Until this is stated, the page says, the central honesty claim is unproven and the ablation tests the wrong object.

A seams section fixes a second latent defect: existing code takes the last few factors by position and asserts they are the final ones, an assumption the page shows is already untrue for one combination and would break with a third addition. The fix is to index by name, with a regression test.

The experiment is paired and deliberately un-bundled, because the treatment makes two changes at once, with an intermediate arm registered so each effect is separately attributable. An offline gate must be green with numbers pinned before any live start, since no stereo code exists yet. Every ablation is a registered number rather than a word like collapses.

The closing section restates what crosses the boundary and flags a higher-fidelity frontier that would break the covenant, with the instruction to flag it rather than build it.
