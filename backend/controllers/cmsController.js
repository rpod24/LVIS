const CMS = require("../models/CMS");

/* GET /api/cms?manifest=xyz */
exports.list = async (req, res, next) => {
  try {
    const filter = req.query.manifest ? { manifest: req.query.manifest } : {};
    const cmsList = await CMS.find(filter);
    res.json(cmsList);
  } catch (err) {
    next(err);
  }
};

/* POST /api/cms */
exports.create = async (req, res, next) => {
  try {
    const cms = await CMS.create(req.body);
    res.status(201).json(cms);
  } catch (err) {
    next(err);
  }
};

/* PUT /api/cms/:id */
exports.update = async (req, res, next) => {
  try {
    const cms = await CMS.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cms) return res.status(404).end();
    res.json(cms);
  } catch (err) {
    next(err);
  }
};
