---
lens_schema: 1
scope: wiki
key: evidence/receipts-endpoints-import-2026-07-17
corpus: evidence
source_sha256: 01f2624f61b29f27
source_body_sha256: 01f2624f61b29f27
source_title: Receipt — the safe import: keys go from your file to the encrypted store, the agent never sees them
source_words: 509
authored_by: claude-opus-5
authored_at: 2026-08-01
review_state: draft
reviewed_by: 
reviewed_at: 
note: 
---
<!--PLAIN-->
A record of a small route built for one specific reason: the agent should be able to trigger an import of streaming keys without ever being able to see them. The keys sit in a file on the operator's own machine. The server reads that file itself, encrypts the contents, and replies with nothing but masked names and a count. The page states what would count as failure, which is any plain key in the reply or in the stored file, and then shows the test with fake keys, searches that come back empty, and a second attempt with the wrong passphrase being refused.

<!--CLEAR-->
A receipt for a route, with an unusually clear statement of why it exists. Passing keys through the agent by copy and paste was the wrong workaround. Refusing to hold keys was right, but a refusal on its own left the operator with a step that could be missed. This route is the durable answer: the agent triggers the import, and the keys travel only between a local file and the server.

The mechanics are short. A request carrying no secret asks the server to read a named file from the operator's own machine, encrypt it straight into an encrypted store, optionally wrap the unlock code, and return only masked names and counts. The route carries the same header every other console request does, as a cross-site fence. The expected file format is shown, with comments and blank lines allowed, and a line telling the operator to delete the file once it has been imported.

The pass and falsify conditions are stated separately and are mirror images of each other. It passes if the reply carries only masked keys, the store on disk is ciphertext, and no key value appears anywhere the agent could see. It fails if a plain key appears in the reply, if a plain key appears in the store, or if the route ever accepts the passphrase in the request body, since that would route the secret through the agent after all.

The proof uses deliberately fake keys with recognisable markers, a rehearsal passphrase and a throwaway unlock code. The reply is quoted, the searches for those markers come back empty in both the reply and the encrypted files on disk, and a second import with a different passphrase is refused with the original bytes left intact. The cleanup is recorded too: the store was checked to hold only the fake values before it was deleted, and the machine was left with nothing stored, ready for the operator's real import.
