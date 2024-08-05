const { ObjectId } = require("mongodb");

function validateUser(username) {
    if (username == null) {
        throw new Error("Username cannot be empty");
    }

    if (typeof username !== "string") {
        throw new Error("Username should be a string");
    }

    if (username.trim().length < 4) {
        throw new Error("Username should contain at least 4 characters");
    }

    if (!username.match(/^[0-9a-zA-Z]+$/)) {
        throw new Error("Username should contain only alphanumeric characters");
    }
}

function validatePassword(password) {
    if (password == null) {
        throw new Error("Password cannot be empty");
    }

    if (typeof password !== "string") {
        throw new Error("Password should be a string");
    }

    if (password.trim().length < 6) {
        throw new Error("Password should contain at least 6 characters");
    }

    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,50}$/)) {
        throw new Error("Password should contain one uppercase character, one lowercase character, one number, and one special character");
    }
}

function validateId(id) {
    if (!id) {
        throw new Error("You must provide an id to search for");
    }
    if (typeof id !== "string") {
        throw new Error("Id must be a string");
    }
    if (id.trim().length === 0) {
        throw new Error("Id cannot be an empty string or just spaces");
    }
    id = id.trim();
    if (!ObjectId.isValid(id)) {
        throw new Error("Invalid object ID");
    }
}


module.exports = {
    validateId,
    validateUser,
    validatePassword,
};
