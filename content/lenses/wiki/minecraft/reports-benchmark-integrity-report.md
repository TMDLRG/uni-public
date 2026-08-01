---
lens_schema: 1
scope: wiki
key: minecraft/reports-benchmark-integrity-report
corpus: minecraft
source_sha256: 4f586e3becb2abe6
source_body_sha256: 4f586e3becb2abe6
source_title: Benchmark Integrity Report
source_words: 309
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is a short report asking whether the test world is a fair benchmark: not so easy that anything wins, not so hard that nothing does, with no hidden shortcut and no score to exploit.

It follows the same shape as its sibling reports. A purpose, a method, the artifacts it used, a summary of results, a single pass or fail, and the risks that remain.

The results say survival is neither trivial nor impossible, because no simple strategy reaches the end on every seed, and the strategies that use their senses do better than the ones that ignore them. A random strategy cannot reliably win. Material is conserved exactly in transport, quantities stay inside their stated caps over long runs, and a pinned reference episode guards against silent drift.

The verdict is a pass, and the residual risks are printed rather than omitted.

<!--CLEAR-->
This report asks whether the environment is sound enough to be used as a benchmark at all. Its purpose section lists what that means here: not trivially winnable and not impossible, not collapsed by simple strategies, with no shortcut or oracle available, with conservation and boundedness holding, and with a pinned trace to catch silent drift.

The method is a batch of runs across a reference set of seeds for every simple strategy, plus explicit checks that no score-like channel exists, that acting at random cannot reliably succeed, and that a scripted skill does help. Conservation and boundedness are checked separately, and a stored reference episode is re-derived and compared automatically.

The results are given as a table of mean survival per strategy with the number of seeds each reached the horizon on. The reading offered is that no strategy reaches the horizon on all seeds, and the strategies that use their senses lead, so the benchmark is neither trivial nor collapsed. A separate ablation is cited for the advantage of using senses with the body held fixed.

The anti-shortcut section states that no score, reward, return or fitness field exists anywhere on the learner's path or in the evaluation metrics, that the learner cannot read world state, coordinates, materials or hidden layers, and that no action bypasses the capability ladder. Conservation is reported as an exact zero change in transported mass, with field values remaining inside documented caps over long runs.

The verdict is a pass. The residual risks say plainly that difficulty depends on the seed, which is why batches were used, and that the pinned episode is a single reference rather than a band, which could be broadened if stricter coverage were wanted.
