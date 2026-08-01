---
lens_schema: 1
scope: wiki
key: evidence/receipts-lab-team-review-uni-self-audit-85b0e8c-v2
corpus: evidence
source_sha256: 45faa0b919e0fc82
source_body_sha256: 6f02add6e31ead5e
source_title: /lab-team-review MERGED VERDICT (v2, post-fix) — C-C2 uni_self_audit
source_words: 6327
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
The follow-up to a review that had come back needing changes. The specification was rewritten rather than patched, every earlier finding was re-verified against the live code before anything was written, and this second round comes back passing. Two things stand out. One field was dropped rather than invented, with the prerequisite for adding it later named plainly, so it is not yet available. And the author caught and corrected one of their own citations before finalising, and recorded that correction on the page.

<!--CLEAR-->
A second review round over a corrected specification, superseding an earlier receipt, with a passing verdict. Five reviewers read it again, and the page names both files reviewed and the state they were read against.

The fix summary is the substance of the page. Every finding from the first round was re-verified against the live code before anything was rewritten, and all of those citations still held, which is stated rather than assumed.

The corrections are listed one by one, and their shape is instructive. Fields are re-sourced against what the code actually returns, with the mechanism named rather than gestured at, including a heavier probe whose blocking cost is stated openly. One field is dropped instead of invented, with a named two-part prerequisite for adding it later. A path convention is corrected to the real one, with an explicit step to make it relative.

A leak is closed twice over: an allowlist is added at the level of individual fields, and the redesigned transport avoids the risk structurally by never reading the offending source at all. A conformance claim that had been false is reframed as aspirational, rather than quietly kept or quietly deleted. The transport itself is named exactly, down to the route and the process it runs inside, with the evidence that this is possible drawn from callers that already do it.

Two quantities get proper treatment. One gains a named canonical form, a stated scope and a determinism test. The other is rescoped as best-effort and eventually consistent, with the underlying non-atomic write named as the reason, and tests added for both the ordinary case and the degraded one.

A contradiction between two documents about the same limit is reconciled, with a note explaining the earlier three-way disagreement rather than silently picking a winner. And the framing is changed throughout, from language implying something narrates itself to a plain description of a machine-readable attestation, which is exactly the kind of change this project's fence exists to force.

One self-correction gets its own paragraph. A first draft cited the wrong script for a pattern, because that script did not actually do the thing claimed, and the correct citation was found and fixed before finalising.

The remaining findings in this round are listed with their fixes, including one raised independently by all five reviewers where a single change closes every mention, and one where a rule that existed only in prose gains an enforcement test, constructing a fixture and asserting the forbidden fields never appear in the output.

A closing scope note is careful about what was not done. One pre-existing issue was already out of scope before this round and stays out, no reviewer re-raised it, and nothing here required editing code that runs today, because the parts being specified are proposed new work rather than changes to running behaviour. The page ends by naming exactly which two files changed and stating that no source code was written or modified.
