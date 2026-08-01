---
lens_schema: 1
scope: wiki
key: evidence/receipts-verdict-live-real-driver-2026-07-11
corpus: evidence
source_sha256: 00877e1d4da4fa12
source_body_sha256: 00877e1d4da4fa12
source_title: Receipt — verdict=LIVE truthfulness (Phase III)
source_words: 464
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This records a fix to a health check that was reporting good news it had not actually checked. The endpoint called a system live whenever two processes existed, and a related field named the real driver whenever one of them was up, even when the thing driving was still a stand-in. The fix makes that field report the actual state, so a stand-in now reads as partial rather than live. The page is honest about what is still missing: the check has not yet been watched flipping on a running system, because that system is deliberately down for other work.

<!--CLEAR-->
A receipt about a self-check that was not checking anything. The status line at the top is split on purpose: the source-level fix is in and locked by a test, while the live demonstration is still pending.

What was broken is stated first. The endpoint reported a live verdict when two processes were merely present, and a separate status field made up the name of whoever was driving rather than asking. A live process still running a rule-based stand-in therefore read as though the real driver had taken over. The page names this as a failure mode the project has hit before.

The fix adds a getter that asks the component for its own internal state, wraps the call in an existing degrade-safely helper so that no new failure mode appears, and pulls the verdict out into a pure function that requires the driver to actually be the real one. A stand-in now reads as partial, which is a true report rather than a false one. One deliberate non-change is explained: checking that frames are advancing stays with the caller, because a stateless probe cannot compare two of its own earlier calls.

The evidence section grades itself. The source was read and matches the description. The test lock is reported by the lane that owns it rather than re-run here, and the page marks that with a class and names the command that would upgrade it. Then the honest gap: the live flip has not been captured, because the thing it needs is intentionally down for other work. The verdict treats the phase as closed for planning purposes while leaving the live capture as an open item, tracked rather than fabricated.
