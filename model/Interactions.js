const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema({
    articleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NewsArticle", // Reference to the NewsArticle model
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true
    },
    interactionType: {
        type: String,
        required: true // Example: "like", "share"
    },
    interactedAt: {
        type: Date,
        default: Date.now
    }
});

const Interaction = mongoose.model("Interaction", interactionSchema);
module.exports = Interaction;
