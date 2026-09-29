# Archived planning document

This file records an earlier planning stage. The current implementation and evidence status are documented in `README.md`, `REPORT.md`, `docs/assignment-requirements-checklist.md` and `docs/evidence/evidence-matrix.md`.

---

# DevSecOps Pipeline Implementation Plan

## Project Overview
**Assignment**: IE3142 DevOps Security - Building and Securing a DevSecOps Pipeline
**Application**: OWASP NodeGoat (Intentionally Vulnerable Node.js Application)
**Team Size**: 4 members
**Timeline**: 10 weeks (recommended)

## Implementation Phases

### PHASE 1: Source Audit and Requirements Analysis ✅ (IN PROGRESS)
**Status**: BLOCKED - Git not available on current system

**Objectives**:
- [x] Create assignment requirements checklist
- [x] Research OWASP NodeGoat application
- [x] Identify known vulnerabilities
- [ ] Clone and audit NodeGoat source code
- [ ] Document technology stack and components
- [ ] Identify security-relevant files
- [ ] Discover actual vulnerabilities (target: 4 total)
- [ ] Create source audit documentation

**Known Vulnerability Identified**:
- VUL-01: RCE via eval() in app/routes/contributions.js (CWE-94, OWASP A03:2021)

**Blocker**: Git not installed - cannot clone repository for detailed audit

**Deliverables**:
- [x] docs/assignment-requirements-checklist.md
- [x] docs/phase-1-prerequisites.md
- [x] docs/phase-1-nodegoat-research.md
- [x] docs/source-audit-template.md
- [ ] docs/source-audit.md (COMPLETED AFTER SOURCE ACCESS)

---

### PHASE 2: Docker Setup and Application Verification
**Estimated Time**: 1-2 days

