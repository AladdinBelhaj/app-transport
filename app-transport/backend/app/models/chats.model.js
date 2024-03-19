module.exports = (sequelize, Sequelize) => {
    const Chats = sequelize.define("chats", {
        members: {
            type: Sequelize.STRING // Store members as a string
        }
    });
    return Chats;
};
