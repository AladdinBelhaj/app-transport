module.exports = (sequelize, Sequelize) => {
    const Trips = sequelize.define("trips", {
        departCountry: {
            type: Sequelize.STRING
        },
        departState: {
            type: Sequelize.STRING
        },
        destCountry: {
            type: Sequelize.STRING
        },
        desState: {
            type: Sequelize.STRING
        },
        departDate: {
            type: Sequelize.DATE
        },
        arrivDate: {
            type: Sequelize.DATE
        },
        maxWeight: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });
    return Trips;
};