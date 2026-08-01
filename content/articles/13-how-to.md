---
title: How-to recipes
summary: Narrow single-task answers. "I want to X" — each one is a few commands and the reason the order matters.
order: 13
---

> **PARTLY RUNNABLE BY YOU.** Each recipe states its own requirement. About half run on any machine.

Task-titled, deliberately short, and each one ends with how you know it worked. If a recipe cannot be
run without infrastructure you may not have, it says so in its first line rather than its last.

---

## I want to see the engine do something in five minutes

*Any machine.* → **[Quick start](/articles/quick-start/)**. Compile, test, run the demo, record a run,
verify it, then tamper with the recording and watch the verification fail.

---

## I want to check whether anything here is actually true right now

*Any machine.*

```bash
node viewer/gate_runner.cjs
```

That is the honest answer to "does it work". It runs the registered checks and reports each one. Three
of the 32 are listed but never run because they need hardware — they show as not-run rather than
silently passing, which is the difference between a gate and a decoration.

---

## I want to verify a recorded run independently

*Any machine.* Record, then verify the file you just wrote:

```bash
mix run scripts/record_run.exs 314 morphology_seeking 120
```

```bash
mix sp.verify runs/seed314-morphology_seeking.jsonl
```

**Then break it deliberately.** Edit one number in the middle of the run file and verify again. If it
still passes, the verifier is decorative and you have learned something more valuable than a green
tick.

---

## I want to know whether a change altered the engine's behaviour

*Any machine.* Regenerate the golden artifact and ask git:

```bash
mix run scripts/gen_golden.exs
```

```bash
git diff --exit-code config/golden/
```

Silence means byte-for-byte identical. Output means the behaviour moved, and somebody has to say
whether that was intended. This pair runs in continuous integration for exactly that reason —
"improvement" and "regression" produce the same diff and only a human can label it.

---

## I want to test whether a sense is actually being used

*Needs Minecraft.* Run the same agent blind and seen, with the same seed:

```bash
mix uni.play
```

Pass `--visibility blind` and then `--visibility seen`, holding `--seed` fixed. **If the behaviour
does not change, that sense was not being used** — regardless of what the architecture diagram says.
Ablation is the cheapest falsifier in this estate and the most frequently skipped.

---

## I want to add a scene to the studio

*Needs the studio.* Edit the scene table in the builder, add the scene to the group table **and** the
description table, then rebuild:

```bash
node viewer/studio_stage.cjs
```

Adding a scene without adding it to a group is how the estate acquired a scene that cannot be
previewed and is reachable only by cutting it straight to air. The builder refuses to run while
streaming unless forced, and it is a full teardown-and-rebuild, not a patch.

---

## I want to prove the overlays are really on screen

*Needs the studio.*

```bash
node viewer/verify_overlays.cjs
```

A running overlay server is not proof of overlays. This checks the current program scene against the
overlays *that scene declares*, and writes a real screenshot. No agent may claim overlays are up
without it.

---

## I want to check the show is possible before running it

*Any machine — it reads files, it does not need the studio.*

```bash
node production/run-of-show/verify_rundown.cjs
```

Six checks: the show is non-empty, every scene it names exists, no row names an unpreviewable scene,
every caption passes the claim fence, the clock closes to 240 minutes both by arithmetic and by the
file's own declaration, and no row can start a stream. It cannot tell you whether the show is *good*.
It can tell you whether it is *possible*.

---

## I want to add a new check to the estate

*Any machine.* Write it, then register it. The runner asserts its own registry is complete, so an
unregistered check file **fails the runner** rather than being quietly skipped.

Then do the part most people skip: **prove it can fail.** Introduce the defect it exists to catch and
require it to go red. A check that has never been shown to fail is not evidence of anything, and this
estate treats mutation-proving as part of writing the check rather than as a later luxury.

---

## I want to reproduce the observed motor experiment

*Needs a dataset that is not redistributed.* In this order:

```bash
npm run experiment:ingest
```

```bash
npm run experiment:run
```

```bash
npm run experiment:verify
```

The ingest step takes a `.mat` file from a published study which you must obtain yourself. **Without
it the correct outcome is a gate marked `BLOCKED`, never a pass.** Reporting a pass for a stage whose
input was absent is the exact failure the estate's contract names.

---

## I want to bring the whole studio up

*Needs the studio.* Set an OBS WebSocket password first — see
**[the broadcast suite](/articles/the-broadcast-suite/)** — then:

```bash
powershell -File viewer/studio_up.ps1
```

It is idempotent, health-gated at every step, and holds an OS mutex so only one bring-up can run at a
time. Never launch or force-kill OBS by hand: a force-kill leaves a crash sentinel and the next start
comes up in safe mode with the control socket disabled.

---

## I want the operator surfaces to come back after a reboot

*Windows.* Install the startup entry, then prove it — they are two different claims:

```bash
powershell -File viewer/track/track_boot_install.ps1
```

```bash
powershell -File viewer/door_boot_proof.ps1
```

The prover reports PROVEN only if the machine actually rebooted after the install marker was written.
Installing a startup entry is not evidence that it fired.

---

## I want to know what this project is not claiming

*Any machine, no software.* → **[What is not here](/omissions/)** for every withheld document and its
reason, and the closing section of every article on this site. Each one ends by saying what it does
*not* establish, and those sections are load-bearing rather than modest.

The shortest version: passing gates are not biological parity, general intelligence or human parity;
a reconstruction is never relabelled as an observation; and a prediction counts as prospective only if
it was committed before the observation it predicts.
