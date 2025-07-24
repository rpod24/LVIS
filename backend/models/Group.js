const mongoose = require("mongoose");
const auditLogPlugin = require('./_auditLogPlugin');

const GroupSchema = new mongoose.Schema(
  {
    facility:   { type: mongoose.Schema.Types.ObjectId, ref: "Facility", required: true },
    group:    String,
  },
  { timestamps: true }
);

GroupSchema.index({ manifest: 1, roomID: 1 });

module.exports = mongoose.model("Group", GroupSchema);
GroupSchema.plugin(auditLogPlugin);
