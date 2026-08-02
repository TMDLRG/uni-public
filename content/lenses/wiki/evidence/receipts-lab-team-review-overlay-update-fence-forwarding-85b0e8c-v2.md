---
lens_schema: 1
scope: wiki
key: evidence/receipts-lab-team-review-overlay-update-fence-forwarding-85b0e8c-v2
corpus: evidence
source_sha256: d04046d587997577
source_body_sha256: d04046d587997577
source_title: /lab-team-review MERGED VERDICT (v2, post-fix) — D-A3/D-B3 overlay update + fence-override forwarding
source_words: 6778
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A review covering two specifications and a policy document, whose merged verdict is revise, under a rule that the worst verdict wins. Two facts confirmed against the live code drive most of it: a function the first specification leaned on does not exist, and a second writer to the same audit file is already running. The corrected versions name the new code they would introduce rather than writing as though it already exists, and the author records catching one of their own mistakes mid-draft.

<!--CLEAR-->
A review round covering two specifications and a policy document, with a merged verdict of revise, and an honesty note explaining what that means: further document work is needed before any code change may follow.

Two confirmations against the live code shape most of the page. A module the first specification leaned on is a purely tick-driven process with no way to be written to at all, so the function it assumed simply does not exist. And the second specification's proposed writer exists nowhere, while a real second appender to the same audit file is already running.

Both are handled the same way, and the pattern is worth taking. A note saying plainly what is confirmed live, hedging language removed, and a new section naming the code this document would introduce, so that nothing reads as though it already exists.

One passage is the author catching themselves. A first draft of the new handler called a write helper unwrapped, which uses functions that raise, and would have crashed the process on exactly the class of race this whole effort exists to eliminate. It is fixed by reusing the module's existing safe helpers, and the mistake is recorded rather than quietly corrected.

A precedence rule is then specified for the case where a manual write and a periodic tick disagree. There is a deadline per layer, limited to the only two keys the tick touches, with a guard replacing an unconditional overwrite. It is self-healing, so there is no release step for an operator to forget.

The two-writer problem is resolved by ownership rather than by routing. One process owns everything except one kind of row, and the other owns only that. The choice is justified against the alternative, which would have required a new endpoint on a surface that is not deployed today, adding at least as much work plus a runtime dependency. And the condition that actually makes two processes appending to one file safe is named and justified, which the page notes was not asked for but is the fact that makes ownership more than a label.

Corrections to test locations are grounded in what the repository really contains rather than what the document assumed, with the real convention found from existing examples.

One fix is honest about being a placeholder. Neither document said where an operator's name would come from, and nothing captures identity today, so a narrowly scoped environment value is named, with the reading side never inventing or inferring a value of its own. The text says outright that this is a minimal, single-operator placeholder rather than an identity design, which remains a separate and larger decision.

A closing section flags two adjacent observations left untouched, because no reviewer raised them in this round. One is described as still open and still trivial, surfaced again so a later pass can pick it up rather than leaving work behind silently. The addendum is also explicit that it was a direct-apply pass rather than a fresh review, and that no independent panel ran over it.
