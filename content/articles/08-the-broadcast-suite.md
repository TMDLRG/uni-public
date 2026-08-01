---
title: The broadcast suite
summary: How a colony of agents becomes a live public broadcast — the chain to air, the 33 scenes, the run of show, and the seven paths that all refuse to go live.
order: 8
---

The colony is not watched through a debugger. It is broadcast: a real video programme, composed in
OBS, switched by a human at a console, encoded once and fanned out to public platforms.

This is the subsystem with the most moving parts and the least written about it, so this article is
both layers at once — what it is, then how to run it.

---

# UNDERSTAND IT

## First, the thing that will break your mental model

**There are two studio systems and they have different scene contracts.** Nothing else here makes
sense until that is said out loud.

- **The operated studio** is the one that airs. Native OBS on a Windows render box, driven by a set
  of Node and PowerShell processes. **33 template scenes.** The console, the rundown page and the
  runbooks all drive this one.
- **The containerised platform** is a second, later design — Podman quadlets under systemd, with
  **8 scenes**. Its scene builder and its verifier both self-declare *"authored, not yet run on node
  hardware."*

A guide that blends them is wrong. Everything below describes the first. The second contributes the
overlay pages, the run-of-show model and a set of architecture decisions.

{{cite:uni-minecraft:docs/STUDIO_SYSTEMS.md}}

## The chain to air

Ten stages, and it is worth knowing which are automatic and which are a person.

| # | stage | who |
|---|---|---|
| 1 | Minecraft world, with the Producer directing a colony camera | automatic |
| 2 | The viewer window is **window-captured** by OBS — never a browser source | automatic |
| 3 | Remote cameras publish over WebRTC into one of ten slots, no install | **operator** |
| 4 | A local media server re-serves each slot on loopback for OBS | automatic |
| 5 | 33 template scenes plus 3 camera-role scenes are built into OBS | **operator**, once |
| 6 | Overlays are plain HTML pages rendered as browser sources | automatic |
| 7 | Preview → Take → Program switching | **operator** |
| 8 | OBS encodes **once** into a local media server | automatic |
| 9 | One supervised `ffmpeg -c copy` per platform, up to 20 | **operator** arms it |
| 10 | The public platform accepts the stream | **operator** confirms |

Stage 2 is a real design decision, not an accident. The world view is captured as a **window**, not
loaded as a browser source inside OBS, because OBS's embedded browser hits a limit on heavy 3D content
and renders black. Several of the failure modes in this system are that limit showing up somewhere
new.

Stage 8 is the one that saves the machine: the encoder runs **once** and every platform gets a copy of
the same encoded bytes. Encoding per platform would multiply the expensive part by the number of
destinations.

{{cite:uni-minecraft:viewer/mediamtx_local.yml}}

## The scenes: 33, in 11 groups, and one orphan

The authoritative source is the builder, not any document — and not the JSON either, because the JSON
is the builder's *output*.

{{cite:uni-minecraft:viewer/studio_stage.cjs}}

The builder is a full idempotent teardown-and-rebuild: it parks the program on a staging scene,
removes every scene and input it knows about (including a legacy list from older experiments), polls
until removal has actually landed, recreates everything, applies transforms and audio defaults, ends
on the colony scene, and rewrites its own output manifest. It **refuses to run while streaming**
unless forced.

Two policies inside it are worth lifting out, because they are the kind of thing that only becomes
obvious after it has gone wrong live:

- **Every microphone and camera boots muted.** Talent-hot is a policy decision, and the safe default
  is silence.
- **The overlay stack is appended per scene by the builder**, and the function that says which
  overlays a scene should have is *exported and imported by the verifier* — so the expectation and the
  build cannot drift apart. An earlier verifier held a hard-coded list and cried wolf on every healthy
  music scene, which trains an operator to ignore the alarm. A gate that cries wolf is worse than no
  gate.

**One scene is in no group.** It is therefore excluded from the previewable set, so the preview route
rejects it — and the only way to reach it is a layout route whose non-preview branch **cuts straight
to air**. The project's own rundown audit states it plainly: the one scene you cannot preview is
reachable only by putting it on air. The rundown verifier now checks that no row in the show calls it.

That is a good example of the estate's general posture: the hazard is not fixed by deleting the scene,
it is fixed by writing a check that fails if anyone schedules it.

## The run of show

The show itself is a data file, not a script: 21 rows summing to exactly 240 minutes, with a schema
that carries — per row — the scene, the scene to move to next, an alternative, whether it must be
previewed first, why that scene, what is on screen, the host's beats, the caption to super, a spoken
fence, a call to action, and **what must never be said**.

