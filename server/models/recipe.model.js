const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: { type: String, unique: true },
    description: { type: String },
    ingredients: { type: Array },
    directions: { type: Array },
    serves: { type: Number, required: false },
    userId: { type: String },
    favoritedBy: { type: Array },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
