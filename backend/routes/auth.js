const express = require('express');
const router = express.Router();
const { getDB } = require('../config/mongo');
const TokenManager = require('../utils/token_manager');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getDB('sensitive_data').collection('users').findOne({ username });
    if (!user || !TokenManager.hashPassword(password) === user.password) {
      return res.status(401).json({ error: 'Invalid credentials!' });
    }
    const token = TokenManager.generateToken(user.username);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Unexpected Error Occurred: ${err.message}` });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await getDB('sensitive_data').collection('users').findOne({ username });
    if (userExists) {
      return res.status(401).json({ error: 'User already exists!' });
    }
    const token = TokenManager.generateUser(username, password);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: `Unexpected Error Occurred: ${err.message}` });
  }
});

module.exports = router;