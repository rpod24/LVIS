const QaSchema = require("./QA");
const mongoose = require("mongoose");
const auditLogPlugin = require('./_auditLogPlugin');

const TransmitterSchema = new mongoose.Schema(
  {
    facility:    { type: mongoose.Schema.Types.ObjectId, ref: "Facility", required: true },
    room:     { type: mongoose.Schema.Types.ObjectId, required: true },
    serialNumber: String,
    assetTag:    String,
    bracket:     String,
    configured:  Boolean,
    labeled:     Boolean,
    tested:      Boolean,
    qualityAssured: Boolean,
    qa: [QaSchema],
  },
  { timestamps: true }
);
TransmitterSchema.index({ manifest: 1, room: 1 });

module.exports = mongoose.model("Transmitter", TransmitterSchema);
TransmitterSchema.plugin(auditLogPlugin);
