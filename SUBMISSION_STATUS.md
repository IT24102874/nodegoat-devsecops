# Submission Status

## Implemented in this package
- NodeGoat source audit and four primary remediation paths
- Dockerfile + root Docker Compose
- STRIDE threat model and risk assessment
- Security regression tests
- Semgrep, npm audit, Gitleaks and Trivy GitHub Actions gates
- Intentional failing-gate demonstration workflow
- Optional ZAP DAST workflow
- Environment/GitHub-secret based secret handling
- Technical report draft and PDF
- Baseline source snapshot for controlled before/after comparison

## Must be completed by the group before final Courseweb submission
1. Complete and sign Ethical Clearance Form.
2. Fill in four member names, student IDs, roles and signatures.
3. Publish the repository and add the actual URL to the report.
4. Create a local `.env` with non-committed secrets.
5. Run the vulnerable baseline in an isolated local lab and capture four before screenshots.
6. Run the fixed application and capture four after screenshots.
7. Run Semgrep before/after and record actual finding counts.
8. Run npm audit, Gitleaks and Trivy and preserve actual outputs.
9. Run `Security Gate Demonstration` in GitHub Actions and capture the failed job.
10. Run the normal security workflow on the fixed repository and capture the successful run.
11. Insert genuine evidence into `REPORT.md`/`REPORT.pdf` and keep the report within the 1800–2500-word requirement excluding appendices.
12. Review every code/document change and prepare each member for the viva.

No scanner result or screenshot in this package is presented as already executed unless it was actually generated.
