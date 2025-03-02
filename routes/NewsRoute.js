const express = require("express");
const { findAll, save, findbyId, deletebyId, update, findByCategory } = require("../controller/NewsController");
const router = express.Router();


const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'news_image')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

router.get("/getAll", findAll);
router.post("/save", upload.single('file'), save);
router.get("/:id", findbyId)
router.delete("/:id", deletebyId)
router.put("/:id", update)
router.get("/category/:categoryId", findByCategory);


module.exports = router;