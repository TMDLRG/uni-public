# Writing a lens

A **lens** is a short piece of prose *about* a document, written so that someone who cannot yet read
the document can meet it anyway. There are two, over the same page:

- **Plain** — 40–220 words. Short sentences. No jargon. What is this page for, who would read it,
  and what it actually says.

  **Do not copy that phrasing.** An earlier version of this line ended "what is the one thing it
  says", and 32 of 34 cookbook lenses then opened their second paragraph with *"The one thing it
  says is…"*, while 60 of 304 began *"This is a"*. Only 85 distinct three-word openings existed
  across the whole corpus. An instruction read by many writers becomes a template unless it says
  not to be one. **Start each lens where that page actually starts.**
- **Clear** — 90–600 words. The same, plus the document's structure and its main claims.

The document itself is the **Precise** lane. You never write that. It is the repository's bytes,
rendered, and a gate re-renders it and compares byte for byte on every deploy.

This file is digested into `content/generated/lenses.json` and its sha256 is printed by the gate, so
the contract a lens was written under is recoverable later.

---

## The rules, and why each one exists

**1 · You are writing about a document, not replacing it.**
Every authored panel ships with a visible stamp saying so, and Precise is the default lane. If you
ever find yourself writing the *content* rather than an *account* of it, stop.

**2 · Introduce no number the document does not contain.**
Checked mechanically (L4). Dropping numbers is fine and expected — a Plain lens usually should. Adding
one, or rounding one, is not. A number that appears only in a summary has no receipt.

**3 · Introduce no name, file path, identifier or capitalised term the document does not contain.**
Checked mechanically (L5). This also bounds the disclosure surface: you work only from the published
body, so a lens cannot leak something the site has not already published.

**4 · Never raise the certainty.**
Checked mechanically (L6). If the document says a thing *appears* to hold, the lens may not say it
*does*. You may only use a strengthener (`proves`, `confirmed`, `established`, `always` …) if the
document uses that exact word.

**4b · Never write an abridgement.** A lens is prose *about* a document, not the document with the
numbers taken out. Measured mechanically: no more than 30% of your six-word sequences may appear
verbatim in the source. Thirteen lenses hit 31–56% on the first pass, and what an abridgement drops
to fit is always a whole sentence — which is why the dropped sentence was so often the caveat.

**4c · Keep the sentence the page cannot survive losing.** If a document carries a standing
disclosure — *"a nature citation is never a UNI gate; this chapter contains zero UNI claims and
raises no rung"*, or *"a developmental active-inference simulation, a bounded peek at a toy world,
never a person"*, or an explicit **not claimed:** fence — **your lens must carry it too**, in your own
words. This is not optional and it is checked. On the first pass, 21 of 25 nature pages dropped
theirs, and the effect was that a lens for a cited biology chapter read exactly like a lens for the
programme's own evidence. Separating those two things is the entire promise of this site.

**5 · Never drop the hedge that carries the meaning.**
Checked mechanically (L7), and it is the most important rule here. The dictionary it uses was
CORRECTED on 2026-08-01: it used to include `may`, `would`, `is not` and other ordinary English, so a
lens could delete "this is a simulation" and still pass because it happened to contain the word
"may". Seventy-five did. Every hedge word now means "not established", and nothing else. If the document describes a
**simulation**, a **reconstruction**, a **plan**, a **hypothesis**, or something **not yet** done,
your lens must say so too — ideally in the first two sentences. Plain language makes hedges feel like
clutter, and deleting them is how "a simulation of a flagellar motor" quietly becomes "a flagellar
motor". That is truth laundering, and it is the failure this whole system exists to prevent.

**6 · Do not use the forbidden words** in `forbidden.json` unless the document uses them. That list
includes `proven` and the anthropomorphism cluster (`conscious`, `alive`, `understands`, `wants` …).
A colony minimising expected free energy is not thereby aware, and the architecture explicitly
disclaims rendering awareness, experience or life.

**7 · No headings, no tables, no code blocks, no images, no links off this site.** A lens is
paragraphs. Checked mechanically (L3). Headings would also break the page's single-`<h1>` contract.

**8 · If you cannot do it honestly inside the budget, say so.** Set `review_state: draft` and write
why in `note:`. A draft lens is shown to readers *marked as unchecked*, which is the honest state.
Never pad, and never smooth over a difficulty by omitting it.

---

## Where you get the text

`node generators/build_lenses.cjs --scaffold --corpus <id>` writes one file per page with the front
matter pre-filled and **the published body inlined as a comment**. Work from that.

**Do not open the private repositories.** The lens generator has no access to `roots.local.json` and
the gate asserts it never gains any. Everything you write must be derivable from the published page,
because a lens is public prose about public bytes.

---

## What no gate can check

Whether the lens is *good*. It can pass every check above and still emphasise the wrong thing, omit
the caveat that mattered, or be fluent and hollow. Only a person who has read both can say. That is
what the review queue is for, and `review_state: reviewed` is a **claim by a named person on a named
date** — recorded, published, and never a measurement.
