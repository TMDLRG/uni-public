---
lens_schema: 1
scope: wiki
key: minecraft/production-readiness-checklist
corpus: minecraft
source_sha256: 4b668e1fe7a9bc1a
source_body_sha256: 4b668e1fe7a9bc1a
source_title: Production Readiness Checklist
source_words: 401
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
Everything here is a checklist, and almost nothing else. It is a list of everything the project said it would build, with a mark beside each item saying whether it is done or whether it is only specified.

The legend at the top is what makes it readable. One mark means finished. The other means specified as an extension, with a separate limitations document named for the detail. Two items carry that second mark, and they are worth finding: one live adapter that is described rather than compiled in, and one memory feature whose underlying operations exist but which is not wired up as a sense.

The rest is grouped by area: how complete the code is, the runtime boundary rules, tests and quality, reproducibility, general engineering, documentation, and finally the acceptance gates from the specification, each with its own mark.

A checklist is a claim about a moment. Read it beside the reports that carry the evidence.

<!--CLEAR-->
A completion checklist rather than a report, and it carries no argument and almost no prose: it is a list of items, grouped by area, with a mark beside each one.

The legend at the top does the important work. One mark means done. The other means specified, or an extension, and points at a separate limitations document. Because both marks appear on the same list, a reader can see at a glance where the boundary between built and described actually falls. Two items carry the second mark. One is a live runtime adapter, described as specified while a pure component is the actual runtime. The other is reading memory back as a sense channel, where the underlying operations exist but the channel does not.

The groups follow the shape of the project. Code completeness covers the simulated world and its layered structure, hidden causal structure, an ecology including a deceptive element, and a resource economy with hazards. It covers actions gated by body parts, senses that unlock layers as they develop, developmental stages, and an inheritable genome with mutation and recombination. And it covers open-ended expansion into regions with altered law, an interface that hides its meanings from the learner, several non-omniscient reference strategies, an evaluation harness, observability, and a scenario loader.

A short group restates the runtime boundary: signals are the unit, decision logic is pure, effects happen only through instructions, internal operations never change the world, and time is logical rather than taken from a clock.

The remaining groups cover tests and quality assurance, including property, integration, leakage, soak and regression tests. Then reproducibility, resting on a threaded generator and having no dependencies. Then engineering practice, and documentation and evidence, which points at the validation reports that sit elsewhere.

The last group maps the specification's acceptance gates one by one, each with a mark. That is the part a reader checking claims should treat as an index into the evidence rather than as the evidence itself, since a checklist records a moment, and the reports carry the records of what was run.
