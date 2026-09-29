# Secrets Management

No production credential or session secret is committed to the repository.

## Local runtime

Create an untracked `.env` from `.env.example` and provide:
- `SESSION_SECRET` (at least 32 random characters)
- `SEED_ADMIN_PASSWORD`
- `SEED_USER1_PASSWORD`
- `SEED_USER2_PASSWORD`

Docker Compose injects these values into the web container. The MongoDB URI used inside the Compose network is non-secret because it contains no credentials.

## GitHub Actions

Configure the same values as GitHub Actions encrypted repository secrets. The workflow references secrets through `${{ secrets.NAME }}` and never writes them into source files.

## Password storage

The application does not store the seed passwords. `db-reset.js` hashes each password with Node.js `crypto.scryptSync` and a unique random salt before insertion.

## Verification

Run Gitleaks against the repository and confirm that no real secret is committed. The `.gitignore` excludes `.env` files while `.env.example` contains placeholders only.
