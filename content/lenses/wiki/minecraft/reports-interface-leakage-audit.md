---
lens_schema: 1
scope: wiki
key: minecraft/reports-interface-leakage-audit
corpus: minecraft
source_sha256: caa3d3bb18e3a886
source_body_sha256: caa3d3bb18e3a886
source_title: Interface Leakage Audit
source_words: 402
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This report asks a narrow question: can the learner see anything it is not supposed to see? The interface it is given should carry no world state, no meaningful action labels, no privileged extra information, and no score to chase.

The method mixes structural checks with live probing. Observations must be plain numbers keyed by number, within a fixed range. A scan looks for forbidden words. A deliberate probe runs a whole episode auditing every observation and trying to smuggle coordinates into actions.

The results report no leaks found across the audited observations, every malformed action rejected, and every channel structurally clean. Action channels are shuffled differently for each seed, so their meaning cannot be memorised.

The part worth knowing is that this is not self-attested. Every recorded run writes a durable log, and a separate command re-derives the verdict from those raw bytes alone.

<!--CLEAR-->
This is a focused audit report. Its question is whether the interface presented to a learner leaks anything: world state, semantic action labels, privileged metadata, or a reward signal.

The method has five parts. A structural audit requires every encoded observation to be a plain mapping from a channel number to a finite number, with channels inside a fixed range. A deep scan looks for forbidden meaningful tokens anywhere in the structure. A sensor-payload check requires that no material identities and no coordinates appear. A blind probe strategy audits every observation across a live episode and also attempts malformed actions and coordinate smuggling. And a trap can be switched on in the loop that raises immediately if any observation is ever unclean.

The results are given as raw counts. Every strategy ran with the trap on and none raised, and the probe detected no leaks across the observations it audited. Every malformed action it attempted was rejected, and all channels were structurally clean and clean under the token scan. Supporting points follow. Any wrong type or out-of-range key would be flagged, and negative tests prove that. Action channels are permuted per seed, so the same feature maps to different identifiers in different runs and semantics cannot be hard-coded. Absolute coordinates in action parameters are refused by name, and no score-like key exists anywhere on the learner-facing path.

The most important section is the one about third-party re-derivation. Beyond the in-process tests, every recorded run emits a durable log capturing, per tick, the world snapshot, the exact observation and sensor signals, and the actions that came back. A separate command re-derives the no-leak verdict from those raw bytes alone, rebuilding the channel mapping from the seed and recomputing every check. The report shows both a clean verification and, after deliberately tampering with one observation value, the resulting violation and its non-zero exit. It states that this makes the claim falsifiable rather than self-attested, and that negative tests inject each class of leak to confirm the verifier rejects them.

The verdict is a pass, followed by residual risks. Some scripted validation strategies deliberately use a debug view and are explicitly not learners, and a separate document covers that boundary. And inferring value distributions across many observations is named as the learner's intended problem rather than a leak.
