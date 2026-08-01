---
lens_schema: 1
scope: wiki
key: control-plane/architecture-audit
corpus: control-plane
source_sha256: 9c6acfc5dacc6c54
source_body_sha256: 9c6acfc5dacc6c54
source_title: Architecture audit — claims checked against the running system
source_words: 576
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

One day's audit is what you are reading, and its method is the whole point. Every factual claim in the architecture documents was checked against a live read of the running system, never against another document. The falsifier sits above the results: any statement that cannot be traced to a live read or to a named file and line.

The outcome was one error class at three sites. Everything else came back confirmed, row by row, so you can see the shape of what was checked.

The page is unusually honest about that one error. A count had been correct when written, then went stale within the same session because more signals were added and the total was not re-read. The record calls this the fourth instance of the same failure mode here — a number written down and then treated as evidence — and points at the earlier three.

Two smaller things follow. A note added later the same day supersedes one row rather than editing it. And a short section names what was left unread, mostly by design, along with the views re-rendered from the model.

<!--CLEAR-->

A date sits at the head of this audit, and its method is the point of it: every factual claim in the architecture prose, in the model of record and in the projected views was checked against a live read of the running system, never against another document. The audit states its own falsifier before its results — any statement in the architecture that cannot be traced to a live read or to a named file and line.

The bulk of the page is a table of claims, each with what the architecture said, what the live read returned, and a verdict. Most rows come back confirmed: drift signal counts, provenance completeness, the seats a witness carries, ledger row counts and their tally of outcomes, one body's port and verbs and journey states, the ports that answered a socket connect, the amended read-only contract, and the module list. One row records that the body which runs the science was, at that moment, not built.

One row failed, in a single error class appearing at three sites. A signal population had been correct when it was written; more signals were then added and the drift count updated, but the total was left as it was. The record says plainly that this was a stale number the author created himself, in the same session, hours apart.

The reflection on that error is the most valuable part of the page. It names it as the fourth instance of the same failure mode in the project and points to where the earlier three are recorded. The pattern is described not as carelessness about any single fact but as treating a written number as evidence — the same disease one of the decision records exists to prevent, applied here to prose rather than to a gate. The mitigation is that a live surface now reads all of these figures on every request and caches none of them, so a number in prose that disagrees with it is wrong by construction.

A block quote inserted later the same day supersedes one row rather than editing it. The claim that the body which runs the science was not built was true when the audit ran and is left in place as the record; by the time of the note, a phase had landed several parts and the body had become partly built. The test count quoted at the end of the page had likewise already moved.

A short section lists what was not checked and why: one surface's internals were not read this pass because it is loopback-only by design; one interface was confirmed down on purpose, during a rebuild; and some copies of a ledger were confirmed to differ from the canonical one, which is expected because they are older deployments and nothing on them is missing from the canonical copy.

The page closes with the verification run behind the audit — gate checks, a lint pass, a clean compile, the test suite, an untouched build file, an untouched user-owned test file, re-captured copies, and the views re-rendered from the model.
