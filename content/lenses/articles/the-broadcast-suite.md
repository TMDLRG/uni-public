---
lens_schema: 1
scope: article
key: the-broadcast-suite
corpus: 
source_sha256: 67c5b6818843af83
source_body_sha256: 67c5b6818843af83
source_title: The broadcast suite
source_words: 2952
authored_by: claude-opus-5
authored_at: 2026-08-24
review_state: draft
reviewed_by: 
reviewed_at: 
note: 2026-08-24 the source moved. Three things were added to the running half - a superseded script that now refuses, a quiet-by-default boot path, and the voice server. Both lanes revised to carry them.
---
<!--PLAIN-->

This page explains how the project turns its colony into a live television programme, and
then how to run it. It is the part with the most moving parts and the least written about it, so it does both jobs at
once.

It insists first that two studio systems exist with different scene contracts, and that a guide
blending them is wrong. One airs; the other is a later design that has not yet run, and everything here describes the one
that airs. It walks the chain from the game world to a
public platform, marking which stages are automatic and which need a person. It describes the scenes, and the show itself, a data file with its own checks. It also describes a word filter that refuses claims the project will not make, admitting it is blunt
and cannot tell a claim from its denial.

It then covers going live. Several code paths can start a stream, all run through one guard, and today that guard refuses all of
them. The running instructions begin by telling you to password the control socket. It also flags a superseded script that now refuses to run, a boot path that comes up quiet unless
told otherwise, and a voice path where sound in the room is not sound on air.

<!--CLEAR-->

The longest article on the site, doing two jobs: explain the broadcast, then tell you
how to run it — the subsystem with the most moving parts and least written about it.

It insists first that two studio systems exist with different scene contracts, and that any guide
blending them is wrong. One is the operated studio that actually airs, driven from
a Windows render box. The other is a later containerised design whose scene builder and verifier declare themselves
authored but not yet run on node hardware. Everything that follows describes the
first.

The chain to air is set out stage by stage, each marked automatic or operator. Two carry design
decisions worth knowing. The world view is captured as a window rather than loaded as a browser
source, because the embedded browser hits a limit on heavy content and renders black. The encoder runs once, every destination getting a copy of the same bytes.

The scenes are built by a program that tears everything down and rebuilds, refuses to run while streaming unless forced, and boots every microphone and camera muted. One scene belongs to no group, so it cannot be previewed, so the only route to it puts it straight on
air. That is recorded openly and answered by a check that fails if anyone schedules it, not by deleting it.

The show itself is a data file rather than a script, its rows carrying the scene, what is on screen,
the host's beats, the caption, and what must never be said. Its verifier runs a short list of checks, and is more interested in what they check for
than in their passing: that the show is not empty; that every scene it names exists in the build and
no row names the unpreviewable one; that captions pass the word filter; that the clock closes both by
arithmetic and by the file's own declared total; and that nothing in the show can start a stream.

The word filter refuses a list of claim words, names the offender, suggests a rewording, and
logs any override rather than passing silently. The article is candid that it is blunt: one caption trips on a word inside a sentence denying it, and the answer was to speak it aloud rather than weaken the filter.

Going live runs through one guard required by every path that could reach it, the completeness of
that list enforced by a walk over the scripts rather than by memory. The guard requires several conditions and refuses everything today. What it does not cover is stated plainly: it binds this codebase's paths, not the machine, so
anything on the render box that can reach the control socket bypasses it. That is why the running instructions open by telling you to password that socket.

The rest is operational: bringing the stack up in health-gated order, building the scenes, proving
the overlays are on screen, driving the show, arming the fan-out, and a pre-flight. It stresses that the test cannot tell you that you are on air; only the platform's own dashboard can. Three things in the running half are singled out: a superseded script that now refuses to run, kept so the
documents citing it explain themselves; a boot path that comes up quiet unless a
flag says otherwise; and the voice, where sound on the machine is not sound reaching the broadcast.

And it lists the honest limits of a long run: no soak test, a capture failure detected but not automatically recovered, two supervisors that disagree under air, and an emergency stop no human has fired.
