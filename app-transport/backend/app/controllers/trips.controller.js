const db = require('../models/index');
const Trips = db.trips;
const Op = db.Sequelize.Op;
const config = require("../config/auth.config")

exports.createTrip = async (req, res) => {
    try {
        await Trips.create({
            departCountry: req.body.departCountry,
            departState:  req.body.departState,
            destCountry:  req.body.destCountry,
            desState:  req.body.desState,
            departDate:  req.body.departDate,
            arrivDate: req.body.arrivDate,
            maxWeight: req.body.maxWeight,
            description:req.body.description,
            transporterId: req.body.transporterId,
            status: "pending"
        });
        res.status(201).send({ message: "Trip created successfully!" });
    } catch (err) {
        console.error("Error creating trip:", err);
        res.status(500).send({ message: "An error occurred while creating the trip." });
    }
};


exports.getTripData = async (req, res) => {
    try {
        const transporterId = req.params.transporterId; // Assuming the user ID is passed as a parameter in the URL


        const user = await Trips.findAll({
            where: { transporterId: transporterId },
        });

        if (!user) {
            return res.status(404).send({ message: "Trip not found." });
        }

        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.getSingleTripData = async (req, res) => {
    try {
        const tripId = req.params.id; // Assuming the user ID is passed as a parameter in the URL

        // Retrieve the user data from the database
        const trip = await Trips.findOne({
            where: { id: tripId },
        });

        if (!trip) {
            return res.status(404).send({ message: "Trip not found." });
        }

        // Return the user data
        res.status(200).send(trip);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
