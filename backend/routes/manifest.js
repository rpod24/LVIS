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
    res.status(500).json({ error: 'Unexpected Error Occurred!' });
  }
});

router.get('/:manifest_id', async (req, res) => {
  try {
    const manifestId = req.params.manifest_id;
    const item = await manifest.findOne({ _id: new ObjectId(manifestId) });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Unexpected Error Occurred!' });
  }
});

router.post('/', async (req, res) => {
  try {
    const manifestData = req.body;
    if (!manifestData) return res.status(400).json({ error: 'No manifest data provided' });

    const result = await manifest.insertOne(manifestData);
    res.status(201).json(await manifest.findOne({ _id: result.insertedId }));
  } catch (err) {
    res.status(500).json({ error: `Unexpected Error Occurred: ${err.message}` });
  }
});

module.exports = router;

