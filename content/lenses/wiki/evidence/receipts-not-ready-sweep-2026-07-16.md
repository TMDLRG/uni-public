---
lens_schema: 1
scope: wiki
key: evidence/receipts-not-ready-sweep-2026-07-16
corpus: evidence
source_sha256: bf34c92f8593818f
source_body_sha256: d6480229b676223b
source_title: "Not ready yet" sweep — everything fully, no defer (2026-07-16)
source_words: 1287
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A record of a large piece of work done after the operator said plainly that things were not ready, and listed what was wrong. Two of his policy answers set the whole plan: a security claim that no code enforced was retracted rather than quietly kept, and music was allowed on air. The rest is a sweep across cameras, microphone, the honesty of the console, and music integration, shipped in phases. The residuals are listed as known-honest, including one thing deliberately not run because re-rolling a working setup mid-flight would have been wrong.

<!--CLEAR-->
A sweep receipt, the file recording what was run, that opens with the operator's own words, unedited, listing what was not working, together with his instruction on scope: address everything fully, do not reduce, do not defer.

The two policy answers get their own table, because they set the plan. A claim about a protection that no code enforced is retracted rather than kept, the language banned from the documents that carried it, a warning banner added to the page it applied to, and a service bound locally for posture. And a policy question about music is answered permissively, with the operator attesting that the library is owned, which makes music usable on the programme.

The work then ships in phases, each with its own commit. The foundations phase makes a slate genuinely silent, and boots every camera and the microphone muted by policy. It hard-mutes output capture by kind rather than by a literal name, so a renamed source cannot slip through, and slows reconnection on the sources that were generating a log storm. It binds the local camera from a persisted choice, with a fallback that never fabricates a device, and adds a set of music scenes and overlays.

The console phase is mostly about honesty. A hard-coded address becomes a value derived from the registry and cross-checked against the machine's own live addresses, with the provenance of that decision exposed in the response. A freshness timestamp is split in two, so that a routine heartbeat write can no longer stand in for a real content change, and the gate reads the one a heartbeat cannot move. A status row is renamed to say only what it can tell, which is that it is writing rather than that the far end received anything. Camera information becomes a full table with a summary line. Pollers are added for music and for colony metadata, with the discipline noted of never probing the expensive endpoints. New fields default to nothing, so they render as unknown rather than fabricating a value. And each armed destination gets its own health row, where a high respawn rate reads as a rejected key.

The interface phase gives every new field something the operator can act on. There is a device picker, a mute indicator so nobody can be blind to that state, and panels for colony and music. There is a metadata form that auto-fills only into blank fields, so it never clobbers what is being typed, and an aggregate readiness pill above the health board.

The overlays phase adds four pages fed from the same shared state, with one deliberate omission recorded rather than hidden. A proper encoder for a code image would add a vendored dependency, so a readable text row was kept and the improvement filed for later.

Live receipts are then quoted field by field, including several that are correctly negative because nothing is bound yet, which is the point of them. The known-honest residuals include a poller sitting idle until a naming change lands elsewhere, rendering an honest unbound state rather than silent black, and a retracted claim that does not return until the code does. Most notably, a rebuild was deliberately not run, because re-rolling a working but fragile setup mid-flight, for a change already checked in code, would have been the wrong trade.
