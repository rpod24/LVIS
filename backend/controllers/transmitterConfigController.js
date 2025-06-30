// backend/controllers/transmitterConfigController.js
const TransmitterConfiguration = require("../models/TransmitterConfiguration");

exports.getByFacility = async (req, res) => {
  try {
    const config = await TransmitterConfiguration.findOne({ facility: req.params.facilityId });
    if (!config) return res.status(404).json({ message: "Transmitter config not found" });
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrUpdate = async (req, res) => {
  try {
    const { facility, ...fields } = req.body;
    let config = await TransmitterConfiguration.findOne({ facility });

    if (config) {
      Object.assign(config, fields);
      await config.save();
    } else {
      config = new TransmitterConfiguration({ facility, ...fields });
      await config.save();
    }

    res.status(200).json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
