// backend/models/CmsConfiguration.js
const mongoose = require("mongoose");

const cmsConfigurationSchema = new mongoose.Schema({
  facility: { type: mongoose.Schema.Types.ObjectId, ref: "Facility", required: true },
  macAddress: { type: String, required: true },
  IP: { type: String, required: true },
  wifiSSID: { type: String },
  wifiPassword: { type: String },
  mqttBroker: { type: String },
  mqttPort: { type: Number },
  mqttUsername: { type: String },
  mqttPassword: { type: String },
  ftpServer: { type: String },
  ftpUsername: { type: String },
  ftpPassword: { type: String },
  timeZone: { type: String },
  adminPassword: { type: String },
  firmwareVersion: { type: String },
  hardwareVersion: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("CmsConfiguration", cmsConfigurationSchema);
