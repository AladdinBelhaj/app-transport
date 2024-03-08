const db = require('../models/index');
const Offers = db.offers; 
const Op = db.Sequelize.Op;

exports.createOffer = async (req, res) => {
    try {
        // Create a new offer in the database
        const offer = await Offers.create({
            objects: req.body.objects,
            userId: req.body.userId,
            tripId: req.body.tripId,
            transporterId: req.body.transporterId
        });

        res.status(201).send({ message: "Offer created successfully!", offer });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


exports.getOfferData = async (req, res) => {
    try {
        const transporterId = req.params.transporterId; // Assuming the trip ID is passed as a parameter in the URL


        const offer = await Offers.findAll({
            where: { transporterId: transporterId },
        });

        if (!offer) {
            return res.status(404).send({ message: "Offer not found." });
        }

        res.status(200).send(offer);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};