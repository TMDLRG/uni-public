---
lens_schema: 1
scope: wiki
key: minecraft/world-spec-ontology
corpus: minecraft
source_sha256: ac69673aa4e9f9e0
source_body_sha256: ac69673aa4e9f9e0
source_title: World Ontology and Dynamics
source_words: 571
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page describes the world the agents live in: how it is shaped, what is in it, how it changes each step, and how it can grow.

The world is a graph of regions, each a small grid of cells. Every region carries a vector of law parameters, so different regions can behave differently. Opening a seam produces a child region whose law has been mutated, which means a new regime rather than only new ground.

A table sets out five layers of discoverability, from what can be felt on contact up to the topology of seams, and names which organ perceives each. A layer emits nothing at all without its organ. The same shallow reading may have several hidden causes, which is what makes the deeper senses worth having.

The dynamics are listed step by step, including a deceptive organism that inflates an attractive reading while leaving something harmful behind. Hazards, conservation and their limits are all declared.

<!--CLEAR-->
This page is the specification of the world itself, and it moves from shape, through contents, to dynamics and growth.

The topology is a chunked, expandable graph of regions, each a small grid of cells. Regions connect either by ordinary adjacency fixed when the world is generated, or by seam edges created while running. Every region carries a vector of law parameters covering diffusion, reaction, thermal behaviour, strain, field decay, regeneration and more. Opening a seam mutates the parent's law to produce a new regime, and the page stresses that this means genuinely different behaviour rather than merely new coordinates.

A table then sets out five layers of discoverability, from what can be sensed on contact, through material composition, hidden causal structure such as cavities and strain, spectral fields, and finally the topology that governs expansion. Each layer names the organ that perceives it. Observability barriers are enforced in the body's sensing component: a layer emits a signal only if the organ is mature. The page adds the point that gives the design its shape, which is that the same shallow reading routinely has multiple hidden causes, so a high reading may be a real deposit or a deception masking reactive material below.

The resource economy defines several material classes with physical properties, and states that these are simulator metadata the learner never sees.

The dynamics section lists what one microstep applies, in order and deterministically: diffusion of the shallow fields with thermal relaxation toward a baseline; a reaction network that turns reactive material plus solvent or catalyst into hazard and heat; occasional discharges; an ecology in which grazers consume, decomposers convert, and mimics inflate an attractive reading while depositing reactive material; strain accruing under unsupported cavities until a collapse damages structures and leaves rubble; spectral relaxation with instability; and readiness for expansion relaxing toward an equilibrium driven mainly by built resonators. That last point is load-bearing, because the maximum reachable without those structures is stated to be below the threshold, which is what makes expansion a genuine late capability rather than something stumbled into.

A hazards list gathers the dangers in one place. Then conservation is declared carefully: diffusion conserves field mass exactly and transport conserves material mass exactly, both tested, while global material is explicitly not claimed conserved under reactions and collapse, which is documented as intended rather than a defect. Every field is clamped to a stated cap each step.

Two closing sections describe how local actions scale into global structural change, and how expansion works: a threshold must be reached, the child region is derived deterministically from the parent, its law is mutated, and a seam edge connects them. The page states that the map never finishes, and points at a separate report for evidence that this is reachable without being forced.
