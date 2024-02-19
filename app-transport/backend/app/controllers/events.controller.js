const db = require('../models/index');
const Events = db.events;
const Op = db.Sequelize.Op;
const config = require("../config/auth.config")

exports.createEvent = async (req, res) => {
    try {
        await Events.create({
            departDate:  req.body.departDate,
            arrivDate: req.body.arrivDate,
            transporterId: req.body.transporterId,
            resourceId: req.body.resourceId
        });
        res.status(201).send({ message: "Event created successfully!" });
    } catch (err) {
        console.error("Error creating event:", err);
        res.status(500).send({ message: "An error occurred while creating the event." });
    }
};
