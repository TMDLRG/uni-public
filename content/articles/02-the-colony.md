---
title: The colony
summary: A UNI is an Elixir brain, a Node body and a Minecraft player, joined by a pipe that is also a Markov blanket.
order: 2
---

A UNI is three processes that together behave as one organism. Nothing in the system is called "the
agent" — the agent is the arrangement.

## The three parts

**The brain** is an Elixir GenServer. It holds a generative model — the matrices `(A, B, C, D, E)`,
Dirichlet counts, and live beliefs — and each step it does perception, learning and action selection.
It never touches the network and never sees the world.

{{cite:uni-minecraft:lib/sp/runtime/agent.ex}}

**The body** is a Node process running `mineflayer`, attached to the brain as an Erlang Port. It logs
into a real Minecraft server as a real player.

{{cite:uni-minecraft:viewer/body.js}}

**The world** is an actual Minecraft server. Not a simulation of one, and not a gym environment
wearing Minecraft's textures.

## The pipe is the blanket

The interface between brain and body is a newline-delimited pipe, and it is deliberately narrow. The
body's own header states the contract:

{{quote:uni-minecraft:viewer/body.js:1-7}}

Read what that forbids. The brain cannot query the world; it receives a fixed vector of symbolic
senses. The body cannot read the brain's beliefs; it receives one primitive action from a closed set.
There is no side channel, and the narrowness is the point: it is what makes the agent's ignorance
*real* rather than stipulated.

This is a Markov blanket implemented as a file descriptor. Everything the agent can be said to know
is downstream of that line.

## One step

The decision surface of a living UNI is nine lines long. Senses arrive as a signal; the pure brain
steps; exactly two directives come back — actuate, and emit a record of what happened.

{{quote:uni-minecraft:lib/sp/runtime/agent.ex:50-59}}

Everything else in that module — and it is a large module — is transport and interpretation around
those nine lines.

## Birth, death and inheritance

Agents die. When one does, a durable kin parent archives it, and a later life is recombined and
mutated from what came before.

{{cite:uni-minecraft:lib/sp/runtime/lineage.ex}}

What is inherited is **morphology, not knowledge** — which organs an agent has, not what it learned.
The genome describes the shape of the creature; the Dirichlet counts that constitute its experience
die with it.

{{cite:uni-minecraft:lib/sp/brain/genome.ex}}

## The refusal that tells you the most

The runtime refuses to boot on a BEAM without the JIT.

{{cite:uni-minecraft:lib/sp/runtime/on_chip.ex}}

The reason is not performance. The system makes a claim about running its mathematics on-chip, and on
an interpreted BEAM that claim would be false. Rather than run anyway and quietly weaken the claim,
it declines to start. Forty-three lines, and it is the estate's culture in miniature: **the system
would rather stop than say something it cannot support.**

## Scale, measured

- {{count:uni-minecraft:lib/sp/runtime/*.ex}} modules in the runtime
- {{count:uni-minecraft:lib/sp/brain/*.ex}} modules in the brain
- {{count:uni-minecraft:test/sp/**/*_test.exs}} test files under `test/sp/`

## What is not established

Whether any of this constitutes experience is **not a claim this system makes**, and the estate's own
documents are careful about it. The phenomenology document maps human phenomenological categories onto
implemented mechanisms and records where the mapping fails — the failures are the useful part.

The colony demonstrates agents that survive, forage, and inherit morphology under active inference in
a world they cannot see directly. That is the claim. It is smaller than it sounds and harder than it
looks.
