# Source Audit

## Verified stack

- Node.js / Express web application
- MongoDB database
- Swig HTML templates
- `express-session` sessions
- `body-parser` request parsing
- Docker Compose for web + MongoDB

## Security-relevant observations

| Area | Baseline observation | Remediation |
|---|---|---|
| Code execution | `eval(req.body.preTax)` etc. | Strict decimal parsing |
| NoSQL injection | `$where` expression concatenated `threshold` | Typed `$gt` query |
| Access control | Allocation user ID came from URL | Session-derived identity |
| SSRF | Client supplied destination URL | Fixed destination + symbol allow-list |
| Passwords | Plaintext password field | scrypt hash + salt |
| Session fixation | Session ID not regenerated after login | `req.session.regenerate()` |
| Session cookie | Weak defaults | HttpOnly, SameSite, secure-in-production, expiry |
| CSRF | Middleware disabled | `csurf` + form tokens |
| Security headers | Helmet disabled | Helmet enabled |
| ReDoS | Nested quantifiers in bank-routing regex | Bounded linear regex |
| Secrets | Cookie secret hardcoded | Environment variable |
| Admin authorization | Benefits routes lacked `isAdmin` | Admin middleware restored |

## Important baseline note

NodeGoat intentionally contains vulnerable examples in its tutorial pages. Those tutorial snippets are educational content and are excluded from the project SAST rule where appropriate. They are not runtime application handlers.

The final runtime code is the remediated version. Before/after evidence must be captured from a separate baseline checkout or from the original source snapshot supplied with this assignment package.