**Objectives**:
- [ ] Install Docker and Docker Compose
- [ ] Clone NodeGoat repository
- [ ] Review existing Dockerfile and docker-compose.yml
- [ ] Build Docker images
- [ ] Run application with docker-compose
- [ ] Verify application accessibility (http://localhost:4000)
- [ ] Verify MongoDB connectivity
- [ ] Test default user accounts (admin, user1, user2)
- [ ] Document Docker configuration

**Deliverables**:
- Working Docker setup
- docker-compose.yml verification
- Application accessibility confirmation
- docs/docker-setup.md

---

### PHASE 3: Architecture Documentation
**Estimated Time**: 1-2 days

**Objectives**:
- [ ] Document application architecture
- [ ] Create component inventory
- [ ] Map data flows between components
- [ ] Identify trust boundaries
- [ ] Create architecture diagram (Mermaid + export)
- [ ] Document networking configuration
- [ ] Document security boundaries

**Architecture Components**:
- User/Browser
- NodeGoat Web Container (Node.js/Express)
- MongoDB Container
- Docker Network

**Trust Boundaries**:
- Public Internet ↔ NodeGoat Web Container
- NodeGoat Web Container ↔ MongoDB Container
- Application ↔ Database

**Deliverables**:
- docs/architecture/system-architecture.md
- docs/architecture/architecture-diagram.mmd
- docs/architecture/trust-boundaries.md
- Architecture diagrams (PNG/SVG)

---

### PHASE 4: STRIDE Threat Modelling
**Estimated Time**: 2-3 days

**Objectives**:
- [ ] Perform STRIDE analysis on architecture
- [ ] Identify at least 4 application-specific threats
- [ ] Create risk assessment matrix (3x3 or 5x5)
- [ ] Rate likelihood and impact for each threat
- [ ] Map threats to security controls
- [ ] Document mitigation strategies
- [ ] Create STRIDE diagram

**STRIDE Categories**:
- **S**poofing: Authentication attacks
- **T**ampering: Data integrity attacks
- **R**epudiation: Non-repudiation issues
- **I**nformation Disclosure: Data breaches
- **D**enial of Service: Availability attacks
- **E**levation of Privilege: Authorization bypass

**Deliverables**:
- docs/threat-model/stride.md
- docs/threat-model/risk-matrix.md
- docs/threat-model/threat-to-control-mapping.md
- STRIDE diagram

---

### PHASE 5: Vulnerability Selection and Verification
**Estimated Time**: 2-3 days

**Objectives**:
- [ ] Verify VUL-01 (RCE via eval) in actual source
- [ ] Identify VUL-02 (NoSQL injection candidate)
- [ ] Identify VUL-03 (Authentication/Session candidate)
- [ ] Identify VUL-04 (Access Control/XSS candidate)
- [ ] Document each vulnerability with:
  - CWE mapping
  - OWASP mapping
  - Affected file and function
  - Root cause analysis
  - Attack preconditions
  - Proposed secure fix

**Candidate Vulnerability Categories**:
- NoSQL injection in MongoDB queries
- Weak authentication/session handling
- Insecure direct object reference (IDOR)
- Cross-site scripting (XSS)
- Security misconfiguration
- Hardcoded secrets

**Deliverables**:
- docs/vulnerabilities/VUL-01.md
- docs/vulnerabilities/VUL-02.md
- docs/vulnerabilities/VUL-03.md
- docs/vulnerabilities/VUL-04.md

---

### PHASE 6: Exploit-Before Evidence
**Estimated Time**: 2-3 days

**Objectives**:
- [ ] Run unmodified vulnerable application
- [ ] Demonstrate VUL-01 exploit
  - [ ] Capture terminal evidence
  - [ ] Capture browser/API evidence
  - [ ] Save screenshots (docs/screenshots/before/VUL-01-*.png)
- [ ] Demonstrate VUL-02 exploit
  - [ ] Capture evidence
  - [ ] Save screenshots
- [ ] Demonstrate VUL-03 exploit
  - [ ] Capture evidence
  - [ ] Save screenshots
- [ ] Demonstrate VUL-04 exploit
  - [ ] Capture evidence
  - [ ] Save screenshots

**Exploit Documentation**:
- Step-by-step procedure
- Payloads used
- Expected vulnerable behavior
- Actual results obtained

**Deliverables**:
- docs/screenshots/before/ (all exploit evidence)
- docs/vulnerabilities/*/exploit-procedure.md

---

### PHASE 7: Secure Coding Fixes
**Estimated Time**: 3-4 days

**Objectives**:
- [ ] Implement fix for VUL-01 (RCE via eval)
  - [ ] Replace eval() with parseInt()
  - [ ] Test functionality preserved
  - [ ] Document code changes
- [ ] Implement fix for VUL-02
  - [ ] Apply secure coding principles
  - [ ] Test functionality preserved
  - [ ] Document code changes
- [ ] Implement fix for VUL-03
  - [ ] Apply secure coding principles
  - [ ] Test functionality preserved
  - [ ] Document code changes
- [ ] Implement fix for VUL-04
  - [ ] Apply secure coding principles
  - [ ] Test functionality preserved
  - [ ] Document code changes

**Secure Coding Principles**:
- Input validation
- Output encoding
- Parameterized queries
- Proper error handling
- Secure session management
- Least privilege

**Deliverables**:
- Fixed source code
- docs/vulnerabilities/*/secure-fix.md
- Code diff documentation

---

### PHASE 8: Exploit-After Evidence
**Estimated Time**: 2-3 days

**Objectives**:
- [ ] Run fixed application
- [ ] Re-attempt VUL-01 exploit
  - [ ] Verify exploit fails
  - [ ] Capture evidence
  - [ ] Save screenshots (docs/screenshots/after/VUL-01-*.png)
- [ ] Re-attempt VUL-02 exploit
  - [ ] Verify exploit fails
  - [ ] Capture evidence
  - [ ] Save screenshots
- [ ] Re-attempt VUL-03 exploit
  - [ ] Verify exploit fails
  - [ ] Capture evidence
  - [ ] Save screenshots
- [ ] Re-attempt VUL-04 exploit
  - [ ] Verify exploit fails
  - [ ] Capture evidence
  - [ ] Save screenshots

**Validation**:
- Exploits no longer succeed
- Application functionality preserved
- No regressions introduced

**Deliverables**:
- docs/screenshots/after/ (all mitigation evidence)
- docs/vulnerabilities/*/exploit-after-results.md

---

### PHASE 9: SAST Before/After
**Estimated Time**: 2 days

**Objectives**:
- [ ] Select SAST tool (Semgrep recommended for Node.js)
- [ ] Run SAST on vulnerable code (before fixes)
  - [ ] Save raw results (security/sast/before/)
  - [ ] Document findings count
- [ ] Run SAST on fixed code (after fixes)
  - [ ] Save raw results (security/sast/after/)
  - [ ] Document findings count
- [ ] Create comparison table
  - [ ] Finding ID
  - [ ] Before severity
  - [ ] After severity
  - [ ] Remediation status

**SAST Tool Options**:
- Semgrep (recommended for Node.js)
- ESLint security plugins
- CodeQL (if available)

**Deliverables**:
- security/sast/before/results.json
- security/sast/after/results.json
- security/sast/comparison.md

---

### PHASE 10: SCA, Gitleaks, and Trivy
**Estimated Time**: 2-3 days

**Objectives**:
- [ ] **Dependency/SCA Scanning**:
  - [ ] Implement npm audit or alternative
  - [ ] Configure severity threshold
  - [ ] Document findings
  - [ ] Create remediation plan
- [ ] **Secret Scanning**:
  - [ ] Install and configure Gitleaks
  - [ ] Scan repository for secrets
  - [ ] Remove any found secrets
  - [ ] Create .gitleaks.toml configuration
- [ ] **Container Scanning**:
  - [ ] Install Trivy
  - [ ] Build Docker image
  - [ ] Scan image with Trivy
  - [ ] Configure severity threshold
  - [ ] Document findings
  - [ ] Investigate base image alternatives if needed

**Deliverables**:
- security/dependency/scan-results.json
- security/secrets/gitleaks-results.json
- security/container/trivy-results.json
- Tool configurations

---

### PHASE 11: GitHub Actions CI/CD Pipeline
**Estimated Time**: 3-4 days

**Objectives**:
- [ ] Create GitHub repository
- [ ] Set up GitHub Actions workflow
- [ ] Configure pipeline stages:
  - [ ] Checkout code
  - [ ] Setup Node.js
  - [ ] Install dependencies
  - [ ] Run unit/security tests
  - [ ] SAST scan
  - [ ] Dependency scan
  - [ ] Gitleaks scan
  - [ ] Docker build
  - [ ] Trivy scan
  - [ ] Security gate validation
- [ ] Configure severity thresholds
- [ ] Test pipeline on clean commit
- [ ] Document pipeline architecture

**Pipeline Workflow**:
```
Push → Checkout → Setup Node → Install → Tests → SAST → SCA → Gitleaks → Docker Build → Trivy → Security Gate → PASS/FAIL
```

**Deliverables**:
- .github/workflows/security.yml
- docs/pipeline/pipeline-architecture.md
- docs/pipeline/security-gates.md

---

### PHASE 12: Real Failing Security Gate
**Estimated Time**: 1-2 days

**Objectives**:
- [ ] Create controlled demonstration branch
- [ ] Intentionally introduce security issue:
  - [ ] Test secret (safe, not real credential)
  - [ ] Vulnerable dependency version
  - [ ] Insecure Docker configuration
- [ ] Push to trigger pipeline
- [ ] Capture pipeline failure
  - [ ] Screenshot of failed run
  - [ ] Document failure reason
  - [ ] Document tool and severity
- [ ] Document threshold configuration

**Safety Rules**:
- Never commit real secrets
- Use safe test conditions
- Make failure reproducible

**Deliverables**:
- docs/screenshots/pipeline/fail-*.png
- docs/pipeline/failing-gate-demonstration.md

---

### PHASE 13: Passing Pipeline
**Estimated Time**: 1 day

**Objectives**:
- [ ] Remediate the intentional security issue
- [ ] Push fix to trigger pipeline
- [ ] Capture successful pipeline run
  - [ ] Screenshot of passing run
  - [ ] Document all security gates passing
- [ ] Verify all security tools integrated
- [ ] Confirm pipeline is production-ready

**Deliverables**:
- docs/screenshots/pipeline/pass-*.png
- docs/pipeline/passing-pipeline-evidence.md

---

### PHASE 14: Evidence Collection and Organization
**Estimated Time**: 2 days

**Objectives**:
- [ ] Organize all screenshots by category
- [ ] Create evidence matrix
- [ ] Map requirements to evidence
- [ ] Verify all required evidence exists
- [ ] Check for [EVIDENCE REQUIRED] items
- [ ] Generate any missing evidence
- [ ] Create evidence repository structure

**Evidence Categories**:
- Architecture documentation
- Threat model documentation
- Vulnerability documentation
- Exploit-before screenshots
- Exploit-after screenshots
- SAST results
- Pipeline screenshots
- Security scan results

**Deliverables**:
- docs/evidence/evidence-matrix.md
- Organized evidence directory structure
- Complete evidence set

---

### PHASE 15: Technical Report Writing
**Estimated Time**: 3-4 days

**Objectives**:
- [ ] Write executive summary (200-300 words)
- [ ] Document system overview (300-400 words)
- [ ] Document architecture (300-400 words)
- [ ] Document threat model and risk assessment (400-500 words)
- [ ] Document vulnerability assessment (600-800 words)
- [ ] Document secure coding remediation (400-500 words)
- [ ] Document SAST before/after (200-300 words)
- [ ] Document CI/CD pipeline (400-500 words)
- [ ] Document security gates (200-300 words)
- [ ] Document secrets management (200-300 words)
- [ ] Research and document industry trends (300-400 words)
- [ ] Research and document case study (300-400 words)
- [ ] Write reflection (200-300 words)
- [ ] Create contribution statement
- [ ] Create AI usage disclosure
- [ ] Compile IEEE references
- [ ] Review and edit for word count (1800-2500)
- [ ] Format as professional academic report

**Report Structure**:
1. Executive Summary
2. System Overview
3. Architecture
4. Threat Modelling & Risk Assessment
5. Vulnerability Assessment & Secure Coding
6. CI/CD Pipeline & Security Automation
7. Secrets Management
8. Industry Trends & Case Study
9. Reflection & Future Improvements
10. Contribution Statement & AI Disclosure
11. References

**Deliverables**:
- REPORT.md (1800-2500 words)
- Final PDF version

---

### PHASE 16: Viva Preparation
**Estimated Time**: 2 days

**Objectives**:
- [ ] Create viva preparation document
- [ ] Prepare Q&A for each technical area:
  - [ ] Application architecture
  - [ ] Docker and containerization
  - [ ] Node.js and Express
  - [ ] MongoDB and NoSQL
  - [ ] Threat modelling (STRIDE)
  - [ ] Risk assessment
  - [ ] Vulnerabilities (CWE, OWASP)
  - [ ] Secure coding fixes
  - [ ] SAST tools
  - [ ] Dependency scanning
  - [ ] Secrets scanning
  - [ ] Container scanning
  - [ ] CI/CD pipeline
  - [ ] GitHub Actions
  - [ ] Security gates
  - [ ] Secrets management
  - [ ] DevSecOps principles
  - [ ] Industry case study
- [ ] Prepare demonstration scenarios
- [ ] Prepare technical explanations
- [ ] Prepare simple explanations for viva

**Deliverables**:
- docs/viva-preparation.md
- Practice questions and answers

---

### PHASE 17: Final Validation
**Estimated Time**: 1-2 days

**Objectives**:
- [ ] Run complete validation checklist
- [ ] Verify NodeGoat runs correctly
- [ ] Verify MongoDB connectivity
- [ ] Verify Docker Compose works
- [ ] Verify all 4 vulnerabilities fixed
- [ ] Verify all exploits blocked
- [ ] Verify SAST improvements
- [ ] Verify pipeline passes
- [ ] Verify no secrets committed
- [ ] Verify all evidence collected
- [ ] Verify report word count
- [ ] Verify all assignment requirements met
- [ ] Create final validation report

**Deliverables**:
- docs/final-validation.md
- Complete project ready for submission

---

## Team Structure and Responsibilities

### Member 1: Application Architecture & Containerization
**Responsibilities**:
- Phase 1: Source audit (technology stack)
- Phase 2: Docker setup and verification
- Phase 3: Architecture documentation
- Phase 10: Container scanning (Trivy)
- Phase 15: Report sections (System Overview, Architecture)

**Key Deliverables**:
- Docker configuration
- Architecture diagrams
- Container scan results
- System overview documentation

### Member 2: Threat Modelling & Vulnerability Analysis
**Responsibilities**:
- Phase 1: Source audit (security-relevant files)
- Phase 4: STRIDE threat modelling
- Phase 5: Vulnerability selection (VUL-01, VUL-02)
- Phase 6: Exploit-before evidence (VUL-01, VUL-02)
- Phase 15: Report sections (Threat Modelling, Risk Assessment)

**Key Deliverables**:
- STRIDE threat model
- Risk assessment matrix
- VUL-01 and VUL-02 documentation
- Exploit evidence

### Member 3: Secure Coding & Security Testing
**Responsibilities**:
- Phase 5: Vulnerability selection (VUL-03, VUL-04)
- Phase 6: Exploit-before evidence (VUL-03, VUL-04)
- Phase 7: Secure coding fixes (all 4 vulnerabilities)
- Phase 8: Exploit-after evidence (all 4 vulnerabilities)
- Phase 9: SAST before/after
- Phase 15: Report sections (Vulnerability Assessment, Secure Coding)

**Key Deliverables**:
- Secure code fixes
- Exploit-after evidence
- SAST comparison
- Vulnerability documentation

### Member 4: DevSecOps Pipeline & Security Automation
**Responsibilities**:
- Phase 10: Dependency scanning (npm audit)
- Phase 10: Secrets scanning (Gitleaks)
- Phase 11: GitHub Actions pipeline
- Phase 12: Failing security gate demonstration
- Phase 13: Passing pipeline
- Phase 15: Report sections (CI/CD, Security Gates, Secrets Management)

**Key Deliverables**:
- GitHub Actions workflow
- Security scan integrations
- Pipeline evidence
- CI/CD documentation

---

## Recommended Git Commit Strategy

### Initial Setup
```bash
git commit -m "feat: initial project structure and documentation"
```

### Member 1 Commits
```bash
git commit -m "feat: containerize NodeGoat with Docker and docker-compose"
git commit -m "docs: add system architecture and trust boundaries"
git commit -m "security: integrate Trivy container scanning"
```

### Member 2 Commits
```bash
git commit -m "docs: add STRIDE threat model and risk assessment"
git commit -m "docs: document VUL-01 and VUL-02 vulnerabilities"
git commit -m "evidence: add exploit-before screenshots for VUL-01 and VUL-02"
```

### Member 3 Commits
```bash
git commit -m "docs: document VUL-03 and VUL-04 vulnerabilities"
git commit -m "evidence: add exploit-before screenshots for VUL-03 and VUL-04"
git commit -m "fix: remediate VUL-01 - RCE via eval() in contributions"
git commit -m "fix: remediate VUL-02 - [vulnerability name]"
git commit -m "fix: remediate VUL-03 - [vulnerability name]"
git commit -m "fix: remediate VUL-04 - [vulnerability name]"
git commit -m "evidence: add exploit-after screenshots for all vulnerabilities"
git commit -m "security: add SAST scanning and before/after comparison"
```

### Member 4 Commits
```bash
git commit -m "security: integrate dependency scanning with npm audit"
git commit -m "security: integrate Gitleaks for secrets scanning"
git commit -m "ci: add GitHub Actions security pipeline"
git commit -m "ci: configure security gates and thresholds"
git commit -m "test: demonstrate failing security gate"
git commit -m "fix: remediate security gate issue"
git commit -m "ci: demonstrate passing security pipeline"
```

### Final Commits
```bash
git commit -m "docs: add comprehensive evidence matrix"
git commit -m "docs: add viva preparation materials"
git commit -m "docs: add final technical report"
git commit -m "chore: final validation and submission ready"
```

---

## Current Status

### Completed
- [x] Assignment requirements analysis
- [x] OWASP NodeGoat research
- [x] Known vulnerability identification (VUL-01)
- [x] Implementation plan creation
- [x] Team structure definition

### Blocked
- [ ] Git installation - Cannot clone repository
- [ ] Docker installation - Cannot test containerization
- [ ] Source code access - Cannot perform detailed audit

### Pending
- [ ] All remaining phases (2-17)
- [ ] Source audit completion
- [ ] Vulnerability verification
- [ ] Implementation work
- [ ] Evidence collection
- [ ] Report writing

---

## Immediate Next Steps

### Critical Path
1. **Install Git** - Required for repository access
2. **Install Docker** - Required for containerization
3. **Clone NodeGoat** - Required for source audit
4. **Complete Phase 1** - Source audit and vulnerability identification
5. **Proceed with Phase 2-17** - Implementation and evidence collection

### Alternative Approach
If Git/Docker cannot be installed immediately:
1. Manually download NodeGoat ZIP from GitHub
2. Extract and perform static analysis
3. Install tools later for Docker and pipeline phases
4. Adjust timeline accordingly

---

## Risk Assessment

### Technical Risks
- **HIGH**: Git/Docker not available - blocks all implementation work
- **MEDIUM**: NodeGoat vulnerabilities may differ from documentation
- **MEDIUM**: Docker configuration may require troubleshooting
- **LOW**: SAST tools may have false positives/negatives

### Timeline Risks
- **HIGH**: Tool installation delays could impact 10-week schedule
- **MEDIUM**: Vulnerability discovery may take longer than expected
- **MEDIUM**: Pipeline debugging may require additional time
- **LOW**: Report writing may require iterations

### Mitigation Strategies
- Prioritize Git/Docker installation immediately
- Use intentionally vulnerable app (NodeGoat) to reduce vulnerability discovery time
- Follow recommended 10-week schedule
- Build in buffer time for debugging and validation
- Start with simple pipeline, add complexity incrementally

---

## Success Criteria

### Must Have (Assignment Requirements)
- [ ] Working DevSecOps pipeline with all 4 security gates
- [ ] At least 4 demonstrated and fixed vulnerabilities
- [ ] STRIDE threat model with risk assessment
- [ ] Architecture documentation with trust boundaries
- [ ] Exploit-before and exploit-after evidence
- [ ] SAST before/after comparison
- [ ] At least one genuinely failing security gate
- [ ] No hardcoded secrets in final repository
- [ ] Technical report (1800-2500 words)
- [ ] Viva preparation complete

### Should Have (Quality Indicators)
- [ ] Professional documentation and diagrams
- [ ] Clear evidence matrix
- [ ] Comprehensive team contribution tracking
- [ ] Transparent AI usage disclosure
- [ ] Realistic industry case study
- [ ] Well-structured GitHub repository

### Could Have (Enhancements)
- [ ] DAST scanning with OWASP ZAP (extra credit)
- [ ] HashiCorp Vault for secrets management (extra credit)
- [ ] Additional security tests
- [ ] Enhanced monitoring and logging

---

## Conclusion

This implementation plan provides a structured approach to completing the IE3142 DevOps Security assignment. The plan follows the recommended 10-week schedule and ensures all assignment requirements are met with genuine, verifiable evidence.

**Current blocker**: Git and Docker are not installed on the current system, preventing repository access and implementation work.

**Immediate action required**: Install Git and Docker to proceed with Phase 1 completion and subsequent implementation phases.

**Next milestone**: Complete Phase 1 (Source Audit) after obtaining repository access.
