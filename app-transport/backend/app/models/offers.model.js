module.exports = (sequelize, Sequelize) => {
    const Offers = sequelize.define("offers", {
        objects: {
            type: Sequelize.JSON
        },
        userId:{
            type: Sequelize.STRING
        },
        tripId:{
            type: Sequelize.STRING
        },
        transporterId:{
            type: Sequelize.STRING
        },
        status:{
            type: Sequelize.STRING
        },
       totalWeight:{
            type: Sequelize.NUMBER
        },
        picture:{
            type: Sequelize.JSON
        },
        pictureIds:{
            type: Sequelize.JSON
        },
    });
    return Offers;
};
