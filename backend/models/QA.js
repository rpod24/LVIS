const mongoose = require("mongoose");

const QaSchema = new mongoose.Schema({
  type:     { type: String, enum: ["assemby", "followUp"] },
  items:    [String],
  approvedBy: String,
  date: String,
});
module.exports = QaSchema;
