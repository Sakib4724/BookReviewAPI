const Book = require("../models/book");
const Review = require("../models/review");

const addBook = async (req, res) => {
    try {
        const book = new Book({
            ...req.body,
            addedBy: req.user._id
        });

        await book.save();
        res.send("Book added successfully!");
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
}

const getBooks = async (req, res) => {
    try {
        const { author, genre, page = 1, limit = 5 } = req.query;
        const query = {};

        if (author) {
            query.author = new RegExp(author, 'i');
        }

        if (genre) {
            query.genre = genre;
        }

        const books = await Book.find(query).skip((page - 1) * limit).limit(+limit);
        res.send("Books: " + books);
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            throw new Error("Invalid book id!");
        }

        const reviews = await Review.find({ book: req.params.id }).populate('user', 'emailId');
        const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);
        res.json({ ...book.toObject(), avgRating, reviews });
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
};

const searchBooks = async (req, res) => {
    try {
        const { q } = req.query;
        const regex = new RegExp(q, 'i');
        const books = await Book.find({ $or: [{ title: regex }, { author: regex }] });

        res.send("Books: " + books);
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
};

module.exports = {
    addBook,
    getBooks,
    getBookById,
    searchBooks,
}