---
lens_schema: 1
scope: wiki
key: minecraft/deepening-plan
corpus: minecraft
source_sha256: 878a349a383942d2
source_body_sha256: 878a349a383942d2
source_title: Execution Plan — UNI Deepening: break the plateau, then grow organs/spine/glands/hemispheres
source_words: 2315
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is an execution plan with a running status log at the top. It describes work to break through a wall the project hit, and then to grow further parts of the mind in stages. Nothing here is a finished result, and several of the stages are still only planned.

The wall is that agents in the world stop making progress and collapse into one habit, hoarding a single kind of tool. The plan's first move was to diagnose why rather than guess, and the diagnosis was a shortage of the drive to find things out.

The rest is a sequence of cures, taken one at a time, each built and tested away from the live world first, each behind a switch that is off by default, and each put through an adversarial review before any code is written.

The status log is the honest part. One cure worked in part. A long live test came back with a failed gate and a withheld verdict. And an earlier, more impressive-sounding claim with no committed receipt was withdrawn outright.

<!--CLEAR-->
This is a durable copy of an execution plan, and most of its length is a status log rather than a proposal. It is read alongside the project's contract and protocol documents.

The problem it addresses is a plateau. In the live world, colonies stop progressing at the point of making a tool, and one agent collapses into hoarding many copies of the same tool while building nothing. The stated ambition is much larger than that, and the plan is careful to separate the ambition from what has been shown.

The status log runs in order. The first stage was a diagnosis rather than a cure, because the plan insists on establishing the cause before applying a fix, and the finding was a starvation of the information-seeking drive rather than either of two rival explanations. The second stage added a term meant to restore that drive. It behaved as designed away from the live world, and in a paired live test one gate passed on direction while another failed outright, so the verdict was partial. The plan then records something unusual: an earlier and much stronger-sounding version of that result had no committed receipt behind it, so it was withdrawn and replaced by the smaller effect the receipt actually supports.

An adversarial review of that verdict required four artifacts before any further code, including a typed specification, a hardened data collector, a replacement for a behavioural measure that hoarding itself could satisfy, and a rule that the next stage's design go through review before implementation. Those were produced, and the review of the resulting design package returned a long list of blocking changes, two of which were confirmed in the code itself. A repair pass closed them at the design level.

The code that followed is described organ by organ, each addition kept behind a switch that is off by default so that the standard configuration produces byte-identical behaviour. An offline rehearsal found a real bug, in which the planner believed a store was draining far faster than it really was and the agent over-ate to compensate. The fix and the tuning that followed are both recorded, including one measure that honestly does not separate offline and the reason why.

The final entry is the live paired test, which ran for a couple of weeks. It reports a split verdict: the plateau-break gate failed, and the underlying hypothesis is recorded as withheld rather than refuted, because the two arms could not be told apart at that sample size and because the organ's activation was never confirmed. An earlier reading of the result is struck, and the plan writes out the honest predicate the next cure must start from.

The remaining sections give the reasoning behind the programme, a list of guardrails that hold for every stage, short designs for the later stages that have not been built, an explicitly fenced set of measures that are said to carry no evidential weight for experience, and the files and checks involved.
