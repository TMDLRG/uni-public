---
lens_schema: 1
scope: wiki
key: evidence/receipts-control-plane-phase2-green-2026-07-25
corpus: evidence
source_sha256: 9db7dbb58ba23431
source_body_sha256: 9db7dbb58ba23431
source_title: Phase 2 — the green run, and everything it did not achieve
source_words: 1076
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A green run recorded with its failures kept in plain view, and the title says as much. The most important thing on the page is an adverse finding: writing a validator by hand revealed that the ledger that counts — the list added to and never edited — violates its own schema in twelve rows. The validator was not loosened and the ledger was not edited, because either would launder a violation into conformance. Instead the disagreement is pinned by name in a test, and the choice between two defensible repairs is left to the operator. Two further adverse findings follow, including one inherited from an untouched file elsewhere. The closing section is a list of what the phase did not do: no verdict was authored, no gate was registered, and nothing was run.

<!--CLEAR-->
A green receipt — the file recording what was run — that leads with what went wrong. The command and the totals come first, with a note that two tests were added between the red run and this one, both in order to record an adverse finding, and that neither weakens a check.

A table lists what was built, one row per module, and names which failure modes are now covered.

Then the first adverse finding, placed first because it is the most important thing on the page. Writing the validator by hand revealed that the ledger that counts, a list added to and never edited, violates its own schema in twelve rows, from one cause, and those rows are listed. The explanation for why it was never caught is the sharpest sentence here. The enforcing test is more permissive than the thing it enforces, because a line written to guard something else steps over the case deliberately. Nothing else checks the type. The gap is between two guards, which is where gaps live.

What was not done about it matters as much. The validator was not weakened to accept the bad value, because that would launder a violation into conformance. The ledger was not edited, because it is append-only, and the digest before and after is quoted to show nothing moved. Instead the disagreement is pinned by name in a test, so that a thirteenth instance fails the suite and so does a silent repair. A further test asserts that the tolerant line still reads as quoted, so the finding cannot rot into a claim about code that has since changed. The choice between two defensible repairs is the operator's and is deliberately left unmade.

The second adverse finding is the chain limitation carried forward from the red run, with an honest addition. A check taking an anchor from outside the chain does catch tail truncation, but nothing yet holds such an anchor, so in practice it goes undetected. Stated, not implied.

The third is a verification command, named in advance, that fails, on a file this work never touched, because it was committed with the wrong line endings. The evidence that the file is unmodified and that its committed bytes carry them is quoted. It is deliberately not fixed, since reformatting an untouched file in another subsystem would put an unrelated change inside an evidence commit, and it is carried forward as an inherited item.

Then the two guards that had passed vacuously in the red run are shown to bite, by mutation rather than by assertion. Each is broken deliberately, each fails as required, and both mutations are reverted with the difference shown to be empty afterwards.

A full verification table follows, and then design notes worth carrying forward. One is a decision not to re-encode historical rows whose bytes would change without their meaning changing. Another is a refusal to add a word to the command vocabulary before a guard exists for it. The last is a refusal to add a second oracle for a claim already enforced elsewhere, which would look like rigour and provide none. The page closes with what the phase did not do, and how to roll all of it back.
