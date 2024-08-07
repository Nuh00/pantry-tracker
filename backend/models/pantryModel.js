const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pantrySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model("Pantry", pantrySchema);
