// backend/controllers/medConfigController.js
const MedConfiguration = require("../models/MEDConfiguration");

exports.getByFacility = async (req, res) => {
  try {
    const config = await MedConfiguration.findOne({ facility: req.params.facilityId });
    if (!config) return res.status(404).json({ message: "MED config not found" });
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrUpdate = async (req, res) => {
  try {
    const { facility, ...fields } = req.body;
    let config = await MedConfiguration.findOne({ facility });

    if (config) {
      Object.assign(config, fields);
      await config.save();
    } else {
      config = new MedConfiguration({ facility, ...fields });
      await config.save();
    }

    res.status(200).json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
