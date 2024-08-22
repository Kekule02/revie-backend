const mongoose = require("mongoose");
const ApartmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Pleas input your apartment name"],
    trim: true,
  },

  address: {
    type: String,
    required: [true, "Pleas input your address"],
  },

  owner: {
    type: String,
    required: false,
  },
});

const Apartment = mongoose.model("Apartment", ApartmentSchema);

module.exports = Apartment;
