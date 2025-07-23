const mongoose = require("mongoose");
const auditLogPlugin = require('./_auditLogPlugin');


const RoomSchema = new mongoose.Schema(
  {
    facility:   { type: mongoose.Schema.Types.ObjectId, ref: "Facility", required: true },
    roomNumber:  String,              // “101A”
    group:       String,              // “A” or “B”
    notes:       String,
  },
);
module.exports = mongoose.model("Room", RoomSchema);
RoomSchema.plugin(auditLogPlugin);
