---
lens_schema: 1
scope: article
key: the-flagellar-motor
corpus: 
source_sha256: dd12ec3492059569
source_body_sha256: dd12ec3492059569
source_title: The flagellar motor laboratory
source_words: 1053
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

This page is about the one part of the project that studies something nobody here built. A real
bacterium swims using a tiny rotary motor, other people measured it, and this laboratory holds a
model up against those measurements to be told where it is wrong.

Its central idea is a boundary that is easy to state and easy to lose. A recorded measurement from a
published study, a step-by-step re-derivation from those measurements, the model running forward on
its own, and what an agent believes are four different things — and a re-derivation may never be
relabelled as a measurement. A second separation matters as much: behaviour measured in one organism
and structure measured in others must not be told as one story, because that implies a specimen that
never existed.

The page ends with a long list of what is not established, including that the full reproduction
cannot be run from published material alone, and that no verdict has yet been authored about a real
scientific claim.

<!--CLEAR-->

This article covers the laboratory built around a real bacterium's rotary motor, and it opens by
saying why this part is different. Everything else in the estate is a system the estate built; this
is not. The motor exists, other people measured it, and the laboratory's job is to hold a model up
against those measurements and be told, repeatedly, where it is wrong. In a simulated colony you can
define your way out of a disagreement; here you cannot, and most of the machinery described exists to
stop anyone trying.

It sketches the motor briefly: a rotary machine embedded in the cell envelope, driven by a proton
gradient rather than by the usual cellular fuel, whose stator units engage and disengage under load,
and whose change of rotation direction turns smooth swimming into a tumble. So the motor is not a
component in a behaviour; it is the behaviour.

The organising idea is a four-way separation — a source-pinned recorded measurement, a deterministic
re-derivation from those measurements, the model running forward alone, and what an agent believes. A
re-derivation may never be relabelled as a measurement, and that is a rule rather than a preference.
A second separation of the same kind is flagged as the one most likely to be quietly broken:
behavioural evidence from one organism and structural evidence from others are different organisms,
and combining them into one narrative implies a measured specimen that never existed.

The checks are aimed less at whether the model works and more at the ways a scientific result gets
accidentally faked — leakage between training and holdout, censoring and exclusion, sign errors,
provenance, conditioning, the boundary between world and agent, and the preservation of adverse
records. Several exist because a specific result was wrong in exactly that way. The one to understand
first is prospectivity: a prediction counts as prospective only if it was committed before the
observation it predicts, and anything else is a fit — a fit dressed as a prediction being the
commonest way an honest person publishes a wrong result.

Comparison across studies is described as the strongest available evidence and the easiest thing to
fake, since a parameter quietly retuned per study produces agreement everywhere and means nothing.
The defence is keeping calibration, training, holdout and prospective evidence separate, and having a
route that re-derives from the original archives rather than from the convenient cache.

The browser instrument executes the committed model libraries themselves rather than a
reimplementation for display, because a visualisation that reimplements the maths is a second model
that can silently disagree with the first. The released product is bound by a contract: no inference,
no graphics acceleration, no analytics, no accounts, no hidden network calls.

The closing section is deliberately long. The full reproduction cannot be run from published material
alone. Passing gates are not biological parity, and much of the validity domain is marked unobserved
or extrapolation-only rather than supported. Repeated time points are not independent biological
replicates. Two quantities that look alike in notation are never summed. And no verdict has yet been
authored about a real scientific claim, which the article says is a real gap rather than modesty.
