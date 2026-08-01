---
lens_schema: 1
scope: wiki
key: evidence/receipts-preview-honest-preregistration-2026-07-15
corpus: evidence
source_sha256: c56088c664e2ed23
source_body_sha256: d50a01cd091cde3c
source_title: RED pre-registration — honest live preview/thumbnails + on-air broadcast-test unblock (2026-07-15)
source_words: 2026
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A pre-registration that names its pass and fail conditions before the change, with the cures recorded underneath as they landed. The core problem is that an attached or live label was a registration heartbeat rather than evidence that anything had been drawn, so a source could read live while its picture was black. The fix makes existence and rendering separate bits, each true by frame. The page also names the floor it accepts and the case where that floor would still let a black frame through. Several gates stay pending as a result, and the periodic on-air test was itself blocked while the stream was already running.

<!--CLEAR-->
A pre-registration written before the change, with the cures recorded underneath as they landed, so the page reads as a promise followed by two receipts.

The reason is stated in two parts. The labels an operator trusts were heartbeats about registration and codec rather than evidence that anything had been drawn, so a source could read live while its picture was black. Separately, the periodic test could not run while already broadcasting, because it unconditionally reconfigured and restarted the stream.

The honest primitive already exists in the code and is quoted with corroboration from another receipt the same session: a real frame is far larger than a solid black one, so rendering becomes a size threshold combined with a freshness window, while existence stays a separate bit. Black is never live.

The gates are given as a table, each with a pass condition and a falsifier. They cover the honesty split, the refresh rates for the different panels, that the preview freezes once a scene is on air while the programme keeps refreshing, that an existing high-rate window still works, that the new cadence stays within a stated cost budget, and that the periodic test can run to completion without knocking the show off air.

A fence separates two meanings of one word. Here live means broadcast video, never a claim about life or awareness, and the collision with another use of the same token is named as out of scope and not made any worse.

The first cure lands the honesty split, described as the highest-leverage change and taken before any ergonomics. The receipts are what make it convincing: stale scenes read as no signal despite carrying plenty of bytes, which is the honest de-escalation, and the programme reads live again only after a fresh check. One label is changed from a bare live to a statement of what is actually known about it.

The known floor is stated rather than hidden. The size threshold catches an absent or solid black frame, but would pass a particular kind of black frame from one source type, which is largely moot in the current configuration, and the fix-forward is named. What is not done is listed too, with the gates that stay pending as a result.

The second cure adds the live feel, and its guards are the interesting part. The loop captures only the armed scene, and only while somebody is actually looking at it, pausing during other work, with a guard against overlapping runs. It never touches the scene that is on air, so a taken scene freezes to a still while a separate, slower check owns the programme.

A later section records a separate fix on the other machine, where an address had been baked in at deployment and is replaced by a name that survives the address moving. A gotcha is recorded so the next person does not repeat it: starting a container from a transient unit ties its port forward to that unit's lifetime, so the forward dies while the container stays up and healthy internally. The residual is honest. The durable recipe lives in another lane, so if it is ever redeployed from a script that bakes an address in again, this regresses.
