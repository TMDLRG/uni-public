---
lens_schema: 1
scope: wiki
key: flagellum/audit-semantic-coverage-ledger
corpus: flagellum
source_sha256: 6123b3d3ed53a1f9
source_body_sha256: 6123b3d3ed53a1f9
source_title: Semantic Coverage Ledger
source_words: 2007
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

The subject here is a safety net, and the page is the running record of how well it has held. It
says what the project's own scientific tests have been measured to catch, and what they have
been measured to miss. Entries are added; none is edited to make an earlier bad result look
better.

The first entry is the bad result. Someone working blind broke ten named scientific properties,
one at a time, and the tests caught none of them. The page states that this measured the
instrument, not the science: the faults were injected, not discovered.

The second entry records the repair. New tests were written for those ten properties and
attacked again. Most corruptions were caught. But two catches could not be tied to the test meant
to catch them, so the credited figure is lower than the raw count, and one acceptance criterion
fails. A section then sets out what the repair does not establish.

The third entry is a correction package after an outside reviewer rejected the handoff, plus a
worse defect found while correcting it. All of it is recorded rather than tidied away.

<!--CLEAR-->

The page states its own rule at the top. It is append-only: no entry is edited to make an
earlier adverse measurement look better, and the first entry's result is permanent.

That first entry is a blind mutation battery. Ten fresh corruptions of named biological,
statistical and boundary properties were applied in isolated copies by an independent author who
could not see the test sources, and every one of them survived. The page records the counts as a
table with zero detections, calls it adverse evidence about coverage, and then says precisely
what it did not mean. The production code was not thereby wrong, because these were injected
defects rather than discovered ones. It measured the instrument, not the science.

The second entry is the remediation. Independent checks for the same ten properties were
added, then measured by replaying the original corruptions, a set of structurally different
alternate forms, and two attacks that tried to launder an adverse record. Most were detected.
But the entry carries a warning telling the reader not to quote the raw detection count. Two
detections could not be attributed to the test the protocol said would catch them, so the
creditable figure is lower and one acceptance criterion fails. A negative control on an
unmutated copy runs green, so every detection is mutation-caused.

The same entry then argues against reading itself as an improvement. The corruptions were
authored with full knowledge of the production source and of the earlier battery, and the gates
were designed to detect them, so confirmation was a low-risk prediction that says nothing about
defects nobody has thought of. A blind result and a sighted result are not comparable numbers,
and presenting them as a before-and-after would be spin. It also separates genuinely new
coverage from checks that merely migrated into the measured suite.

Adverse and null findings follow. One property is recorded as not established rather than pinned
by a test, and production was deliberately not changed to satisfy a test. One frozen corruption
turned out to be no corruption at all, because of a symmetry in the structure being mutated, so
no observable of the model can distinguish it; that prediction is recorded as falsified rather
than rewritten.

The third entry is a correction package. An external reviewer rejected the handoff on five
blocking defects, all confirmed against the artifacts, with no measurement re-run and no
classification changed. Each is listed with its correction. A wrong protocol path. An addendum
whose timing was only narrative. A headline quoting classified rather than credited detections.
A gate pinning behaviour the same phase recorded as not established. And a blanket claim about
the suite that was false.

Then the finding the reviewer did not ask for. Applying the corrections surfaced a sixth defect,
more serious than three of the five, recorded at full severity rather than deferred. A check
meant to show that the governing protocol predated the replay was pointed at the wrong file, and
the protocol that actually governed the run entered history in the replay base itself. The
corrected instrument refuses the run that was performed. One detection keeps its result but
loses its prospective standing, and one acceptance criterion is downgraded.

The page closes with standing rules for future entries. Record adverse counts verbatim. Say
whether a battery was blind or sighted. Separate new coverage from migration. Close a falsified
prediction as falsified. Never treat detecting known corruptions as general robustness. And
report credited rather than classified detections.
