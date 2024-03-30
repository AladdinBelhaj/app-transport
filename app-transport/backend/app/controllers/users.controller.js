const db = require('../models/index');
const Role = db.roles;
const Users = db.users;
const Op = db.Sequelize.Op;
const config = require("../config/auth.config")


var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")



const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        cb(null, './app/uploads/images')

    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


exports.upload = multer({
    storage: storage,
    limits: { fileSize: '5242880' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))
        if (mimeType && extname) {
            return cb(null, true)

        } else {
            return cb('Give proper files formate to upload : jpeg|jpg|png|gif')
        }
    }
}).single('picture')

exports.signup = async (req, res) => {

    // console.log(res)
    // Save User to Database
    const salt = await bcrypt.genSaltSync(8);
    const password = await req.body.password;

    Users.create({
        fullname: req.body.fullname,
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(password, salt),
        isFirstLogin: "1",
        picture: "app/uploads/images/default.png"
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
        const salt = await bcrypt.genSaltSync(8);
        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }


        const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
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



        // const response = NextResponse.json({
        //     message:"Success login!",
        //     success:true
        // })

        // response.cookies().set("authToken", token,{
        //     expiresIn:"1d",
        //     httpOnly:false
        // });


        // const authorities = [];
        // const permissionn = [];

        // for (let i = 0; i < roles.length; i++) {
        //     authorities.push(roles[i].role);
        //     const role = await Role.findOne({
        //         where: { role: authorities[i] },
        //         include: Permission, // Include the associated Permission model
        //     });

        //     for (let j = 0; j < role.permissions.length; j++) {
        //         permissionn.push(role.permissions[j].name);
        //     }
        // }

        res.status(200).send({
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            role: user.role,
            accessToken: token,
            picture: user.picture,
            isFirstLogin: user.isFirstLogin

        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getUserData = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming the user ID is passed as a parameter in the URL

        // Retrieve the user data from the database
        const user = await Users.findOne({
            where: { id: userId },
            include: Role
        });

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        // Return the user data
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateUserData = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await Users.findOne({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const updatedFields = {};
        if (req.body.fullname) {
            updatedFields.fullname = req.body.fullname;
        }
        if (req.body.email) {
            updatedFields.email = req.body.email;
        }
        if (req.body.phone) {
            updatedFields.phone = req.body.phone;
        }

        if (req.body.isFirstLogin) {
            updatedFields.isFirstLogin = req.body.isFirstLogin;
        }

        if (req.body.username) {
            updatedFields.username = req.body.username;
        }
        if (req.body.picture) {
            updatedFields.picture = req.body.picture;
        }
        if (req.body.bio) {
            updatedFields.bio = req.body.bio;
        }

        // Update user data
        await Users.update(updatedFields, {
            where: { id: userId }
        }).then(data => console.log(data));

        // Return a success message
        res.status(200).send({ message: "User data updated successfully." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.uploadImage = async (req, res) => {
    try {
        const userId = req.params.userId;
        const imageData = req.file.path;

        // Find the user by ID
        const user = await Users.findOne({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        // Update the user's picture field with the uploaded image data
        await Users.update({ picture: imageData }, {
            where: { id: userId }
        });

        res.status(200).send({ message: 'Image uploaded successfully.' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};



exports.getUserDataById = async (req, res) => {
    try {
        const transporterId = req.params.transporterId;

        // Retrieve the user data from the database
        const user = await Users.findOne({
            where: { id: transporterId },
        });

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        // Return the user data
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        // Retrieve all users from the database
        const allUsers = await Users.findAll();

        // Check if any users were found
        if (allUsers.length === 0) {
            return res.status(404).send({ message: "No users found." });
        }

        // Return the list of all users
        res.status(200).send(allUsers);
    } catch (err) {
        console.error("Error fetching all users:", err);
        res.status(500).send({ message: "Internal server error." });
    }
};

