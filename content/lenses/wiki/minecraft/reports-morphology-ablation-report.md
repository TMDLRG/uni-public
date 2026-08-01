---
lens_schema: 1
scope: wiki
key: minecraft/reports-morphology-ablation-report
corpus: minecraft
source_sha256: b3b3e3051f1e78f6
source_body_sha256: b3b3e3051f1e78f6
source_title: Morphology Ablation Report
source_words: 273
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This report checks that the body an agent grows actually matters. Three claims are tested: actions are gated by having the right appendage, development cannot produce an impossible body, and a body that never develops cannot do the consequential later work.

The method mixes three kinds of evidence. An exact check that a starting body is refused the gated actions and that growing an organ without its prerequisite is rejected by name. A property test that develops many random genomes over many ticks and requires every resulting body to be valid. And a statistical comparison between runs with development switched off and runs with it on.

The result is that a body that never develops is confined to moving about and dies without building anything, while developing bodies reach later stages and build.

The verdict is a pass, and the report notes that harsh seeds cap development, which it calls intended difficulty rather than a defect.

<!--CLEAR-->
This is one of a set of short validation reports, and it tests whether the body an agent grows is load-bearing rather than decorative. It names the invariants and the acceptance gate it is verifying.

Three claims are separated, each tested with a different kind of evidence. The first is gating, tested exactly: a starting body is asked to perform the appendage-gated actions and refuses each one, and an attempt to grow an organ whose prerequisite is missing returns a named error rather than succeeding quietly. Moving, orienting and probing need no appendage, which is stated so the boundary is clear.

The second is development validity, tested as a property: many random genomes are developed over many ticks, and every resulting body must pass the validity check. The report says all of them did.

The third is utilisation, tested statistically: the same strategy runs with development effectively disabled, then with it enabled. A body that never develops stays at the starting stage, builds nothing, and cannot excavate or expand. A developing body reaches a later stage, builds in a minority of runs, and becomes able to open seams, with a separate report cited for that.

The verdict is a pass. The residual risk is stated honestly: reaching a given stage inside one episode depends on surviving long enough, and harsh seeds cap development. The report calls that intended difficulty rather than a defect, which is a claim about design intent rather than a measurement.
