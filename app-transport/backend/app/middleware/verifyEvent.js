require("../models");
const db = require("../models");
const Event = db.events;
const Op = db.Sequelize.Op;

checkDuplicateEvent = (req, res, next) => {


    Event.findOne({
        where: {
            start: req.body.start
        }
    }).then(event => {
        if (event) {
            res.status(400).send({
                message: "Failed! An event already exists on that day!"
            });
            return;
        }

        next();
    });
};

const verifyEvent = {
    checkDuplicateEvent: checkDuplicateEvent,
};

module.exports = verifyEvent;
