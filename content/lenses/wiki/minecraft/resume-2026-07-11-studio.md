---
lens_schema: 1
scope: wiki
key: minecraft/resume-2026-07-11-studio
corpus: minecraft
source_sha256: 9beaf07bc8638026
source_body_sha256: 46327b2a54348430
source_title: RESUME — 2026-07-11 studio session (pre-reboot handoff)
source_words: 791
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is a handover note written just before a restart, and its most valuable section is the one headed by an instruction to be honest about what went wrong.

Three failures are recorded. A stop command that claimed to stop everything but did not: it left running the parts its author had not written, so the owner was told the studio was stopped when it was not. Two copies of the same service both claiming one name, because the start-up check looked at a port rather than at the process, so a half-dead copy passed as absent. And a camera that was not being driven by the component everyone assumed, which the owner spotted and which a note from earlier the same day had already described.

The open items are equally direct. One is the owner's judgement that the whole approach is a long way from what is needed, quoted rather than softened, with the question of what to do about it left for a conversation, because the note says more scripts would not answer it. A planned replacement had not begun.

<!--CLEAR-->
This is a pre-restart handover note, written to be read first when work resumes. It records the state of the machine, what was delivered, what went wrong, and what must be addressed next.

The state at restart is a single line: everything down, verified clean, no leftovers, safe to restart without losing committed work.

What was delivered is a hardening pass on the broadcast studio, listed as two commits, the first covering a shared client, an event mirror, a schema revision, certificate handling, a watchdog, an idle mode and a stop command, plus a set of fixes that came out of an adversarial review, including one making a state report show stale rather than pretending it was off. The second commit is described as a critical fix and is explained in the next section.

That next section is headed with an instruction to be honest, and it is where the document earns its keep. Three failures are recorded in full. The stop command did not stop everything: it killed only the pieces its author had written and left the game server and another service running, even though the same script starts them, and the note states plainly that the owner was told the studio was stopped when it was not. Two copies of one service were both claiming the same node name, which is exactly the hazard a runbook had warned about, because the start-up check only looked at whether a port was listening, so a half-dead copy passed as nothing running and got duplicated silently. And the camera was not being driven by the component everyone assumed; the owner flagged it at the end of the session in his own words, and the note records that an earlier session the same day had already documented the same issue, and that bringing up a web server had been mistaken for bringing up the driver.

The open items follow. The first is restoring the real driver, with the exact sequence written out and the gap named: the bring-up script does not start it, so any future work must either add that step or make the operator run it and warn loudly if it is missing while streaming.

The second is the owner's critique of the whole approach, quoted rather than softened, that the current state is a small fraction of the quality and stability needed and that there must be a better way than a fleet of loose windows. The note agrees with him, describes the current arrangement honestly as scripts with a watchdog stapled on, and says a planned service-based replacement has not started. It then leaves the choice open as a question for a conversation rather than answering it with more scripts.

The third open item records that the video route is not what the owner asked for, again in his words, and instructs that the intent be checked with the owner before anything is touched.

The note ends with the files changed, a sibling track that was not touched, and two commands to run on resuming.
