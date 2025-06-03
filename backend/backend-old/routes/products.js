const express = require('express');
const router = express.Router();
const { getDB } = require('../config/mongo');

router.get('/', async (req, res) => {
  try {
    const products = getDB('inventory').collection('products');
    const page = parseInt(req.query.p) || 0;
    const search = req.query.search || '';
    const query = search ? { $text: { $search: search } } : {};

    const items = await products.find(query).skip(page * 50).limit(50).toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Unexpected Error Occurred!' });
  }
});

module.exports = router;