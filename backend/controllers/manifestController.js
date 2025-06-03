const mongoose = require("mongoose");
const Manifest = require("../models/Manifest");
const Facility = require("../models/Facility");

/* ---------------- helpers ---------------- */
const toObjectId = (id) =>
  mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null;

/* ---------------- CRUD: manifests ---------------- */

exports.getAll = async (_req, res, next) => {
  try {
    const manifests = await Manifest.find().populate("facility");
    res.json(manifests);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const manifest = await Manifest.findById(req.params.id).populate("facility");
    if (!manifest) return res.status(404).end();
    res.json(manifest);
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
      ...manifestData
    } = req.body;

    if (!facilityId) {
      return res.status(400).json({ error: "facilityId is required and cannot be null" });
    }

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
            coordinates: address?.coordinates || {}
          },
          product: {
            code: product?.code || "",
            version: product?.version || ""
          },
          productVersions: productVersions || {},
        }
      },
      { new: true, upsert: true }
    );

    const manifest = await Manifest.create({
      facility: facility._id,
      ...manifestData,
    });

    await manifest.populate("facility");
    res.status(201).json(manifest);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const manifest = await Manifest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("facility");
    if (!manifest) return res.status(404).end();
    res.json(manifest);
  } catch (err) {
    next(err);
  }
};

/* ---------------- roomList sub-docs ---------------- */

exports.addRoom = async (req, res, next) => {
  try {
    const manifest = await Manifest.findById(req.params.id);
    if (!manifest) return res.status(404).end();

    manifest.roomList.push(req.body);
    await manifest.save();

    res.status(201).json(manifest.roomList[manifest.roomList.length - 1]);
  } catch (err) {
    next(err);
  }
};

exports.updateRoom = async (req, res, next) => {
  try {
    const manifest = await Manifest.findById(req.params.id);
    if (!manifest) return res.status(404).end();

    const room = manifest.roomList.id(req.params.roomId);
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

    const room = manifest.roomList.id(req.params.roomId);
    if (!room) return res.status(404).send("Room not found");

    room.remove();
    await manifest.save();

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
