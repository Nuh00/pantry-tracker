const express = require("express");

const { loginUser, registerUser } = require("../controllers/userControllers");

const router = express.Router();

// login rout
router.post("/login", loginUser);

// register route
router.post("/register", registerUser);

module.exports = router;
