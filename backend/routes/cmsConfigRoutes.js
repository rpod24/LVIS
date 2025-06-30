// backend/routes/cmsConfigRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/cmsConfigController");

router.get("/facility/:facilityId", controller.getByFacility);
router.post("/", controller.createOrUpdate);

module.exports = router;
