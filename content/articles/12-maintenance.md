---
title: Maintenance
summary: Watchdogs, boot persistence, health checks, backups, ledger repair and disaster recovery — including the four things this estate knows are not underwritten.
order: 12
---

> **PARTLY RUNNABLE BY YOU.** The health checks and the ledger tools run anywhere. The watchdogs and
> boot installers are Windows and PowerShell 5.1. The backup and archive timers are Linux systemd
> units marked as design, not deployed.

Most of this page is about a single distinction that this estate takes more seriously than most:
**crash-restart and reboot-survival are two different claims, and collapsing them is how a system
comes to believe it is durable when it is not.**

{{quote:uni-minecraft:viewer/track/track_boot_install.ps1:4-10}}

Installing a startup entry is not evidence that it fired. That sentence is the whole discipline.

---

## Health: the one call

Before anything else, and before reading any file to answer a state question:

```bash
curl -s http://127.0.0.1:8090/api/status
```

It answers what is up, what step the journey is on, every surface's live probe, and what to do next.
The estate's own run sheet puts it bluntly: never grep the repository to answer a state question. A
repository tells you what was intended; only a probe tells you what is.

Three questions in particular are deliberately **not** answered by any committed file, because no
committed file can answer them honestly — they are facts about a run or about now, not about the tree:

| question | the command |
|---|---|
| Are the trees clean? | `git status -sb` |
| Does the suite pass? | `mix test` |
| Do the gates pass? | `node viewer/gate_runner.cjs` |

A governing document upstream used to answer all three in prose. One of those answers was measured at
one moment and was false three minutes later — a half-life of 176 seconds — and it was committed
reading as present tense. Run the commands.

---

## Watchdogs — crash restart

Each supervises one surface, each takes the same options, and each can be run once for a single check
instead of looping.

```bash
powershell -File viewer/door_watchdog.ps1
```

```bash
powershell -File viewer/gaia/gaia_watchdog.ps1
```

```bash
powershell -File viewer/track/track_watchdog.ps1
```

```bash
powershell -File viewer/hud/hud_watchdog.ps1
```

```bash
powershell -File viewer/systray_watchdog.ps1
```

The last one supervises the studio processes and the media server, with a toast notification and an
automatic restart.

**A documented conflict you should know about before hour three:** two supervisors disagree while the
system is on air. One stands down during a stream; the other restarts unconditionally. That is
recorded rather than resolved, which is the honest state — resolving it needs a decision about which
behaviour is correct under air, and that decision has not been made.

The HUD watchdog stands down when the native service is running, so it is a fallback leg rather than a
duplicate.

---

## Quiet mode — stop the media stack, keep watching

The broadcast stack is heavy and this is not a machine that exists only to broadcast. Quiet mode
stops the expensive half — the mixer, the media server, the browser profiles holding the camera
views, the encoders pushing to air — while the monitoring surfaces stay up, so the machine is still
observable while it is quiet.

The state is a declared latch on disk, and it is written *before* anything is stopped. That ordering
is the whole design. Every supervisor reads the latch and stands down rather than restarting what
quiet mode just closed, and without it quiet mode does not survive: this system has several
supervisors, one of them on a five-second timer, and any one of them will undo a quiet in seconds.

```bash
powershell -File viewer/channel_windows_watchdog.ps1
```

That is one of the supervisors that must consult the latch. Run it once for a single check to see
what it would do rather than leaving it looping.

The failsafe direction is deliberate and it is the opposite of the healer's. An unreadable or absent
latch reads as **not quiet**, so a corrupt file brings the stack back rather than silently holding a
studio dark. Quiet and resume are both reachable from the operator's surfaces rather than only from a
shell, because a mode you cannot leave without a terminal is a trap.

## After a reboot, prove the state rather than assume it

A boot that looks fine is a failure this estate keeps meeting. This runs after the machine comes back
and writes a verdict rather than an impression.

```bash
powershell -File viewer/hud/native/hud_boot_healthcheck.ps1
```

It proves the monitoring surface is actually serving rather than merely running, checks the monitors
it expects to find, and asks the one thing no liveness probe can answer: did the box *stay* quiet. If
something restarted the stack during boot, the check re-asserts quiet rather than reporting a state
that has already stopped being true.

## Boot persistence — reboot survival

A separate claim, installed separately, and *proved* separately.

```bash
powershell -File viewer/door_boot_install.ps1
```

```bash
powershell -File viewer/gaia/gaia_boot_install.ps1
```

```bash
powershell -File viewer/track/track_boot_install.ps1
```

```bash
powershell -File viewer/hud/hud_boot_install.ps1
```

The mechanism is a hidden script in the per-user startup folder, non-elevated. Each installer pairs
with a prover that reports PROVEN **only if the machine actually rebooted after the install marker was
written**:

```bash
powershell -File viewer/door_boot_proof.ps1
```

```bash
powershell -File viewer/gaia/gaia_boot_proof.ps1
```

```bash
powershell -File viewer/hud/hud_boot_proof.ps1
```

```bash
powershell -File viewer/hud/native/hud_native_boot_proof.ps1
```

That design is the point. A prover that reported success because a file exists would be certifying its
own installation, not the behaviour it was installed for.

### The restart drills

Two drills exercise the native HUD's recovery paths deliberately, rather than waiting to find out
during a show. Both need an elevated shell.

```bash
powershell -File viewer/hud/native/_drill_crash_restart_elevated.ps1
```

```bash
powershell -File viewer/hud/native/_drill_service_restart_elevated.ps1
```

A recovery path that has never been exercised is a hypothesis.

---

## Certificates

