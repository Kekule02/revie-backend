const Review = require("../../models/review.model.js");
const Apartment = require("../../models/apartment.model.js");

const createReview = async (req, res) => {
  try {
    const apartmentId = req.params.id;
    const apartment = Apartment.findById(apartmentId);
    if (!apartment) {
      return res.status(404).json({ error: "Apartment not found" });
    }

    const review = new Review({
      ...req.body,
      userId: req.user.id,
      apartmentId,
    });

    await review.save();
    res.status(200).json({ message: "Review upload complete!", review });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    await Review.findByIdAndUpdate(reviewId, req.body);

    const updatedReview = await Review.findById(reviewId);
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getApartmentReview = async (req, res) => {
  try {
    const apartmentId = req.params.id;
    const { sortBy = "mostHelpful" } = req.query;

    let sortCriteria;
    if (sortBy === "mostHelpful") {
      sortCriteria = { reviewHelpfulCount: -1 };
    } else {
      sortCriteria = { createdAt: -1 };
    }

    const reviews = await Review.find({ apartmentId }).sort(sortCriteria);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const increaseMostHelpfulCount = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);
    review.reviewHelpfulCount += 1;

    await review.save();
    res.status(200).json({ message: "Done!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  updateReview,
  getApartmentReview,
  increaseMostHelpfulCount,
};
