const Transmitter = require("../models/Transmitter");

/* GET /api/transmitters?manifest=xyz */
exports.list = async (req, res, next) => {
  try {
    const filter = req.query.manifest ? { manifest: req.query.manifest } : {};
    const tx = await Transmitter.find(filter);
    res.json(tx);
  } catch (err) {
    next(err);
  }
};

/* POST /api/transmitters */
exports.create = async (req, res, next) => {
  try {
    const tx = await Transmitter.create(req.body);
    res.status(201).json(tx);
  } catch (err) {
    next(err);
  }
};

/* PUT /api/transmitters/:id */
exports.update = async (req, res, next) => {
  try {
    const tx = await Transmitter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tx) return res.status(404).end();
    res.json(tx);
  } catch (err) {
    next(err);
  }
};
