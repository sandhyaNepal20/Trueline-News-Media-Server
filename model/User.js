const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        rewuired: true
    },
    username: {
        type: String,
        rewuired: true
    },
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("users", userSchema)
module.exports = User;