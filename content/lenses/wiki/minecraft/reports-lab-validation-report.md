---
lens_schema: 1
scope: wiki
key: minecraft/reports-lab-validation-report
corpus: minecraft
source_sha256: 7af6a432fbe28919
source_body_sha256: 7af6a432fbe28919
source_title: SP.Lab — Validation Report (QA / UAT / Science cross-check)
source_words: 553
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is a validation report for a science lab component, written before anything downstream was built on its numbers. Its aim was to harden the lab rather than to praise it.

The method has four parts. Run the strict compile, formatting and test gates. Build a cross-check that re-derives every documented number from the code and fails if any disagrees with what is written. Fix each real discrepancy, recording even a change that was tried and reverted. And map the hard tests to their evidence.

The results are given as a table of gate outcomes, followed by the key numbers the code produced. Two scientific readings are named as unchanged by the work: one account remains contradicted by test, another remains supported only within its model.

The residual risks are the part to read. The cross-check only recomputes numbers the code produces. A large group of figures taken from the literature is checked for provenance and not recomputed, and the report says so explicitly.

<!--CLEAR-->
This is a validation report on a science lab component, and its stated purpose is to harden it independently before anything downstream is built on its numbers. It says up front that the project's own discipline applies: the mathematics is allowed to say a thing is contradicted, and nothing is labelled with the word the project forbids.

The method is in four parts. First the gates: a strict compile that treats warnings as errors, a formatting check limited to the lab's own files, and the full test suite. Second a new cross-check that re-derives a set of code-backed quantities, comparing each against its documented value inside a declared tolerance and exiting non-zero on any difference. Third remediation, fixing each real discrepancy forward and keeping an append-only log which, notably, records a change that was tried and then reverted. Fourth the mapping of the hard tests to their evidence in a separate checklist.

The artifacts are listed with their paths, and the results are a table of gate outcomes. A clean compile, and a clean format check with pre-existing drift elsewhere noted rather than touched. A passing suite, a passing cross-check, and the checklist's counts across its categories.

A paragraph then gives the key numbers the code produced. It covers how a standard gravitational formula fares against several bodies, and how badly a rival pressure-based account fails out of sample. Then an optical result, an electrochemical slope, a derived potential and a radiative floor.

The tolerances section explains that each cross-check carries its own, ranging from exact equality for defined constants to band checks for order-of-magnitude claims. It explains why one tolerance is what it is, by naming the physical effects the simple formula omits.

The residual risks are labelled honest, and they earn it. The cross-check recomputes only numbers the code produces; a substantial set of figures taken from the literature is checked for provenance rather than recomputed, and the report says this is stated explicitly rather than implied. Two checklist rows belong to the host system and one was never built. Several constants are declared roundings of exact values, cited alongside, and said to be immaterial to every verdict.

The verdict claims internal consistency and falsifiability rather than truth: code, tests, records, proofs and dossier agree on every code-backed number, and the cross-check will break the build if that stops being so. It records that no scientific verdict changed during the work, and repeats which account remains contradicted by test and which remains supported only within its model.
