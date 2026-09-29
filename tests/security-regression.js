const fs = require("fs");
const path = require("path");
const assert = require("assert");

const file = rel => fs.readFileSync(path.join(__dirname, "..", rel), "utf8");

const contributions = file("app/app/routes/contributions.js");
assert(!/eval\s*\(\s*req\.body/.test(contributions), "User input must not reach eval()");
assert(/parseContribution/.test(contributions), "Contribution input validation missing");

const allocationsDao = file("app/app/data/allocations-dao.js");
assert(!/\$where/.test(allocationsDao), "MongoDB $where must not be used");
assert(/\$gt:\s*parsedThreshold/.test(allocationsDao), "Threshold must use a typed MongoDB comparison");

const allocationsRoute = file("app/app/routes/allocations.js");
assert(/req\.session/.test(allocationsRoute), "Allocation ownership must come from the session");
assert(!/req\.params\.userId/.test(allocationsRoute), "Allocation route must not trust URL userId");

const userDao = file("app/app/data/user-dao.js");
assert(/scryptSync/.test(userDao), "Passwords must be derived with a password KDF");
assert(!/password\s*\/\/received from request/.test(userDao), "Plaintext password storage must be absent");

const server = file("app/server.js");
assert(/csrf\(\)/.test(server), "CSRF middleware must be enabled");
assert(/httpOnly:\s*true/.test(server), "Session cookie must be HttpOnly");
assert(/sameSite:\s*"lax"/.test(server), "Session cookie must use SameSite");
assert(/helmet\(\)/.test(server), "Helmet security middleware must be enabled");

const config = file("app/config/env/all.js");
assert(/SESSION_SECRET/.test(config), "Session secret must come from environment");
assert(!/cookieSecret:\s*"/.test(config), "Session secret must not be hardcoded");

console.log("Security regression checks passed.");
