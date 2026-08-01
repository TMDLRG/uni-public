---
lens_schema: 1
scope: wiki
key: minecraft/studio-operator-manual
corpus: minecraft
source_sha256: f48566dde54535e6
source_body_sha256: be7500448aad4678
source_title: UNI Broadcast Studio — Operator Manual
source_words: 2068
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is the manual for running a show, as opposed to switching the machine on, which is a separate document.

It opens with the mental model, and that is the part worth reading even if you never touch the studio. One application composites a single picture. You never touch it directly during a show; you drive it from a console. Scenes are pre-built arrangements that land in a preview first and only reach the audience when you take them. Camera roles are positions rather than devices, so reassigning a role updates every scene at once. And the true live monitor is the mixer's own window, because the panels in the console are lightweight snapshots rather than video.

The air state has four named readings, computed every second from the mixer rather than assumed, and the difference between being public and being visible on the air is kept distinct.

A claim fence governs anything that appears on screen.

<!--CLEAR-->
This is the operator's manual for running a show. A sibling runbook covers switching the machine on; this document covers driving it once it is up. A line near the top binds everything that follows: on-screen text describes behaviour and viability learning, never experience or awareness, and the science ledger at the time of writing is quoted with two results that are partial and provisional.

Two banners correct the body. One updates the section on going live to describe the current path, names the single control that puts a show on air, and adds two new sections. The other marks the whole manual as operating an interim system and names the canonical map to read first.

The mental model is the most valuable section and it is short. One application composites a single picture. The operator never touches it directly during a show, but drives it from a console. Scenes are pre-built arrangements which land in a preview and only reach the audience when taken. Camera roles are positions rather than devices, so assigning a camera to a role updates every scene that uses it at once. And the true live monitor is the mixer's own window, because the console panels are deliberately lightweight snapshots rather than video.

The air state is defined as four named readings computed every second from the mixer's real state rather than assumed, and it keeps two things apart that are easy to conflate: being publicly streaming, and being visible or audible on that stream.

The remaining sections work through the console top to bottom, the catalogue of scenes by show mode, camera roles and voice, content sources, connecting a remote camera from another computer with nothing to install, overlays and the honesty check applied to their text, a health panel with an automated preflight, going live, troubleshooting and a glossary. One scene is singled out as belonging to no group, with the consequence spelled out rather than left as a surprise.

The troubleshooting section is the most practical part, because each entry names a symptom and its actual cause rather than a generic remedy. A remote camera showing black is publishing in a format the mixer cannot take, and there is a link that pins a compatible one. A page-based scene showing black has hit a rendering limit, so use a simpler page or fall back to capturing a window. Overlays vanishing is not a fault at all: they hide themselves a few seconds after the console stops writing, which is deliberate staleness handling rather than a bug. A console that feels slow is expected, because the panels are snapshots and the real monitor is elsewhere.

A glossary at the end defines the switching vocabulary, the roles and slots, the publish route from a browser, the honesty check, the four air readings, the real monitor and the fan-out.
