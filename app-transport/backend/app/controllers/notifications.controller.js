const db = require('../models/index');
const notifications = db.notifications;
const Op = db.Sequelize.Op;


exports.createNotification = async (req, res) => {
    const { senderId, message, isRead, date } = req.body;

    try {
        const notification = await notifications.create({
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
        const notifications = await notifications.findAll();

        res.status(200).json(notifications);
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

        res.status(200).json({ message: "All notifications deleted successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
