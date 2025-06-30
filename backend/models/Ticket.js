const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    facility: { type: mongoose.Schema.Types.ObjectId, ref: "Facility", required: true },
    title:    { type: String,  required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true },
    product:  { type: String, enum: ["REA", "LinQvue"], required: true },
    productVersion: {
      type: String,
      validate: {
        validator(v) {
          // allow 1, 1.5, 2, 1a etc.
          return /^[0-9]+(\.[0-9]+)?[A-Za-z]?$/.test(v);
        },
        message: "Invalid product version"
      },
      required: true
    },
    priority: { type: String, enum: ["low", "normal", "high"], default: "normal" },
    status:   { type: String, enum: ["open", "pending", "closed"], default: "open" },
    contactPhone: {
      type: String,
      validate: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);