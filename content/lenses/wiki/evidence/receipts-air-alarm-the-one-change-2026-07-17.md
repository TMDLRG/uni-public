---
lens_schema: 1
scope: wiki
key: evidence/receipts-air-alarm-the-one-change-2026-07-17
corpus: evidence
source_sha256: fa3776f6e9ce75a5
source_body_sha256: fa3776f6e9ce75a5
source_title: Receipt — THE ONE CHANGE: the off-monitor air alarm
source_words: 765
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A record of building the one thing that reaches a person who is not looking at the screen. Everything before it assumed somebody was reading pixels, so if the broadcast went dark while the operator stepped away, they would learn about it from a viewer. This adds an alarm that arms only on a measured live state, never goes quiet just because it lost sight, and fires on three measured conditions with a sound, a banner that cannot be scrolled away, and a flashing taskbar. Its gate was registered as pending before the change was made. It only raises the alarm. It never cuts, never stops anything, and never acknowledges a condition that is not firing.

<!--CLEAR-->
A receipt for one change — the file recording what was run and what came out — and the page argues it is the change separating being able to go live from being able to stay live. Every earlier receipt ended on the same standing item: nothing in the studio reaches a person who is not reading pixels, and a black picture kills no process and opens no dialog.

The design splits the decision from the annunciation. The decision lives in a pure engine with unit tests; the widget owns the noise and the banner, because the background service cannot show anything in the operator's own session. The arming rule is the careful part. It arms on the first fresh, measured signal that the broadcast is live, and disarms only on a fresh, measured signal that it is not. It never disarms on a stale or unknown reading, because an alarm that goes quiet when it loses sight fails in the dangerous direction. Losing sight is itself one of the firing conditions.

Three conditions fire, each a measured fact with a guard against crying wolf. One requires the condition to hold for a dwell period, and deliberately does not fire when the reading is absent rather than zero, because a blip is silence and not a siren. Another is restricted to the branch that means a platform is refusing while the ingest is publishing, and excludes the branch that is normal in the window before the operator types the confirmation. The third is blindness itself.

Acknowledging is deliberately weak. It silences one code's sound for a while, re-arms if the condition clears and recurs, and never clears the badge, never stops the fan-out, never cuts, and never acknowledges a code that is not firing.

The proof has three parts. The engine's tests are listed by name, and the false-alarm ones are called the load-bearing cases. A deliberate regression that would let a blip fire was caught by exactly the test written for it, then restored. The wiring was exercised on the real widget against a mock serving a live-but-nobody-pulling snapshot, and after the dwell the banner, the sound, the flashing and the tray message all appeared, then went quiet when the real state returned.

Then a crash the author introduced and found the hard way. A value that was present but null threw inside a timer tick and took the whole widget down. The observation is the sharp one: the surface that exists to say when something is wrong must never be the thing that dies. It was fixed at source across every numeric read and given a backstop so that a future fault is logged and the next tick retries. The closing fence — the limit on what is claimed — names two things that are not verified. One is annunciation during a genuine broadcast. The other is that one of the three codes is an inference about the far end rather than a measurement of it.
