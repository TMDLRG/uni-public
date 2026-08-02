---
lens_schema: 1
scope: wiki
key: minecraft/reproducibility
corpus: minecraft
source_sha256: 18d26fabdc10297c
source_body_sha256: 18d26fabdc10297c
source_title: Reproducibility Guide
source_words: 448
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This guide explains how the same inputs are made to produce the same run, and where that promise stops.

Five sources of determinism are listed. One generator, threaded through the program by hand rather than kept in a hidden place. Sub-generators split off for new parts, so adding one never disturbs another's sequence. No clock: time is counted in ticks. No outside dependencies to drift. And the mapping of the interface's channels is seed-derived, a pure function of the seed and nothing else.

The guide then says exactly which settings a run needs in order to be repeated, shows the call that repeats one, and names the tests that check it.

The most useful section is a maintenance rule learned the hard way. Iterating over a map keyed by names is not stable between runs, and tiny differences in adding up decimals would be amplified into visibly different behaviour, so anything affecting a trajectory must not depend on that order.

<!--CLEAR-->
A guide rather than a report. It explains why runs repeat, how to repeat one, and where the promise ends.

It opens by naming reproducibility as a first-class invariant: identical inputs reproduce identical traces, offline.

Five sources of determinism follow. All randomness comes from one generator threaded through every step as a plain value, rather than the language's built-in source, which is described as process-local and version-dependent. New regions and children receive split sub-generators rather than sharing one, so adding something never perturbs another stream. Time is logical, counted in ticks, with no clock reading and no sleeping. There are no external dependencies to drift. And the opaque mapping between channels and features is seed-derived, a pure function of the seed.

A short section states exactly which settings, taken together, determine an entire episode, and a code block shows how to reconstruct a run from a captured provenance record. Named tests follow: identical seeds produce identical traces, identical seeds produce identical worlds after many steps, and a stored episode reproduces exactly for whole numbers and within a stated tolerance for decimals.

The declared tolerance is written out rather than assumed, and the guide says what the tolerance is for, which is rounding in serialisation rather than any drift in the dynamics.

The longest and most useful section is a maintenance constraint, and it reads as something learned from a real failure. Iterating a map keyed by names is not stable between separate runs of the virtual machine, because it depends on an internal table whose contents vary with how much has been loaded. Two consequences are drawn. A list of material classes is therefore fixed in a literal order with a compile-time guard, so the same worlds are generated everywhere. And decimal reductions over such maps are made to iterate in that one fixed order, because tiny differences in summation would otherwise be amplified into visible divergence by the agent's own threshold and choice decisions. Maps keyed by numbers are said to be safe. The guide names the regression test that catches violations, because it compares an artifact produced one way against a run computed another, and it ends the section with an instruction for anyone adding code.

A final caveat limits the claim: decimal bit-identity across runtime versions is not something the platform offers in general, so reproduction is claimed within tolerance across a supported matrix, while integer and generator state are exact everywhere.
