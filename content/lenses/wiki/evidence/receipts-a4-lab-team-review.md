---
lens_schema: 1
scope: wiki
key: evidence/receipts-a4-lab-team-review
corpus: evidence
source_sha256: 8ddad2b82010af07
source_body_sha256: 8ddad2b82010af07
source_title: A4 spec — lab-team ship-gate review receipt (2026-07-11)
source_words: 581
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is the outcome of an adversarial design review, where five reviewers with different jobs each tried to break a proposal before anyone built it. The merged verdict is neither a yes nor a no: sign with changes. The bones are sound, but the design may not become code until fifteen named blocking changes land, three follow-on documents exist, and the owner agrees. The page also says clearly what kind of approval this is. It signs a design, not a result, and the mechanical claims stay unverified until their gates fire at runtime.

<!--CLEAR-->
A review receipt: the file recording what the reviewers ran and what came back. Five reviewers, each with a mandate and each grounded in the cited code, went at one design proposal, and a merge produced a single verdict. That verdict is sign with changes, unanimously, with no rejection. The rest of the page is what the changes are.

The conditions are stacked rather than alternative. The proposal may not become code until fifteen blocking changes land, three follow-on artifacts are complete, and there is an owner go-ahead and a live-stream guard. Then a line is drawn under what kind of approval this is: it signs a design, and the mechanistic claims stay unverified until their activation gates fire at runtime.

The fifteen blockers are listed in a table with the persona that raised each one and the document where it was resolved. Read as a group, most of them are about the honesty of the measurement rather than about the idea. Several demand that a single-variable comparison actually be single: bind the shared component into both arms, pin the setting that is not under test, add an intermediate arm so that two changes are not bundled into one. Several demand that qualitative gates become numbers written down before the run. One insists the unit of replication is a distinct world seed rather than several bodies in one seed, which is the difference between replicates and repeated measures. Others are structural. Enforce a size rather than clamping it, index by name rather than by position, and restate precisely where preferences enter the calculation. Demote an aspirational ladder to motivation, because the module that would carry it is not wired into the live path.

A shorter section records what was checked and found clean, with a file and line for each, so that the absence of a change is also evidence rather than silence. The last line draws a limit around the review itself: this was a rigorous pre-check, not the signed output of the formal process, and the corrected documents still have to go through that before any code is touched.
