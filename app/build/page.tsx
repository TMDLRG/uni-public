import Link from "next/link";

export const metadata = {
  title: "Build with UNI",
  description:
    "How a model is made here: declared as a card, compiled, then run. Two real builders, quoted from their own source at pinned commits, with the links to open them.",
};

/**
 * BUILD WITH UNI — how a model is made here.
 *
 * RULES THIS PAGE OBEYS:
 *
 * 1. EVERY QUOTE IS BYTES, NOT PARAPHRASE. The two builders are described by quoting their own
 *    module documentation, read out of a public tree at the commit named in the caption. The
 *    Function Designer quote was read from the public MIRROR's tree at that commit — not from the
 *    private working repository — so what the link opens is byte-for-byte what is quoted here.
 *
 * 2. A PRACTICE IS LABELLED AS DECLARED. That a review protocol is followed is a thing people do,
 *    not a thing a generator can measure. It renders with "declared" against it; what CAN be
 *    measured is its residue — the gate results and the adverse-results record — and those live
 *    on their own pages, linked, not restated here.
 *
 * 3. NOT LIVE. This is a static export. Neither builder runs inside it, and no sentence on this
 *    page claims one is running anywhere right now.
 */

const MIRROR_DESIGNER =
  "https://github.com/TMDLRG/uni-minecraft/blob/84fb968f5dba/lib/sp/brain/designer.ex";
const MIRROR_PROTOCOL =
  "https://github.com/TMDLRG/uni-minecraft/blob/84fb968f5dba/docs/LAB_PROTOCOL.md";
const WB_COMPOSE =
  "https://github.com/TMDLRG/TheORCHESTRATEActiveInferenceWorkbench/blob/c2c9c7246251c3b53354048b45fa9fab277e160b/active_inference/apps/workbench_web/lib/workbench_web/live/builder_live/compose.ex";
const WB_ROUTER =
  "https://github.com/TMDLRG/TheORCHESTRATEActiveInferenceWorkbench/blob/c2c9c7246251c3b53354048b45fa9fab277e160b/active_inference/apps/workbench_web/lib/workbench_web/router.ex";

/* Verbatim moduledoc text. Elixir heredocs strip the closing-delimiter indent, so this dedented
 * text IS the moduledoc string as the compiler sees it. Backticks are escaped for the template
 * literal only; the rendered bytes are the file's own. */
const DESIGNER_QUOTE = `The universal-builder front-end (§spec "Function Designer Card"). A **card** is a
declarative description of a function — its sensory modalities, hidden causes,
action set, preferences, precision rules and learning flags — and \`compile/1\`
turns it into a runnable \`SP.Brain.Factors\` model. This generalises the genome:
\`SP.Brain.Genome.express/1\` is now just \`compile(Genome.card(dna))\`, so the
5-modality survival agent is simply *one card*, and any new function (a nociception
reflex, a self-model, a strategic layer) is *another card* compiled the same way
and checked by the same validation gates.`;

const DESIGNER_ADEQUACY = `We test ADEQUACY (does the compiled model behave as
the card specifies?) — we never claim the card *is* the biological function.`;

const COMPOSE_QUOTE = `Three panes, left-to-right:
- Palette: draggable cards (archetypes + block types). HTML5 drag-and-drop
  from card → canvas emits \`add_node\`.
- Canvas: \`litegraph.js\` node editor mounted via the \`CompositionCanvas\`
  JS hook. Topology JSON round-trips between the hook and the server on
  every drag/connect/param edit. Clicking a node emits \`select_node\`.
- Inspector: schema-bound form for the selected node, backed by
  \`WorldModels.Spec.BlockSchema\`. Every edit is validated server-side;
  errors surface inline.

Save persists a \`WorldModels.Spec\`; Instantiate spins up a supervised
\`Jido.AgentServer\` via \`AgentPlane.Runtime.start_agent/1\` and redirects
to \`/glass/agent/:agent_id\`.`;

