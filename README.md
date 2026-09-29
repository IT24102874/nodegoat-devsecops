# IE3142 DevSecOps — OWASP NodeGoat

This repository is a submission-oriented DevSecOps implementation around OWASP NodeGoat for the BSc (Hons) in Information Technology, IE3142 DevOps Security, Year 3 Semester 1 2026.

## What is included

- Remediated NodeGoat Node.js/Express application
- MongoDB runtime component
- Root-level `docker-compose.yml`
- Hardened Dockerfile
- STRIDE threat model and 3×3 risk assessment
- Four exploit-and-fix cases with baseline source snapshots
- Security regression tests
- GitHub Actions SAST, dependency, secrets and container gates
- Manual security-gate failure demonstration
- Optional OWASP ZAP DAST workflow
- Secrets-management documentation
- Technical report draft (`REPORT.md`)
- Viva preparation and contribution/AI disclosure templates

## Local setup

1. Copy `.env.example` to `.env` and replace all placeholders with strong values.
2. Run:

```bash
docker compose up --build
```

3. Browse to `http://127.0.0.1:4000`.

The Compose file requires `SESSION_SECRET`, `SEED_ADMIN_PASSWORD`, `SEED_USER1_PASSWORD` and `SEED_USER2_PASSWORD`. Real values are intentionally not stored in this repository.

## Security checks

From the repository root:

```bash
node --check app/server.js
cd app
npm install --legacy-peer-deps
npm run security:test
cd ..
```

If Semgrep, Gitleaks and Trivy are installed locally, run the same checks used by CI and save their genuine outputs under `security-results/`.

## Before/after evidence

`evidence/baseline-source/` preserves the vulnerable source snapshot supplied with the original project. It is for comparison only. The final `app/` directory is the remediated runtime.

See:
- `docs/vulnerabilities/exploit-and-fix.md`
- `docs/evidence/evidence-matrix.md`

The package does not fabricate screenshots or scanner counts. The group must generate and insert genuine evidence after running the baseline and fixed environments.

## CI/CD

The mandatory workflow is `.github/workflows/security.yml`:

1. regression/security tests
2. Semgrep SAST
3. npm audit
4. Gitleaks
5. Docker build
6. Trivy

`.github/workflows/security-gate-demo.yml` is manually triggered and intentionally fails after creating a temporary vulnerable fixture, providing evidence that the SAST gate genuinely blocks a bad build.

`.github/workflows/dast-zap.yml` is an optional DAST workflow.

## Report

The technical report draft is `REPORT.md` and is approximately 1,860 words before appendices/evidence. Export it to PDF after inserting the team's genuine screenshots, scan results, names, student IDs, repository URL and signatures.

## Safety and ethics

All security testing must be limited to the local, authorized NodeGoat lab. Never use these exploit procedures against public or third-party systems.
