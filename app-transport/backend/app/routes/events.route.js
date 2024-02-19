const { events } = require("../models/events.model");


module.exports = app => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    const events = require("../controllers/events.controller")
    var router = require("express").Router();

   
    router.post("/create",events.createEvent);

    app.use('/api/events', router);
};