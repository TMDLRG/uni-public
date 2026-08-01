---
lens_schema: 1
scope: wiki
key: evidence/handoffs-gaia-capture-before-destroy-2026-07-14
corpus: evidence
source_sha256: 22716459f304b265
source_body_sha256: 22716459f304b265
source_title: HANDOFF — capture-before-destroy: never waste a mind on the colony redeploy (2026-07-14)
source_words: 522
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is a handoff note from one agent to another, and it is a warning with a procedure attached. The minds of the running colony live only inside a container with no persistent storage, so the planned redeploy would destroy them unless they are captured first. That has already happened once. The note gives the exact commands to run before anything is removed, insists the integrity check must pass before destroying anything, and is honest that nothing enforces this. The watching system is read-only over the colony, so the checkpoint is a procedure a person runs, not a guard that stops them.

<!--CLEAR-->
A handoff between agents, written by the one that can see the problem to the one that can act on it. The stakes are stated in the first lines: the state of the running minds lives in a container with no mounted storage, so removing that container destroys it, and the pending redeploy does exactly that. It is not hypothetical, because an earlier rescue exists for the same reason.

The reason this is a warning rather than a fix is a boundary. The watching system keeps an append-only store with a chain of custody, but it is read-only over the colony and cannot intercept a removal. So capture before destroy is a procedure the receiving agent runs, or a hook they install, and the note says that plainly rather than implying a protection that is not there.

The checkpoint itself is three commands: capture into the committed tier, commit and push so the evidence is distributed rather than only local, and then verify integrity. The order is not optional. If the verification does not pass, stop, because destroying anything at that point would spoil the evidence.

Restoring afterwards is described next. The redeployed container starts empty, the latest captured state for each lineage sits in the committed store, and putting it back is a copy plus a restart. That path is fenced behind an owner go-ahead and a review, because returning a mind to a live stream is a decision rather than a chore. The custody ledger is named as the authoritative record of what was captured and what was restored.

Two closing sections keep it honest. A background loop already captures at intervals into a local tier, so a crash before the checkpoint loses at most one interval rather than everything. And the residual gap is named as somebody else's decision: the only way to make this unbypassable would be a hook on the colony side that captures before the container stops, which is a change on the receiving agent's surface, approval-gated, and recommended rather than done.
