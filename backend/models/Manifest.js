const mongoose = require("mongoose");
const Facility = require("./Facility"); // Make sure this path is correct

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
  console.log("Creating manifest with facility:", payload);
  console.log("➡ payload.facility keys:", Object.keys(payload.facility || {}));
  let facility = await Facility.findOne({ facilityId: payload.facility.facilityId });

  if (!facility) {
    facility = new Facility({
      facilityName: payload.facility.facilityName,
      facilityId: payload.facility.facilityId,
      address: {
        line1: payload.facility.address,
        city: payload.facility.city,
        state: payload.facility.state,
        zip: payload.facility.zip,
      },
      phone: payload.facility.phone,
      product: {
        code: payload.facility.product,
        version: payload.facility.productVersion,
      },
      counts: payload.counts || {},
      status: "Active",
    });
    await facility.save();
  }

  const manifest = new this({
    facility: facility._id,
    stage: payload.stage || "new",
    installationDate: payload.manifest?.installationDate,
    stagingDeadline: payload.manifest?.stagingDeadline,
    assemblyDeadline: payload.manifest?.assemblyDeadline,
    shippingDate: payload.manifest?.shippingDate,
    manifestProduct: payload.facility.product,
    manifestVersion: payload.facility.productVersion,
  });

  await manifest.save();

  facility.manifest = manifest._id;
  await facility.save();

  return manifest;
};

module.exports = mongoose.model("Manifest", ManifestSchema);
