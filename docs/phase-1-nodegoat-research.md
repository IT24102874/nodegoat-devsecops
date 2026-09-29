# Finalised NodeGoat Research and Source Audit

The original project notes stated that Git was unavailable and source access was blocked. That statement is obsolete for this submission because the uploaded project ZIP already contained the NodeGoat source tree.

The verified application is Node.js/Express + MongoDB, with the web service listening on port 4000. The source audit identified the security-relevant route and DAO handlers documented in `docs/source-audit.md`.

The four primary assignment vulnerabilities selected for exploit-and-fix evidence are:
1. server-side JavaScript injection through `eval()` in contributions;
2. MongoDB `$where` injection in allocations;
3. IDOR/BOLA in allocation access;
4. SSRF in research.

Additional hardening addresses password storage, session fixation, CSRF, session cookies, security headers, secrets and ReDoS.

The exact vulnerable source files are preserved under `evidence/baseline-source/` for controlled before/after comparison.
