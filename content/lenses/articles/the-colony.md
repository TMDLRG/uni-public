---
lens_schema: 1
scope: article
key: the-colony
corpus: 
source_sha256: bec741b36f48f093
source_body_sha256: bec741b36f48f093
source_title: The colony
source_words: 540
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 2026-08-24 the source moved. A count of test files was updated. This lens cites no count, so the prose is unchanged and only the digests are re-stamped.
---
<!--PLAIN-->

This page explains what a single agent in this project actually is. The answer is that it is not one
thing. It is a reasoning process holding a model of its world, a separate program that plays the
game, and a real player logged into a real game server. Nothing in the system is called the agent;
the agent is the arrangement.

The page's main point is the join between the first two parts. They talk through a deliberately
narrow channel, and the narrowness is the whole idea. The reasoning part cannot ask the world
anything; it receives a fixed list of senses. The playing part cannot read the reasoning part's
beliefs; it receives one action. Everything the agent can be said to have picked up comes through
that line.

The page also covers what happens when an agent dies. The shape of the creature is passed on; what it
learned is not. And it is careful at the end to say that whether any of this is experience is not a
claim this system makes.

<!--CLEAR-->

This article describes the anatomy of one agent, end to end, and it is short because the design is.
An agent is three processes that together behave as one organism. There is a reasoning process
holding a generative model, doing perception, learning and action selection each step. There is a
separate program running a game client library, attached to the first as a port. And there is a real
player on an actual game server. The world is a real server, the article stresses, not a simulation
of one and not a training environment wearing the game's textures.

The join between the reasoning part and the playing part is the load-bearing idea. It is a
deliberately narrow channel, and the article asks you to read what it forbids. The reasoning part
cannot query the world; it only receives a fixed vector of symbolic senses. The playing part cannot
read beliefs; it only receives one primitive action from a closed set. There is no side channel. The
narrowness is what makes the agent's ignorance real rather than merely stipulated.

The decision surface of a live agent is a handful of lines. Senses arrive, the reasoning part steps,
and exactly two instructions come back — act, and record what happened. Everything else in that part
of the code is transport and interpretation around those lines.

Agents die. When one does it is archived, and a later life is recombined and mutated from what came
before. What is passed on is morphology rather than knowledge: which organs an agent has, not what it
learned. The counts that constitute its experience end with it.

The article's favourite detail is a refusal. The runtime declines to start on a platform lacking a
particular compiler feature, and the reason is not performance. The system makes a claim about how
its mathematics runs, and on that platform the claim would be false, so rather than run anyway and
quietly weaken the claim it stops. The article calls that the estate's culture in miniature.

It closes by counting the modules and test files, and by stating what is not established. Whether any
of this constitutes experience is not a claim the system makes. What it does claim is smaller and
harder than it sounds: agents that survive, forage and inherit morphology in a world they cannot see
directly.
