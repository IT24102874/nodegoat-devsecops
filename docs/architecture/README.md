# Architecture and Trust Boundaries

The submission contains two communicating runtime components:

1. **NodeGoat Web** — Node.js/Express application exposed only on `127.0.0.1:4000` for the local lab.
2. **MongoDB** — database service reachable only through the Docker Compose internal network.

A third, non-runtime component is the **GitHub Actions security pipeline**, which builds and tests the application and applies the four required security gates.

Trust boundaries:
- **TB1 – Browser ↔ Web**: untrusted HTTP requests, cookies and form fields.
- **TB2 – Web ↔ MongoDB**: application-controlled database queries; user input must never become executable query syntax.
- **TB3 – Repository ↔ CI**: source code and pull requests are untrusted build inputs; gates must fail on configured severity.
- **TB4 – CI secrets ↔ jobs**: secrets are injected by GitHub Actions and are never stored in source.

See `architecture.svg` for the visual diagram and `architecture.dot` for the editable source.
