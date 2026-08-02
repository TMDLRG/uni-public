---
lens_schema: 1
scope: wiki
key: evidence/receipts-lab-team-review-lineage-snapshot-85b0e8c-v2
corpus: evidence
source_sha256: ad32f56040795045
source_body_sha256: ad32f56040795045
source_title: /lab-team-review MERGED VERDICT (v2, post-fix) — D-D3 Lineage.snapshot/1
source_words: 6045
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A review of a specification for taking snapshots of stored state, coming back passing after four findings were fixed. Re-reading the code before editing turned up three more stale citations that nobody had listed, including a function the specification cited that does not exist anywhere. The corrected version narrows what a first release would do, names each deferred prerequisite, and leaves one open design decision for the owner rather than settling it quietly in either direction.

<!--CLEAR-->
A review round over a corrected specification, with a passing verdict, covering one document, and no source code touched.

The most useful section is the re-verification done before any editing. All four original findings held against the current code, and the re-read turned up three further problems nobody had listed. A cited function does not exist anywhere in the codebase. A claim about what consumes the output is not true today. And a line citation had drifted into a different branch entirely. All were fixed anyway, under a stated rule about never leaving a wrong citation in place.

One confirmed finding is strengthened by something noticed while checking it. The mechanism the specification wanted to hook into is not merely absent from the code. Its own script header says it has never been run on the hardware, which makes the case against building a bridge to it now stronger rather than weaker.

The changes are then given section by section. A scope section is added stating four re-scoping decisions explicitly, each naming the prerequisite it defers. An option that would have quietly degraded is changed to return an explicit error instead, which is the right instinct: refusing loudly beats doing something other than what was asked.

The mechanics are rewritten entirely. A step that assumed a component could be asked to do something it cannot is replaced. Instead it reads what is already on disk and writes it out through a temporary file and a rename, with the residual risk of reading a file mid-write documented explicitly rather than papered over. The default location is changed to avoid a shared tree.

One reframing does real work. Describing the operation as a reader rather than a writer of those files means it needs no entry in a guard or a running list meant for writers, which removes a whole class of coordination.

The test coverage is rewritten to drop tests that could not be run against something that does not exist. A note is added saying plainly that this document makes no behavioural claim, so the paired apparatus of writing conditions down first does not transplant onto it. It names its own narrower way of being shown wrong instead: a named test failing, or a snapshot landing outside its declared directory.

The last item is the most interesting, because it is explicitly not fixed. One reviewer raised an advisory concern that an unbounded input permanently interns a name in a table that never shrinks, which would matter if that input ever became reachable from an automated caller. Bounding it now would contradict another fix, which requires a test to pass a value outside that bound, and the same reviewer's own reason for not blocking applies to that test too. So it is named in the document, and added as a later prerequisite for when the input leaves the operator-typed surface. It is left as a genuine open design decision for the owner to ratify or overrule, rather than being quietly dropped or quietly enforced. The addendum says outright that it does not claim a fresh signature on the strength of that.
