---
lens_schema: 1
scope: wiki
key: minecraft/specs-metric-plateau-break
corpus: minecraft
source_sha256: 483137425242ba42
source_body_sha256: 7584a5fefa5701ef
source_title: Plateau-Break PASS Metric — RCON-authoritative measurement spec (Artifact #3)
source_words: 2954
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A yardstick, labelled at the top as a design and measurement spec, and the page is careful to say it is only a yardstick. It changes no agent code, no curriculum and no preference; it defines what the collector measures so that a result can be judged.

It exists because the old measure was perverse. The previous condition could be satisfied by an agent that chopped wood, crafted one tool, and then stockpiled without ever placing a block or touching a new kind of resource. A live run reproduced exactly that.

The replacement has a primary measure, whether the building chain was entered at all, and a secondary one, whether the resource base was diversified beyond what was already farmed. Both are computed from the game server's own authoritative counters rather than from what an agent reports about itself.

A whole section argues why hoarding can never satisfy it, and another sets the scoring rules so a verdict cannot be moved after the fact.

<!--CLEAR-->
A measurement rather than a change, and its status line says so outright by calling itself a design and measurement spec. It is careful about that boundary: it does not alter the agent's internal goal condition, its curriculum, its preferences or any source code, and nothing here is deployed. It is the instrument a separate collector reads, and it says explicitly that it must stay independent of the cure it measures or it would no longer be an independent yardstick.

It opens with a binding claim fence stating that everything it measures is an operational behavioural quantity, necessary but not sufficient, with no evidential weight for awareness or life.

The reason it exists is a perverse measure. The previous condition, which the agent's own curriculum used to decide it had progressed, could be satisfied by a pure hoarder: chop wood, craft one tool, then stockpile, never placing a block and never diversifying. A live run reproduced exactly that failure, with the control arm accumulating many of one tool and reaching no stone and no building, and both arms tied on the phase counter. The page cites the owner ruling that replaced it.

The replacement has two measures. The primary one asks whether the building chain was entered at all, judged by blocks placed or used. The secondary one asks whether the resource base was diversified beyond what was already being farmed, judged by distinct types mined against a registered baseline, with the tool-crafting chain deliberately tracked for context but not scored as diversification.

The computation is set out exactly and reproducibly. Objectives are registered once at the start, before the first reading, so that the baseline of already-farmed material is known and can be excluded rather than counted. Each reading is taken from the game server's own authoritative counters, on a fixed cadence, for both arms in step. The scoring arithmetic is computed on the collector's side and is cumulative and non-decreasing, so an objective once reached cannot fall.

A registered gate form follows, with the instruction to fill in the numbers before the run rather than after.

One whole section is an argument rather than a procedure: why hoarding can never satisfy this metric. Since the primary measure counts placement and the secondary counts distinct kinds beyond a baseline, stockpiling more of the same thing moves neither. That section is what makes the metric worth trusting.

The verdict discipline section turns two owner rulings into explicit scoring rules, so a result cannot be reinterpreted afterwards. A scope fence then restates what this file does not touch, drawing a clear line between the measuring instrument and the cure being measured, and noting that pointing the agent's own internal goal at placement would be a separate change reviewed and gated on its own.

The page ends with an index of where each piece of evidence lives, and a closing line repeating that no source was edited and nothing was deployed.
