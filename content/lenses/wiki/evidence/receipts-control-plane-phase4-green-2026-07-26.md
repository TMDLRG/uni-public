---
lens_schema: 1
scope: wiki
key: evidence/receipts-control-plane-phase4-green-2026-07-26
corpus: evidence
source_sha256: e563687ec6a5ae82
source_body_sha256: e563687ec6a5ae82
source_title: Phase 4 — the green run, two canaries firing, and one limit that stays open
source_words: 1388
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A green run whose most interesting parts are the ones that fired, broke, or stayed open. Two tests written earlier specifically to fail once this work landed did fail, and neither was deleted; each was replaced by the thing it had been guarding. One guard was deliberately weakened, and the exact trade is written out rather than glossed over. Two of the author's own tests contradicted each other, and one was corrected on the merits rather than by moving whichever assertion would be easier to move. And one limit stays open, with a test that performs the attack and asserts it succeeds. It closes on a flat statement: no verdict has been authored about a real scientific claim.

<!--CLEAR-->
A green receipt with the counts before and after, and a note that the test count is identical across red and green, which is what makes the comparison mean anything.

The gap that mattered most is closed: the system can now record its own writes durably, in two plain files a person can open. The key property is that append-only is enforced before the write rather than detected after it, so a refused write writes nothing at all, and the refusal names the exact point where the two histories part company. The premise that this was possible without adding a dependency was checked before anything was built on it.

Two canaries fired exactly as they were written to. One had said in its own text that nothing yet persisted an anchor. The other had asserted that no module in the namespace touched disk. Both were replaced with what they were guarding rather than deleted, and the reason is given in one line: deleting a canary that fires is how a limit quietly stops being tracked.

One guard was deliberately weakened, and the trade is written out in three parts. What is weaker: one module may now touch disk. What is stronger: it is an allowlist of exactly one, so a second writer, or a writer appearing inside a reader, now fails, which the blanket form could never distinguish. What is unchanged: the purity of every read is asserted directly, function by function, and never rested on that scan. It is then mutation-tested and reverted.

Two adverse findings follow. Two of the author's own tests, written an hour apart, contradicted each other about the size of a vocabulary, and the page says which one was right on the merits rather than moving whichever assertion was easier to move. And the new tests caught two real defects in the new module, one of them a moduledoc naming the canonical evidence file, which the page treats as being one edit away from writing to it.

A fourth pre-registered phrase is corrected before anything is built on it. Taken literally, a demand that the same run twice produce identical bytes is false and must stay false, because a record carries wall-clock times. So it is split into an identity, which two runs of the same thing share, and a record, which differs and must. The subtle part is which fields sit inside the identity: the planned count and the stopping rule are hashed in, so quietly increasing replicates after seeing an answer, or declaring a stopping rule once the numbers are in, changes what run it is and leaves a mark.

One item is upgraded with its residual asserted rather than footnoted. Truncation is now caught in practice across restarts, and an absent anchor is a refusal rather than a pass. What is still not true is that it stops someone with write access to both files, and nothing local can. A test performs that attack and asserts it succeeds, so the limit cannot quietly stop being true.

An earlier rollback becomes mechanical as a test, including one that reads the canonical ledger live and asserts it really does have the awkward property, so the premise is checked rather than remembered. A build table, a verification table carrying one standing known failure, and a list of what the phase did not do close the page, ending on the line that no verdict has been authored about any real scientific claim.
