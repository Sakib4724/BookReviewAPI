const express = require("express");
const reviewRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { updateReview, deleteReview } = require("../controllers/review");

reviewRouter.put("/reviews/:id", userAuth, updateReview);
reviewRouter.delete("/reviews/:id", userAuth, deleteReview);

module.exports = reviewRouter;