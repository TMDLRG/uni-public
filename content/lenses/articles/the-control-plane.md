---
lens_schema: 1
scope: article
key: the-control-plane
corpus: 
source_sha256: c947e289bda23919
source_body_sha256: c947e289bda23919
source_title: The control plane
source_words: 685
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: Rebound 2026-08-01. The article's live {{count}} markers re-resolved against the current source and one internal link was corrected, so the body digest moved. The prose was re-read against the new bytes and left unchanged because it contains no numeral and no route, so nothing in it could have gone stale. A rebind is only honest when the delta is checked; this one was.
---
<!--PLAIN-->

This page describes the part of the system that keeps the science honest. It records every judgement
the project makes about its own work, and it is built so that the record cannot be quietly tidied up
later. Entries are only ever added, never changed, and each one carries a fingerprint of the entry
before it, so altering an old row breaks everything after it. Only one component may write to it, and
that is enforced by the code rather than by good manners.

A judgement is one of five words, never a percentage, because a percentage invites averaging and
averaging hides a broken part under a healthy total.

The page is unusually open about the limits of its own design. A chain of fingerprints cannot notice
that its own tail was cut off, and the outside witness that would make the record hard to forge
currently accepts the writer's own key. So the record is called tamper-evident and explicitly not
unforgeable. It also says no judgement about a real scientific claim has been recorded yet.

<!--CLEAR-->

This article describes the body that runs the lab and authors every verdict — the part of the estate
that exists to make the rest of it accountable. It is the best-documented subsystem on the site, with
test lines outnumbering source lines.

It opens with a warning about a name collision. Two different things in this system are called the
control plane, and one source file exists almost entirely to explain that and prevent the confusion.

Then the design. Every change to the evidence record goes through a single writer, and that is
enforced by the type system rather than by convention: the writer needs a token only one path can
mint. Every entry records who acted, in what role, under what authority, and the state before and
after. Where two distinct parties are required, the co-signer cannot be the proposer.

The record is append-only and hash-chained, so a row cannot be quietly altered later without breaking
every hash downstream. The article then does the thing that makes it worth reading: it names what
that cannot do. A hash chain cannot detect truncation of its own tail — lop off the last entries and
what remains is a valid chain. The response is not to hide the limitation but to hold the head and
length outside the chain, and to keep a test that performs the attack and asserts it succeeds. There
is a further limit: corroboration needs a custodian the writer cannot reach, and as measured the
current witness accepts the writer's own key, so the anchor is described as tamper-evident and
explicitly not unforgeable.

A verdict is one of five words and there is no score. Two of those words exist so that "we did not
look" and "we looked and could not tell" do not collapse into a pass. A check must be registered
before it runs, so it cannot be invented after seeing the result. A comparison between two runs is
refused at construction unless exactly one variable differs — refused, not warned about. And a run's
identity includes its planned sample size and its stopping rule, so relabelling a run changes which
run it is.

Releasing anything to the world requires passing through a room with two keys from distinct parties. There is no override function — not a refused one, an absent one. The reasoning is that a control which merely refuses still teaches the operator that the door exists.

It ends honestly: nothing has yet been adjudicated about a real scientific claim. What the record has
mostly judged so far is its own construction.
