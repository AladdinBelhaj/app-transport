const db = require("../models/index");
const Role = db.roles;

function initial() {
    try {
        Role.create({
            id: 1,
            role: "admin"
        });

        Role.create({
            id: 2,
            role: "transporter"
        });

        Role.create({
            id: 3,
            role: "client"
        });
    } catch (error) {
        console.error(`error submit roles : ${error}`)
    }

}

module.exports = initial;