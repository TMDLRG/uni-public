---
lens_schema: 1
scope: wiki
key: evidence/receipts-music-nowplaying-stuck-root-cause-2026-07-18
corpus: evidence
source_sha256: 14308b9567a537ec
source_body_sha256: 14308b9567a537ec
source_title: Receipt — `/api/nowplaying` stuck reporter: ROOT CAUSE (measured, not inferred)
source_words: 895
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A record of finding out why a now-playing report was stuck, with the answer measured rather than inferred. The server believed a listener was connected while the operating system said no such connection existed, which points to a leaked session record rather than a loop that failed to advance. The cause is a writing thread that can block forever with no timeout, so the cleanup never runs and the frozen record is then reported as truth. The fix is written but not deployed, and the page ends by saying the fix working is not verified.

<!--CLEAR-->
A root-cause receipt that is careful about which parts are measured and which are not. The root cause is settled, the fix is written and not deployed, and the closing line says the fix working has not been checked.

It begins by locating the service, which an earlier sweep had missed, and explains the miss rather than glossing it: the output that would have shown it was truncated. The location is then established by following the listening socket to a process and on to its command line.

The decisive measurement is two probes taken at the same instant. The server reports one listener connected; the kernel reports no established connection at all. That contradiction is what separates a leaked record from a reporter that fails to advance. A second reading corroborates it: a position grown far past the length of the track, a sequence number still at its starting value, and growth exactly matching the wall clock, which means nothing is playing and a frozen timestamp is being subtracted from the present.

The mechanism is traced through the code in numbered steps. One thread is the only writer of the fields in question. Cleanup lives only in that thread's exit path. No timeout is ever set on the socket, so when a peer disappears without a clean close the thread parks forever inside a write, the exit path never runs, the counter is never decremented, and the record is never removed. The read path then trusts that record with no liveness check and no bound. All of it is compressed into one sentence about a record whose only writer can block forever, with no timeout, no heartbeat and no reaper, and a reader that trusts it unconditionally.

A second-order consequence is named that nobody had noticed. Every leak permanently consumes a listener slot, so left alone the station would eventually refuse every real listener while playing to nobody.

The fix is six changes, each with its reason, and the primary one is simply setting a timeout so a dead peer raises instead of parking a thread. The others make a leak self-heal from any future cause and make the reported state bounded and honest when a session goes stale. Two administrative verbs are added behind a token, and the page states that with the token unset they refuse rather than allowing unauthenticated changes, citing an earlier retracted claim as the reason for that discipline. The gate stays pending, because it cannot be closed by reading code.
