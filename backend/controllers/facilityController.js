const Facility = require("../models/Facility");

exports.getAll = async (_req, res, next) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const fac = await Facility.findById(req.params.id);
    if (!fac) return res.status(404).end();
    res.json(fac);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const fac = await Facility.create(req.body);
    res.status(201).json(fac);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const fac = await Facility.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!fac) return res.status(404).end();
    res.json(fac);
  } catch (err) { next(err); }
};
