const db = require("../models");
const Trip = db.trips;
const Op = db.Sequelize.Op;

// Function to check for duplicate trips
checkDuplicateTrip = (req, res, next) => {
    Trip.findOne({
        where: {
            [Op.or]: [
                {
                    departDate: req.body.departDate
                },
                {
                    departDate: {
                        [Op.lte]: req.body.departDate
                    },
                    arrivDate: {
                        [Op.gte]: req.body.departDate
                    }
                }
            ]
        }
    }).then(trip => {
        if (trip) {
            res.status(400).send({
                message: "Failed! A trip already exists on that day or within that period!"
            });
            return;
        }

        next();
    });
};

// Object to hold verification functions
const verifyTrip = {
    checkDuplicateTrip: checkDuplicateTrip,
};

module.exports = verifyTrip;

