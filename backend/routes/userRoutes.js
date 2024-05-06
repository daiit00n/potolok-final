const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const {registerValidator, loginValidator} = require("../validators/authValidator");

router.post('/signup', registerValidator, userController.signup);
router.post("/login", loginValidator, userController.login);

module.exports = router;
