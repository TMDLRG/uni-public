---
lens_schema: 1
scope: wiki
key: control-plane/readme
corpus: control-plane
source_sha256: b44709415f629f22
source_body_sha256: b44709415f629f22
source_title: Control Plane — architecture
source_words: 929
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: Rebound 2026-08-01 after the source gained an ADR row. The prose was re-read against the new bytes and left unchanged because it contains no numeral and no ADR identifier, so nothing in it could have gone stale. A rebind is only honest when the delta is checked; this one was.
---
<!--PLAIN-->

This is the front door to a directory of architecture documents, and it starts by telling you what it is not. The thing it describes is part design and part built. Several phases have landed real code; the lab view remains. The page says outright that this directory moves no confidence level on its own.

Most of it is a map. One table says which file plays which role and when to edit it. The typed model of record. The projections that render anywhere with no tooling. The prose the model cannot carry. The decision records, the data shapes and the numbered refusals. And the audit that checks claims against a live read rather than against another document.

Then comes the one thing it asks you to read first: there are four bodies, and none may be collapsed into another. One admits and releases. One runs the science, and is the only one that may author a verdict — though the page notes it has not yet. One projects signals and may never act. One shows and carries.

The rest lists the phases and the decisions, with their status.

<!--CLEAR-->

The entry point to a directory of architecture documents opens with a status rather than a welcome: the thing described is part design and part built, and the directory on its own moves no confidence level. It then lists what each phase added. A ledger — the list of results only ever added to — and a command path. Then registration, verdict authorship, an anchor and a two-party rule. Then persistence, runs and a pairing guard. Then a witness and the body's first ledger of its own history. Then rooms, keys and airlocks. And it says only the lab view remains. For live state it points elsewhere, on the reasonable ground that a committed file cannot hold a fact about now.

A section on maintenance explains that the architecture is kept as a model in text rather than as drawings, and points at the decision record that says why earlier drawings were deleted. A table gives each file its role and the condition under which you should edit it. The typed model of record, when an element or relationship changes. The projections, when a view needs to show something different. The prose, when behaviour or a contract changes. The decision records, when a consequential choice is made or reversed. The data shapes, when a field is added or a type changes. The numbered refusals, when a new refusal is identified. And the audit, when the architecture changes. A single rule settles disagreements: if a relationship appears in a view but not in the model, the model is wrong, and the model is authoritative.

The section headed as the one thing to read first sets out four bodies, none of which may be collapsed into another. One handles admission, release, keys and journey, and is built. One runs the science — this is the lab — is partly built, and is the only body that may author a verdict, though the page notes it has not yet done so. One projects signals with a note of where each came from, is built, and may neither act nor author. One shows and carries, is built, and does neither. The reasoning is given in a sentence. The projecting body may never act, so it cannot be a control plane. The control plane authors verdicts, so it can never be the witness. And collapsing either into the other removes the very thing that makes a claim checkable.

A table of phases follows, each with its status and the condition that ends it. The rule stated there is worth noticing: writing a report or passing tests is not a stopping condition, and a phase is complete only when its successor's plan exists, written down in advance in the same form. Several phases are marked executed, with their known partial results and known failures carried in the open rather than tidied away, and the last listed is written down in advance but not executed. The page adds that a not-cleared outcome with a named reason is a valid and complete result.

A short table indexes the decision records. A closing scope note explains that the control plane is platform-wide, that the flagellum is one project under it alongside several others, and that the directory sits where it does because that is the version-controlled tree available.
