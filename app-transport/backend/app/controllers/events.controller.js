const db = require('../models/index');
const Events = db.events;
const Op = db.Sequelize.Op;
const config = require("../config/auth.config")

// exports.createEvent = async (req, res) => {

    
//     try {
        
//         await Events.create({
//             title: "New event!",
//             start: req.body.start,
//             end: req.body.end,
//             transporterId: req.body.transporterId,
//             // resourceId: req.body.resourceId
//             resourceId: "a"
//         });
//         res.status(201).send({ message: "Event created successfully!" });
//     } catch (err) {
//         console.error("Error creating event:", err);
//         res.status(500).send({ message: "An error occurred while creating the event." });
//     }
// };

exports.createEvent = async (req, res) => {
    try {
        // Check if any other event exists within the specified date range
        const existingEvent = await Events.findOne({
            where: {
                transporterId: req.body.transporterId, // Assuming the user ID is available in req.body.transporterId
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
        });

        // If an existing event is found, return an error
        if (existingEvent) {
            return res.status(400).send({
                message: "Failed! Another event already exists for the current user within the specified date range."
            });
        }

        // If no existing event within the date range, proceed with creating the event
        await Events.create({
            title: "New event!",
            start: req.body.start,
            end: req.body.end,
            transporterId: req.body.transporterId,
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






// exports.updateEventData = async (req, res) => {
//     try {
//         const eventId = req.params.eventId;

//         const event = await Events.findOne({
//             where: { id: eventId }
//         });

//         if (!event) {
//             return res.status(404).send({ message: "Event not found." });
//         }

//         const updatedFields = {};
//         if (req.body.start) {
//             updatedFields.start = req.body.start;
//         }
//         if (req.body.end) {
//             updatedFields.end = req.body.end;
//         }

//         await Events.update(updatedFields, {
//             where: { id: eventId }
//         }).then(data => console.log(data));

//         res.status(200).send({ message: "Event data updated successfully." });
//     } catch (err) {
//         res.status(500).send({ message: err.message });
//     }
// };

exports.updateEventData = async (req, res) => {
    try {
        const eventId = req.params.eventId;

        // Find the event being updated
        const event = await Events.findOne({
            where: { id: eventId }
        });

        // If the event is not found, return a 404 error
        if (!event) {
            return res.status(404).send({ message: "Event not found." });
        }

        // Prepare the updated fields
        const updatedFields = {};
        if (req.body.start) {
            updatedFields.start = req.body.start;
        }
        if (req.body.end) {
            updatedFields.end = req.body.end;
        }

        // Check if updating the event will cause a conflict with existing events for the same user within the specified date range
        const existingEvent = await Events.findOne({
            where: {
                transporterId: event.transporterId, // Assuming the user ID is stored in transporterId
                id: { [Op.not]: eventId }, // Exclude the current event being updated
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
                    },
                    {
                        end: {
                            [Op.gte]: req.body.end
                        },
                        start: {
                            [Op.lte]: req.body.end
                        }
                    }
                ]
            }
        });
        

        // If an existing event conflicts with the update, return a 400 error
        if (existingEvent) {
            return res.status(400).send({
                message: "Failed! Updating the event will cause a conflict with existing events for the same user within the specified date range."
            });
        }

        // Update the event data
        await Events.update(updatedFields, {
            where: { id: eventId }
        });

        // Return a success message
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