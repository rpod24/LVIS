const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.get("/", locationController.list);
router.post("/", locationController.create);
router.put("/:id", locationController.update);

module.exports = router;
