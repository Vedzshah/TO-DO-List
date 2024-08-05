const taskRoute = require("./tasks");
const constructorMethod = (app)=>{
    app.use("/",taskRoute);
    app.use("*", async (req, res) => {
        res.status(404).json({ error: "Page Not found!" });
    });
};

module.exports = constructorMethod;