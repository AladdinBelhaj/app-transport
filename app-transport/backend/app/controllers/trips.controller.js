const db = require('../models/index');
const Trips = db.trips;
const Op = db.Sequelize.Op;
const config = require("../config/auth.config")
const sequelize = require("../models/index")
// exports.createTrip = async (req, res) => {
//     try {
//         await Trips.create({
//             departCountry: req.body.departCountry,
//             departState:  req.body.departState,
//             destCountry:  req.body.destCountry,
//             desState:  req.body.desState,
//             departDate:  req.body.departDate,
//             arrivDate: req.body.arrivDate,
//             maxWeight: req.body.maxWeight,
//             description:req.body.description,
//             transporterId: req.body.transporterId,
//             status: "pending"
//         });
//         res.status(201).send({ message: "Trip created successfully!" });
//     } catch (err) {
//         console.error("Error creating trip:", err);
//         res.status(500).send({ message: "An error occurred while creating the trip." });
//     }
// };


exports.createTrip = async (req, res) => {
    try {
        // Check if a trip already exists for the current user within the specified period
        const existingTrip = await Trips.findOne({
            where: {
                transporterId: req.body.transporterId, // Assuming the user ID is available in req.body.userId
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
        });

        // If an existing trip is found, return an error
        if (existingTrip) {
            return res.status(400).send({
                message: "Failed! A trip already exists for the current user on that day or within that period!"
            });
        }

        // If no existing trip, create a new one
        await Trips.create({
            departCountry: req.body.departCountry,
            departState: req.body.departState,
            destCountry: req.body.destCountry,
            desState: req.body.desState,
            departDate: req.body.departDate,
            arrivDate: req.body.arrivDate,
            maxWeight: req.body.maxWeight,
            description: req.body.description,
            transporterId: req.body.transporterId, // Assigning the user ID to transporterId
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
        // const existingTrip = await Trips.findOne({
        //     where: {
        //         id: { [Op.not]: tripId }, // Exclude the current trip being updated
        //         transporterId: req.body.transporterId, // Assuming the user ID is available in req.body.userId
        //         [Op.or]: [
        //             {
        //                 departDate: req.body.departDate
        //             },
        //             {
        //                 departDate: {
        //                     [Op.lte]: req.body.departDate
        //                 },
        //                 arrivDate: {
        //                     [Op.gte]: req.body.departDate
        //                 }
        //             }
        //         ]
        //     }
        // });
        const existingTrip = await Trips.findOne({
            where: {
                id: { [Op.not]: tripId }, // Exclude the current trip being updated
                transporterId: req.body.transporterId, // Assuming the user ID is available in req.body.userId
                [Op.or]: [
                    {
                        [Op.and]: [
                            { departDate: { [Op.lte]: req.body.departDate } },
                            { arrivDate: { [Op.gte]: req.body.departDate } }
                        ]
                    },
                    {
                        [Op.and]: [
                            { departDate: { [Op.lte]: req.body.arrivDate } },
                            { arrivDate: { [Op.gte]: req.body.arrivDate } }
                        ]
                    }
                ]
            }
        });
        // If an existing trip is found, return an error
        if (existingTrip) {
            return res.status(400).send({
                message: "Failed! Another trip already exists for the current user within the specified date range."
            });
        }



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
        if(req.body.status){
            updatedFields.status = req.body.status;
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


// exports.updateTripData = async (req, res) => {
//     try {
//         const tripId = req.params.tripId;

//         const trip = await Trips.findOne({
//             where: { id: tripId }
//         });

//         if (!trip) {
//             return res.status(404).send({ message: "Trip not found." });
//         }

//         const updatedFields = {};
//         if (req.body.departCountry) {
//             updatedFields.departCountry = req.body.departCountry;
//         }
//         if (req.body.departState) {
//             updatedFields.departState = req.body.departState;
//         }
//         if (req.body.destCountry) {
//             updatedFields.destCountry = req.body.destCountry;
//         }
        
//         if(req.body.desState){
//             updatedFields.desState = req.body.desState;
//         }
//         if(req.body.status){
//             updatedFields.status = req.body.status;
//         }
//         if(req.body.arrivDate){
//             updatedFields.arrivDate = req.body.arrivDate;
//         }
//         if(req.body.departDate){
//             updatedFields.departDate = req.body.departDate;
//         }
//         if(req.body.maxWeight){
//             updatedFields.maxWeight = req.body.maxWeight;
//         }
//         if(req.body.description){
//             updatedFields.description = req.body.description;
//         }

//         // Update trip data
//         await Trips.update(updatedFields, {
//             where: { id: tripId }
//         }).then(data => console.log(data));

//         // Return a success message
//         res.status(200).send({ message: "Trip data updated successfully." });
//     } catch (err) {
//         res.status(500).send({ message: err.message });
//     }
// };


exports.deleteTrip = async (req, res) => {
    try {
        const tripId = req.params.tripId;

        // Check if the trip exists
        const trip = await Trips.findOne({
            where: { id: tripId }
        });

        if (!trip) {
            return res.status(404).send({ message: "Trip not found." });
        }

        // Delete the trip from the database
        await Trips.destroy({
            where: { id: tripId }
        });

        // Return a success message
        res.status(200).send({ message: "Trip deleted successfully." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};



exports.getAllTrips = async (req, res) => {
    try {
        // Retrieve all trips data from the database
        const allTrips = await Trips.findAll();

        // Return all trips data
        res.status(200).send(allTrips);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
