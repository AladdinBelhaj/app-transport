const usersRoutes = require("./users.route");
const tripsRoutes = require("./trips.route");
const eventsRoutes = require('./events.route')
function setupRoutes(app) {
    usersRoutes(app);
    tripsRoutes(app);
    eventsRoutes(app);
}


module.exports = setupRoutes;
