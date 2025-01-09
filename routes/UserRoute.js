const express = require("express");
const { findAll, save, findbyId, deletebyId, update } = require("../controller/UserController");
const UserValidation = require("../validation/UserValidation");
const router = express.Router();
const { authenticateToken } = require("../security/Auth");


const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'profile_images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })




router.get("/", authenticateToken, findAll);
router.post("/", upload.single('file'), save);
router.get("/:id", authenticateToken, findbyId)
router.delete("/:id", deletebyId)
router.put("/:id", update)


module.exports = router; 