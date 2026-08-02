---
lens_schema: 1
scope: wiki
key: flagellum/uni-stack-builder-plan
corpus: flagellum
source_sha256: 287fc0e01380e4d2
source_body_sha256: 287fc0e01380e4d2
source_title: UNI hierarchical stack builder - implementation plan
source_words: 13033
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

Nothing in this plan has been built. It says so on its first page and again on
its last: no test, gate, build or script was run in producing it, and the design was written by a
design-and-judge pass rather than by execution.

What it proposes is a construction kit for layered models — a thing you assemble out of typed
pieces, run, and then try to break. The shapes of the pieces are the rules: a piece measuring
surprise physically cannot enter a hole that measures energy, and there is no function anywhere
that converts between them.

One level would be built, by wrapping the existing motor code rather than rewriting it. The
levels above it would ship as names with no parameters, no numbers and no contribution to
anything, and adding them would have to leave the built level's result unchanged.

The last section is a list of things the plan explicitly does not claim, and it is the honest
place to start reading.

<!--CLEAR-->

The document opens with a scope statement it asks you to read first, and half of that statement
is negative. The proposed instrument is a repeatable construction and falsification tool for
layered models, where each level owns its own hidden state, outcomes, policies and parameters,
and passes typed messages across each seam. The existing motor loop would become the first fully
built level, migrated by wrapping rather than rewriting.

Then the disclaimers, in the same breath. It is not a claim that the full ladder of levels
exists: exactly one level is built, and the rest ship as not built, with no parameters, no
numbers and no contribution to any total. It is not a general solver, because policies are
single-step. It does not define a joint model across levels, so there is deliberately no total
free energy for the stack — the engine refuses to compute a quantity that would bound nothing.
It cannot decide in the browser whether a prediction was really made in advance. It carries no
usability evidence. And it changes no existing science: the science modules stay untouched, and
a migration of the catalogue is held to byte equality.

The middle of the document is design detail: a layered architecture with a one-directional
dependency rule, and a data model in which every artifact is content-addressed and every port
carries a kind, a dimension, a unit and a truth class. The truth class is never a settable field
but a join over inputs that returns the weakest one. There is exactly one place where the
strongest class can be minted, and it demands a matching checksum and a citation. No exported
function accepts a truth class as an argument for computed state, and that absence is itself
gated.

The engine sections give the exact equations for the belief update and for scoring each policy,
and record two corrections made during design. A precision term was removed from the likelihood
because raising the model to a power leaves it unnormalised and would stop the reported quantity
bounding what it claims to bound. And the existing implementation's scoring, which counts one
term twice, is preserved as a named legacy form with its discrepancy printed on the card, so
that correcting it later is a visible, separately reviewed change rather than a silent drift.

Authoring is done through typed forms and a palette of named bricks, plus a deliberately tiny
expression language available only in the most technical mode, with no dynamic evaluation
anywhere. Units are algebraic, so adding an informational quantity to a physical one is a typed
error with a plain-language message.

There is a full visual specification, and a section on the child path: shapes that are types,
refusal by prevention rather than by error dialogs, and an undo control at every level. Reaching
a scored claim requires the experiment apparatus, including a mandatory arm that cheats and must
win — because if it does not win, the scoring cannot detect leakage and no other arm can be
read.

The plan then lists its tests and its mutation battery, the migration rule of wrap-never-edit,
ten phases each independently shippable and reversible, and ten open questions that are the
user's to answer rather than the author's. It closes with a page of things it is not claiming.
That no usability evidence exists. That the mutation battery does not cover the space. That
several competitors have no implementation in any language. That existing adverse results
survive unchanged into the builder. And that the document itself is not verified by execution.
