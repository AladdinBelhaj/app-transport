const db = require('../models/index');
const Events = db.events;
const Op = db.Sequelize.Op;
const config = require("../config/auth.config")

exports.createEvent = async (req, res) => {
    try {
        await Events.create({
            title: "New trip!",
            start: req.body.start,
            end: req.body.end,
            transporterId: req.body.transporterId,
            // resourceId: req.body.resourceId
            resourceId: "a"
        });
        res.status(201).send({ message: "Event created successfully!" });
    } catch (err) {
        console.error("Error creating event:", err);
        res.status(500).send({ message: "An error occurred while creating the event." });
    }
};


exports.getEventsData = async (req, res) => {
    try {
        const transporterId = req.params.transporterId; // Assuming the user ID is passed as a parameter in the URL

        // Retrieve the user data from the database
        const event = await Events.findAll({
            where: { transporterId: transporterId },
        });

        if (!event) {
            return res.status(404).send({ message: "Event not found." });
        }

        // Return the user data
        res.status(200).send(event);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};