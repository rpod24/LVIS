// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

//create a new database for storing passwords
use('inventory');

//use the products collection that is already created;
db.createCollection("inventory", {
  validator: {
     $jsonSchema: {
        bsonType: "object",
        required: ["product_sku", "date"],
        properties: {
           product_sku: {
              bsonType: "string",
              description: "must be a string and is required"
           },
           date: {
              bsonType: "date",
              description: "must be a date and is required"
           },
           lot_number: {
              bsonType: "string",
              description: "must be a string"
           },
           tracking_number: {
              bsonType: "string",
              description: "must be a string"
           },
           tracking_vendor: {
              bsonType: "string",
              description: "must be a string"
           },
           destination: {
              bsonType: "string",
              description: "must be a string"
           },
           invoice: {
              bsonType: "string",
              description: "must be a string"
           },
           units_in: {
              bsonType: "int",
              description: "must be an integer"
           },
           units_out: {
              bsonType: "int",
              description: "must be an integer"
           }
        }
     }
  }
});


//insert a new document into the collection based on the schema
db.inventory.insertOne({
  product_sku: "123456",
  date: new Date(),
  lot_number: "123456",
  tracking_number: "789012",
  tracking_vendor: "vendor",
  destination: "destination",
  invoice: "invoice",
  units_in: 10,
  units_out: 5
});