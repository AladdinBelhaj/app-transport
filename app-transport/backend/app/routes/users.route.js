const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");

module.exports = app => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    const users = require("../controllers/users.controller");
    var router = require("express").Router();


    router.post("/create", verifySignUp.checkDuplicateEmail, users.signup);
    router.post("/auth",users.signin);
    router.get("/:userId",users.getUserData);
    router.put("/:userId",users.updateUserData);
    router.put("/imageData/:userId",users.upload,users.uploadImage)
    router.get("/transporters/:transporterId",users.getUserDataById);

    app.use('/api/users', router);
};