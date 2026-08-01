---
lens_schema: 1
scope: wiki
key: minecraft/operator-run-sheet
corpus: minecraft
source_sha256: 3998a5e86a1d0842
source_body_sha256: 36ba86138167b319
source_title: OPERATOR RUN SHEET — you are the primary operator
source_words: 2872
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is the one page a person needs to run a live show, written to be printed. It says at the top that what is on it was tried live rather than asserted, and that where something is unproven it says so.

It begins with a single call that answers what state everything is in, and a rule never to go searching through files for that answer.

Then it lists what only the human may do, and the list is short and firm: handle the keys, choose the camera, unmute the microphone, and type the word that puts the show on air. No agent does any of those.

The rest is a cold start, a first-time setup, the shutdown path, arming the outward push, an alarm that lets the operator step away, a broadcast test, and going live.

The honest sections are the best part. A long unattended run is stated as not underwritten. A test is stated as unable to prove you are actually on the air.

<!--CLEAR-->
This is the operator's run sheet, written to be printed and used while running a live show. Its opening line says everything on it was tried live rather than asserted, that where something is unproven it says so, and it names the receipts behind it. It starts with one call that answers what state everything is in, and a rule: never go searching through files to answer a state question. It also points at a glance surface and notes that it is a native widget rather than a page.

The next section lists what only the human may do, and each row gives the reason. Typing the keys, because an agent must never handle one. Choosing the camera hardware. Unmuting the microphone, because everything boots muted by policy. Filling in the show metadata. Typing the word that puts the show on air. And ruling on one contested fence nobody else can decide.

A cold-start section gives three steps and states which surfaces come back on their own after a restart. A warning follows about never launching or force-killing the broadcast application by hand, with the consequence spelled out. Later sections cover first-time hardware setup, then an off-air, shutdown and bring-back-up path expressed entirely as buttons rather than commands to type, with three surfaces named as always-on.

A section on the keys describes a safe import: they go into a plain file the server reads directly, so an agent triggers the import but never sees the contents, and the file is deleted afterwards. A knowingly accepted risk is stated rather than hidden.

Arming the outward push is described as something to do every time, because it deliberately does not survive a restart. The page insists that this is correct fail-closed design rather than a defect, and tells the reader not to fix it by storing the passphrase.

An alarm section explains an off-monitor warning that stays silent unless you are measurably on air, names the three faults that trip it, and is careful about its limits: acknowledging it silences the sound for a while, does not clear the banner, and never disarms anything.

The broadcast test is described stage by stage with what each stage shows. Two honest notes stand out. One records that the test both passed and failed in rehearsal, and that it caught a real black scene an older check had passed, so it is no longer theatre. The other, set apart in its own box, states that the test cannot prove you are on the air at all: it measures whether something is copying the programme out of this machine, not whether any platform accepted it, so the platform's own dashboard must be checked every time.

Going live is three steps, with measured guidance on which scenes actually render and a warning not to rebuild the stage first. Two fences follow. One is a contested reading the operator must rule on, stated as display-only with no code enforcing it. The other bans a specific phrase from the air, because the number behind it has one source and no corroboration.

The staying-live section is the bluntest: a long run is stated as not underwritten, with a table of risks including a documented picture failure whose automatic recovery does not exist, a crash that drops all outward air and needs the operator's code to restore, two supervisors that disagree while on air, and the absence of any soak gate.

The final sections cover off-air and emergency actions, a symptom-to-first-move table, and the music service.
