---
lens_schema: 1
scope: wiki
key: control-plane/phases-phase-1-results
corpus: control-plane
source_sha256: 87ba82a9a9ceb7e8
source_body_sha256: 87ba82a9a9ceb7e8
source_title: Phase 1 — RESULTS
source_words: 936
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

This is what actually happened in the first phase, set against the plan that was committed before it. The headline is that the plan's own predictions were falsified, and the page treats that as the result rather than as a setback.

Most of the disagreement signals being watched can never read as equal. Not because the documents are wrong, but because the two sides being compared are different kinds of thing. A line of prose against a file listing. A plan label against a list of live observations. A small blob against a whole document. No edit to a document can clear them, and unequal is their normal permanent reading.

The author had predicted that several edits would clear several of them. All those predictions were false, and false for a structural reason. The page notes what would have happened otherwise: three documents edited, nothing clearing, and a temptation to edit the collector until it did — the exact laundering the phase was built to prevent.

Every item ends with a written disposition, and none of them cleared.

<!--CLEAR-->

This page reports the outcome of the first phase against a plan that was written and committed beforehand. Its opening section is headed as the headline, and it says the predictions written down in advance were falsified — which is the result, not a failure of the phase.

The finding is that most of the disagreement signals under watch can never read as equal, and not because any document is stale. The two sides being compared are different kinds of thing. A quoted line of prose against the output of a file listing. A short label describing something planned against a list of live observations. A small structured blob against an entire document. For these, unequal is the permanent and normal reading, and no edit to a document can change it.

The evidence section shows why. The comparison is a plain byte equality, and every signal is pushed unconditionally, so the gate that requires these signals to exist stays satisfied whether they agree or not. The problem is not the gate: the comparison cannot be satisfied at all. A table then walks each signal, naming what is on each side and whether equality is ever reachable. Only one could reach equality, and does so when the working tree is clean.

The section on what this means is careful in a way worth noticing. The projecting body is behaving correctly: its law requires a mechanical byte comparison and forbids it from judging, and it reports exactly what it computed. The instrument is nonetheless not measuring what it appears to measure — a reader seeing unequal will reasonably infer that the documentation is stale, when it would read unequal even if the documentation were perfect. The signals are still described as valuable, because they carry both sides verbatim with a note of where each came from, and a person can read them and judge. The defect is that the boolean invites a conclusion it cannot support. The governing decision record is not invalidated; what is corrected is the author's assumption that these were defects awaiting a fix, when they are standing monitors, most of which cannot converge.

The disposition table then records every item. Two are done: the audit numbers corrected to the source that counts, and a failing gate made visible in the architecture, with the result that would show it wrong and the written limit on what it claims. The rest are recorded as not cleared, each with a reason: structural in most cases, user-owned in one, left untouched exactly as planned. The count is stated bluntly: none cleared. The plan had said some would be clearable and at least one would not; what was observed is worse than predicted, and the page adds that it is worse in the informative direction.

A short section records the retractions the plan carried in. The central one: a claim that a generated file had drifted from its record was wrong, because it had been measured against a deployed copy rather than the tree that counts.

Verification records that no code file was modified, that the only working-tree change is the user-owned file, and that the generated file was not re-rendered because it did not need to be. That is itself the sign that the retraction holds. The page then repeats its own standard: a phase reporting that all drift cleared has laundered something, and this one reports none cleared with a structural reason for each.

It closes by naming the next act, because the phase is complete only when its successor's plan exists and is committed alongside it.
