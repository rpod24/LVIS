const express = require('express');
const router = express.Router();
const { getDB } = require('../config/mongo');

const facilities = getDB('configs').collection('Facility');
const groups = getDB('configs').collection('Group');
const locations = getDB('configs').collection('Location');
const meds = getDB('configs').collection('MED');
const monitors = getDB('configs').collection('Monitor');
const rooms = getDB('configs').collection('Room');
const configAlerts = getDB('configs').collection('ConfigAlert');
const configCMS = getDB('configs').collection('ConfigCMS');
const configMED = getDB('configs').collection('ConfigMED');
const cms = getDB('configs').collection('CMSs');

// Get all facilities with search, sort, and pagination
router.get('/', async (req, res) => {
  try {
    const search = req.query.search
      ? {
          $or: [
            { Name: { $regex: new RegExp(req.query.search, 'i') } },
            { PartitionKey: { $regex: new RegExp(req.query.search, 'i') } }
          ]
        }
      : {};
    const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
    const page = parseInt(req.query.p) || 0;

    const items = await facilities.find(search).sort(sort).skip(page * 50).limit(50).toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Unexpected Error Occurred!-1' });
  }
});

// Get a specific facility and its related data
router.get('/:facility_id', async (req, res) => {
  try {
    const facilityId = req.params.facility_id;

    const groupsData = await groups.find({ PartitionKey: facilityId }).toArray();
    const facilityData = await facilities.find({ PartitionKey: facilityId }).limit(1).toArray();
    const locationsData = await locations.find({ PartitionKey: facilityId }).toArray();
    const medsData = await meds.find({ PartitionKey: facilityId }).toArray();
    const monitorsData = await monitors.find({ PartitionKey: facilityId }).toArray();
    const roomsData = await rooms.find({ PartitionKey: facilityId }).toArray();
    const configAlertsData = await configAlerts.find({ PartitionKey: facilityId }).toArray();
    const configCMSData = await configCMS.find({ PartitionKey: facilityId }).toArray();
    const configMEDData = await configMED.find({ PartitionKey: facilityId }).toArray();
    const cmsData = await cms.find({ PartitionKey: facilityId }).toArray();

    res.json({
      facility: facilityData,
      groups: groupsData,
      locations: locationsData,
      meds: medsData,
      monitors: monitorsData,
      rooms: roomsData,
      configAlerts: configAlertsData,
      configCMS: configCMSData,
      configMED: configMEDData,
      cms: cmsData,
    });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected Error Occurred!0' });
  }
});

// Helper function for updating configurations
const updateDocument = async (collection, id, data, res) => {
  try {
    if (!data) return res.status(400).json({ error: 'No data provided' });

    const currentDocument = await collection.findOne({ PartitionKey: id });
    if (!currentDocument) return res.status(404).json({ error: 'Document not found!' });

    data._id = currentDocument._id;
    const result = await collection.replaceOne({ PartitionKey: id }, data);

    if (result.modifiedCount === 0) {
      return res.status(405).json({ error: 'Document not updated!' });
    }

    res.json({ message: 'Document replaced successfully!' });
  } catch (err) {
    res.status(500).json({ error: `Unexpected Error Occurred: ${err.message}` });
  }
};

// Routes for updating facilities, groups, locations, meds, monitors, and rooms
router.post('/facility/:facility_id', async (req, res) => {
  await updateDocument(facilities, req.params.facility_id, req.body, res);
});

router.post('/group/:group_id', async (req, res) => {
  await updateDocument(groups, req.params.group_id, req.body, res);
});

router.post('/location/:location_id', async (req, res) => {
  await updateDocument(locations, req.params.location_id, req.body, res);
});

router.post('/med/:med_id', async (req, res) => {
  await updateDocument(meds, req.params.med_id, req.body, res);
});

router.post('/monitor/:monitor_id', async (req, res) => {
  await updateDocument(monitors, req.params.monitor_id, req.body, res);
});

router.post('/room/:room_id', async (req, res) => {
  await updateDocument(rooms, req.params.room_id, req.body, res);
});

// Routes for updating configuration-related collections
module.exports = router;
