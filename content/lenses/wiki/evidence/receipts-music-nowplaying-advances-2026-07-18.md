---
lens_schema: 1
scope: wiki
key: evidence/receipts-music-nowplaying-advances-2026-07-18
corpus: evidence
source_sha256: 86768208d284aba7
source_body_sha256: 86768208d284aba7
source_title: Receipt — `music-nowplaying-advances`: **PASS**
source_words: 954
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A pass verdict for a fix that an earlier record had written but not deployed. The patch was applied, the service restarted, and two conditions were checked together against a genuinely attached listener rather than a synthetic probe: the track advanced, and the reported position never ran past the length of the track. The leak that caused the original fault was then recreated deliberately, and it healed itself within a minute. One operational finding is recorded for next time, because restarting this service leaves the consumer holding a dead connection that looks perfectly healthy from its own side and does not recover by itself.

<!--CLEAR-->
A pass verdict, with its evidence class stated and its root-cause receipt named. The fix described in that earlier receipt was written and not deployed; here it is deployed and measured.

The deployment is described precisely, including the awkward part. The source is mounted read-only inside its own container, so the write came from a separate container with the volume mounted writable. A backup is preserved, sizes before and after are given, the patch is idempotent and matched against exact anchors, and the file is parsed before and after writing. Two separate human approvals were needed rather than one, because the patch and the restart are separate mutating calls.

The pass evidence quotes the gate's own wording and then the samples, taken with a listener genuinely attached rather than against a synthetic probe. Both forms of the first condition are satisfied, since the sequence number advances and the title changes, and the page notes an earlier advance in the same session, so this is a sustained progression through the catalog rather than a one-off at a boundary. The second condition holds at every sample, and it is set against the pre-fix reading, where the position had run past the track length many times over.

The most convincing section reproduces the original fault on purpose. A real listener is attached, the position advances in step with the clock, the connection is then killed abruptly, and within a minute the count falls to zero and the endpoint reports no session at all rather than a stranded record with an unbounded position. That behaviour is also used as evidence the patch is live in the running process rather than only on disk, since only the new parts can produce it. Searching inside the container was unavailable, and the page says the behavioural evidence is both the stronger and the used one.

Then an operational finding written for the future rather than for this run. Restarting the service leaves the consumer holding a connection opened hours earlier, which looks entirely healthy from its own side and is completely dead. The obvious remedy did nothing; what worked was clearing the source's input and then restoring it. It is cross-referenced as somebody else's recovery step and recorded so that the next restart is not misdiagnosed as a server regression. A transient zero reading is explained as being on the consumer's side, and was shown to be so at the time by a separate probe.

The closing scope is deliberately narrow. The pass means the reporter advances, never reports an unbounded position, and no longer strands sessions with no peer. It says nothing about audio quality, nothing about the rendering path, and nothing about awareness or life. Two administrative verbs ship present but disabled, with an instruction not to describe them as secured unless the token is actually set.
