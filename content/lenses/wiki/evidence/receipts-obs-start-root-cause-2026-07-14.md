---
lens_schema: 1
scope: wiki
key: evidence/receipts-obs-start-root-cause-2026-07-14
corpus: evidence
source_sha256: 0461eba5dbdd4fb4
source_body_sha256: 0461eba5dbdd4fb4
source_title: Receipt — OBS "chronic safe mode / locale error" ROOT CAUSE + durable fix — 2026-07-14
source_words: 379
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A short record of one fault being tracked down and fixed. A piece of software kept starting in a limited mode and complaining that a file was missing. The file was not missing. The record is careful to say what was not the cause, and to list the evidence for that, before giving the two things that were: leftover marker files from processes that had been killed rather than closed, and launching the program from the wrong folder, so it looked for its own files in the wrong place. That hand launch was itself a workaround for a sandbox path filter.

<!--CLEAR-->
A receipt: one fault, its cause, and the fix, written down afterwards and marked resolved. It opens by clearing the innocent party. The installation was never broken, and the page lists what it checked in order to say so, which is the difference between a diagnosis and a theory.

The first real cause is a marker file the program leaves behind while it runs and removes only on a clean exit. Something had been starting many copies and then force-killing them, so the markers piled up, and each new start read them as evidence of a crash and dropped into a limited mode with a component switched off. That is why a port never opened.

The second cause is a working directory. When the program was launched by hand, as a workaround for a sandbox path filter, it started from the wrong folder, and it looks for part of its files relative to wherever it was started. The file it could not find was there all along. The normal launch script starts it from the right folder, which is why the fault appeared only under the hand launch.

The fix has three parts. The launch script now clears the leftover markers completely rather than partly. An operating rule says the program is only ever started by that script, and only ever closed gracefully rather than killed. And the loop that caused the repeated killing is already gone. The page ends with the output of the run that came out clean, quoted rather than summarised.
