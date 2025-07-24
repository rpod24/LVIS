const Group = require("../models/Group");

exports.list = async (req, res, next) => {
  try {
    const filter = req.query.facility ? { facility: req.query.facility } : {};
    const groups = await Group.find(filter);
    res.json(groups);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const group = await Group.create(req.body);
    res.status(201).json(group);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!group) return res.status(404).end();
    res.json(group);
  } catch (err) {
    next(err);
  }
};
