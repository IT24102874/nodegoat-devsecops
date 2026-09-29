# CI/CD Security Automation

The primary workflow is `.github/workflows/security.yml`.

Pipeline order:
1. Checkout
2. Node.js setup and dependency installation
3. Security regression tests
4. Semgrep SAST gate
5. npm audit dependency scan
6. Gitleaks secrets scan
7. Docker image build
8. Trivy image scan

The Semgrep and Trivy gates use failing exit codes rather than warnings. The optional `security-gate-demo.yml` creates a temporary unsafe JavaScript fixture and runs the same Semgrep gate. Its expected outcome is a failed job; run it manually and capture the failure for the report.

The optional `dast-zap.yml` provides an OWASP ZAP baseline scan against the running local Compose application.

The pipeline intentionally does not claim that a scan passed until the team has executed it and preserved the actual result. This prevents fabricated evidence.
