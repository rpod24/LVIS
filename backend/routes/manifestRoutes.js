// server/routes/manifestRoutes.js
const express = require("express");
const router = express.Router();

const manifestCtrl = require("../controllers/manifestController");
const Manifest = require("../models/Manifest");

// GET all manifests
router.get("/", manifestCtrl.getAll);

// POST a new manifest (with facility auto-creation)
router.post("/", async (req, res) => {
  try {
    console.log("Creating manifest with payload:", req.body);
    const newManifest = await Manifest.createWithFacility(req.body);
    res.status(201).json(newManifest);
  } catch (err) {
    console.error("❌ Manifest creation failed:", err.message);
    console.error("❌ Manifest creation failed:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Server error" });
  }
});

// GET, PUT by ID
router.get("/:id", manifestCtrl.getById);
router.put("/:id", manifestCtrl.update);

// // Room routes
// router.post("/:id/rooms", manifestCtrl.addRoom);
// router.put("/:id/rooms/:roomId", manifestCtrl.updateRoom);
// router.delete("/:id/rooms/:roomId", manifestCtrl.deleteRoom);

module.exports = router;
