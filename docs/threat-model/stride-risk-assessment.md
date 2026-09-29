# STRIDE Threat Model and Risk Assessment

Risk scale: Likelihood (L) and Impact (I) are 1–3. Score = L × I.
1–2 Low, 3–4 Medium, 6 High, 9 Critical.

| ID | STRIDE | Application-specific threat | L | I | Score | Control / location |
|---|---|---|---:|---:|---:|---|
| T1 | Tampering | A logged-in user submits JavaScript in contribution fields and changes server-side execution flow through `eval()`. | 2 | 3 | 6 High | Typed numeric validation in `app/app/routes/contributions.js`; Semgrep rule blocks `eval(req.body...)`. |
| T2 | Tampering / Elevation | A crafted `threshold` becomes JavaScript inside MongoDB `$where`, changing the database predicate. | 2 | 3 | 6 High | Typed `$gt` query in `app/app/data/allocations-dao.js`; regression test and Semgrep. |
| T3 | Information Disclosure / Elevation | User A changes `/allocations/:userId` to another user's ID and receives another user's allocation data. | 3 | 2 | 6 High | Route derives identity from `req.session.userId` in `app/app/routes/allocations.js`; admin-only middleware protects benefits. |
| T4 | Information Disclosure | User-controlled `url` in `/research` can make the server fetch an attacker-selected destination (SSRF). | 2 | 3 | 6 High | Fixed destination and symbol allow-list in `app/app/routes/research.js`. |
| T5 | Denial of Service | Catastrophic-backtracking regex in bank-routing validation can consume excessive CPU. | 2 | 2 | 4 Medium | Bounded regex `/^[0-9]{1,20}#$/` in `app/app/routes/profile.js`. |
| T6 | Spoofing / Credential Compromise | Passwords are stored as plaintext in the baseline database; database disclosure directly reveals credentials. | 2 | 3 | 6 High | `crypto.scryptSync` password KDF in `app/app/data/user-dao.js`; seed credentials injected through environment variables. |
| T7 | Spoofing / Session | Login does not regenerate the session identifier in the baseline, enabling session-fixation scenarios. | 2 | 3 | 6 High | `req.session.regenerate()` after successful login and secure cookie flags in `app/server.js`. |
| T8 | Cross-Site Request Forgery | State-changing POST endpoints accept requests without a CSRF token in the baseline. | 2 | 2 | 4 Medium | `csurf` middleware and hidden `_csrf` fields in state-changing forms. |

### Justification

T1 and T2 have high impact because both turn ordinary form/query data into executable server-side logic. T3 is high because the affected records contain employee financial-allocation information. T4 is high because server-side requests can cross the application's network boundary. T6 and T7 affect account confidentiality and session integrity. T5 and T8 are medium because they can affect availability or request integrity but normally require a more constrained scenario.

### Threat-to-control traceability

- T1 → secure parser + Semgrep (`security/semgrep.yml`)
- T2 → typed MongoDB predicate + Semgrep
- T3 → session-derived user identity
- T4 → destination allow-list / fixed host
- T5 → bounded regular expression
- T6 → scrypt password hashes + secret injection
- T7 → session regeneration + cookie flags
- T8 → CSRF middleware + form tokens
