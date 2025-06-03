const express = require('express');
const router = express.Router();
const { getDB } = require('../config/mongo');
const { ObjectId } = require('mongodb');

const manifest = getDB('manifest').collection('manifest');

router.get('/', async (req, res) => {
  try {
    const search = req.query.search ? { Name: { $regex: req.query.search, $options: 'i' } } : {};
    const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
    const page = parseInt(req.query.p) || 0;

    const items = await manifest.find(search).sort(sort).skip(page * 50).limit(50).toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Unexpected Error Occurred!00' });
  }
});

router.get('/active', async (req, res) => {
  try {
    let search = { status: 'Active' };
    const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
    const page = parseInt(req.query.p) || 0;

    if (req.query.search) {
      search.$or = [
        { Name: { $regex: new RegExp(req.query.search, 'i') } },
        { PartitionKey: { $regex: new RegExp(req.query.search, 'i') } }
      ];
    }

    const items = await manifest.find(search).sort(sort).skip(page * 50).limit(50).toArray();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unexpected Error Occurred!03' });
  }
});

router.get('/prospect', async (req, res) => {
  try {
    let search = { status: 'Pending' };
    const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
    const page = parseInt(req.query.p) || 0;

    if (req.query.search) {
      search.$or = [
        { Name: { $regex: new RegExp(req.query.search, 'i') } },
        { PartitionKey: { $regex: new RegExp(req.query.search, 'i') } }
      ];
    }

    const items = await manifest.find(search).sort(sort).skip(page * 50).limit(50).toArray();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unexpected Error Occurred!03' });
  }
});

router.get('/assembly', async (req, res) => {
  try {
    let search = { status: 'Assembly' };
    const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
    const page = parseInt(req.query.p) || 0;

    if (req.query.search) {
      search.$or = [
        { Name: { $regex: new RegExp(req.query.search, 'i') } },
        { PartitionKey: { $regex: new RegExp(req.query.search, 'i') } }
      ];
    }

    const items = await manifest.find(search).sort(sort).skip(page * 50).limit(50).toArray();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unexpected Error Occurred!03' });
  }
});

router.get('/:manifest_id', async (req, res) => {
  try {
    const manifestId = req.params.manifest_id;
    const item = await manifest.findOne({ _id: new ObjectId(manifestId) });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Unexpected Error Occurred!01' });
  }
});

router.post('/', async (req, res) => {
  try {
    const manifestData = req.body;
    if (!manifestData) return res.status(400).json({ error: 'No manifest data provided' });

    const result = await manifest.insertOne(manifestData);
    res.status(201).json(await manifest.findOne({ _id: result.insertedId }));
  } catch (err) {
    res.status(500).json({ error: `Unexpected Error Occurred: ${err.message} 02` });
  }
});

module.exports = router;

