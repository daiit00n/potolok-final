const { body } = require('express-validator');
const { createCustomValidatorMiddleware } = require("./general.validator.js");

const title = body("title")
    .exists()
    .withMessage("Поле title обязательна!")
    .isString()
    .withMessage("Поле title должно быть строкой!");

const description = body("description")
    .exists()
    .withMessage("Поле description обязательна!")
    .isString()
    .withMessage("Поле description должно быть строкой!");

const price = body("price")
    .exists()
    .withMessage("Поле price обязательна!")
    .isNumeric()
    .withMessage("Поле price должно быть числом!")

const location = body("location")
    .exists()
    .withMessage("Поле location обязательна!")
    .isString()
    .withMessage("Поле location должно быть строкой!")

const houseValidator = createCustomValidatorMiddleware([
    title,
    description,
    price,
    location
]);

module.exports = {
    houseValidator
}