---
title: Start here
summary: What UNI is, in the order you have to meet it. Six ideas, each one needed to understand the next.
order: 1
---

UNI is an active-inference research programme. It runs a colony of agents that live in a Minecraft
world, a producer that broadcasts them, a bacterial flagellar-motor laboratory, and a control plane
whose entire job is to stop any of it claiming more than it has measured.

That last part is the unusual one, and it is the right place to start.

## 1. The system is built to be caught being wrong

Most software documentation argues that a system works. This estate is built around the assumption
that it will eventually be wrong, and that the interesting engineering is in making the wrongness
visible fast.

Concretely: there are {{count:uni-minecraft:viewer/gate_registry.json}} gate registry, and
{{count:uni-minecraft:viewer/verify_*.cjs}} executable checks under `viewer/` alone. A check that has
never been shown to fail is not treated as proven — gates are mutation-tested by deliberately
introducing a defect and requiring the gate to go red. And the verdict vocabulary is five controlled
words, never a percentage.

{{cite:uni-minecraft:lib/sp/control_plane/verdict.ex}}

You will find failing gates published on this site rather than omitted from it. That is deliberate.

## 2. A UNI is three processes pretending to be one organism

An agent is not a script with a personality. It is:

- an **Elixir GenServer** holding a generative model and doing inference,
- a **Node process** running `mineflayer`, attached as an Erlang Port,
- a **real player** logged into a Minecraft server.

The boundary between the first two is the load-bearing idea, and the body's own header states it
better than a summary could:

{{quote:uni-minecraft:viewer/body.js:1-7}}

That is a Markov blanket, implemented as a pipe. The brain cannot see the world; it sees senses. The
body cannot see beliefs; it receives one action. If you understand nothing else here, understand
that line — everything about what the agent can and cannot know follows from it.

## 3. There is no reward anywhere

The agents do not maximise a score. They minimise expected free energy — a quantity with two parts:
how much a policy is expected to reduce uncertainty, and how far its predicted observations are from
preferred ones.

This matters practically, not just philosophically. A reward signal is the thing you accidentally
optimise; there isn't one to game. When a novelty term was added to the engine, the invariant it had
to satisfy was that it **decays monotonically to zero as evidence accumulates** — information, not
reward — and that switching it off leaves the agent's behaviour byte-for-byte identical.

{{cite:uni-minecraft:lib/sp/brain/novelty.ex}}

## 4. The Producer is an agent too

The broadcast is not run by a script. The Producer is the same categorical engine, with a different
action space: camera cuts, narration beats, and the birth and death of UNIs.

So an expected-free-energy minimum, computed the same way a bot decides whether to mine a block,
terminates in a living agent being spawned or culled. That is the whole idea in two lines of
dispatch:

{{cite:uni-minecraft:lib/sp/producer.ex}}

## 5. Two different things are called "the control plane"

This will confuse you if nobody says it first.

- **`SP.Producer`** calls itself the live show-running control plane. It runs the broadcast.
- **`SP.ControlPlane`** is the *science's* control plane. It authors verdicts, holds the ledger, and
  never touches the show.

They are different bodies with different laws and they cross-reference each other in their own
module docs precisely because the collision is so easy to make.

{{cite:uni-flagellum:docs/control-plane/decisions/ADR-0006-sp-controlplane-naming-and-placement.md}}

## 6. Reading, in order

1. **[The colony](/articles/the-colony/)** — what an agent actually is, end to end.
2. **[The control plane](/articles/the-control-plane/)** — the ledger, the single writer, and why a
   verdict needs a receipt.
3. **[The Encyclopedia](/wiki/#encyclopedia)** — the method as a book.
4. **[The Cookbook](/wiki/#cookbook)** — how it is carried out in practice.
5. **[Evidence &amp; Verdicts](/evidence/)** — the dated record that it was, including a FAIL.
6. **[What is not here](/omissions/)** — everything withheld, and why.

## What this site is not claiming

Passing gates are not evidence of biological parity, general intelligence, or human parity. The
estate's own contract says so explicitly, and separates observation from reconstruction from
simulation as a matter of rule rather than of taste. Where a claim is not established, this site says
NOT ESTABLISHED rather than choosing a comfortable reading.

The working repositories stay private, but **most citations do open** — into a redacted, frozen
snapshot published on 2026-08-02, one commit deep with no history. So a citation names a real file at
a real commit, and what opens is that tree as it stood on that day rather than as it stands now.
Where no snapshot exists, the citation says it cannot be opened instead of emitting a link that would
fail. A citation you cannot follow is an appeal to authority; marking it is the difference between
documentation and a brochure.

> **Corrected 2026-08-24.** This paragraph said the source repositories were *not public yet* and
> that every citation *tells you it cannot be opened*. That stopped being true on 2026-08-02, when
> the snapshots were published, and the sentence stood for the 22 days since while the site's own
> manifest recorded the opposite. It is quoted rather than deleted, because a correction that erases
> what it corrects leaves no record of having been wrong.
