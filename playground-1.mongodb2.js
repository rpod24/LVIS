/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('configs');

// Create a new index in the collection.
// db.getCollection('Facility')
//   .createIndex(
//     { 'Name': 1 },
//   );

// db.getCollection('Facility').createIndex({ 'FacilityID': 1 });
// db.getCollection('Facility').createIndex({ 'Phone': 1 });
// db.getCollection('Facility').createIndex({ 'Product': 1 });
// db.getCollection('Facility').createIndex({ 'ShortName': 1 });
db.runCommand({
  createSearchIndex: 'Facility',
  searchIndex: {
    'Name': 'text',
    'ShortName': 'text',
    'Product': 'text',
    'Phone': 'text',
  },
});