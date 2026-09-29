const UserDAO = require("./user-dao").UserDAO;

const AllocationsDAO = function(db) {
    "use strict";

    if (false === (this instanceof AllocationsDAO)) {
        return new AllocationsDAO(db);
    }

    const allocationsCol = db.collection("allocations");
    const userDAO = new UserDAO(db);

    this.update = (userId, stocks, funds, bonds, callback) => {
        const parsedUserId = parseInt(userId, 10);
        if (!Number.isInteger(parsedUserId)) return callback(new Error("Invalid user id"), null);

        const allocations = { userId: parsedUserId, stocks, funds, bonds };

        allocationsCol.update(
            { userId: parsedUserId },
            { $set: allocations },
            { upsert: true },
            err => {
                if (err) return callback(err, null);
                userDAO.getUserById(parsedUserId, (userErr, user) => {
                    if (userErr) return callback(userErr, null);
                    if (!user) return callback(new Error("User not found"), null);

                    const result = { ...allocations, userName: user.userName,
                        firstName: user.firstName, lastName: user.lastName };
                    return callback(null, result);
                });
            }
        );
    };

    this.getByUserIdAndThreshold = (userId, threshold, callback) => {
        const parsedUserId = parseInt(userId, 10);
        if (!Number.isInteger(parsedUserId)) return callback(new Error("Invalid user id"), null);

        let query = { userId: parsedUserId };
        if (threshold !== undefined && threshold !== "") {
            if (!/^[0-9]{1,2}$/.test(String(threshold))) {
                return callback(new Error("Invalid threshold"), null);
            }
            const parsedThreshold = parseInt(threshold, 10);
            if (parsedThreshold < 0 || parsedThreshold > 99) {
                return callback(new Error("Invalid threshold"), null);
            }
            query = { userId: parsedUserId, stocks: { $gt: parsedThreshold } };
        }

        allocationsCol.find(query).toArray((err, allocations) => {
            if (err) return callback(err, null);
            if (!allocations.length) return callback(new Error("No allocations found"), null);

            let doneCounter = 0;
            const userAllocations = [];
            allocations.forEach(alloc => {
                userDAO.getUserById(alloc.userId, (userErr, user) => {
                    if (userErr) return callback(userErr, null);
                    if (!user) return callback(new Error("User not found"), null);
                    alloc.userName = user.userName;
                    alloc.firstName = user.firstName;
                    alloc.lastName = user.lastName;
                    doneCounter += 1;
                    userAllocations.push(alloc);
                    if (doneCounter === allocations.length) callback(null, userAllocations);
                });
            });
        });
    };
};

module.exports.AllocationsDAO = AllocationsDAO;
