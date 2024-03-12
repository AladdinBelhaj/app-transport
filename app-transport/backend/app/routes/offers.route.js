
module.exports = app => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    const offers = require("../controllers/offers.controller")
    var router = require("express").Router();

   
    router.post("/create", offers.createOffer);
    router.get("/:transporterId",offers.getOfferData);
    router.delete("/:offerId", offers.deleteOffer);
    router.put("/:offerId", offers.updateOffer);

    app.use('/api/offers', router);
};