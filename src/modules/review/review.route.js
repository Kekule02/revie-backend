const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const {
  createReview,
  updateReview,
  getApartmentReview,
  increaseMostHelpfulCount,
} = require("./review.controller.js");

router.post("/:id", auth, createReview);

router.patch("/:id", auth, updateReview);

router.patch("/:id/upvote", auth, increaseMostHelpfulCount);

router.get("/:id", auth, getApartmentReview);

module.exports = router;
