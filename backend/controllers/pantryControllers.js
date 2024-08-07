const mongoose = require("mongoose");
const Pantry = require("../models/pantryModel");

// Get all pantry items
const getPantryItems = async (req, res) => {
  try {
    const user_id = req.user._id;
    const pantryItems = await Pantry.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(pantryItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single pantry item
const getPantryItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No pantry item with that id");
    const pantryItem = await Pantry.findById(id);
    if (pantryItem) {
      res.status(200).json(pantryItem);
    } else {
      res.status(404).json({ error: "Pantry item not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// Create a new pantry item
const createPantryItem = async (req, res) => {
  const { name, quantity } = req.body;
  let emptyFields = [];
  if (!name) emptyFields.push("name");
  if (!quantity) emptyFields.push("quantity");
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please provide all the required fields", emptyFields });
  }
  try {
    const user_id = req.user._id;
    const pantryItem = await Pantry.create({
      name,
      quantity,
      user_id,
    });
    res.status(201).json(pantryItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a pantry item
const deletePantryItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No pantry item with that id");
    await Pantry.findOneAndDelete(id);
    res.json({ message: "Pantry item deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = {
  getPantryItems,
  getPantryItem,
  createPantryItem,
  deletePantryItem,
};
