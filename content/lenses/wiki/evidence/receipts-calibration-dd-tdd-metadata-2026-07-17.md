---
lens_schema: 1
scope: wiki
key: evidence/receipts-calibration-dd-tdd-metadata-2026-07-17
corpus: evidence
source_sha256: 8d69d586db3112fc
source_body_sha256: 8d69d586db3112fc
source_title: Receipt — calibration: every signal sorted to the DD/TDD metadata contract
source_words: 486
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
Two pieces of housekeeping, both finished. The first: a batch of rows in a ledger — a list added to and never edited — had been written in the wrong shape. So the page that renders the ledger showed dashes where a class and a link to the run's own record should have been, even though those files existed on disk. Rather than edit history, corrected rows were appended, because only the last row per name is rendered. The second: the part of a display that decides what to show had no tests at all. Its decision logic was lifted into plain functions and tested, including a rehearsal that put the old faults back to check the tests would notice.

<!--CLEAR-->
A receipt — the file recording what was run — in two parts, both marked pass. The theme joining them is metadata that had drifted out of the shape its own contract required.

The first part is a ledger: a list that is added to and never edited. A batch of rows had been written with keys that did not match the schema the project publishes for them. Nothing was lost, but the renderer reads particular fields, so those entries appeared with empty class and receipt columns even though the receipts sat on disk. The fix respects append-only history: for each nonconformant name a corrected row was appended, mapping the old keys onto the contracted ones and leaving the verdict and the receipt itself untouched, and the renderer shows the last row per name. A short block of output states how many current rows now fail the schema and how many point at a receipt that is not there.

The second part is about tests that did not exist. The suite covered the service behind a display, but not the part that decides what the display should say, which is exactly where a run of honesty fixes had landed. The page quotes its own standing rule: no green claim about that part is permitted until this gate exists. The fix extracts the decision logic into pure functions with no dependency on the graphical framework, and a separate test project exercises them against the awkward inputs, including no data, stale data, a blind sensor, and recovery afterwards.

The part worth copying is the rehearsal. A test that never fails shows nothing, so the three old faults were deliberately put back and the suite went red in exactly three places, then green again once they were removed. The deployed display renders the same as before the extraction, and the page lists which earlier gates move from partial to pass now that this one exists.
