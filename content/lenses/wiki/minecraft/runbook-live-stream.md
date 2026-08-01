---
lens_schema: 1
scope: wiki
key: minecraft/runbook-live-stream
corpus: minecraft
source_sha256: 14f8e79ef4605106
source_body_sha256: 13a35b5f65f2dd41
source_title: Runbook — UNI Minecraft Colony Live Stream
source_words: 975
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
Bringing a live colony and its stream back up is what this runbook is for, and it carries two banners saying parts of it are stale. One says a newer document overrides it on conflict. The other, set by the owner, corrects which machine the colony runs on, so any instruction here about running it locally is out of date.

What survives is the practical core: a start sequence in three steps, the settings and addresses in a table, how to reset the world to a known good seed, how to populate the colony, how to check it is healthy, and how to shut down gracefully.

Two gotchas are called critical and are the reason the page exists. Running a second copy of one component makes two cameras fight over the same port and the same login, which cascades into something that looks like an entirely different fault. And a machine with two graphics chips renders the view badly inside the broadcast application, and the software renderer cannot draw the terrain at all, so a real browser window is captured instead. The page closes with a short list of the commits from that session, the last of which adds nothing but a build-and-proof plan.

<!--CLEAR-->
Bringing a colony and its stream back up is the job of this runbook, and it is honest about its own age. Two banners sit at the top. The first marks it as an interim document for an older arrangement and names a newer one that overrides it on conflict. The second is an owner-set architecture correction stating which machine the colony runs on and which machine captures it, with the explicit note that any instruction here about bringing it up locally is stale.

What remains useful is the practical core. A short start sequence gives three things to start in order, with a note that everything runs in one node, and then says to launch the broadcast application with the right profile and start streaming.

Two gotchas are marked critical, and they are the reason the page exists. The first is running a second copy of one component. Doing so spawns a second camera, and the two fight over the same port and the same login, cascading into a crash loop whose symptoms look like an entirely different problem: too few agents, flapping, or a white picture. The page says plainly that this single mistake caused most of the pain.

The second concerns a machine with two graphics chips. With hardware acceleration on, the browser source in the broadcast application crashes and the picture goes white. With it off there is no crash, but the software renderer draws the moving entities and cannot draw the terrain, so the broadcast shows empty ground while a real browser on the same address renders the full forest. The robust fix is to capture a real hardware-accelerated browser window instead of using the built-in browser source.

A table of key facts follows, covering the node and its cookie, the game and console ports, a known-good world seed with a note about why it is good, the stream and camera addresses, where the saved minds live, and where world backups go.

Further sections cover resetting the world to a fresh forest, including a verification step to confirm the new world is inland before trusting it, because a random seed can land in a coastal area that looks stripped. Then how the population is maintained automatically within a range and how to spawn manually.

A health-check section gives the commands and, more usefully, what a good reading and a bad reading look like, with the bad one describing agents that have dug to the bottom and can no longer reach wood. It explains the build chain step by step and states that it only works on a forested surface with reachable trees, which was the whole of an earlier problem.

The remaining sections list the helper scripts written during that session, a graceful shutdown sequence that saves the world and the minds before killing anything, a note about which unrelated processes to leave alone, and a short list of fixes applied with their commits, the last of them adding only a build-and-proof plan document.
