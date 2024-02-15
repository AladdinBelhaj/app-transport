const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const initial = require("./app/initial/role.initial")
const stripe = require("./app/routes/stripe.route");

var corsOptions = {
    origin: "*"
};


app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());


const db = require("./app/models/index");
const setupRoutes = require("./app/routes/routesetup.route");
const setupStaticRoutes = require("./app/routes/filespath.route");
// db.sequelize.sync()


// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// initial();
//   });

// db.sequelize.sync({ alter: true }).then(() => {
//     console.log("Drop and re-sync db.");
//     initial();
// });

app.get('/', (req, res) => {
    res.send('Hello Express');
});

setupRoutes(app);
setupStaticRoutes(app);
app.use("/api/stripe", stripe);



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})




