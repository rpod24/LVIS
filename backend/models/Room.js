const mongoose = require("mongoose");


const RoomSchema = new mongoose.Schema(
  {
    facility:   { type: mongoose.Schema.Types.ObjectId, ref: "Facility", required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // ← unique per room
    roomNumber:  String,              // “101A”
    floor:       String,              // “3rd”
    wing:        String,              // “South”
    notes:       String,
  },
  { _id: false }
);
module.exports = mongoose.model("Room", RoomSchema);
