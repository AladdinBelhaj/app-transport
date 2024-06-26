
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

   
    // router.post("/create", verifyTrip.checkDuplicateTrip, trips.createTrip);
    router.post("/create", trips.createTrip);
    router.get("/:transporterId",trips.getTripData);
    router.get("/single/:id",trips.getSingleTripData);
    router.put("/:tripId", trips.updateTripData);
    router.delete("/:tripId", trips.deleteTrip);
    router.get('/', trips.getAllTrips);


    app.use('/api/trips', router);
};