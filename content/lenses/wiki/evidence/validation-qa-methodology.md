---
lens_schema: 1
scope: wiki
key: evidence/validation-qa-methodology
corpus: evidence
source_sha256: 7515cb729343551a
source_body_sha256: 7515cb729343551a
source_title: QA & Validation Methodology
source_words: 460
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page describes how a codebase is tested. It is written for someone trying to judge whether the testing is any good, not just count it. It lists each suite and what it covers, then the parts that matter more than the list. There is a small property tester written in the project rather than pulled in from outside, and a rule that time in tests is logical so that nothing can flake. There is a checklist mapping one test to each mandatory invariant, fuzzing aimed at leakage, long soak runs, and a stored reference episode that pins regressions.

<!--CLEAR-->
A methodology page rather than a result. It says how this codebase is checked, in enough detail that a reader can decide whether to believe the checking.

It opens with a table of suites, one row per file, saying what each covers. There is determinism, the core message schemas, the world's fields and dynamics, the graph, the body, the genome, development and sensors. There is the interface between agent and world, the simulation itself, evaluation, the invariant checklist, a leakage probe, a soak run, and a comparison against a stored artifact. Several rows are property tests rather than worked examples, including mass conservation, boundedness, a genome that stays valid however it is mutated, and development that cannot produce an impossible body.

Then come the parts that are arguments rather than lists. Property testing uses a small helper written in the project rather than an outside library, and it reports the failing sample with its index so a failure can be reproduced. Time is purely logical, with no sleeping anywhere in the suite, and determinism tests assert byte-identical traces, so anything nondeterministic surfaces as a failure instead of an occasional flake. A dedicated suite maps one test to each mandatory invariant so the audit can be done at a glance.

The fuzz and leakage section lists what gets thrown at the system and what each malformed input should produce: rejected outright, tolerated and counted but never executed, or refused by name. A baseline episode audits every observation and asserts that nothing leaked. Soak runs assert that bounds hold over long runs and repeated expansion. A stored reference episode pins the structural numbers exactly and the floating-point ones within a tolerance, and is regenerated only on purpose. The page ends with the commands that run all of it.
