---
lens_schema: 1
scope: wiki
key: control-plane/readme
corpus: control-plane
source_sha256: 61c139a637f54e43
source_body_sha256: 61c139a637f54e43
source_title: Control Plane — architecture
source_words: 899
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

This is the front door to a directory of architecture documents, and it starts by telling you what it is not. The thing it describes is part design and part built. Several phases have landed real code; the lab view remains. The page says outright that this directory moves no confidence level on its own.

Most of it is a map. One table says which file plays which role and when to edit it: the typed model of record, the projections that render anywhere with no tooling, the prose the model cannot carry, the decision records, the data shapes, the numbered refusals, and the audit that checks claims against a live read rather than against another document.

Then comes the one thing it asks you to read first: there are four bodies, and none may be collapsed into another. One admits and releases. One runs the science, and is the only one that may author a verdict — though the page notes it has not yet. One projects signals and may never act. One shows and carries.

The rest lists the phases and the decisions, with their status.

<!--CLEAR-->

The entry point to a directory of architecture documents opens with a status rather than a welcome: the thing described is part design and part built, and the directory on its own moves no confidence level. It then lists what each phase added — a ledger and a command path, then registration and verdict authorship and an anchor and a two-party rule, then persistence and runs and a pairing guard, then a witness and the body's first ledger of its own history, then rooms and keys and airlocks — and says that only the lab view remains. For live state it points elsewhere, on the reasonable ground that a committed file cannot hold a fact about now.

A section on maintenance explains that the architecture is kept as a model in text rather than as drawings, and points at the decision record that says why earlier drawings were deleted. A table gives each file its role and the condition under which you should edit it: the typed model of record, when an element or relationship changes; the projections, when a view needs to show something different; the prose, when behaviour or a contract changes; the decision records, when a consequential choice is made or reversed; the data shapes, when a field is added or a type changes; the numbered refusals, when a new refusal is identified; and the audit, when the architecture changes. A single rule settles disagreements: if a relationship appears in a view but not in the model, the model is wrong, and the model is authoritative.

The section headed as the one thing to read first sets out four bodies, none of which may be collapsed into another. One handles admission, release, keys and journey, and is built. One runs the science — this is the lab — is partly built, and is the only body that may author a verdict, though the page notes it has not yet done so. One projects signals with provenance, is built, and may neither act nor author. One shows and carries, is built, and does neither. The reasoning is given in a sentence: the projecting body may never act, so it cannot be a control plane; the control plane authors verdicts, so it can never be the witness; and collapsing either into the other removes the very thing that makes a claim checkable.

A table of phases follows, each with its status and the condition that ends it. The rule stated there is worth noticing: writing a report or passing tests is not a stopping condition, and a phase is complete only when its successor's plan exists, pre-registered in the same form. Several phases are marked executed, with their known partial results and known failures carried in the open rather than tidied away, and the last listed is pre-registered but not executed. The page adds that a not-cleared outcome with a named reason is a valid and complete result.

A short table indexes the decision records, and a closing scope note explains that the control plane is platform-wide, that the flagellum is one project under it alongside several others, and that the directory sits where it does because that is the version-controlled tree available.
