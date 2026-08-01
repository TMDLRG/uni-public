/**
 * STATIC EXPORT, DELIBERATELY.
 *
 * `output: "export"` emits plain HTML/CSS/JS with no server runtime. That is not a performance
 * choice — it is what makes the site's behaviour auditable. A statically exported site cannot make
 * an undeclared server-side call, cannot read a private repo at request time, and cannot grow a
 * runtime dependency on infrastructure that is not public. What ships is what was built, and the
 * safety gate can read every byte of it before it goes anywhere.
 *
 * The estate this documents binds its released product to CPU-only, no LLM inference, no GPU, no
 * WebGL/WebGPU/Three.js, no analytics, no accounts and no hidden network calls. WHETHER THAT
 * CONTRACT BINDS A DOCUMENTATION SITE IS AN OPEN OPERATOR DECISION — it is recorded as pending. This
 * configuration adopts it anyway, as the safe default: it is far easier to relax a constraint later
 * than to discover a tracker shipped on a site that promised there were none.
 */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    // The export target has no image optimisation server, and an optimiser is a network call.
    unoptimized: true,
  },
  // No analytics, no telemetry, no third-party origins. If one is ever added it must be declared
  // here AND in the safety gate's allowlist, so the two cannot drift apart.
  poweredByHeader: false,
};

export default nextConfig;
