---
lens_schema: 1
scope: wiki
key: minecraft/reports-reproducibility-report
corpus: minecraft
source_sha256: b5d0fef1ba92c517
source_body_sha256: b5d0fef1ba92c517
source_title: Reproducibility Report
source_words: 234
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This short report checks one thing: that starting again with the same seed reproduces the same run, and that different seeds diverge.

The method is stated in a line. All randomness comes from one generator threaded through the program by hand, with no system randomness, no clock, and nothing external. Whole episode traces and world states are then compared for identical and for different seeds, and one seeded episode is pinned in a stored artifact and re-derived.

The results are three plain true or false lines, all as hoped, plus the note that the pinned episode reproduces with whole-number metrics exact and decimal ones inside a stated tolerance.

The tolerance is declared rather than assumed, and the report ends by saying where exactness is not promised: decimal arithmetic is not bit-identical across all runtime versions, though whole numbers and generator state are.

<!--CLEAR-->
This is one of a set of short validation reports, and it verifies a single invariant: resetting with the same seed reproduces the same trace up to a declared tolerance, and different seeds diverge.

The method rests on a design choice stated first. All randomness flows through one generator threaded through the program as an explicit value, with no system random source, no clock reading and no external dependency. On that basis, whole traces and world states are compared for identical and for different seeds, and one seeded episode is pinned in a stored artifact and re-derived.

The results are three plain statements: the same seed gives an identical trace, the same seed gives an identical world step, and different seeds differ. The pinned episode reproduces with structural metrics exact and decimal ones inside a small stated tolerance. Because the artifact is produced one way and re-derived another, the report calls this a genuine check across separate runs of the virtual machine, and notes that it caught a real ordering problem it now guards against.

The tolerance is declared rather than left implicit. The verdict is a pass, and the residual risk is that decimal arithmetic is not bit-identical across runtime versions in general, so the claim is limited to the tested matrix, while integer and generator state are exact everywhere.
