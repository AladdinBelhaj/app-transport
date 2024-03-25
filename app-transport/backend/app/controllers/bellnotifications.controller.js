const db = require('../models/index');
const bellnotifications = db.bellnotifications;
const Op = db.Sequelize.Op;


exports.createNotification = async (req, res) => {
    const { senderId, message, isRead, date } = req.body;

    try {
        const notification = await bellnotifications.create({
            senderId,
            message,
            isRead,
            date
        });

        res.status(200).json(notification);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const bellnotifications = await bellnotifications.findAll();

        res.status(200).json(bellnotifications);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


exports.deleteAllNotifications = async (req, res) => {
    try {
        await Notification.destroy({
            where: {},
            truncate: true
        });

        res.status(200).json({ message: "All bellnotifications deleted successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

