---
lens_schema: 1
scope: wiki
key: evidence/receipts-metabolism-live-wiring-gap
corpus: evidence
source_sha256: 199d13691240de9e
source_body_sha256: 199d13691240de9e
source_title: FINDING — the metabolism organ is NOT wired into the live colony path (2026-07-11)
source_words: 1029
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A finding that explains an earlier null at the level of mechanism: the organ everyone was comparing was never running in the live path at all. The code that maintains it lives in one process, and the live colony runs a different one, so the treated group carried an inert extra part and behaved like the control, which is exactly what an inactive organ predicts. The page then reports the fix, two further problems found when re-probing, and it keeps repeating that the organ was not merely unverified but inert, that no production-cleared gate exists, and that no live activation claim may be made.

<!--CLEAR-->
A finding rather than a receipt — a record of something run — marked load-bearing, and it blocks a claim rather than supporting one.

What was tested is a short live run with the energy read every twenty seconds. The bodies connected and did real things in the world, but the energy belief sat flat and the store read as empty for the whole run.

The root cause is shown by reading the code rather than by inference. The live colony spawns one kind of process whose step loop never calls any of the three functions that would create the observation, advance the store, or apply the viability edge. Its state carries no such field at all, and the entire loop lives in a different process that the live colony does not run. So the factor receives no observation, the belief stays uniform, the store is never maintained, and there is no death edge.

The consequence is stated directly. This explains the earlier phase's null at the mechanism level: the organ was inert, not merely unverified, so the treated arm carried an extra inactive part, and indistinguishable arms are exactly what that predicts.

A short section says what is not affected. The maths is correct when driven, which the offline harness shows because it calls those functions itself. The implementation in the other process is real and simply not on the live path. And the structural guards stay green.

The fix touches a sensitive part of the system, so it carries a review and an owner's go-ahead and must leave the default byte-identical. Then the page keeps going, which is what makes it useful. After the fix landed the store was present live, but the step still was not observed running, for two newly surfaced reasons. The container auto-started a different colony and the intended bodies never joined the world, so the loop never fired. And the drain rate was tuned for an abstract tick rather than the live cadence, so bodies would have died within seconds. The second is then resolved by scaling the drain by elapsed real time, with the offline behaviour left byte-identical, and the improvement is quantified as how long an idle body now lasts.

The last section refuses to round anything up. The deployment problem is still open, it is named as plumbing rather than science, and the page repeats that no production-cleared gate exists and that a live activation claim must not be made. A closing limit keeps all of it to mechanism and behaviour.
