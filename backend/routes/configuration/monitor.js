const express = require('express');
const router = express.Router();
const { getDB } = require('../config/mongo');

const config = getDB('configs').collection('Monitor');

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ error: 'No data provided' });

    var mongoData = await config.findOne({ PartitionKey: req.body.facilityId });

    var result = null;

    if (mongoData) {
      result = await config.updateOne({ PartitionKey: req.body.facilityId }, { $set: { ConfigAlert: req.body.ConfigAlert } });
    }
    else {
      result = await config.insertOne(req.body);
    }

    if (result == null) return res.status(405).json({ error: 'Invalid Partition ID' });
    if (result.modifiedCount === 0) return res.status(405).json({ error: 'Data not updated!' });
    res.status(201).json(await tickets.findOne({ _id: result.insertedId }));
  } catch (err) {
    res.status(500).json({ error: `Unexpected Error Occurred: ${err.message}` });
  }
});

module.exports = router;

