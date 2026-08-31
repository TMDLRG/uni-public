import Link from "next/link";
import university from "../../content/generated/university.json";

export const metadata = {
  title: "Contribute",
  description:
    "How to contribute to the UNI estate: the public repositories, the redacted live mirrors updated by promotion, the honesty contract every change enters, and what stays with the operator.",
};

/**
 * CONTRIBUTE — the open co-op.
 *
 * TWO RULES THIS PAGE OBEYS:
 *
 * 1. MIRROR STATE IS READ FROM THE GENERATED MANIFEST, NEVER TYPED. Which repositories are public,
 *    which are mirrors, when each mirror was updated and measured — all of it renders from the same
 *    generated file the hallway renders from. A typed date on a contribution page is a promise that
 *    starts rotting the day it is written.
 *
 * 2. THE LIST BELOW IS CURATED, NOT AN ENUMERATION, AND SAYS SO. These are the repositories that
 *    take contributions. The full inventory of projects — including the ones with no public
 *    repository at all — is the hallway, and this page points there rather than implying
 *    completeness it does not have.
 */

type Mirror = {
  kind: "mirror" | "frozen-snapshot";
  repo: string;
  url: string;
  updated?: string;
  tracks_commit?: string;
  mirror_commit?: string;
  measured_on?: string;
};

type Project = {
  id: string;
  title: string;
  one_line: string;
  citation: {
    visibility: "public" | "private";
    resolvable: boolean;
    public_url?: string;
    mirror?: Mirror | null;
  };
};

const data = university as unknown as {
  read_at: string;
  projects: Project[];
};

/**
 * The curated order and the editorial half of each door: what a first contribution looks like.
 * The measured half (title, one-liner, mirror state) comes from the generated manifest.
 */
const CONTRIB: { id: string; first: string }[] = [
  {
    id: "uni-public",
    first:
      "This site. MIT-licensed, Next.js, statically exported, every page generated. A good first contribution: a broken link, a sentence that says less than it seems to, a page whose plain-language reading path uses a term it never taught. Fix the generator or the source — never the rendered number.",
  },
  {
    id: "workbench",
    first:
      "MIT-licensed and developed fully in the open: the active-inference engine, the curriculum, and the browser learning labs. A good first contribution: a lab fix, a module doc that mis-states the equation it implements, or a chapter result you tried to reproduce and could not — written up as a report.",
  },
  {
    id: "uni-minecraft",
    first:
      "A good first contribution: run what the mirror tree claims runs and report where the claim and the run part company. A test that passes for the wrong reason is a finding too.",
  },
  {
    id: "uni-flagellum",
    first:
      "The science instrument. The single most valuable thing a stranger can do here is attempt a reproduction and report the failure precisely: which command, which commit, what was expected, what happened instead. A reproduction that fails is not a complaint — it is the product working.",
  },
  {
    id: "uni-cookbook",
    first:
      "A cookbook of buildable recipes. A recipe that does not build as written is a defect in the book, not in the reader. A good first contribution: follow one recipe to the letter and report every place it assumes something it never stated.",
  },
];

function Door({ p, first }: { p: Project; first: string }) {
  const c = p.citation;
  const href = c.resolvable ? c.public_url : c.mirror?.url;
  return (
    <article className="project-door">
      <header>
        <h3>{href ? <a href={href} rel="noreferrer">{p.title}</a> : p.title}</h3>
      </header>
      <p>{p.one_line}</p>
      <p className="dim">{first}</p>
      <div className="cite">
        {c.resolvable ? (
          <>
            The working repository itself is public —{" "}
            <a href={c.public_url} rel="noreferrer">open it</a>. What you clone is what the
            operator works in.
          </>
        ) : c.mirror && c.mirror.kind === "mirror" ? (
          <>
            The working repository is private. A redacted{" "}
            <a href={c.mirror.url} rel="noreferrer">live mirror</a> is public, updated{" "}
            {c.mirror.updated}: it tracks the private repository by promotion, one commit per
            promotion, each recording the private commit it came from, and every promotion is
            merged by a person through a pull request. Contributions are made against the mirror.{" "}
            <span className="dim">(mirror state measured {c.mirror.measured_on})</span>
          </>
        ) : (
          <span className="unresolved">
            No public repository or live mirror was recorded for this project in the generated
            manifest at build time, so no contribution link is offered — a link this page cannot
            stand behind is worse than none.
          </span>
        )}
      </div>
    </article>
  );
}

