---
lens_schema: 1
scope: wiki
key: flagellum/observed-experiment
corpus: flagellum
source_sha256: 8622b9791400b0b0
source_body_sha256: 8622b9791400b0b0
source_title: Observed single-motor experiment
source_words: 997
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

One analysis of real, published recordings of single bacterial motors. The recordings came from
another laboratory; this project took no readings of its own and re-analysed someone else's file.

The question was about waiting times. If a motor's state changed at a constant rate, the spread
of waiting times would look one particular way. It does not. Held-out data reject that simple
picture, and the project's own two-timescale model predicts unseen waiting times better than it.

The honest part is what comes next. A plain, ordinary alternative — a lognormal curve — scored
slightly better than the project's model on the same held-out data. So the run does not show the
project's model to be the best one tested. It shows that more than one timescale helps, and that
the reason for it is still open.

The page is careful to say what the data cannot touch. These are historical recordings. They
contain no action chosen by the software and no measurement of a bacterium's belief, so nothing
here tests an action loop.

<!--CLEAR-->

The page opens with its result in one sentence, and the sentence carries its own contradiction.
In a held-out analysis of a published single-motor dataset, the variability of dwell times
rejects a homogeneous memoryless process, and a frozen two-timescale mixture predicts unseen
durations better than that null. However, a lognormal baseline achieved a slightly better
held-out score than the mixture. The page then states plainly that this is evidence about dwell
timing and predictive models, and is not evidence that a bacterium performs the inference or
contains the latent variables the model uses.

Source identity comes next: the primary article, the public repository, a frozen commit, the raw
file and its checksum, and the licence. The protocol was frozen before the outcomes were
computed, but the source paper's conclusion was already known, so the page classifies this
honestly as a local reproduction and a held-out prediction protocol, not blind discovery.

The data boundary is narrow and declared. The analysis sees motor identity, timestamp and
step-fitted occupancy, and nothing else. It never reads a molecular label as hidden truth and
never uses held-out durations to fit parameters. All events from one motor stay in one
partition, so nothing leaks between training and holdout. The first dwell in each window is
discarded as left-truncated and the last is treated as censored.

Four predictive models are then defined on a normalized scale so that shapes are compared
fairly: a memoryless baseline, a curve with a fitted shape, a lognormal, and the project's
two-timescale mixture. For the mixture, the page writes down the exact belief that a surviving
dwell belongs to the slower component — and immediately adds that this is an inference performed
by the analysis model, since the historical data contain no measurement of a bacterium's own
belief.

The results section reports the held-out scores as a table, with the lognormal in bold as the
best. The paired difference between the mixture and the lognormal has an interval crossing zero.
The page therefore states, in bold, that the run does not establish the mixture as the best
tested predictive model: it beats the strict memoryless null, is unresolved against the fitted
shape, and is slightly worse than the lognormal on this holdout. A secondary result about
transition direction is called inconclusive because its interval also crossed zero.

The section on what was proved and what was left open is unusually careful. The algebra proves
only consequences of each declared probability model; the tests establish that the code
implements those declared calculations. Within the frozen population the data support timing
inconsistent with a memoryless model and predictive value in modelling more than one timescale.
They do not distinguish among the causes: cell-to-cell variation, drift over time, continuous
mixtures of rates, segmentation of the measurement, and discrete molecular states all remain
competing explanations. The lognormal result is what makes that limitation empirical rather than
merely stated.

The page closes with uncertainty and an audit trail — resampling motors rather than events, a
fixed seed, preserved exclusions, machine-readable artifacts — and with commands anyone can run
to reproduce the analysis, including an independent re-implementation that fails if it disagrees
with the production one.
