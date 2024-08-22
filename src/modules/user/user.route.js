const express = require("express");
const router = express.Router();
const { userSignUp, userLogin } = require("./user.controller.js");

router.post("/sign-up", userSignUp);

router.post("/login", userLogin);

module.exports = router;
