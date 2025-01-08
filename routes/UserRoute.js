const express = require("express");
const { findAll, save, findbyId, deletebyId, update } = require("../controller/UserController");
const UserValidation = require("../validation/UserValidation");
const router = express.Router();
const CustomerValidation = require("../validation/UserValidation")


router.get("/", findAll);
router.post("/", UserValidation, save);
router.get("/:id", findbyId)
router.delete("/:id", deletebyId)
router.put("/:id", update)


module.exports = router; 