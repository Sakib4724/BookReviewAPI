const express = require("express");
const bookRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { addBook, getBooks, getBookById, searchBooks } = require("../controllers/book");
const { addReview } = require("../controllers/review");

bookRouter.post("/books", userAuth, addBook);
bookRouter.get("/books", getBooks);
bookRouter.get("/books/:id", getBookById);
bookRouter.get("/search", searchBooks);
bookRouter.post("/books/:id/reviews", userAuth, addReview);

module.exports = bookRouter;