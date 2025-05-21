const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

const connectToDB = require("./config/database");
const authRouter = require("./routes/auth");
const bookRouter = require("./routes/book");
const reviewRouter = require("./routes/review");

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", bookRouter);
app.use("/", reviewRouter);

connectToDB().then(() => {
    console.log("Database connection established!");

    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}!`);
    });
}).catch(err => {
    console.log("Database cannot be connected!");
})

