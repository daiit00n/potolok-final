const { validationResult } = require("express-validator");

function createCustomValidatorMiddleware(arr) {
    return arr.concat([
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json(errors.array());
            }
            next();
        },
    ]);
}

module.exports = {
    createCustomValidatorMiddleware
}