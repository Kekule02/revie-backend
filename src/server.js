const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./modules/user/user.route");
const apartmentRoute = require("./modules/apartment/apartment.route");
const reviewRoute = require("./modules/review/review.route");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRoute);
app.use("/api/apartment", apartmentRoute);
app.use("/api/reviews", reviewRoute);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `${req.originalUrl} Route cannot be found on the server`,
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected!!");
    app.listen(parseInt(process.env.PORT), () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => console.log("connection failed!"));
