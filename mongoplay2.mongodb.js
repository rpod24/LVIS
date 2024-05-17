/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('inventory');

// Create a new index in the collection.
db.getCollection('products')
  .createIndex(
    {
      "sku": 1
    }
  );
  db.getCollection('products')
  .createIndex(
    {
      "category": 1
    }
  );
  db.getCollection('products')
  .createIndex(
    {
      "item_name": 1
    }
  );
  db.getCollection('products')
  .createIndex(
    {
      "category": 1,
      "item_name": 1
    }
  );
  db.getCollection('products')
  .createIndex(
    {
      "manufacturer": 1,
      "item_name": 1
    }
  );
