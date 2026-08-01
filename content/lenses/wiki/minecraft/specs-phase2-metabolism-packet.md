---
lens_schema: 1
scope: wiki
key: minecraft/specs-phase2-metabolism-packet
corpus: minecraft
source_sha256: 93a77ba202e2c58f
source_body_sha256: aac55e7348fd099a
source_title: Phase-2 Proposal Packet — the `:metabolism` interoceptive organ
source_words: 5831
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is a proposal packet: the single document that goes into an adversarial review. It is design only, with no engine code written and nothing deployed.

It is written in a deliberate order. Name the mathematical objects before any metaphor. Then the intended behavioural effect. Then the typed model difference in the nine sections every organ inherits. Then the failure modes, listed as refuters before the cure. Only then the registered paired experiment.

The genuinely new object is small and specific: a set of transitions that actually empty and fill, rather than assuming states persist. Around it sit a peaked preference, a rule that cost may only enter through those transitions, and a strong prior that can still be refined.

The last part is the review's own verdict: signed with changes, with a numbered list of blocking items that must close before any code merges, and a table recording how each was later closed at the design level.

<!--CLEAR-->
This is a proposal packet, written as the single document that enters an adversarial review. It states at the top that it is design only, that no engine source is written and nothing is deployed, and it names the reviewer personas who co-authored it. It inherits the nine-section template from an earlier specification and consumes two sibling artifacts for its experiment: the collector and the measurement metric.

The order of the document is itself the method. The first section names the mathematical objects before any metaphor is used. Two new self-sensing factors are introduced. Then comes the one genuinely new generative object, which is a set of transitions that actually empty and fill rather than assuming states persist, and the packet is explicit that this is the new thing. A peaked preference follows, preferring a comfortable level with a flat or negative value at full. Then a rule that cost may enter only through those transitions and never as a scalar attached to an action, cited to a consult. Then a strong prior that protects the seeded transitions without freezing them, so learning may refine physiology but not erase it.

A section on intended behavioural effect follows, then the typed model difference across the nine sections, including the additive and gated plumbing with exact lines and a persistence section stating that none of the new transient state is written to disk.

The failure modes come before the experiment, as a numbered list of refuters named in advance. The registered paired experiment then states what all of its conditions require and points its refuting conditions back at that numbered list.

Two owner rulings are applied to the packet in their own section, one about not compromising the metric, the other about borrowing from a later gate without claiming it prematurely. A leak-path section enumerates every place an internal value could escape the fence, which is an unusual and useful thing to write down. A ship gate follows.

The last part of the document is the review's own verdict: signed with changes, with a numbered list of blocking required changes that must all close before any engine code merges or any live run. Two of them were confirmed in the code itself, including the seeding order problem and the absence of a real viability edge. Non-blocking changes and follow-on artifacts are listed separately.

A final table records how each blocker was later closed at the design level in the shippable specification, with the owner's decisions baked in, and a closing paragraph lists the residual items that only a gated code pass can discharge, ending with the live deployment that needs the owner's go-ahead.
