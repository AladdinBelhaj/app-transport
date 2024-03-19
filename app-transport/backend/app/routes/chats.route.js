module.exports = app => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    const chats = require("../controllers/chats.controller")
    var router = require("express").Router();

    router.post("/",chats.createChat);
    router.get("/:userId",chats.findUserChats);
    router.get("/find/:firstId/:secondId", chats.findChat)

    app.use('/api/chats', router);
};