---
lens_schema: 1
scope: wiki
key: evidence/handoffs-cam-robust-media-source-2026-07-16
corpus: evidence
source_sha256: 47ac03253ce5adf7
source_body_sha256: 7f0cdd6f4fe8c020
source_title: Kill the fragile WebGL window-capture — move the cameras to a real media stream (scope, 2026-07-16)
source_words: 909
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A scoping note proposing to replace a fragile way of getting two camera views into a broadcast. The evidence that the current path is unreliable is unusually thorough. The pages render, and other methods can grab their pixels, yet the capture used for broadcast returns a near-black frame. Which of the two views works is effectively a coin toss per rebuild. The proposal is to stop capturing windows and turn each view into a real video stream through the one path that has been reliable in every test. None of it is built yet, so nothing here could be called a result.

<!--CLEAR-->
A scope document rather than a receipt recording a run that already happened. It proposes work that has not been done, and it opens by establishing that the problem is real rather than suspected.

The evidence is layered deliberately. The pages themselves render, shown both by grabbing the window directly and by reading pixels from the drawing surface. Yet the capture method used to put them on air returns a tiny near-black frame from that same window, even when it is visible and in front, and even after being forced to re-acquire. A rebuild makes a fresh source that either works or sticks black unpredictably, and releasing one does not free the other, which rules out a resource ceiling. The conclusion is that no amount of settings-fiddling makes this path reliable, and that it has already cost the live window twice.

The proposal is to stop capturing windows and instead turn each view into an actual video stream, using the render path that has been reliable in every test this session. That stream then feeds into the broadcast software through the same input class the remote cameras already use. A new supervised bridge would connect to each page, request a screencast, pipe the frames into an encoder, publish locally, reconnect when the page drops, and expose a health endpoint.

The remaining pieces are listed as edits rather than inventions: switch three sources from window capture to a media source, add the bridge to the supervisor and to the bring-up ordering, and add the publish paths. A gate is named, requiring both a ready path and a non-black frame judged by an honest pixel classifier.

Why this would be durable is argued in three lines, and a scope-and-cost section gives the size of the change. One firm instruction comes with it: do not rush this in a thrash, and land it deliberately with a cold bring-up rather than on top of a live feed.

The last two sections are about the present. A set of camera-topology changes has already landed and is described as boot-persistent, including retiring a legacy camera bot, re-pointing a forwarder, and resolving a login fight between two bots that had frozen the camera. And the interim advice is practical: only one of the two captures is reliably live at a time, so put the working one on air and accept that the other composition is unavailable until the fix lands.
