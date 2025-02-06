const express = require('express');
const router = express.Router();
const { getDB } = require('../config/mongo');

const facilities = getDB('configs').collection('Facility');
const groups = getDB('configs').collection('Group');
const locations = getDB('configs').collection('Location');
const meds = getDB('configs').collection('MED');
const monitors = getDB('configs').collection('Monitor');
const rooms = getDB('configs').collection('Room');

router.get('/', async (req, res) => {
  try {
    const search = req.query.search ? { $or: [
      { Name: { $regex: new RegExp(req.query.search, 'i') } },
      { PartitionKey: { $regex: new RegExp(req.query.search, 'i') } }
    ]} : {};
    const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
    const page = parseInt(req.query.p) || 0;

    const items = await facilities.find(search).sort(sort).skip(page * 50).limit(50).toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Unexpected Error Occurred!' });
  }
});

router.get('/:facility_id', async (req, res) => {
  try {
    const facilityId = req.params.facility_id;
    const facility = await facilities.findOne({ PartitionKey: facilityId });
    const groupItems = await groups.find({ PartitionKey: facilityId }).toArray();
    const locationItems = await locations.find({ PartitionKey: facilityId }).toArray();
    const medItems = await meds.find({ PartitionKey: facilityId }).toArray();
    const monitorItems = await monitors.find({ PartitionKey: facilityId }).toArray();
    const roomItems = await rooms.find({ PartitionKey: facilityId }).toArray();

    res.json({ facility, groupItems, locationItems, medItems, monitorItems, roomItems });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected Error Occurred!' });
  }
});

module.exports = router;


// router.get