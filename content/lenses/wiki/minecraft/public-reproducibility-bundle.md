---
lens_schema: 1
scope: wiki
key: minecraft/public-reproducibility-bundle
corpus: minecraft
source_sha256: c0b42154a04733e7
source_body_sha256: c0b42154a04733e7
source_title: UNI Public Reproducibility Bundle
source_words: 521
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page is a manifest. It lists what a stranger gets when they pull a frozen public tag, so they can reproduce any of the project's verdicts from a seed.

The list is short and specific. The schemas that define the shapes of things, the reviewer persona documents, and the gate log with its records of what was run. The shape of the per-tick evidence frames, the binding charter, the public introduction, and this page itself.

A numbered procedure explains how to reproduce a verdict, and the page states the invariant plainly: if your outcome does not match, they owe you a correction.

Just as useful is the section on what is deliberately not in the bundle. Stream keys, which live outside the repository. Per-lineage memory files, because the path starts from a seed rather than from a memory. And live operator state, because this is a frozen tag rather than a subscription.

Tags are immutable. A correction becomes a new dated tag with a note naming what changed.

<!--CLEAR-->
This is a manifest for a public, frozen tag: the set of artifacts a stranger can pull in order to reproduce any of the project's gate verdicts starting from a seed. It names its own schema and the read-only interface that serves it.

The contents are enumerated in seven groups. The schemas that fix the shape of a data row, a response wrapper, a row in the gate list, an approval bundle, the manifest itself, and the list of words a claim may not use. The reviewer persona documents that make the ship-gate review auditable. The gate log with every verdict, and the path to each file recording what was run. The schema of the per-tick evidence frame together with the checks its verifier runs. The binding charter, quoted verbatim. The public introduction written for a person rather than a machine. And this document.

A numbered procedure follows for reproducing a verdict. Clone the dated tag, read the gate log, pick a gate, and open its receipt — the file recording what was run. Note the code point, the seed and the conditions registered in advance, check out that code point, run the named launcher with the same seed, and compare. The page then states the invariant in one line: if your outcome does not match, the project owes you a correction.

The section on what is deliberately absent is as informative as the contents. Stream keys are not there and live outside the repository. Per-lineage memory files are not there, because the reproducibility path starts from a seed rather than from a saved mind. And live operator state is not there, because this is a frozen tag rather than a live feed.

Immutability is then declared. Once a tag is minted its artifacts do not change. An error in a receipt is handled by minting a new dated tag carrying a corrected receipt and a note naming the changed row and the reason, and the old tag stays where it is.

A short section explains how to check the bundle itself: the manifest names every file with its digest, and a single command re-checks them. If a digest differs, the page says the tag has been tampered with and should not be trusted.

The final sections explain how to report a falsification, whether that is a verdict you cannot reproduce, an over-claim, or a gate whose refuting condition was met but recorded as a pass. The page says corrections are published as new dated tags, and that this is not a slogan.
