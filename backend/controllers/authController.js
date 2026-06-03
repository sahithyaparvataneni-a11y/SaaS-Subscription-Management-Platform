const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// ========================
// Register User
// ========================

exports.registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });
        }

        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                if (result.length > 0) {

                    return res.status(400).json({
                        message: "Email already exists"
                    });
                }

                const hashedPassword =
                    await bcrypt.hash(password, 10);

                db.query(
                    "INSERT INTO users(name,email,password) VALUES(?,?,?)",
                    [
                        name,
                        email,
                        hashedPassword
                    ],
                    (err, result) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        res.status(201).json({
                            message: "User Registered Successfully"
                        });

                    }
                );

            }
        );

    } catch (error) {

        res.status(500).json(error);

    }

};



// ========================
// Login User
// ========================

exports.loginUser = (req, res) => {

    const {
        email,
        password
    } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {

                return res.status(500).json(err);
            }

            if (result.length === 0) {

                return res.status(404).json({
                    message: "User Not Found"
                });
            }

            const user = result[0];

            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!isMatch) {

                return res.status(400).json({
                    message: "Invalid Password"
                });
            }

            const token =
                jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                        role: user.role
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1d"
                    }
                );

            res.status(200).json({

                message: "Login Successful",

                token,

                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }

            });

        }
    );

};