---
lens_schema: 1
scope: wiki
key: evidence/handoffs-studio-agent-preview-thumbnail-honest-2026-07-15
corpus: evidence
source_sha256: d7b59fbed386f40d
source_body_sha256: d7b59fbed386f40d
source_title: STUDIO-AGENT LAUNCH PROMPT — honest live preview + thumbnail rework (2026-07-15)
source_words: 2276
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A launch prompt written for another session to execute, with a safety section first, because the broadcast is live while the work happens. The mission is to make a preview subsystem give a real live feel without paying for a full frame rate and, more importantly, to stop anything being labelled live when it might be black. It separates two signals that had been collapsed into one: a source existing and reporting in, and a recent frame actually being something other than black.

The gates for the work are to be appended as pending rows before any code is written, and a section of design constraints sets the performance budget the fix has to fit inside.

<!--CLEAR-->
A launch prompt, written to be pasted into a fresh session and executed, with an instruction to diagnose with receipts before changing anything.

The safety section comes first and is binding, because the broadcast is live while the work happens. It states what must not happen to the programme, notes that the capture involved is read-only with respect to what is on air, and requires that the one test which deliberately forces a source black be run on a scratch surface or scheduled off air, with an instruction to ask the operator to go off air if in any doubt.

Operating rules follow that were learned from real incidents: one program is launched only one way, never by hand and never force-killed, and it is already running, so talk to it over its socket. Reads never actuate. And there is a named first move for any question about the current state, with an instruction not to search the repository for it.

The mission is the operator's request restated as five concrete behaviours, each paired with what the code does today and where. Tiles should come alive when clicked rather than showing a stale still. The preview should move at a low frame rate rather than being a snapshot. Once a scene goes on air the preview should freeze while the programme refreshes on a calm heartbeat. An existing full-rate window must not be removed. And the fifth is marked as the binding law for the task: a black or absent frame must never be labelled live.

The defect section root-causes that with anchors. The signal being trusted is a registration and codec heartbeat, so a slot that merely reports in counts as live even if what it renders is black, and one label in the interface is set unconditionally, regardless of how fresh the picture is.

The honest primitive already exists in the code: a real frame is far larger than a black one, and a specific observed size for a black frame is quoted. So the fix is to gate every claim on a recent frame that is not black, and to separate two independently true signals, one saying a source exists and reports in, the other saying a recent capture is genuinely not black, with only the second allowed to read as live. The instruction is explicit: never collapse the two again, and name the awkward combination honestly instead of hiding it.

The rest describes the architecture being modified and the order of the work: fix the honesty first and the ergonomics afterwards, so a win can be attributed rather than tangled up with a second change. Changes go in as code rather than as a runtime patch, with the gate rows appended as pending before any code is written and the document updated in the same breath.

The fences come last and are mostly about scope and restraint: one directory only, no science gate, no key handling, no going live, one exception surface that touches the preview and never the programme, and a preference for landing and checking the honesty change read-only while the show is on.
