---
lens_schema: 1
scope: wiki
key: minecraft/reports-sensory-ablation-report
corpus: minecraft
source_sha256: 4cf593054955d934
source_body_sha256: 4cf593054955d934
source_title: Sensory Ablation Report
source_words: 296
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This report checks whether senses matter, and it separates two different questions rather than blurring them.

The first is structural. Does removing a deep sense actually remove channels of information? The report counts channels for a full sensorium and for bodies missing one sense and its dependents, and shows each removal strictly reduces the count. A starting body perceives only a fraction of what a full one does, and the deeper layers emit nothing at all without their organ.

The second is behavioural. With the body held fixed, does an agent that uses its senses survive longer than one that ignores them? Across a batch of seeds it does, by a stated margin.

The verdict is a pass. The report then limits itself: the behavioural margin varies with the seed, and one shallow sense already provides a usable signal, so the extra value of a deeper one is smaller than the value of having senses at all.

<!--CLEAR-->
A short ablation report whose structure is the interesting part: it splits one loose claim into two separate questions and answers each with a different kind of evidence.

The first question is structural and is answered exactly. A comparison counts how many opaque observation channels are available to a body with a full sensorium, and to bodies missing one deep sense along with anything that depends on it. A small table gives the counts and the difference for each. Every removal strictly reduces the number of channels, so no sense is decorative. A starting body, having only the shallowest senses, perceives a small fraction of what a full sensorium does, and the deeper layers emit nothing without their organ.

The second question is behavioural and is answered statistically. Here the body is deliberately held fixed at a full sensorium, so the only difference is whether the strategy uses what it can perceive. A sense-using strategy is compared against one that ignores its senses across a batch of seeds at a fixed horizon, and the mean survival of each is given with the relative advantage between them.

The verdict is a pass, restating that the structural evidence is exact and the behavioural evidence is an improvement across a batch of seeds.

The residual risks are where the report is most careful. The behavioural margin depends on the seed, so it is reported over a batch, and more seeds would tighten the interval. And a shallow sense already provides a usable foraging signal, which means the incremental value of a deeper sense is smaller than the value of having senses at all. The structural evidence is what isolates each layer cleanly, so the two kinds of evidence do different jobs rather than repeat one another.
