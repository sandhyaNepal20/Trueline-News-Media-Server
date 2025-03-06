const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, // ✅ Ensures emails are unique
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  image: {
    type: String,
    default: "https://example.com/default-profile.png", // ✅ Default profile image
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: "user", // ✅ Use a meaningful default role
    enum: ["user", "admin"], // ✅ Ensures only valid roles
  },
});

// 🔐 Hash password before saving to database
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 🔑 Generate JWT Token including user details
studentSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
      fullName: this.fullName,
      email: this.email,
      role: this.role,
      image: this.image, // ✅ Include profile image in JWT
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// 🔐 Compare entered password with hashed password
studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🔄 Generate and hash password reset token
studentSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes expiration

  return resetToken;
};

module.exports = mongoose.model("Student", studentSchema);
