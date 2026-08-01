---
lens_schema: 1
scope: wiki
key: minecraft/harvest-fix-plan
corpus: minecraft
source_sha256: 0f30a0b79626f6cd
source_body_sha256: 0f30a0b79626f6cd
source_title: Harvest-skill fix — GPT-validated, engine-preserving (2026-06-22)
source_words: 605
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is a dated fix plan for one specific failure, and it is unusually careful about where the failure was not.

The symptom: a live colony spent hours stuck at an early stage, having gathered no wood. The cause, traced through live probes, was in the body rather than the mind. The digging action only worked at very close range while the sense that spotted a tree worked much further away, there was no step that walked toward the tree, no way to aim downward, and a failure was being swallowed silently. So the agent never once landed a dig on a log, the outcome it preferred was never observed, and the transition that would have taught it never got credited. The result looked like an agent that could not learn, and was an agent that never got the chance.

The plan therefore forbids editing the engine at all. The fix lives in the body and in the model's content, and it registers its acceptance gates before the run.

<!--CLEAR-->
This is a dated repair plan for a single problem, and its value is in how carefully it separates the parts of the system that were working from the part that was not.

The symptom was a live colony stuck at an early stage for hours with nothing gathered. An audit plus live probes traced a chain rather than a single fault. The digging action only reached a short distance, while the sense that noticed a tree reached much further. There was no step that approached the tree, no way to aim vertically, and a failure was being caught and discarded without a log. The consequence follows mechanically: no dig ever landed on a log, so nothing entered the inventory, so the inventory observation stayed empty forever, so the belief about it stayed spread evenly, so the transition from empty to holding wood was never credited to the digging action, so the strong preference for holding wood exerted no pull at all, and the agent wandered.

The plan is careful about the conclusion it draws from this. It cites an outside consult which agreed the diagnosis was right and phrased the ledger-safe version as the engine not having been falsified while the live colony was blocked at the body interface and by missing intermediate content in the model. It also records what that consult explicitly would not sign, which was the stronger claim that execution was the only problem. Evidence that the engine learns wherever events actually occur is given, because other parts of the model did learn.

A hard constraint follows: the engine files are not to be touched. The fix lives in the body's motor code and in the content of the model, meaning morphology, preferences and habit priors. One instruction is singled out: do not attach a reward to the digging action, because preferences belong over outcomes and habits over policies, and rewarding an action directly would not be canonical.

The plan itself is ordered by priority. First make the digging action a compound primitive in the body, so that it finds a target, moves toward it, aims properly, digs, logs each stage rather than swallowing the failure, and checks whether anything was gained. Second, add intermediate observation channels so the steps in between become visible at all. Third, add preferences over those intermediate outcomes leading to the goal, make the goal preference persistent rather than deleted when a stage advances, and bias the habit prior toward the useful actions. One recommended change is deferred outright because it would require editing the engine.

The acceptance gates are registered before the run, and the last one is the honest clause: if the mechanism and behaviour gates do not pass, the result is withheld rather than scored, and the partial outcome is recorded.
