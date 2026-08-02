---
lens_schema: 1
scope: wiki
key: evidence/receipts-red-preregistration-cross-box-g-pa
corpus: evidence
source_sha256: 4e772ee6e3122646
source_body_sha256: 4e772ee6e3122646
source_title: RED pre-registration — cross-box-single-approval (G-PA cross-box)
source_words: 235
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is a security test written down before it was run. A single human approval is supposed to authorise one action, on one machine, once. This page lists three ways someone might try to get around that: reusing an approval that has already been spent, faking one, and going straight to the machine that acts while skipping the machine that approves. It says in advance that all three must be refused. At the time of writing the test had not been run, and no verdict is recorded.

<!--CLEAR-->
Nothing here is a result. It is a pre-registration for a red-team test: the attacks, the pass condition and the result that would show it wrong, all written down before the run, with the verdict withheld and the evidence marked pending.

The motivation is stated plainly. A single-machine version of this protection already has a corroborating receipt, a file recording what was run. The cross-machine version, where one machine takes the approval and another carries the action out using a one-time token, is described in the design but had not been tested from this repository. That gap is the reason for the page.

Three attacks are listed in order. Replay a token that has already been redeemed. Submit a token with a plausible-looking payload but an invalid signature. And send the action straight to the machine that would carry it out, skipping the approval entirely. The test passes only if all three are refused, and only if each refusal also lands in the audit log, which is added to and never edited. A refusal that leaves no trace counts as a failure too.

The protocol asks for a legitimate approval first, as a baseline, and then for each attack in turn, capturing the exact command lines, the replies, and the rows added to the audit log. A closing note says the eventual receipt must carry those things themselves rather than a summary of them.
