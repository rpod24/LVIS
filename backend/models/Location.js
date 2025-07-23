const mongoose = require("mongoose");
const auditLogPlugin = require('./_auditLogPlugin');

const LocationSchema = new mongoose.Schema(
  {
    facility:   { type: mongoose.Schema.Types.ObjectId, ref: "Facility", required: true },
    groupID:    String,
    roomID:     String,
    locationID: String,
    locationSN: String,

    hasExtDC:   Boolean,
    hasNC:      Boolean,
    spare:      Boolean,
    portable:   Boolean,

    serviceHistory: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

LocationSchema.index({ manifest: 1, roomID: 1 });

module.exports = mongoose.model("Location", LocationSchema);
LocationSchema.plugin(auditLogPlugin);
