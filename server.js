const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const Meal = require("./models/Meal");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const withAuth = require("./middleware");

const app = express();
const secret = "anysecretkey";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const mongo_uri = "mongodb://localhost:27017/tata_assignment";
mongoose.connect(
  mongo_uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to ${mongo_uri}`);
    }
  }
);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      const _user = new User({ email, password });
      let response = await _user.save();
      if (response) {
        return res.status(200).send({ message: "Registered successfully." });
      } else {
        throw new Error();
      }
    } else {
      return res.status(409).json({ message: "Email already Registered." });
    }
  } catch (err) {
    console.log("error while registering user", err);
    return res
      .status(500)
      .send({ message: "Internal Error. Please try again." });
  }
});

app.post("/api/authenticate", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password",
      });
    } else {
      let authenticated = await user.isCorrectPassword(password, user.password);
      if (authenticated) {
        const payload = { email };
        const token = jwt.sign(payload, secret, {
          expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true }).status(200).send({
          message: "Login successfully.",
        });
      } else {
        return res.status(401).json({
          message: "Incorrect email or password",
        });
      }
    }
  } catch (err) {
    console.log("error while loging user", err);
    return res.status(500).send({ message: "Internal Please try again." });
  }
});

app.get("/api/getMeals", withAuth, async (req, res) => {
  try {
    let user = req.email;
    let meals_data = await Meal.find({ user: user });
    return res.status(200).send({ meals: meals_data });
  } catch (err) {
    console.log("error while getting meals", err);
    return res
      .status(500)
      .send({ message: "Internal Error. Please try again." });
  }
});

app.delete("/api/deleteMeal", withAuth, async (req, res) => {
  try {
    let { meal_id } = req.body;
    if (!meal_id) {
      console.log("Meal Id is required");
      return res
        .status(400)
        .send({ message: "Can't delete at this time. Please try later." });
    } else {
      let response = await Meal.deleteOne({ meal_id: meal_id });
      if (response) {
        return res.status(200).send({ message: "Meal deleted successfully." });
      } else {
        throw new Error();
      }
    }
  } catch (err) {
    console.log("error while deleting meal", err);
    return res
      .status(500)
      .send({ message: "Internal Error. Please try again." });
  }
});

app.post("/api/updateMeal", withAuth, async (req, res) => {
  try {
    let { meal, date, calories, meal_id } = req.body;
    let user = req.email;
    let meal_data = await Meal.findOne({ meal_id });
    if (!meal_data) {
      meal_id = uuidv4();
      const _meal = new Meal({ meal, date, calories, meal_id, user });
      let response = await _meal.save();
      if (response) {
        return res.status(200).send({ message: "Meal added successfully." });
      } else {
        throw new Error();
      }
    } else {
      //Edit meal
      let response = await Meal.updateOne(
        { meal_id: meal_id },
        { meal: meal, date: date, calories: calories }
      );
      if (response) {
        return res.status(200).send({ message: "Meal updated successfully." });
      } else {
        throw new Error();
      }
    }
  } catch (err) {
    console.log("error while adding meal", err);
    return res
      .status(500)
      .send({ message: "Internal Error. Please try again." });
  }
});

app.get("/api/checkToken", withAuth, function (req, res) {
  res.status(200).send({ message: "Token verified successfully." });
});

app.listen(process.env.PORT || 8080);
