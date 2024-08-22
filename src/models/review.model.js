const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    apartmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartment",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    landlordReviewRating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    landlordReviewNote: {
      type: String,
    },
    environmentReviewRating: {
      type: Number,
      min: 0,
      max: 5,
    },
    environmentReviewNote: {
      type: String,
    },
    amenitiesReviewRating: {
      type: Number,
      min: 0,
      max: 5,
    },
    amenitiesReviewNote: {
      type: String,
    },
    reviewHelpfulCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
