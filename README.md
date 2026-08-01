# Universal Natural Intelligence — public documentation

The public technical documentation of the UNI estate: an active-inference research programme spanning
a bacterial flagellar-motor laboratory, a colony of agents living in a Minecraft world, a producer
that broadcasts them, and a scientific control plane built to stop any of it claiming more than it has
measured.

**Live at [universalnaturalintelligence.com](https://universalnaturalintelligence.com).**

---

## The one rule this site is built on

**Every volatile number here is generated from the repository it describes, and carries the commit it
was read from.** Nothing is typed by hand and left to rot.

That rule was learned the hard way. The estate's governing documents once carried six wrong numbers
simultaneously, and one of them — a gate tally — was false 176 seconds after it was written. The
response was to stop writing numbers and start generating them.

## What is here

| | |
|---|---|
| **Articles** | Six written explanations of the system. The only authored pages on the site. |
| **Wiki** | 300+ documents from the estate's repositories, rendered as they are written. |
| **Gates** | The registered executable checks, each with its own statement of the defect it exists for. |
| **Evidence** | Receipts, pre-registrations and adversarial review verdicts — including one that came back FAIL. |
| **What is not here** | Every document withheld, with the category of the reason and its sha256. |

## Three things worth knowing before you read

**1. Citations name a real file at a real commit — and today none of them can be opened.** The source
repositories are not public yet, so every citation says so on its face. A citation you cannot follow
is an appeal to authority; marking it is the difference between documentation and a brochure. When a
source repo is published, one field changes in `generators/sources.json` and the same citations become
permalinks with no content change.

**2. Some pages carry redactions, and they are visible.** Where a document was publishable except for
a private address or an internal hostname, the value is replaced by `[redacted: category]` and the
page banners the count. Past a threshold the document is refused instead — a page held together by
redaction markers reads as though it says something while the load-bearing parts are gone. The sha256
shown on each page is of the **original**, so what was ingested stays checkable.

**3. Adverse results are published, not omitted.** Failing gates, blocked work, known limitations and
the things that are simply not established all appear here. Every article ends with a section saying
what it does *not* claim. That is the load-bearing part, not modesty.

## Building it

```bash
npm ci
npx next build      # → out/
```

**`npx next build`, not `npm run build`.** The `build` script also runs the content generators, and
those read the estate's **private** repositories. They cannot run here and they are not meant to: the
generated content in `content/generated/` is committed precisely so this site builds from this
repository alone, with no access to anything private. That property is verified by cloning this repo
into an empty directory and building it — which is how each release is rehearsed.

## The safety gate

```bash
node safety/verify_publish_safe.cjs --prove
```

Nothing ships until this passes, and it fails closed. It checks the working tree, **every reachable
blob in git history** (deleting a file does not unpublish it), and **the exported site** — that last
one because `out/` is gitignored, so a tracked-file check alone would inspect zero bytes of what
actually ships.

It will not run here as-is, and that is deliberate. Its list of denied values lives in
`safety/patterns.local.json`, which is gitignored and never leaves the private control workspace —
because **a denylist in a public repo publishes the denylist**, which would make this file a
machine-readable index of exactly what is being protected. Without it the gate **fails** rather than
falling back to structural checks only: a gate that quietly drops its teeth emits a green tick that
means nothing.

### What the gate cannot do

It cannot recognise sensitive **narrative**. Prose describing something confidential, naming nobody
and matching no pattern, passes every check in it. That is not hypothetical — a large archive
elsewhere in this estate had its credentials verified perfectly redacted while its narrative content
was the actual exposure. Human review of new prose is required and nothing here replaces it. The gate
prints this limitation on every run.

## Licence

MIT. See [LICENSE](LICENSE).

Third-party research media referenced by the estate carries its own licence and attribution, recorded
per asset with DOI and sha256 rather than assumed.
