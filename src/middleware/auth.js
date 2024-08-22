const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.replace("Bearer ", "")
      : undefined;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Please provide authentication token." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: "No user tied to this authentication token" });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: `Token Expired: ${error.message}` });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: `Invalid Token: ${error.message}` });
    }
    return res.status(401).json({ error: error.message });
  }
};

module.exports = auth;