{{cite:uni-minecraft:production/run-of-show/first-show.rundown.json}}

Its verifier runs six checks, and the interesting thing is what they are checks *for*:

0. **Non-vacuity** — there is at least one row and at least one scene. A verifier that passes an empty
   show is checking nothing.
1. **Every scene named in the show exists in the build.** This exists because an earlier rundown named
   six scenes and the intersection with reality was empty.
2. **No row names a scene that cannot be previewed** — the orphan fence above.
3. **Every caption passes the claim fence**, with the fence's own regular expression *read out of the
   console's source* rather than posted to a running server. A check that needs the system up is a
   check that will be skipped.
4. **The clock closes** — the rows sum to 240 and the file's own declared total is also 240. Both,
   because a file that agrees with itself and not with arithmetic is the interesting failure.
5. **Nothing here can go live.** No row may carry a route that starts a stream, and the check
   distinguishes *using* such a route from *mentioning* one.

{{cite:uni-minecraft:production/run-of-show/verify_rundown.cjs}}

Its closing line is the honest summary of what any such tool can do: whether the show is *good* is not
checkable here; whether it is *possible* is.

## The claim fence

Anything the console can put on screen passes a single filter first. It refuses a word list that
includes *proof*, *proved*, *conscious*, *sentient*, *self-aware*, *alive*, *living*, *life-form*,
*experience*, *feel*, *suffer*, *first-ever*, *breakthrough*, *AGI* and *human-level*. A refusal names
the offending word and suggests a rewording. An override exists and it **appends to a log** rather
than passing silently.

The fence is deliberately blunt, and the project knows exactly how blunt: one of the show's own
captions trips on the word *experience* **inside a sentence denying experience**, because a regular
expression cannot tell a claim from its denial. That caption is spoken aloud by the host instead of
being put on screen. The wrong fix would have been to weaken the fence.

## Go live: seven paths, all refusing

Seven distinct code paths in this estate can start a stream. All seven are routed through one guard,
and the completeness of that list is enforced **mechanically** rather than by maintenance: a check
walks every script in the studio directory and fails on the day anyone adds a stream-start call site
that does not require the guard.

The guard requires six conditions — a presence token exists, is parseable, is less than 120 seconds
old, was not minted in the future, came from an interactive session, and carries a single-use nonce
that has not already been spent. Each failure has its own named refusal code.

Two design notes are quoted rather than summarised, because the wording is the argument.

{{quote:uni-minecraft:viewer/golive_guard.cjs:30-36}}

And on why it currently refuses everything:

{{quote:uni-minecraft:viewer/golive_guard.cjs:38-43}}

So: **go-live is not automatable in this estate today, by design, and no agent can perform it.** The
token is spent immediately *before* the stream starts, so a crash between the two leaves it spent
rather than reusable.

## What the guard does NOT cover

The guard binds this codebase's paths to air. **It does not bind the machine.** Any process on the
render box that can talk to the OBS control socket can start a stream without passing through any of
the seven paths, because it never enters the codebase at all.

That is recorded in the estate as a named limitation rather than left implicit, and the fix is
configuration rather than code — which is why the run-it section below tells you to set a control-socket
password before anything else.

---

# RUN IT YOURSELF

> **NEEDS THE OPERATOR'S INFRASTRUCTURE.** Be clear-eyed about this one. A full broadcast needs a
> Windows machine with a GPU, OBS installed natively, a local media server binary, `ffmpeg` on PATH, a
> Minecraft server, a colony running, and — for the last stage — a paid streaming account and its
> stream key. You can run and understand stages 1 to 8 on your own hardware. Stage 9 and 10 need
> credentials nobody can give you. Saying that up front is the point; discovering it at step 9 wastes
> your evening.

## Before anything else: put a password on the control socket

OBS's WebSocket plugin is what every script here uses to drive OBS. It ships able to run without
authentication, and if it is bound to anything other than loopback then **anything that can reach it
can start your stream, change your scenes and read your sources** — completely bypassing the seven
guarded paths described above.

In OBS: *Tools → WebSocket Server Settings*. Enable authentication, set a password, and leave the
server bound to the loopback interface unless you have a specific reason not to. Do this before you
run a single script below. A guard that protects seven code paths and leaves the socket open is a lock
on a door in an open field.

## Bring the stack up

One command, in order, health-gated at every step:

{{quote:uni-minecraft:viewer/studio_up.ps1:3-7}}

The order is not cosmetic — each step waits for the previous one to be healthy:

{{quote:uni-minecraft:viewer/studio_up.ps1:9-12}}

Some ordering facts inside it that are load-bearing and easy to break:

