---
lens_schema: 1
scope: wiki
key: evidence/receipts-overlay-gate-scene-aware-2026-07-19
corpus: evidence
source_sha256: d186a143ef381080
source_body_sha256: d186a143ef381080
source_title: Receipt — the overlay gate is scene-aware (stops crying wolf on music scenes)
source_words: 599
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A record of a check that failed while nothing was actually wrong. It demanded the same four overlays on every scene, but the stage deliberately puts different chrome on different scenes, so a music scene made it cry wolf while the show was on air. Worse, the advice it printed would have rebuilt every scene and cut the live programme. The fix has the expectation derived from the module that builds the scenes, so the two cannot drift apart. The page is careful to say the check was corrected rather than loosened, and it rehearses the failure in both directions.

<!--CLEAR-->
A receipt about a check that was wrong while the system was right, which the page argues is worse than having no check at all. It teaches the operator to ignore the check, and in this case the remedy it suggested was destructive.

The defect is small and clear. One hard-coded list of expected overlays was asserted against whatever scene happened to be on air, but the stage deliberately drops duplicate chrome on music scenes, gives one scene only its slate, and gives another a bespoke set. So on air the check reported a missing source and advised rebuilding the stage, which would have rebuilt every scene and cut the programme to a different one mid-show.

The fix moves the expectation into the module that builds the scenes, so that the two cannot drift. That module now reports the expected set for a given scene, derived from what it actually built, and excludes items it deliberately creates dark. An unknown scene returns nothing and the check fails honestly rather than passing by accident. Overlays that are on but not declared for the scene are reported as a note rather than a failure, and the page explains why they are surfaced at all: a stale overlay bleeding onto a music scene is a defect this project has shipped before.

One safety detail is called load-bearing and earns it. The module being imported for its policy also ran its live-mutating half at import time, ending by switching the programme scene. Importing it would have cut the show. It is now behind the smallest possible guard, and the receipt records the programme scene before and after the import to show the guard is inert.

The proof lists the resolved set per scene type, shows the previously failing case now passing, and notes that a real capture replaced a near-blank one. The failure is then rehearsed in both directions on the live programme, disabling an overlay to get a red result and re-enabling it to get a green one, with the air unaffected throughout. The closing scope is explicit: every property checked before is still checked, only now against the set the scene declares.
