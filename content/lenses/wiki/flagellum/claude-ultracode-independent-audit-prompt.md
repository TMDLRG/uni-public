---
lens_schema: 1
scope: wiki
key: flagellum/claude-ultracode-independent-audit-prompt
corpus: flagellum
source_sha256: 9569988e0f97d442
source_body_sha256: 9569988e0f97d442
source_title: Claude / Ultra Code Independent Audit Prompt
source_words: 1881
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

Instructions, not results. This is the text you hand to an
independent reviewer — here, a language model with coding tools — when you want the whole
project torn apart rather than praised.

The instructions are blunt about the goal. Do not agree by default. Do not optimise for a green
dashboard. Work out what the code and the evidence actually support, and if everything already
passes, that is where the harder work starts, not where it stops.

Most of the page is a numbered walk through phases. Record the exact state of the copy before
touching anything. Inventory every claim and where it came from. Build cleanly and record every
command. Attack the tests to see whether they could fail at all. Redo the mathematics by an
independent route. Check the evidence and the labels. Walk the product as a human. And then
hunt for ways the whole thing might still be wrong.

It ends by prescribing the exact shape of the report that must come back, including a section
for failed and adverse results which may never be omitted.

<!--CLEAR-->

The page is a template. Nothing in it has been run; it describes work to be commissioned. It
opens by naming the repository and asking the reviewer to clone it fresh, read the operating
contract in full, and follow that contract rather than this prompt where the two meet.

The mission paragraph sets the tone. Independently build, execute, inspect, falsify and audit
the whole repository. Do not agree by default. Determine what the implementation and the
evidence actually support, and if all existing gates pass, begin deeper falsification
immediately. It warns against inferring biological parity, human parity, general intelligence
or scientific significance from selected results or passing software tests; those are separate
hypotheses needing broad evidence, committed in advance and independently replicated.

The phases are the body of the document. First, establish identity without modifying anything:
path, branch, remotes, status, operating system, tooling versions, and confirmation that the
copy matches the published commit. Second, build a list of every material claim with its
source, species, scale, experimental unit, evidence tier, test, gate, uncertainty, limitation,
and what would show it wrong. Then trace an auditable chain from source file through checksum,
ingestion, model input, frozen prediction, observation, score, gate, report and export. Third,
use a genuinely clean copy, run the required commands and record exit status, duration,
artifacts and whether reruns match, reporting anything unavailable as not run, not as a pass.

Then the adversarial phases. Audit the tests themselves: what each really measures, whether it
passes vacuously, whether expected and actual share an implementation, and whether a wrong
implementation would fail. In a disposable copy, introduce a named list of deliberate
corruptions. Swapping directions, labelling generated output as recorded, swapping species,
breaking normalization, leaking units across the training boundary, counting frames as
replicates, mixing physical work with the informational quantity, removing an adverse result.
Then report any that survive. Redo the central mathematics by an independent route and test the
awkward cases. Recompute every checksum and confirm that no runtime state can relabel a
reconstruction or a synthetic output as recorded. Then complete the product walkthrough as a
human: several screen sizes, keyboard only, a prediction entered before each reveal.

The falsification phase is the longest. It asks for explicit null hypotheses, then families of
experiments run in parallel with fixed seeds. Leaving out one unit or study at a time. Comparing
against serious alternative models on identical splits. Ablating each component. Recovering
parameters in correct and misspecified synthetic worlds. Sweeping for robustness, running
negative controls, freezing predictions before reveal, and mapping where competing models would
most disagree. The validity of the model is then to be mapped across species, load,
temperature, apparatus and timescale, with each region classified as supported, tentative,
contradicted, unidentifiable, unobserved or extrapolation-only. Prestige is explicitly not an
acceptance criterion.

A later section, added after a real failure, binds any review that fans out across
several agents. Findings must go into three buckets, not two: confirmed, refuted, and
unverified. A missing, null or errored verdict is unverified and never refuted. The rule exists
because a review harness once counted dead agents' empty verdicts as dismissals, so findings
nobody had examined were reported as cleared.

The page closes with the exact section list the returning report must use, and the sentence to
write if no implementation difference is found. Its governing objective: find the strongest
world in which the model survives serious alternatives, map precisely where it fails, and let
risky evidence, committed in advance, decide whether that world can expand.
