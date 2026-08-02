---
lens_schema: 1
scope: wiki
key: evidence/receipts-red-preregistration-depth-red-b
corpus: evidence
source_sha256: b27be9338a9c83df
source_body_sha256: b27be9338a9c83df
source_title: RED pre-registration — depth-red-b
source_words: 210
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A promise written before a test was run, and not a result. It says what would be tried, what would count as a pass, and what would count as a refutation, and then it stops, because at the time of writing there was no verdict. The question it sets up is whether two things a model is meant to work out separately can really be told apart, or whether they collapse into one. If they collapse, the page says plainly, in advance, that this counts as a failure.

<!--CLEAR-->
No result has been recorded here at all. It is a pre-registration: the test, the pass condition and the result that would show it wrong, all committed to paper before the run, with the verdict withheld.

The header block names the gate, the phase of work it belongs to, the date it was registered, the script that would run it, and the specification it comes from. One ordering rule is stated up front. This test must wait until an earlier, related test has a verdict, so that only one change is under examination at a time.

The pass condition asks that the model's belief about one factor stay distinguishable from its belief about another at every sampled point of a diagnostic window. What would show it wrong is the mirror of that. If the two beliefs become indistinguishable, or if an unrelated default behaviour stops being byte-identical, the test fails. Then comes the protocol, which fixes the details so they cannot drift later: which genome, how it is seeded, the scene set to run against, how long to run, and how often to sample. It ends with a small table turning the measurement into pass, partial or fail.
