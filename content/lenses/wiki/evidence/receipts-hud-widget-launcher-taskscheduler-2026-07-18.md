---
lens_schema: 1
scope: wiki
key: evidence/receipts-hud-widget-launcher-taskscheduler-2026-07-18
corpus: evidence
source_sha256: 38aff0db2bdc00bd
source_body_sha256: 38aff0db2bdc00bd
source_title: Receipt — HUD widget launch: compiled service + native Task Scheduler (no script, no fragility)
source_words: 877
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A record of why an on-screen panel kept vanishing after a restart, and the fix. A background service was trying to launch a window into the logged-in operator's session by hand, which needs fragile permission surgery, and the child process died within seconds every time. The fix stops doing that by hand and asks the part of the operating system that already owns that plumbing to launch it instead. Two layers of supervision now exist, one fast and one native. Surviving a restart is honestly still pending, because the install happened after the last one.

<!--CLEAR-->
A receipt for replacing a fragile mechanism with a native one. The symptom was a panel missing from the screen after a restart. The cause was a background service spawning a window process into the operator's session itself, which requires granting rights on the window station and desktop to a duplicated token, and that surgery breaks on remote reconnects, user switching and updates. The log line from the last time it failed is quoted: the launch reports a valid process, which is then gone within two seconds.

The fix is framed as accepting a rule of the operating system rather than working around it. A service runs in an isolated session and cannot draw a window in the operator's session, so the window process has to run in the user session, and the only real question is who launches it. The answer is to let the scheduler service, which already owns that plumbing correctly, perform the spawn. That is why launching this way cannot produce the old failure, and the page names other products that work the same way.

The architecture is drawn out: two services registered with the system, one of which registers a scheduled task and re-triggers it whenever the panel is missing, and the task itself triggered at logon with its own restart-on-failure. That gives two supervision legs, one fast and one native, and either alone brings the panel back. A named lock makes a double fire a harmless no-op. One discipline point is called out: the supervising service runs as a machine identity, and the task runs as the operator through an interactive token, so no password is stored anywhere and no service is tied to a person's account.

The files section reads as much as a deletion list as an addition list, and one script is retired behind a refuse-to-run guard rather than left lying around. A stale sentence describing the old mechanism on another surface was corrected at the same time.

The proof is live. The install is checked by state rather than by its own log. The previously open question, whether a machine identity can register and run a task as the interactive user with no password, is answered by doing it. The panel survives where it used to die. And a supervision test kills the process and watches it return within a few seconds through the fast leg rather than the slow one.

The closing residual is honest. The install happened after the last restart, so restart survival has not been observed. The relevant check reports not yet and exits non-zero, that gate stays pending, and the page notes it cannot be passed by a manual restart.
