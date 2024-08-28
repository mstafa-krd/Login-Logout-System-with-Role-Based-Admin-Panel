const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    discrption: {
      type: String,
      required: true,
    },
    stats: {
      type: String,
      required: true,
    },
    manager: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const tasks = mongoose.model("tasks", tasksSchema);

module.exports = tasks;
