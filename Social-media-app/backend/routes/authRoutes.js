const express = require("express");

const router = express.Router();

const{register, login, getUser, updateProfile} = require("../controllers/authcontroller");

router.post("/register", register);
router.post("/login",login);
router.get("/:id",getUser)
router.put("/update/:id",updateProfile);

module.exports = router;