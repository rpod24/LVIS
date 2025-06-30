const Ticket = require("../models/Ticket");
const { validationResult } = require("express-validator");

exports.list = async (req, res, next) => {
  try {
    const tickets = await Ticket.find(req.query) // naïve filter – enhance later
                            .populate("facility", "facilityName facilityId")
                            .lean();
    res.json(tickets);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate("facility").lean();
    if (!ticket) return res.status(404).end();
    res.json(ticket);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const newTicket = await Ticket.create(req.body);
    res.status(201).json(newTicket);
  } catch (err) { next(err); }
};