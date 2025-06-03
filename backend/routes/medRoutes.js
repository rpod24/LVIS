const express = require("express");
const router = express.Router();
const medController = require("../controllers/medController");

router.get("/", medController.list);
router.post("/", medController.create);
router.put("/:id", medController.update);

module.exports = router;
