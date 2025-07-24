const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");

router.get("/", groupController.list);
router.post("/", groupController.create);
router.put("/:id", groupController.update);

module.exports = router;
