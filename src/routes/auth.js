const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        });

        await user.save();
        res.send("User Added Successfully!");
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId });
        if (!user) {
            throw new Error("Invalid Credentials!");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid Credentials!");
        }

        const token = await user.getJWT();
        res.cookie("token", token, {
            expires: new Date(Date.now() + 24 * 3600000),
        });

        res.send("Login Successfull!");
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

module.exports = authRouter;