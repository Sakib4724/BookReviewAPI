const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: string,
        required: true
    },
    author: {
        type: string,
        required: true
    },
    genre: {
        type: string,
        required: true
    },
    addedBy: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);