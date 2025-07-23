const mongoose = require("mongoose");
const QaSchema = require("./QA");
const auditLogPlugin = require('./_auditLogPlugin');

const MedSchema = new mongoose.Schema(
  {
    facility:   { type: mongoose.Schema.Types.ObjectId, ref: "Facility", required: true },
    room:       { type: mongoose.Schema.Types.ObjectId, required: true },

    MEDID:      String,
    assetID:    String,

    configured: Boolean,
    assembled:  Boolean,
    tested:     Boolean,
    labeled:    Boolean,
    qualityAssured: Boolean,

    hwType:     String,
    hwVersion:  String,
    osVersion:  String,
    swVersion:  String,

    completionDue: String,
    qa:         [QaSchema]
  },
  { timestamps: true }
);

// Compound index to ensure no duplicate MED per manifest+room
MedSchema.index({ manifest: 1, room: 1 });

module.exports = mongoose.model("MED", MedSchema);
MedSchema.plugin(auditLogPlugin);
