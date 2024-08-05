const data = require("../data");
const userData = data.user;
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { getUser } = require("../data/user");
const taskFunctions = require("../data/task");
const multer = require("multer");
const path = require("path");
const { userInfo } = require("os");

//REGISTER Route
router.post("/register", async (req, res, next) => {
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const position = req.body.position;
    const contact = req.body.contact;
    //   let contact1 = parseInt(contact);
    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create user in database
        const createdUserData = await userData.createUser(
            name,
            username,
            email,
            position,
            contact,
            hashedPassword
        );

        // Generate and sign JWT token
        const token = jwt.sign({ username }, process.env.JWT_SECRET);
        // Return success response with JWT token
        res.status(200).json({ createdUserData, token });
    } catch (e) {
        res.status(404).json({ error: `Failed to Register: ${e}` });
    }
});

//LOGIN Route
router.post("/login", async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const userinfo = await userData.getUser(username);
        if (!userinfo) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        position = userinfo.position;
        id = userinfo._id.toString();
        const passwordMatches = await bcrypt.compare(
            password,
            userinfo.password
        );
        if (!password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ username }, process.env.JWT_SECRET);
        res.status(200).json({ id, position, token });
    } catch (e) {
        res.status(404).json({ error: `Failed to: ${e}` });
    }
});

//LOGOUT Route
router.post("/logout", async (req, res) => {
    res.clearCookie("jwt");
    res.status(200).send({ message: "Logged out successfully" });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });

// Create a new task
router.post("/tasks", upload.single("file"), async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const dueDate = req.body.dueDate;
        const adminid = req.body.id;
        const assignedTo = req.body.assignedTo;
        const file = req.file ? req.file.filename : null;
        const result = await taskFunctions.createTask(
            title,
            description,
            dueDate,
            adminid,
            assignedTo,
            file
        );
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a task
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const result = await taskFunctions.deleteTask(id);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Edit a task
router.patch("/edit/:id", upload.single("file"), async (req, res) => {
    try {
        const updates = req.body;
        if (req.file) {
            updates.file = req.file.filename;
        }
        const result = await taskFunctions.editTask(req.params.id, updates);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Mark a task as done
router.patch("/markdone/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await taskFunctions.markDoneTask(id);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get a task by ID
router.get("/:id", async (req, res) => {
    try {
        const task = await taskFunctions.getTask(req.params.id);
        res.status(200).send(task);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all tasks
router.post("/gettask", async (req, res) => {
    try {
        const tasks = await taskFunctions.getAllTasks();
        res.status(200).send(tasks);
    } catch (err) {
        res.status(400).send(err);
    }
});
router.post("/getcompletedtask", async (req, res) => {
    try {
        const tasks = await taskFunctions.getCompletedTasks();
        res.status(200).send(tasks);
    } catch (err) {
        res.status(400).send(err);
    }
});

//Get non admin users
router.post("/getnonadmin", async (req, res) => {
    try {
        const users = await userData.getAllUsersByRole("user");
        res.status(200).send(users);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
