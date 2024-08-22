const express = require("express");
const router = express.Router();
const { createApartment, allApartment } = require("./apartment.controller");
const auth = require("../../middleware/auth");

router.post("/create", auth, createApartment);

router.get("/", auth, allApartment);

module.exports = router;
