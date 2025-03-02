const asyncHandler = require("../middleware/async");
const Student = require("../model/student");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Please enter an email" });
  }

  const student = await Student.findOne({ email });

  if (!student) {
    return res.status(400).json({ msg: "User does not exist" });
  }

  const secret = process.env.JWT_SECRET + student.password;
  const token = jwt.sign({ email: student.email, id: student._id }, secret, {
    expiresIn: "15m",
  });

  const resetLink = `http://localhost:3000/api/users/reset-password/${student._id}/${token}`;
  console.log("Reset Link:", resetLink);

  // Nodemailer Transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Fix SSL/TLS issues
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `
          <h2>Password Reset</h2>
          <p>Click the link below to reset your password:</p>
          <a href="${resetLink}" target="_blank">${resetLink}</a>
          <p>This link will expire in 15 minutes.</p>
      `,
  };

  // Send Email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email Error:", error);
      return res.status(500).json({ msg: "Failed to send email", error: error.message });
    }
    console.log("Email sent:", info.response);
    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email!",
    });
  });
});






exports.renderResetPage = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;

  // Find user by ID
  const student = await Student.findById(id);
  if (!student) {
    return res.status(400).json({ msg: "User does not exist" });
  }

  // Verify JWT Token
  const secret = process.env.JWT_SECRET + student.password;
  try {
    const verify = jwt.verify(token, secret);

    // Render EJS file with email
    res.render("index", { email: verify.email });
  } catch (error) {
    return res.status(400).json({ msg: "Invalid or expired token" });
  }
});

const bcrypt = require("bcryptjs"); // Ensure bcrypt is imported

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;
  const { password, "confirm-password": confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  const student = await Student.findOne({ _id: id });

  if (!student) {
    return res.status(400).json({ msg: "User does not exist" });
  }

  const secret = process.env.JWT_SECRET + student.password;

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, secret);
    console.log("Token verified:", decoded);

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    const updateResult = await Student.updateOne({ _id: id }, { $set: { password: hashedPassword } });

    if (updateResult.modifiedCount === 0) {
      throw new Error("Password update failed in database.");
    }

    res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error); // Log the actual error
    res.status(500).json({ msg: "Password reset failed", error: error.message });
  }
});


// @desc    Create new student


exports.register = asyncHandler(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email });
  console.log(req.body);
  if (student) {
    return res.status(400).send({ message: "Student already exists" });
  }


  await Student.create(req.body.data);

  res.status(200).json({
    success: true,
    message: "User created successfully",
  });
});

// @desc   Login student

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body.data;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide a email and password" });
  }

  // Check if student exists
  const student = await Student.findOne({ email }).select("+password+role");
  console.log(student.role)

  if (!student || !(await student.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  sendTokenResponse(student, 200, res, student.role);
});




































// @desc    Get all students


exports.getStudents = asyncHandler(async (req, res, next) => {
  const students = await Student.find({});
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

// @desc    Get single student
// @route   GET /api/v1/students/:id
// @access  Private

exports.getStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res
      .status(404)
      .json({ message: "User not found with id of ${req.params.id}" });
  } else {
    res.status(200).json({
      success: true,
      data: student,
    });
  }
});


//=========================== Searching ===========================

// @desc    Search student by batch
// @route   GET /api/v1/students/search/:batchId
// @access  Private

exports.searchByBatch = asyncHandler(async (req, res, next) => {
  // const students = await Student.find({ batch: req.params.batchId });
  // if (!students) {
  //   return res.status(404).send({ message: "No students found" });
  // }
  // res.status(200).json({
  //   success: true,
  //   count: students.length,
  //   data: students,
  // });

  const batchId = req.params.batchId;
  // dont show password

  Student.find({ batch: batchId })
    .populate("batch", "-__v")
    .populate("course", "-__v")
    .select("-password -__v")
    .then((student) => {
      res.status(201).json({
        success: true,
        message: "List of students by batch",
        data: student,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err,
      });
    });
});

// @desc    Search student by course
// @route   GET /api/v1/students/search/:courseId
// @access  Private

exports.searchByCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;

  Student.find({
    course: {
      $elemMatch: {
        $eq: { _id: courseId },
      },
    },
  })
    .select("-password -__v")
    .populate("batch", "-__v")
    .populate("course", "-__v")
    .then((student) => {
      res.status(201).json({
        success: true,
        message: "List of students by course",
        data: student,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err,
      });
    });
});

// @desc    Update student
// @route   PUT /api/v1/students/:id
// @access  Private

exports.updateStudent = asyncHandler(async (req, res, next) => {
  const user = req.body;
  const student = await Student.findByIdAndUpdate(req.params.id, user, {
    new: true,
    runValidators: true,
  });

  if (!student) {
    return res.status(404).send({ message: "Student not found" });
  }

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student,
  });
});

// Get current user
// @route   GET /api/v1/students/me
// @access  Private

exports.getMe = asyncHandler(async (req, res, next) => {
  // Show current user and don't show the password
  const student = await Student.findById(req.user.id).select("-password");

  res.status(200).json(student);
});

// @desc    Delete student
// @route   DELETE /api/v1/students/:id
// @access  Private

exports.deleteStudent = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  Student.findByIdAndDelete(req.params.id)
    .then((student) => {
      if (student != null) {
        var imagePath = path.join(
          __dirname,
          "..",
          "public",
          "uploads",
          student.image
        );

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.log(err);
          }
          res.status(200).json({
            success: true,
            message: "Student deleted successfully",
          });
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Student not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
});

// @desc Upload Single Image
// @route POST /api/v1/auth/upload
// @access Private

exports.uploadImage = asyncHandler(async (req, res, next) => {
  // // check for the file size and send an error message
  // if (req.file.size > process.env.MAX_FILE_UPLOAD) {
  //   return res.status(400).send({
  //     message: `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
  //   });
  // }

  if (!req.file) {
    return res.status(400).send({ message: "Please upload a file" });
  }
  res.status(200).json({
    success: true,
    data: req.file.filename,
  });
});

const sendTokenResponse = (student, statusCode, res, role) => {
  const token = student.getSignedJwtToken(); // Generate JWT Token

  const options = {
    // Cookie will expire in 30 days
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true, // Ensures cookie can't be accessed via JavaScript
  };

  // Use secure cookies only in production
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
    options.sameSite = "None"; // Required for cross-origin cookies in HTTPS
  }

  // Create cookie and send response
  res
    .status(statusCode)
    .cookie("token", token, options) // Set cookie
    .json({
      success: true,
      token, // Return token in JSON as well
      user: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        role: student.role,
      },
    });
};


