module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        fullname: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        picture: {
            type: Sequelize.STRING
        },
        bio: {
            type: Sequelize.STRING
        },
        
        isFirstLogin: {
            type: Sequelize.BOOLEAN
        },
    });
    return Users;
};