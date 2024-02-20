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
        const transporterId = req.params.transporterId; // Assuming the trip ID is passed as a parameter in the URL


        const trip = await Trips.findAll({
            where: { transporterId: transporterId },
        });

        if (!trip) {
            return res.status(404).send({ message: "Trip not found." });
        }

        res.status(200).send(trip);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.getSingleTripData = async (req, res) => {
    try {
        const tripId = req.params.id; // Assuming the trip ID is passed as a parameter in the URL

        // Retrieve the trip data from the database
        const trip = await Trips.findOne({
            where: { id: tripId },
        });

        if (!trip) {
            return res.status(404).send({ message: "Trip not found." });
        }

        // Return the trip data
        res.status(200).send(trip);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};






exports.updateTripData = async (req, res) => {
    try {
        const tripId = req.params.tripId;

        const trip = await Trips.findOne({
            where: { id: tripId }
        });

        if (!trip) {
            return res.status(404).send({ message: "Trip not found." });
        }

        const updatedFields = {};
        if (req.body.departCountry) {
            updatedFields.departCountry = req.body.departCountry;
        }
        if (req.body.departState) {
            updatedFields.departState = req.body.departState;
        }
        if (req.body.destCountry) {
            updatedFields.destCountry = req.body.destCountry;
        }
        
        if(req.body.desState){
            updatedFields.desState = req.body.desState;
        }

        if(req.body.arrivDate){
            updatedFields.arrivDate = req.body.arrivDate;
        }
        if(req.body.departDate){
            updatedFields.departDate = req.body.departDate;
        }
        if(req.body.maxWeight){
            updatedFields.maxWeight = req.body.maxWeight;
        }
        if(req.body.description){
            updatedFields.description = req.body.description;
        }

        // Update trip data
        await Trips.update(updatedFields, {
            where: { id: tripId }
        }).then(data => console.log(data));

        // Return a success message
        res.status(200).send({ message: "Trip data updated successfully." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};