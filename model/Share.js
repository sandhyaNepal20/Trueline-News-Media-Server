const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema({
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "newsarticles",

    },
    sharedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",

    },
    sharedTo: {
        type: String, // Email, platform name, or user identifier
        required: true,
    },
    platform: {
        type: String, // e.g., "Email", "Facebook", "Twitter", "WhatsApp"
        required: true,
    },
    sharedAt: {
        type: Date,
        default: Date.now,
    },
});

const Share = mongoose.model("shares", shareSchema);
module.exports = Share;
