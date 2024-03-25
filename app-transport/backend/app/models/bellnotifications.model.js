module.exports = (sequelize, Sequelize) => {
    const bellnotifications = sequelize.define("bellnotifications", {
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
    return bellnotifications;
};
