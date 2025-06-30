const express = require("express");
const router  = express.Router();
const { body, param } = require("express-validator");
const ctrl = require("../controllers/ticketController");

router.get("/",       ctrl.list);
router.get("/:id",    ctrl.get);
router.post("/", [
  body("facility").isMongoId(),
  body("title").isLength({ min: 3 }),
  body("description").notEmpty(),
  body("product").isIn(["REA", "LinQvue"]),
  body("productVersion").matches(/^[0-9]+(\.[0-9]+)?[A-Za-z]?$/),
  body("contactPhone").optional().matches(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/)
], ctrl.create);

module.exports = router;