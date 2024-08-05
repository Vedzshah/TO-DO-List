const mongoCollections = require("../db/collection");
const taskCol = mongoCollections.tasks;
const userCol = mongoCollections.users;
const { ObjectId } = require("mongodb");
const validator = require("../validator");

const createTask = async (
    title,
    description,
    dueDate,
    adminid,
    assignedTo,
    file
) => {
    const taskCollection = await taskCol();
    const taskInfo = {
        title: title,
        description: description,
        dueDate: new Date(dueDate),
        file: file || null,
        adminid: adminid,
        assignedTo: assignedTo,
        createdAt: new Date(),
        completedAt: null,
    };
    const taskInserted = await taskCollection.insertOne(taskInfo);
    if (taskInserted.insertedCount === 0) {
        throw "Task was not created";
    }
    return "Task Created Successfully";
};

const deleteTask = async (taskId) => {
    const taskCollection = await taskCol();
    id = new ObjectId(taskId);
    const taskDeleted = await taskCollection.deleteOne({
        _id: id,
    });
    if (taskDeleted.deletedCount === 0) {
        throw "Task was not deleted";
    }
    return "Task Deleted Successfully";
};

const markDoneTask = async (taskId) => {
    const taskCollection = await taskCol();
    id = new ObjectId(taskId);
    let completedDate = new Date();
    updatedInfo = await taskCollection.updateOne(
        { _id: id },
        {
            $set: {
                completedAt: completedDate,
            },
        }
    );
    if (updatedInfo.modifiedCount === 0) {
        throw "Task was not Marked Completed";
    }
    return "Task Marked Completed Successfully";
};

const getCompletedTasks = async () => {
    const taskCollection = await taskCol();
    const userCollection = await userCol();
    const tasks = await taskCollection
        .find({ completedAt: { $ne: null } })
        .toArray();
    if (!tasks || tasks.length === 0) {
        throw "No completed tasks found";
    }
    let output = [];
    for (let task of tasks) {
        const adminIdObject = new ObjectId(task.adminid);
        const userIdObject = new ObjectId(task.assignedTo);
        const adminDocument = await userCollection.findOne({
            _id: adminIdObject,
        });
        if (!adminDocument) {
            throw "Admin not found";
        }
        const userDocument = await userCollection.findOne({
            _id: userIdObject,
        });
        adminName = adminDocument.name;
        assignedName = userDocument.name;
        output.push({
            ...task,
            adminName: adminName,
            assignedName: assignedName,
        });
    }
    return output;
};

const editTask = async (taskId, updates) => {
    const taskCollection = await taskCol();
    validator.validateObjectId(taskId);
    const updatedTaskData = {
        ...updates,
        updatedAt: new Date(),
    };
    const taskUpdated = await taskCollection.updateOne(
        { _id: ObjectId(taskId) },
        { $set: updatedTaskData }
    );
    if (taskUpdated.modifiedCount === 0) {
        throw "Task was not updated";
    }
    return "Task Updated Successfully";
};

const getTask = async (taskId) => {
    const taskCollection = await taskCol();
    const userCollection = await userCol();
    validator.validateObjectId(taskId);
    const task = await taskCollection.findOne({ _id: ObjectId(taskId) });
    let output = [];
    for (let task of tasks) {
        const adminIdObject = new ObjectId(task.adminid);
        const adminDocument = await userCollection.findOne({
            _id: adminIdObject,
        });
        if (!adminDocument) {
            throw "Admin not found";
        }
        adminName = adminDocument.name;
        output.push({
            ...task,
            adminName: adminName,
        });
    }
    if (!output) {
        throw "No tasks found";
    }
    return output;
};

const getAllTasks = async () => {
    const taskCollection = await taskCol();
    const tasks = await taskCollection.find({ completedAt: null }).toArray();
    //find admin based on tasks.adminid
    const userCollection = await userCol();
    let output = [];
    for (let task of tasks) {
        const adminIdObject = new ObjectId(task.adminid);
        const userIdObject = new ObjectId(task.assignedTo);
        const adminDocument = await userCollection.findOne({
            _id: adminIdObject,
        });
        const userDocument = await userCollection.findOne({
            _id: userIdObject,
        });
        if (!adminDocument) {
            throw "Admin not found";
        }
        adminName = adminDocument.name;
        assignedName = userDocument.name;
        output.push({
            ...task,
            adminName: adminName,
            assignedName: assignedName,
        });
    }
    if (!output) {
        throw "No tasks found";
    }
    return output;
};

module.exports = {
    createTask,
    deleteTask,
    editTask,
    getTask,
    getAllTasks,
    markDoneTask,
    getCompletedTasks,
};
