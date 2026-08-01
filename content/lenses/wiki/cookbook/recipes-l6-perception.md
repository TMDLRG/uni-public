---
lens_schema: 1
scope: wiki
key: cookbook/recipes-l6-perception
corpus: cookbook
source_sha256: 88508f9d4201aa7e
source_body_sha256: 88508f9d4201aa7e
source_title: L6 — Perception (precision-weighting / EFE planning)
source_words: 1517
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
One citable empirical result lives on this rung, and the page is careful in exactly the way such a result deserves. A reader built from counts and caches, with no gradient learning anywhere, beats a properly tuned counting baseline on sealed held-out real text. Alongside it sit small browser labs where the same engine bends into different perceptual regimes as three dials are turned. The subject is still a simulation of perception as inference, never a person.

Most of the page is about what the win is not. It is a counting-baseline win. Not comprehension, not talking, not active inference, and not a win over systems trained by gradient methods — on the measure in question it runs behind those by a chosen design trade. That is called a standing ceiling and it cannot be raised.

Because a third party could genuinely repeat this, the method is spelled out: register the bar first, seal the held-out data, touch it once, and read the verdict off the interval rather than off the best number. Three negatives are printed beside the win as first-class content, because they are what delimit it.
<!--CLEAR-->
This chapter carries the one place in the programme where an outside group could take a fresh held-out split, run the reader against a tuned baseline, and watch the margin either hold or fail. The earlier rungs are mostly substrate, embodiment and synthetic protocol; this one is empirical, and the chapter's tone changes accordingly. It is still framed as a simulation of perception-as-inference rather than as a perceiving mind.

What gets built is a reader made of counts and a multi-level cache, with no gradient machinery anywhere and a guard live over the loop to keep it that way. The cache is multi-level so the reader can carry structure beyond a fixed window. Beside it, a set of browser labs render the same discrete loop at small scale, with three dials — one for how sharply observations are weighted, one for transitions, one for how sharply a policy is chosen — swept across a map that shows the same loop falling into distinct regimes. A second lab is made from the first by swapping only the observation model, which is the chapter's way of insisting that the observation model is not the engine.

The measurement discipline is the heart of the page. The margin threshold and a named ablation are registered before anything is run. The held-out set is sealed behind a one-shot mechanism and touched exactly once; a second touch is described as a violation of the constitution. The verdict is read off the lower end of a multi-seed interval, never off the point estimate. A claim of reproduction is derived by a validator from several distinct seeds and a real interval containing the value, and the chapter notes that this was the first such claim on the ledger that was genuinely derived rather than written in as a literal. It also warns against a specific confusion: the interval for the headline margin and the interval for a replication are different gates and must not be quoted for one another.

A general law is offered as the diagnostic lens over the whole result: a representation learned without gradients beats a tuned baseline on held-out data only when it carries conditional information the baseline lacks, and only when that representation is stably learnable. Read through it, the reader wins because its cache carries new conditional information in a countable, stable form — not because counting is intrinsically better.

The negatives are printed as content. Several structurally distinct designs of one kind all held negative with a discriminator, giving a bound: within that family, nothing beats the tuned baseline on the measure used, and the measure itself is a chosen trade rather than a failed claim. Two controller families showed the reader's gain is diffuse, with nothing to gate. The law itself is registered with its own falsifier. And the park wording is quoted exactly, because it matters: this is a scoped negative over the tested envelope only, not a universal impossibility result and not an achieved rung.

The closing fence restates the ceiling in the plainest terms available and adds the standing programme position.
