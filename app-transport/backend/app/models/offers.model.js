module.exports = (sequelize, Sequelize) => {
    const Offers = sequelize.define("offers", {
        objects: {
            type: Sequelize.ARRAY
        },
        totalWeight: {
            type: Sequelize.STRING
        },

    });
    return Offers;
};