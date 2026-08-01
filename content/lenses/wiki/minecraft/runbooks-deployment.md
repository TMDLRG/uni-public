---
lens_schema: 1
scope: wiki
key: minecraft/runbooks-deployment
corpus: minecraft
source_sha256: a71697697eaf3a04
source_body_sha256: a71697697eaf3a04
source_title: Production Deployment Guide
source_words: 319
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is a short deployment guide. It describes two ways to run the software, how to capture enough information to reproduce a run, and how to serve a future learner without letting it cheat.

The two shapes are simple. Either add the project as a dependency and call it directly from your own harness, or build a container, where one build target runs the test suite and another produces an operator image.

The part worth reading twice is the section on serving a learner safely. It says to hand the learner only encoded observations, never to expose the functions that reveal what things mean, to keep the debugging mode off when serving, and to fix the channel mapping within a scenario while varying it between scenarios, so that channel identities cannot be memorised.

A short section on scaling notes that episodes are pure functions, so they can be run side by side without shared state.

<!--CLEAR-->
This is a deployment guide for a benchmark environment, and it is short because the software has no external dependencies to fetch.

Two deployment shapes are described. In the first, the project is added as a dependency and called directly from your own harness, with the learner coupling only through the interface and the agent contract. In the second, a container is built, with one target that runs the quality suite during the build and another that produces an operator image.

A configuration section explains where scenarios and seed sets live, and asks that a provenance record be captured alongside any run. That record holds the seed, the cadence, the world dimensions and the version of the observation catalogue, which together are what make a run reproducible. The guide says to bump that version whenever the catalogue changes and to regenerate the stored artifacts.

The most important section is about serving a future learner safely, and it is a numbered list of four rules: run the agent against encoded observations only; never expose the functions that reveal meanings, the debug lens, or the raw world and body structures to the learner's process; keep the debug mode off when serving and enable it only for validation; and fix the channel mapping within a scenario for reproducibility while varying it across scenarios so that channel identities cannot be memorised.

A scaling note says episodes are pure functions with no shared mutable state, so many can run side by side across seeds and agents.

A final section on upgrades says that any change to the dynamics or the interface means regenerating the stored artifacts and reviewing the difference, and that adding a sense or an action means updating the sensing, the gating and the catalogues together, bumping the version, and extending the catalogue documents and tests.
