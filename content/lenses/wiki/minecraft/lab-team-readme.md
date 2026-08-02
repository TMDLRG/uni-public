---
lens_schema: 1
scope: wiki
key: minecraft/lab-team-readme
corpus: minecraft
source_sha256: e6946d7ceccd6032
source_body_sha256: e6946d7ceccd6032
source_title: Lab Team — adversarial review personas
source_words: 500
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page introduces a review team made of five written personas. They are not people. Each one is a document kept in the repository and also a prompt that shifts an assistant into one specialist's way of arguing.

The team exists so that a proposed change to the engine has to survive attack from several directions before anyone builds it. One persona tries to refute the mathematics and refuses by default. One keeps proposals inside standard theory and merges everyone's verdicts into a single call. One asks whether the thing can be built without breaking existing guarantees. One designs the paired experiment that could show the idea is wrong. One asks whether the change creates a genuine internal need or just dresses a preference up as one.

Three design principles run through all of them: name the mathematical object before reaching for a metaphor, state what would refute the proposal before offering any fix, and produce typed artifacts rather than prose approval.

The page ends with the order they speak in, and how to call each one.

<!--CLEAR-->
This document sets out a five-part adversarial review team. Each part is a persona: a written role description that is both an auditable document in the repository and a prompt that loads as an assistant's instructions, so that its answers shift into that specialist's domain.

The five are listed with a one-line brief each. One tries to break the mathematics and refuses by default. One holds the theoretical frame and reconciles the team into a final call. One asks whether an approved idea can be implemented additively, behind a switch, with types and property tests, without disturbing what already works. One designs the paired experiment, written down before the run, with named conditions for both success and refutation, and refuses stories told from a single run. One asks whether a proposed drive is a real internal instability or a preference dressed up as a need.

The middle of the page is the part that makes this more than role play. Three principles are required of every persona prompt. First, locate the proposal in the mathematics before any metaphor is used, so that words like curiosity or need cannot hide an undefined quantity. Second, demand the condition that would refute the proposal before suggesting any fix, because falsifiability is the cost of entry. Third, require typed artifacts as output rather than an approving paragraph, including a structured specification, validators, a paired experiment design, and a short report.

A meta-protocol then fixes the order of the whole review. First a one-page proposal packet, then an independent review by each persona with no cross-contamination. Then the personas speak in a set sequence, and the result merges into one verdict drawn from a small fixed vocabulary, with a withheld option reserved for contradiction. A final ship gate says no change merges without the specification, the validator, the paired result and the report.

The page closes with the commands that invoke each persona or the whole team, and with a provenance note naming where the design came from.
