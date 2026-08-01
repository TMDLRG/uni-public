---
lens_schema: 1
scope: wiki
key: evidence/receipts-hud-mixer-board-2026-07-16
corpus: evidence
source_sha256: f238c5676357a132
source_body_sha256: f238c5676357a132
source_title: HUD → live-TV mixer-board NOC: honest, complete, top-level access (2026-07-16)
source_words: 1523
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A record of rebuilding a glance display after the operator listed, bluntly, several ways in which it was not honest. Every gate was registered before any code was written, and all the fixes serve one rule: never fabricate a measurement, and show what was not measured as unknown rather than as a confident zero. Measuring the running service, rather than reading the code, found four things the plan had wrong, including that one panel had never worked once since the day it was added, and could not have said so.

<!--CLEAR-->
A receipt that opens with the operator's own complaints, and a count: the third honesty failure in this surface in two days. The gates were pre-registered before any code was written, and each names a falsifier.

One rule is stated that every fix serves. Never fabricate a measurement. Anything not measured surfaces as unknown, never as a confident zero and never as off.

The most useful section separates what the plan, written from a code read, got right from what only measuring the running system revealed, and says the difference is the whole lesson. One panel had never worked once, because it polled something expensive behind a short timeout and had timed out on every poll since the day it was added, while never saying so. The advertised refresh rate was wrong several times over, because waiting for everything meant one doomed call stretched every cycle, and the surface published a constant that made the claim unfalsifiable.

One lie's root cause was upstream of the display entirely. A component sent both a value and a flag saying not to trust it, and an intermediate hop forwarded the value and dropped the flag, so a fabricated reading became a confident one before the display ever saw it. The page notes that no change in the display could have fixed it.

Two further planned steps would have shipped looking correct while showing nothing, or would have invented something that does not exist: a field path that yields nothing because the value is an encoded string, and a hardcoded list of seats one longer than the live data has.

What shipped is described layer by layer, with the theme of not discarding what was already fetched and not fabricating what was not. Values never measured are distinguished from measured zeros. Rate calculations return nothing on a first sample or after a counter reset. The expensive poll moves to its own slow loop that does not block the fast one, and that loop sleeps by the deficit so it honours the interval it advertises. One file outside the stated scope was changed deliberately, with the reason given: the gate could not be closed honestly without fixing the lie at its source.

The live receipts include a falsifier run on purpose, killing a component and watching the display say unknown where the old build showed a confident reading, and a cadence trajectory ending at the advertised value. Counts are recomputed independently at the same instant and match exactly.

One section is the author catching their own regression. Giving the expensive call its own interval while still awaiting it inline reproduced the very defect being fixed, and the honesty metric caught it within a single deploy cycle, which the page says a code review would not have done.

The residuals are stated rather than hidden. An address has moved, so a registry declares a stale one and several buttons open dead addresses; the quick static fix is refused, because that is exactly the failure mode the no-literals rule exists to prevent. One probe may be aimed at a retired surface. One pre-registration contained a factual error, and rather than reinterpret it quietly the page records that the clause as written is not met, even though the behaviour is stricter than the clause asked for. And a button click is still not driven by an automated test, with the obvious next step named and not claimed.
