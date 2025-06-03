const express = require("express");
const router  = express.Router();
const facCtrl = require("../controllers/facilityController");

/* GET  /api/facilities          → list all */
router.get("/", facCtrl.getAll);

/* GET  /api/facilities/:id      → single */
router.get("/:id", facCtrl.getById);

/* POST /api/facilities          → create */
router.post("/", facCtrl.create);

/* PUT  /api/facilities/:id      → update */
router.put("/:id", facCtrl.update);

module.exports = router;
