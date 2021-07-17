const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const jwt = require("jsonwebtoken");

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
      let authenticated = await user.isCorrectPassword(password,user.password);
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

app.listen(process.env.PORT || 8080);
