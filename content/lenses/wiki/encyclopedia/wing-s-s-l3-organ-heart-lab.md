---
lens_schema: 1
scope: wiki
key: encyclopedia/wing-s-s-l3-organ-heart-lab
corpus: encyclopedia
source_sha256: d6d16d96c741a549
source_body_sha256: d5fea9da49e9dca2
source_title: S-L3 - Organ: the Karaaslan Heart Lab
source_words: 1517
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 2026-08-24 the PUBLISHED bytes moved, not the document. A project-key redaction that the operator ruled on 2026-08-04 was enforced only at the gate and never scrubbed, so the keys had been shipping; they are now replaced with a marker. The source digest is unchanged and the prose names no key, so only the published-body digest is re-stamped.
---
<!--PLAIN-->

A published cardio-renal model from the physiology literature is re-read here in the vocabulary of prediction and inference, and it runs in a browser as a teaching simulation. This is not a clinical tool, it is not a diagnostic instrument, and nothing it displays should be treated as medical fact. What the chapter does claim is small and engineering-shaped: one reference model faithfully re-expressed, pinned by a parity test, and graded through the program's evidence discipline. Homeostasis is described as prediction error being driven down, and a heart attack as the prediction loop failing. That description belongs to the toy model and does not carry over to a real patient. The chapter's own phrase for the likeness is that it is an interpretive act rather than a measurement.

<!--CLEAR-->

The lab is one of a family of self-contained interactive pages that each run the same machinery in a different domain, and the family exists to teach one thesis: same math, many scales. This one is the physiological face of it, and it is a teaching simulation — a toy world, not a patient and not a person.

Its scientific basis is a published long-term cardio-renal model, a reduced loop in which sympathetic nerve activity drives mean arterial pressure, coupled to sodium and fluid-volume regulation. The lab re-expresses that loop in inference language. The underlying reference mathematics is reproduced; the program's own private mathematics is not. Architecturally it follows the family's spine, with an inline engine on the page, a single master copy of the same model held separately, and a parity test pinning the two so the page and the real model cannot drift. A seeded generator and committed result artifacts make any displayed result reproducible from its seed.

The single row in the ledger, a record added to and never edited, is graded at two classes at once: a gated lab artifact, plus a test-covered engine ticket recorded with a full passing suite. The chapter is careful about what that ticket earned. It added bounds and a safe state to the engine, clamping the state variables every tick and returning a labelled clinical regime instead of a raw clamp or an undefined value. That is an engine-stability and labelling result, not a clinical check. A companion viewer was built as a later ticket, and the program's own discipline refused to mark a viewer criterion satisfied before that ticket existed, rather than fabricating a verdict.

Because there is no separate negative row, the travelling negative is the limit on interpretation itself, and it is coded into the artifacts rather than left in the prose. Interpretive claims are tagged as hypotheses, the resemblance is called an interpretive act rather than a measurement, and the disclaimers list what the lab is not.

What would show it wrong is deliberately about fidelity and nothing else. Run the committed seed through both engines and check that the parity test holds them in agreement, or watch the engine suite for a drop. Nothing at all is offered that could overturn a clinical claim, because no clinical claim is made.
