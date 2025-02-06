const { MongoClient } = require('mongodb');
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/';
const client = new MongoClient(mongoUrl);

let dbs = {};

async function connectToMongoDB() {
  await client.connect();
  dbs.inventory = client.db('inventory');
  dbs.sensitive = client.db('sensitive_data');
  dbs.support = client.db('support');
  dbs.configs = client.db('configs');
  dbs.manifest = client.db('manifest');
  dbs.wiki = client.db('wiki');
}

function getDB(name) {
  return dbs[name];
}

module.exports = { connectToMongoDB, getDB };