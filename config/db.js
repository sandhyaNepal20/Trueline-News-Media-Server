const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/db_trueline_news_media_platform");
        console.log("MongoDb connected")

    }
    catch (e) {
        console.log("MongoDb not connected");

    }
}

module.exports = connectDB;