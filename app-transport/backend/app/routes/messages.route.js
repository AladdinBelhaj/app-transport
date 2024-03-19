module.exports = app => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    const messages = require("../controllers/messages.controller")
    var router = require("express").Router();

    router.post("/", messages.createMessage);
    router.get("/:chatId",messages.getMessages);

    app.use('/api/messages', router);
};