const mongoose = require("mongoose");

const FacilitySchema = new mongoose.Schema({
  facilityName: String,
  
  facilityId: { type: String, required: true, unique: true, trim: true },

  address: {
    line1: String,
    city: String,
    state: String,
    zip: String,
    coordinates: {lat: Number, lng: Number},
    country: String,
    timezone: String,
  },

  phone: String,
  contacts: [{ name: String, email: String, phone: String, primary: Boolean }],
  wifi: [{ ssid: String, password: String }],
  website: String,
  notes: [String],

  status: { type: String, default: "Active" },

  product: { code: String, version: String },

  productVersions: {
    transmitter: String,
    CMS: String,
    MED: String,
    Facility: String,
    FacilityProduct: String,
  },

  counts: {
    transmitters: { type: Number, default: 0 },
    sparesTransmitters: { type: Number, default: 0 },
    CMSs: { type: Number, default: 0 },
    headlessCMSs: { type: Number, default: 0 },
    MEDs: { type: Number, default: 0 },
    mounts: { type: Number, default: 0 },
  },

  roomList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  transmitters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transmitter", required: true }],
  CMSs: [{ type: mongoose.Schema.Types.ObjectId, ref: "CMS", required: true }],
  MEDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "MED", required: true }],
  locations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true }],

  manifest: { type: mongoose.Schema.Types.ObjectId, ref: "Manifest"},
});
module.exports = mongoose.model("Facility", FacilitySchema);
