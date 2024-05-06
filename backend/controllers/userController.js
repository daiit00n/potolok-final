// userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const {hashPassword, isPasswordValid} = require("../utils/passwordUtils");

const signup = async function (req, res) {
    try {
        const { username, email, password } = req.body;

        const emailAlreadyExists = await User.findOne({ email });
        if (emailAlreadyExists) {
            res.status(409).json({ message: "Данная электронная почта занята." });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await new User({
            username,
            email,
            password: hashedPassword,
        }).save();

        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const login = async function (req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "Неверный логин и пароль" });
        }

        const passwordIsValid = await isPasswordValid(password, user.password);
        if (!passwordIsValid) {
            res.status(404).json({ message: "Неверный логин и пароль" });
        }

        const token = jwt.sign(
            { userId: user._id},
            "secretkey",
            { expiresIn: "12h" }
        );

        res.json({token: token});
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

module.exports = {
    signup,
    login
};
