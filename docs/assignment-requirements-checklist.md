# Assignment Requirements Checklist

This checklist reflects the current submission package. Items marked **Team Evidence** require actual execution/capture by the student group.

| Requirement | Package support | Status |
|---|---|---|
| 2.1 Application + containerisation | NodeGoat + MongoDB, Dockerfile, Compose | Implemented |
| Architecture diagram + trust boundaries | `docs/architecture/architecture.svg` | Implemented |
| 2.2 STRIDE threat model | 8 application-specific threats + 3×3 scoring | Implemented |
| Threat-to-control mapping | `docs/threat-model/stride-risk-assessment.md` | Implemented |
| 2.3 Four vulnerabilities | RCE, NoSQL injection, IDOR, SSRF | Implemented in fixed code + baseline snapshot |
| Exploit-before evidence | Method and payloads documented | **Team Evidence** |
| Exploit-after evidence | Re-test method documented | **Team Evidence** |
| SAST before/after | Semgrep config and evidence folders | **Team Evidence** |
| 2.4 GitHub Actions | `security.yml` | Implemented |
| SAST gate | Semgrep with failing exit code | Implemented |
| Dependency scan | npm audit | Implemented |
| Secrets scan | Gitleaks | Implemented |
| Container scan | Trivy | Implemented |
| Genuine failing gate | `security-gate-demo.yml` | **Team Evidence** |
| 2.5 Secrets | environment + GitHub Secrets design | Implemented |
| Ethical clearance | template/location | **Team Evidence** |
| Source repository | repository structure ready | Team must publish |
| Technical report | `REPORT.md` + `REPORT.pdf` | Draft ready; evidence insertion required |
| Contribution statement | template | **Team Evidence** |
| AI disclosure | template | **Team Evidence** |
| Viva | `VIVA_PREPARATION.md` | Preparation ready |
