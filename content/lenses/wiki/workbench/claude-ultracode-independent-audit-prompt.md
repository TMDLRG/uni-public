---
lens_schema: 1
scope: wiki
key: workbench/claude-ultracode-independent-audit-prompt
corpus: workbench
source_sha256: 84a20fd7709ca5c7
source_body_sha256: 84a20fd7709ca5c7
source_title: Claude / Ultra Code Independent Audit Prompt
source_words: 1566
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

A prompt, not a report. It is written to be handed to an assistant that has been given
access to a private repository, telling it how to audit a scientific software project from
the outside. Nothing here is a finding. Everything it describes is work that would still
have to be done.

The instruction at its heart is simple. Do not agree by default, and do not work toward a
green dashboard. Rebuild the project in a fresh copy, run its checks, then deliberately try
to break them and see whether anything notices — by relabelling a reconstruction as an
observation, say, or by swapping one species for another. Redo the important mathematics by
a second, independent route. Trace every claim back to the source it came from. Write down what
failed, and never quietly drop a result that came out badly.

It is worth reading for anyone who would like to see what it looks like when a project asks
to be taken apart rather than admired, and writes the rules for that in advance.

<!--CLEAR-->

An instruction sheet for someone else to follow, and not a record of anything that
happened. It is written to be pasted into an assistant that has been given access to a
private repository, and it asks that assistant to audit a scientific software project as an
independent outsider. It reports no results. Everything in it is work that would still have
to be done.

The mission it sets is blunt. Build the repository, run it, inspect it, and try to falsify
it. Do not agree by default, and do not aim at a green dashboard. Work out what the
implementation and the evidence actually support. It also fences the finished product:
whatever tools the reviewer uses, the released application must stay on ordinary processors
and carry no hidden model calls, no tracking and no accounts. And it names the temptation it
works hardest to head off, which is reading passing software tests as though they had
settled the biology, or human parity, or scientific significance. Those stay separate
hypotheses.

The work runs in stages. The first changes nothing: record the machine, the versions and the
exact state of the copy. Next, list every claim the project makes anywhere: in documents, in the interface, in code, in captions, in reports. For each one, record where it came from, which species it concerns, what test covers it, what would show it wrong, and whether it is supported, conditional, unsupported, contradicted, not tested or external.

Then a clean rebuild, with every command, its exit status, its outputs and its checksums
written down. If something needed is missing, the honest entry is that it did not run.
Absence may not be converted into a pass.

Then the tests themselves go on trial. In a separate, disposable copy the reviewer breaks things on purpose. Labels reconstruction output as observed, swaps the species, leaks motors between training and holdout. Counts frames as independent replicates, removes an adverse result, computes a prediction after the observation has been revealed. Each time, the
question is whether the tests catch it. Anything that survives is a gap in the tests, and
the damage is never committed back.

After that, the central mathematics is rederived by a second independent route, with units,
assumptions and failure conditions stated. The evidence is rechecked against its sources, so
that nothing at runtime can relabel reconstruction, derived data or inference as observed. A
person then walks the application by hand, on small screens, at high zoom, with a keyboard
only, writing a prediction down before the evidence is revealed.

The final stage is the point of the whole page: even when every gate is green, keep trying
to break it. Compare against simpler models on identical splits, remove parts to see what
they were doing, run negative controls, freeze predictions before the reveal, and map where
the model holds and where it fails. Rank what to measure next by expected information gain.
Prestige is not an acceptance criterion.

The page closes by prescribing the exact shape of the report to be returned, including a
section for failed and adverse results that it says may never be omitted.
