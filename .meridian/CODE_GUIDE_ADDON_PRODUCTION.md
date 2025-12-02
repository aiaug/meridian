<CODE_GUIDE_ADDON_PRODUCTION>
> ⚠️ **READ BASELINE FIRST**
> This add-on strengthens `CODE_GUIDE.md` for production systems.
> Rules here tighten and extend the Baseline.

## Interpretation
- **Strengthen**: Make the baseline rule stricter.
- **Add**: New requirement that supplements baseline.
- **Require justification**: Allow exceptions only with documented rationale.

---

## Frontend

### TypeScript
- **Strengthen**: Enable additional strict flags; treat warnings as errors in CI.

### Server Components
- **Strengthen**: Default to server; require justification for client components; document runtime choice per route.

### Server Actions
- **Strengthen**: Schema validation mandatory; return typed domain results.

### Data Flow
- **Strengthen**: Establish per-route caching strategy; document invalidation triggers.

### Security
- **Strengthen**: Configure strict CSP; use sanitizers for any user-generated HTML.

### Auth Tokens
- **Strengthen**: httpOnly cookies only; short-lived tokens; prohibit tokens in client storage.

### Assets
- **Strengthen**: Optimized image formats; responsive sizes; font subsetting.

### Uploads
- **Add**: Malware scanning; resumable uploads; robust error handling.

### Error UX
- **Add**: Standardized error pages with correlation IDs and support paths.

---

## Backend

### TypeScript
- **Strengthen**: Strict mode with additional safety flags; CI treats warnings as errors.

### Config
- **Strengthen**: Environment validation must pass before start; exit on invalid config.

### Logging
- **Strengthen**: Structured logs with correlation fields; redact sensitive data by default.

### Rate Limiting
- **Strengthen**: Implement proper rate limiting per IP/user/endpoint; return `Retry-After`.

### Resilience
- **Add**: Outbound timeouts, retries with backoff, circuit breakers; classify dependencies by criticality.

### Auth
- **Strengthen**: If using JWTs, implement token rotation and revocation; consider device binding.

### Tenant Isolation
- **Strengthen**: Enforce at database layer (e.g., row-level policies) in addition to application checks.

### Database
- **Strengthen**: Online schema changes for zero-downtime; strict indexing discipline; bounded transaction retries.

### Idempotency
- **Add**: Require idempotency keys for unsafe POST endpoints; retain keys for reasonable duration.

### Caching
- **Strengthen**: Stampede prevention; explicit invalidation paths; jittered TTLs.

### Background Work
- **Strengthen**: Separate workers from API; DLQs mandatory; observable retry policies.

### Webhooks
- **Strengthen**: Per-destination secrets; timestamp tolerance; replay protection.

### Observability
- **Add**: Distributed tracing; RED/USE dashboards; SLOs with alerts.

### Query Safety
- **Strengthen**: Limit query depth/complexity; bound filters and aggregations.

### Data Lifecycle
- **Add**: Implement retention/purge policies in code; make purge jobs idempotent.

### Build
- **Strengthen**: Minimal container images; pinned base images; vulnerability scanning in CI.
</CODE_GUIDE_ADDON_PRODUCTION>
