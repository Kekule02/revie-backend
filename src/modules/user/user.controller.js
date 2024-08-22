const User = require("../../models/user.model.js");
const bcrypt = require("bcrypt");

const userSignUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({
      user,
      message: "Sign-up successfully complete!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  //console.log(user.password);
  if (!user) {
    res.status(404).json({ message: "User not found!" });
  } else {
    const match = await bcrypt.compare(req.body.password, user.password);
    const token = await user.generateAuthToken();
    if (match) {
      res.status(200).json({ message: "Login Successfull!", user, token });
    } else {
      res.status(401).json({ message: "Incorrect Password" });
    }
  }
};

module.exports = {
  userSignUp,
  userLogin,
};
