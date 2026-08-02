---
lens_schema: 1
scope: wiki
key: evidence/validation-scenario-authoring
corpus: evidence
source_sha256: 647390d7d4824e6d
source_body_sha256: 647390d7d4824e6d
source_title: Scenario Authoring Guide
source_words: 346
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is a how-to page for people setting up runs of a simulation. A scenario is a small settings file: how big the world is, how long it runs, which agent behaviour to use, which random seed to start from. The page lists every setting with its default and its meaning, shows the built-in examples, and explains how to write a new one and check that it loads. The last section is the one that matters most: a fixed set of settings fully determines the run, so re-running it produces the same trace byte for byte.

<!--CLEAR-->
This is a reference guide for a simulation, not a report of any result. It describes how to write the small settings file that defines a run, and it assumes the reader is going to run one.

The first part is a table of settings: what each is called, what type it takes, what it falls back to if you leave it out, and what it means. Between them they cover the size and shape of the world, how long it runs, how often development happens relative to decisions, which agent behaviour to use, and whether the interface between agent and world is scrambled. Anything malformed is rejected with a structured error rather than run.

Then a table of the built-in examples, each written to exercise a different aspect, so a new scenario usually starts life as a copy of one of them. A short block of code shows how to load a scenario, turn it into a run, and get a report out of it.

The authoring recipe is four steps. Copy and edit. Check that it loads cleanly, and that a deliberate typo gives a readable error. Sweep a batch of seeds if you want a stable difficulty band. And regenerate the stored reference artefact only if you meant to change the behaviour.

The closing section states the determinism contract. A fixed set of settings fully determines the trace, and re-running yields byte-identical output, while a different seed changes both the world and the hidden mapping between agent and world.
