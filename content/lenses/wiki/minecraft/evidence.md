---
lens_schema: 1
scope: wiki
key: minecraft/evidence
corpus: minecraft
source_sha256: 26942835aec7a0d8
source_body_sha256: 26942835aec7a0d8
source_title: UNI — Scientific Evidence Report & Falsification Invitation
source_words: 2293
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
An evidence report, written as an open invitation to break it. It sets out what the project claims, how it says you can check each claim, what it deliberately holds back from claiming, and a numbered list of attacks anyone can try.

The system it describes is an agent that plays a real block-building game through a separate body program. It chooses actions by minimising a quantity that combines the value of finding things out with the value of reaching preferred outcomes, and the document states plainly that there is no reward signal and no reinforcement learning anywhere in it.

The long middle is mathematics, written out with the derivations, along with a note about one place where a tempting shortcut would quietly break a guarantee, and a record of a real defect found in an audit and fixed.

The limits matter as much as the claims. A whole section is given over to what is explicitly not claimed: nothing about felt experience, nothing about biological fidelity, nothing about the behaviour being optimal. A closing list of open questions is franker still, since several of them say the thing has not yet been seen.

<!--CLEAR-->
Written to be attacked, and framed that way from the first line. Its own framing says that if a claim survives your best attempt to break it, that survival is the result.

It opens with a one-paragraph statement of the claim. The agent chooses actions by minimising an expected quantity made of two named parts, one for information gain and one for preference, over beliefs maintained by minimising a related quantity during perception. It states that no reward signal and no reinforcement learning appear anywhere. It states that the numerical core is written in one language with no foreign computation layers, and that a two-level hierarchy communicates across a boundary carrying only primitive values. Every numerical kernel is checked against an independent implementation in another language to a stated tolerance, and a set of acceptance gates runs automatically.

An architecture section draws the flow from the world, through the body, into the agent, and back out as a single action. It stresses that only two messages ever cross the body-to-brain boundary and that no belief structure ever crosses. It also states the purity rule: the decision function performs no effects and returns instructions, which the runtime carries out.

The mathematics section is the longest. It derives the perception quantity and shows why it is an upper bound on surprise. It then spends a careful passage on one specific choice: taking the logarithm of the transitions before averaging, rather than after. The two are not equal, and the document shows the direction of the gap and says that the tempting alternative would break the bound. It explains why the joint belief is never built, decomposes the action quantity into its two parts, describes learning as counting co-occurrences rather than following a gradient on reward, and covers how two precision terms are retuned and clamped. A subsection describes the slower strategic level as the same engine run at a longer timescale, and records a transition defect that an audit found, together with the fix and the test that now guards it.

An evidence section lists commands and their results in a table, then describes what embodied agents were observed doing in the live game, including recovering after in-game death and choosing options that suit the situation rather than choosing uniformly.

The limits follow. No reward and no reinforcement learning is stated as a design invariant rather than a tuning choice. There is no claim of felt experience: the functions with suggestive names model access and report, and the document says explicitly that it makes no claim about the hard problem. There is no claim of biological fidelity for the emotion and hormone machinery, which is described as parameter modulation. And there is no claim that the behaviour is optimal.

The falsification protocol is a numbered list of concrete attacks, each with a claim and the exact observation that would refute it. The document says the limit drawn around experience is the question it most invites readers to stress.

A short section of standing open questions follows, several of which say plainly that something has not yet been observed, and the page closes with what you need to reproduce the work.
