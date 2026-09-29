const ContributionsDAO = require("../data/contributions-dao").ContributionsDAO;
const {
    environmentalScripts
} = require("../../config/config");

function ContributionsHandler(db) {
    "use strict";

    const contributionsDAO = new ContributionsDAO(db);

    this.displayContributions = (req, res, next) => {
        const { userId } = req.session;
        contributionsDAO.getByUserId(userId, (error, contrib) => {
            if (error) return next(error);
            contrib.userId = userId;
            return res.render("contributions", {
                ...contrib,
                environmentalScripts
            });
        });
    };

    this.handleContributionsUpdate = (req, res, next) => {
        // Security fix: never execute user-controlled JavaScript. Contributions are integers.
        const parseContribution = (value) => {
            if (!/^[0-9]{1,2}$/.test(String(value || ""))) return NaN;
            return Number.parseInt(value, 10);
        };

        const preTax = parseContribution(req.body.preTax);
        const afterTax = parseContribution(req.body.afterTax);
        const roth = parseContribution(req.body.roth);
        const { userId } = req.session;

        const isInvalid = [preTax, afterTax, roth].some(value => Number.isNaN(value) || value < 0);
        if (isInvalid) {
            return res.render("contributions", {
                updateError: "Invalid contribution percentages",
                userId,
                environmentalScripts
            });
        }

        if (preTax + afterTax + roth > 30) {
            return res.render("contributions", {
                updateError: "Contribution percentages cannot exceed 30 %",
                userId,
                environmentalScripts
            });
        }

        contributionsDAO.update(userId, preTax, afterTax, roth, (err, contributions) => {
            if (err) return next(err);
            contributions.updateSuccess = true;
            return res.render("contributions", {
                ...contributions,
                environmentalScripts
            });
        });
    };
}

module.exports = ContributionsHandler;
