const mongoose = require("mongoose")
const newsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },

    title: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true
    },

})

const news = mongoose.model("news_article", newsSchema)
module.exports = news;