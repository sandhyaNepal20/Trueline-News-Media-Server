const mongoose = require("mongoose")
const newsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    cateoriesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const news = mongoose.model("news_article", newsSchema)
module.exports = news;