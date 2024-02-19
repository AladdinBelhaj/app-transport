module.exports = (sequelize, Sequelize) => {
    const Events = sequelize.define("events", {
        title:{
            type:Sequelize.STRING
        },
        start: {
            type: Sequelize.DATE
        },
        end: {
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