module.exports = (sequelize, Sequelize) => {
    const Offers = sequelize.define("offers", {
        objects: {
            type: Sequelize.JSON // Using JSON data type for objects
        },
        userId:{
            type: Sequelize.STRING
        }
    });
    return Offers;
};
