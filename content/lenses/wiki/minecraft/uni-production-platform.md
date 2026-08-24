---
lens_schema: 1
scope: wiki
key: minecraft/uni-production-platform
corpus: minecraft
source_sha256: 38faf370e35f21fa
source_body_sha256: 6e90a685a42fb767
source_title: UNI Production Platform — end-to-end live broadcast on UNI.OS
source_words: 4129
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 2026-08-24 the source moved. One sentence now names a different bring-up script. This lens names no script and its account is unchanged, so only the digests are re-stamped.
---
<!--PLAIN-->
This is a complete design for a live broadcast platform, and it is careful to say that it is a design. Nothing in it is deployed, and every sentence of the form the platform will do something is marked as a proposal rather than a statement of fact.

It carries two later notes that correct it. One voids several sections outright, because an approach was tried and failed: running the mixer as a container on a machine with no graphics chip renders the picture black. The mixer moved back to where it worked, and the remaining container's role shrank to relaying. The other records that part of the design was later deployed, and that one port number in the design turned out to be occupied by something else.

The honest footer is the best part. It lists open gaps by name, each with a status, including one safety-critical property described as unproven until a logged red-team run exists.

<!--CLEAR-->
This is the master design document for a live broadcast platform, and its evidence posture is stated before any architecture. It is a design, and nothing in it is deployed. Foundation claims are graded by how they were observed, and every sentence about what the platform will do is a proposal with a pending status rather than a statement of current fact.

Two later notes correct the body. The first voids several sections outright and explains why: running the mixer as a container on a machine without a graphics chip renders its picture black in software. The mixer therefore returned to a machine where it worked, and the remaining container's role collapsed to copying one encode outward to two platforms. It names which decisions are unchanged so the correction does not read as wholesale abandonment. The second note updates the posture again, recording that part of the design was in fact later deployed, and correcting one port number, because the port the design named turned out to be occupied by a different service.

The mission section states why the platform exists in terms far larger than the engineering. The operating picture then describes the intended experience: one person mixing a broadcast-grade show by voice or text, with an assistant running the gallery underneath, and remote guests joining through a page, a green room and then the air.

A foundation section lists what is already working and asks that it not be relitigated, with the central pattern being one external show-runner cueing a mixer set up once, and the encoder carrying a single feed.

The body of the design fixes decisions rather than surveying options. One section is devoted to the single constraint that shapes everything, which is where the encoder runs. Then a container and service map is given as a fixed contract, so that every later artifact uses the same names and ports. Seven technology decisions each carry a justification with a fuller decision record elsewhere. A schema for the graphics state is fixed, as is the verb set an assistant may drive the show with. Further sections cover sources, guests, several languages and a scheduler; run-of-show templates and roles; the operator's control surface; a phased roadmap; constraints; and what each part of the resulting tree holds.

The honest footer is where the document earns trust. It restates that anything unbuilt is a proposal, dates the foundation observations, and gives the rule that a composite health indicator takes the colour of its weakest part rather than averaging. It repeats the evidence classes, and marks two claims as security-relevant and unproven until captured runs close them. A live-appliance safety rule says the business stack is observed only and never a mutation target, with every mutating action routed through a human gate the producer cannot pass for itself.

It then lists the open gaps by name, each with a status. There is no hardware encoding on the appliance, and a forbidden fallback that would stress a production stack. A safety-critical self-approval property stays unproven until a logged red-team run. Caption latency and quality are unmeasured, and no music asset is cleared. There is a mismatch between the shape of most existing content and a broadcast frame, and an open question about whether a particular content library exists at all. Naming those gaps, with statuses rather than intentions, is what keeps the ambition upstream of the claims.
