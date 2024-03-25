const usersRoutes = require("./users.route");
const tripsRoutes = require("./trips.route");
const eventsRoutes = require('./events.route')
const offersRoutes = require("./offers.route")
const chatsRoutes = require("./chats.route");
const messagesRoutes = require("./messages.route");
const notificationsRoutes = require("./notifications.route");
const bellnotificationsRoutes = require("./bellnotifications.route");

function setupRoutes(app) {
    usersRoutes(app);
    tripsRoutes(app);
    eventsRoutes(app);
    offersRoutes(app);
    chatsRoutes(app);
    messagesRoutes(app);
    notificationsRoutes(app);
    bellnotificationsRoutes(app);
}


module.exports = setupRoutes;
