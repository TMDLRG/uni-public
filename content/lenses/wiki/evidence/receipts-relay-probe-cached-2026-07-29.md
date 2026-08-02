---
lens_schema: 1
scope: wiki
key: evidence/receipts-relay-probe-cached-2026-07-29
corpus: evidence
source_sha256: d8a3d09cfdd2866f
source_body_sha256: 4295a717dfe38a36
source_title: Receipt — the off-box relay probe is TTL-cached (kills node2 log/NVMe churn at the source)
source_words: 469
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A short record of a fix and the measurements either side of it. A status tile on one machine opened a fresh connection to another machine every time anyone looked at it, and two separate pollers were looking constantly. The far machine dutifully logged every one of those connections, which filled a large share of its log and kept writing to a drive whose wear is being watched. The fix serves a cached answer for a few seconds and shares it between everyone asking, so the whole process opens at most one connection per window. A health tile does not need a fresher answer than that, and the rate before and after was measured.

<!--CLEAR-->
This is a receipt — the file recording what was run — for a defect, its fix, and the measurement of both. What makes it worth reading is where the defect turned out to live. It was found by the agent on the machine that was suffering, but the cause sat on the other machine, the one doing the asking. The far machine was only recording it.

The defect: three separate endpoints each opened a fresh connection to check whether a relay port was reachable, with no caching, and two independent pollers hit those endpoints every few seconds. That came to more than one connect-and-close every second, and the far end logged each as an accepted-then-dropped connection, which grew into a large fraction of its journal and a steady write load on the drive being watched.

The fix is a shared wrapper that serves the last known answer immediately and runs at most one background refresh per window, keyed so that every caller in the process shares one. All three sites route through it. The plain check is left alone for the cheap local probes, where freshness matters and there is no cost to it. The page states what the change gives up: reachability is now reflected within the window rather than instantly. It argues a health tile does not need liveness faster than that, since going on air is settled by the publish attempt and a human typing a confirmation, not by this probe.

The proof has two halves. A unit test against a throwaway server counts sockets: many concurrent callers inside one window produce one socket, a caller after the window produces exactly one refresh, and more callers inside the new window produce none. Then a live before-and-after count of new connections over time, on air, showing the rate falling to the expected floor. The tile still reads the same, and its meaning is quoted, including the part saying a reachable port is not evidence that anything is being forwarded. A closing note tells the other machine's agent that the source of the noise is gone, so a mitigation made there is no longer load-bearing.
