const express = require("express");
const app = express();
require("dotenv").config();
const connectToDB = require("./config/database");

const PORT = process.env.PORT || 5000;

connectToDB().then(() => {
    console.log("Database connection established!");

    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}!`);
    });
}).catch(err => {
    console.log("Database cannot be connected!");
})

