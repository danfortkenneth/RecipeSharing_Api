const express = require("express");
const Recipe = require("../models/recipe");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE RECIPE
router.post("/", auth, async (req, res) => {
  try {
    const recipe = new Recipe({ ...req.body, userId: req.user.id });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET ALL RECIPES
router.get("/", async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 });
  res.json(recipes);
});

// GET ONE
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recipe) return res.status(404).json({ message: "Not found" });
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    const result = await Recipe.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;