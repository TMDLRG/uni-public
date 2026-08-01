---
lens_schema: 1
scope: wiki
key: evidence/receipts-production-sweep-2026-07-16
corpus: evidence
source_sha256: 06b0e2d692dd5d23
source_body_sha256: cf3de18104816f0c
source_title: Production-readiness sweep → GO (2026-07-16)
source_words: 1252
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A readiness sweep that ends in a go, with the one remaining blocker belonging to the operator rather than to the code, because no agent may handle a stream key. But the finding worth reading is that the broadcast test would have passed no matter what went out. Two of its stages had their verdicts written in as literals, and its picture checks measured only that something answered rather than that anything rendered. All four are fixed to derive from real measurements and to fail when they cannot tell. The residuals are listed as explicitly not claimed, among them platform acceptance, which this test cannot check at all.

<!--CLEAR-->
A large adversarial sweep across every dimension of going live, ending in a go verdict, with counts of how many findings were confirmed and how many the sweep refuted against itself.

The remaining blocker is described as the design working rather than as a defect. The store of streaming keys is empty, so nothing pushes, so a stage that closes only on a live measurement fails honestly, and no agent may clear it, because an agent must never handle a key.

The section that matters most is about the test having been able to lie. Four defects all point the same way: green regardless of what actually went out. One stage computed its per-scene results and then threw them away in favour of a hard-coded pass, which the page summarises in a single line, that a stage which cannot fail is not a test. Two picture checks used a byte-count threshold that a compressed black frame clears easily, so they measured that something answered rather than that anything rendered. A final stage was hard-coded too, overwriting a real failure. The sting is that an honest pixel classifier already existed a few dozen lines above, tested and in use elsewhere, and the test simply never called it.

All four are fixed. Verdicts now derive from their own rows, both picture checks use pixel truth and fail closed when they cannot tell, and the reader-count stage samples twice a few seconds apart and fails on instability while naming the usual cause.

Then one defect class in three places. Three separate consumers each aimed a short timeout at an expensive response, so all three had been failing silently since they were added. All are fixed, and a rule is recorded in the registry itself: probe liveness cheaply, and read a verdict from its own check rather than inferring it from a timeout. The reasoning is behavioural rather than technical. Hours of a permanently red panel train the operator's eye to ignore it, so a real outage becomes invisible. An alarm that is always on is not an alarm. And the probe was itself generating the load it was measuring.

A section records what the sweep's own adversarial layer refuted, on the grounds that a sweep which never refutes itself is not adversarial. One refutation is inverted completely: a proposed fix would have created the bug it claimed to cure, because the reasoning came from another operating system's behaviour. Another is called circular, since the gate said to be blocking is pending precisely because the test has not run, and nothing reads it.

The honest residuals are the longest section and are explicitly not claimed. Platform acceptance cannot be checked by this test, which measures local readers, so the row now says that in plain words. A long run is not underwritten, because the black-picture risk has detection but no remedy and the durable fix is not built, so the run must be attended. A crash drops the public feed by design, and the page warns against fixing that by storing the passphrase. One count has a single source and no independent corroboration, which blocks saying it on air. A fence is display-only with no code enforcing it, so the operator must rule which reading binds. And a log growing steadily is left alone rather than truncated under a live process, with the reason given.
