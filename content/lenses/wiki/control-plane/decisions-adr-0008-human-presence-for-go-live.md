---
lens_schema: 1
scope: wiki
key: control-plane/decisions-adr-0008-human-presence-for-go-live
corpus: control-plane
source_sha256: acd0afaab24d14a0
source_body_sha256: acd0afaab24d14a0
source_title: ADR-0008 — Human presence is required to go live
source_words: 981
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

Read the status line first: this record is proposed and not adopted, and it says of itself that it is not in force. It was drafted so that the operator has something concrete to rule on, and he has not yet ruled. Amending a contract is his, never an agent's.

What it proposes is that going live — putting a broadcast on air — requires evidence that a human is present at the desk, and that every path to air passes one chokepoint. The token it asks for must exist, be freshly minted, come from an interactive desktop session, and be usable once. Absence is refusal, never a quiet default to yes.

The record is unusually honest about what this does not buy. It calls its own claim level presence-evident and says outright it is not unforgeable. A process already inside the operator's own live session could replay the token. And the deeper limit is that the broadcast software's own control socket has no authentication at all, so the guard binds this codebase's paths, not the machine.

The minting side does not exist yet, so nothing can currently be allowed.

<!--CLEAR-->

Nothing here is decided, though it is written as a decision record. The status line says proposed and not adopted, and the text repeats that the document is not in force. It was drafted by an agent during a remediation step so that the operator would have something concrete to rule on; amending a contract is his call. The record notes that while it waits, the code it describes is already built and already refusing — the door is shut and nothing can open it.

The context is a declared failure mode: if an agent requests going live, the system should refuse, because going live is meant to be typed by a human. Measured before this work, the record found several code paths that could reach the broadcast start command, and between all of them only two string comparisons. Most asked for nothing at all. One was found only while the gate was being built, because it takes its request from a file named on the command line and never contains the relevant word.

The proposal is that going live requires a human-presence token and that every path to air passes one chokepoint, a single guard that is the only function permitted to say yes. The token must be present, since absence is refusal rather than a default to allow. Fresh, because it attests presence a moment ago and nothing longer. Interactive, minted by a desktop session, which excludes service sessions, scheduled tasks, remote shells and every script in the repository. And single-use, so it cannot be replayed. Refusal throws rather than returning a value, because a refusal you can assign to a variable is a refusal you can ignore — which the record says is how most paths came to have no guard at all. The typed confirmation word is kept where it existed, but only against a slip of the hand.

The most important section limits the claim. The record names its own level as presence-evident and states that it is not unforgeable, and says this wording appears in the module, in every grant, in the gate output and in the operator's prover. What it buys: no headless agent, service process, scheduled task, remote shell, continuous-integration job or script in the repository can go live. What it does not buy: something already running inside the operator's live desktop session, able to read the token, could replay it before it expires. And the harder limit is that the broadcast software's control socket listens locally with no authentication, so a few lines of code that never import the guard reach the same actuator. The guard binds this codebase's paths to air; it does not bind the machine. Closing that is a change to his own studio configuration, and is his.

The record is equally plain that the minting side does not exist. The intended mechanism is named as a planned interactive widget, and building it is what would open the door. So the present state is that every path refuses and there is no way to make one allow. That is correct for a guard: going live is closed by construction until the record is ruled on and a mint is built.

It closes with three questions for the operator. Whether presence-evident is an acceptable claim level for opening a public broadcast. Whether authentication should be enabled on the broadcast control socket, which is the only thing that would make the guard bind the machine. And who mints a token, and from where.
