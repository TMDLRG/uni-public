---
lens_schema: 1
scope: wiki
key: encyclopedia/wing-s-s-l0-genome-zygote
corpus: encyclopedia
source_sha256: 35393423f63de040
source_body_sha256: 35393423f63de040
source_title: S-L0 - Molecular: genome to zygote (float32 tier)
source_words: 1140
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

This is the first rung of the program's developmental ladder, and its claim is deliberately narrow. The program models a zygote's first division as an exact discrete Bayesian update and checks the result against the closed-form value, at the precision tier its hardware actually supports and no higher. That is the whole claim. It is not a claim that anything was born, awakened or made. It is a toy world, a bounded peek at one well-understood piece of mathematics wired into a developmental scaffold. The chapter's load-bearing point is the precision tier: the core runs at single precision, so its anchors hold only to that tier, and a docstring that once claimed the tighter tier was caught as an overclaim and corrected. Never record a single-precision anchor at the tighter tier.

<!--CLEAR-->

The molecular rung of the developmental ladder implements a conception prior: the inherited blueprint that seeds the simulated organism before any development runs. Three primitives carry it. One combines two parental genomes. One instantiates the first cell's generative model from that genome. The third is a guard enforcing that the only learning rule anywhere in the loop is exact conjugate count addition, with automatic differentiation forbidden and caught by a static scan. The first cell division is then expressed as a conjugate posterior update and checked against the analytic value.

The control that travels with it is a marginal-preserving within-family scramble, deliberately not a pooled permutation, so the question of whether the genome carries signal beyond chance is asked honestly rather than against a strawman.

The recorded row sits at a stated evidence class, the machine-exact anchor, and the calibration on it is the heart of the chapter. The core runs at single precision, and a single-precision host cannot hold a value to the tighter tier, so the anchors are recorded at exactly the tier they reach and never higher. The genuine tighter tier exists only in a different numeric path. This is not a hypothetical caution: a docstring once claimed the tighter bound for this very path, was caught as an overclaim, and was corrected. That correction is carried as content.

The chapter is explicit that no capability was tested here against data set aside for it, and none is implied. An anchor shows the arithmetic matches a closed form; it does not show a capability, and the interpretation is limited accordingly.

Its not-claimed section rules out life, awareness or a mind, and rules out the tighter precision tier. What would show it wrong is operable. Run the ontogeny test and watch for a drop. Check whether the first-division posterior diverges beyond the stated tier, or check the identity embedding against its own looser bound. Or watch for the guard against gradient learning to trip. The chapter also notes the asymmetry the tier enforces, since a divergence that would break the tighter claim sits comfortably inside the budget this rung actually claims.
