---
lens_schema: 1
scope: wiki
key: minecraft/agent-instant-status
corpus: minecraft
source_sha256: 2b037c97bf8909ab
source_body_sha256: d89116c8ec6c5261
source_title: Agent instant-status contract — READ THIS FIRST (2026-07-14)
source_words: 795
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This page sets a rule for any assistant joining the project in a fresh session. The rule is short: ask the running system for its state, rather than hunting through files for it.

One call returns everything at once. Whether the stack is up. Which step the operator is on right now, and the journey plan, which the page treats as the prediction of what he does next. Which doors in the lifecycle are open or locked. Which surfaces are answering. And the operating laws, written out inside the response so they cannot be lost.

The page exists because the rule was broken. After a restart, a fresh assistant searched the files to answer a question the status call already answered. The page treats that as the wiring failing the assistant, not the other way round.

Much of the rest is a correction. The status call had itself been making three false claims. Each was found by measuring the call rather than reading it, and each was replaced by something narrower and true: liveness instead of a verdict, and the name of a check instead of its result.

<!--CLEAR-->
An operating contract for machine assistants, written after one of them wasted effort. It says that the first thing a fresh session does is fetch the state, not search the repository for it.

The page names a single call that answers everything in one response. It lists what comes back: a coarse up, partial or down for the whole stack; the exact step the operator is on, with a live check rather than an assumption, its description, and the steps the journey plan predicts next; the open or locked condition of every door in the lifecycle; a live probe of every surface; the liveness of the neighbouring visibility service; several fields about a widget; a curated map of every actionable endpoint with a one-line purpose; and the operating laws inlined so they cannot go missing.

One field is called out as deliberately not a verdict. The call never runs that service's own check, so it never reports its result. Instead it names the check a reader can run.

The longest section is a self-correction. Three claims the call used to make were false, and the page says these are the most expensive kind of lie because every fresh assistant trusts this route first. In one case a liveness probe was aimed at an expensive computation with a short timeout, so the answer could never arrive and the field was false by construction, while a neighbouring field in the same response said the opposite. In another, a verdict was asserted from nothing more than the fact that some data parsed. In the third, an address was advertised for a widget that has no such page and does not listen where the name suggested. Each was fixed by narrowing the claim, and removing the doomed wait also roughly halved how long the call takes.

A table then shows how several of the operator's usual questions are answered from that one response alone, with no searching.

The closing rule is blunt. If you find yourself searching for the state of something, either the call is down, which is worth reporting, or it is missing a field, which is worth adding. Neither is a reason to go looking by hand.
