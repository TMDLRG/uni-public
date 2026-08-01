---
lens_schema: 1
scope: wiki
key: minecraft/specs-generative-model
corpus: minecraft
source_sha256: 691733832da90c0f
source_body_sha256: 691733832da90c0f
source_title: Generative model + invariants + RED discipline — the A4 backbone
source_words: 937
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page is the shared backbone two other design documents sit on. It is design only: nothing here ships without a formal review verdict and the owner's go-ahead.

Its first section is a warning against itself. A tidy developmental ladder is described as the design intuition that orders the work, and then labelled as aspirational rather than current code, with two specific pieces named as not implemented and one named as not wired into the live path. The binding consequence is that neither planned experiment may depend on them.

The rest sets out what is actually live, part by part, and then states an invariant precisely because an earlier version of it was wrong. The old wording said preferences never enter the policy. That was false and self-undermining, so the page replaces it with three narrower claims that hold.

A final section fixes the experimental discipline, including that agents sharing one world are not independent replicates.

<!--CLEAR-->
This document is the shared substrate for two organ designs that are specified elsewhere. It is design-only, and its ship gate is a formal review verdict plus the owner's go-ahead before any code.

Its opening section is unusual and is the reason to read it. A developmental ladder, from the inherited base up through viability, metabolism, affect and perception, is described as the design intuition that orders the work. It is then explicitly labelled aspirational rather than current code, with an instruction not to cite it as implemented. Two specific items are named: per-factor timescales are not implemented, because the relevant code uses global constants, and a deeper hierarchy is not live, because its own source states verbatim that it is not wired into the live decision path. The binding consequence is stated: neither planned experiment may depend on either, they currently do not, and a real substrate for them would be a separate later step with its own specification and test.

The next section states what is live: a mean-field, multi-factor, categorical arrangement in which the joint belief is never materialised. Each part is named with its role, including the likelihood and how its counts are seeded and learned, the transitions which are identity by default with one named exception, the preferences which are fixed per configuration and never learned, the initial prior, the habit prior, and the expression that combines the information-seeking and preference terms into a policy score.

The following section is a correction of the document's own earlier wording, and it is the sharpest passage here. The earlier version said preferences never enter the policy, which the page now calls false and self-undermining, because preferences do enter through exactly one named pathway. Three narrower invariants replace it: preferences are unlearned and kept separate from the learned tensors; the information channel is independent of preference and decays to nothing as counts grow, which is offered as the argument that no reward has been smuggled in; and no per-action scalar enters the policy, since an action can only act through its transition column.

A table then lists cross-cutting invariants that both organs must clear, each with the guard that checks it, covering identical behaviour when switched off, no per-action scalar, additive gating with new factors read by name rather than by position, decay of any information term, an action-severed twin whose failure means striking the survival language, the claim fence, one cure at a time, independent validation from more than one source, and the verdict vocabulary.

The final section fixes the experimental discipline, and its corrections are pointed. An activation gate must come first and must be numeric, so that a miss is recorded as withheld rather than as a failure. The replication unit is a distinct world seed rather than several agents in one seed, because agents sharing terrain and weather are not independent, and an earlier artifact is cited as the reason. A reference controller pins what is reachable, and is a ceiling rather than a floor. Every qualitative word must become a registered number. A continuous collector must be named in each document, because an earlier run froze part-way and only a long series caught it. Stages run one at a time. And one measure is named as secondary and expected to fail for either single cure, with a warning against reading its non-movement either way.
