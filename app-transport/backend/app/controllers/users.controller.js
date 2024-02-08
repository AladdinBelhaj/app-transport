const db = require('../models/index');
const Role = db.roles;
const Users = db.users;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

exports.signup = async (req, res) => {

    // console.log(res)
    // Save User to Database
    const salt = await bcrypt.genSaltSync(8);
    const password = await req.body.password;

    Users.create({
        fullname: req.body.fullname,
        email: req.body.email,
        password: bcrypt.hashSync(password, salt),
    })
        .then(user => {
            if (req.body.role) {
                Role.findAll({
                    where: {
                        role: {
                            [Op.or]: [req.body.role]
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User registered successfully!with role" });
                    });
                });
                console.log(req.body.role)
            } else {
                user.setRoles([3]).then(() => {
                    res.send({ message: "User registered successfully!" });
                });
            }

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}


exports.signin = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = crypto.Rabbit.decrypt(user.password, config.encryptionKey).toString(crypto.enc.Utf8) === req.body.password;

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        const roles = await user.getRoles();

        const authorities = [];
        const permissionn = [];

        for (let i = 0; i < roles.length; i++) {
            authorities.push(roles[i].role);
            const role = await Role.findOne({
                where: { role: authorities[i] },
                include: Permission, // Include the associated Permission model
            });

            for (let j = 0; j < role.permissions.length; j++) {
                permissionn.push(role.permissions[j].name);
            }
        }

        res.status(200).send({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            adresse: user.adresse,
            governorat: user.governorat,
            pays: user.pays,
            specialty: user.specialty,
            phone: user.phone,
            activ: user.activ,
            zipcode: user.zipcode,
            role: authorities[0],
            accessToken: token,
            picture: user.picture,
            permission: permissionn
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};