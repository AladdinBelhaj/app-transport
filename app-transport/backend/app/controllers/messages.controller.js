const db = require('../models/index');
const Messages = db.messages;
const Op = db.Sequelize.Op;
const config = require("../config/auth.config")


exports.createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;

    try {
        const message = await Messages.create({
            chatId,
            senderId,
            text
        });

        res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.getMessages = async (req, res) => {
    const { chatId } = req.params;

    try {
        const messages = await Messages.findAll({
            where: {
                chatId
            }
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
