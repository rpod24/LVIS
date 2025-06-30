const mongoose = require("mongoose");
const Manifest = require("../models/Manifest");
const Facility = require("../models/Facility");
const Room = require("../models/Room");
const CMS = require("../models/CMS");
const Transmitter = require("../models/Transmitter");

/* ---------------- helpers ---------------- */
const toObjectId = (id) => (mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null);

/* ---------------- CRUD: manifests ---------------- */

exports.getById = async (req, res, next) => {
  try {
    const manifest = await Manifest.findById(req.params.id).populate({
      path: "facility",
      populate: [{ path: "rooms" }, { path: "CMSs", populate: { path: "room" } }, { path: "transmitters", populate: { path: "room" } }],
    });

    if (!manifest) return res.status(404).json({ error: "Manifest not found" });
    res.json(manifest);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (_req, res, next) => {
  try {
    const manifests = await Manifest.find().populate({
      path: "facility",
      populate: [{ path: "rooms" }],
    });
    res.json(manifests);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      facilityName,
      facilityId,
      phone,
      address,
      product,
      productVersions,
      rooms = [], // extract room data from request
      ...manifestData
    } = req.body;

    if (!facilityId) {
      return res.status(400).json({ error: "facilityId is required and cannot be null" });
    }

    // Create or update the facility
    const facility = await Facility.findOneAndUpdate(
      { facilityId: facilityId.trim() },
      {
        $setOnInsert: {
          facilityName,
          facilityId: facilityId.trim(),
          phone,
          address: {
            line1: address?.line1 || "",
            city: address?.city || "",
            state: address?.state || "",
            zip: address?.zip || "",
            country: address?.country || "",
            timezone: address?.timezone || "",
            coordinates: address?.coordinates || {},
          },
          product: {
            code: product?.code || "",
            version: product?.version || "",
          },
          productVersions: productVersions || {},
        },
      },
      { new: true, upsert: true }
    );

    // Create Room documents and store their ObjectIds
    const savedRooms = await Promise.all(
      rooms.map(async (room) => {
        const roomDoc = new Room({
          ...room,
          facility: facility._id,
        });
        return await roomDoc.save();
      })
    );

    // Create the manifest
    const manifest = await Manifest.create({
      facility: facility._id,
      rooms: savedRooms.map((r) => r._id),
      ...manifestData,
    });

    await manifest.populate("facility");
    await manifest.populate("rooms"); // optional, if you want room data in response
    res.status(201).json(manifest);
  } catch (err) {
    next(err);
  }
};

exports.getByRoom = async (req, res, next) => {
  try {
    const manifest = await Manifest.findById(req.params.id).populate({
      path: "facility",
      populate: [{ path: "rooms" }, { path: "CMSs", populate: { path: "room" } }, { path: "transmitters", populate: { path: "room" } }],
    });

    if (!manifest) return res.status(404).end();
    res.json(manifest);
  } catch (err) {
    next(err);
  }
};

// exports.update = async (req, res, next) => {
//   try {
//     const { facility: facilityPayload, ...manifestData } = req.body;
//     if (!facilityPayload?._id) return res.status(400).json({ error: "facility._id missing" });

//     const facility = await Facility.findById(facilityPayload._id);
//     if (!facility) return res.status(404).json({ error: "Facility not found" });

//     const roomIds = [];
//     const newRoomObjs = [];

//     (facilityPayload.rooms || []).forEach((r) => {
//       if (mongoose.isValidObjectId(r)) {
//         roomIds.push(r);
//       } else if (r && typeof r === "object") {
//         newRoomObjs.push(r);
//       }
//     });

//     if (newRoomObjs.length) {
//       const createdRooms = await Room.insertMany(
//         newRoomObjs.map((obj) => ({
//           facility: facility._id,
//           roomNumber: obj.roomNumber || obj.room || "",
//           group: obj.group || "",
//           notes: obj.notes || "",
//         }))
//       );
//       roomIds.push(...createdRooms.map((r) => r._id));
//     }

//     const allRoomObjs = [...facility.rooms.filter((r) => typeof r === "object"), ...newRoomObjs];

//     const roomMap = new Map();
//     for (const r of allRoomObjs) {
//       roomMap.set(r.roomNumber, r._id);
//     }
//     const roomIdFor = (val) => {
//       if (mongoose.isValidObjectId(val)) return val;
//       if (typeof val === "object" && mongoose.isValidObjectId(val._id)) return val._id;
//       return (facility.rooms || []).find((r) => r.roomNumber === val)?._id;
//     };

//     facilityPayload.rooms = roomIds;

//     /* ---------- CMSs --------------------------------------- */
//     const cmsIds = [];
//     const cmsObjects = [];

//     (facilityPayload.CMSs || []).forEach((c) => {
//       if (mongoose.isValidObjectId(c)) {
//         cmsIds.push(c);
//       } else if (c && typeof c === "object") {
//         cmsObjects.push(c);
//       }
//     });

//     if (cmsObjects.length) {
//       const newCMSdocs = await CMS.insertMany(
//         cmsObjects.map((obj) => ({
//           facility: facility._id,
//           room: typeof obj.room === "string" ? obj.room : obj.room?._id,
//           serialNumber: obj.serialNumber,
//           assetID: obj.assetID,
//           wifiMacAddress: obj.wifiMacAddress,
//           ethernetMacAddress: obj.ethernetMacAddress,
//           frequency: obj.frequency,
//           configured: obj.configured,
//           assembled: obj.assembled,
//           tested: obj.tested,
//           labeled: obj.labeled,
//           qualityAssured: false,
//         }))
//       );
//       cmsIds.push(...newCMSdocs.map((d) => d._id));
//     }

//     facilityPayload.CMSs = cmsIds;

//     /* ---------- Transmitters --------------------------------------- */
//     const txIds = [];
//     const txObjects = [];

//     (facilityPayload.transmitters || []).forEach((t) => {
//       if (mongoose.isValidObjectId(t)) {
//         txIds.push(t);
//       } else if (t && typeof t === "object") {
//         txObjects.push(t);
//       }
//     });

//     if (txObjects.length) {
//       const newTxDocs = await Transmitter.insertMany(
//         txObjects.map((obj) => {
//           return {
//             facility: facility._id,
//             room: roomIdFor(obj.room),
//             serialNumber: obj.serialNumber,
//             assetTag: obj.assetTag,
//             bracket: obj.bracket,
//             configured: obj.configured,
//             labeled: obj.labeled,
//             tested: obj.tested,
//             qualityAssured: false,
//           };
//         })
//       );
//       txIds.push(...newTxDocs.map((d) => d._id));
//     }

//     facilityPayload.transmitters = txIds;

//     /* ---------- Save facility + manifest ---------------------------- */
//     await Facility.findByIdAndUpdate(facility._id, facilityPayload, {
//       new: true,
//       runValidators: true,
//     });

//     const manifest = await Manifest.findByIdAndUpdate(req.params.id, manifestData, {
//       new: true,
//       runValidators: true,
//     }).populate({
//       path: "facility",
//       populate: { path: "rooms" },
//     });

//     if (!manifest) return res.status(404).end();
//     res.json(manifest);
//   } catch (err) {
//     next(err);
//   }
// };
exports.update = async (req, res, next) => {
  try {
    const { facility: facilityPayload, ...manifestData } = req.body;
    if (!facilityPayload?._id) return res.status(400).json({ error: "facility._id missing" });

    const facility = await Facility.findById(facilityPayload._id);
    if (!facility) return res.status(404).json({ error: "Facility not found" });

    const roomIds = [];
    const newRoomObjs = [];
    const existingRooms = facilityPayload.rooms || [];

    // Separate existing ObjectId rooms vs new room objects
    existingRooms.forEach((r) => {
      if (mongoose.isValidObjectId(r)) {
        roomIds.push(r);
      } else if (r && typeof r === "object") {
        newRoomObjs.push(r);
      }
    });

    // Insert new rooms and get their ObjectIds
    let createdRooms = [];
    if (newRoomObjs.length) {
      createdRooms = await Room.insertMany(
        newRoomObjs.map((obj) => ({
          facility: facility._id,
          roomNumber: obj.roomNumber || obj.room || "",
          group: obj.group || "",
          notes: obj.notes || "",
        }))
      );
      roomIds.push(...createdRooms.map((r) => r._id));
    }

    // ✅ Combine both sets for lookup
    const allRooms = [...(await Room.find({ _id: { $in: roomIds } })), ...createdRooms];

    // ✅ Lookup helper to convert roomNumber ("1") → _id
    const roomIdFor = (val) => {
      if (mongoose.isValidObjectId(val)) return val;
      if (typeof val === "object" && mongoose.isValidObjectId(val._id)) return val._id;
      return allRooms.find((r) => r.roomNumber === val)?._id;
    };

    facilityPayload.rooms = roomIds;

    /* ---------- CMSs --------------------------------------- */
    const cmsIds = [];
    const cmsObjects = [];

    (facilityPayload.CMSs || []).forEach((c) => {
      if (mongoose.isValidObjectId(c)) {
        cmsIds.push(c);
      } else if (c && typeof c === "object") {
        cmsObjects.push(c);
      }
    });

    if (cmsObjects.length) {
      const newCMSdocs = await CMS.insertMany(
        cmsObjects.map((obj) => ({
          facility: facility._id,
          room: roomIdFor(obj.room),
          serialNumber: obj.serialNumber,
          assetID: obj.assetID,
          wifiMacAddress: obj.wifiMacAddress,
          ethernetMacAddress: obj.ethernetMacAddress,
          frequency: obj.frequency,
          configured: obj.configured,
          assembled: obj.assembled,
          tested: obj.tested,
          labeled: obj.labeled,
          qualityAssured: false,
        }))
      );
      cmsIds.push(...newCMSdocs.map((d) => d._id));
    }

    facilityPayload.CMSs = cmsIds;

    /* ---------- Transmitters --------------------------------------- */
    const txIds = [];
    const txObjects = [];

    (facilityPayload.transmitters || []).forEach((t) => {
      if (mongoose.isValidObjectId(t)) {
        txIds.push(t);
      } else if (t && typeof t === "object") {
        txObjects.push(t);
      }
    });

    if (txObjects.length) {
      const newTxDocs = await Transmitter.insertMany(
        txObjects.map((obj) => ({
          facility: facility._id,
          room: roomIdFor(obj.room),
          serialNumber: obj.serialNumber,
          assetTag: obj.assetTag,
          bracket: obj.bracket,
          configured: obj.configured,
          labeled: obj.labeled,
          tested: obj.tested,
          qualityAssured: false,
        }))
      );
      txIds.push(...newTxDocs.map((d) => d._id));
    }

    facilityPayload.transmitters = txIds;

    // Save facility
    await Facility.findByIdAndUpdate(facility._id, facilityPayload, {
      new: true,
      runValidators: true,
    });

    // Update manifest and return
    const manifest = await Manifest.findByIdAndUpdate(req.params.id, manifestData, {
      new: true,
      runValidators: true,
    }).populate({
      path: "facility",
      populate: { path: "rooms" },
    });

    if (!manifest) return res.status(404).end();
    res.json(manifest);
  } catch (err) {
    next(err);
  }
};

/* ---------------- rooms sub-docs ---------------- */

exports.addRoom = async (req, res, next) => {
  try {
    const manifest = await Manifest.findById(req.params.id);
    if (!manifest) return res.status(404).end();

    manifest.rooms.push(req.body);
    await manifest.save();

    res.status(201).json(manifest.rooms[manifest.rooms.length - 1]);
  } catch (err) {
    next(err);
  }
};

exports.updateRoom = async (req, res, next) => {
  try {
    const manifest = await Manifest.findById(req.params.id);
    if (!manifest) return res.status(404).end();

    const room = manifest.rooms.id(req.params.roomId);
    if (!room) return res.status(404).send("Room not found");

    Object.assign(room, req.body);
    await manifest.save();

    res.json(room);
  } catch (err) {
    next(err);
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const manifest = await Manifest.findById(req.params.id);
    if (!manifest) return res.status(404).end();

    const room = manifest.rooms.id(req.params.roomId);
    if (!room) return res.status(404).send("Room not found");

    room.remove();
    await manifest.save();

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
