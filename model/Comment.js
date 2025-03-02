const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    newsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "news_article"
    },

    content: {
        type: String,
        required: true
    },
    comment_date: {
        type: String,
        required: true
    }
})

const comment = mongoose.model("comments", commentSchema)
module.exports = comment;