// backend/models/TransmitterConfiguration.js
const mongoose = require("mongoose");

const transmitterConfigurationSchema = new mongoose.Schema({
  facility: { type: mongoose.Schema.Types.ObjectId, ref: "Facility", required: true },
  serialNumber: { type: String, required: true },
  IP: { type: String, required: true },
  channel: { type: String },
  mqttBroker: { type: String },
  mqttPort: { type: Number },
  mqttUsername: { type: String },
  mqttPassword: { type: String },
  firmwareVersion: { type: String },
  hardwareVersion: { type: String },
  location: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("TransmitterConfiguration", transmitterConfigurationSchema);
