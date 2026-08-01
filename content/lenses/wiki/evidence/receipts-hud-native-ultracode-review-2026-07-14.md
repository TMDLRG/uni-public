---
lens_schema: 1
scope: wiki
key: evidence/receipts-hud-native-ultracode-review-2026-07-14
corpus: evidence
source_sha256: 58598554b8b60405
source_body_sha256: 58598554b8b60405
source_title: UNI HUD native rewrite — ultracode review + fix receipt
source_words: 1254
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A record of a review over a freshly rewritten display system, and of the fixes it produced. Two findings stand out. One endpoint had never worked at all since it first shipped, because it was written to use a kind of dynamic access the data does not support, so every call was silently rejected. And the service could fail to bind and still report itself as running, because the failure was swallowed. Several gates are left pending rather than rounded up, each with the reason it is waiting written beside it.

<!--CLEAR-->
A review receipt, following a same-day rewrite of a display system into a native service and a desktop widget, prompted by the operator asking for a light pass over security, durability, documentation drift and cross-surface coherence.

The shape of the review is stated up front: several reviewers working in parallel, then a pass that tries to refute each finding and defaults to refuted when it cannot be confirmed, with counts for how many survived.

The fixes come in a table. A wildcard cross-origin header removed from a service that has no browser client. An endpoint rewritten because it used dynamic member access on a type that has none, which means it had never worked since it first shipped, with every call silently rejected; the page says so plainly and then shows the working call. A swallowed bind failure now rethrown, so the process actually stops and the system's own restart policy can fire, instead of the service reporting healthy with a dead listener. A hard-coded address corrected to match reality, with a comment warning against the drift returning. A global crash handler added to the widget that logs before falling through, deliberately not swallowing, because an unknown exception means an unknown state. And a shutdown hang fixed, found while doing the redeploy rather than by the review itself, which explains a stall that had been observed.

One item is unusually honest about failing first. An attempt to run the service under a lower-privileged account failed live because it could not bind without a reservation, and the installer rolled back rather than leaving a broken state. A later pass the same session did it properly by making the reservation and granting read access, and this time it held, with the running state quoted and the documents updated to describe what shipped rather than what was intended.

The documentation fixes are many, and one decision is worth noting: an older decision record was given a partly-superseded banner rather than being rewritten, so its history survives, while a new record became the current source of truth. A retired installer now refuses to run without an explicit acknowledgement flag. A fallback path was rewritten to start whatever service is registered rather than one named binary, and its liveness check was made independent of the binary too.

A new test project closes the highest-risk part of a zero-coverage gap, including a regression test for the endpoint that had never worked, and the remaining gaps are listed as open rather than quietly ignored.

One investigation deserves its own paragraph. A related service was unresponsive on every endpoint, initially spun off as unrelated, then root-caused the same day. A cache stored a pending promise with no ceiling on how long pending could last, so one transient hang poisoned that entry permanently, and because the snapshot awaited every source together, a single poisoned source wedged the whole thing forever. The fix is in four layers, each described, and the verification includes concurrent calls resolving together, which is what shows one of those layers working.

The closing section gives the verdict trajectory gate by gate. Several stay pending, each with what it is waiting for: a live drill, a real restart, a formal visual review, and a wiring change that has not been done.
