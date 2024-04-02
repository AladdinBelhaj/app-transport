const db = require('../models/index');
const Events = db.events;
const Op = db.Sequelize.Op;
const config = require("../config/auth.config")

exports.createEvent = async (req, res) => {
    try {
        await Events.create({
            title: "New event!",
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






exports.updateEventData = async (req, res) => {
    try {
        const eventId = req.params.eventId;

        const event = await Events.findOne({
            where: { id: eventId }
        });

        if (!event) {
            return res.status(404).send({ message: "Event not found." });
        }

        const updatedFields = {};
        if (req.body.start) {
            updatedFields.start = req.body.start;
        }
        if (req.body.end) {
            updatedFields.end = req.body.end;
        }

        await Events.update(updatedFields, {
            where: { id: eventId }
        }).then(data => console.log(data));

        res.status(200).send({ message: "Event data updated successfully." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;

        // Check if the event exists
        const event = await Events.findOne({
            where: { id: eventId }
        });

        if (!event) {
            return res.status(404).send({ message: "Event not found." });
        }

        await Events.destroy({
            where: { id: eventId }
        });

        // Return a success message
        res.status(200).send({ message: "Event deleted successfully." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};



exports.getAllEvents = async (req, res) => {
    try {

        const allEvents = await Events.findAll();


        res.status(200).send(allEvents);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};