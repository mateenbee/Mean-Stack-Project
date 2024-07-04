const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  assignmentName: { type: String, required: true },
  dueDate: { type: String, required: true },
  grade: String,
});

module.exports = mongoose.model("Assignment", assignmentSchema, "Assignments");
