---
lens_schema: 1
scope: wiki
key: control-plane/decisions-adr-0007-ui-contract-amendment
corpus: control-plane
source_sha256: 5c77ba41e593557b
source_body_sha256: 5c77ba41e593557b
source_title: ADR-0007 — The `ui/` read-only contract is clarified, not widened
source_words: 601
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

A rule came under pressure to be loosened, and was not. That is the whole of this short dated record.

The web part of the codebase carries a written limit: it is the only place external dependencies live, and it only ever reads the core's state and evidence log. But the lab view — the surface an operator authors verdicts from — renders in that same web part. A surface that authors cannot sit inside an app that never writes.

There were two ways out: widen the limit, or make the surface ask rather than act. The record says plainly that widening a written limit to fit a new feature is the failure mode this architecture exists to prevent, because that is how a control gets weakened one convenient exception at a time.

So the limit is clarified instead. The web part still never writes engine state, never adds to the gate ledger — a list only ever added to, never edited — and never writes a receipt, the file recording what was run. It gained exactly one new ability: it may submit a command, and the core validates, authorises and performs every write itself. The surface proposes; the core authors.

<!--CLEAR-->

A boundary that was tempting to widen is the subject of this short dated decision record, which is marked as authorised by the operator.

The context is a sentence written into the build file of the web part of the repository. That part is the only place external dependencies live. The pure core stays dependency-free, and the web part consumes the core as a path dependency, only ever reading its state and its evidence log. The record says this limit was deliberate and that it has held. The difficulty is that the lab view is a surface an operator authors verdicts from, and it renders inside that web part. A surface that authors cannot be inside an app that never writes.

Two resolutions were available: widen the limit, or make the surface a proposer. The record chooses the second and states the reason as a general principle. Widening a written limit to fit a new feature is the failure mode this whole architecture is built to prevent, because it is how a control gets weakened one convenient exception at a time.

The decision therefore clarifies rather than widens. The amendment first restates what the web part still may not do: it never writes engine state, never adds to the gate ledger (a list only ever added to), and never writes a receipt (the file recording what was run). Then it names the single new ability precisely — it may submit a command to the core, which validates, authorises and performs every write itself. A view that mutated a ledger, a row or a receipt directly violates the contract exactly as it did before. Three older consequences are carried into the amendment and stay binding. A polled read still actuates nothing, inherited word for word from another body's law. The write path stays testable offline in the dependency-free core. And the web part remains the only place external dependencies live.

The consequences are given honestly in both directions. In favour: the lab view can exist without any component gaining write access it should not have, and the rule stays one sentence a reviewer can check — does this code write, or does it ask? Because the write path lives in the dependency-free core, every refusal can be tested offline and repeatably. Against: a round trip is added, so a verdict cannot be written from the rendering process. The record says that is the intent, not a cost to be optimised away. Neutrally, the change adds only comment lines; no code, no dependency and no behaviour changed by this record alone.

Three alternatives were rejected. Widening the contract to read-and-write would remove the only mechanical statement of the boundary. Leaving the contract untouched and moving the lab view into a separate project is viable, but it duplicates a whole stack for one surface and puts the room across a network boundary from the views beside it. It is left open to revisit. Saying nothing and simply adding the route was rejected outright, because a silent contract change is indistinguishable from a violation and a later reader would have no way to tell which it was.

What would show this violated is any write to engine state, to the gate ledger, or to a receipt originating from the web part, and any polled read there that actuates something. A short receipt at the end records the amendment as comment-only, and notes that a pre-existing modified file in that tree is owned by the user and was not touched.
