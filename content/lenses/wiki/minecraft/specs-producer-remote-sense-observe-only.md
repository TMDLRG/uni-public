---
lens_schema: 1
scope: wiki
key: minecraft/specs-producer-remote-sense-observe-only
corpus: minecraft
source_sha256: 79c3d3c0feb18a0e
source_body_sha256: f6f6c4a8489a9d7a
source_title: Typed model spec — Producer remote colony-sense + observe-only fence
source_words: 828
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is a typed design specification, reviewed and signed with required changes, for letting one component sense a colony running on another machine while being unable to act on it.

Most of the page is a table with one row per part of the model, saying what it was before, what it becomes, and why. Almost every row says unchanged, which is the point: only the transport of one observation changes, and three specific actions become logged no-ops.

The most interesting row is a correction. An earlier draft claimed the component could adapt to actuators that no longer work. It cannot, because it does no learning. So the fence creates a standing prediction error the component has no way to resolve, and the spec instruments that rather than hiding it.

One fix is forbidden outright: quieting those blocked choices by attaching a cost to an action, which the spec calls reward in disguise.

<!--CLEAR-->
This is a typed model specification with a review verdict attached: signed with required changes, with the required changes folded in and an owner decision recorded.

Its shape is a table with one row per slot of the model. The state space is unchanged; no factor is added or removed. The observation channels keep the same shape, and only the transport of one of them changes, from a local read to a read from another machine, with a strict rule about which remote call is allowed and which is forbidden, because the forbidden one would perform a write on the remote side. Every failure mode falls back to an empty result, and rows are normalised so a shape difference between versions cannot silently remap the channels or crash a display.

The action space is also unchanged as a set. What changes is what happens after a decision: under an observe-only option, exactly three actions become logged no-ops with counters, while camera and narration instructions pass through untouched. A second layer of defence refuses those same operations at their source. The spec is careful to say the fence lives after the decision, in the process rather than in the model.

The preference model is unchanged, with an honest note that under the fence two preferences are watch-and-narrate only, and that because the colony sits at its preferred size the blocked limbs stay latent in the experiment, which it describes as untested rather than absent.

The learning row carries a correction, and it is the most instructive part. An earlier draft claimed the component could adapt to actuators that no longer respond. It cannot, because all learning is switched off. The consequence is spelled out: the fence creates a standing, unresolvable prediction error, since the frozen model keeps predicting the blocked action works and may keep choosing it. The spec insists the senses stay honest, saying that faking them would be fraud of a class already named in this project, and it adds a tripwire that aborts to an inconclusive result rather than letting a masked failure look like a verdict.

A binding paragraph forbids one fix outright: quieting the blocked choices with a per-action cost or an edit to the shipped preferences, which it calls reward in disguise. An observer-role variant would be lawful only as its own separate configuration through its own review.

A long deployment section names the shape of the container, the settings that are load-bearing because an unfenced node would act on the live world, what the camera is allowed to do and what it is forbidden to touch, and one detail caught in a registry check. It also states plainly that two of these minds will then sense the same colony, one keeping its hands and one fenced.

A final list names the files the change touches.
