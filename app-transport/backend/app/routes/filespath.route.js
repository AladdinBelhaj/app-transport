const express = require('express');
// const app = express();

function setupStaticRoutes(app) {
    app.use('/app/uploads/images', express.static('./app/uploads/images'));
    app.use('/app/uploads/offers', express.static('./app/uploads/offers'));
}

module.exports = setupStaticRoutes;