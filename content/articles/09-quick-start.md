---
title: Quick start
summary: Fifteen minutes from nothing to a running active-inference engine you can watch think. No accounts, no GPU, no network after the first fetch.
order: 9
---

> **RUNNABLE BY YOU.** Everything on this page runs on an ordinary laptop — Linux, macOS or Windows.
> No GPU, no accounts, no API keys, no paid software. The core has **zero package dependencies**, so
> after you have Elixir installed it does not even need the network.

This is the shortest path from nothing to something you can watch. It deliberately skips the colony,
the broadcast and the operator plane, because all three need infrastructure and none of them is the
interesting part first.

## What you will have at the end

An active-inference engine running on your machine, a benchmark table of its real behaviour, and a
recorded run you can independently verify — including the verification failing if you tamper with the
recording.

## 1. Install one thing

Elixir 1.18 or later, on OTP 27. That is the only prerequisite for this page.

```bash
elixir --version
```

If that prints a version, you are ready. If not, install Elixir from your package manager or from
`elixir-lang.org`; the full prerequisite list for everything else is in the
**[install guide](/articles/install/)**.

## 2. Compile and test

```bash
mix compile
```

```bash
mix test
```

The compile fetches nothing. That is a design decision rather than an accident, and the reason is
stated where it is enforced:

{{quote:uni-minecraft:mix.exs:34-41}}

Zero dependencies means `mix test` is fully offline and deterministic. It also means nobody can break
your build by deleting a package.

## 3. Watch it think

```bash
mix run scripts/demo.exs
```

This is a live demonstration of the core guarantees rather than a toy. Then, for the numbers:

```bash
mix run scripts/benchmark.exs
```

That prints the operator baseline table — the real timings and behaviour of the engine on your
machine, not a recorded figure from someone else's.

## 4. Record a run, then verify it

This is the pair that makes the rest of the estate make sense.

```bash
mix run scripts/record_run.exs 314 morphology_seeking 120
```

That writes a run file: a seeded agent, 120 steps, every observation and action recorded. Now check
it:

```bash
mix sp.verify runs/seed314-morphology_seeking.jsonl
```

The verifier re-derives the run from the seed and compares. **Now do the interesting thing:** open the
run file, change one number in the middle, and verify it again. It must fail. A verifier that has
never been shown to fail is not a verifier, and that principle runs through everything here — the
gates in this estate are mutation-tested by deliberately introducing a defect and requiring the check
to go red.

## 5. See the golden artifact hold the line

```bash
mix run scripts/gen_golden.exs
```

Then ask git whether anything moved:

```bash
git diff --exit-code config/golden/
```

Silence means the engine's behaviour is byte-for-byte what it was. This exact pair runs in continuous
integration: regenerate, then diff. If the engine's output drifts for any reason — an intended
improvement or an accident — the build fails and somebody has to say which it was.

## 6. Look at the evidence machinery

```bash
mix run scripts/evidence.exs
```

```bash
mix sp.uni.prove
```

```bash
mix sp.brain.verify
```

The first regenerates the validation evidence numbers. The second and third are proof tasks over the
agent and its inference core.

## Where to go next

You now have the engine. The three directions out of here:

- **Understand what you just ran** → [The active-inference brain](/articles/the-brain/) and
  [The colony](/articles/the-colony/). There is no reward signal anywhere in what you ran, and that is
  worth understanding before you read the code.
- **Run more of it** → [Install guide](/articles/install/) for the full prerequisite list, then
  [Run it](/articles/run-it/) for every entry point in the estate with its real command.
- **Try to break it** → [The falsification invitation](/wiki/minecraft/falsification/). It is a
  standing request, not a formality.

## What this page does not claim

Running the demo tells you the engine works. It tells you nothing about biological parity, general
intelligence, or human parity, and the estate's own contract says so in those words. The colony, the
Producer and the broadcast are not covered here because they need a Minecraft server, a licensed game
client and — for the broadcast — hardware and accounts. See
[what a stranger can and cannot run](/articles/run-it/) for the honest boundary.
