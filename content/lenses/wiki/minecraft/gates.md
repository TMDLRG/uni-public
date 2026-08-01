---
lens_schema: 1
scope: wiki
key: minecraft/gates
corpus: minecraft
source_sha256: 4141adb6979034c9
source_body_sha256: 4141adb6979034c9
source_title: UNI Gate Registry (rendered)
source_words: 1889
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page is a rendered table, not the record itself. The real record is a file that is only ever added to, one line per gate, where no old line is ever changed. To change a verdict you append a new line and re-render the page. It says, in bold, not to edit this file by hand.

Above the table sit two short vocabularies. Verdicts are words and never percentages: passed, partly passed, failed, withheld, and pending. Evidence is graded too, from independently reproduced at the top down to not-yet-established at the bottom.

Then comes the ladder itself. Every gate the project claims appears with its phase, its verdict, its evidence class, and a link to the receipt file whose bytes carry the evidence. A summary line gives the tally, and is careful to distinguish the number of separate gates from the number of rows, because many rows are older revisions of the same gate.

What makes it worth reading is that the failure and the waiting rows sit in the same list as the passes.

<!--CLEAR-->
This is a rendered view of a ledger, and it says so at the top. The ledger itself is an append-only file with one row per gate and a published schema. Nothing on this page may be edited directly. Changing a verdict means appending a new row and re-rendering, which means the history of a verdict is preserved rather than overwritten.

Two vocabularies are declared before any result appears. Verdicts are drawn from a fixed set of words and are never scored as a percentage. Evidence is also classified, separating a result that was independently reproduced from one that was observed with an artifact, from plain command output, from a security-relevant claim that is unproven, and from something that has not yet been established at all. That second vocabulary is the interesting one, because it lets a passing verdict still be marked as weakly evidenced.

A summary line gives the tally by name, and it is careful to say that the row count is larger because many rows are superseded revisions of the same gate. Stating both numbers, rather than one, is what keeps a backlog from being confused with the history of a backlog.

The rest is the table. Each row names a gate, the phase of work it belongs to, its verdict, its evidence class, and the receipt file that carries the evidence. The gates span very different kinds of work: the mathematics and behaviour of the agents, the studio and broadcast surfaces, network and naming changes, and a long run of gates about honesty itself, whose names describe a display refusing to show a green it did not measure, or refusing to imply a claim no code enforces.

Several rows are pending, which the vocabulary defines as pre-registered but not yet run. Several are partial. One is a failure, and it is left in place rather than removed. That is the point of the page: the adverse rows are not filtered out of the view.
