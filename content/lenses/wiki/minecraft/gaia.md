---
lens_schema: 1
scope: wiki
key: minecraft/gaia
corpus: minecraft
source_sha256: dd537f731078d2c4
source_body_sha256: 1eb24c61c2708cc8
source_title: GAIA — the world-visibility organ (canonical doc, DD)
source_words: 7348
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page is the canonical document for a read-only instrument whose whole purpose is to show what is measurably true across the project without ever interpreting it.

Its law is stated as non-negotiable. Every signal it emits carries where it came from, when it was captured, a digest and a length. It never summarises, scores, ranks, narrates or authors a verdict, and it never sets a gate. It is an instrument, not an actor.

The document opens with a table of measured state in which every row is a command result rather than an assertion: the server boots and serves real signals, three separate values were independently recomputed and matched byte for byte, a protocol handshake completed, touching a tracked file made a drift signal appear and reverting it restored the baseline, and the instrument mirrors and hashes its own source.

The honest gap is named in the same breath. Surviving a restart is unproven, and it is a separate piece of work.

<!--CLEAR-->
This is the canonical document for a read-only visibility instrument, and it is written in the project's document-driven style, meaning the page itself is the artifact that a gate compares against what the software actually serves. If the document, the code and the served capabilities ever disagree, a drift signal is emitted rather than the difference being quietly reconciled.

It begins with a status paragraph that mixes achievement and gap in the same sentence: the instrument is built, runs, self-verifies, and serves a large number of real signals with provenance, while one thing remains unproven, which is whether it comes back by itself after a restart. That is named as the next separate piece of work.

Section zero is a table of measured state where each row records how it was checked and what came back. The server boots, binds and serves. Three separate values were independently recomputed by hand and matched the served signals byte for byte and hash for hash. A full protocol handshake completed with the expected shapes. Touching a tracked file produced a drift signal carrying both the old and the new digest, and reverting the file restored the baseline. The instrument mirrors its own source files and its own manifest, and those hashes match what is on disk. One row is a wiring fix, recorded honestly as applied but not yet committed.

A following passage is worth the visit. Four failing checks were reconciled to passing, and the document states explicitly that each was fixed at its true root and never by weakening a check. In one case the check was looking for a digest inside a file that cannot contain its own digest. In another, the check was calling its own linter incorrectly, and once it actually ran it surfaced two real defects in the linter rather than one bug in the code. In a third, a pattern matched the wrong signal and a table had gone out of date.

The law is then set out as an objective function, followed by the frozen shape of a signal, its on-disk form, what is forbidden by construction and what is explicitly allowed, and a section on digest determinism which is called the single sharpest hazard.

Further sections give the declared capabilities as a table, the two cleanly separated transports, the binding fences, the contract for the check that forbids summarisation, and the self-mirror that makes the instrument falsifiable against itself.

A persistence section states the honest position on restarts, separating what has been shown from what is still pending. Another describes a hold that keeps captured minds from ever being lost. Drift is defined carefully as a signal and never as a verdict of its own.

The closing sections list the verify gates whose exit code is the verdict, the sanctioned ledger row, a file manifest, and a candid list of known limits.

The final section is an incident record: the whole instrument once hung permanently. The root cause is given as stuck cache state rather than slow work, with the evidence that a fresh process completed quickly. Four additive fixes follow, each explained, including one that was tried in a simpler form first and did not go far enough, and the live verification afterwards is reported as timings rather than as an assurance.
