module.exports = (sequelize, Sequelize) => {
    const Messages = sequelize.define("messages", {
        chatId:{
            type:Sequelize.STRING
        },
        senderId: {
            type: Sequelize.STRING
        },
        text: {
            type: Sequelize.STRING
        },
    });
    return Messages;
};