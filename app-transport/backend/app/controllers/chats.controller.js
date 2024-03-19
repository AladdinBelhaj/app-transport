const db = require('../models/index');
const Chats = db.chats;
const Op = db.Sequelize.Op;
const config = require("../config/auth.config")




exports.createChat = async (req, res) => {
    const { firstId, secondId } = req.body;

    try {
        // Check if a chat with the given members already exists
        const chat = await Chats.findOne({
            where: {
                members: {
                    [Op.or]: [
                        { [Op.like]: `%${firstId},%${secondId}%` }, // Check if firstId,secondId pattern exists
                        { [Op.like]: `%${secondId},%${firstId}%` } // Check if secondId,firstId pattern exists
                    ]
                }
            }
        });

        if (chat) {
            return res.status(200).json(chat);
        }

        // If chat doesn't exist, create a new one
        const newChat = await Chats.create({
            members: `${firstId},${secondId}` // Store members as a comma-separated string
        });

        res.status(200).json(newChat);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


exports.findUserChats = async (req, res) => {
    const userId = req.params.userId;

    try {
        const chats = await Chats.findAll({
            where: {
                members: {
                    [Op.like]: `%${userId}%` // Check if userId exists in the members string
                }
            }
        });
        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};




exports.findChat = async (req, res) => {
    const { firstId, secondId } = req.params;

    try {
        const chat = await Chats.findOne({
            where: {
                members: {
                    [Op.or]: [
                        { [Op.like]: `%${firstId},%${secondId}%` }, // Check if firstId,secondId pattern exists
                        { [Op.like]: `%${secondId},%${firstId}%` } // Check if secondId,firstId pattern exists
                    ]
                }
            }
        });

        res.status(200).json(chat);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
