const bcrypt = require("bcryptjs");

const hashPassword = async function(passwordFromRequest) {
    try {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(passwordFromRequest, salt);
        return password;
    } catch (error) {
        console.log(error);
    }
}

const isPasswordValid = async function(
    passwordFromRequest,
    passwordFromDatabase
) {
    try {
        const passwordIsValid = await bcrypt.compare(
            passwordFromRequest,
            passwordFromDatabase
        );
        return passwordIsValid;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    hashPassword,
    isPasswordValid
}