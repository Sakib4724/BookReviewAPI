const mongoose = require("mongoose");

const connectToDB = async(req, res) => {
    await mongoose.connect(process.env.MONGODB_URI)
};

module.exports = connectToDB;