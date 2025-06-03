const MED = require("../models/MED");

/* GET /api/meds?facility=xyz */
exports.list = async (req, res, next) => {
  try {
    const filter = req.query.facility ? { facility: req.query.facility } : {};
    const meds = await MED.find(filter);
    res.json(meds);
  } catch (err) {
    next(err);
  }
};

/* POST /api/meds */
exports.create = async (req, res, next) => {
  try {
    const med = await MED.create(req.body);
    res.status(201).json(med);
  } catch (err) {
    next(err);
  }
};

/* PUT /api/meds/:id */
exports.update = async (req, res, next) => {
  try {
    const med = await MED.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!med) return res.status(404).end();
    res.json(med);
  } catch (err) {
    next(err);
  }
};