The LAN certificate is regenerated **only if it is missing or expires within thirty days**, and the
bring-up calls it every time — so the renewal is a side effect of normal operation rather than a task
someone has to remember.

```bash
powershell -File viewer/gen_auto_cert.ps1
```

The trust-store install is idempotent, needs no elevation, and runs at every bring-up:

```bash
powershell -File viewer/install_lan_cert.ps1
```

If overlays or web sources render black after a certificate change, this is the first thing to check.

---

## Ledger maintenance

The scientific control plane's ledger is append-only and hash-chained. Keeping it honest is
maintenance work in its own right, and there is a set of one-shot recorders for it. They are
**idempotent** — an entry already accounted for is skipped, so re-running appends nothing.

```bash
mix run scripts/control_plane_bootstrap_prelude.exs
```

```bash
mix run scripts/control_plane_record_own_history.exs
```

```bash
mix run scripts/control_plane_backfill_phases_6_7.exs
```

```bash
mix run scripts/control_plane_backfill_evidence_objects.exs
```

```bash
mix run scripts/control_plane_record_phase9_steps.exs
```

```bash
mix run scripts/control_plane_record_phase9_builds.exs
```

```bash
mix run scripts/control_plane_correct_step_coverage.exs
```

```bash
mix run scripts/control_plane_correct_pre_registration_null.exs
```

```bash
mix run scripts/control_plane_supersede_receipt_reference.exs
```

These exist because the ledger's own anti-silence guard fired. Work had continued and the record had
not — steps were marked done in the plan and accounted for nowhere in the ledger. The guard said so,
and these scripts are the answer to it rather than a way of silencing it.

Note the two named `correct_` and the one named `supersede_`. **A correction is appended, never
edited.** An append-only ledger that permits a fix in place is a ledger with no memory of having been
wrong, which is the only thing it was built to remember.

---

## Backup, archive and heartbeat

Four scheduled units on the Linux side. **All four are marked design/reference, authored and not yet
run on node hardware** — so treat this section as the intended shape, not as a running system.

| unit | cadence | what it does |
|---|---|---|
| colony archive | 03:30 daily | snapshots the world and each agent's memory, with a checksum manifest |
| backup | 04:00 daily, persistent | rsync to a date-stamped destination; an unset destination is a hard failure, never a silent no-op |
| heartbeat | every 60s | a read-only re-probe appended to an audit log; **always exits 0** so it cannot crash-loop its own timer |
| collector | every 10 minutes | the evidence collector, rootless |

The ordering is deliberate: the archive completes at 03:30 *before* the backup at 04:00 sweeps the
archive root. Reverse them and every backup is a day stale.

---

## Upgrades and disaster recovery

- **Before touching the colony container, capture first.** The agents' minds live in the container's
  ephemeral filesystem and removing the container destroys them. There is a mandatory capture
  procedure and an evidence-hold verification that must pass first.
- **One deployment script refuses to run.** It is stale against the current topology and prints a
  refusal saying that running it blind takes the live camera down. It requires an explicit
  acknowledgement environment variable to override. That is the correct shape for a stale script:
  present, loud, and not silently functional.
- **The emergency stop needs two environment values with no invented defaults.** A panic button that
  guesses its own target is not a panic button.
- **The fan-out arm does not survive a reboot**, and that is intentional fail-closed design. The
  encrypted endpoint store persists; the in-memory unlock does not. Do not "fix" it by persisting the
  passphrase.

---

## Housekeeping

```bash
node viewer/obs_cleanup.cjs
```

Retires stale scenes and inputs left behind by old experiments. Idempotent.

**Two real housekeeping gaps, stated rather than left to be discovered:**

- **There is no log rotation anywhere in either repository.** Logs accumulate in a directory that is
  ignored by version control. Nothing prunes them.
- **One evidence store is explicitly never pruned** — a write-once record that grows without bound by
  design, kept out of version control precisely because it would bloat the repository as the agents
  tick.

---

## What is NOT underwritten

The four things this estate knows it cannot currently promise. They are published here rather than
buried in an appendix, because a maintenance guide that lists only the parts that work is a sales
document.

1. **No soak test exists.** Memory-leak, reconnect and token-refresh behaviour over days is unknown.
2. **Window capture is a documented dice-roll**, realised twice. Detection exists; **automatic
   recovery does not**, and the durable fix is not built.
3. **A four-hour run is not underwritten.** The estate's own run sheet says: attend it, or do not do
   it.
4. **The emergency stop has never been fired by a human.** Sixty seconds of rehearsal before a public
   run is cheap insurance against the one path nobody has walked.

There is a fifth, and it is the sharpest: **35 of the 36 registered gates have no row in the
canonical ledger.** The instruments run and their results are real, but the record that they ran is
not yet written where the schema says it must be. Authoring those rows is the operator's task and no
agent may do it for him — the ledger has a single writer, and that constraint is worth more than the
convenience of automating it away.

> **Corrected 2026-08-24. This paragraph previously read "every registered gate has zero rows in the
> canonical ledger", and that was false.** One gate does have rows. Measured by joining the registry
> to the ledger on each gate's row alias rather than on its identifier: `sight-blind` is recorded
> under the name `hud-sight-shows-blind`, against a receipt dated 2026-07-17, and its latest verdict
> there is PARTIAL rather than PASS.
>
> The join key is the whole trap. Matching on the identifier returns zero and looks like a clean,
> checked answer, which is how a wrong number survives being checked. The same false sentence stood
> in four of the estate's own governing documents for a fortnight before it was caught there, and it
> reached this page from them — so the correction upstream did not reach the copy a reader could
> actually see. The original wording is kept above rather than quietly replaced, because a record
> that permits a fix in place has no memory of having been wrong, which is the only thing it was
> built to remember.
