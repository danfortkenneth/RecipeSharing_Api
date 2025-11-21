const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title:       { type: String, required: true },
  description: { type: String },
  ingredients: { type: [String], required: true },
  instructions:{ type: String, required: true },
  imageUrl:    { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Recipe", RecipeSchema);