---
lens_schema: 1
scope: wiki
key: encyclopedia/wing-mu-mu5-lab-team-ship-gate
corpus: encyclopedia
source_sha256: 49a56064b6254c39
source_body_sha256: 49a56064b6254c39
source_title: mu5 - Lab-team, ship-gate and runner discipline
source_words: 2094
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

Process, not science: everything here is about how the lab runs itself. Four things get covered. The review that decides whether a change may merge at all. The division of labour that says who signs the science. The way a long experiment reports its own status without flattering itself. And the ceiling on how many agents may be set running at once before a fan-out falls over. The work being governed is a developmental active-inference simulation, a bounded peek at a toy world, and nothing in the chapter is a claim about what that simulation can do. Its hardest fence separates a chain being valid from an event having happened. An audit chain that comes back valid is not evidence that the audited event ever fired at runtime. The ledger says that twice, and so does the chapter. A ship-gate that works is a fact about the lab's process, never evidence that a science gate was met.

<!--CLEAR-->

Every proposed change is reviewed through a five-persona team: a breaker who rejects by default and runs a gauntlet of checks, a theorist who owns the merge, an architect who requires every change to be additive and byte-identical on the default path, an experimentalist who pairs each claim to a pre-registered adversarial run, and a designer who refuses preference hacks dressed up as drives. The team is not decorative, and an adversarial pre-registration once forced a gameable bar up to a much stricter one when a decorative fake slipped past the original. The operative rule is exact: no merge without a merged signature, a typed specification and a paired adversarial run. The gate is credible only because it has visibly rejected things, including things the program wanted to be true.

A division of labour is recorded as owner-set protocol: one party writes code, a separate private consultant designs and signs the science and is never published, and the live system runs the program without writing its code.

The provenance backbone is a tamper-evident audit chain that returns valid when events are hashed in sequence and invalid when one is tampered with. This is also the place the program is most tempted to overclaim, so the paired negative is cited in the same breath: a chain returned valid over hundreds of events while the running system's own log contained none of the events that mattered. The route had been built and tested, and had never fired against the deployment. Citing the valid chain without that negative is an overclaim.

Further sections cover a receipt loop in which each burst of work closes with a falsifiable receipt, a documentation discipline whose first implementation was wrong and was caught, a durable runner built on the principle that silence is not success and that a status chip reading as running over a dead process is a falsified inference, and a bound on multi-agent fan-out derived from a burn in which most of the agents died.
