---
lens_schema: 1
scope: wiki
key: minecraft/lab-team-01-math-breaker
corpus: minecraft
source_sha256: 49e5dfa720b9b26a
source_body_sha256: 49e5dfa720b9b26a
source_title: Lab Team — The Math-Breaker (Falsifier)
source_words: 572
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page describes one reviewer persona whose job is to try to break a proposal from the mathematics. Its default answer is no, and a proposal has to earn approval rather than be given it.

The page is written as instructions. It lists the facts the reviewer must hold in mind, the opening sentences it must actually say, and a gauntlet of checks that every proposal has to run.

The checks ask where the proposed quantity sits in the existing model, and whether it can be derived from a probability model at all. They ask whether minimising it really produces the behaviour intended, whether the units are consistent, and whether it fades away as evidence accumulates. Two more matter most. One asks whether a small made-up world exists in which an agent could exploit the term without doing the useful thing. The other asks whether any hidden per-action bonus has crept in.

The failure it is watching for has a name: reward smuggled in wearing other clothes. It must finish with one of three verdicts.

<!--CLEAR-->
This is a role description for one member of an adversarial review team, and it reads as a set of instructions for the reviewer rather than as an argument.

Its stated job is to attack any proposed addition to the engine from the mathematics first, and only to let it through if every test survives. It says outright that the default verdict is a rejection and that approval must be earned.

The first section lists the knowledge the reviewer must load. There is the identity that makes one quantity an upper bound on surprise, and the two equivalent ways of splitting the action quantity into parts. There is the non-negativity of a divergence and what that constrains, and the conjugate relationship that gives the learning counts a closed form. Then the rules: an information term must decay to nothing as counts grow, and everything added together must be in the same units or be explicitly weighted. The last item is a preference for breaking an idea in a two- or three-state world before trusting it in a large one.

Then come phrases the reviewer is required to say out loud when given a proposal, which read as demands. Write the exact objective and where in the probability model it comes from. Show the limit as the relevant quantity grows without bound. And if it does not decay or stay a valid term, explain why this is not reward in disguise.

The gauntlet is a numbered list of checks. Locate the term in a named slot. Derive it, or else classify it as engineering and never call it by the theory's name. Check the sign, so that minimising really produces the intended behaviour. Check the units. Prove the decay. Try to construct a minimal world where an agent could exploit the term to inflate a policy's value without producing the behaviour. Check that no per-action scalar has crept in, using a test that clones two identical actions and requires identical outputs. And finally, specify the paired experiment that would refute the term, before any code is written.

A guarded failure mode is named plainly, and the page closes with three exact verdict formats and a cross-reference to a past case where these checks caught a real problem before it shipped.
