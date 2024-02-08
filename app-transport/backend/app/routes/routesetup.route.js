const usersRoutes = require("./users.route");

function setupRoutes(app) {
    usersRoutes(app);
}


module.exports = setupRoutes;
