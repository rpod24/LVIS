const { MongoClient } = require('mongodb');
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/';
const client = new MongoClient(mongoUrl);

let started = false;

async function connectToMongoDB() {
  await client.connect();
  console.log('Connected to MongoDB');
  started = true;
}

function getDB(name) {
  if (!started) {
    throw new Error('Database connection has not been established. Call connectDB first.');
  }
  return client.db(name);
}

module.exports = { connectToMongoDB, getDB };