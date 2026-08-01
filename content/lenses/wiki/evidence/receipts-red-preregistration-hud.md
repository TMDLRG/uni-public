---
lens_schema: 1
scope: wiki
key: evidence/receipts-red-preregistration-hud
corpus: evidence
source_sha256: b156bedcdf6e9c3b
source_body_sha256: b156bedcdf6e9c3b
source_title: Pre-registration — UNI HUD gates
source_words: 959
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A set of promises written before any of the tests were run. For each check on a display system it states what would count as a pass, in enough detail that someone else could run it, and what would count as a refutation. It also fixes the vocabulary in advance: verdicts are words rather than percentages, bound to pass, partial, fail, withheld and pending, evidence carries a grade saying how it was obtained, and a verdict is never changed by editing an old record, only by appending a new one that supersedes it.

<!--CLEAR-->
A pre-registration covering several gates on one system, written before the runs so that each later record can cite it rather than inventing its own bar. Nothing on the page is a result.

The opening sets the rules. Every gate row appended later cites this document. Verdicts move through a fixed vocabulary — pass, partial, fail, withheld, pending — and are never scored as percentages. A verdict advances only by appending a new row that supersedes the old one, never by editing the old row. And evidence carries a class saying how it was obtained: independently reproduced, observed with an artifact, or an exit code alone.

Then one section per gate, each with a pass condition, a falsifier, and where the receipt will live when there is one. They are written to be executable by somebody else: which command to run, which state it must report, which digest must match which build artifact, and how many seconds are allowed. Several concern supervision, killing a process and requiring one of two independent legs to bring it back, or stopping a service and requiring the system to restart it, and each names the failure mode that would count against it, including a subtle one where the process returns running bytes that were never committed.

Others are about honesty rather than uptime. One scans the whole surface for hard-coded addresses outside a tiny allowlist and fails on any, naming the replacement pattern inside the falsifier itself. One requires the display to refuse a submission that does not carry a vouch from upstream, and forbids the display from quietly cleaning the text itself instead of demanding that vouch. One requires that every summary shown sits beside the counts it summarises, so no rolled-up badge ever appears alone.

The last gate is about integration, and it is careful about attribution: it fails only if that one stage fails while every other stage passes, which is the pattern that would point at the new part rather than at the rest of the stack.

A closing section gives the cadence for moving a verdict along, including the case where a single deterministic run is enough, and the case where a regression pushes a verdict back down, with the earlier record kept for audit.
