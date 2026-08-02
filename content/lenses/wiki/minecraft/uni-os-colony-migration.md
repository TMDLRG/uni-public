---
lens_schema: 1
scope: wiki
key: minecraft/uni-os-colony-migration
corpus: minecraft
source_sha256: 7a752bf0aafe8a47
source_body_sha256: e024fab6e517e0c2
source_title: UNI Minecraft Colony → UNI.OS appliance — migration plan + OS-agent prompt
source_words: 543
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A running colony is being moved off one machine and onto a different appliance, and this dated plan frames the move itself as a live broadcast event.

It opens with the state at the time of writing. The old world is paused with its save intact, the stream is up showing a holding card, and one code fix travels with the colony.

Then come the facts about the destination machine, read off it rather than assumed, including that no colony container exists there yet and that every change that alters something waits on a human approval.

Two paths are described. The near one lifts the colony across as four containers, each named with its job, and notes that one piece is genuinely new on this machine because it needs headless graphics. The further one is a deeper convergence in which the colony becomes a world on the appliance's own runtime, and that is described as next rather than done.

The page ends with a prompt to hand to the agent doing the work.

<!--CLEAR-->
A dated migration plan with a broadcast attached to it. The colony is being moved off one machine and onto a different appliance, and the move itself is being shown live.

The status block records the position at the time of writing. The old world is paused after a graceful stop with the save intact, and the stream is up showing a holding card over a status page. One code fix is already in the source and travels with the colony.

A facts section describes the destination, and it is careful to say these were read through a management interface rather than assumed. It gives the machine's memory and disk headroom and its load, notes that it runs containers with elevated privileges, and lists what is already running there. Two things then matter for the plan: no colony container is present, because the colony has never run there, and every operation that changes something waits on a human approval in the appliance's own queue. A note says where data should live and which location to avoid.

The near-term path is a lift-and-shift as four containers, each described by its job. First the game server, with a fixed world seed and remote console enabled. Then the colony itself, which serves a status page and reaches the game server, carries the fix, and keeps the standing rule that its inference has no foreign computation layers. Then a set of bodies, and a camera. The camera is singled out as the one genuinely new piece here, because it needs a graphics context with no screen attached. Deployment notes cover a shared network so the parts find each other by name, persistent service definitions, and opening a firewall on the local network so the existing broadcast machine can capture the two surfaces during the changeover. Verification is named: the colony ticking, the camera rendering, and the status page serving. Then the broadcast cuts back from the migration card to the live scene.

The further path is described as next rather than done: the colony becomes a world on the appliance's own inference runtime, with the streaming also happening there. It is labelled as the deeper convergence work.

The page ends with a prompt written to be handed to the agent performing the work. It restates the plan as instructions, names what to report back, and repeats that every changing operation is approval-gated and must be surfaced for a human.
