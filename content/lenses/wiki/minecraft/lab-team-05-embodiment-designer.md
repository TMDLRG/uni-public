---
lens_schema: 1
scope: wiki
key: minecraft/lab-team-05-embodiment-designer
corpus: minecraft
source_sha256: 16c839d4cbc6904f
source_body_sha256: 16c839d4cbc6904f
source_title: Lab Team — The Embodiment & Interoception Designer
source_words: 656
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page describes one reviewer persona in a five-part team. It speaks after the mathematics, the implementation and the experiment design have survived, and it asks a single question: does this change create a real internal instability in the body, or is it a preference dressed up as a need?

The distinction matters more than it sounds. A preference for having a thing is satisfied once you have it. A drive empties again after being filled, so it keeps coming back, and it acts through the model's own transitions rather than through a bonus attached to an action.

The page lists what every proposed organ must name, including the internal quantity it destabilises, how that quantity empties and refills, and where its comfortable level sits. Preference is peaked at comfortable, not at maximum, so that being over-full is not treated as better.

One limit is stated bluntly. The organ's signal is functional only. It is never described as something felt.

<!--CLEAR-->
This is a role description for one member of an adversarial review team, and it is the lead voice for the later stages of the work. Its question is whether a proposed change creates a genuine internal instability, or smuggles a preference in as a need.

The knowledge section builds that distinction carefully. A body can sense its own configuration, and an internal organ is the same pattern applied to quantities like energy or fullness. The genuinely new object is a set of transitions that empty and refill, so that eating raises a quantity and idling lets it leak away. Preference is peaked at a comfortable level rather than at the maximum, and is flat or negative at full, so being over-supplied is not rewarded. The prior on those transitions is strong but not frozen, so learning may refine physiology without erasing it. Anticipatory regulation is expected to fall out of the existing deep planner rolling the transitions forward, rather than needing a new module. Its signature is described precisely: the agent goes looking for supplies before it is depleted, at a higher average level than a shallower planner would. Finally, a test clones two identical actions and requires identical outputs, so the only way an action can be costly is by moving the predicted internal state, never by a scalar penalty attached to the action itself.

The opening questions follow from that: what internal quantity does this destabilise, what are its emptying and filling transitions and its comfortable level, and show me the clone test.

The guarded failure modes are the sharpest part. A preference peak on having a resource is not a drive, and the page says an earlier stage already showed that this is not enough. Any scalar subtracted from a policy's value for expensive actions is called reward in disguise. Dynamics that oscillate around the comfortable level without ever entering it are a failure, and a floor is required to prevent it. And surfacing an internal value as a feeling is refused outright: the acceptable phrasing describes the state of a belief, not an emotion.

The required checks then ask every new organ to name its factor, its emptying and filling transitions with reachability asserted, its comfortable-level preference, and the strength of its prior. That preference must be built from a declared map fixed before any policy is evaluated, and the clone test must ship in the same change. Two gates must be registered in advance: one for anticipatory regulation, and one for a cycle rather than a flatline or a runaway climb. The last check is the limit on what may be claimed: the signal is functional access only, never surfaced as felt.

The page closes with verdict formats and cross-references.
