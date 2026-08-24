---
lens_schema: 1
scope: wiki
key: flagellum/science-gates
corpus: flagellum
source_sha256: 737391cdfa1948b3
source_body_sha256: 737391cdfa1948b3
source_title: Scientific parity gates
source_words: 1127
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 2026-08-24 the source moved. The censored-likelihood row restated its one-line finding with different interval counts. This lens cites no count from that table and its account of the row still holds, so the prose is unchanged and only the digests are re-stamped.
---
<!--PLAIN-->

A scorecard, and most of the score is bad news kept in plain sight.

The project set itself a list of tests, called gates, that a model of a bacterial motor would
have to pass before anyone could say it matched the biology. Here is how the first round went.
Four of the seven runnable tests pass. Three fail. Five more cannot be run at all without a real
instrument, a real laboratory or a printed and instrumented machine, so they are marked blocked
rather than quietly counted as passes.

The page says the release has partial computational parity only, and that no biological identity
of the kind the project is interested in has been shown. It also records a mismatch it found in
someone else's published files, without deciding which side is right.

The last line is the point of the whole document: until the remaining tests are actually run,
full parity remains false.

<!--CLEAR-->

The page opens with a note that a later and broader programme exists elsewhere, and that
evidence relevant to two of these gates now sits in other modules. But transferring
parameters safely between laboratories is still not established, and must not be assumed by
merging unlike experiments.

Then the verdict. The release has partial computational parity only. Four of seven executable
computational gates pass, three fail, and five further gates require new instrument, biological,
laboratory or printed-model evidence. A biological identity of the sort the project cares about
is not established. The page adds a line about its own design: a negative result stays a
negative result in the data files, the tests, the documentation and the rendered laboratory.

The next section explains what was added. An earlier analysis fitted generic duration shapes and
did not implement the mechanism the source paper analysed. This layer implements the source
paper's own first-passage reduction, with the equations written out, and scores each observed
transition and each censored interval accordingly. One state is handled separately by the
original authors, so the page states that the present likelihood cannot honestly be called a
unified one, and leaves that as its own gate.

A table then lists every gate with its result and a one-line finding. The passing ones cover
identity of the source files, separation between fitting data and the outcomes kept back from
it, the first-passage mathematics, and the censored likelihood. The failing ones cover a mismatch
against the article's own workbook, a parameter-recovery run that missed its frozen tolerance,
and an advantage on kept-back data whose interval crosses zero. The remaining rows are marked source-only,
not established or blocked, each with the reason.

The public-artifact section is the most delicate part. The article reports one set of fitted
values; the file bundled with the published code contains a different set, and running the
published equations with the bundled values reproduces the article's own figure poorly. A second
internal disagreement is described too. The page records the conflict and explicitly does not
choose a silent correction, and it adds that this concerns reproducibility of the published
theory artifacts rather than the observed motor records themselves.

Identifiability follows. The training-only fit drives two of the arrival-age coefficients toward
zero, which means those coefficients are not practically identified under this split and this
likelihood. The page argues this is not a reason to remove the failed gate; it is evidence that
more data, a stronger measurement model or a simpler parameterization is needed before those
coefficients can be given stable biological meaning.

The comparison on kept-back data is reported with its interval printed beside the point estimate. The
mechanistic model edges out a memoryless baseline on the point score, but the interval includes
zero, so the frozen predictive gate fails. The page states that this is not reported as almost
proved.

Reproduction commands, machine-readable artifacts and an independently written checker are
listed. Finally there is a numbered list of the work required for biological parity. Obtaining a
clarified source artifact. Independently implementing a classifier. Acquiring raw multi-load
observations. Committing predictions before a calibrated live run. Obtaining an independent
laboratory replication. And printing, instrumenting and safety-reviewing the physical model.
Until those gates are actually executed, the page says, full parity remains false.
