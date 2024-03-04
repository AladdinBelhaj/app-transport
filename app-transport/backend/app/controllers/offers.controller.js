const db = require('../models/index');
const Offers = db.offers; // Assuming you have an Offers model defined in your models/index.js file
const Op = db.Sequelize.Op;

exports.createOffer = async (req, res) => {
    try {
        // Create a new offer in the database
        const offer = await Offers.create({
            objects: req.body.objects,
            userId: req.body.userId,
            tripId: req.body.tripId
        });

        res.status(201).send({ message: "Offer created successfully!", offer });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
