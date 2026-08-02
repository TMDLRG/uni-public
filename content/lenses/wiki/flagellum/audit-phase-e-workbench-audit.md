---
lens_schema: 1
scope: wiki
key: flagellum/audit-phase-e-workbench-audit
corpus: flagellum
source_sha256: 9ea9cdd9b2095b37
source_body_sha256: 9ea9cdd9b2095b37
source_title: Phase-E audit — scientific math workbench and repository state
source_words: 4823
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

One screen, and the repository behind it, put under a long audit that was built to argue with
itself. Every candidate finding was handed to a second reviewer whose instructions were to refute
it, and the ones that did not survive are still printed at the end.

Its most important result is about itself. The audit was organised into six areas of attack, and
neither of the two worst findings came from any of them. Both were found by a reviewer whose job
was to ask what the six had missed. The audit's own phrase for this is that the six looked at
the shop window and missed the instrument behind it.

The two worst findings are these. A gate reports a pass while none of the files it claims to
have checked exist on disk. And a passing test enforces a labelling rule the project's own
contract forbids, so a live, unpinned stream would be recorded as a measurement.

A shipped equation is also wrong in a way that changes which action gets chosen.

The audit does not clear anything for release. Its closing section says the release claim is not
established from the copy it worked on, and names the gate that could not be run there.

<!--CLEAR-->

The audit was run against one working branch, on one date, by six parallel reviews: truth
contract, numerical rederivation, adversarial testing, documentation drift, product behaviour
and where the data came from. Each finding was then put to an independent verifier told to
refute it by default, plus a completeness critic asked what the six had missed. It reports the raw finding
count, the count that survived verification and the count refuted, and grades the survivors by
severity.

It starts with observed outcomes rather than opinion: every required command run in that
worktree, with its literal result. Most pass. One is blocked because a very large archive is
absent, and the audit says plainly that it must never be reported as a pass from that copy. A
large headless sweep of the executable surface found no defect at all: no non-finite value,
distributions normalising, identical runs identical, several mathematical identities holding to
tight tolerance.

Then the two blocking findings. The first is a gate rendering a pass while none of its declared
cached artifacts exist on disk. Its status is derived from frozen claims inside the evidence
file rather than from current verification, and a guard short-circuits exactly when the evidence
is missing. The audit quotes the project's own rule that an absent archive
must be marked blocked or not run and never reported as a pass. The second is a passing test
that enforces a truth-contract violation: an unpinned live stream is classified as a recorded
measurement, and written into every exported record. The audit records the mitigating fact that
the affected page is not currently served as a fact rather than an excuse.

The major findings follow, each with file, line, evidence, root cause, smallest correction, the
test that must fail first, validation, rollback and scientific impact. A shipped expected free
energy adds one term twice, because a component written as a divergence is really a
cross-entropy; the error does not cancel between the two policies, so it changes action
selection. Four style properties are used and never declared, which makes the colour channel
that distinguishes pass from fail non-functional. The repository's strongest truth claim is
guarded by a pattern that cannot fail. Relabelling every truth string on the badge surface
leaves the whole test suite green. Most of the screen's views have no rendered coverage. The
shipped bundle discloses the build machine's filesystem path, including the operating-system
user name. And a tile labelled as a prediction residual differences a prediction against the
very observation it was computed from.

The completeness critic's list is arguably the most valuable section. Two governing documents
disagree on what may be labelled a recorded measurement, and the audit says that disagreement
must be settled before anything downstream is frozen, because it decides whether several
findings are defects at all. A closed vocabulary is undermined by many invented badge strings. A
artifact recording where things came from writes a fixed timestamp on every run, asserting a
verification time that is not the verification time. Circular oracles exist in the science suite, not only in the screen's
tests. Several green gates have no independent rederivation. Some red tests are frozen behind
the current tree and cannot measure it, and several mathematical claims have no test whatsoever.

The audit then prints its refuted candidates and its coverage limitations, beginning with the
admission that no live browser testing was performed at all, so one predicted visual failure has
never been seen. Then its adverse results unsoftened, and a verdict of not established.
