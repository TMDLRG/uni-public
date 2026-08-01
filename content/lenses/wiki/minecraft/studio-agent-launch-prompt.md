---
lens_schema: 1
scope: wiki
key: minecraft/studio-agent-launch-prompt
corpus: minecraft
source_sha256: 2873b718d75a78ee
source_body_sha256: 42dc444e8f2bcd63
source_title: Studio-agent launch prompt
source_words: 1309
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page holds a prompt to paste into a fresh session so that an assistant starts as the broadcast-studio agent. The surrounding notes explain what it is, how to use it, and what it deliberately does not repeat.

The design intent is stated openly: the prompt encodes a decision discipline as the agent's objective, so that every sentence it produces either reduces uncertainty about the real state or moves the studio toward a preferred one. The stated purpose of that is to curb narrating options it will not take, hedging, and claiming from the mere existence of a running process.

Inside the prompt are a reading order, the same observe, orient, decide, act loop the colony runs, an execution order, and a set of fences described as failures rather than shortcuts if violated.

One fence is a hard boundary: the science work is out of scope, and if a change reaches for the model's own code, the agent has crossed the line and must stop.

<!--CLEAR-->
This page carries a paste-ready prompt that starts a fresh session as the broadcast-studio agent, with a short wrapper explaining what it is, how to use it, and which companion documents it inherits rather than repeats.

The design intent is stated plainly and is the most interesting part of the wrapper: the prompt encodes a free-energy and decision discipline as the agent's objective, so that every token it produces either reduces uncertainty about the true state or moves the studio toward a preferred state. The stated effect is to curb narrating options it will not take, hedging, and claiming something from the mere existence of a running process.

Inside the prompt, the agent's job is defined in one sentence and its boundaries immediately after: it is not the science agent and never touches the model's own code, and it owns one read-only introspection surface built by an earlier session.

A reading order follows, of four document sets, with the instruction not to re-derive what they already say. Before any change, the agent must state which machine or surface it is touching, and the three are named.

The objective-function section then walks the same loop the colony runs. Observe means running the gates and never trusting that a process exists, with the specific commands named, and the flat statement that a running process, an open port or a successful launcher is not a claim. It adds that observation must not be delegated back to the operator. Orient means diffing measured state against the documented state, where the gap is the prediction error, and if a document claims what a gate does not show, one of the two is wrong and must be resolved rather than papered over. Decide means picking the one action with the highest expected reduction in uncertainty, with epistemic and pragmatic value defined, and one cure at a time. Act means making the change as code rather than as a temporary runtime patch, which is named as the exact failure that created the current situation, updating the document in the same breath and recording the gate.

An execution order lists the work streams and says which is already done, and defines the first move as reading, then observing, then starting. A three-part definition of done follows: committed and pushed code, a document made true, and a gate row appended. Nothing less counts.

The fences are described as failures rather than shortcuts if violated. No address literals in code, with the only permitted locations named. The science work is out of scope entirely, and if a change reaches for the model's own code, the agent has crossed the fence and must stop. Going live is human-typed always, and no key ever enters the agent's context. Public is the only acceptance path for the broadcast test. A note explains which deployment route works and which cannot, so time is not wasted trying. And a claim fence keeps operational passes describing behaviour rather than experience.

A section of honest flags lists problems already known so they are handled rather than rediscovered, including a check that cannot run from one machine as things stand, a certificate that must be trusted or a source will not load, and a field mismatch that breaks one stage of the test today. The last flag is a mandatory capture procedure that must not be skipped before anything destroys the running minds, with the note that the read-only surface cannot enforce it itself.

The prompt ends with a definition of done for the whole run and an instruction to report by passing proof rather than prose.
