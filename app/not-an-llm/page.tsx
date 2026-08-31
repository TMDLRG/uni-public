import Link from "next/link";

export const metadata = {
  title: "Not an LLM",
  description:
    "What separates these models from a large language model, with its evidence — and the claim of outperforming LLMs that this estate cannot make, stated first.",
};

/**
 * NOT AN LLM — the differentiator, honestly bounded.
 *
 * THE ONE RULE THIS PAGE OBEYS ABOVE ALL OTHERS: the claim "UNI models outperform LLMs" is
 * UNSUPPORTED by any recorded benchmark in this estate. No test against a real LLM exists
 * anywhere in it. The only head-to-head on record (SIGNUM LAB, run 2026-07-04) pitted active
 * inference against an opponent whose own docstring says "It is a toy benchmark, not an LLM" —
 * and in that same benchmark a plain Markov baseline beat active inference on surprise and
 * estimated energy in every world. So the note at the top says all of that plainly and first,
 * and everything below it is the narrower case the evidence actually carries: an architectural
 * difference you can read, run, and falsify at home.
 *
 * NUMBERS ON THIS PAGE. Nothing here is a live count of the estate, so nothing is imported from
 * a generated feed: every number is a recorded result quoted from a dated run or a pinned
 * commit, and each carries its date or commit inline, per the truth contract. If SIGNUM is ever
 * re-run, these paragraphs must be re-quoted, not silently edited — they cite a record, not a
 * state.
 *
 * DRAWN DIFFERENTLY. Recorded results render in the measured list with their date beside them.
 * A document's claim about itself (the neutrality clause, a moduledoc) renders as a quotation
 * and is named as a declaration. SIGNUM has no public repository, so its numbers carry the
 * unresolved treatment rather than a link that would 404.
 */

const MC = "https://github.com/TMDLRG/uni-minecraft/blob/84fb968f5dba";

