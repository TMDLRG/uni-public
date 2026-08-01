---
lens_schema: 1
scope: wiki
key: evidence/receipts-hud-glance-honesty-2026-07-17
corpus: evidence
source_sha256: 81b982932594fe9a
source_body_sha256: 81b982932594fe9a
source_title: Receipt — the HUD stops being green about things it cannot see
source_words: 1881
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A record that begins by finding the operator's complaint right for a different reason than expected. The display had not been missing; it had been running all day. What was missing was anyone looking at it, and everything on this page was found in the first twenty minutes of actually looking. The main defect is that the headline badge counted human cameras, so the flagship shot, which has no camera by design, sat on permanent green whether the world was rendering or had gone black, because the badge does not look at pixels at all.

<!--CLEAR-->
A receipt that opens with the operator's question and says he was right, though not for the reason expected. The service had been running all day with a long uptime and thousands of clean polls, and the widget was visible on screen the whole time.

What was missing was the work looking at it. An entire honesty sweep had been proven through command-line probes and isolated harnesses, while the surface an operator would actually glance at was never opened once. The page names that as the same defect being fixed everywhere else in the repository: the truth existed somewhere nobody was looking. Everything that follows was found in the first twenty minutes of looking.

Two of the agent's own claims are retracted before any fix is described, both from asserting on a partial view: one from a screenshot cut off by a scrollbar, and one from a truth table that omitted a variable. The page records four such errors in one session and says the pattern is the point.

The blocker is that the headline badge measured the wrong thing. It counted human cameras, and the flagship shot has no camera, as its own description says. So the whole broadcast computed as having neither picture nor sound, which painted the badge green, byte-identical whether the world was rendering or had died to black. Every camera-less show sat on permanent green.

One trap is described because it had already cost several attempts elsewhere. The tempting rule about which sources count as picture is wrong, since a slate and a full-screen card are picture too, and using it would fire the alarm through every standby and the whole music segment. The honest line comes from the way scenes are built: each declares its content, and chrome is appended to every scene afterwards, so content is what remains once the known chrome and the audio-only sources are removed.

A table proves the new behaviour against the real scene list, showing which cases turn from a confident green into either an ordinary tally or an alarm.

Then a regression the author shipped and the live surface caught within a minute. Keying both branches off picture made an idle studio read caution forever, which drains the meaning from a state that has always meant people up and air down. The fix restricts the change to the streaming branch only, and states the principle: a caution that is always on is not a caution.

A fence is then stated exactly, and it matters. This measures whether a picture-bearing source is enabled, not whether there are pixels. A source enabled but rendering black still reads true. A real pixel classifier exists elsewhere and is deliberately not wired in here, because sampling on every tick is a cost that needs measuring first, so having a picture stays not verified.

The residuals list several things as not verified rather than green, including a renderer with no tests at all, where the page repeats its own rule that no green claim about it is permitted until that gate exists. The provenance section records that the sweep refuted more findings than it confirmed, and that several refutations survived because the proposed fixes would have broken the false-alarm case, which is the discipline holding in both directions.
