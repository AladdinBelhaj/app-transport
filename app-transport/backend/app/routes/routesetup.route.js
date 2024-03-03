const usersRoutes = require("./users.route");
const tripsRoutes = require("./trips.route");
const eventsRoutes = require('./events.route')
const offersRoutes = require("./offers.route")
function setupRoutes(app) {
    usersRoutes(app);
    tripsRoutes(app);
    eventsRoutes(app);
    offersRoutes(app);
}


module.exports = setupRoutes;
