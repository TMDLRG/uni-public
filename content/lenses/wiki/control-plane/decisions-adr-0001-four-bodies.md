---
lens_schema: 1
scope: wiki
key: control-plane/decisions-adr-0001-four-bodies
corpus: control-plane
source_sha256: a612f3e645d8b8e6
source_body_sha256: a612f3e645d8b8e6
source_title: ADR-0001 — Four bodies, none collapsible into another
source_words: 498
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

One choice, dated and signed, with the reasoning and the condition that would show it wrong. That is the whole shape of the page.

The choice: the platform is built as four separate parts, and none may be folded into another. One handles admission and release. One runs the science, and it alone may author a verdict. One reports signals with their provenance and may not act at all. One shows and carries things, and may not invent them.

The record does not claim this is the tidiest shape. Four parts mean more services to run and more contracts between them. A reader expecting a single app has to learn the separation first. Simpler shapes are listed and turned down, among them two earlier drafts of this design that merged parts — one rejected after days of work had to be undone.

The falsifier closes it. If a part is ever found doing another part's job, the decision has been violated and the change is rejected, however well it works.

<!--CLEAR-->

A decision record is a short, dated note that fixes one architectural choice, gives the reasoning, and states the condition under which it should be considered broken. This one is marked accepted, and it names the people who decided.

The context is that the platform already had several always-on surfaces, while the steps that make evidence — registering a gate, running paired trials, observing, adversarial review, authoring a verdict, writing a receipt — belonged to none of them and were being done by hand.

The decision is that there are four bodies, each with its own address, its own law and its own lifecycle. Admission, release and keys belong to one. Running the science belongs to another, and that one alone may author a verdict. Reporting signals belongs to a third, which may not act on what it reports — that is exactly why the record treats it as a credible witness. Showing and carrying belongs to a fourth, which may neither act nor author.

The consequences are given in both directions. In favour: each part has a single reason to change, and a hard-won rule from an earlier surface — that a polled read never spawns anything, learned from two recorded incidents — is inherited rather than re-derived. Against: four services to run, supervise and prove, and more contracts between them. Neutrally, the lab view is a container inside one of the four bodies, not a fifth body.

Three simpler shapes were considered and rejected. One surface doing everything would force the witness to act, which its own fences forbid. Folding the science into the admission body would put experiments behind a door verb. Folding it into the display body was rejected and had already been attempted: a display whose law is never to fabricate cannot also be the source of what it displays, because then nothing is left to check it against.

The falsifier closes the page. If any body is found doing another body's job, this decision has been violated, regardless of how well the arrangement works.
