const {verifyTrip} = require("../middleware")



module.exports = app => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    const trips = require("../controllers/trips.controller")
    var router = require("express").Router();

   
    router.post("/create", verifyTrip.checkDuplicateTrip, trips.createTrip);

    app.use('/api/trips', router);
};