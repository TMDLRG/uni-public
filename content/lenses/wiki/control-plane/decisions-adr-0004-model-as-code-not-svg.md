---
lens_schema: 1
scope: wiki
key: control-plane/decisions-adr-0004-model-as-code-not-svg
corpus: control-plane
source_sha256: fc6e389f9b54e422
source_body_sha256: fc6e389f9b54e422
source_title: ADR-0004 — Architecture is model-as-code; hand-authored SVG is not an architecture format
source_words: 859
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

How the architecture itself gets written down is settled here, in a dated record. It replaces two hand-drawn diagram files that had been committed earlier.

The problem with those files was concrete. Every shape carried its own position, so moving one box meant recomputing its neighbours by hand. A layout change and a change of meaning looked identical in a diff, so a reviewer could not see that a relationship had been added. Coordinates carry no meaning, so the file cannot be reasoned about after it is written, only re-rendered. And two drawings of the same subject could drift apart with nothing to detect it.

The decision is to keep the architecture as text that models rather than text that draws: one typed model of record, a lighter text-to-picture projection that needs no tooling, one reasoning record per consequential choice, and prose for what a model cannot carry. The drawings were deleted rather than kept alongside, because two sources of truth was the problem being fixed.

An addendum records that the missing tooling was later installed, and one honest limitation you should not skip.

<!--CLEAR-->

A dated decision record about the format of the architecture documentation, superseding an earlier commit of hand-authored drawings.

The context is that the first attempt at documenting this architecture committed two drawing files with absolute coordinates on every element — hundreds of lines of positioned rectangles and text. The operator objected, bluntly, that collaborating over such files is not possible and that the result is just a picture. The record accepts the objection and lists concrete failures: the files are not editable, because moving one box means recomputing every neighbour and every connecting path by hand; not diffable, because a layout change and a semantic change look the same; not readable by their own author, because coordinates carry no meaning; not a single source of truth, because two drawings of one subject drift independently with nothing to detect it; and not a model at all, because there are no typed elements or relationships, so nothing can be validated, queried, or projected into a second view.

The decision is that architecture is maintained as text that models rather than text that draws, in four layers. A typed model of record holds people, containers, relationships and deployment nodes, and several views are derived from it. A lighter markup projection renders natively in common viewers with no build step. Individual decision records carry the reasoning, each with its context, decision, consequences, alternatives and falsifier. Prose carries what the model cannot: contracts, invariants, failure modes and acceptance criteria. The hand-authored drawings were deleted rather than left beside the model, because two sources of truth is the disease being treated.

The consequences are given in both directions. In favour: every element and relationship becomes a reviewable line, so a change reads as a relationship added rather than as a coordinate delta; one model yields several views without redrawing; and layout goes back to being the renderer's job. Against: at the time of writing, the tooling for the model of record was not installed, which the record files as an open item, and the lighter projection is less complete, so the two views may not match exactly — where they differ, the model is authoritative.

Several alternatives were considered and each rejected with a reason, including keeping the drawings alongside a model, and using the lighter markup on its own — the latter tempting, but rejected because independent drawings repeat the same relationship in each diagram and so drift from one another.

An addendum records that the tooling gap was later closed, installed for one user rather than system-wide, and notes that validation immediately caught two real errors that a hand-drawn diagram could never have surfaced. It closes with a limitation that a reader should not skip: the styling that marks which containers are built and which are not does not survive the export, so every container in the generated pictures comes out the same colour. That distinction is therefore carried in the descriptions and in the prose, never by colour alone, and the record says plainly not to read the rendered pictures as a statement about what is built.
