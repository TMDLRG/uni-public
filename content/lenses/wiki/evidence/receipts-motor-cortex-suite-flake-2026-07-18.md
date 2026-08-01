---
lens_schema: 1
scope: wiki
key: evidence/receipts-motor-cortex-suite-flake-2026-07-18
corpus: evidence
source_sha256: 1aebdb7b327ba0e7
source_body_sha256: 1aebdb7b327ba0e7
source_title: MotorCortexTest's "nondeterministic" full-suite flake was a starved test, not shared state — receipt, 2026-07-18
source_words: 2531
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A record of chasing a moving test failure and finding it was not what it looked like. A test failed under the full suite but passed on its own, and failed under a different name each run, which is the classic signature of tests interfering through shared state. It was not that. The two failing tests were simply the two slowest, sitting just under a default time limit with little headroom, and running everything at once took that headroom away. The fix raises the limit on those two tests and does not weaken a single assertion. The suite as a whole is not yet stably green, and two other intermittent failures found along the way are explicitly not claimed fixed.

<!--CLEAR-->
A receipt about test infrastructure, with a scope fence at the top: this concerns one module and nothing else, the suite as a whole is not yet stably green, and two other unrelated intermittent failures surfaced during the verification and are explicitly not claimed fixed.

The symptom is described precisely, and the trap is named. A failure that moves between test names is normally the signature of interference through shared state, and chasing the moving name was the wrong path.

What it actually was is measured rather than argued. A tracing run, which disables the limit so that every test runs to completion and reports its true cost, shows the two flaky tests are the two slowest by a wide margin, with less than one and a half times headroom against the default, and the next slowest an order of magnitude away.

The reason the full suite tips them over is the concurrency setting, which oversubscribes the machine's cores by default. Processor-bound work therefore runs substantially slower when everything runs at once, and thin headroom does not survive that. Whichever of the two catches the worst contention on a given run is the one that crosses the line, which explains both the moving name and why it never happens in isolation.

The error itself is quoted, with the stack parked in the middle of pure arithmetic. The observation that follows is the crux: that is a test running out of clock, not a test observing a wrong value.

A table then falsifies each plausible shared-state suspect one by one, with what was checked in each case. A file path that turns out to be unique per test and removed afterwards. Other stores the module never touches at all. No shared tables anywhere on the path. No named process. A seed carried inside a value rather than set globally. The whole path is pure and threaded through values, so there was no shared mutable state to isolate in the first place.

The fix raises the limit on only the two heavy tests, and records the diagnosis in a comment so it is not relearned later. Its deliberate properties are listed, and the important one is that no assertion was weakened, removed or loosened; every threshold is left exactly as it was.

The verification is five consecutive full runs, tabulated. The class this work claims is closed, with none of that error in any run, where previously every red run carried at least one. One run failed for a different reason, and the page insists on keeping it separate: it is not a starvation failure, it is a genuine intermittent around a shared store, in code another agent was actively changing, and it must not be folded into this story.

A closing note explains that the suite's total time rose, and why that is not a regression. The earlier times were partly tests being killed at the limit, so the suite is slower now because it finishes the work it starts.