- **A single OS mutex allows exactly one bring-up at a time.** Two concurrent bring-ups fight over
  OBS and leave it in a state neither of them expects.
- **OBS is launched only by this script**, with its working directory set explicitly, and it is never
  force-killed. A force-kill leaves a crash sentinel behind and the next start comes up in Safe Mode
  with the WebSocket disabled — which presents as "the studio is broken" and is really "OBS is
  sulking".
- **Teardown order is load-bearing too**: watchdog, then the application supervisor, then the world,
  then the child processes, then OBS and the media server.

Individual pieces, if you want to run them one at a time rather than through the bring-up:

```bash
node viewer/overlay_server.cjs
```

```bash
node viewer/command_center.cjs
```

```bash
node viewer/publisher.cjs
```

The channel setup and throttling step:

```bash
powershell -File viewer/studio_channels.ps1
```

```bash
powershell -File viewer/launch_channels.ps1
```

## Build the scenes

```bash
node viewer/studio_stage.cjs
```

To add or change a scene, edit the scene table in that file and — if it should be selectable — add it
to the group table and the description table too. Then re-run. Adding a scene without adding it to a
group is exactly how the orphan described above came to exist.

## Prove the overlays are actually up

```bash
node viewer/verify_overlays.cjs
```

An overlay server that is running is **not** proof of overlays. This checks that the current program
scene carries the overlay sources *that scene declares*, that each points at the overlay server, that
the state file parses — and it writes a real screenshot. Nothing may claim "overlays up" without it.

## Drive the show

The console is loopback-only and every mutating route requires a custom header, which forces a CORS
preflight that no third-party page can satisfy — so a random web page open in the operator's browser
cannot drive the studio.

Two routes exist for putting a scene on air and they are not equivalent:

- **preview then take** validates the scene name against the built set and refuses an unknown one;
  take refuses if preview is not armed.
- **cut** takes any string and puts it straight on air with no validation.

The rundown page uses the first and never the second, its take button is dead until the studio's own
preview reports the right scene, and there is no go-live control on it at all.

## The fan-out

```bash
powershell -File viewer/restream.ps1
```

Arming refuses if `ffmpeg` is not runnable, if the endpoint store is locked, or if zero endpoints are
enabled with a key — *arm must refuse to succeed at nothing*. It does **not** survive a reboot or a
console crash, and that is correct: the encrypted store persists, the in-memory unlock does not. Do not
"fix" it by persisting the passphrase.

One show-night rule worth repeating: `ffmpeg` receives the keyed URL in its command line, so a process
list is a place your stream key is visible. Never put Task Manager, Process Explorer or a process query
on a shared or captured screen while the fan-out is running.

## Pre-flight, and the test that cannot prove what you want

The pre-flight renders every template and classifies **pixels, not bytes** — an absent camera is a
SKIP, not a false no-go, and a GO requires at least one scene to have genuinely rendered.

The broadcast test then runs five visible stages in about three minutes. Read this next sentence
twice: **the test cannot prove you are on the air.** Its last stage measures readers on your local
media server, not whether the platform accepted the stream. Confirm on the platform's own dashboard,
every time.

## When it breaks

- **A remote camera is black** — it is publishing AV1; republish as H.264.
- **A web page, clip or world view is black** — heavy 3D content hit the embedded-browser limit.
- **Overlays vanished** — they self-hide about eight seconds after the console stops writing state.
  That is honest staleness, not a bug: a frozen overlay is worse than an absent one.
- **The world camera and the world process are both dead but the host is fine** — a network lease
  moved. That is not a studio fault and restarting the studio will not fix it.
- **It says off air and you think you are live** — check for a syncing state, which means *not
  measured*, not *off*.

## The honest limits of a long run

- Window capture is a documented dice-roll and has been realised twice. **Detection exists; automatic
  recovery does not.**
- A console crash drops all public egress, and re-arming needs the operator's PIN — so the operator
  must be reachable for the whole run.
- Two supervisors disagree under air: one stands down while streaming, one restarts unconditionally.
- **No soak test exists.** Stability over days is unknown.
- The emergency stop has never been fired by a human. Sixty seconds of rehearsal before a public run
  is cheap.

The run sheet's own conclusion is the right one to end on: a four-hour run is not underwritten —
attend it, or do not do it.

## What this article does not claim

Every number here was read from source, not from a running system. Three different fan-out topologies
are described across the estate's documents and I found no file that retires two of them, so **which
is canonical today is NOT ESTABLISHED**. Several operator documents state scene counts that no longer
match the builder; where they disagree, the builder is right and the prose is stale.
