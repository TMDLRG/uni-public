---
lens_schema: 1
scope: wiki
key: evidence/handoffs-thinker-studio-handoff-2026-07-12
corpus: evidence
source_sha256: ea0286c2dcd66ea0
source_body_sha256: 0705ffc3ebaeaa01
source_title: THINKER Studio — Handoff / Status (2026-07-12)
source_words: 2059
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
Read the banner: this is a stale session record, kept for history, and the architecture it describes was changed later the same day. It is a status handoff from one agent to a consolidation pass, saying which large uncommitted change is real completed work, what was proven on the machine that day, what was explicitly not proven and why, and that a runaway happened and was cleaned up by somebody else. The blocked items are given as much room as the finished ones.

<!--CLEAR-->
A handoff and status note carrying a stale banner. The table below it was accurate for that session's snapshot, and a default it describes was closed later the same day, so it should not be read as current.

The summary at the top does three things in order. It claims a large uncommitted change as real completed work and lists what that contains. It states the corrected architecture, one line per machine, with one of them carrying an absolute: no broadcast surface there, ever. And it separates what was proven on the machine that session from what was not.

The not-proven list gets as much room as the proven one, which is the useful habit on this page. Going out publicly is blocked because one machine was unreachable over the mesh the whole session, and the page distinguishes the private test, which does not need that machine, from the public path, which does. Another item was blocked by an unrelated wedge, and two more are described as designed and not built.

An incident is acknowledged in the summary rather than buried at the end: a runaway occurred and was cleaned up by another agent, with the machine left clean and the world seed preserved.

The architecture table gives each machine a role and what it runs, and the data flow is written as a single line from cameras through one encode out to the fan-out, which makes the overall shape easy to hold in mind.

The changes are then listed by area. The documentation section is candid about its own incompleteness: several documents were corrected with banners, two of them still carry stale prose below the banner which the next pass should scrub, and three more have no banner at all and still assert the old architecture. Naming your own unfinished corrections is what makes the rest of the page credible.

The lifecycle fixes are the most transferable part. Three changes together close a recurring class of orphaned processes: kill the supervisor before its children rather than after, clean up leftovers before starting anything, and launch without an interactive shell, because a shell that reads input dies when it is started from something headless and leaves its children behind.

The closing sections are practical. Which files are critical and what each one is for. Which new directories should be ignored rather than committed. One ambiguity resolved by simply looking rather than by reasoning about it. And a short quickstart with the checks that count as gates, including one that reconciles a count from two independent sources.
