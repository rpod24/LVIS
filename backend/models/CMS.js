const mongoose = require("mongoose");
const QaSchema = require("./QA");
const auditLogPlugin = require('./_auditLogPlugin');

const CmsSchema = new mongoose.Schema(
  {
    facility:        { type: mongoose.Schema.Types.ObjectId, ref: "Facility", required: true },
    room: { type: String },
    CMSID:           String,
    assetID:         String,
    wifiMacAddress:  String,
    ethernetMacAddress: String,
    frequency:       String,
    configured:      Boolean,
    assembled:       Boolean,
    tested:          Boolean,
    labeled:         Boolean,
    qualityAssured:  Boolean,
    qa:              [QaSchema]
  },
  { timestamps: true }
);

CmsSchema.index({ manifest: 1, room: 1 });

module.exports = mongoose.model("CMS", CmsSchema);
CmsSchema.plugin(auditLogPlugin);
