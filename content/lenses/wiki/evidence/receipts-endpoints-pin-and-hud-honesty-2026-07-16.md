---
lens_schema: 1
scope: wiki
key: evidence/receipts-endpoints-pin-and-hud-honesty-2026-07-16
corpus: evidence
source_sha256: bc4372e43e55cad7
source_body_sha256: bc4372e43e55cad7
source_title: Endpoints PIN-unlock + preset dropdown + HUD honesty fixes (2026-07-16)
source_words: 681
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A record of several related changes made after a genuine lockout. The passphrase protecting the stored stream keys had been set in an earlier session and never written down, and the encryption has no back door by design. So the dead store was reset, and a short unlock code was added that wraps the real passphrase, so nobody has to retype it. A dropdown of platform presets was added, and three places where a display claimed things were fine without enough evidence were changed to fail closed instead. One gap is stated plainly: a button was never actually clicked by a person in a test, so the risk there is not yet zero.

<!--CLEAR-->
A receipt — the file recording what was run — with a pass verdict and a stated evidence class. The reason for the work is a real lockout. The passphrase protecting an encrypted store of stream keys had been set once and never durably recorded, and the encryption has no back door by design.

Several things shipped. First a short unlock code, kept in its own file with its own derived secret, that wraps the same passphrase. Setting it needs the real passphrase once, and after that the short code alone reconstructs it. The tradeoff is stated as an owner-accepted risk rather than hidden: a short code is a weaker bar, accepted because a leaked stream key risks a channel being hijacked and rotated, never data being exposed.

Then routes to set, clear and use that code, including one that unlocks and starts the fan-out in a single step, and one that stops it with no code required at all, because stopping should always be one click. The status now reports whether processes are genuinely running rather than inferring it from having been unlocked. Going live in public stays a separate action with a typed confirmation, untouched by any of this.

The console gains an editable dropdown of platform presets, limited to platforms with a stable, publicly documented address, with anything that varies per account deliberately left out rather than guessed at.

The honesty fixes are three instances of one shape: claiming things are fine on insufficient evidence. One accepted a weaker signal as evidence of being up, and now requires the stronger one that the project's own rule names. The others defaulted a missing safety flag to true, and now fail closed, matching how neighbouring flags already behaved.

The receipts are live rather than described. A wrong code is cleanly refused, and the right one unlocks and starts both destinations, with the keys still masked in the reply. The stop actually kills the processes, rather than reporting that it had. One gap is then stated in full. A button click was not driven by an automated test, because the tool that would do it cannot attach to that window. The page argues the wiring is the same pattern as many working siblings in the same file, and that the request it builds was checked against the server test. It then says the residual risk is low but not zero until a person clicks it once for real. The test store was deleted afterwards, so the operator starts from blank rather than from a fixture.
