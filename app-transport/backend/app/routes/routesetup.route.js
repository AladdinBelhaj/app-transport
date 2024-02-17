const usersRoutes = require("./users.route");
const tripsRoutes = require("./trips.route")
function setupRoutes(app) {
    usersRoutes(app);
    tripsRoutes(app);
}


module.exports = setupRoutes;
