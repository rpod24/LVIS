const Location = require("../models/Location");

exports.list = async (req, res, next) => {
  try {
    const filter = req.query.facility ? { facility: req.query.facility } : {};
    const locations = await Location.find(filter);
    res.json(locations);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!location) return res.status(404).end();
    res.json(location);
  } catch (err) {
    next(err);
  }
};
