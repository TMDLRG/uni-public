---
lens_schema: 1
scope: wiki
key: minecraft/reports-open-endedness-validation
corpus: minecraft
source_sha256: 10c8dfca9c945c97
source_body_sha256: 10c8dfca9c945c97
source_title: Open-Endedness Validation
source_words: 310
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This report asks whether the world can keep going, rather than ending in a finite map that gets finished. The specific claim, stated as a design commitment, is that opening a seam creates a genuinely new region with different underlying law, and that this is reachable by building rather than by a special command.

Four kinds of evidence are used. A forced mechanism check, which opens a seam deliberately and shows a new region appears with a measurably different regime. A gating check, which shows the readiness never reaches the threshold without the right constructions. A statistical run, which counts how often an ordinary constrained strategy opens seams without being forced. And a soak test, which opens many seams in a row and shows the graph stays connected with valid laws.

The verdict is a pass. The residual risk is that unforced expansion from a starting body is rare, which the report calls intended difficulty.

<!--CLEAR-->
This report tests a design commitment: that the world does not terminate in a finite map that can be finished, and that new regions with genuinely different underlying law can be created by building rather than handed out.

It uses four kinds of evidence in increasing order of realism. First a deterministic mechanism check, in which the path to a seam is forced with the required constructions and the seam is opened. A new region appears, and the distance between its law vector and the parent's is reported as a non-zero number, so the child is a new regime rather than merely new coordinates. Second a gating check, confirming that seam readiness stays below its threshold without those constructions even after a long run, and that a few of them drive it across. Third a statistical check in which an ordinary strategy, without privileged knowledge and constrained by the same interface as any learner, runs with a developed body over long horizons, and unforced expansions are counted. A minority of runs expand, with one world reaching several regions. Fourth a soak test that opens many seams in sequence and shows every resulting region has valid law and the root stays connected.

The verdict is a pass, and the summary is careful about what it covers: expansion produces new valid regions with new regimes, it is gated behind late-stage building, the graph stays coherent, and it is reachable by a strategy that has no more access than a learner would.

The residual risk is stated rather than buried. Unforced expansion from a starting body within a typical horizon is rare; it becomes routine only with a developed body and a long horizon. The report calls that intended difficulty and notes the economy could be tuned to raise the rate, which is a design choice rather than a finding.
