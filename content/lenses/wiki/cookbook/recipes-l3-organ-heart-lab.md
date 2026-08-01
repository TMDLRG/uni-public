---
lens_schema: 1
scope: wiki
key: cookbook/recipes-l3-organ-heart-lab
corpus: cookbook
source_sha256: 5f264a4f8c23d2a8
source_body_sha256: 5f264a4f8c23d2a8
source_title: L3 — Organ / Physiological Control (the Cardio-Renal Heart Lab)
source_words: 1160
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This recipe points the same engine at a heart. It takes a published cardio-renal model, reduces it to the loop that carries the work, and re-expresses that loop in the language of prediction, so that a heart attack reads as a failure of the prediction loop rather than as a separate kind of event. It runs in a browser. It is a simulation and a teaching bridge, and the page states repeatedly that it is not a clinical tool and not a diagnostic instrument.

The one thing this page says is that the fences are built into the artefact, not just written in the prose. The page itself must carry, as coded text, the statements that it is not clinical and not evidence that the underlying theory is right, and that any resemblance to clinical reality is an interpretive act rather than a measurement.

There is no new engine here. The lab is made by duplicating an existing one and swapping only the model of what is being observed. A parity test pins the version on the page to a canonical version, and that test fails the build, so drift cannot ship quietly.
<!--CLEAR-->
This chapter is the medical teaching bridge of the cookbook's ladder, and the whole point is that no new machinery appears. The same discrete engine used at the earlier rungs is pointed at a reduced version of a published cardio-renal model — the loop running from nerve activity to blood pressure to sodium and volume — and that loop is re-expressed as a prediction loop, so that maladaptive expectations, miscalibrated weighting, and a damaged underlying process become the vocabulary for physiological failure. Same mathematics, a different scale. It is a simulation, never a person and never a patient.

The build steps follow that discipline. Reduce the reference model to its load-bearing loop. Re-express it on the one engine by duplicating an existing browser lab and swapping only the observation model, keeping variable names identical so the downstream code is reused unchanged. Add a layer that clamps every state variable each tick so nothing runs away numerically, and that returns a named clinical regime rather than a raw clamped number. Write a parity test asserting that the engine inside the page and the canonical engine produce identical trajectories. Then wire the honesty fences into the page as coded copy rather than as prose the reader has to trust.

The pass condition has two parts and no point estimates: the lab's predictions must track the reference within a tolerance registered before scoring, and the parity tests must pass. The falsifier is the same two conditions inverted — divergence beyond tolerance, or a parity failure — and because the parity test fails the build, a silent drift cannot ship.

The recorded content in the negatives section is unusual and worth noticing. This rung carries no negative row of its own. What it records instead is a moment of discipline: during the build, an assistant declined to mark a criterion satisfied by pointing at a page, because the viewer belonged to a later piece of work, and it checked in rather than writing a verdict it could not support. The chapter then deliberately inherits the sibling cellular chapter's published losses as its own cross-scale model of falsification, on the grounds that the organ lab is built to the same standard of visible defeat.

The chapter also notes what is not here: no signed consultation design attaches to this rung, so nothing on it is lifted by work that has not been run.

The closing fence is the most emphatic part of the page. Not a clinical tool, not a diagnostic instrument. The reading of a heart attack as a broken prediction loop applies to the toy model, not to clinical reality. It is not a demonstration of the underlying theory, not comprehension, not awareness, not human-level ability. The preprint behind the mathematics stays fenced as unrefereed with expert review pending.
