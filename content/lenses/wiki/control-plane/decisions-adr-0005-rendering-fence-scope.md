---
lens_schema: 1
scope: wiki
key: control-plane/decisions-adr-0005-rendering-fence-scope
corpus: control-plane
source_sha256: 616a0907c9b49f00
source_body_sha256: 616a0907c9b49f00
source_title: ADR-0005 — The flagellum's CPU-only rendering fence does not bind the lab
source_words: 383
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

A scope error is the whole subject here, and this short dated record corrects it.

One project in this estate — the flagellum — promises that its released product stays plain: no graphics hardware, no accounts, no hidden network calls. An earlier draft of the architecture read that promise as binding on everything, and concluded that a rendered lab was forbidden.

This record says that reading was wrong. The promise governs the one artifact it names, not the whole platform. So the released flagellum product keeps its constraints, enforced by its own tests. The lab may render fully, because it is the operator's instrument rather than a published artifact. The flagellum's doorway inside the lab renders like any other doorway, while the product behind it keeps its own build rules — the doorway shows that product, it does not relax it.

The cost is stated: two rendering regimes now exist in one platform, so a contributor has to know which artifact they are touching. The falsifier is a forbidden dependency turning up in the flagellum's released build.

<!--CLEAR-->

The boundary of a rule, and nothing else, is what this short dated decision record settles.

The context: one project's contract says its released product must stay free of a named list of runtime dependencies — no graphics hardware, no accounts, no hidden network calls. An earlier draft applied that sentence to the whole platform and concluded that all biological visuals had to be flat drawings and a rendered lab was not allowed. The record calls this a scope error, and gives its reason: the sentence governs one project's released product, while the platform underneath already renders with shadows and tone mapping on real graphics hardware, and composites the broadcast path that way on purpose.

The decision scopes the fence to the artifact it names. The released flagellum product is unchanged and stays as constrained as before, enforced by its own tests. The lab view may render fully, because it is the operator's instrument on one machine rather than a published artifact. The flagellum's portal inside the lab renders like any other portal, while the product behind it keeps its own build constraints — the portal shows that product without relaxing it.

The consequences run both ways. In favour: the lab can be the immersive environment the mission asks for without weakening any published claim, and each artifact carries the fence it actually earned. Against: two rendering regimes now exist inside one platform, so a contributor has to know which artifact they are working on. The record says this is reduced by the flagellum's own build test, which fails if a forbidden runtime path enters its bundle.

Two alternatives were rejected. Applying the strict rule everywhere would forbid the lab the operator asked for, and would impose on the whole platform a constraint that exists so one published scientific product can be reproduced independently on any machine. Dropping the flagellum's fence to make everything uniform was rejected outright: that fence is a released-product commitment, and loosening it to simplify an internal tool trades evidence for convenience.

The falsifier is concrete — a graphics, network or account dependency appearing in the flagellum's released build — and the existing build test is named as the mechanical check.
