"use client";

import { useCallback, useEffect, useState } from "react";
import { runChecks, type Check } from "./checks";

// Runs on load and on demand. If the browser cannot run the checks (no WebCrypto outside a secure
// page, or a file failed to load) the panel says NOT CHECKED: an unrun check is never shown as a pass.

type State = { status: "running" | "done" | "cannot"; checks: Check[]; error?: string };

export default function ScienceChecks({ manifestSha256, base }: { manifestSha256: string; base: string }) {
  const [state, setState] = useState<State>({ status: "running", checks: [] });

  const run = useCallback(async () => {
    if (typeof crypto === "undefined" || !crypto.subtle) {
      setState({ status: "cannot", checks: [], error: "this browser offers no WebCrypto here (it needs a secure https page)" });
      return;
    }
    setState({ status: "running", checks: [] });
    try {
      const get = async (f: string) => {
        const r = await fetch(`${base}${f}`, { cache: "no-store" });
        if (!r.ok) throw new Error(`${f}: HTTP ${r.status}`);
        return r.arrayBuffer();
      };
      setState({ status: "done", checks: await runChecks(get, manifestSha256) });
    } catch (e) {
      setState({ status: "cannot", checks: [], error: (e as Error).message });
    }
  }, [base, manifestSha256]);

  useEffect(() => {
    void run();
  }, [run]);

  const passed = state.checks.filter((c) => c.ok).length;
  const total = state.checks.length;
  const groups = [...new Set(state.checks.map((c) => c.group))];

  return (
    <div aria-live="polite">
      {state.status === "running" && <p className="dim">Checking in your browser…</p>}
      {state.status === "cannot" && (
        <p className="note">
          <b>NOT CHECKED.</b> The checks could not run: {state.error}. Nothing on this page has been verified by your browser.
        </p>
      )}
      {state.status === "done" && (
        <>
          <p>
            <span className={`pill ${passed === total ? "ok" : "bad"}`}>{passed === total ? "ALL PASS" : "FAIL"}</span>{" "}
            <b>
              {passed} of {total}
            </b>{" "}
            checks passed in your browser, just now.{" "}
            <button type="button" onClick={() => void run()} className="mono" style={{ cursor: "pointer" }}>
              run again
            </button>
          </p>
          {groups.map((g) => {
            const cs = state.checks.filter((c) => c.group === g);
            const ok = cs.filter((c) => c.ok).length;
            return (
              <details key={g} open={ok !== cs.length}>
                <summary>
                  {g}: {ok} of {cs.length}
                </summary>
                <table>
                  <tbody>
                    {cs.map((c, i) => (
                      <tr key={i}>
                        <td>
                          <span className={`pill ${c.ok ? "ok" : "bad"}`}>{c.ok ? "PASS" : "FAIL"}</span>
                        </td>
                        <td>{c.name}</td>
                        <td className="mono">{c.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            );
          })}
        </>
      )}
    </div>
  );
}
