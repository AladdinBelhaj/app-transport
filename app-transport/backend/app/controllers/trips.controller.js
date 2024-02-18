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
            description:req.body.description
        });
        res.status(201).send({ message: "Trip created successfully!" });
    } catch (err) {
        console.error("Error creating trip:", err);
        res.status(500).send({ message: "An error occurred while creating the trip." });
    }
};