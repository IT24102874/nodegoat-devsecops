const AllocationsDAO = require("../data/allocations-dao").AllocationsDAO;
const { environmentalScripts } = require("../../config/config");

function AllocationsHandler(db) {
    "use strict";
    const allocationsDAO = new AllocationsDAO(db);

    this.displayAllocations = (req, res, next) => {
        // Security fix: use the authenticated user's identity, not a URL-controlled ID.
        const { userId } = req.session;
        const { threshold } = req.query;

        allocationsDAO.getByUserIdAndThreshold(userId, threshold, (err, allocations) => {
            if (err) return next(err);
            return res.render("allocations", {
                userId,
                allocations,
                environmentalScripts
            });
        });
    };
}

module.exports = AllocationsHandler;
