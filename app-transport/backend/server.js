// const express = require("express");
// const cors = require("cors");
// const app = express();
// const bodyParser = require("body-parser");
// const initial = require("./app/initial/role.initial")
// const stripe = require("./app/routes/stripe.route");

// var corsOptions = {
//     origin: "*"
// };


// app.use(cors(corsOptions));

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json());



// const db = require("./app/models/index");
// const setupRoutes = require("./app/routes/routesetup.route");
// const setupStaticRoutes = require("./app/routes/filespath.route");
// // db.sequelize.sync()


// // db.sequelize.sync({ force: true }).then(() => {
// //     console.log("Drop and re-sync db.");
// // initial();
// //   });

// // db.sequelize.sync({ alter: true }).then(() => {
// //     console.log("Drop and re-sync db.");
// //     initial();
// // });

// app.get('/', (req, res) => {
//     res.send('Hello Express');
// });

// setupRoutes(app);
// setupStaticRoutes(app);
// app.use("/api/stripe", stripe);



// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// })


const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const http = require("http"); // Require HTTP module for socket.io
const socketIo = require("socket.io"); // Require socket.io module

// Configure CORS
// const corsOptions = {
//     origin: "*"
// };
// app.use(cors(corsOptions));
app.use(cors({ origin: 'http://localhost:3000' }));
// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import database and routes setup
const db = require("./app/models/index");
const setupRoutes = require("./app/routes/routesetup.route");
const setupStaticRoutes = require("./app/routes/filespath.route");
const stripe = require("./app/routes/stripe.route");

// Create HTTP server
const server = http.createServer(app);

// Initialize socket.io

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
// Handle socket connections
io.on("connection", (socket) => {
    console.log("A user connected"); // Log when a user connects

    // Example: Send a notification to the client
    socket.emit("notification", "Welcome to the socket server");

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Setup routes
app.get('/', (req, res) => {
    res.send('Hello Express');
});
setupRoutes(app);
setupStaticRoutes(app);
app.use("/api/stripe", stripe);

// Set up server to listen on specified port
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
