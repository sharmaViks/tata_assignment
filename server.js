const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/User.js");

const app = express();


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
    return res.status(500).send({ message: "InternalPlease try again." });
  }
});

app.listen(process.env.PORT || 8080);
