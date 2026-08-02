---
lens_schema: 1
scope: wiki
key: evidence/receipts-door-apocalypse-survival-2026-07-14
corpus: evidence
source_sha256: 9dae19feb45450b0
source_body_sha256: 9dae19feb45450b0
source_title: Receipt — door-boot-persistent (The Door survives an apocalypse) — 2026-07-14
source_words: 483
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A record of testing whether a small piece of software comes back after being killed in several different ways. Three of the four legs were run live that day and came out well: two copies cannot both run, killing the process brings it back, and after killing everything a single click on the icon rebuilds the whole chain. The fourth leg, surviving an actual restart of the machine, is honestly marked as not yet, because no restart had happened since the thing was installed. The verdict is partial rather than pass, and that is the point.

<!--CLEAR-->
A receipt — the file recording what was run — with a partial verdict, and the partial is the honest part of it. Three legs were run live and are recorded with their output; the fourth waits on something that had not happened yet, a real power cycle.

The build list comes first. A supervisor watches the process and restarts it, and a startup installer leaves a marker recording when it was installed. An arbiter checks the restart leg on its own and cannot pass falsely, because it requires the boot to be later than that marker and the supervisor to have started after the boot. An icon path always tries to bring the chain up, and falls back to a static triage page if nothing can run at all, so the door never dead-ends. One survival property is marked as inspected rather than executed, which is a weaker class, and it is labelled as such rather than counted with the rest.

Then a section most receipts would leave out. The first design was falsified by its own drill. The check for a duplicate copy matched on command text, and it matched the operator's own tool shell, so a fresh copy saw a phantom twin and exited, leaving nothing running at all. The log line is quoted. The fix was to arbitrate with a named lock instead, where only a real holder counts as a twin. The failed drill and its correction are kept as part of the receipt.

The drill outputs are quoted verbatim, one block per leg, each ending in its own verdict line. The last block is the restart leg, and it prints its inputs and its refusal: the boot predates the install, so the answer is not yet. The page closes by saying exactly what would flip the gate, which is to run the arbiter after the next real restart and append a superseding row citing that output rather than editing this one.
