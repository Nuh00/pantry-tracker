const express = require("express");

const {
  createPantryItem,
  deletePantryItem,
  getPantryItem,
  getPantryItems,
} = require("../controllers/pantryControllers");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getPantryItems);

router.get("/:id", getPantryItem);

router.post("/", createPantryItem);

router.delete("/:id", deletePantryItem);

module.exports = router;
