---
title: The flagellar motor laboratory
summary: A real bacterium's rotary motor, a deterministic reconstruction of it, and an agent that has to live with the difference. The one place in this estate with licensed microscopy on one side of the boundary and a model on the other.
order: 7
---

Everything else in this estate is a system the estate built. This part is not. There is a real
bacterium with a real rotary motor, other people measured it, and the laboratory's job is to hold a
model up against those measurements and be told, repeatedly, where it is wrong.

That changes the discipline completely. In a simulated colony you can always define your way out of a
disagreement. Here you cannot, and most of the machinery below exists to stop anyone trying.

## What the motor is

*Escherichia coli* swims using a rotary motor about 45 nm across, embedded in the cell envelope,
driven by the proton-motive force rather than by ATP. Stator units engage and disengage dynamically —
the motor **remodels its own hardware** under load. Switching the direction of rotation is what
converts smooth swimming into a tumble, and biasing that switch is how the cell performs chemotaxis.

So the motor is not a component in a behaviour, it *is* the behaviour, and it is one of the few places
in biology where a mechanical model, a stochastic model and an inferential model all have to describe
the same object without contradicting each other.

{{cite:uni-flagellum:docs/SCIENCE.md}}

## The boundary this laboratory is organised around

The single most important thing here is a distinction that is easy to state and easy to lose:

| | |
|---|---|
| **OBSERVED** | source-pinned recorded measurement, from a study that exists, with a DOI |
| **RECONSTRUCTION** | a deterministic re-derivation from those measurements |
| **SIMULATION** | the model running forward on its own |
| **INFERENCE** | what an agent believes, which is none of the above |

A reconstruction may never be relabelled observed. The estate's contract says so as a rule rather than
as a preference, and the site you are reading inherits it — that is why a truth class appears beside
things here rather than being left to context.

There is a second separation of the same kind, and it is the one most likely to be quietly broken:
*E. coli* **behavioural** evidence and *Salmonella* / *Bacillus* **structural** evidence are different
organisms. Combining them into one narrative implies a measured specimen that never existed.

{{cite:uni-flagellum:docs/OBSERVED-EXPERIMENT.md}}

## Why the gates are unusually paranoid

A model that fits its own training data proves nothing, so the laboratory's checks are aimed less at
"does it work" and more at the ways a scientific result gets accidentally faked. The named ones
include train/holdout leakage, censoring and exclusion, orientation and score-sign errors,
prospectivity provenance, density scale and dispersion, survival-posterior conditioning, the
world/agent observation boundary, first-passage invariants, periodic lattice topology, and the
preservation of adverse records.

Each of those is an executable test rather than a review checklist. They exist because each one names
a specific way a plausible result can be wrong, and several of them exist because a specific result
*was* wrong in exactly that way.

{{cite:uni-flagellum:docs/SCIENCE-GATES.md}}

The one to understand first is **prospectivity**. A prediction counts as prospective only if it was
committed *before* the observation it predicts. Not "wasn't looked at" — committed. Everything else is
a fit, and a fit dressed as a prediction is the most common way an honest person publishes a wrong
result.

## Cross-study parity, and the thing it refuses to do

The laboratory compares its reconstruction against more than one study. That is the strongest
available evidence and also the easiest thing to fake, because a parameter that is quietly retuned per
study will produce parity across all of them and mean nothing.

The defence is that calibration, training, holdout and prospective evidence stay separate, and that
the raw path is verifiable independently of the ingested path — there is a `verify-raw` route which
re-derives from the original archives rather than from the convenient cache.

{{cite:uni-flagellum:docs/CROSS-STUDY-PARITY.md}}

## The math workbench

The workbench is a browser instrument that executes the **committed model libraries** — the same code
the gates run, not a reimplementation of it for display. That is the whole point of it: a
visualisation that reimplements the maths is a second model that can silently disagree with the first,
and then you have two systems and one label.

It is CPU-only and contains no inference of any kind. The product contract that governs the released
artifact is explicit: no LLM inference, no GPU computation, no WebGL or WebGPU, no analytics, no
accounts, and no hidden network calls. Development tools may be used to build it; they may not become
runtime dependencies of it.

{{cite:uni-flagellum:docs/MATH-WORKBENCH.md}}

## What is NOT established

This is the section that matters most and it is deliberately long.

- **The full observed-experiment reproduction cannot be run from the published material alone.** It
  needs a `.mat` dataset from a published study that is not redistributed here, and the widest
  cross-study check needs a multi-gigabyte raw cache. Where those are absent the correct result is a
  gate marked `BLOCKED` or `EXTERNAL VALIDATION REQUIRED` — never a pass.
- **Passing gates are not biological parity.** They are evidence that specific named failure modes
  were tested for and not found. The validity domain — species, strain, load, proton-motive force,
  stator state, temperature, viscosity, CheY-P condition, apparatus, timescale — is mapped
  deliberately, and large regions of it are marked unobserved or extrapolation-only rather than
  supported.
- **Frames are not replicates.** Counting time points or repeated events as independent biological
  replicates, when the experimental unit is a motor or a cell or a culture, inflates confidence
  without adding evidence. The tests check for this because it is easy to do by accident.
- **Thermodynamic work and variational free energy are different quantities with different units**
  and are never summed, however similar the notation looks.
- **No verdict has yet been authored about a real scientific claim.** The control plane that would
  hold such a verdict is built and working; what it has recorded so far is the estate's own
  engineering. That is a real gap and stating it is not modesty.

## Read next

- **[The active-inference brain](/articles/the-brain/)** — the inference machinery, and where to be
  most careful about what it is claimed to do.
- **[Install it](/articles/install/)** and **[Run it](/articles/run-it/)** — the laboratory is the
  most runnable part of this estate on an ordinary machine.
- **[The Flagellar Motor corpus](/wiki/#flagellum)** — the laboratory's own documents, unedited.
