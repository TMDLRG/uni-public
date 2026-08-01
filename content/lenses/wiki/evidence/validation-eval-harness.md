---
lens_schema: 1
scope: wiki
key: evidence/validation-eval-harness
corpus: evidence
source_sha256: bfd33d95fa2de649
source_body_sha256: bfd33d95fa2de649
source_title: Evaluation Harness Guide
source_words: 380
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
Scoring a simulated run after it has happened is what this part of the codebase does, and the guide's first line is the most important one: none of these scores are shown to the agent while it runs. They exist for reports and for catching regressions. The page then lists what gets scored, the cut-down versions of the body used for comparison, the commands to run it all, and how the reference set of seeds was tuned so that surviving is neither trivial nor impossible.

<!--CLEAR-->
A reference page for the scoring side of a simulation, written for someone who is going to run it. Its opening line is a boundary rather than a feature: the measures here are never fed back to the agent, and exist for reports and regression tests.

First comes a table of per-episode measures, grouped by what they are about. How long the run lasted and whether it stayed viable. How far the body developed. The shape of the risk trajectory. How much of the sensing, and how much of the body, actually got used. How often the interface was misused. What was built, and how far the world expanded.

Then the ablation presets: cut-down configurations that remove development, or the senses, or the appendages, or the deeper sensing layers. A suite runs all of them across a list of seeds and reports each preset's averages plus the gap against the full body. Beside that sits a non-statistical check that counts how many channels a full body can see compared with one missing a sense, offered as structural evidence rather than statistical evidence.

A short section gives the commands to run one episode, run the suite, or capture the whole bundle. Another sketches how an evolutionary loop would sit on top as a thin wrapper, and makes a point of saying that no fitness number is handed to the agent; the pressure is the world itself. The closing section explains how the reference batch of seeds was calibrated, and points at two ablation reports for the numbers rather than restating them here.
