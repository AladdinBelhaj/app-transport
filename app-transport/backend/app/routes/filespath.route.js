const express = require('express');
// const app = express();

function setupStaticRoutes(app) {
    app.use('/app/uploads/images', express.static('./app/uploads/images'));
}

module.exports = setupStaticRoutes;