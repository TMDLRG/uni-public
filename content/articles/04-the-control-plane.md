---
title: The control plane
summary: An append-only hash-chained ledger with exactly one writer, five verdict words, and a room whose override does not exist.
order: 4
---

The control plane is the body that runs the lab and authors every verdict. It is the part of this
estate that exists to make the rest of it accountable, and it is the best-documented subsystem here by
a wide margin — {{count:uni-minecraft:lib/sp/control_plane/*.ex}} modules, roughly a third of them
explanatory prose, against {{count:uni-minecraft:test/sp/control_plane/*_test.exs}} test files.

Test lines outnumber source lines more than two to one.

## First, the name collision

Two different things in this system are called "the control plane" and the module says so itself
before it says anything else:

{{quote:uni-minecraft:lib/sp/control_plane.ex:2-11}}

That file is 44 lines long, of which 40 are that docstring. It exists to explain a namespace and
prevent a confusion. It is worth noticing that someone thought the confusion serious enough to spend
a file on.

## One writer

Every mutation to the evidence record goes through a single module, and that is enforced by the type
system rather than by convention: the writer requires a token that only the command path can mint.

{{cite:uni-minecraft:lib/sp/control_plane/command.ex}}

Every entry records who acted, in what role, under what authority, and what the state was before and
after. Two distinct parties are required where two are required — the co-signer cannot be the
proposer, and there is a test named exactly that.

## The chain, and what it cannot do

The ledger is append-only and hash-chained. Each entry carries the hash of the one before it, so a
row cannot be quietly altered after the fact without breaking every hash downstream.

{{cite:uni-minecraft:lib/sp/control_plane/ledger.ex}}

**But a hash chain cannot detect truncation of its own tail.** Lop off the last N entries and what
remains is a perfectly valid chain. The system's response to that is the part worth reading: it does
not hide the limitation, it holds the head and length *outside* the chain as an anchor, and it has a
test that performs the truncation attack and asserts it succeeds — so the limit stays visible rather
than being quietly assumed away.

{{cite:uni-minecraft:lib/sp/control_plane/anchor.ex}}

There is a further honesty here that is easy to miss. Corroboration requires a custodian the writer
cannot reach. Measured, the current witness **accepts the writer's own key** — so the anchor is
`tamper_evident` and explicitly *not* unforgeable, and the code refuses to claim the stronger word.

{{cite:uni-minecraft:lib/sp/control_plane/witness.ex}}

## Five words, never a percentage

A verdict is one of `PASS`, `PARTIAL`, `FAIL`, `WITHHELD`, `PENDING`. There is no score.

{{cite:uni-minecraft:lib/sp/control_plane/verdict.ex}}

A percentage invites averaging, and averaging is how a broken root gets hidden under a healthy crown.
`WITHHELD` and `PENDING` exist because "we did not look" and "we looked and could not tell" are
different states, and collapsing either into a pass is the failure this whole apparatus is built
against.

A gate must be registered *before* its run, so a check cannot be invented after seeing the result.

{{cite:uni-minecraft:lib/sp/control_plane/registry.ex}}

## Comparing like with like

A comparison between two runs is refused at construction unless exactly one variable differs. Not
warned about — refused.

{{cite:uni-minecraft:lib/sp/control_plane/pair.ex}}

Relatedly: a run's identity hashes in its planned sample size and its stopping rule, so relabelling a
run changes *which run it is*. You cannot decide the stopping rule after seeing the width.

{{cite:uni-minecraft:lib/sp/control_plane/run.ex}}

## The door with no handle

Releasing something to the world requires passing through a room: green, then clean, then sterile,
with two keys from distinct parties.

The interesting design decision is what happens when you want to skip it:

{{quote:uni-minecraft:lib/sp/control_plane/room.ex:39-41}}

There is no override function. Not a refused one — an absent one. The reasoning is that a control
which merely refuses still teaches the operator that the door exists, and a door that exists gets used
on the night it matters most.

{{cite:uni-minecraft:lib/sp/control_plane/room.ex}}

## What is not established

The ledger has recorded no verdict about a real scientific claim yet. The apparatus is built and
tested; what it has mostly adjudicated so far is its own construction.

And the honest state of the witness above is the one to carry away: **tamper-evident is a real
property and unforgeable is a different one**, and this system is careful about which word it uses.
