---
title: Run it
summary: Every runnable entry point in the estate, with the command that really starts it, grouped by subsystem, each marked with whether you can actually run it.
order: 11
---

This is the reference page. Every entry point below is discovered from the source repositories by the
coverage gate, so if something new is added to the estate and nobody documents it, the gate goes red
naming it. See **[coverage](/coverage/)** for the current tally and for everything deliberately left
out.

Each section carries one of three markers, and they mean exactly what they say:

- **RUNNABLE BY YOU** — an ordinary machine, free software, no accounts.
- **PARTLY RUNNABLE BY YOU** — some of it runs; the rest needs something you may not have.
- **NEEDS THE OPERATOR'S INFRASTRUCTURE** — a private network, paid accounts, specific hardware, or a
  named human. Read it to understand the system; you will not be able to execute it.

If you have not installed anything yet, start with the **[quick start](/articles/quick-start/)**.

---

## Run the active-inference core

> **RUNNABLE BY YOU.** Zero dependencies, fully offline, deterministic.

This is the engine everything else is built on: inference, expected free energy, planning, learning,
precision and novelty.

```bash
mix test
```

```bash
mix run scripts/benchmark.exs
```

Proof tasks over the brain itself:

```bash
mix sp.brain.verify
```

```bash
mix sp.brain.readability
```

The second is unusual and worth a moment. It checks that the brain's internal state is *legible* —
that what the agent believes can be read out and named, rather than existing only as a matrix nobody
can interpret. A system whose beliefs cannot be inspected cannot be falsified, and an unfalsifiable
model is not a scientific object however well it performs.

The engine's own recorded behaviour, regenerated and diffed:

```bash
mix run scripts/gen_golden.exs
```

```bash
mix run scripts/evidence.exs
```

---

## Run the colony

> **PARTLY RUNNABLE BY YOU.** The bridge and a single agent run locally if you own Minecraft Java
> Edition 1.16.5 and have Java 11. The full supervised colony needs the web UI and a world server.

A UNI is three processes pretending to be one organism: an Elixir process holding a generative model,
a Node process running a Minecraft client library attached as an Erlang port, and a real player logged
into a real server. [The colony](/articles/the-colony/) explains why that boundary is the load-bearing
idea.

Start the world first — see the **[install guide](/articles/install/)** — then:

**One agent, playing:**

```bash
mix uni.play
```

It takes options for host, port, game version, username, visibility, phase, seed and a memory file.
The `visibility` option is the interesting one: an agent can be run *blind* or *seen*, which is how
sensory ablation is tested. An ablation that changes nothing tells you the sense was not being used.

**The simulation-to-world bridge, without an agent:**

```bash
mix sp.minecraft
```

This drives the world from the simulation directly over the game's remote console. It needs the
password you set during install — **not** the default that ships in the setup script.

**Inspect the world model:**

```bash
mix run scripts/show_world.exs
```

**The supervised colony** runs under the web UI's application supervisor with autostart enabled, and
the show is kicked by requesting the stream route. In practice that comes up as part of the studio
bring-up rather than by hand.

---

## Run the Producer

> **PARTLY RUNNABLE BY YOU.** The Producer itself runs; the camera and overlays it drives need the
> studio.

```bash
mix producer.run
```

Its own task documentation is direct about the dependency: it needs a world server and the web UI
running for the camera and the overlay, and then the stream route.

{{cite:uni-minecraft:lib/mix/tasks/producer.run.ex}}

The Producer is not a script. It is the same categorical engine as an agent, with a different action
space — camera cuts, narration beats, and the birth and death of UNIs. An expected-free-energy minimum
terminates in a living agent being spawned or culled. [The Producer](/articles/the-producer/) is the
long version.

---

## Run the control plane

> **RUNNABLE BY YOU** for the science laboratory and the gates. The ledger's canonical rows are the
> operator's to author.

The science lab, as a test suite and as a validation run:

```bash
mix test test/sp/lab/
```

```bash
mix sp.lab.validate
```

The gates. This is the single most useful command in the estate for finding out what is actually true
right now:

```bash
node viewer/gate_runner.cjs
```

There are 32 registered gates; 29 run in continuous integration and 3 are listed but never run,
because they need hardware. **They are listed rather than dropped** — a gate that is quietly not run
is indistinguishable from a gate that passes, and the difference is the entire value of having gates.

```bash
node viewer/gate_runner.cjs --require-pass
```

The runner also asserts its own registry is complete, so an unregistered check file fails it.

{{cite:uni-minecraft:viewer/gate_registry.json}}

Materialise the lab's inputs from the engine:

```bash
mix run scripts/lab_l1_materials_from_elixir.exs
```

---

## Run the operator plane

