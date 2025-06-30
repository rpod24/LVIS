// backend/controllers/cmsConfigController.js
const CmsConfiguration = require("../models/CMSConfiguration");

exports.getByFacility = async (req, res) => {
  try {
    const config = await CmsConfiguration.findOne({ facility: req.params.facilityId });
    if (!config) return res.status(404).json({ message: "CMS config not found" });
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrUpdate = async (req, res) => {
  try {
    const { facility, ...fields } = req.body;
    let config = await CmsConfiguration.findOne({ facility });

    if (config) {
      Object.assign(config, fields);
      await config.save();
    } else {
      config = new CmsConfiguration({ facility, ...fields });
      await config.save();
    }

    res.status(200).json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};