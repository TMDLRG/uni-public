---
title: Install guide
summary: Every prerequisite with the version the estate actually declares, where each is declared, and the three places those declarations disagree with each other.
order: 10
---

> **PARTLY RUNNABLE BY YOU.** The Elixir core, the web UI, the flagellum laboratory and most gates
> install on any machine. The studio, the operator plane and the broadcast need Windows, a GPU, and
> software you must install yourself. Each section below says which it is.

Every version on this page is quoted from the file that declares it. Where two files disagree, both
are shown and the disagreement is named rather than smoothed over — because a prerequisite list that
resolves conflicts silently will send you to the wrong version and give you no way to find out why.

## The honest headline first

**There is no `.tool-versions`, no `.nvmrc` and no `.python-version` anywhere in this estate.** Every
version below comes from a build file, a CI workflow or prose. Nothing is centrally pinned, and that
is why three of them disagree.

## Prerequisites

### Elixir and OTP — required for everything

| declared | where |
|---|---|
| `~> 1.18` | the core project file |
| `~> 1.17` | the web UI's project file |
| 1.18 / OTP 27 | continuous integration, both jobs |
| 1.18 / OTP 27 | the container image |

{{cite:uni-minecraft:mix.exs}}

**The UI's floor disagrees and it is stale.** The core was raised to 1.18 because the control plane
calls a module built into 1.18; the UI's file was never raised. CI runs 1.18 for both, so nothing
fails — which is precisely why it has stayed wrong. **Install 1.18 on OTP 27.**

### Node

| declared | where |
|---|---|
| 22 | the colony repo's continuous integration |
| 20+ | the colony repo's operations prose |
| `>=22.13.0` | the flagellum laboratory's package file |
| *nothing* | the studio's own package file declares no engine at all |

{{cite:uni-flagellum:package.json}}

**Install Node 22 or later.** It satisfies every declaration that exists. The 20+ figure is prose and
is the oldest of the three.

### Python — only for the experiment pipeline

3.12 in continuous integration. The laboratory pins its libraries but **not the interpreter**; the
recorded audit environment was 3.12 and the audit notes it matched by luck rather than by constraint.

{{cite:uni-flagellum:requirements-experiments.txt}}

### Java — only for Minecraft

**Java 11 specifically.** The world is pinned to Minecraft 1.16.5, and that version needs Java 11.
If you have only a modern JDK this will fail, and the failure will not obviously say so.

{{cite:uni-minecraft:docs/runbooks/minecraft.md}}

### The rest, by what needs them

| software | needed for | note |
|---|---|---|
| **Minecraft Java Edition 1.16.5** | the colony | a paid product; you must own it |
| **.NET 10** | the native HUD | Windows only |
| **OBS Studio** | the broadcast | must be a native install, **not** headless — headless renders browser sources black |
| **A local RTSP/RTMP media server** | the broadcast | its path is currently hard-coded to the operator's machine |
| **ffmpeg on PATH** | the fan-out | the console refuses to arm without it and says so |
| **openssl** | LAN certificates | sourced from git-for-windows |
| **PowerShell 5.1** | the whole operator plane | scripts are ASCII-only by necessity |
| **Podman + systemd** | the containerised platform | Linux node, marked pending |

---

## Install: the Elixir core

Nothing to fetch. Zero dependencies by construction.

```bash
mix compile
```

```bash
mix test
```

The exact ordered sequence continuous integration runs, which is the sequence to copy:

1. compile with warnings as errors, forced
2. check formatting
3. `mix test`
4. regenerate the golden artifact
5. `git diff --exit-code` on it — the drift guard
6. record a run
7. verify **the file just written**

Steps 4 and 5 are a pair and so are 6 and 7. Running either half alone proves nothing.

{{cite:uni-minecraft:.github/workflows/ci.yml}}

There is one thing worth knowing about that workflow: it declares which branches it runs on, and for a
long time the real working branch was not among them — so it had **never run, once, on any commit**.
The fix is in the file; the lesson is that a green badge and a configured pipeline are different
claims.

## Install: the web UI

This is the only part with package dependencies.

```bash
cd ui && mix deps.get && mix phx.server
```

Then open the UI on port 4000.

## Install: Minecraft — one time, in this order

```bash
bash scripts/minecraft_setup.sh
```

This downloads the server jar. It deliberately does **not** accept the licence for you:

{{quote:uni-minecraft:scripts/minecraft_setup.sh:7-9}}

So the next step is yours:

```bash
echo "eula=true" > mcserver/eula.txt
```

Then generate the world:

```bash
cd mcserver && java -jar paper.jar nogui
```

If the jar download 404s, the build number has aged out; the script takes an override environment
variable and the runbook gives the form.