> **NEEDS THE OPERATOR'S INFRASTRUCTURE** for the full experience — several surfaces probe hosts on a
> private network and hard-code an absolute path. The servers themselves start anywhere.

Five surfaces, deliberately independent of each other so that no single failure blinds the operator.
[The operator plane](/articles/the-operator-plane/) explains why five.

**The Door** — mission control and the one-key bring-up. Loopback only; every mutating route requires
a custom header.

```bash
node viewer/launcher.cjs
```

```bash
powershell -File viewer/door_open.ps1
```

```bash
powershell -File viewer/door_boot_open.ps1
```

**Gaia** — the world-visibility organ. It **projects and never computes**, which is a decision with
its own architecture record: a surface that derives its own numbers can disagree with the system it is
showing, and then you have two truths and one screen. It is GET-only; any other method is refused
outright.

```bash
node viewer/gaia/gaia_server.cjs
```

**TRACK** — the live project surface. It reads real artifacts and caches nothing.

```bash
node viewer/track/track_server.cjs
```

Be warned about one thing here: TRACK draws the project plan from a second repository whose path is
hard-coded. On any other machine **it renders an empty plan rather than an error**, which is the worse
of the two failure modes.

**The HUD** — the operator's glance surface. The real one is a native Windows widget, not a web page,
so there is no URL that shows it; it is summoned by a keyboard shortcut. A legacy web version still
exists.

```bash
node viewer/hud/hud_server.cjs
```

```bash
powershell -File viewer/hud/hud_open.ps1
```

```bash
powershell -File viewer/hud/hud_boot_open.ps1
```

```bash
powershell -File viewer/hud/hud_user_sight.ps1
```

**The lab** — the rooms L0 to L6, where the estate tests its own instruments. One write route.

```bash
node viewer/lab/lab_server.cjs
```

The last room is a checkpoint that no gate can pass on the operator's behalf: two images side by side,
and a human says whether they differ **with no text read**. That is a falsifier a machine cannot
stand in for, and the estate does not pretend otherwise.

---

## Run the flagellar-motor laboratory

> **PARTLY RUNNABLE BY YOU.** Everything except the observed-experiment reproduction, which needs a
> dataset that is not redistributed.

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run start
```

```bash
npm run test
```

### The science gates

```bash
npm run science:run
```

```bash
npm run science:verify
```

Run, then verify. Never only the second — a verifier pointed at a stale artifact will happily confirm
last week's result.

### Cross-study parity

```bash
npm run cross-study:ingest
```

```bash
npm run cross-study:run
```

```bash
npm run cross-study:verify
```

And the independent path, which re-derives from the original archives instead of the convenient cache:

```bash
npm run cross-study:verify-raw
```

That one needs a multi-gigabyte raw cache. Without it the honest result is a gate marked `BLOCKED`,
never a pass.

### The observed experiment

```bash
npm run experiment:ingest
```

```bash
npm run experiment:run
```

```bash
npm run experiment:verify
```

**The ingest step needs a `.mat` dataset from a published study, obtained separately.** Order is
strict: ingest, run, verify, then the suite.

### The generated database schema

```bash
npm run db:generate
```

---

## Run the math workbench

> **RUNNABLE BY YOU.** It is CPU-only by contract and contains no inference of any kind.

The workbench is a route inside the laboratory application rather than a separate program, so the
commands above start it. It lives on its own branch, which is a git worktree of the laboratory
repository, and it executes **the committed model libraries** — the same code the gates run.

That is the property worth protecting. A visualisation that reimplements the maths for display is a
second model that can silently disagree with the first, and then a reader is looking at a picture of
something that is not the system.

[The flagellar motor laboratory](/articles/the-flagellar-motor/) has the longer account.

---

## Run the broadcast

> **NEEDS THE OPERATOR'S INFRASTRUCTURE.**

Every command is in **[the broadcast suite](/articles/the-broadcast-suite/)**, together with the
reasons the order matters. Do not run the bring-up script from here without reading that page — in
particular, set an OBS WebSocket password first.

---

## The honest boundary

Collected in one place, because it is the question a stranger actually has.

**You can run:** the pure Elixir engine and every one of its scripts, the web UI, the flagellum
laboratory and the math workbench in development and test mode, most of the registered gates, and — if
you own Minecraft and have Java 11 — a single local colony.

**You cannot run:** the studio, the broadcast, the Producer's camera, the operator plane as designed,
the observed-experiment reproduction, or any go-live path. Those need a private repository, a specific
Windows machine with hard-coded paths, a private network estate, an unpublished dataset, paid platform
keys, and one named human's typed confirmation.

That list is not an apology. Being told precisely where the wall is beats discovering it at step nine,
and the parts on the near side of it are the parts worth understanding first.
