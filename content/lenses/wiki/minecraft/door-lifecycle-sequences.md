---
lens_schema: 1
scope: wiki
key: minecraft/door-lifecycle-sequences
corpus: minecraft
source_sha256: 0b473965a413bdbe
source_body_sha256: 0b473965a413bdbe
source_title: Door lifecycle — the full sequence diagrams (2026-07-14)
source_words: 955
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
Sequence diagrams, one after another, draw the messages that pass between the parts of a studio control system. They cover how it comes back after a restart with no clicks, what happens when the operator presses the single open-everything button, how a graceful shutdown runs, how the journey through a broadcast is tracked, and how going live works.

The last diagram is the one that gives the page its character. It is an incident record. Twice, a background page refresh accidentally triggered the open-everything action, so every few seconds a new copy of the studio started, and windows stacked up. The page draws the failure honestly and then draws the three independent guards now in place, noting that any one of them alone would stop it.

One rule runs through the whole page: a routine read never causes anything to happen. Actions only follow a deliberate click. Going off air is the exception in the other direction — one click, and never blocked.

<!--CLEAR-->
This document is drawn rather than written. It is a series of sequence diagrams showing the exact message flow through a studio control system, with short notes between them. A live page renders the same actors from the running system, so the diagrams have a counterpart you can watch.

The first diagram covers logon. Three small startup scripts fire once per logon, each starting a supervisor that keeps its service running and re-checks forever. One of them waits for the control service to answer before opening the operator's window exactly once, and the note is careful to say it never re-opens a window you deliberately closed. A further note says the gates that claim boot persistence flip only after a real restart, and never before.

The second diagram is the single open-everything action. The operator clicks; the request goes to the control service, which appends an entry to a list that is never edited, naming the actor, the method and the prediction, and then spawns the bring-up script. That script takes an operating-system lock. If it holds the lock it heals a few known bad states first, then starts each service in a way that is safe to repeat. It checks the ports, runs a proof step over the overlays, and opens a window only if none already exists. If the lock is held by someone else, the extra copy exits immediately having started nothing.

The third diagram is the graceful close. It refuses outright if the system is currently sending a live stream. Then it stops the thing most likely to restart something, asks each service to shut down cleanly, closes the broadcast application politely before ever forcing it, and sweeps a second time to verify the teardown. A note records that the frame, the witness and every remote door were untouched, and that the colony stayed answering throughout.

The fourth diagram is the journey: a sequence of named steps from studio-ready through going live to off-air, held on disk so it survives a restart. A polled read measures the world and reports honest detail, and a note states the law burned in after an incident: a read never causes anything to happen.

The fifth is going live, and its point is that the final key stays human. The operator types a confirmation in the console, and the document says no agent can ever do this. Going off air is one click and is never refused.

The appendix is the incident record. A verify step used to trigger the open-everything action as a side effect of being read. A later change removed the guard that had made it happen only once, so every poll from every open tab started another copy and dozens stacked. Three independent breakers are now in place, and the page says any one alone would have stopped it. The files recording what was run, and the gate rows, are named at the end.
