const express = require("express");
const router = express.Router();
const cmsController = require("../controllers/cmsController");

router.get("/", cmsController.list);
router.post("/", cmsController.create);
router.put("/:id", cmsController.update);

module.exports = router;