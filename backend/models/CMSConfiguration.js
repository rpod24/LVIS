// backend/models/CmsConfiguration.js
const mongoose = require("mongoose");
const auditLogPlugin = require('./_auditLogPlugin');

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
  manifest: { type: mongoose.Schema.Types.ObjectId, ref: 'Manifest' },
  status: { type: String, enum: ['draft', 'qa', 'prod'], default: 'draft' },
  deploymentDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("CmsConfiguration", cmsConfigurationSchema);
cmsConfigurationSchema.plugin(auditLogPlugin);
