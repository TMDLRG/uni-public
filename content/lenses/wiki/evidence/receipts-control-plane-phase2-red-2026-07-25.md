---
lens_schema: 1
scope: wiki
key: evidence/receipts-control-plane-phase2-red-2026-07-25
corpus: evidence
source_sha256: 8569968a523fd279
source_body_sha256: 8569968a523fd279
source_title: Phase 2 — the red run, recorded before any implementation
source_words: 578
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is the record of a test run made deliberately before the code existed, so that the tests could be shown failing for the right reason. Nearly all of them fail because the modules they call have not been written. Three passed anyway, and the page says outright that two of those passed for no good reason: they scan a directory that does not yet exist, and a scan over nothing cannot fail. It also records one adverse finding about the mechanism itself, which no amount of care inside the design can fix.

<!--CLEAR-->
A red run. The tests were written first, run against a commit where the code they call does not exist, and the output was recorded before anything was implemented. The page opens with the command and the totals, then makes the point that matters: every failure is an undefined module, so the tests fail for the stated reason rather than for an accidental one.

A table pairs each test file with the failure mode it was written to catch and the failure actually observed in the red state. That pairing is what turns red-then-green from an assertion into something a reader can check file by file.

The most unusual section admits weakness. Three tests passed in the red state, and two of them passed vacuously, because they scan a directory of source files that does not exist yet. The page marks them as such in a table with a column that says plainly whether each was vacuous. It argues for keeping them anyway, since they are the only mechanical statement of a limit the language cannot enforce at runtime. They acquire force only at the green commit, where the later receipt, the file recording the run, shows it was not vacuous. The third pass is defended as a genuine precondition on a schema file that would fail if that schema changed.

Then the adverse result, stated as a property rather than as a bug. A hash chain does not detect deletion from the end, because a prefix of a valid chain is itself a valid chain: every link still resolves and the sequence is still unbroken from the start. Deletion from the middle is caught, deletion from the tail is not, and no amount of internal hashing fixes it. Detection would need an anchor held outside the chain, carrying the expected head and the expected length. The test asserts both halves, so the limitation cannot be quietly forgotten.

A short closing list records what did not move: no dependency added, no entry written to the list that counts, a user-owned file untouched, no verdict authored and no gate row appended.
