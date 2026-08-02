---
lens_schema: 1
scope: wiki
key: minecraft/specs-metabolism
corpus: minecraft
source_sha256: f0804905d7c1197a
source_body_sha256: 2a7c482ea81eae93
source_title: Typed model spec — the `:metabolism` interoceptive organ (Phase 2)
source_words: 4245
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is a typed design specification for one internal organ, written to close a list of blocking changes that an adversarial review had raised. It is a design: no engine code is written and nothing is deployed.

It corrects an earlier brief in its first paragraphs. An assumption that a stronger prior would be seeded automatically is described as falsified, because one step in the code normalises before adding, wiping the magnitude. The specification adds a seam applied after that step instead.

Nine numbered sections follow the template every organ inherits, covering the states, the channels, the actions, the preferences, the policy, the learning, the precision, the anchors, and the limit on what may be claimed.

The last section is the important one. A live paired run of about two weeks returned a split verdict: one gate failed outright, and the wider hypothesis is withheld rather than refuted, because the arms could not be told apart and the organ's activation was never checked.

<!--CLEAR-->
This is a typed design specification for one interoceptive organ. Its status line records a re-verification verdict of design-complete, meaning a list of blocking changes from an adversarial review was closed at the design level. It repeats that it is a design: a typed model difference, a registered paired experiment and concrete seam specifications, with no engine code written and nothing deployed. Items that can only be discharged by a later code pass are marked as such.

It inherits the nine-section template from a sibling specification, and immediately corrects an earlier ground brief. The naive assumption that a strong prior would be seeded automatically is called falsified, because one function normalises the columns before another adds one, so any pre-scaled magnitude is wiped. The fix is a typed seam applied after normalisation, and it is described later in the same document.

A binding claim fence — the limit on what may be said — is reproduced verbatim before the design. Then the nine sections run in order. The state space adds two self-sensing factors. The observation channels include a section on the live viability edge, which is what makes the internal store connect to real consequences. The action space is small. The preference model has three parts. There is a peaked shape that is deliberately not monotone. There is a whitelist controlling how fullness attenuates preference, which explicitly excludes several channels, so that being sated cannot become a route to self-neglect. And there is a cap that reconciles a possible double count. The policy set is unchanged. The learning section carries the seam that fixes the seeding problem, a per-channel switch controlling which transitions may be learned, and a note on the likelihood. The precision schedule is unchanged. The anchors enumerate the checks, and the fence closes the sequence.

Further sections cover the additive and gated plumbing that keeps the default configuration byte-identical, and the registered paired experiment with its conditions written as numbers in advance and its refuting conditions mapped to a numbered list. A derivation section records one result as robust and another as tuned rather than derived, which is a distinction worth noticing. A residual list names what only a code pass can discharge, followed by a ship gate and the re-verification verdict.

The final section is the one to read. A live paired run of roughly two weeks returned a split verdict. The plateau-break gate failed outright: the treatment did not exceed the control on the metric registered in advance, and no agent in either arm reached the target. The underlying hypothesis is recorded as withheld rather than refuted, for two stated reasons. The arms were statistically indistinguishable at that sample size, with a difference interval straddling zero, so a claim that the treatment did worse is not supported. And the organ's activation was never checked, because one refuting gate was never passed and the run produced no recorded evidence for the relevant belief.

The correction that follows is explicit. Two earlier readings are struck. The organ-free control froze in the same way, which points at a shared ceiling in the world rather than an organ effect. And a coupling was switched off in both arms, so this run cannot adjudicate it at all. One favourable-looking number is identified as a single agent's noise, reported and rejected. The page states exactly what the run does license and what it does not, and instructs that the registered numbers not be edited, only annotated.
