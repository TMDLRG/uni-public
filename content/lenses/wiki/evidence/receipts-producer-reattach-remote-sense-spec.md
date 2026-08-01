---
lens_schema: 1
scope: wiki
key: evidence/receipts-producer-reattach-remote-sense-spec
corpus: evidence
source_sha256: 7dcbb4a6bc94a878
source_body_sha256: fac7fd567febf436
source_title: Proposal packet — Producer remote colony-sense + observe-only fence (option A′, 2026-07-15)
source_words: 1669
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A proposal packet, reviewed and signed with changes, for attaching a real show-runner to a live camera without touching the colony it films. Two claims in the draft were falsified during the review and are corrected in place, with the correction noted rather than hidden: what had been called a pure read would in fact have written to the other side, and a claim about the mind adapting to dead actuators was false, because that configuration does not learn. Nothing in the model changes; the fence applies after the decision.

<!--CLEAR-->
A proposal packet rather than a receipt. It describes work not yet done, carries the measured context it stands on, and records the review that signed it with changes.

The measured context comes first, with the time it was probed, including the state of the two components involved and one constraint that shapes everything: the image hosting the colony cannot host the camera at all.

The packet is then written in five declared elements. The maths object is none, which is the central claim: the model is untouched, and the change is confined to where the observations come from and to which chosen actions may reach the world. The intended effect and the no-go failure mode each get one sentence, which forces both to be sharp.

Two draft claims are corrected inline, with a note of who falsified them. What had been described as a pure read turns out to call something that writes when it finds nothing running, so it is retargeted at a genuinely read-only call with a timeout and a normalisation step. And a claim that the mind would adapt to dead actuators is false, because that configuration does not learn, so the honest description is a standing prediction error that cannot be learned away, instrumented with counters and a tripwire, and named as latent under current conditions rather than absent.

A binding paragraph forbids the tempting fix. No per-action cost, and no editing preferences to quiet the choices the fence blocks, because that would smuggle something into the model to hide a consequence; a separate variant would be lawful only through its own review. An honesty line records that two minds now sense the same colony while only one of them has hands.

The code touch-points are enumerated exactly, including one that exists only because the review found a gate would otherwise be unreachable, and one defence-in-depth refusal that leaves the default unchanged.

The test design is paired, with the control being the current measured state and the treatment one composite variable, because ownership physically cannot be shared. Collection is harness-managed rather than watched by a person, sampling on a fixed cadence into a timestamped file. The pass conditions are several and specific, including a definition of a discriminating event that rules out a camera merely orbiting, and a wide-shot fallback for when everything clusters too closely to tell apart. The falsifiers are listed, and separately an inconclusive category, so that a calm colony issuing no cuts does not become a masked failure.

A ship-gate checklist follows, mostly unticked, with the pre-registration required to be committed and pushed before any deployment. Then the reviewers' verdicts one by one, each with what it required, and the merged verdict with a count of consolidated changes. The merger's closing description is the one to read: a genuinely model-free change, additive, opt-in, byte-identical by default, with its one honest cost named and instrumented rather than papered over.
