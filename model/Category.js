const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        rewuired: true
    }
})

const category = mongoose.model("categories", categorySchema)
module.exports = category;