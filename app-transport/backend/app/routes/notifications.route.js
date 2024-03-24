const { notification } = require("../models/notifications.model");


module.exports = (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    const notifications = require("../controllers/notifications.controller");
    var router = require("express").Router();

    router.post("/create", notifications.createNotification);
    router.get("/", notifications.getNotifications);
    router.delete("/", notifications.deleteAllNotifications);

    app.use("/api/notifications", router);
};
