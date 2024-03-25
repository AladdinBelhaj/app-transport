const { bellnotifications } = require("../models/bellnotifications.model");


module.exports = (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    const bellnotifications = require("../controllers/bellnotifications.controller");
    var router = require("express").Router();

    router.post("/create", bellnotifications.createNotification);
    router.get("/:id", bellnotifications.getNotificationsById);
    router.delete("/", bellnotifications.deleteAllNotifications);

    app.use("/api/bellnotifications", router);
};