export default function Contribute() {
  const doors = CONTRIB.map(({ id, first }) => ({
    id,
    first,
    project: data.projects.find((p) => p.id === id),
  }));
  const missing = doors.filter((d) => !d.project);

  return (
    <>
      <h1>Contribute</h1>
      <p className="lede">
        This estate is built in the open — code, gates, failures and all — and contribution is a
        pull request away. Nothing lands here any other way, including the operator&rsquo;s own
        work.
      </p>

      <div className="note">
        <b>What contribution genuinely is here — limits first.</b> Several of the working
        repositories are private: client work and unpublished science live in them. What
        is public for those projects is a <b>redacted live mirror</b>, updated by promotion: one
        commit per promotion, each recording the private commit it came from, and every promotion
        merged by a person through a pull request. So a contributor works against the mirror
        exactly as the operator works against the live sites — pull requests are how{" "}
        <i>everything</i> lands here. This page can tell you where the repositories are, how a
        change lands, and which acts stay with the operator. It cannot promise a review deadline:
        this is a co-op with one named responsible human, not a staffed help desk. Mirror states
        below were read from the generated manifest at build time, not probed live.
      </div>

      <section>
        <h2>Where to start</h2>
        <div className="project-doors">
          {doors.map(({ id, first, project }) =>
            project ? <Door key={id} p={project} first={first} /> : null
          )}
        </div>
        {missing.length > 0 && (
          <p className="unresolved">
            Listed for contribution but not present in the generated manifest at build time:{" "}
            {missing.map((m) => m.id).join(", ")}. Printed rather than dropped — a quietly
            shortened list is how an inventory starts lying.
          </p>
        )}
        <p className="dim">
          This list is curated to the repositories that take contributions; it is not the whole
          estate. The full inventory — including the projects with no public repository at all,
          and the stated reason for each — is <Link href="/hall/">the hallway</Link>.
        </p>
        <p>
          The Workbench carries its own contributor contract in the repository:{" "}
          <a
            href="https://github.com/TMDLRG/TheORCHESTRATEActiveInferenceWorkbench/blob/c2c9c7246251c3b53354048b45fa9fab277e160b/CONTRIBUTING.md"
            rel="noreferrer"
          >
            CONTRIBUTING.md
          </a>{" "}
          <span className="dim">(quoted at pinned commit c2c9c724)</span>. Its closing line is the
          register of the whole estate: <i>&ldquo;If a rule seems to conflict with a legitimate
          use case, raise the question in the PR rather than working around it. The rules exist
          because the maintainers have been bitten by the alternative.&rdquo;</i> It also asks
          that documentation borrow a three-word verification vocabulary — <code>verified</code>{" "}
          (backed by a passing end-to-end test), <code>scaffolded</code> (compiles, no end-to-end
          test yet), <code>uncertain</code> (known gap or open question) — so a claim always says
          which of the three it is.
        </p>
      </section>

      <section>
        <h2>The contract a contribution enters</h2>
        <div className="card">
          <p>
            Short enough to quote, and every clause is enforced somewhere rather than aspired to:
          </p>
          <ul>
            <li>
              Only source-pinned recorded measurements may be labelled <i>observed</i>. A
              reconstruction, a simulation, a model output — none of these is ever relabelled.
            </li>
            <li>
              Adverse results are published, never buried. A failed reproduction, a falsified
              prediction, a gate that fails — these lead, they do not footnote.
            </li>
            <li>
              A claim ships with its falsifier: the observation that would kill it, named before
              the evidence is looked at.
            </li>
            <li>
              Gates must pass — and a pull request that weakens a test in order to pass is
              rejected on principle. Softening the instrument is worse than failing it.
            </li>
          </ul>
          <p className="dim">
            The estate&rsquo;s record of its own failures is kept deliberately public at{" "}
            <Link href="/wrong/">what went wrong</Link>, and the gates that enforce the contract
            are inventoried at <Link href="/gates/">the gates</Link>.
          </p>
        </div>
      </section>

      <section>
        <h2>How this site itself takes edits</h2>
        <p>
          Every volatile number on these pages is generated from the repository it describes and
          carries the commit it was read at. So the fix for a wrong number is never an edit to the
          rendered page: fix the generator, or fix the source it reads, and rebuild. A number typed
          into a page is a claim with a half-life — this estate once measured one at 176 seconds
          (2026-07-29), which is why the rule is absolute.
        </p>
        <p>
          Before any pull request, run <code>npm run gate</code>. It verifies the generator chain,
          the coverage manifest, provenance, and public consistency — and its publish-safety pass
          scans every emitted byte for private machine paths and credential-shaped strings, so a
          leak fails the build before it can ship. How the site is put together is documented at{" "}
          <Link href="/build/">how it is built</Link>, and what it deliberately is not is at{" "}
          <Link href="/not-an-llm/">not an LLM</Link>.
        </p>
      </section>

      <section>
        <h2>Teaching contributions</h2>
        <p>
          The teaching surfaces take contributions that are not code fixes:
        </p>
        <ul>
          <li>
            <b>New labs.</b> A lab is a self-contained single-file HTML page — no build step, no
            network after load, every vendored dependency byte-verified against a pinned hash. See{" "}
            <Link href="/labs/">the labs</Link> for the shape a lab takes.
          </li>
          <li>
            <b>Lens prose.</b> The plain-language and clear reading paths of a page are written by
            hand and reviewed by a human, not machine-paraphrased. Improving one is a contribution;
            so is reporting a place where a lens says less than the precise text it stands in for.
          </li>
          <li>
            <b>Translations.</b> Course sessions can be translated. A translation is reviewed as
            prose, not accepted as a mechanical substitution — see{" "}
            <Link href="/course/">the course</Link> for the sessions as they stand.
          </li>
        </ul>
      </section>

      <section>
        <h2>What is not open to contribution, and why</h2>
        <div className="card">
          <p>
            <b>The private working repositories.</b> Client work and unpublished science live in
            them, and no amount of goodwill makes it safe to open them wholesale. What is safe to
            publish is promoted to the mirrors, commit by commit, by a person — that boundary is
            the contribution model, not an obstacle to it.
          </p>
          <p>
            <b>The operator&rsquo;s sign-off acts.</b> Verdicts on scientific claims, publications,
            and the small class of repairs the contract reserves to a human are his and stay his.
            This is a co-op with a named responsible human at the centre, and the estate&rsquo;s
            whole discipline depends on that boundary staying visible: an agent or a contributor
            can prepare everything up to the signature, and the signature is not transferable.
          </p>
          <p className="dim">
            To see what that boundary protects, walk <Link href="/hall/">the hallway</Link>, try{" "}
            <Link href="/labs/">the labs</Link>, read <Link href="/course/">the course</Link> —
            and read <Link href="/wrong/">what went wrong</Link>, because the failures are the
            best argument this page has that the rest is told straight.
          </p>
        </div>
      </section>
    </>
  );
}
