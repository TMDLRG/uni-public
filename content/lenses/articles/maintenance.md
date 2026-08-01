---
lens_schema: 1
scope: article
key: maintenance
corpus: 
source_sha256: 27075bfb77786667
source_body_sha256: 27075bfb77786667
source_title: Maintenance
source_words: 1478
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

This page is about keeping the system running once it exists: restarting things that crash, making
them come back after a reboot, checking health, backing up, repairing the record, and recovering from
disaster.

It hangs on one distinction the project takes seriously. Surviving a crash and surviving a reboot are
two different claims, and collapsing them is how a system comes to believe it is durable when it is
not. So each startup entry has a separate prover that reports success only if the machine actually
rebooted after the entry was installed.

It also insists that questions about the current state are answered by asking the running system
rather than by reading files, and it names three such questions no committed file can answer
honestly. Corrections to the record are appended, never edited.

The page ends by listing what the project knows it cannot promise, including that no long-duration
test exists and that the emergency stop has never been fired by a person.

<!--CLEAR-->

This is the operations page: watchdogs, boot persistence, health checks, certificates, ledger repair,
backups and disaster recovery. Most of it turns on one distinction the estate takes more seriously
than most — that crash-restart and reboot-survival are two different claims, and collapsing them is
how a system comes to believe it is durable when it is not. Installing a startup entry is not
evidence that it fired.

Health comes first, and the instruction is to ask the running system rather than read the repository,
because a repository tells you what was intended and only a probe tells you what is. Three questions
in particular are deliberately not answered by any committed file — whether the trees are clean,
whether the suite passes, whether the gates pass — because they are facts about a run rather than
about the tree. A governing document upstream used to answer all three in prose, and one of those
answers was measured at one moment and was false three minutes later, while reading as present tense.

Watchdogs handle crash restart, one per surface. A conflict is recorded rather than resolved: two
supervisors disagree while the system is on air, one standing down during a stream and the other
restarting unconditionally, and resolving it needs a decision about which behaviour is correct that
nobody has made.

Boot persistence is installed separately and proved separately. Each installer pairs with a prover
that reports success only if the machine actually rebooted after the install marker was written,
because a prover that reported success because a file exists would be certifying its own installation
rather than the behaviour it was installed for. Two drills exercise recovery paths deliberately, on
the grounds that a recovery path never exercised is a hypothesis.

Certificate renewal happens as a side effect of normal operation rather than as a task someone has to
remember.

The evidence record has its own maintenance: a set of one-shot recorders, all of which append nothing
if run again. They exist because the record's own anti-silence guard fired — work had continued and
the record had not. Two of them are corrections and one supersedes an earlier reference, and the page
underlines why: a correction is appended, never edited, since an append-only record that permits a
fix in place has no memory of having been wrong, which is the only thing it was built to remember.

Backups, archiving and a heartbeat are four scheduled units, all marked as design and not yet run on
node hardware, so the section is the intended shape rather than a running system. Their ordering is
deliberate: reverse two of them and every backup is a day stale.

Upgrades come with warnings, chiefly that removing the colony container destroys the agents' memories
and so capture comes first, that one deployment script refuses to run because it is stale against the
current topology, and that the fan-out arm deliberately does not survive a reboot. Two housekeeping
gaps are stated rather than left to be discovered: nothing rotates the logs, and one evidence store
grows without bound by design.

The closing section lists what is not underwritten — no soak test, a capture failure with detection
but no automatic recovery, a long run that is not underwritten, and an emergency stop no human has
fired. A fifth is named as the sharpest: every registered gate has no rows in the canonical record,
and authoring them is the operator's task rather than an agent's.
