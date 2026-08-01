---
lens_schema: 1
scope: wiki
key: evidence/receipts-red-preregistration-spine-phase3
corpus: evidence
source_sha256: 686ed392de8f2dea
source_body_sha256: 686ed392de8f2dea
source_title: RED pre-registration — spine-phase3
source_words: 209
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A short record made before an experiment was run. It names a test, states in advance what result would count as a pass and what would count as a refutation, and then stops. It carries no verdict: the outcome is withheld and nothing has been run. Records like this exist so that nobody can decide after the fact what a test was supposed to show. A reader can come back later, find the result, and hold it against the promise made here.

<!--CLEAR-->
A pre-registration is a promise made in advance, and that is all this page is. The work it describes had not yet been run when the page was written, so the verdict is withheld and the evidence is marked as pending.

It opens with a short block of labels: the name of the gate, which phase of the plan it belongs to, the date it was registered, the script meant to run it, and where the related design notes live. Then it says why the test exists. An earlier design document had already committed to two paired checks, and this page is the harness for them. The first asks that a default behaviour stay byte-identical once a new organ exists but is switched off. The second asks that the new lineage leave an observable signature above a baseline, inside a diagnostic window agreed beforehand.

The rest is protocol: build the genome, run the byte-identity test, run the new lineage in a fixed environment, compare it against the baseline, then read the verdict off a table written before any of it happened. A closing rule says code in the affected area must not be merged until this test passes.
