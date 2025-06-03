const express = require('express');
const router = express.Router();
const { getDB } = require('../config/mongo');
const { ObjectId } = require('mongodb');

const productWiki = getDB('wiki').collection('products');

router.get('/', async (req, res) => {
  try {
    const search = req.query.search ? { $text: { $search: req.query.search } } : {};
    const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
    const page = parseInt(req.query.p) || 0;

    const items = await productWiki.find(search).sort(sort).skip(page * 50).limit(50).toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Unexpected Error Occurred!' });
  }
});

router.get('/:product_id', async (req, res) => {
  try {
    const productId = req.params.product_id;
    const item = await productWiki.findOne({ _id: new ObjectId(productId) });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Unexpected Error Occurred!' });
  }
});

router.post('/', async (req, res) => {
  try {
    const productData = req.body;
    if (!productData) return res.status(400).json({ error: 'No product data provided' });

    const result = await productWiki.insertOne(productData);
    res.status(201).json(await productWiki.findOne({ _id: result.insertedId }));
  } catch (err) {
    res.status(500).json({ error: `Unexpected Error Occurred: ${err.message}` });
  }
});

module.exports = router;
