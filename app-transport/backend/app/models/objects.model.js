module.exports = (sequelize, Sequelize) => {
    const Objects = sequelize.define("objects", {
        name: {
            type: Sequelize.STRING
        },
        length: {
            type: Sequelize.STRING
        },
        width: {
            type: Sequelize.STRING
        },
        height: {
            type: Sequelize.STRING
        },
        weight: {
            type: Sequelize.STRING
        },   
    });
    return Objects;
};