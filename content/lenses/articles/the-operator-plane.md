---
lens_schema: 1
scope: article
key: the-operator-plane
corpus: 
source_sha256: 2952825a919d0abe
source_body_sha256: 2952825a919d0abe
source_title: The operator plane
source_words: 751
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

This page is about the surfaces a person uses to see what the system is doing and to decide what to
do about it. It is written without any address, port or hostname, on purpose.

One rule runs through all of them: looking at something must never start it. A dashboard that
restarts a probe by refreshing has changed the thing it was measuring, and then watching and acting
can no longer be told apart.

The page walks through five surfaces: mission control, which is the only place the stack starts or
stops; a projection of live signals that may never act or summarise; a small always-on-top widget
built to say when it does not know; a live view of where the work came from and where it is going;
and a set of rooms where the project tests its own instruments.

It ends with two admissions. Two of the five have no written description anywhere except this
article, and the new record of the operator's decisions can show that a request came from the
machine, but not that a human made it.

<!--CLEAR-->

A research system only a machine can read is not finished, so this article describes the surfaces a
person uses. It gives no address, port, hostname or endpoint anywhere, saying those are real and
private and that a public article does not need them to explain the design.

One law is inherited by every surface: a polled read never spawns anything. The article points out
how easily that breaks. A dashboard that refreshes and, in refreshing, restarts a probe is a
dashboard that changes the thing it is measuring, and then the operator can no longer tell watching
from acting.

Five surfaces follow. Mission control handles admission, release and key custody, and is the only
place the stack starts or stops. A projection of live signals carries provenance on every value and
may never act: it does not summarise, score, rank or author, and a lint exists whose entire job is to
enforce that, because a projection that starts summarising has started deciding. A small
always-on-top widget polls the others, keeps bounded rings rather than a database, and is built to
say when it does not know — a detector that has stopped reporting must read as not reporting, never
as calm. A live project surface reads the real artifacts on every request, stores nothing, and
carries the path each value came from. And a walkable room, built in graded levels so the screenshot
check covering it could be shown to bite before there was anything to look at; the first level is an
empty room on purpose.

Then the newest part. Until recently every one of these could show the operator a decision and none
could record one, and answers that live in a chat window are not artifacts. There is now an
append-only, hash-chained record for exactly that, and the article is careful about what it claims:
the fences show a request came from the box, as a loopback name, with a header a cross-site page
cannot forge — and none of that shows a human. The claim level is stamped into every row accordingly,
because a program on the same machine satisfies every check.

Going live is guarded in exactly one place, required by every path that could reach it, and as
measured it refuses every path, because nothing in the repository can mint the token it requires.

The article's own favourite piece of evidence is a habit rather than a design decision: one source
file corrects its own documentation in place, with dates and reasons, rather than quietly fixing the
sentence.

It closes with two limits. Two of the five surfaces have no canonical document anywhere in the
estate, so this article is the first written description of either and therefore the least
cross-checked thing on the site. And the decision record makes something tamper-evident; it does not
make it authentic, and no amount of fencing on a loopback interface will.
