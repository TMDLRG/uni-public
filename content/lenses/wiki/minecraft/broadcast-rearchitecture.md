---
lens_schema: 1
scope: wiki
key: minecraft/broadcast-rearchitecture
corpus: minecraft
source_sha256: 4ff031f238a05e21
source_body_sha256: 4ff031f238a05e21
source_title: Broadcast re-architecture — composition outside OBS (workflow-verified plan)
source_words: 601
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is a plan, not a finished build. It describes a change to how a live video picture is put together, and it is written as a recommendation with two phases.

The problem is simple. The broadcasting software cannot draw several web pages at once on this particular machine; it renders black or falls over. The proposed fix is to move the whole job somewhere else: build the entire picture, including the frame around it, inside one ordinary browser page, then hand that single finished picture to the encoder as if it were any other window. Scene changes then happen inside the page rather than in the broadcast software.

The first phase keeps the existing encoder and simply points it at that one window, so the stream never stops and a rollback is one step. The second phase, after a burn-in period, drops the broadcast software entirely in favour of a headless browser feeding a command-line encoder.

The page ends with a list of specific traps found by testing on the actual machine.

<!--CLEAR-->
This document is a phased plan for rebuilding how a live picture is composed, written after testing the idea on the actual machine. It states the problem, the fix, what was checked, a recommendation in two phases, a build order, and a list of traps.

The problem: on a computer with two graphics chips, the broadcast software cannot composite several web feeds at once. It renders black or crashes. The fix, credited to the operator, is to stop asking it to. Instead, compose every feed and the surrounding frame in a single browser page running on the real graphics chip, and give the broadcast software one job it can do: capture that one window and encode it. Scene control moves into the page itself.

A short section records what was checked on the box rather than assumed. The composite page renders in a real browser, and a panel that came out black inside the broadcast software renders fully. A security header on the serving side was already adjusted so that another surface can be embedded in a frame.

The recommendation is a hybrid. The first phase changes almost nothing: the broadcast software becomes a dumb encoder capturing one window using a specific capture method, because the older method returns a blank picture for a browser drawn on the graphics chip. The existing output, encoder and looping soundtrack stay. Because it is a single-source swap on the live scene, rollback is instant and the stream never stops. The second phase, after a burn-in period, removes the broadcast software altogether: a headless browser streams frames over a debugging channel into a command-line encoder that also loops the audio and pushes the stream out. That version has no window to occlude and carries over to a headless machine. The page notes that the composite page itself is identical in both phases, so it is built first.

A layout section then describes the composite page precisely: a hero camera on the left, an appliance view on the right, a transparent overlay across the whole stage that ignores the mouse, and a top layer carrying the title, a live indicator, feed tabs and branding. The window title is chosen to match what the capture script looks for.

The build order is numbered, and step two is called the go or no-go point: launch the page in a real browser and check that the camera actually paints, since a black picture there will be black later too. Other steps cover pinning the browser to the faster graphics chip, adding audio to the live scene before the switch so a naive swap does not drop the music, the cutover itself, the burn-in, and the second-phase work.

The final section lists traps an adversarial pass caught on this machine: a capture method that is dead for browsers drawn on the graphics chip, a redirect and a self-signed certificate that need specific flags, missing audio on the live scene, an audio sample rate and a looping click that call for pre-conversion, and a changed command-line option in a newer encoder version.
