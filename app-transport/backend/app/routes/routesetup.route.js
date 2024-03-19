const usersRoutes = require("./users.route");
const tripsRoutes = require("./trips.route");
const eventsRoutes = require('./events.route')
const offersRoutes = require("./offers.route")
const chatsRoutes = require("./chats.route");

function setupRoutes(app) {
    usersRoutes(app);
    tripsRoutes(app);
    eventsRoutes(app);
    offersRoutes(app);
    chatsRoutes(app);
}


module.exports = setupRoutes;
