module.exports = (sequelize, Sequelize) => {
    const Events = sequelize.define("events", {
        departDate: {
            type: Sequelize.DATE
        },
        arrivDate: {
            type: Sequelize.DATE
        },
        transporterId:{
            type: Sequelize.STRING
        },
        resourceId:{
            type: Sequelize.STRING
        },
    });
    return Events;
};