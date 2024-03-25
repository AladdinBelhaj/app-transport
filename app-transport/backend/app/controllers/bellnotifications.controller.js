const db = require('../models/index');
const bellnotifications = db.bellnotifications;
const Op = db.Sequelize.Op;


exports.createNotification = async (req, res) => {
    const { userId, message, isRead, date } = req.body;

    try {
        const notification = await bellnotifications.create({
            userId,
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
        const notifications = await bellnotifications.findAll({
            where: {
                userId: id // Assuming 'userId' is the field in your database for the user ID
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

        res.status(200).json({ message: "All bellnotifications deleted successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


exports.updateNotifications = async (req, res) => {
    try {
      const { notifications } = req.body;
  
      // Loop through the notifications and update them in the database
      await Promise.all(
        notifications.map(async (notification) => {
          await bellnotifications.update(
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