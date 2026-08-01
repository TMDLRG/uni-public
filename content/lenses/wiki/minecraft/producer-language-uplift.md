---
lens_schema: 1
scope: wiki
key: minecraft/producer-language-uplift
corpus: minecraft
source_sha256: 095185a0f7e4574e
source_body_sha256: 095185a0f7e4574e
source_title: Producer Language & Speaking Uplift — a genuinely-speaking UNI that manages the show, live
source_words: 654
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
This is an approved plan, in progress rather than finished. It describes making the narrating part of the system speak in a voice it has learned, instead of filling in authored templates.

The gap it names is honest. The narrating component already selects what to say by the same method the rest of the system uses, but the words themselves are largely written by hand. To speak in its own voice, the sentences would have to be composed from a model it learns, from a starting corpus and from the show itself, while staying tied to what it can actually see.

The ceiling is named in the same breath. Language built this way is coherent and on-topic but not fluent, and the plan says the next rung may hit a wall, which they intend to measure rather than hide.

Five phases follow, each meant to ship and be testable on its own, ending with a check that surprise falls as the corpus grows.

<!--CLEAR-->
This is a plan, marked approved and in progress, for changing how the narrating component speaks.

The context section describes what already exists: a component that directs the show by the same inference method the rest of the system uses, and that already reads free language, learning word meanings online and measuring its own surprise. It speaks today through a move-selector paired with authored, grounded clause templates in several languages whose fact slots are bound from live state, plus a question-and-answer path and a caption seam.

The gap is stated plainly. The speech is still largely authored templates rather than learned. For the component to speak in its own voice, its narration, answers and announcements would have to be composed from a language model it learns, from a seed corpus and from the show itself, while staying grounded so that facts come from live state and are never invented. The constraints are repeated: no foreign language model, falsifiable through named checks, deterministic.

The honest ceiling comes immediately after, before any of the plan. Language built this way is described as coherent, on-topic and growing with the corpus, but not fluent in the way a large model is, and the plan says the next rung of grammar and morphology is an open frontier that may hit a wall, which they intend to measure rather than conceal. It adds that the grounding constraint deliberately bounds what can be generated so that a fact is never stated that cannot be seen.

Five phases follow, each said to be independently shippable and testable. The first assembles a seed corpus and the learning loop, learning from the show's own output and persisting so language survives a restart. The second extends the model to higher-order word ordering with fall-back, and adds a simple deterministic handling of word endings so inflections generalise, with a search over candidate surfaces. The honest note repeats: short coherent clauses, not fluent paragraphs. The third introduces a component that chooses structure, binds fact slots from live state, and only then realises the surface from the learned model inside that frame, together with a new gate requiring every fact-token in an utterance to come from the state it was generated from. The fourth routes the live voice through that component with no interruption to the broadcast, changing only the voice and leaving the decision-making untouched. The fifth extends an existing proving command to show corpus size, a drop in surprise over a training pass, a readability threshold on generated speech, and the grounding check.

The verification section names what would refute it: inject a fact that is not in the state and the grounding gate should fail. A closing section on risks repeats the fluency ceiling, notes that corpus size limits fluency, and flags that learning from its own output risks an echo, with the mitigation named.
