---
lens_schema: 1
scope: wiki
key: evidence/receipts-door-lifecycle-circle-2026-07-14
corpus: evidence
source_sha256: d53282aa332c990c
source_body_sha256: d53282aa332c990c
source_title: Receipt — door-lifecycle-circle (the circle written in code) — 2026-07-14
source_words: 533
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A receipt — a file recording what was run — for a piece of software that treats everything openable as a door. For each one it records how it opens, how it closes, and whether it is currently ready to do the opposite of whatever it is doing. Most of the drilled legs passed: a graceful close-all shut everything down cleanly, one key brought it all back, and a prediction the system made about itself came true on the timescale it named. One leg is honestly marked partial: a stubborn program ignores a polite request to close, and the receipt does not round that up. A hard limit holds in the middle of it: ask to close anything belonging to the colony and the answer comes back refused.

<!--CLEAR-->
A receipt — the file recording what was run — with a mixed verdict, and the mix is deliberate. The drilled legs pass; the one leg that closes a particular program politely is recorded as partial rather than folded into the total.

What was built is a lifecycle engine: a register of doors across several scopes, each with a state and four routes, which are how it opens, closes, locks and unlocks. Over the top sits an invariant that an open door must be ready to close and a closed one ready to open. It keeps an append-only audit trail, publishes its register, and offers one key that opens or closes everything. A graceful shutdown path stops the thing that would otherwise resurrect processes first, then asks each service to stop, and forces only as a last resort.

There is a hard limit in the middle of it. Doors belonging to the colony do not open or close at all. The answer comes back refused, with a message saying this system only observes the bodies and never affects them. Such changes belong to the operator, through the approval queue. The drill shows that refusal as a real response rather than as a claim about one.

Then two designs that were falsified and corrected forward rather than quietly rewritten. First, processes spawned detached died mute, writing a log header and nothing else; this was caught by re-running the identical command attached and getting full output, and the same latent fault was fixed in an older path that shared it. Second, a tray-minimised program ignores the polite close, so the force fallback fires; the guarantee was therefore moved to the start side, where every open path clears the markers that would otherwise leave it stuck in a limited mode.

The drill outputs are quoted, including a prediction the engine made about its own next transition, which then happened. The close-all ended clean while the parts that watch the colony stayed up and the colony itself was untouched throughout. A closing section lists the papercuts that stay open.
