# Evidence Matrix

| Assignment requirement | Evidence to collect | Submission path | Status |
|---|---|---|---|
| Architecture | Diagram + component/data-flow description | `docs/architecture/` | Ready |
| STRIDE + risk | 8 threats, 3x3 score, controls | `docs/threat-model/stride-risk-assessment.md` | Ready |
| Four exploit/fix cases | Before/after screenshots + request/response notes | `evidence/runtime/` | **Team must capture** |
| SAST | Baseline and fixed scan output | `security-results/sast/` | **Run tool locally/CI** |
| Dependency scan | npm audit output | `security-results/dependency/` | **Run tool locally/CI** |
| Secrets scan | Gitleaks output | `security-results/secrets/` | **Run tool locally/CI** |
| Container scan | Trivy output | `security-results/container/` | **Run tool locally/CI** |
| Blocking gate | Failed GitHub Actions run from `security-gate-demo.yml` | `evidence/pipeline/` | **Run workflow + screenshot** |
| Green pipeline | Clean push/PR run | `evidence/pipeline/` | **Run workflow + screenshot** |
| Secrets management | `.env.example`, compose env injection, GitHub Secrets instructions | `docs/secrets-management.md` | Ready |
| Ethical clearance | Signed form | `submission/ethical-clearance/` | **Team must complete/sign** |
| Contributions | Names/roles/signatures | `submission/contribution-statement.md` | **Team must complete** |
| AI disclosure | Honest tool/purpose disclosure | `submission/ai-usage.md` | Ready |
