---
lens_schema: 1
scope: wiki
key: minecraft/specs-curriculum-removal
corpus: minecraft
source_sha256: 8a5a5567c248625b
source_body_sha256: 8a5a5567c248625b
source_title: Spec — Survival-C (curriculum removal), the deepest/slowest layer
source_words: 1037
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is a design specification for removing a taught curriculum from an agent, so that what it does comes only from staying viable rather than from a goal handed to it. It is design only, and it opens by calling the idea a hypothesis to test rather than something to assume.

The interesting parts are the corrections. An earlier claim about the shape of a preference is described as wrong, and the true shape is given: a single peak at a comfortable level, with being over-supplied mildly less preferred than being comfortable, so there is no standing pull toward more.

The removal is done by provenance rather than by name. Preferences that come from staying viable are kept; hand-authored spatial and task preferences are dropped, on the grounds that an agent still carrying those is not curriculum-free.

One prerequisite is binding: without a real emptying-and-filling internal state, the whole test would be decided before it ran.

<!--CLEAR-->
This is part one of a paired design, read alongside a backbone document and its sibling. It is design-only, with a ship gate of formal review plus the owner's go-ahead, and it carries corrections folded in from a review.

The hypothesis is stated as something to test rather than assume: with preference grounded only in viability, a real death edge, and a natural drive to find things out, an agent keeps its body viable and acts without any curriculum or goal-setting. An earlier stage is cited as having shown the curriculum was a confound, so removing it lets the question be asked cleanly. The page calls this an open question.

No new factors are added. The change is to the preferences on existing factors, and here the document corrects itself. An earlier description of the preference shape is called wrong, and the true shape is given: a single peak at a comfortable level, a steep penalty toward depletion, and a neutral value when over-supplied. Because being over-supplied is slightly less preferred than being comfortable, there is no monotone pull toward more, so the only standing gradient is away from depletion. The refuting condition is restated against that true shape: if any preference is monotone increasing in more, it is a preference hack and is struck.

The replacement preference table is phase-independent, returning viability values at all times and neutral values for every task-related channel. One existing attenuation is deliberately kept, because it acts only on the appetitive side and never touches the depletion penalty, which the document names as a backdoor it is avoiding. A further extension is deferred honestly, with a note that a precision term must stay global and must never become a selective gain on the positive side of a preference, because that would be reward in disguise.

The removal itself is done by provenance rather than by name, which is the passage worth reading. Two channels carry task preference. The first is the obvious curriculum weighting, neutralised. The second is a runtime configuration that injects absolute overrides and is described as easy to miss. Preferences traceable to viability are kept; hand-authored spatial and task preferences are dropped, with examples named, and the reason is given in one line: an agent that still carries build and avoidance preferences is not curriculum-free.

A seams section covers how the change is gated behind an inheritable field defaulting to the existing behaviour, and how that field is back-filled and read defensively so existing lineages keep their sequence. One prerequisite is binding: the treatment must carry the organ that provides a real emptying and filling internal state, because without it the arrangement would be preference with no dynamics, and the refuting branch would be decided before the run rather than earned.

The experiment is paired, with arms differing in exactly one field, everything else pinned and asserted by a probe. The replication unit is a distinct world seed. A numeric activation gate comes first, and missing it produces a withheld result. A reference controller pins reachability. Success is defined as non-inferiority plus activation rather than as an improvement, and one broader measure is named as secondary and expected to fail, with a warning against spinning it either way. The refuting condition is that the agent goes inert while the control sustains, which would mean the curriculum was load-bearing.

A final list names the code the change would touch, gated and additive, only after a formal verdict.
