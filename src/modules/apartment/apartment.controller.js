const Apartment = require("../../models/apartment.model");

const createApartment = async (req, res) => {
  try {
    const apartment = await Apartment.create(req.body);
    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const allApartment = async (req, res) => {
  try {
    const apartments = await Apartment.find({});
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createApartment,
  allApartment,
};
