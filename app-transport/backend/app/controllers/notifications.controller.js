const db = require('../models/index');
const Notification = db.notifications; // Changed variable name to Notification
const Op = db.Sequelize.Op;

exports.createNotification = async (req, res) => {
    const { recepientId, senderId, message, isRead, date } = req.body;

    try {
        const notification = await Notification.create({ // Changed variable name to Notification
            recepientId,
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

exports.getNotificationsById = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters

        // Query the database to find notifications by ID
        const notifications = await Notification.findAll({ // Changed variable name to Notification
            where: {
                recepientId: id // Assuming 'userId' is the field in your database for the user ID
            }
        });

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

exports.updateNotifications = async (req, res) => {
    try {
        const { notifications } = req.body;

        await Promise.all(
            notifications.map(async (notification) => {
                await Notification.update(
                    { isRead: true },
                    { where: { id: notification.id } }
                );
            })
        );

        res.status(200).json({ message: 'Notifications updated successfully' });
    } catch (error) {
        console.error('Error updating notifications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
