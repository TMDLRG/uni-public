---
lens_schema: 1
scope: wiki
key: minecraft/runbooks-minecraft
corpus: minecraft
source_sha256: 00ecbe3191c4cde3
source_body_sha256: 07e26f7776614943
source_title: Watching the World in Minecraft
source_words: 496
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This runbook explains how to watch a running simulation inside a real block-building game. The terrain is built out of blocks and the agent appears as a glowing creature that is moved through it each tick, with a small crown above it that grows as the agent develops new organs.

It is careful to say what this is. The bridge is an observer only. It reads the state of the simulation to draw it, and it does not change what the agent perceives, so the boundary and the evidence trail are untouched.

The rest is practical. Which version of the game to use and why, what you have to supply yourself, and the one-time setup. The command that runs the bridge, how to connect and look around, a legend mapping terrain to block colours, and a short troubleshooting list.

When an agent dies, the next life is bred from the longest-lived genome so far, so the run continues without an end.

<!--CLEAR-->
This is a runbook for a viewing bridge. It lets you watch a running simulation from inside a real block-building game, where the terrain is drawn as blocks and the agent appears as a glowing creature moved through it each tick. A small crown above the agent grows as it develops sensing and manipulating organs, so morphology is visible at a glance. When an agent dies, the next life is bred from the longest-lived genome so far, so the world plays continuously.

The honest framing arrives in its own section. This bridge is an observer only: it reads the world's state in order to render it, and it does not change what the agent perceives, so the boundary around the agent and the separate falsifiable evidence trail are unaffected. That sentence is what keeps the display from being mistaken for part of the experiment.

The practical content begins with a version explanation. The machine has an older runtime, so an older release of the game is used on both server and client, and the reason is stated rather than asserted.

Prerequisites are listed as the reader's responsibility, including owning the game and installing that profile, with a note that no client installation was detected on the machine. A one-time setup block downloads the server, has the reader accept the licence themselves, and starts the server so the world generates. The configuration is described as preconfigured for remote console access with a flat world and a spectating mode.

Running the bridge is one command with a few options. It connects over the remote console, builds the world, spawns the agent and streams the simulation continuously. Then come instructions for connecting a client and moving around.

A legend table maps terrain kinds to coloured blocks, including one colour for hidden cavities, and describes how the crown encodes the agent's organs and stage.

A short section explains how the pieces map onto the engine: one component turns the world into block commands, another sends them over a plain socket with no dependencies, and a third steps the simulation and moves the agent.

The runbook ends with troubleshooting: what an unreachable console means, what to do about a failed download, why a client might refuse to connect, and what to check if the server does not start.
