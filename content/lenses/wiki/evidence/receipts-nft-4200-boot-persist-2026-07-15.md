---
lens_schema: 1
scope: wiki
key: evidence/receipts-nft-4200-boot-persist-2026-07-15
corpus: evidence
source_sha256: 1a6fa18c035c4463
source_body_sha256: 993d3c95231e15eb
source_title: RECEIPT: `producer-4200-nft-persisted-to-boot-file` — PASS (2026-07-15)
source_words: 809
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A record of adding one firewall rule to the file that is read at boot, so that an opening which existed only at runtime would survive a restart. The fence around the claim is the most important part. This shows the rule is in the file, and that the file parses under the same program the machine runs at boot. It does not show that a restart actually keeps it, and that leg runs itself the next time the machine legitimately reboots. Two things found along the way are flagged for the owner rather than quietly fixed.

<!--CLEAR-->
A receipt for a small and carefully bounded change: one rule added to a boot-time firewall file, closing a gap named in an earlier receipt where a port was open only through a runtime rule that dies on restart.

The fence is stated before the evidence, and the gate's name is chosen to match it. What is shown is that the rule is in the file, that the file parses under the exact program the system runs at boot, and that nothing reloaded or flushed the live rules during the work. What is not shown is that a restart keeps it. That leg runs itself the next time the machine legitimately reboots, and the page says the project reserves stronger vocabulary for gates that have survived a real power cycle.

The change is recorded so anyone can check it: the file, where the line went, the digest and size before and after, and where the backup lives. One decision is explained at length. No reload was issued, deliberately, because the boot file begins by flushing everything, and a reload would have destroyed rules another stack depends on. Only check-mode invocations were used, and the service's restart count and start time are quoted afterwards to show it was untouched.

The access path is described in as much detail as the change, because it is part of the evidence. Direct root access was not available, so the work went through a sanctioned channel, and because the file sat outside the allowed roots, the edits ran as one-shot containers with narrow mounts and no network. The sequence validates before installing, every failure path restores or cleans up, and each step carries an audit identifier. The failed attempts are listed too, with what each one hit and the confirmation that none of them changed anything on the host.

Verification afterwards comes through channels other than the one that made the change, including a direct read-back and checks that unrelated services still answer.

The last section deserves a second reading. Two discoveries are flagged rather than acted on. Two other ports are also runtime-only, so the same restart will drop them, and widening a firewall is the owner's call rather than the agent's. And the documented contract says every mutating call waits for a human approval, while in this session such calls ran immediately. The page names that as drift between contract and deployment, spawns it as a follow-up, and notes the audit identifiers stand regardless.