### Change the RCON password before you do anything else

The setup script writes a server properties file containing a **default RCON password**, and several
documents in this estate reprint it. RCON is remote console access to your Minecraft server. Open
`mcserver/server.properties`, set `rcon.password` to something you choose, and use that value
wherever a command below wants a password.

This is not a hypothetical tidiness point. On 2026-08-01 a scan of this very site found that default
published on six pages, alongside a shared secret for the Erlang runtime on nine more — both are now
redacted, and the publishing gate has a rule for credential assignments that it did not have before.
A default that ships in a setup script is a default that ends up in production somewhere.

## Install: the flagellum laboratory

```bash
npm install
```

```bash
npm run dev
```

Release validation, in this order:

```bash
npm ci
```

```bash
npm run lint
```

```bash
npx tsc --noEmit
```

```bash
npm audit
```

Production and development dependency risk are reported **separately**, because a development-only
advisory and a runtime advisory are different facts and merging them loses the one that matters.

## Install: the studio and the operator plane

**Windows only.** Read [the broadcast suite](/articles/the-broadcast-suite/) before running any of it,
and set an OBS WebSocket password first.

```bash
powershell -File viewer/gen_auto_cert.ps1
```

```bash
powershell -File viewer/install_lan_cert.ps1
```

The second one installs a local self-signed certificate into the current user's trust store. Without
it, OBS's embedded browser refuses the local pages and renders them black — which looks like a broken
overlay and is a certificate problem.

DNS routing on Windows, if you need it, requires an elevated shell and is reversible:

```bash
powershell -File viewer/apply_nrpt.ps1
```

```bash
powershell -File viewer/diag_dns.ps1
```

Then the whole stack:

```bash
powershell -File viewer/studio_up.ps1
```

## Install: the native HUD

Windows only, and it needs an elevated shell because it registers a real service and a scheduled task.

```bash
powershell -File viewer/hud/native/hud_widget_boot_install.ps1
```

```bash
powershell -File viewer/hud/native/_install_widget_launcher_elevated.ps1
```

```bash
powershell -File viewer/hud/native/_swap_service_elevated.ps1
```

```bash
powershell -File viewer/hud/hud_service_install.ps1
```

```bash
powershell -File viewer/hud/hud_service_uninstall.ps1
```

The service installer above is **retired and refuses to run** — it is listed because it still exists
and you will find it. The native path replaced it.

There is one more elevated swap, written for a specific rebuild and invoked by nothing:

```bash
powershell -File viewer/hud/native/_swap_widget_quiet_elevated.ps1
```

It is worth reading even though you will probably never run it, because it exists to defeat a race
that the obvious approach loses. The launcher service's whole job is to keep the widget alive, so
killing the widget and copying the new binary over it does not work: the launcher restarts the widget
in about a second and re-locks the file before the copy finishes. The copy then fails quietly and the
widget comes back looking perfectly healthy, running the old code. The only order that works is to
stop the *service* first — which is what needs elevation — and the script refuses to report success
unless the binary timestamp actually moved **and** the widget came back. Measured 2026-08-24: nothing
in the repository invokes it.

## The three declarations that disagree

Stated together, because they are the ones most likely to cost you an hour:

1. **Elixir floor** — core says 1.18, the UI says 1.17. Use 1.18.
2. **Node** — CI says 22, prose says 20+, the laboratory says 22.13+. Use 22 or later.
3. **Python** — 3.12 in CI, unpinned in the laboratory. Use 3.12.

## What you will not be able to install

Stated plainly, because this is the part most install guides leave out.

- **The source repositories are private.** The first command in the estate's own launch guide is a
  clone that will ask a stranger for credentials they do not have. This documentation site is public;
  the code behind it is not, yet.
- **The private network estate does not exist for you.** Several components address hosts on a
  WireGuard mesh with a private DNS zone. On any other machine those resolve to nothing.
- **Absolute paths are hard-coded in several places** — the OBS binary, the media server binary, a log
  directory, and the cross-repository link that draws the project plan. On any other machine, the last
  of those renders an empty plan rather than failing loudly.
- **The observed-experiment reproduction needs a dataset that is not redistributed**, and the widest
  cross-study check needs a multi-gigabyte raw cache.
- **Go-live needs a presence token that nothing in the repository mints**, on purpose. See
  [the broadcast suite](/articles/the-broadcast-suite/).
- **Three units of the containerised platform were never written.** The multilingual long-form
  broadcast cannot be started by anyone, including the operator.

## Next

- **[Run it](/articles/run-it/)** — every entry point with its real command.
- **[Maintenance](/articles/maintenance/)** — watchdogs, health checks, backups and what breaks.
