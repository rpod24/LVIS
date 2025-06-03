const express = require("express");
const router  = express.Router();
const txCtrl  = require("../controllers/transmitterController");

// POST  /api/transmitters      →  create transmitter (assembly stage)
router.post("/", txCtrl.create);

// PUT   /api/transmitters/:id  →  update transmitter row
router.put("/:id", txCtrl.update);

// (optional) GET /api/transmitters?manifest=123  → all TX for one manifest
router.get("/", txCtrl.list);

module.exports = router;
