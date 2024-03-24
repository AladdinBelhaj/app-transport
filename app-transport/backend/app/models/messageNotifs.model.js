module.exports = (sequelize, Sequelize) => {
    const MesNotification = sequelize.define("MesNotification", {
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
    return MesNotification;
};
