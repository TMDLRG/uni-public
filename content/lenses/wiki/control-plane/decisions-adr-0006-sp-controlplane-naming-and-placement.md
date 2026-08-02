---
lens_schema: 1
scope: wiki
key: control-plane/decisions-adr-0006-sp-controlplane-naming-and-placement
corpus: control-plane
source_sha256: 36a8cfddf2326a31
source_body_sha256: 36a8cfddf2326a31
source_title: ADR-0006 — The body is `SP.ControlPlane`, and it lives in the zero-dep core
source_words: 642
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

Two small-sounding things turned out to matter, and a dated record settles both: what the new body is called, and which part of the codebase it lives in.

An earlier draft had put it inside the web application under a name already in use. A closer look at the real repository showed both choices were wrong. The name was taken twice over, meaning different things — one existing piece is the show's control plane, another is a set of pure physical models. Building a third thing under those names would have collapsed three distinct ideas into one, which is the failure this architecture exists to prevent.

The placement was worse. The root application is deliberately dependency-free so that its tests run offline, and the web application is contractually allowed only to read. A surface that authors verdicts had been placed inside the app forbidden from writing.

The decision keeps the operator's chosen name and disambiguates the collision in both directions rather than renaming anything. The new body lives in the dependency-free core; the lab view renders in the web app and only proposes.

<!--CLEAR-->

A naming question and a placement question, settled together in one dated decision record because they turned out to be the same mistake seen twice.

The context is an earlier draft that placed this body inside the web application, under a name already used elsewhere in the codebase. A deeper inventory of the real repository showed that both were wrong. Two existing pieces already carried the words in question, meaning different things. One is the live show's control plane, a singleton that assembles telemetry every beat. Another is a bounded, dependency-free set of pure physical and biochemical models that give the same answer every time. Building a third body under both names would have collapsed three distinct things.

The placement broke a written contract. The root application is documented as having no dependencies by design, so that its tests run fully offline and repeat exactly. The record notes that even a common encoding library is deliberately absent, with an existing test using the standard library instead and a comment saying so. The web application, meanwhile, is documented as consuming the core as a path dependency and only ever reading its state and its evidence log. A verdict-authoring surface had been placed inside the app that is forbidden from writing.

The decision on naming keeps the operator's word. The collision is resolved by explicit disambiguation in both directions rather than by renaming either existing thing. One namespace is the show's control plane, covering camera, narration, cast and broadcast. The new one is the science's control plane, covering gates, runs, verdicts, rooms, and receipts — the files recording what was run. The third remains the hard-science model namespace. A one-line clarification to the existing module's documentation is treated as part of the work, not an afterthought.

The decision on placement puts the new body in the dependency-free root application: pure, offline, repeatable, using only the standard library, and tested with the hand-rolled property tool already in the tree. The lab view renders in the web application and proposes; every write is performed by the core.

The consequences are stated both ways. In favour: the write path is testable offline with nothing web-related in the loop, which matches the repository's strongest convention, and the three bodies keep three names. Against: having no dependencies means no schema library, so the row schema has to be enforced by hand-written validation — reduced by extending an existing test that already does this, not duplicating it. Neutrally, the new name will read oddly beside the old one until the clarification lands, and it lands in the same change.

Three alternatives were rejected. A fresh top-level name would have sidestepped the collision, but the operator rejected it because it loses the meaning he set. Putting the body in the web application with the rest of that stack was rejected because it breaks the read-only contract and makes the write path untestable without the web dependencies. And a separate project is viable and kept as the fallback if the core ever needs a dependency, but is rejected for now.

What would show this wrong has three limbs. If the core ever requires an external dependency, the placement was wrong. If authoring a verdict requires the web application to write directly to the ledger — the list of results that is only ever added to — or to write a row or a receipt, the placement was wrong. And if a reader still confuses the two similarly-named things after the clarification lands, the naming was wrong.
