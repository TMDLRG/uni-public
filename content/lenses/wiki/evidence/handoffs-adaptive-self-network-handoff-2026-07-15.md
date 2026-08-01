---
lens_schema: 1
scope: wiki
key: evidence/handoffs-adaptive-self-network-handoff-2026-07-15
corpus: evidence
source_sha256: 7a270ec342120789
source_body_sha256: dbaaeda46f1e1caa
source_title: HANDOFF — UNI-OS Adaptive Self-Network (2026-07-15)
source_words: 1148
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A handoff written after a power cut took the network out, and it is mostly a plan for work that has not been done. The diagnosis is concrete: an address handed out by the router changed, and several things had that address written into them as a literal, so name resolution stopped even though the stable internal identity was fine. The commitment it sets is that the fleet should carry its own naming internally and keep working under any external addressing at all. The self-healing piece that would do that does not exist yet.

<!--CLEAR-->
A handoff written to be pasted into a fresh session, and most of it describes work that has not been done. It opens with the discipline it binds the reader to: observe before claiming, never assume from training data, say not verified when something was not checked, one change at a time, everything reversible, and name the pass and falsify conditions before the change rather than after it.

Then the architectural commitment, set by the owner. The fleet is to be its own network authority, carrying its naming and identity internally so that it works under any external addressing, including addressing that changes, because some deployments have no access to the router at all. Each external uplink is treated as disposable and untrusted, and when one changes only the outward edges reconcile while the internal fabric carries on.

The root cause of the outage is recorded so that nobody re-derives it. An address changed, and core addressing had been pinned to that transient address in literals on two machines, so one service stopped answering on the local network and another lost a whole name zone. The blast radius is counted in files, and the point is made that the name-based path would have healed itself if the map had been dynamic. The missing capability is then named directly: a reconciliation loop that updates records when an address changes does not exist. A further observation is that one machine is not on the internal mesh at all, so its resolution rides the transient plane.

What was already done is limited and reversible: binds made to follow the interface rather than a literal, records corrected, and one script retargeted. The reader is asked to confirm those held, and told that if the address has moved again, that is exactly what the first phase automates.

The phase ladder is the work itself, each rung with a gate attached. A self-healing beacon on each machine. Making every capable machine a first-class member of the internal fabric. Core services running in more than one place behind a single name that resolves to a healthy server. Discovery over many transports, down to an audio channel from speaker to microphone when every network path is lost. And a security loop that stays flagged as open until it is done.

The closing sections ground the reader in where the code lives and what must not be crossed: no addresses written as literals, one command that must never be run because it would flush rules another stack depends on, the live colony left alone, reads that never actuate, and receipts or an explicit statement that something was not verified.
