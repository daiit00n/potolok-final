const { body } = require('express-validator');
const { createCustomValidatorMiddleware } = require("./general.validator.js");

const username = body("username")
    .exists()
    .withMessage("Поле username обязательна!")
    .isString()
    .withMessage("Поле username должно быть строкой!");

const email = body("email")
    .exists()
    .withMessage("Поле email обязательна!")
    .isEmail()
    .withMessage("Поле email должно иметь в себе символ `@`!");

const password = body("password")
    .exists()
    .withMessage("Поле password обязательна!")
    .isString()
    .withMessage("Поле password должно быть строкой!")

const registerValidator = createCustomValidatorMiddleware([
    username,
    email,
    password,
]);

const loginValidator = createCustomValidatorMiddleware([
    email,
    password,
]);

module.exports = {
    registerValidator,
    loginValidator
}