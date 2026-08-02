---
lens_schema: 1
scope: wiki
key: control-plane/next-session-brief
corpus: control-plane
source_sha256: 9e6ba7c41cd4ef07
source_body_sha256: 9e6ba7c41cd4ef07
source_title: Next session brief — deepen the architecture, then resume Phase 2
source_words: 749
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

Whoever picks the project up next is the reader here. The brief says at the top what it is not: preparation, not the phase that follows. That phase was written down before any of it began, and stays untouched until this work is done, so none of it has happened yet.

Standing rules come before the work. Speak findings aloud, and speak an adverse result first rather than appending it at the end. Converse rather than dump; a long status block belongs on the live surface, not in chat. Ask rather than assume — naming, scope and contract changes belong to the operator. Ground a claim before making it. The brief counts, without flattery, the times a copy was reported here as the original or a document as the truth. And read live: a value that cannot be read live renders as unknown, never as a guess.

A short inventory follows, the model of record among it. Then four tasks: audit the architecture against the running system, write the specifications still absent, give the live surface drill-down and cross-linking, and re-render and verify. A closing condition says when the brief is finished.

<!--CLEAR-->

A brief for the next working session, and a plan rather than a record. It describes work to be done, and opens by saying that this is preparation and that the following phase, committed in advance, stays untouched until this completes. It also tells the reader which page to read first, for state.

The standing rules come first, which tells you how they are meant to be used. Speak findings, decisions, phase edges, completion and blockage aloud, and put an adverse result first rather than at the end. Converse rather than dump: one thing at a time, outcome in the first sentence, and a long status block belongs on the live surface, not in chat. Ask rather than assume: naming, scope and contract changes are the operator's. Speak the question and stop. Ground before claiming, with an unflattering count of how many times in this project a copy was reported as the original or a document reported as truth. And read live: nothing there may be cached or hand-transcribed, and a value that cannot be read live renders as unknown, not as a guess.

A short table records what already exists: a model of record with its containers, relationships and views; rendered exports; projections that need no tooling. Also the architecture prose; the decision records, each naming what would show it wrong; the phase documents; and the live surface.

Four tasks follow. The first is an audit: cross-check every claim in the architecture prose, the model and the projections against the running system rather than against each other, marking each confirmed, corrected, or not verified with a reason. It lists what needs checking, and names what would show it wrong: any statement that cannot be traced to a live read or to a named file and line.

The second task is the specification still absent and needed before the body is built. Sequence diagrams for the evidence path and for admission, release, a two-key transition, an emergency stop and a drift and its resolution. A view one level below containers for the internals. A data specification for each kind of record the body writes down. Every refusal in the architecture prose restated as a testable statement. And one disambiguation line that has not yet been written.

The third task is drill-down and cross-linking on the live surface. Every element links to its definition. Decisions are cross-linked to what they govern and back again. Documents are rendered in the page rather than served as raw text. Each test is shown beside the claim it would break. And the interface carries the model's parsed elements and relationships, so the page can show the graph, not only the pictures. A constraint is attached: that surface owns nothing and caches nothing, and every addition is a live read carrying the path it came from.

The fourth task is to re-render and verify, with the expected results named in advance. Then a short list of things not to do: no new dependency, no edit to a user-owned test file, no write to the gate record, no move of a confidence level.

The brief closes with its exit condition. It is complete when the audit is recorded, the missing specifications exist, the live surface drills down and cross-links, and every view re-renders clean — and only then does the phase committed in advance resume. The last line carries the rule that a session ends by recording the result and naming the next act.
