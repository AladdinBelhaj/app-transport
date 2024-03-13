const db = require('../models/index');
const Offers = db.offers; 
const Op = db.Sequelize.Op;





const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        cb(null, './app/uploads/offers')

    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


exports.upload = multer({
    storage: storage,
    limits: { fileSize: '5242880' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))
        if (mimeType && extname) {
            return cb(null, true)

        } else {
            return cb('Give proper files formate to upload : jpeg|jpg|png|gif')
        }
    }
}).single('picture')





exports.createOffer = async (req, res) => {
    try {
        // Create a new offer in the database
        const offer = await Offers.create({
            objects: req.body.objects,
            userId: req.body.userId,
            tripId: req.body.tripId,
            transporterId: req.body.transporterId,
            status: "pending"
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


exports.getOfferDataUser = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming the trip ID is passed as a parameter in the URL

        const offer = await Offers.findAll({
            where: { userId: userId },
        });

        if (!offer) {
            return res.status(404).send({ message: "Offer not found." });
        }

        res.status(200).send(offer);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.deleteOffer = async (req, res) => {
    try {
        const offerId = req.params.offerId; 


        const deletedCount = await Offers.destroy({
            where: { id: offerId }
        });

        if (deletedCount === 0) {
            return res.status(404).send({ message: "Offer not found." });
        }

        res.status(200).send({ message: "Offer deleted successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.updateOffer = async (req, res) => {
    try {
        const offerId = req.params.offerId;

        const offer = await Offers.findOne({
            where: { id: offerId }
        });

        if (!offer) {
            return res.status(404).send({ message: "Offer not found." });
        }

        const updatedFields = {};
        if (req.body.objects) {
            updatedFields.objects = req.body.objects;
        }
        if (req.body.userId) {
            updatedFields.userId = req.body.userId;
        }
        if (req.body.tripId) {
            updatedFields.tripId = req.body.tripId;
        }
        if (req.body.transporterId) {
            updatedFields.transporterId = req.body.transporterId;
        }
        if (req.body.status) {
            updatedFields.status = req.body.status;
        }

        // Update offer data
        await Offers.update(updatedFields, {
            where: { id: offerId }
        });

        // Return a success message
        res.status(200).send({ message: "Offer data updated successfully." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


// exports.uploadImage = async (req, res) => {
//     try {
//         const offerId = req.params.offerId;
//         const imageData = req.file.path;

//         const offer = await Offers.findOne({
//             where: { id: offerId }
//         });

//         if (!offer) {
//             return res.status(404).send({ message: 'Offer not found.' });
//         }

//         // Update the offer's picture field with the uploaded image data
//         await Offers.update({ objects: {picture: imageData }}, {
//             where: { id: offerId }
//         });

//         res.status(200).send({ message: 'Image uploaded successfully.' });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// };


exports.uploadImage = async (req, res) => {
    try {
        const offerId = req.params.offerId;
        const imageData = req.file.path;

        const offer = await Offers.findOne({
            where: { id: offerId }
        });

        if (!offer) {
            return res.status(404).send({ message: 'Offer not found.' });
        }

        // Retrieve the existing objects JSON from the database
        let existingObjects = offer.objects ? JSON.parse(offer.objects) : {};

        // Append the picture field with the uploaded image data
        existingObjects.picture = imageData;

        // Convert the modified objects back to JSON
        const updatedObjects = JSON.stringify(existingObjects);

        // Update the offer's objects field with the modified objects JSON
        await Offers.update({ objects: updatedObjects }, {
            where: { id: offerId }
        });

        res.status(200).send({ message: 'Image uploaded successfully.' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
