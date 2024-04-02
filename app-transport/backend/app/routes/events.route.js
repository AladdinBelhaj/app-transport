const { events } = require("../models/events.model");
const {verifyEvent} = require("../middleware");

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

   
    router.post("/create",verifyEvent.checkDuplicateEvent,events.createEvent);
    router.get("/:transporterId",events.getEventsData);
    router.put("/:eventId", events.updateEventData);
    router.delete("/:eventId", events.deleteEvent);
    router.get('/', events.getAllEvents);
    app.use('/api/events', router);
};