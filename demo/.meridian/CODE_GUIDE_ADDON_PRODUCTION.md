&lt;CODE_GUIDE_ADDON_PRODUCTION&gt;
> ⚠️ IMPORTANT — READ BASELINE FIRST  
> This file is an **add-on** to `CODE_GUIDE.md`.  
> It does **not** replace the Baseline and is **not** a complete code guide.  
> Before reading or applying any rule in this add-on, you **must** first read  
> and load the Baseline guide at `.meridian/CODE_GUIDE.md`.  
>
> If you have not read the Baseline yet, stop and read it now before continuing.

Agent Instructions (READ ME FIRST)

- Purpose: This add-on strengthens the Baseline for robust, secure, scalable production systems.
- Precedence: If any rule here conflicts with the Baseline, follow this add-on.
- Non-destructive: Keep all Baseline rules; this file tightens and extends them.
- Security posture: Prefer stricter defaults; require explicit justification to opt out.
- Interpretation:
  • “Strengthen”: Make the Baseline rule stricter and enforce in CI/review.
  • “Add”: New requirements that supplement the Baseline.
  • “Require justification”: Allow exceptions only with a documented rationale.

FRONTEND — Production add-on

1) Strengthen TypeScript: enable `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noImplicitOverride`; treat warnings as errors in CI.
2) Strengthen Server Components: default to server; require justification for client components; document Edge vs Node runtime per route.
3) Strengthen Server Actions: schema validation mandatory; return typed domain results; forbid `any` and non-null assertions.
4) Strengthen Suspense/streaming: establish a per-route strategy; stream above-the-fold; prevent waterfalls.
5) Add Design system: enforce a single system with tokens; no ad-hoc colors; CSS variables for themes; dark mode required if user-facing.
6) Strengthen Accessibility: automated checks (axe) in CI plus manual keyboard review on key flows.
7) Add Performance budgets: enforce page-level budgets (bundle size, LCP, INP, CLS) in CI and block regressions.
8) Strengthen Security: strict CSP with nonces/hashes; COOP/COEP where needed; SRI for third-party; `dangerouslySetInnerHTML` only through a sanitizer.
9) Strengthen Auth tokens: httpOnly cookies only; short-lived tokens; prohibit tokens in client storage and logs.
10) Strengthen Third-party scripts: consent-gated; script budget; remove low-value trackers.
11) Add i18n pipeline: ICU messages, extraction, translation linting; RTL/readability checks where relevant.
12) Strengthen Caching: documented `revalidate`/tags per route; formal invalidation triggers; stale-while-revalidate where suitable.
13) Strengthen Assets: AVIF/WebP with responsive sizes; only hero images use `priority`; subset and self-host fonts.
14) Strengthen Uploads: malware scanning, resumable/chunked uploads, robust error handling.
15) Add Error UX: standardized error pages with correlation IDs and support paths.
16) Add Visual regression: Percy/Chromatic (or equivalent) on critical surfaces pre-release.

BACKEND — Production add-on

17) Strengthen TypeScript: strict + `exactOptionalPropertyTypes` + `noUncheckedIndexedAccess`; CI treats warnings as errors.
18) Strengthen Config: environment validation must pass before start; process exits on invalid config.
19) Strengthen Logging: structured logs with correlation fields; redact by default; stable error code enums.
20) Strengthen Rate limiting: sliding window/token bucket per IP/user/API key/route; return `Retry-After`.
21) Strengthen Resilience: outbound timeouts, retries with jittered backoff, circuit breakers, bulkheads; classify dependencies by criticality.
22) Strengthen Auth: prefer sessions; if JWTs, rotate refresh tokens and maintain a revoke list; device binding if available.
23) Strengthen Tenant isolation: enforce at DB layer (e.g., row-level policies) in addition to application checks.
24) Strengthen Data layer: reviewed migrations; online schema changes; transactions with bounded retries; strict indexing discipline.
25) Add Idempotency: require idempotency keys for unsafe POSTs; retain keys ≥24h.
26) Strengthen Cache discipline: stampede prevention (single-flight), jittered TTLs, explicit invalidation paths.
27) Strengthen Background work: separate workers from API; DLQs mandatory; replay tooling; observable retry policies.
28) Strengthen Webhooks: per-destination secrets, timestamp tolerance, replay protection; exponential backoff with caps.
29) Add Observability: OpenTelemetry traces/metrics/logs; RED/USE dashboards; SLOs with paging alerts.
30) Strengthen Event-loop safety: forbid CPU-heavy ops on the event loop; use worker threads/queues; size pools via config.
31) Strengthen Payload policy: per-endpoint body size caps; `content-type` allowlists; sanitize filenames/paths; validate uploads.
32) Add Crypto: AES-GCM/ChaCha20-Poly1305; Argon2id/Bcrypt for passwords; key management/rotation via KMS/Secret Manager.
33) Add Identifier policy: ULIDs/UUIDs externally; never expose sequential IDs.
34) Strengthen Query safety: limit query depth/complexity (GraphQL) and filter/aggregation bounds (REST/RPC); pagination caps.
35) Add Data lifecycle: retention/purge implemented in code; purge jobs idempotent and observable.
36) Add Multi-region: region-local reads, write pinning, graceful failover; document consistency.
37) Strengthen Export/import: streaming with throttling; audit logging; privacy filtering; rate-limited.
38) Add Build hardening: distroless/minimal images; pinned bases; SBOM and vuln scanning in CI.
39) Add Release safety: canary/blue-green deploys; feature flags with kill-switch; instant rollback; migration runbooks.
40) Add API deprecation: sunset headers, usage metrics, and timed removals with prior notice.
&lt;/CODE_GUIDE_ADDON_PRODUCTION&gt;