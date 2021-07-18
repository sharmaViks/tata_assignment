const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
    meal_id: { type: String, required: true, unique: true },
    meal: { type: String, required: true },
    date: { type: String, required: true },
    calories: { type: String, required: true }
  });
const UserMealsSchema = new mongoose.Schema({
  meals: [MealSchema],
  user: { type: String, required: true }
});

module.exports = mongoose.model("UserMeals", UserMealsSchema);
