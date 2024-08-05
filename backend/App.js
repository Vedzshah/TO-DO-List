const express = require('express');
const cors = require('cors');
const app = express();
const configRoutes = require("./routes");
require('dotenv').config({ path: './config.env' });

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
};
app.use(allowCrossDomain);

app.use(require("./routes/tasks"));
configRoutes(app);
// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Your routes will be running on http://localhost:${PORT}`);
});
