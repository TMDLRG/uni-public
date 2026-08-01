---
title: The operator plane
summary: Five surfaces for the human in the chair, built on one law — a read never actuates — and one file that logs its own documentation defects.
order: 6
---

A research system that only a machine can read is not finished. The operator plane is the set of
surfaces a person uses to see what is happening and decide what to do about it.

It is described here **without any address, port, hostname or endpoint**. Those are real and they are
private, and a public article does not need them to explain the design.

## The law

Every surface here inherits one rule: **a polled read never spawns anything.**

It sounds obvious until you notice how easily it breaks. A dashboard that refreshes and, in
refreshing, restarts a probe, is a dashboard that changes the thing it is measuring. Watching becomes
acting, and the operator can no longer tell which.

## The five surfaces

**The Door** is mission control: admission, release, key custody, and the only place the stack starts
or stops. It is the one-move entry to everything else.

{{cite:uni-minecraft:viewer/launcher.cjs}}

**Gaia** is a projection of live signals with full provenance on every value. Its law is that it may
never act — it does not summarise, score, rank, or author. There is a lint whose entire job is to
enforce the no-summarisation rule, because a projection that starts summarising has started deciding.

{{cite:uni-minecraft:viewer/gaia/gaia_server.cjs}}

**The HUD** is a native always-on-top widget backed by a JSON service. It polls the other surfaces,
keeps bounded rings rather than a database, and — the property that matters — is built to say when it
does not know. A detector that has stopped reporting must read as *not reporting*, never as calm.

{{cite:uni-minecraft:viewer/hud/hud_server.cjs}}

**TRACK** is where the work came from, where it is, and where it is going, read live from the real
artifacts on every request. It owns nothing and stores nothing; every value carries the path it came
from so the operator can go and check.

{{cite:uni-minecraft:viewer/track/track_server.cjs}}

**The lab** is a walkable room, built in graded levels so that the screenshot gate covering it could
be proven to bite before there was anything to look at. The first level is an empty room on purpose.

{{cite:uni-minecraft:viewer/lab/lab_server.cjs}}

## The decision surface

Until recently, every one of these could *show* the operator a decision and none could **record** one.
The operator's answers lived in a chat window, which is not an artifact: not greppable, not
hash-chained, and gone when the session ends.

There is now an append-only, hash-chained ledger for exactly that, and it is careful about what it
claims. The fences prove a request came from the box, as a loopback name, with a header a cross-site
page cannot forge. **None of that proves a human.** The claim level is therefore `presence_evident`
and never `authenticated`, and that word is stamped into every row — because an agent on the same
machine satisfies every check.

{{cite:uni-minecraft:viewer/track/decisions.cjs}}

Tamper-evident is a real property. Unforgeable is a different one. The record says which it has.

## One chokepoint to air

Going live is guarded in exactly one place, required by every path that could reach it.

{{cite:uni-minecraft:viewer/golive_guard.cjs}}

Measured, it refuses every path today, because nothing in the repository can mint the token it
requires — and there is a gate that scans for a minter and a test that plants one to prove the scan
would find it.

## The file that logs its own defects

The best single argument for this subsystem is not a design decision, it is a habit. TRACK's own
header corrects itself, in place, with dates and reasons:

{{quote:uni-minecraft:viewer/track/track_server.cjs:13-16}}

A source file that records where its own documentation was wrong, rather than quietly fixing the
sentence, is unusual. It is also the fastest way to understand what this estate is actually for.

## The gates

These surfaces are not covered by unit tests in the usual sense. They are covered by executable gates
registered in a registry, run by a runner that asserts an exit-code-implies-verdict law *and its own
registry completeness* — so a gate file that exists but is unregistered fails the whole run.

{{cite:uni-minecraft:viewer/gate_registry.json}}

## What is not established

**Two of these five surfaces have no canonical document anywhere in the estate.** The Door, Gaia and
the HUD each have one; TRACK and the lab have only their source headers. This article is the first
written description of either, which means it is also the least cross-checked thing on this site.

And the honest limit on the decision ledger: it makes a record tamper-evident. It does not make it
authentic, and no amount of fencing on a loopback interface will.
