---
lens_schema: 1
scope: wiki
key: evidence/receipts-control-plane-phase5-item50-premise-checks-2026-07-26
corpus: evidence
source_sha256: 58c0dbf5ad9a99a7
source_body_sha256: 58c0dbf5ad9a99a7
source_title: Phase 5 item 5.0 — the three premise checks, run before anything was built on them
source_words: 963
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
Three assumptions checked before anything is built on them, and one comes back false along with the plan's own backup answer. The premise was that another machine could hold a record the writer cannot reach. On this fleet there is no such place, except one gated by a human. The backup was to sign the record instead, but the key would live with the writer, so a signature the writer can produce is not a witness. The work that depended on it is blocked on an operator decision rather than proceeding on a weaker claim.

<!--CLEAR-->
A premise check written because four earlier pre-registered premises had each turned out wrong on contact. This time the checking came first, and the result is two confirmed and one false, with the fallback for the false one also false.

The false premise is that a second machine could hold an anchor the writer cannot reach. The fleet is reachable, and that is not the problem; the problem is what can be written unattended. The page quotes existing documentation, written before this phase, admitting that the default target is the only machine that can be written to unattended and is also the source host, which makes it a second failure domain rather than an independent custodian. A table walks each candidate and rules it out. The conclusion is stark: there is no location on this fleet the writer cannot reach unattended, except one gated by a human.

Then the fallback is taken apart. The plan had said to fall back on a signed anchor and record why. But a signed anchor is only as good as custody of its key, and the key would live with the writer. The page calls a signature the writer can produce theatre with extra steps rather than a witness, and notes this is the first time a pre-registered fallback was itself wrong.

What is available instead is stated with its limits attached. An approval-gated write is a genuine second party, because the writer cannot produce that approval. A distributed anchor exists in a remote and in every clone, and while it can be force-pushed, a force-push is visible and the other clones keep the prior history. Neither is tamper-proof; both are tamper-evident, which is a weaker claim, and the page insists that difference must be stated wherever the thing is described. The choice is handed to the operator, because building the wrong one would produce a component whose name asserts something it does not do.

The second premise is confirmed decisively by writing a deliberately summarising fixture and linting it before any real seat exists. Ten violations across five independent checks are listed with what each one caught, including a forbidden word in an identifier rather than only in a field, so the rule cannot be evaded by naming.

The third premise is confirmed by pointing at a worked example and showing that the pattern is enforced rather than conventional. A new source must be declared in three places, and a specific check exists to catch the case where something emits while being declared nowhere.

A closing table gives the disposition item by item, one blocked on the operator and the rest free to proceed, with a line saying nothing was built on an unchecked premise.
