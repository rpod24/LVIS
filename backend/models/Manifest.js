const mongoose = require("mongoose");
const Facility = require("./Facility"); // Make sure this path is correct
const Room = require("./Room");
const CMS = require("./CMS");
const Transmitter = require("./Transmitter");
const auditLogPlugin = require("./_auditLogPlugin");

const ManifestSchema = new mongoose.Schema(
  {
    facility: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility",
      required: true,
    },
    stage: {
      type: String,
      enum: ["new", "assembly", "shipping"],
      default: "new",
    },

    // core dates
    installationDate: String,
    stagingDeadline: String,
    assemblyDeadline: String,
    shippingDate: String,

    manifestProduct: String,
    manifestVersion: Number,

    status: { type: String, enum: ["draft", "qa", "prod"], default: "draft" },
    deploymentDate: { type: Date },

    contractInfo: {
      vent: String,
      rent: Boolean,
      installationDates: {
        start: String,
        end: String,
      },
      warrentyEnd: String,
      rentalEnd: String,
      endOfFirmco: String,
      endOfServiceContract: String,
      owner: String,
      contractWith: String,
      contractSigned: Boolean,
    },
  },
  { timestamps: true }
);

ManifestSchema.statics.createWithFacility = async function (payload) {
  // 1 ── upsert / fetch facility
  let facility = await Facility.findOne({ facilityId: payload.facility.facilityId });
  if (!facility) {
    facility = new Facility({
      facilityName: payload.facility.facilityName,
      facilityId: payload.facility.facilityId,
      address: payload.facility.address || {},
      phone: payload.facility.phone,
      status: "Active",
    });
    await facility.save();
  }

  // 2 ── create Room docs
  const roomDocs = await Room.insertMany(
    (payload.rooms || []).map((r) => ({
      facility: facility._id,
      roomNumber: r.roomNumber,
      group: groupIdFor(t.group),
      notes: r.notes,
    }))
  );

  // create Location docs
  // const locationDocs = await Location.insertMany(
  //   (payload.locations || []).map((l) => ({
  //     facility: facility._id,
  //     name: l.groupID,
  //     roomID: l.roomID,
  //     locationID: l.locationID,
  //     locationSN: l.locationSN,
  //     groupID: l.groupID,
  //   }))
  // );

  //create Group docs
  // const groupDocs = await Group.insertMany(
  //   (payload.groups || []).map((g) => ({
  //     facility: facility._id,
  //     groupID: g.groupID,
  //   }))
  // );

  // helper: look up roomId by roomNumber text
  const roomIdFor = (num) => roomDocs.find((r) => r.roomNumber === num)?._id || undefined;
  // const locationIdFor = (name) => locationDocs.find((l) => l.name === name)?._id || undefined;
  // const groupIdFor = (groupID) => groupDocs.find((g) => g.groupID === groupID)?._id || undefined;

  // 3 ── create CMS docs
  const cmsDocs = await CMS.insertMany(
    (payload.CMSs || []).map((c) => ({
      facility: facility._id,
      room: roomIdFor(c.room),
      location: locationIdFor(c.location),
      group: groupIdFor(c.group),
      serialNumber: c.serialNumber,
      assetID: c.assetID,
      wifiMacAddress: c.wifiMacAddress,
      ethernetMacAddress: c.ethernetMacAddress,
      frequency: c.frequency,
      configured: c.configured,
      assembled: c.assembled,
      tested: c.tested,
      labeled: c.labeled,
      qualityAssured: false,
    }))
  );

  // 4 ── create Transmitter docs
  const txDocs = await Transmitter.insertMany(
    (payload.Transmitters || []).map((t) => ({
      facility: facility._id,
      room: roomIdFor(t.room),
      location: locationIdFor(t.location),
      group: groupIdFor(t.group),
      serialNumber: t.serialNumber,
      assetTag: t.assetTag,
      bracket: t.bracket,
      configured: t.configured,
      labeled: t.labeled,
      tested: t.tested,
      qualityAssured: false,
    }))
  );

  // 5 ── attach arrays of ObjectIds to facility
  facility.rooms = roomDocs.map((r) => r._id);
  facility.CMSs = cmsDocs.map((c) => c._id);
  facility.Transmitters = txDocs.map((t) => t._id);
  // facility.locations = locationDocs.map((l) => l._id);
  // facility.groups = groupDocs.map((g) => g._id);
  await facility.save();

  // 6 ── create manifest (room / CMS / Tx arrays stay in facility)
  const manifest = await this.create({
    facility: facility._id,
    stage: payload.stage || "new",
    installationDate: payload.manifest?.installationDate,
    stagingDeadline: payload.manifest?.stagingDeadline,
    assemblyDeadline: payload.manifest?.assemblyDeadline,
    shippingDate: payload.manifest?.shippingDate,
    manifestProduct: payload.facility.product,
    manifestVersion: payload.facility.productVersion,
  });

  manifest.rooms = roomDocs.map((r) => r._id);
  // manifest.locations = locationDocs.map((l) => l._id);
  // manifest.groups = groupDocs.map((g) => g._id);
  //populate
  await manifest.populate("facility");
  return manifest;
};

module.exports = mongoose.model("Manifest", ManifestSchema);
ManifestSchema.plugin(auditLogPlugin);
