// Importing required modules and models
const db = require("../models");
const Event = db.events;
const Op = db.Sequelize.Op;

// Function to check for duplicate trips
checkDuplicateEvent = (req, res, next) => {
    Event.findOne({
        where: {
            [Op.or]: [
                {
                    start: req.body.start
                },
                {
                    start: {
                        [Op.lte]: req.body.start
                    },
                    end: {
                        [Op.gte]: req.body.start
                    }
                }
            ]
        }
    }).then(event => {
        if (event) {
            res.status(400).send({
                message: "Failed! A trip already exists on that day or within that period!"
            });
            return;
        }

        next();
    });
};

// Object to hold verification functions
const verifyEvent = {
    checkDuplicateEvent: checkDuplicateEvent,
};

module.exports = verifyEvent;