export default function NotAnLLM() {
  return (
    <>
      <h1>Not an LLM</h1>
      <p className="lede">
        Every model in this estate is a declared generative model inverted by exact inference —
        mathematics you can read, in code with zero dependencies, with falsifiers you can run.
        That makes it a different kind of object from a large language model. It is not a claim
        to be a better one.
      </p>

      <div className="note">
        <b>What this page cannot claim, first.</b> “These models outperform LLMs” is unsupported
        by any recorded benchmark in this estate. No test against a real LLM exists anywhere in
        it. The one head-to-head on record was run against a tiny CPU self-attention model whose
        own docstring reads{" "}
        <i>{"It is a toy benchmark, not an LLM"}</i> — and in that same benchmark a plain Markov
        baseline beat the active-inference model on surprise and estimated energy in every
        world, with every world’s official efficiency verdict{" "}
        <i>inconclusive</i>. What this page can claim is narrower and checkable: these models
        are built differently — exact inference over a declared model of a world, every belief
        inspectable at every step, no scraped corpus, no gradient descent, CPU-only — and each
        of those properties has a falsifier, not a footnote.
      </div>

      <h2>What these models are</h2>
      <p>
        A large language model is a very large function fitted to text by gradient descent. The
        models here are the older, smaller, stricter thing: a <b>generative model</b> — declared
        states, declared transitions, declared emissions — inverted by <b>exact inference</b>,
        so that every intermediate belief is a number you can print and check. The language rung
        describes itself; this is its module documentation, quoted verbatim:
      </p>
      <div className="prose">
        <blockquote>
          <p>
            {`UNI LANGUAGE — rung 5: a DEEPER generative model of speech than the flat n-gram. A meaning-conditioned discrete LATENT-STATE sequence model (an HMM over word tokens): a hidden state sequence z₁..z_T generates the words, with learned initial π, transitions A (K×K), and emissions B (state → word). Same active-inference family as the agents' brains and the visual cortex — a generative model inverted by EXACT inference (log-space forward–backward), its parameters learned by Baum–Welch EM (Dirichlet-conjugate); free energy = −log p(text).`}
          </p>
          <p>
            {`Why deeper than the n-gram: the latent states cluster words into reusable "modes" and carry sequence structure through the transition matrix, so generation is decoded from a learned latent TRAJECTORY, not a memoryless surface walk. Pure Elixir — no neural net, no LLM. Honest ceiling: still a finite-state model (richer than a trigram, not human-fluent); it learns toward its ceiling as the corpus grows — so quality is now bounded by TRAINING, not by missing capacity.`}
          </p>
        </blockquote>
      </div>
      <div className="cite">
        <code>lib/sp/brain/language.ex</code> lines 2–15, uni-minecraft —{" "}
        <a href={`${MC}/lib/sp/brain/language.ex`} rel="noreferrer">
          open the file in the public mirror
        </a>{" "}
        at commit <code>84fb968f5dba</code>. The same file declares the learning metric in its
        API docs: <i>{`free energy − the falsifiable learning metric: −log p(text | meaning) under the fitted HMM`}</i>{" "}
        (line 70).
      </div>
      <p>
        Notice what that quotation does that a model card rarely does: it states its own
        ceiling. <i>{`richer than a trigram, not human-fluent`}</i> is the sentence a sales page
        would delete. It is kept because the corpus is the lever and the ceiling is the truth.
      </p>
      <p>
        The <i>no LLM</i> sentence is not prose you are asked to trust — it is enforced. The
        falsification register for the colony states the claim as{" "}
        <i>{`It is NOT a mimic — no LLM, no foreign mind, no network`}</i>, and gives the
        procedure for breaking it: add <code>Nx</code>, a NIF, <code>System.cmd</code>,{" "}
        <code>Port.open</code>, or any HTTP client to a brain module and{" "}
        <i>{`gates 14/18 turn FAIL and the build breaks`}</i> —{" "}
        <i>{`There are zero hex deps, so there is no library an LLM could hide in.`}</i> There is
        also a runnable prover, not a document: a mix task that prints{" "}
        <i>{`NOT A MIMIC — no LLM, no foreign mind, no network`}</i> and{" "}
        <i>{`zero dependencies (deps = [])`}</i> by checking, not by asserting.
      </p>
      <div className="cite">
        <code>docs/FALSIFICATION.md</code> lines 19–25 and{" "}
        <code>lib/mix/tasks/sp.uni.prove.ex</code> lines 48–53, uni-minecraft — open{" "}
        <a href={`${MC}/docs/FALSIFICATION.md`} rel="noreferrer">the register</a> and{" "}
        <a href={`${MC}/lib/mix/tasks/sp.uni.prove.ex`} rel="noreferrer">the prover</a> in the
        public mirror at commit <code>84fb968f5dba</code>.
      </div>

      <h2>The one head-to-head that exists</h2>
      <p>
        There is exactly one recorded benchmark in this estate that puts an active-inference
        predictor against a transformer-style one: SIGNUM LAB, a CPU-only, local-first
        benchmark over controlled symbolic worlds. Its design neutrality is a declaration in its
        own README, quoted verbatim:
      </p>
      <div className="prose">
        <blockquote>
          <p>
            {`SIGNUM LAB is a CPU-only, local-first science lab and observation deck for testing whether Transformer-style next-symbol prediction and Active Inference-style belief updating differ meaningfully in accuracy, surprise, calibration, adaptation, energy, latency, memory, interpretability, and signal distortion under controlled symbolic worlds. The system is deliberately neutral. It is designed so the Transformer, Active Inference, Markov, or Bayesian baseline can win.`}
          </p>
        </blockquote>
      </div>
      <p>
        Its falsification plan opens with{" "}
        <i>{`SIGNUM LAB must make it easy to falsify the founder's belief`}</i> — listing{" "}
        <i>{`Transformer wins on accuracy`}</i> and{" "}
        <i>{`Markov or Bayesian baseline wins both accuracy and cost`}</i> as named failure
        modes — and closes with{" "}
        <i>{`Report it plainly. Do not weaken the gate after seeing results.`}</i> The lab was
        run on 2026-07-04: 96 runs — 8 worlds × 4 models × 3 seeds × 1,000 steps — written to a
        105-record tamper-evident ledger (Merkle root <code>dd78be304895dda1…</code>) and
        replay-verified, with every metric check passing and zero records appended after the
        fact.
      </p>
      <p>
        <b>The results cut both ways, and the adverse direction comes first.</b> The plain
        Markov baseline — the simplest model in the lab — beat active inference on surprise in
        all 8 worlds and on estimated energy in all 8 worlds. On accuracy, the official verdict
        in every world is a tie: Markov, the Bayesian baseline and active inference are
        indistinguishable, and in the <code>hidden_state</code> world active inference’s mean
        actually sits a hair below the other two. And every world’s official efficiency status
        is <i>inconclusive</i>, in the report’s own words:{" "}
        <i>{`Energy evidence is estimated or too uncertain to decide an efficiency winner.`}</i>
      </p>
      <p>
        In the other direction: active inference beat the transformer-style opponent on both
        accuracy and surprise in all 8 worlds.
      </p>
      <dl className="measured">
        <div>
          <dt>Recorded</dt>
          <dd>2026-07-04 · seeds 1–3 · 1,000 steps per run · 96 runs · replay-verified ledger</dd>
        </div>
        <div>
          <dt>Adverse: surprise</dt>
          <dd>
            Markov beat active inference in 8 of 8 worlds — e.g. <code>periodic</code> mean NLL
            0.00736 (Markov) vs 0.01703 (active inference)
          </dd>
        </div>
        <div>
          <dt>Adverse: energy</dt>
          <dd>
            Markov ≈0.18–0.26 J estimated vs active inference ≈1.31–1.75 J estimated, in 8 of 8
            worlds — estimated, not measured at the wall
          </dd>
        </div>
        <div>
          <dt>Accuracy verdict</dt>
          <dd>
            tie in 8 of 8 worlds; <code>hidden_state</code> means 0.76733 (active inference) vs
            0.76767 (Markov and Bayesian)
          </dd>
        </div>
        <div>
          <dt>Efficiency verdict</dt>
          <dd>inconclusive in 8 of 8 worlds — the lab’s own status, unedited</dd>
        </div>
        <div>
          <dt>Vs transformer</dt>
          <dd>
            active inference won accuracy and surprise in 8 of 8 worlds — e.g.{" "}
            <code>multi_step</code> mean accuracy 0.998 vs 0.346
          </dd>
        </div>
      </dl>
      <p>
        Now the bounding, without which the row above would be marketing. The transformer
        opponent describes itself:{" "}
        <i>{`Tiny CPU-only Transformer-style next-symbol predictor. This model is intentionally tiny: token embeddings, single-head causal self-attention, and an online softmax head. It is a toy benchmark, not an LLM.`}</i>{" "}
        No pre-training corpus, an embedding dimension of 16, a context of 8 symbols. Beating it
        says nothing about beating a frontier model, and this estate has never tested against
        one. The active-inference side bounds itself the same way:{" "}
        <i>{`engineering model inspired by discrete POMDP active inference, not a claim that this is a complete biological active inference implementation`}</i>. And the report’s own limit
        line stands: <i>{`this is local controlled-world evidence. Estimated energy is not direct watt measurement.`}</i>
      </p>
      <p className="dim">
        Two more caveats the record itself carries. Only 3 seeds were run, where the lab’s own
        hostile-skeptic checklist calls for 30 or more, and its README says to treat the
        existing bundles as smoke evidence unless regenerated for the specific claim being made.
        And — worth saying on this page of all pages — the lab’s bootstrap package was generated
        and pre-verified by an external LLM assistant. The models under test contain no LLM; the
        tooling that scaffolded the lab used one. The estate’s contract permits exactly that
        split: development agents may use their own tools, and those tools may not become
        undeclared runtime dependencies.
      </p>
      <div className="cite">
        <span className="unresolved">
          SIGNUM LAB currently has no public repository, so none of the above can be linked.
          The quotations and numbers are cited from its recorded run of 2026-07-04 — README,
          benchmark spec, falsification plan, multi-run report and replay report, under the
          105-record ledger named above — a private record, and this page says so rather than
          offering a link that would 404.
        </span>
      </div>

      <h2>What an LLM does better</h2>
      <p>
        Said without flinching: a real LLM is better at breadth, at language fluency, and at
        general knowledge — not marginally, categorically. The estate’s own documents say so
        about their own language stack: the reader module calls itself{" "}
        <i>{`bag-of-words / topic-grade understanding`}</i>, and the falsification register
        rates generation <i>{`bigram/topic-grade — short, on-topic, not fluent`}</i>. Nobody
        here has claimed otherwise in any document this site could find, and this page will not
        start.
      </p>
      <p>
        What those LLM advantages cost is the other half of the sentence. The weights are
        opaque: there is no step at which you can print the belief and check it. There is no
        explicit generative model of a <b>world</b> — there is a model of text about worlds,
        which is a different object with different failure modes. And there is no falsifier you
        can run at home: you cannot re-derive a frontier model’s answer from declared equations,
        and you cannot break its claims with a mix task. Here, the equations are the product.
        Which trade you want depends entirely on what you are buying: fluency, or an inference
        you can audit.
      </p>

      <h2>Do not collapse, do not short-cycle</h2>
      <p>
        The estate’s standard is that an answer is not accepted at first plausibility; it must
        survive its falsifier. This page is itself an application of that standard. The
        first-plausibility sentence — <i>our models already outperform LLMs</i> — was checked
        against every recorded benchmark in the estate and did not survive: the opponent was a
        toy, the Markov baseline won the efficiency direction, and the verdicts read
        inconclusive. What survived is what you have just read.
      </p>
      <p>
        The proof that the standard is enforced rather than admired is{" "}
        <Link href="/wrong/">the page of what is wrong</Link> — failures kept on the wall,
        dated, in their own words. You can watch exact inference run in{" "}
        <Link href="/labs/">the labs</Link>, and learn to do it yourself in{" "}
        <Link href="/course/">the course</Link>. A small number of other groups are building
        active inference commercially; the mathematics is published and belongs to no one.
      </p>
      <p className="dim">
        The wider estate these models live in is on <Link href="/hall/">the hallway</Link>, and
        the gates that hold every claim here to its evidence are on{" "}
        <Link href="/gates/">the gates page</Link>.
      </p>
    </>
  );
}
