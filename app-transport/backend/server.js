const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const initial = require("./app/initial/role.initial")


var corsOptions = {
    origin: "*"
};


app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());


const db = require("./app/models/index");
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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})




