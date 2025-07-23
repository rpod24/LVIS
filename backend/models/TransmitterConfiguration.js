// backend/models/TransmitterConfiguration.js
const mongoose = require("mongoose");
const auditLogPlugin = require('./_auditLogPlugin');

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
  location: { type: String },
  manifest: { type: mongoose.Schema.Types.ObjectId, ref: 'Manifest' },
  status: { type: String, enum: ['draft', 'qa', 'prod'], default: 'draft' },
  deploymentDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("TransmitterConfiguration", transmitterConfigurationSchema);
transmitterConfigurationSchema.plugin(auditLogPlugin);
