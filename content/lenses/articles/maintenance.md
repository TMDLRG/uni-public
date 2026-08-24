---
lens_schema: 1
scope: article
key: maintenance
corpus: 
source_sha256: eca87f85d4313c9a
source_body_sha256: eca87f85d4313c9a
source_title: Maintenance
source_words: 2001
authored_by: claude-opus-5
authored_at: 2026-08-24
review_state: draft
reviewed_by: 
reviewed_at: 
note: 2026-08-24 the source moved. Two sections were added, on quiet mode and on proving the state after a reboot, and one closing claim was corrected. Both lanes revised to carry them.
---
<!--PLAIN-->

Keeping the system running is its own job: restarting things that crash, making them
come back after a reboot, checking health, backing up, repairing the record, and recovering from
disaster.

It hangs on one distinction the project takes seriously. Surviving a crash and surviving a reboot are
two different claims, and collapsing them is how a system comes to believe it is durable when it is
not. So each startup entry has a separate prover that reports success only if the machine actually rebooted after it was
installed. Installing one is not evidence that it fired.

It also insists that questions about the current state are answered by asking the running system
rather than reading files, and names three such questions no committed file can answer honestly. Corrections to the record are appended, never edited.

Two of its sections are about stopping rather than starting: a quiet mode that shuts the heavy media
half while the watching stays up, and a check after a reboot that asks whether the machine actually
stayed quiet.

The page ends by listing what the project knows it cannot promise, including that no long-duration
test exists and that the emergency stop has never been fired by a person. One of those admissions
carries a correction: it had understated how much of the record exists.

<!--CLEAR-->

This is the operations page: watchdogs, boot persistence, health checks, certificates, repair of the append-only record, backups and disaster recovery. Most of it turns on one distinction the estate takes seriously: crash-restart
and reboot-survival are two different claims, and collapsing them is
how a system comes to believe it is durable when it is not. Installing a startup entry is not
evidence that it fired.

Health comes first: ask the running system rather than read the repository, because a repository tells you what was intended and only a probe tells you what is. Three questions are deliberately not answered by any committed file — whether the trees are clean,
whether the suite passes, whether the gates pass — because they are facts about a run, not about the tree. A governing document upstream answered all three in prose, and one answer was false three minutes after it was measured, while reading as present tense.

Watchdogs handle crash restart, one per surface. A conflict is recorded rather than resolved: two supervisors disagree while the system is on air, one standing down during a stream, the other restarting unconditionally, and nobody has decided which is correct.

Boot persistence is installed and proved separately. Each installer pairs with a prover that reports
success only if the machine rebooted after the install marker was written. A prover that said yes because a file exists would certify its own installation rather than the
behaviour it was installed for. Two drills exercise recovery paths deliberately, because a recovery path never exercised is a hypothesis.

Certificate renewal is a side effect of normal operation rather than a task someone must
remember.

The evidence record has its own maintenance: one-shot recorders that append nothing if run again. They exist because the record's own anti-silence guard fired: work had continued and the record had
not. A correction is appended, never edited. An append-only record that permits a fix in
place has no memory of having been wrong, which is the only thing it was built to remember.

Backups, archiving and a heartbeat are four scheduled units, all marked as design and not yet run on node
hardware — the intended shape rather than a running system. Reverse two of them and every backup is a day stale.

Upgrades come with warnings: removing the colony container destroys the agents' memories, so capture
comes first. One deployment script refuses to run because it is stale against the current topology, and the fan-out arm does not survive a reboot by design. Two housekeeping gaps are stated rather than left to be found: nothing rotates the logs, and one evidence store grows without bound by
design.

The closing section lists what is not underwritten — no soak test, a capture failure detected but not automatically recovered, a long run nobody has underwritten, and an emergency stop no human has
fired. A fifth is named as the sharpest: all but one of the registered checks have no row in the record
meant to hold them, and writing those rows is the operator's task, not an agent's. The page carries a correction to that line, which previously said none of them did, and names the join key that hid it.

Two sections concern stopping rather than starting. A quiet mode shuts the expensive media half while monitoring stays up, held by a latch written before anything stops, because the supervisors would
otherwise undo it in seconds. Its failsafe leans the opposite way to the healer's: an unreadable
latch reads as not quiet. A companion check after a reboot asks whether the machine actually stayed
quiet.
