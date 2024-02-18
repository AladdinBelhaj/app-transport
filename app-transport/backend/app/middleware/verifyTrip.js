require("../models");
const db = require("../models");
const Trip = db.trips;

checkDuplicateTrip = (req, res, next) => {


    Trip.findOne({
        where: {
            departDate: req.body.departDate
        }
    }).then(trip => {
        if (trip) {
            res.status(400).send({
                message: "Failed! A trip already exists on that day!"
            });
            return;
        }

        next();
    });
};

const verifyTrip = {
    checkDuplicateTrip: checkDuplicateTrip,
};

module.exports = verifyTrip;