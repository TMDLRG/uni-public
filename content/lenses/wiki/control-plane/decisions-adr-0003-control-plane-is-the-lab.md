---
lens_schema: 1
scope: wiki
key: control-plane/decisions-adr-0003-control-plane-is-the-lab
corpus: control-plane
source_sha256: 10ef88e41447da5f
source_body_sha256: 10ef88e41447da5f
source_title: ADR-0003 — The Control Plane is the lab; the room and the machinery are one body
source_words: 487
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

Where the work happens is what this dated record settles. It records a choice, not a finished thing: at the time of writing, the lab view did not exist and had to be built.

The choice is that the part of the platform which runs the science *is* the lab. Its interface is meant to be an immersive rendered environment rather than a dashboard, and it lives inside that same part rather than being a separate service.

The picture it describes is spatial. You author a judgement by standing at the thing you are ruling on. A run under way appears mid-room at a size you could walk around — its gate written down before the run started, and beside it the result that would show the claim wrong, all before there is an answer. Rooms have airlocks that need two keys. Projects are doorways into their own worlds. The signal-reporting part is the sky: always in view, never enterable.

The record admits the cost. A rendered surface is heavier to build and test than a form, and screenshot-based acceptance tests are required.

<!--CLEAR-->

A decision record whose subject was not yet built when it was written: it says the lab view does not exist and must be built.

The context is that every surface the platform already had either showed one world to an audience, or showed a machine's own state, or showed signals. None of them was a place to work across every project at once. The operator asked for something closer to a video game — an immersive experience that brings a person and the world into the lab. A follow-on correction ruled out the obvious shortcut: an existing god-view belongs to one world and is that world's view of itself, not a lab.

The decision is that the body which runs the science is the lab, that its interface is an immersive rendered environment rather than a dashboard, and that this environment is a container inside that body rather than a separate one.

The design is described in spatial terms and each spatial idea carries a meaning. You author a verdict by standing at the thing you are ruling on. The run under way renders mid-room at a scale you could walk around. Beside it stand the gate, written down before the run began, and the result that would show the claim wrong — all before the run has an answer. Rooms are volumes with two-key airlocks. Projects are portals: you look through to a world's own view, or step through to work in it, and a portal never re-derives that world's state or reimplements its renderer. The signal-reporting body is the sky — always in view, never enterable.

The consequences are stated both ways. In favour: there is no split between the tool that decides and the screen that shows deciding, so no state has to be kept in step between them. A room that will not open is itself the refusal, needing no dialog. Against: a rendered surface is heavier to build and test than a form, which is why screenshot-based acceptance tests are required; the record says the risk is reduced by borrowing an existing technique rather than inventing one. Neutrally, the lab is watched like anything else and gets no privileged view of itself.

Two alternatives were rejected by the operator: a dashboard, and reusing the existing god-view. A third — making the lab view a separate body — was rejected because it would put the room and its command path on opposite sides of a network boundary.

What would show this wrong is named at the end: if the lab view can display a state the command path did not produce, or if authoring a verdict requires leaving the room, the decision has been violated.
