const ResearchDAO = require("../data/research-dao").ResearchDAO;
const needle = require("needle");
const {
    environmentalScripts
} = require("../../config/config");

function ResearchHandler(db) {
    "use strict";

    const researchDAO = new ResearchDAO(db);

    this.displayResearch = (req, res) => {

        if (req.query.symbol) {
            const symbol = String(req.query.symbol).trim().toUpperCase();
            if (!/^[A-Z0-9.\-]{1,10}$/.test(symbol)) {
                return res.status(400).send("Invalid stock symbol");
            }
            // Security fix: ignore client-controlled URL. The destination is fixed by application policy.
            const url = `https://finance.yahoo.com/quote/${encodeURIComponent(symbol)}`;
            return needle.get(url, (error, newResponse, body) => {
                if (!error && newResponse.statusCode === 200) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                } else {
                    res.status(502);
                }
                res.write("<h1>The following is the stock information you requested.</h1>\n\n");
                if (body) res.write(body);
                return res.end();
            });
        }

        return res.render("research", {
            environmentalScripts
        });
    };

}

module.exports = ResearchHandler;
