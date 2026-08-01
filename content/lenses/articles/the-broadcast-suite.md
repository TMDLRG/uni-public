---
lens_schema: 1
scope: article
key: the-broadcast-suite
corpus: 
source_sha256: 19122e241c0325f5
source_body_sha256: 19122e241c0325f5
source_title: The broadcast suite
source_words: 2675
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

This page explains how the project turns its colony into an actual live television programme, and
then how to run it. It is the part of the system with the most moving parts and the least written
about it, so the page does both jobs at once.

The first thing it insists on is that two studio systems exist with different scene contracts, and
that a guide blending them is wrong. One of them airs; the other is a later design that has not yet
run. Everything the page describes is the one that airs. It walks the chain from the game world to a
public platform, marking which stages are automatic and which need a person. It describes the scenes,
and the show itself, which is a data file with its own checks. It also describes a word filter that
refuses claims the project will not make, while admitting the filter is blunt and cannot tell a claim
from its denial.

It then covers going live. Several code paths can start a stream, all of them run through one guard,
and today that guard refuses all of them. The running instructions begin by telling you to put a
password on the control socket first.

<!--CLEAR-->

This is the longest article on the site and it does two jobs: explain the broadcast, then tell you
how to run it — the subsystem with the most moving parts and the least written about it.

It insists first that there are two studio systems with different scene contracts, and that any guide
blending them is wrong. One is the operated studio that actually airs, driven from
a Windows render box. The other is a later containerised design whose own scene builder and verifier
declare themselves authored but not yet run on node hardware. Everything that follows describes the
first.

The chain to air is set out stage by stage, each marked automatic or operator. Two carry design
decisions worth knowing. The world view is captured as a window rather than loaded as a browser
source, because the embedded browser hits a limit on heavy content and renders black. And the encoder
runs once, every destination receiving a copy of the same bytes.

The scenes are built by a program that tears everything down and rebuilds it, refuses to run while
streaming unless forced, and boots every microphone and camera muted. One scene belongs to no group,
which means it cannot be previewed, which means the only route to it puts it straight on air. That is
recorded openly and answered by a check that fails if anyone schedules it, not by deleting it.

The show itself is a data file rather than a script, its rows carrying the scene, what is on screen,
the host's beats, the caption, and what must never be said. Its verifier runs a short list of checks,
and the article is more interested in what they check for than in their passing. That the show is not
empty. That every scene it names exists in the build, and that no row names the unpreviewable one.
That captions pass the word filter, and that the clock closes by arithmetic and by the file's own
declared total. And that nothing in the show can start a stream.

The word filter refuses a list of claim words, names the offending word, suggests a rewording, and
logs any override rather than passing silently. The article is candid that it is blunt: one caption
trips on a word inside a sentence denying that very thing, and the answer was to speak that caption
aloud rather than weaken the filter.

Going live runs through one guard, required by every path that could reach it, with the completeness
of that list enforced by a walk over the scripts rather than by memory. The guard requires several
conditions and today refuses everything. What it does not cover is stated plainly. It binds this
codebase's paths, not the machine, so anything on the render box that can talk to the control socket
bypasses it entirely. That is why the running instructions open by telling you to set a password on
that socket.

The rest is operational: bringing the stack up in a health-gated order, building the scenes, proving
the overlays are on screen, driving the show, arming the fan-out, and a pre-flight. It stresses that
the test cannot tell you that you are on the air; only the platform's own dashboard can. And it lists
the honest limits of a long run: no soak test, a capture failure with detection but no automatic
recovery, two supervisors that disagree under air, and an emergency stop no human has fired.
