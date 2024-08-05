const mongoCollections = require("../db/collection");
const userCol = mongoCollections.users;
const { ObjectId } = require("mongodb");
const validator = require("../validator");
const bcrypt = require("bcryptjs");

const createUser = async (
    name,
    username,
    email,
    position,
    contact,
    password
) => {
    const userCollection = await userCol();
    // const hashedPassword = await bcrypt.hash(password, 10);
    const userInfo = {
        name: name,
        username: username,
        email: email,
        password: password,
        position: position,
        contact: contact,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
    };
    const userInserted = await userCollection.insertOne(userInfo);
    if (userInserted.insertedCount == 0) {
        throw "User was not created";
    } else {
        return "User Created Successfully";
    }
};

const getUser = async (username) => {
    const userCollection = await userCol();
    validator.validateUser(username.trim());
    const user = await userCollection.findOne({ username: username });
    if (user) {
        return user;
    } else {
        throw "User Doesn't Exist";
    }
};

const loginUser = async (username, password) => {
    const userCollection = await userCol();
    const user = await userCollection.findOne({ username: username });
    if (!user) {
        throw "User not found";
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw "Invalid credentials";
    }
    const token = jwt.sign(
        { id: user._id, position: user.position },
        "secret",
        { expiresIn: "1h" }
    );
    return { token };
};

const getAllUsersByRole = async (role) => {
    const userCollection = await userCol();
    const users = await userCollection.find({ position: role }).toArray();
    if (users.length == 0) {
        return `No ${role}s Found`;
    }
    return users;
};

module.exports = {
    createUser,
    getUser,
    loginUser,
    getAllUsersByRole,
};
