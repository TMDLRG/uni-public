---
lens_schema: 1
scope: wiki
key: control-plane/data-spec
corpus: control-plane
source_sha256: e623b8e8d8a48085
source_body_sha256: e623b8e8d8a48085
source_title: Data specification
source_words: 1166
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

This page specifies the shapes of the records the system keeps: a ledger entry, a receipt, a gate row, a node the lab renderer receives, and a drift comparison. Its status line matters — some of these are built, and two of them remain design, owned by later phases.

The most useful part is not the field tables. It is the short list near the top of three things the specification did not anticipate, written down so that the next reader inherits them rather than rediscovering them. One is a limit: the ledger's stated invariants do not cover losing the end of the chain, because a prefix of a valid chain is still a valid chain. A stored anchor now catches that in practice against loss, corruption and accident — but not against a tamperer who owns the store directory and rewrites both, and a test performs that attack and asserts it succeeds. Another is that the gate ledger violated this very specification in twelve places. The third is that one of the specification's own rules was wrong, and shipped enforced.

<!--CLEAR-->

A data specification, fixing the shape of every record the system writes down. Read the status line first, because it is doing real work. Some sections are built and one has already been corrected once and now persists; the receipt and the lab renderer's node remain design, owned by later phases. Everything here has to be expressible with the standard library alone, because the core application takes no external dependency.

Before any field table, the page lists three things the specification did not anticipate, recorded so the next reader inherits them rather than rediscovering them — one being that the specification itself was wrong.

The first is a limit on what the ledger's invariants reach. The specification says deleting any entry fails verification. That holds for the middle of the chain and fails at the end, because a prefix of a valid chain is a valid chain. The store now persists the anchor beside the ledger, so a reload that has lost its tail fails to attest. It catches loss, corruption and accident in practice — but not a tamperer who owns the store directory and rewrites both. A test performs that attack and asserts it succeeds.

The second is that the canonical ledger of gate rows violated this specification in twelve places. It was remedied by superseding rows rather than by edits, and the originals remain, because the file is append-only.

The third is that one of the specification's own rules was wrong and shipped enforced. It said one field could be empty only for the very first ledger entry, but registering a new gate later genuinely has no prior state, so the rule had confused the ledger's first entry with the subject's first entry. It survived an earlier phase because nothing tested it, and the page draws the moral — a rule with no test is a comment that happens to run.

The sections themselves are field tables with types, whether each field is required, and what it means. The ledger entry is append-only and hash-chained, an entry is never edited, and a correction is a new entry; its invariants are listed, each as a test written to fail first. A later extension is recorded rather than folded in silently: an authorisation gained an optional list of co-signers, because an airlock needs two keys and the original had nowhere to put the second.

The receipt section defines what makes a claim reproducible — a commit, artifacts that must exist on disk, logs, the exact command that regenerates the result, and the environment. Its invariant is that a receipt path named in a gate row must resolve to a real file, already enforced by an existing test that should be extended rather than duplicated.

The gate row section refuses to redefine anything: the schema already exists and is enforced, so the page lists what is required and what is optional, and notes that validation is written by hand because there is no schema library and there will not be one.

The lab renderer's node section carries a rule worth knowing even if you read nothing else: a node missing its truth class or its receipt reference renders as fog. That is not an error path but the honest depiction of an unbacked assertion, and the renderer chooses its material from the truth class rather than from any style flag.

The final section defines a drift comparison and encodes an earlier lesson into the type itself: construction refuses when the two sides are not the same kind of thing.
