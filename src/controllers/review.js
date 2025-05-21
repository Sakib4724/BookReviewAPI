const Review = require("../models/review");

const addReview = async (req, res) => {
    try {
        const review = new Review({
            ...req.body,
            book: req.params.id,
            user: req.user._id
        });

        await review.save()
        res.send("Review added successfully!");
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
};

const updateReview = async (req, res) => {
    try {
        const review = await Review.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );

        if (!review) {
            throw new Error("Review not found!");
        }

        res.send("Review updated successfully!");
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
}

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!review) {
            throw new Error("Review not found!");
        }

        res.send("Review deleted successfully!");
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
}

module.exports = {
    addReview,
    updateReview,
    deleteReview
}