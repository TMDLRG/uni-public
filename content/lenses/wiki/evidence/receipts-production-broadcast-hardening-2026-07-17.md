---
lens_schema: 1
scope: wiki
key: evidence/receipts-production-broadcast-hardening-2026-07-17
corpus: evidence
source_sha256: f05e23597f7718ae
source_body_sha256: f05e23597f7718ae
source_title: Receipt — production broadcast hardening (live incident 2026-07-17)
source_words: 570
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A record written during a live broadcast that was going wrong: cameras black, microphone not carrying, a web source blank. Four faults were found, and each got both an immediate fix on air and a durable change in code. Two of them were the same class, where a source that hiccups is never re-initialised when the scene cuts to it, so it stays black while everything upstream looks healthy. One was a scene that had no microphone in it by design, which turned out to be the wrong design for a live show. The page also lists what could not be checked while on air.

<!--CLEAR-->
An incident record written while the show was on, so it reads as triage rather than as a tidy report. Four findings, each with what was done immediately and what was changed permanently.

The first and the last are the same class. A video source that gets into a connected-but-not-decoding state is never refreshed when a scene cuts to it, so it renders black even though everything upstream is healthy and the source reports itself as active. The setting that would re-initialise it on activation was off. It was switched on live for the affected sources, and then baked into the stage definitions, including for the browser-based helpers.

The second is a design decision that was wrong for the situation. Several full-screen scenes were defined without a host microphone at all, on the rule that full-screen content is music-bed only and that talking over it needs a different variant. The operator cut to one of those scenes, spoke, and was not heard. The microphone was added to those scenes live and then in the definitions, with a note that whether it is live is a mixer policy rather than a matter of scene composition.

The third is subtler. The embedded browser silently refuses a self-signed certificate and offers no way to click through as an ordinary browser does, so a page that worked in the operator's own browser rendered as a blank error page. The durable fix pulls the local root certificate from the live connection and installs it into the user's own trust store, which needs no elevation and is run at every bring-up.

The last section is the honest one. Three things are listed as not fully checked: the certificate fix takes effect only the next time the browser process starts; whether the talk-over audio actually reaches the platforms needs the operator to speak and watch; and a mute indicator in one interface may still be showing a stale state, which the page calls cosmetic while naming which reading is the truth on air.
