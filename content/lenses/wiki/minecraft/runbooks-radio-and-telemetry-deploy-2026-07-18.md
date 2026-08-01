---
lens_schema: 1
scope: wiki
key: minecraft/runbooks-radio-and-telemetry-deploy-2026-07-18
corpus: minecraft
source_sha256: 43351c98e7842001
source_body_sha256: 043f7afce329ce49
source_title: Deploy runbook — per-UNI telemetry (v1a/v1b) + cpradio session-liveness fix
source_words: 1564
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is a deployment runbook, and every stage in it is marked as not yet carried out unless a receipt says otherwise.

It exists to enforce one rule, stated at the top and given its own table: two containers look similar and are not. Restarting one costs a picture for a moment. Restarting the other destroys six living minds, because their memory lives only in temporary storage. A change to one must never imply restarting the other.

Each stage names its blast radius before its steps. Two warnings tell the reader not to run an older script that is now stale and would take the camera down, and not to copy settings from a snapshot that pins an address which has since moved.

One stage is marked destructive and out of scope for this window, with three hard preconditions including a mandatory capture of the minds before anything is removed.

A rollback table ends it, and one row says plainly that the minds do not roll back.

<!--CLEAR-->
This is a deployment runbook written by one seat for a specific window of work. Its status line is unusual and useful: every stage below is not yet carried out unless a receipt says otherwise, and the reader is told to read a whole stage before running any of it.

It names the single rule it exists to enforce. Two containers are different and have different consequences if restarted. Restarting one costs a camera and narration for the restart window. Restarting the other destroys the live minds, because their memory lives only in the container's temporary storage. A table makes that explicit, with a column for whether each holds live minds. The rule follows: a change to one must never imply a restart of the other.

The first stage touches only the observing container and adds read-only routes. It states its blast radius, gives a precondition about being off the programme, then walks through the rebuild. Two warnings sit inside it. The first says not to run an older deployment script: it describes a one-time cutover, would stop a container that no longer exists, and would create a forwarder that collides with the live one and take the camera down. A refusal guard now blocks it. The second says not to copy settings from a saved snapshot, because it pins an address for a lease that has since moved; read the live values off the running container instead.

A passage explains why the camera survives an address change, and it is careful to present this as measured rather than assumed: the forwarder targets a name and re-resolves per connection, and the timestamps show it started well before the thing it points at, yet the port serves. Existing connections still break, which is the blip, and that is why the scene must be off the programme.

A gate follows with exact checks: several routes must return successfully with a disclaimer present verbatim, a claim-fence header present, and no synthesized score, rank or percentage anywhere in the payload. One further check requires that a count did not drop, because if it did, the restart hurt something.

A plane note records a measured asymmetry: one port answers on the local network but not on the overlay, so a collector must address the name.

The second stage is marked destructive and explicitly out of the current window, because it only takes effect on a redeploy of the container that holds the minds. Three hard preconditions are listed with no exceptions: a mandatory capture of the minds committed and checked first, being off air rather than merely on a cover scene, and a separate explicit go for the destruction itself, since the earlier approval does not cover it.

A third stage fixes a liveness defect in a small service. The source is mounted read-only, so the patch is applied on the host and the container restarted, with no image rebuild and a syntax check first. Its gate is two probes far enough apart with both a passing and a refuting condition, plus a direct check that the underlying leak is gone rather than merely masked.

A mandatory follow-up warns that restarting that service strands the broadcast application on a half-open socket that looks perfectly healthy and produces nothing. The obvious remedy does not work, the one that does is given, and the note draws a seat boundary about who may perform it.

The runbook ends with a rollback table, whose middle row says plainly that the minds do not roll back, which is why the capture is mandatory rather than advisory.