export default function Build() {
  return (
    <>
      <h1>Build with UNI</h1>
      <p className="lede">
        A model here is declared, compiled, then run. You write a card — what it can sense, what it
        can do, what it prefers, how sharply it weighs each sense — and a compiler turns the card
        into a runnable model whose behaviour can be checked back against what you declared. A
        card, not a checkpoint. Nothing is trained in the dark.
      </p>

      <div className="note">
        <b>Read this first.</b> This page describes two real builders. One ships inside a private
        repository whose redacted public mirror carries the file quoted below, at the commit named
        beside the quote; the other is fully public, pinned to one commit that every link here
        resolves against. Neither builder runs inside this site — this is a static export, and it
        cannot honestly claim to run anything. What it can claim: the quotes are the builders&rsquo;
        own source bytes at those commits, and the links open them. What it cannot claim: that
        either builder is running anywhere right now, or that a compiled card <i>is</i> the
        biological function it is named after — the source itself refuses that claim, in words
        quoted below. What runs here is honest description, plus the path to running the builders
        yourself in minutes.
      </div>

      <h2>The Function Designer Card</h2>
      <p>
        In the colony engine, a model begins as a declarative card. The card names the model&rsquo;s
        sensory modalities and the hidden states behind each, its action set, its preferences over
        outcomes, a precision per modality, and which parts it is allowed to learn.{" "}
        <code>compile/1</code> turns the card into a runnable factor model. The genome that
        expresses the colony&rsquo;s survival agent is not a special case: it is one card, compiled
        by the same function and checked by the same validation gates as any card you would write
        yourself. The module&rsquo;s own documentation says it more precisely:
      </p>
      <figure className="quote">
        <pre>{DESIGNER_QUOTE}</pre>
        <figcaption>
          <b>verbatim</b> — @moduledoc of <code>lib/sp/brain/designer.ex</code>, uni-minecraft
          public mirror @ 84fb968f5dba ·{" "}
          <a href={MIRROR_DESIGNER} rel="noreferrer">open the file</a>
        </figcaption>
      </figure>
      <p>
        The same moduledoc carries the boundary this estate holds everywhere, and it belongs on
        this page more than any feature does:
      </p>
      <figure className="quote">
        <pre>{DESIGNER_ADEQUACY}</pre>
        <figcaption>
          <b>verbatim</b> — same file, same commit ·{" "}
          <a href={MIRROR_DESIGNER} rel="noreferrer">open the file</a>
        </figcaption>
      </figure>
      <p className="dim">
        The working repository is private. The quotes above were read out of the public
        mirror&rsquo;s own tree at commit <code>84fb968f5dba</code>, so what the link opens is
        byte-for-byte what is printed here — not a paraphrase of something you cannot check.
      </p>

      <h2>The visual builder</h2>
      <p>
        The Workbench is the fully public half, and its Agent Builder is where the same idea gets a
        surface you can drag things onto. At the pinned commit, the builder is a LiveView mounted
        at <code>/builder/new</code> and <code>/builder/:spec_id</code>. Its own documentation
        describes the flow, and the description matches the code beneath it:
      </p>
      <figure className="quote">
        <pre>{COMPOSE_QUOTE}</pre>
        <figcaption>
          <b>verbatim</b> — @moduledoc of{" "}
          <code>active_inference/apps/workbench_web/lib/workbench_web/live/builder_live/compose.ex</code>,
          TheORCHESTRATEActiveInferenceWorkbench @ c2c9c7246251 ·{" "}
          <a href={WB_COMPOSE} rel="noreferrer">open the file</a> ·{" "}
          <a href={WB_ROUTER} rel="noreferrer">the routes</a>
        </figcaption>
      </figure>
      <p>
        In plain words: a palette of building blocks on the left, a canvas in the middle where
        dragging a block adds a node and wiring nodes builds a topology, and an inspector on the
        right whose form is bound to a schema — so a bad parameter is refused at edit time, with
        the error shown inline, rather than discovered at run time. Save persists a Spec.
        Instantiate boots a live, supervised agent server process from that Spec and sends you to
        its glass page to watch it run. The thing you drew is the thing that runs, and the glass
        page is where that claim gets tested against your own eyes.
      </p>
      <p>
        The repository is public and the run is local — no GPU, no accounts. The run instructions
        live on <Link href="/course/">the course page</Link> and are not duplicated here: a command
        printed in two places is a command that rots in one of them.
      </p>

      <h2>The discipline that binds every build</h2>
      <p>
        Any proposed addition to the engine&rsquo;s mathematics — anything that touches the free
        energy — faces an adversarial review before it becomes code. The derivation comes first,
        and the falsifier is named before the implementation is written; the review&rsquo;s default
        answer is no. What survives goes behind gates that run before merge. What fails is kept and
        published, because a record of only the wins is advertising.{" "}
        <span className="declared-note">
          declared — this is a protocol people follow, not a property a program can measure
        </span>
      </p>
      <p>
        What <i>can</i> be checked is the protocol&rsquo;s residue. The protocol itself is written
        down at <code>docs/LAB_PROTOCOL.md</code> in the same repository as the card compiler (
        <a href={MIRROR_PROTOCOL} rel="noreferrer">mirror copy @ 84fb968f5dba</a>). The gate
        registry and its results are at <Link href="/gates/">the gates page</Link>. The record of
        what was tried and lost — falsified predictions, retracted claims, defects kept on the wall
        on purpose — is at <Link href="/wrong/">the wrong page</Link>, and it is presented first in
        this estate&rsquo;s own accounting, never as a footnote.
      </p>

      <h2>What building is not, here</h2>
      <p>
        <b>No gradient descent.</b> There is no training loop to babysit and no opaque checkpoint
        to trust at the end of it. The parts of a card that learn — a likelihood, a transition —
        update by accumulating evidence, in code you can read, while the model runs.
      </p>
      <p>
        <b>No dataset scraping.</b> A card declares its own observation space; the model meets the
        world it is put into. Nothing is harvested to make one.
      </p>
      <p>
        <b>No prompt engineering.</b> There is no language model in the runtime to prompt.{" "}
        <Link href="/not-an-llm/">Not an LLM</Link> carries that claim properly, with what it does
        and does not cover.
      </p>
      <p>
        The model you build is the model you can read: the card is short enough to read whole, the
        compiler is a single module you can open at the commit quoted above, and the compiled
        structure is inspectable while it runs. That is the whole trade this estate makes — it
        gives up the reach of a trained black box to keep the right to check every claim against
        the thing itself.
      </p>

      <p className="dim">
        Want to build here rather than only read? <Link href="/contribute/">Contribute</Link> says
        how an outside builder joins and what the review will demand of the work. For the doors to
        every repository this page draws from, walk <Link href="/hall/">the hallway</Link>.
      </p>
    </>
  );
}
