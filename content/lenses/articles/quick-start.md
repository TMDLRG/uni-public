---
lens_schema: 1
scope: article
key: quick-start
corpus: 
source_sha256: 3e2be1538b3808a1
source_body_sha256: 3e2be1538b3808a1
source_title: Quick start
source_words: 707
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

This is the shortest path from nothing on your machine to something you can watch running. It needs
one piece of software, no accounts, no graphics card, and no network after the first install. It
skips the colony, the broadcast and the operator surfaces on purpose, because all three need
infrastructure and none of them is the interesting part first.

What you have at the end is the reasoning engine running locally, a table of its real behaviour on
your machine rather than a figure from someone else's, and a recorded run you can check
independently.

The step the page puts most weight on is the awkward one. After verifying a recorded run, open the
file, change one number in the middle, and verify it again. It has to fail. A verifier that has never
been shown to fail is not a verifier.

The page closes by saying what running the demonstration does not tell you: nothing about biological
parity, general intelligence or human parity.

<!--CLEAR-->

This is the on-ramp page: from an empty machine to a running inference engine you can watch think. It
states its requirements honestly at the top — an ordinary laptop, no graphics card, no accounts, no
keys, no paid software — and notes that the core has no package dependencies at all, so once the
language is installed it does not even need the network.

It deliberately skips the colony, the broadcast and the operator plane, on the grounds that all three
need infrastructure and none of them is the interesting part first.

The sequence is short. Install one language runtime at the stated version. Compile, which fetches
nothing, and run the tests, which are therefore fully offline and deterministic — and, the page
notes, nobody can break your build by deleting a package. Run a demonstration described as a live
exercise of the core guarantees rather than a toy, then a benchmark that prints the real timings and
behaviour of the engine on your own machine.

Then the part the page cares about most, which it calls the pair that makes the rest of the estate
make sense. Record a run — a seeded agent, a fixed number of steps, every observation and action
written down — then verify it, which re-derives the run from the seed and compares. Then do the
interesting thing: open the file, change one number in the middle, verify again, and watch it fail.
The reasoning is stated as a principle running through everything here, that a verifier never shown
to fail is not a verifier, and that the estate's checks are tested by deliberately introducing a
defect and requiring them to go red.

Next it has you regenerate a recorded reference artifact and ask the version-control system whether
anything moved. Silence means the engine's behaviour is byte-for-byte what it was. The same pair runs
automatically, because an intended improvement and an accident produce the same difference and
somebody has to say which it was.

Finally it points at the evidence machinery and gives three directions onward: understand what you
just ran, run more of it, or try to break it — the last described as a standing request rather than a
formality.

It ends by bounding the claim. Running the demonstration tells you the engine works. It tells you
nothing about biological parity, general intelligence or human parity, and the parts needing a game
server, a licensed client, hardware and accounts are not covered here.
