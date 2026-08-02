---
lens_schema: 1
scope: wiki
key: evidence/receipts-g4-allostasis-horizon-limited
corpus: evidence
source_sha256: 0f0db0ca8afb16bb
source_body_sha256: 0f0db0ca8afb16bb
source_title: G4 allostasis — horizon-limited, does NOT clear on the current model (2026-07-11)
source_words: 356
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page records a gate that does not pass, and says so on purpose. The idea under test was that planning further ahead should make the system top itself up earlier, which would be anticipation rather than reaction. Across several planning depths, it made no difference at all. The reason turns out to be structural: the danger the plan would need to see lies further ahead than the plan can look, so looking deeper adds nothing. The result is written down rather than quietly skipped, and the page says what kind of change would be needed to clear it.

<!--CLEAR-->
An adverse result, recorded deliberately so that a gate does not silently disappear from the list. The claim under test was that deeper planning would trigger the top-up behaviour earlier. It does not, on the current model, at any of the depths or phases tried.

The evidence is a small deterministic sweep, and its table is flat. The trigger sits in the same bin whatever the planning depth, and the difference between the deepest and the shallowest is zero in every row.

The root cause is offered as structure rather than as a guess, and it matches an existing design note. At the drain rate in use, the fall from comfortable to empty takes far longer than the planner can see ahead. The cliff is outside the window, so a deeper plan has nothing extra to react to, while the existing reactive trigger already fires at the setpoint. A reduced version described in that same note had shown the effect can separate only under a much stronger bonus than the live map provides.

The page then names what would clear the gate: carrying the pressure into the plan through a slower signal, so that anticipating does not require the danger to sit inside the planning window, or else a longer effective horizon. The module for that exists but is not wired into the live path, so this is deferred work rather than a fix waiting to be applied. A closing note names a different gate as the next one that can be cleared, and a stated limit keeps the finding to mechanism: a property of a planning horizon in a model, never experience.
