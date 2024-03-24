module.exports = (sequelize, Sequelize) => {
    const notifications = sequelize.define("notifications", {
        senderId: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.STRING
        },
        isRead: {
            type: Sequelize.BOOLEAN
        },
        date: {
            type: Sequelize.DATE
        }
    });
    return notifications;
};
