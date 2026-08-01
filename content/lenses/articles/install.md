---
lens_schema: 1
scope: article
key: install
corpus: 
source_sha256: 8eb1abfd322a946e
source_body_sha256: 8eb1abfd322a946e
source_title: Install guide
source_words: 1471
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->

This is the prerequisite list, and its distinguishing feature is that it does not pretend the project
agrees with itself. Every version on the page is quoted from the file that declares it. Where two
files disagree, both are shown and the disagreement is named rather than smoothed over.

It opens by admitting that nothing here is centrally pinned, which is why three of the declarations
conflict. It then lists what each part needs. A language and its platform, a runtime for the
scripting parts, and an interpreter for the experiment pipeline. An older platform version for the
game, and a set of paid or platform-specific things for the studio. A container stack for one part is
listed too, and marked pending.

It gives install steps for each part in turn, and tells you to change a default password that ships
in a setup script before anything else. It ends with a plain list of what you will not be able to
install at all, because the source repositories are not public and some of the data is not
redistributed.

<!--CLEAR-->

This is the prerequisite page, and what makes it unusual is stated in its second paragraph. Every
version here is quoted from the file that declares it, and where two files disagree both are shown
and the disagreement is named rather than smoothed over. A list that resolves conflicts silently will
send you to the wrong version and give you no way to find out why.

The honest headline comes first. Nothing in the estate is centrally pinned; there is no single
version file of any of the usual kinds. That is why three declarations conflict. For the main
language, the core project and the web interface declare different floors. The newer one is right and
the older is stale but harmless, because the automated pipeline runs the newer for both — which is
precisely why it has stayed wrong. For the scripting runtime, three different figures are declared in
three places and one file declares nothing at all. For the interpreter, the pipeline pins a version
while the laboratory pins its libraries and not the interpreter itself, and a recorded audit notes
that its environment matched by luck rather than by constraint. The game needs a specific older
platform version, and the page warns that the failure will not obviously say so.

The rest is listed by what needs it. The game itself, a paid product you must own. A desktop
framework for the widget. The studio software, which must be a native install rather than a headless
one. Then a media server, a media converter on the path, a certificate tool, a shell, and a container
stack for the design that is marked pending.

Install instructions follow, part by part. The core fetches nothing. The exact ordered sequence the
automated pipeline runs is given as the sequence to copy, with a note that two of its pairs of steps
are pairs — running either half alone proves nothing. A quiet lesson is attached: that pipeline
declares which branches it runs on, and for a long time the real working branch was not among them,
so it had never run once on any commit. A green badge and a configured pipeline are different claims.

The game setup deliberately does not accept the licence for you. And before anything else, the page
tells you to change a default remote-console password that ships in the setup script. It notes that a
scan of this very site found that default published on several pages alongside another shared secret,
that both are now redacted, and that the publishing check gained a rule it did not have before.

It closes with what you will not be able to install. The source repositories are private, the private
network does not exist for you, and several absolute paths are hard-coded. The observed-experiment
reproduction needs a dataset that is not redistributed. Going live needs something nothing in the
repository can mint, and three units of the containerised design were never written.
