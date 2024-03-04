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
