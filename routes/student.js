const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const upload = require("../middleware/uploads");

const {
  getStudents,
  getStudent,
  register,
  login,
  forgotPassword,
  renderResetPage,
  resetPassword,
  searchByBatch,
  searchByCourse,
  updateStudent,
  deleteStudent,
  uploadImage,
  getMe,
} = require("../controller/student");

router.post("/uploadImage", upload, uploadImage);
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:id/:token", renderResetPage);
router.post("/reset-password/:id/:token", resetPassword);
router.get("/getAllStudents", protect, getStudents);
router.get("/getStudentsByBatch/:batchId", protect, searchByBatch);
router.get("/getStudentsByCourse/:courseId", protect, searchByCourse);
router.put("/updateStudent/:id", protect, updateStudent);
router.delete("/deleteStudent/:id", protect, deleteStudent);
router.get("/getMe", protect, getMe);

module.exports = router;