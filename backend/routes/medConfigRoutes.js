// backend/routes/medConfigRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/medConfigController");

router.get("/facility/:facilityId", controller.getByFacility);
router.post("/", controller.createOrUpdate);

module.exports = router;
