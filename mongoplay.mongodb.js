// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

//create a new database for storing passwords
use('support');
// db.products.createIndex( { "$**": "text" } )
// //use the products collection that is already created;

//Ticket Schema:

// {
//     "status": "open",  // Status of the ticket (open, on hold, closed)
//     "date": "2024-05-17T12:34:56Z",  // Date the ticket was created
//     "modifiedBy": "John Doe",  // Person who last modified the ticket
//     "facilityName": "Main Facility",  // Name of the facility
//     "facilityType": "Warehouse",  // Type of the facility
//     "supportTicketNumber": "123456",  // Support ticket number
//     "problem": "Network outage",  // Problem description
//     "contactMethod": "email",  // Method of contact (phone, email, text, other)
//     "email": "contact@example.com",  // Contact email
//     "phoneNumber": "123-456-7890",  // Contact phone number
//     "voicemail": "Customer left a voicemail regarding the network issue.",  // Voicemail message
//     "needToFollowUp": true,  // Indicates if follow-up is needed
//     "timeOfVoicemail": "2024-05-17T08:00:00Z",  // Time the voicemail was received
//     "nameOfCaller": "Jane Smith",  // Name of the caller
//     "Problem": "Internet",  // Sub-category of the problem
//     "problemSubCategory": "Internet",  // Sub-category of the problem
//     "notes": [  // Array of notes
//       {
//         "note": "Initial report of the issue.",
//         "date": "2024-05-17T09:00:00Z",
//         "person": "John Doe"
//       },
//       {
//         "note": "Checked the network settings, everything seems fine.",
//         "date": "2024-05-17T10:00:00Z",
//         "person": "Jane Smith"
//       }
//     ]
//   }


db.tickets.insertOne({
    "status": "open",
    "date": "2024-05-17T12:34:56Z",
    "modifiedBy": "John Doe",
    "facilityName": "Main Facility",
    "facilityType": "Warehouse",
    "supportTicketNumber": 0,
    "problem": "Network outage",
    "contactMethod": "email",
    "email": "contact@example.com",
    "phoneNumber": "123-456-7890",
    "voicemail": "Customer left a voicemail regarding the network issue.",
    "needToFollowUp": true,
    "timeOfVoicemail": "2024-05-17T08:00:00Z",
    "nameOfCaller": "Jane Smith",
    "problemSubCategory": "Internet",
    "notes": [
      {
        "note": "Initial report of the issue.",
        "date": "2024-05-17T09:00:00Z",
        "person": "John Doe"
      },
      {
        "note": "Checked the network settings, everything seems fine.",
        "date": "2024-05-17T10:00:00Z",
        "person": "Jane Smith"
      }
    ]
  });
  


// //insert a new document into the collection based on the schema
// // db.inventory.insertOne({
// //   product_sku: "123456",
// //   date: new Date(),
// //   lot_number: "123456",
// //   tracking_number: "789012",
// //   tracking_vendor: "vendor",
// //   destination: "destination",
// //   invoice: "invoice",
// //   units_in: 10,
// //   units_out: 5
// // });

// // db.products.insertOne({
// //    "productImage": "https://example.com/images/product123.jpg",
// //    "description": "High-quality wireless mouse with ergonomic design and long battery life.",
// //    "category": "Electronics",
// //    "manufacturer": "TechBrand",
// //    "itemName": "Wireless Ergonomic Mouse",
// //    "model": "TechMouseX100",
// //    "sku": "TMX100-001",
// //    "dimensions": {
// //      "length": 12,
// //      "width": 7.5,
// //      "height": 4
// //    },
// //    "weight": 150,
// //    "barCode": "123456789012",
// //    "unitCost": 20.00,
// //    "unitPrice": 35.99,
// //    "minimumItemThreshold": 10,
// //    "tags": ["wireless", "ergonomic", "mouse", "electronics", "TechBrand"],
// //    "specSheet": "https://example.com/specs/techmousex100.pdf",
// //    "partNumber": "TMX100-PN",
// //    "notes": "Compatible with both Windows and Mac OS.",
// //    "unitsOnHand": 50
// //  }
// //  );

// db.products.insertMany([
//   {
//     "productImage": "https://example.com/images/product1.jpg",
//     "description": "High-quality product 1 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 1 Name",
//     "model": "Model1",
//     "sku": "SKU1",
//     "dimensions": {
//       "length": 12.8,
//       "width": 10.71,
//       "height": 7.33
//     },
//     "weight": 225.67,
//     "barCode": "495021589365",
//     "unitCost": 34.58,
//     "unitPrice": 35.01,
//     "minimumItemThreshold": 7,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model1.pdf",
//     "partNumber": "PN1",
//     "notes": "Notes for product 1",
//     "unitsOnHand": 28
//   },
//   {
//     "productImage": "https://example.com/images/product2.jpg",
//     "description": "High-quality product 2 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 2 Name",
//     "model": "Model2",
//     "sku": "SKU2",
//     "dimensions": {
//       "length": 13.53,
//       "width": 11.64,
//       "height": 8.26
//     },
//     "weight": 141.48,
//     "barCode": "436070217628",
//     "unitCost": 28.69,
//     "unitPrice": 40.36,
//     "minimumItemThreshold": 5,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model2.pdf",
//     "partNumber": "PN2",
//     "notes": "Notes for product 2",
//     "unitsOnHand": 60
//   },
//   {
//     "productImage": "https://example.com/images/product3.jpg",
//     "description": "High-quality product 3 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 3 Name",
//     "model": "Model3",
//     "sku": "SKU3",
//     "dimensions": {
//       "length": 12.08,
//       "width": 11.3,
//       "height": 9.88
//     },
//     "weight": 200.91,
//     "barCode": "632622343781",
//     "unitCost": 33.7,
//     "unitPrice": 92.51,
//     "minimumItemThreshold": 15,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model3.pdf",
//     "partNumber": "PN3",
//     "notes": "Notes for product 3",
//     "unitsOnHand": 43
//   },
//   {
//     "productImage": "https://example.com/images/product4.jpg",
//     "description": "High-quality product 4 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 4 Name",
//     "model": "Model4",
//     "sku": "SKU4",
//     "dimensions": {
//       "length": 15.49,
//       "width": 7.84,
//       "height": 3.6
//     },
//     "weight": 313.01,
//     "barCode": "255959504621",
//     "unitCost": 29.62,
//     "unitPrice": 37.8,
//     "minimumItemThreshold": 9,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model4.pdf",
//     "partNumber": "PN4",
//     "notes": "Notes for product 4",
//     "unitsOnHand": 11
//   },
//   {
//     "productImage": "https://example.com/images/product5.jpg",
//     "description": "High-quality product 5 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 5 Name",
//     "model": "Model5",
//     "sku": "SKU5",
//     "dimensions": {
//       "length": 16.61,
//       "width": 14.19,
//       "height": 9.38
//     },
//     "weight": 488.98,
//     "barCode": "366849655122",
//     "unitCost": 45.48,
//     "unitPrice": 56.67,
//     "minimumItemThreshold": 11,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model5.pdf",
//     "partNumber": "PN5",
//     "notes": "Notes for product 5",
//     "unitsOnHand": 12
//   },
//   {
//     "productImage": "https://example.com/images/product6.jpg",
//     "description": "High-quality product 6 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 6 Name",
//     "model": "Model6",
//     "sku": "SKU6",
//     "dimensions": {
//       "length": 18.02,
//       "width": 9.34,
//       "height": 5.27
//     },
//     "weight": 418.78,
//     "barCode": "765213174877",
//     "unitCost": 11.44,
//     "unitPrice": 87.25,
//     "minimumItemThreshold": 9,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model6.pdf",
//     "partNumber": "PN6",
//     "notes": "Notes for product 6",
//     "unitsOnHand": 37
//   },
//   {
//     "productImage": "https://example.com/images/product7.jpg",
//     "description": "High-quality product 7 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 7 Name",
//     "model": "Model7",
//     "sku": "SKU7",
//     "dimensions": {
//       "length": 17.41,
//       "width": 12.23,
//       "height": 8.63
//     },
//     "weight": 298.87,
//     "barCode": "451028588548",
//     "unitCost": 19.68,
//     "unitPrice": 48.77,
//     "minimumItemThreshold": 14,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model7.pdf",
//     "partNumber": "PN7",
//     "notes": "Notes for product 7",
//     "unitsOnHand": 21
//   },
//   {
//     "productImage": "https://example.com/images/product8.jpg",
//     "description": "High-quality product 8 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "FurniCo",
//     "itemName": "Product 8 Name",
//     "model": "Model8",
//     "sku": "SKU8",
//     "dimensions": {
//       "length": 17.8,
//       "width": 13.37,
//       "height": 6.94
//     },
//     "weight": 327.71,
//     "barCode": "941049236611",
//     "unitCost": 23.61,
//     "unitPrice": 65.03,
//     "minimumItemThreshold": 5,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model8.pdf",
//     "partNumber": "PN8",
//     "notes": "Notes for product 8",
//     "unitsOnHand": 84
//   },
//   {
//     "productImage": "https://example.com/images/product9.jpg",
//     "description": "High-quality product 9 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 9 Name",
//     "model": "Model9",
//     "sku": "SKU9",
//     "dimensions": {
//       "length": 13.39,
//       "width": 7.62,
//       "height": 3.1
//     },
//     "weight": 424.92,
//     "barCode": "629421419458",
//     "unitCost": 12.65,
//     "unitPrice": 22.95,
//     "minimumItemThreshold": 11,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model9.pdf",
//     "partNumber": "PN9",
//     "notes": "Notes for product 9",
//     "unitsOnHand": 44
//   },
//   {
//     "productImage": "https://example.com/images/product10.jpg",
//     "description": "High-quality product 10 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "HomeGoods",
//     "itemName": "Product 10 Name",
//     "model": "Model10",
//     "sku": "SKU10",
//     "dimensions": {
//       "length": 17.02,
//       "width": 11.38,
//       "height": 9.09
//     },
//     "weight": 211.12,
//     "barCode": "766606309449",
//     "unitCost": 25.49,
//     "unitPrice": 47.16,
//     "minimumItemThreshold": 10,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model10.pdf",
//     "partNumber": "PN10",
//     "notes": "Notes for product 10",
//     "unitsOnHand": 93
//   },
//   {
//     "productImage": "https://example.com/images/product11.jpg",
//     "description": "High-quality product 11 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 11 Name",
//     "model": "Model11",
//     "sku": "SKU11",
//     "dimensions": {
//       "length": 11.58,
//       "width": 14.91,
//       "height": 5.37
//     },
//     "weight": 271.24,
//     "barCode": "980291814797",
//     "unitCost": 17.66,
//     "unitPrice": 82.72,
//     "minimumItemThreshold": 13,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model11.pdf",
//     "partNumber": "PN11",
//     "notes": "Notes for product 11",
//     "unitsOnHand": 52
//   },
//   {
//     "productImage": "https://example.com/images/product12.jpg",
//     "description": "High-quality product 12 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 12 Name",
//     "model": "Model12",
//     "sku": "SKU12",
//     "dimensions": {
//       "length": 18.86,
//       "width": 7.73,
//       "height": 3.93
//     },
//     "weight": 362.88,
//     "barCode": "296116649313",
//     "unitCost": 39.61,
//     "unitPrice": 51.31,
//     "minimumItemThreshold": 7,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model12.pdf",
//     "partNumber": "PN12",
//     "notes": "Notes for product 12",
//     "unitsOnHand": 98
//   },
//   {
//     "productImage": "https://example.com/images/product13.jpg",
//     "description": "High-quality product 13 with ergonomic design and long battery life.",
//     "category": "Furniture",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 13 Name",
//     "model": "Model13",
//     "sku": "SKU13",
//     "dimensions": {
//       "length": 18.7,
//       "width": 11.91,
//       "height": 6.43
//     },
//     "weight": 437.24,
//     "barCode": "428621622386",
//     "unitCost": 16.59,
//     "unitPrice": 27.28,
//     "minimumItemThreshold": 14,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model13.pdf",
//     "partNumber": "PN13",
//     "notes": "Notes for product 13",
//     "unitsOnHand": 85
//   },
//   {
//     "productImage": "https://example.com/images/product14.jpg",
//     "description": "High-quality product 14 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 14 Name",
//     "model": "Model14",
//     "sku": "SKU14",
//     "dimensions": {
//       "length": 16.69,
//       "width": 13.87,
//       "height": 8.93
//     },
//     "weight": 202.26,
//     "barCode": "312869463659",
//     "unitCost": 11.67,
//     "unitPrice": 95.4,
//     "minimumItemThreshold": 13,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model14.pdf",
//     "partNumber": "PN14",
//     "notes": "Notes for product 14",
//     "unitsOnHand": 96
//   },
//   {
//     "productImage": "https://example.com/images/product15.jpg",
//     "description": "High-quality product 15 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "FurniCo",
//     "itemName": "Product 15 Name",
//     "model": "Model15",
//     "sku": "SKU15",
//     "dimensions": {
//       "length": 15.71,
//       "width": 13.13,
//       "height": 6.15
//     },
//     "weight": 498.11,
//     "barCode": "653607320686",
//     "unitCost": 32.01,
//     "unitPrice": 34.31,
//     "minimumItemThreshold": 10,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model15.pdf",
//     "partNumber": "PN15",
//     "notes": "Notes for product 15",
//     "unitsOnHand": 22
//   },
//   {
//     "productImage": "https://example.com/images/product16.jpg",
//     "description": "High-quality product 16 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "HomeGoods",
//     "itemName": "Product 16 Name",
//     "model": "Model16",
//     "sku": "SKU16",
//     "dimensions": {
//       "length": 11.88,
//       "width": 14.06,
//       "height": 4.58
//     },
//     "weight": 423.13,
//     "barCode": "550916724211",
//     "unitCost": 45.72,
//     "unitPrice": 30.73,
//     "minimumItemThreshold": 8,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model16.pdf",
//     "partNumber": "PN16",
//     "notes": "Notes for product 16",
//     "unitsOnHand": 74
//   },
//   {
//     "productImage": "https://example.com/images/product17.jpg",
//     "description": "High-quality product 17 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "HomeGoods",
//     "itemName": "Product 17 Name",
//     "model": "Model17",
//     "sku": "SKU17",
//     "dimensions": {
//       "length": 14.17,
//       "width": 10.04,
//       "height": 4.37
//     },
//     "weight": 164.93,
//     "barCode": "912322356826",
//     "unitCost": 28.86,
//     "unitPrice": 20.6,
//     "minimumItemThreshold": 5,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model17.pdf",
//     "partNumber": "PN17",
//     "notes": "Notes for product 17",
//     "unitsOnHand": 88
//   },
//   {
//     "productImage": "https://example.com/images/product18.jpg",
//     "description": "High-quality product 18 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 18 Name",
//     "model": "Model18",
//     "sku": "SKU18",
//     "dimensions": {
//       "length": 13.02,
//       "width": 8.89,
//       "height": 6.27
//     },
//     "weight": 167.9,
//     "barCode": "955251697681",
//     "unitCost": 48.78,
//     "unitPrice": 56.66,
//     "minimumItemThreshold": 12,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model18.pdf",
//     "partNumber": "PN18",
//     "notes": "Notes for product 18",
//     "unitsOnHand": 60
//   },
//   {
//     "productImage": "https://example.com/images/product19.jpg",
//     "description": "High-quality product 19 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 19 Name",
//     "model": "Model19",
//     "sku": "SKU19",
//     "dimensions": {
//       "length": 18.5,
//       "width": 13.03,
//       "height": 5.87
//     },
//     "weight": 111.78,
//     "barCode": "882272013309",
//     "unitCost": 22.73,
//     "unitPrice": 92.46,
//     "minimumItemThreshold": 10,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model19.pdf",
//     "partNumber": "PN19",
//     "notes": "Notes for product 19",
//     "unitsOnHand": 54
//   },
//   {
//     "productImage": "https://example.com/images/product20.jpg",
//     "description": "High-quality product 20 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 20 Name",
//     "model": "Model20",
//     "sku": "SKU20",
//     "dimensions": {
//       "length": 16.57,
//       "width": 8.22,
//       "height": 8.57
//     },
//     "weight": 378.57,
//     "barCode": "413383672554",
//     "unitCost": 25.55,
//     "unitPrice": 85.16,
//     "minimumItemThreshold": 11,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model20.pdf",
//     "partNumber": "PN20",
//     "notes": "Notes for product 20",
//     "unitsOnHand": 19
//   },
//   {
//     "productImage": "https://example.com/images/product21.jpg",
//     "description": "High-quality product 21 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "HomeGoods",
//     "itemName": "Product 21 Name",
//     "model": "Model21",
//     "sku": "SKU21",
//     "dimensions": {
//       "length": 16.73,
//       "width": 7.64,
//       "height": 7.37
//     },
//     "weight": 477.3,
//     "barCode": "713238696269",
//     "unitCost": 47.67,
//     "unitPrice": 61.16,
//     "minimumItemThreshold": 5,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model21.pdf",
//     "partNumber": "PN21",
//     "notes": "Notes for product 21",
//     "unitsOnHand": 84
//   },
//   {
//     "productImage": "https://example.com/images/product22.jpg",
//     "description": "High-quality product 22 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 22 Name",
//     "model": "Model22",
//     "sku": "SKU22",
//     "dimensions": {
//       "length": 13.02,
//       "width": 11.22,
//       "height": 4.02
//     },
//     "weight": 106.03,
//     "barCode": "491667366034",
//     "unitCost": 32.06,
//     "unitPrice": 95.15,
//     "minimumItemThreshold": 15,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model22.pdf",
//     "partNumber": "PN22",
//     "notes": "Notes for product 22",
//     "unitsOnHand": 95
//   },
//   {
//     "productImage": "https://example.com/images/product23.jpg",
//     "description": "High-quality product 23 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 23 Name",
//     "model": "Model23",
//     "sku": "SKU23",
//     "dimensions": {
//       "length": 16.88,
//       "width": 10.24,
//       "height": 7.62
//     },
//     "weight": 199.87,
//     "barCode": "249235808812",
//     "unitCost": 19.47,
//     "unitPrice": 57.7,
//     "minimumItemThreshold": 5,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model23.pdf",
//     "partNumber": "PN23",
//     "notes": "Notes for product 23",
//     "unitsOnHand": 26
//   },
//   {
//     "productImage": "https://example.com/images/product24.jpg",
//     "description": "High-quality product 24 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "HomeGoods",
//     "itemName": "Product 24 Name",
//     "model": "Model24",
//     "sku": "SKU24",
//     "dimensions": {
//       "length": 12.34,
//       "width": 5.31,
//       "height": 5.62
//     },
//     "weight": 321.26,
//     "barCode": "381850810856",
//     "unitCost": 15.97,
//     "unitPrice": 81.23,
//     "minimumItemThreshold": 6,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model24.pdf",
//     "partNumber": "PN24",
//     "notes": "Notes for product 24",
//     "unitsOnHand": 99
//   },
//   {
//     "productImage": "https://example.com/images/product25.jpg",
//     "description": "High-quality product 25 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "HomeGoods",
//     "itemName": "Product 25 Name",
//     "model": "Model25",
//     "sku": "SKU25",
//     "dimensions": {
//       "length": 12.49,
//       "width": 9.56,
//       "height": 8.34
//     },
//     "weight": 273.59,
//     "barCode": "940463585495",
//     "unitCost": 49.61,
//     "unitPrice": 47.03,
//     "minimumItemThreshold": 10,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model25.pdf",
//     "partNumber": "PN25",
//     "notes": "Notes for product 25",
//     "unitsOnHand": 19
//   },
//   {
//     "productImage": "https://example.com/images/product26.jpg",
//     "description": "High-quality product 26 with ergonomic design and long battery life.",
//     "category": "Furniture",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 26 Name",
//     "model": "Model26",
//     "sku": "SKU26",
//     "dimensions": {
//       "length": 11.39,
//       "width": 13.79,
//       "height": 4.52
//     },
//     "weight": 186.38,
//     "barCode": "755379136869",
//     "unitCost": 24.7,
//     "unitPrice": 31.58,
//     "minimumItemThreshold": 15,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model26.pdf",
//     "partNumber": "PN26",
//     "notes": "Notes for product 26",
//     "unitsOnHand": 43
//   },
//   {
//     "productImage": "https://example.com/images/product27.jpg",
//     "description": "High-quality product 27 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "FurniCo",
//     "itemName": "Product 27 Name",
//     "model": "Model27",
//     "sku": "SKU27",
//     "dimensions": {
//       "length": 13.12,
//       "width": 6.47,
//       "height": 6.65
//     },
//     "weight": 192.97,
//     "barCode": "615044188002",
//     "unitCost": 25.99,
//     "unitPrice": 45.3,
//     "minimumItemThreshold": 7,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model27.pdf",
//     "partNumber": "PN27",
//     "notes": "Notes for product 27",
//     "unitsOnHand": 61
//   },
//   {
//     "productImage": "https://example.com/images/product28.jpg",
//     "description": "High-quality product 28 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 28 Name",
//     "model": "Model28",
//     "sku": "SKU28",
//     "dimensions": {
//       "length": 18.24,
//       "width": 13.48,
//       "height": 7.74
//     },
//     "weight": 264.92,
//     "barCode": "925350068847",
//     "unitCost": 47.98,
//     "unitPrice": 27.14,
//     "minimumItemThreshold": 15,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model28.pdf",
//     "partNumber": "PN28",
//     "notes": "Notes for product 28",
//     "unitsOnHand": 85
//   },
//   {
//     "productImage": "https://example.com/images/product29.jpg",
//     "description": "High-quality product 29 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 29 Name",
//     "model": "Model29",
//     "sku": "SKU29",
//     "dimensions": {
//       "length": 12.71,
//       "width": 12.38,
//       "height": 7.97
//     },
//     "weight": 367.84,
//     "barCode": "879308664195",
//     "unitCost": 25.29,
//     "unitPrice": 51.0,
//     "minimumItemThreshold": 15,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model29.pdf",
//     "partNumber": "PN29",
//     "notes": "Notes for product 29",
//     "unitsOnHand": 41
//   },
//   {
//     "productImage": "https://example.com/images/product30.jpg",
//     "description": "High-quality product 30 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 30 Name",
//     "model": "Model30",
//     "sku": "SKU30",
//     "dimensions": {
//       "length": 11.87,
//       "width": 10.58,
//       "height": 3.67
//     },
//     "weight": 293.29,
//     "barCode": "975521982279",
//     "unitCost": 23.15,
//     "unitPrice": 78.78,
//     "minimumItemThreshold": 13,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model30.pdf",
//     "partNumber": "PN30",
//     "notes": "Notes for product 30",
//     "unitsOnHand": 70
//   },
//   {
//     "productImage": "https://example.com/images/product31.jpg",
//     "description": "High-quality product 31 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "HomeGoods",
//     "itemName": "Product 31 Name",
//     "model": "Model31",
//     "sku": "SKU31",
//     "dimensions": {
//       "length": 10.48,
//       "width": 10.44,
//       "height": 7.54
//     },
//     "weight": 349.7,
//     "barCode": "695208421867",
//     "unitCost": 49.61,
//     "unitPrice": 61.99,
//     "minimumItemThreshold": 15,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model31.pdf",
//     "partNumber": "PN31",
//     "notes": "Notes for product 31",
//     "unitsOnHand": 84
//   },
//   {
//     "productImage": "https://example.com/images/product32.jpg",
//     "description": "High-quality product 32 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "FurniCo",
//     "itemName": "Product 32 Name",
//     "model": "Model32",
//     "sku": "SKU32",
//     "dimensions": {
//       "length": 10.18,
//       "width": 11.83,
//       "height": 9.86
//     },
//     "weight": 163.3,
//     "barCode": "919032861122",
//     "unitCost": 13.16,
//     "unitPrice": 92.08,
//     "minimumItemThreshold": 6,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model32.pdf",
//     "partNumber": "PN32",
//     "notes": "Notes for product 32",
//     "unitsOnHand": 22
//   },
//   {
//     "productImage": "https://example.com/images/product33.jpg",
//     "description": "High-quality product 33 with ergonomic design and long battery life.",
//     "category": "Furniture",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 33 Name",
//     "model": "Model33",
//     "sku": "SKU33",
//     "dimensions": {
//       "length": 15.84,
//       "width": 12.78,
//       "height": 9.97
//     },
//     "weight": 351.52,
//     "barCode": "221596446176",
//     "unitCost": 19.41,
//     "unitPrice": 59.75,
//     "minimumItemThreshold": 12,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model33.pdf",
//     "partNumber": "PN33",
//     "notes": "Notes for product 33",
//     "unitsOnHand": 85
//   },
//   {
//     "productImage": "https://example.com/images/product34.jpg",
//     "description": "High-quality product 34 with ergonomic design and long battery life.",
//     "category": "Furniture",
//     "manufacturer": "HomeGoods",
//     "itemName": "Product 34 Name",
//     "model": "Model34",
//     "sku": "SKU34",
//     "dimensions": {
//       "length": 11.73,
//       "width": 7.96,
//       "height": 7.0
//     },
//     "weight": 159.21,
//     "barCode": "515466764712",
//     "unitCost": 46.61,
//     "unitPrice": 84.47,
//     "minimumItemThreshold": 10,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model34.pdf",
//     "partNumber": "PN34",
//     "notes": "Notes for product 34",
//     "unitsOnHand": 15
//   },
//   {
//     "productImage": "https://example.com/images/product35.jpg",
//     "description": "High-quality product 35 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 35 Name",
//     "model": "Model35",
//     "sku": "SKU35",
//     "dimensions": {
//       "length": 15.85,
//       "width": 10.31,
//       "height": 6.92
//     },
//     "weight": 278.14,
//     "barCode": "781425437249",
//     "unitCost": 28.44,
//     "unitPrice": 31.12,
//     "minimumItemThreshold": 15,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model35.pdf",
//     "partNumber": "PN35",
//     "notes": "Notes for product 35",
//     "unitsOnHand": 48
//   },
//   {
//     "productImage": "https://example.com/images/product36.jpg",
//     "description": "High-quality product 36 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "FurniCo",
//     "itemName": "Product 36 Name",
//     "model": "Model36",
//     "sku": "SKU36",
//     "dimensions": {
//       "length": 13.79,
//       "width": 6.17,
//       "height": 8.66
//     },
//     "weight": 165.98,
//     "barCode": "755442172225",
//     "unitCost": 39.35,
//     "unitPrice": 77.45,
//     "minimumItemThreshold": 10,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model36.pdf",
//     "partNumber": "PN36",
//     "notes": "Notes for product 36",
//     "unitsOnHand": 14
//   },
//   {
//     "productImage": "https://example.com/images/product37.jpg",
//     "description": "High-quality product 37 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "FurniCo",
//     "itemName": "Product 37 Name",
//     "model": "Model37",
//     "sku": "SKU37",
//     "dimensions": {
//       "length": 11.99,
//       "width": 10.28,
//       "height": 7.43
//     },
//     "weight": 207.58,
//     "barCode": "859226329649",
//     "unitCost": 29.5,
//     "unitPrice": 43.44,
//     "minimumItemThreshold": 10,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model37.pdf",
//     "partNumber": "PN37",
//     "notes": "Notes for product 37",
//     "unitsOnHand": 30
//   },
//   {
//     "productImage": "https://example.com/images/product38.jpg",
//     "description": "High-quality product 38 with ergonomic design and long battery life.",
//     "category": "Furniture",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 38 Name",
//     "model": "Model38",
//     "sku": "SKU38",
//     "dimensions": {
//       "length": 17.97,
//       "width": 5.13,
//       "height": 6.1
//     },
//     "weight": 327.63,
//     "barCode": "176595653479",
//     "unitCost": 27.65,
//     "unitPrice": 49.56,
//     "minimumItemThreshold": 5,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model38.pdf",
//     "partNumber": "PN38",
//     "notes": "Notes for product 38",
//     "unitsOnHand": 20
//   },
//   {
//     "productImage": "https://example.com/images/product39.jpg",
//     "description": "High-quality product 39 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "HomeGoods",
//     "itemName": "Product 39 Name",
//     "model": "Model39",
//     "sku": "SKU39",
//     "dimensions": {
//       "length": 14.97,
//       "width": 5.26,
//       "height": 8.73
//     },
//     "weight": 497.5,
//     "barCode": "574857622140",
//     "unitCost": 41.64,
//     "unitPrice": 35.35,
//     "minimumItemThreshold": 8,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model39.pdf",
//     "partNumber": "PN39",
//     "notes": "Notes for product 39",
//     "unitsOnHand": 44
//   },
//   {
//     "productImage": "https://example.com/images/product40.jpg",
//     "description": "High-quality product 40 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "HomeGoods",
//     "itemName": "Product 40 Name",
//     "model": "Model40",
//     "sku": "SKU40",
//     "dimensions": {
//       "length": 14.65,
//       "width": 12.73,
//       "height": 7.74
//     },
//     "weight": 310.33,
//     "barCode": "852920777704",
//     "unitCost": 13.34,
//     "unitPrice": 40.42,
//     "minimumItemThreshold": 12,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model40.pdf",
//     "partNumber": "PN40",
//     "notes": "Notes for product 40",
//     "unitsOnHand": 88
//   },
//   {
//     "productImage": "https://example.com/images/product41.jpg",
//     "description": "High-quality product 41 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 41 Name",
//     "model": "Model41",
//     "sku": "SKU41",
//     "dimensions": {
//       "length": 12.76,
//       "width": 12.97,
//       "height": 7.93
//     },
//     "weight": 408.86,
//     "barCode": "374899528127",
//     "unitCost": 21.83,
//     "unitPrice": 50.33,
//     "minimumItemThreshold": 15,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model41.pdf",
//     "partNumber": "PN41",
//     "notes": "Notes for product 41",
//     "unitsOnHand": 12
//   },
//   {
//     "productImage": "https://example.com/images/product42.jpg",
//     "description": "High-quality product 42 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 42 Name",
//     "model": "Model42",
//     "sku": "SKU42",
//     "dimensions": {
//       "length": 18.56,
//       "width": 11.09,
//       "height": 6.97
//     },
//     "weight": 151.39,
//     "barCode": "121056204815",
//     "unitCost": 17.96,
//     "unitPrice": 59.88,
//     "minimumItemThreshold": 5,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model42.pdf",
//     "partNumber": "PN42",
//     "notes": "Notes for product 42",
//     "unitsOnHand": 19
//   },
//   {
//     "productImage": "https://example.com/images/product43.jpg",
//     "description": "High-quality product 43 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 43 Name",
//     "model": "Model43",
//     "sku": "SKU43",
//     "dimensions": {
//       "length": 14.71,
//       "width": 8.5,
//       "height": 4.51
//     },
//     "weight": 468.52,
//     "barCode": "391299899348",
//     "unitCost": 24.94,
//     "unitPrice": 66.56,
//     "minimumItemThreshold": 6,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model43.pdf",
//     "partNumber": "PN43",
//     "notes": "Notes for product 43",
//     "unitsOnHand": 10
//   },
//   {
//     "productImage": "https://example.com/images/product44.jpg",
//     "description": "High-quality product 44 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "HomeGoods",
//     "itemName": "Product 44 Name",
//     "model": "Model44",
//     "sku": "SKU44",
//     "dimensions": {
//       "length": 19.33,
//       "width": 9.21,
//       "height": 5.11
//     },
//     "weight": 111.93,
//     "barCode": "926140686161",
//     "unitCost": 45.02,
//     "unitPrice": 62.09,
//     "minimumItemThreshold": 9,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model44.pdf",
//     "partNumber": "PN44",
//     "notes": "Notes for product 44",
//     "unitsOnHand": 81
//   },
//   {
//     "productImage": "https://example.com/images/product45.jpg",
//     "description": "High-quality product 45 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 45 Name",
//     "model": "Model45",
//     "sku": "SKU45",
//     "dimensions": {
//       "length": 16.2,
//       "width": 9.03,
//       "height": 4.42
//     },
//     "weight": 372.23,
//     "barCode": "578442963617",
//     "unitCost": 38.98,
//     "unitPrice": 22.23,
//     "minimumItemThreshold": 5,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model45.pdf",
//     "partNumber": "PN45",
//     "notes": "Notes for product 45",
//     "unitsOnHand": 43
//   },
//   {
//     "productImage": "https://example.com/images/product46.jpg",
//     "description": "High-quality product 46 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 46 Name",
//     "model": "Model46",
//     "sku": "SKU46",
//     "dimensions": {
//       "length": 19.2,
//       "width": 8.61,
//       "height": 6.01
//     },
//     "weight": 144.16,
//     "barCode": "843471646005",
//     "unitCost": 23.41,
//     "unitPrice": 49.18,
//     "minimumItemThreshold": 15,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model46.pdf",
//     "partNumber": "PN46",
//     "notes": "Notes for product 46",
//     "unitsOnHand": 35
//   },
//   {
//     "productImage": "https://example.com/images/product47.jpg",
//     "description": "High-quality product 47 with ergonomic design and long battery life.",
//     "category": "Furniture",
//     "manufacturer": "FurniCo",
//     "itemName": "Product 47 Name",
//     "model": "Model47",
//     "sku": "SKU47",
//     "dimensions": {
//       "length": 10.63,
//       "width": 6.0,
//       "height": 7.24
//     },
//     "weight": 350.45,
//     "barCode": "133765460741",
//     "unitCost": 29.66,
//     "unitPrice": 85.56,
//     "minimumItemThreshold": 14,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model47.pdf",
//     "partNumber": "PN47",
//     "notes": "Notes for product 47",
//     "unitsOnHand": 28
//   },
//   {
//     "productImage": "https://example.com/images/product48.jpg",
//     "description": "High-quality product 48 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 48 Name",
//     "model": "Model48",
//     "sku": "SKU48",
//     "dimensions": {
//       "length": 13.49,
//       "width": 7.62,
//       "height": 8.16
//     },
//     "weight": 324.29,
//     "barCode": "813607592640",
//     "unitCost": 13.97,
//     "unitPrice": 80.15,
//     "minimumItemThreshold": 7,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model48.pdf",
//     "partNumber": "PN48",
//     "notes": "Notes for product 48",
//     "unitsOnHand": 61
//   },
//   {
//     "productImage": "https://example.com/images/product49.jpg",
//     "description": "High-quality product 49 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 49 Name",
//     "model": "Model49",
//     "sku": "SKU49",
//     "dimensions": {
//       "length": 19.91,
//       "width": 14.58,
//       "height": 9.53
//     },
//     "weight": 118.11,
//     "barCode": "807060680866",
//     "unitCost": 27.91,
//     "unitPrice": 90.18,
//     "minimumItemThreshold": 6,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model49.pdf",
//     "partNumber": "PN49",
//     "notes": "Notes for product 49",
//     "unitsOnHand": 41
//   },
//   {
//     "productImage": "https://example.com/images/product50.jpg",
//     "description": "High-quality product 50 with ergonomic design and long battery life.",
//     "category": "Furniture",
//     "manufacturer": "HomeGoods",
//     "itemName": "Product 50 Name",
//     "model": "Model50",
//     "sku": "SKU50",
//     "dimensions": {
//       "length": 19.29,
//       "width": 8.93,
//       "height": 8.81
//     },
//     "weight": 106.0,
//     "barCode": "269481965792",
//     "unitCost": 36.81,
//     "unitPrice": 98.93,
//     "minimumItemThreshold": 13,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model50.pdf",
//     "partNumber": "PN50",
//     "notes": "Notes for product 50",
//     "unitsOnHand": 46
//   },
//   {
//     "productImage": "https://example.com/images/product51.jpg",
//     "description": "High-quality product 51 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 51 Name",
//     "model": "Model51",
//     "sku": "SKU51",
//     "dimensions": {
//       "length": 11.45,
//       "width": 11.75,
//       "height": 7.11
//     },
//     "weight": 267.1,
//     "barCode": "126737347923",
//     "unitCost": 12.14,
//     "unitPrice": 53.58,
//     "minimumItemThreshold": 7,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model51.pdf",
//     "partNumber": "PN51",
//     "notes": "Notes for product 51",
//     "unitsOnHand": 97
//   },
//   {
//     "productImage": "https://example.com/images/product52.jpg",
//     "description": "High-quality product 52 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 52 Name",
//     "model": "Model52",
//     "sku": "SKU52",
//     "dimensions": {
//       "length": 14.14,
//       "width": 10.91,
//       "height": 3.84
//     },
//     "weight": 131.55,
//     "barCode": "388246295015",
//     "unitCost": 14.28,
//     "unitPrice": 69.99,
//     "minimumItemThreshold": 6,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model52.pdf",
//     "partNumber": "PN52",
//     "notes": "Notes for product 52",
//     "unitsOnHand": 95
//   },
//   {
//     "productImage": "https://example.com/images/product53.jpg",
//     "description": "High-quality product 53 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "HomeGoods",
//     "itemName": "Product 53 Name",
//     "model": "Model53",
//     "sku": "SKU53",
//     "dimensions": {
//       "length": 14.44,
//       "width": 12.21,
//       "height": 4.59
//     },
//     "weight": 281.93,
//     "barCode": "422068220916",
//     "unitCost": 26.31,
//     "unitPrice": 40.79,
//     "minimumItemThreshold": 12,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model53.pdf",
//     "partNumber": "PN53",
//     "notes": "Notes for product 53",
//     "unitsOnHand": 33
//   },
//   {
//     "productImage": "https://example.com/images/product54.jpg",
//     "description": "High-quality product 54 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "HomeGoods",
//     "itemName": "Product 54 Name",
//     "model": "Model54",
//     "sku": "SKU54",
//     "dimensions": {
//       "length": 18.92,
//       "width": 10.8,
//       "height": 8.28
//     },
//     "weight": 336.47,
//     "barCode": "713947324985",
//     "unitCost": 41.26,
//     "unitPrice": 82.58,
//     "minimumItemThreshold": 15,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model54.pdf",
//     "partNumber": "PN54",
//     "notes": "Notes for product 54",
//     "unitsOnHand": 17
//   },
//   {
//     "productImage": "https://example.com/images/product55.jpg",
//     "description": "High-quality product 55 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "HomeGoods",
//     "itemName": "Product 55 Name",
//     "model": "Model55",
//     "sku": "SKU55",
//     "dimensions": {
//       "length": 10.0,
//       "width": 14.71,
//       "height": 9.94
//     },
//     "weight": 144.36,
//     "barCode": "412757611055",
//     "unitCost": 46.99,
//     "unitPrice": 51.25,
//     "minimumItemThreshold": 13,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model55.pdf",
//     "partNumber": "PN55",
//     "notes": "Notes for product 55",
//     "unitsOnHand": 43
//   },
//   {
//     "productImage": "https://example.com/images/product56.jpg",
//     "description": "High-quality product 56 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 56 Name",
//     "model": "Model56",
//     "sku": "SKU56",
//     "dimensions": {
//       "length": 11.18,
//       "width": 14.03,
//       "height": 6.79
//     },
//     "weight": 317.97,
//     "barCode": "550664735845",
//     "unitCost": 49.56,
//     "unitPrice": 25.96,
//     "minimumItemThreshold": 11,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model56.pdf",
//     "partNumber": "PN56",
//     "notes": "Notes for product 56",
//     "unitsOnHand": 89
//   },
//   {
//     "productImage": "https://example.com/images/product57.jpg",
//     "description": "High-quality product 57 with ergonomic design and long battery life.",
//     "category": "Furniture",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 57 Name",
//     "model": "Model57",
//     "sku": "SKU57",
//     "dimensions": {
//       "length": 16.77,
//       "width": 7.66,
//       "height": 8.28
//     },
//     "weight": 169.61,
//     "barCode": "733886890455",
//     "unitCost": 42.73,
//     "unitPrice": 69.83,
//     "minimumItemThreshold": 6,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Home"
//     ],
//     "specSheet": "https://example.com/specs/model57.pdf",
//     "partNumber": "PN57",
//     "notes": "Notes for product 57",
//     "unitsOnHand": 100
//   },
//   {
//     "productImage": "https://example.com/images/product58.jpg",
//     "description": "High-quality product 58 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 58 Name",
//     "model": "Model58",
//     "sku": "SKU58",
//     "dimensions": {
//       "length": 10.13,
//       "width": 9.23,
//       "height": 8.08
//     },
//     "weight": 104.19,
//     "barCode": "366876645146",
//     "unitCost": 20.88,
//     "unitPrice": 33.64,
//     "minimumItemThreshold": 9,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model58.pdf",
//     "partNumber": "PN58",
//     "notes": "Notes for product 58",
//     "unitsOnHand": 73
//   },
//   {
//     "productImage": "https://example.com/images/product59.jpg",
//     "description": "High-quality product 59 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 59 Name",
//     "model": "Model59",
//     "sku": "SKU59",
//     "dimensions": {
//       "length": 10.92,
//       "width": 9.82,
//       "height": 4.77
//     },
//     "weight": 249.05,
//     "barCode": "935181829280",
//     "unitCost": 42.28,
//     "unitPrice": 79.13,
//     "minimumItemThreshold": 8,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model59.pdf",
//     "partNumber": "PN59",
//     "notes": "Notes for product 59",
//     "unitsOnHand": 73
//   },
//   {
//     "productImage": "https://example.com/images/product60.jpg",
//     "description": "High-quality product 60 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "TechBrand",
//     "itemName": "Product 60 Name",
//     "model": "Model60",
//     "sku": "SKU60",
//     "dimensions": {
//       "length": 11.23,
//       "width": 14.72,
//       "height": 5.63
//     },
//     "weight": 249.08,
//     "barCode": "686548618425",
//     "unitCost": 24.53,
//     "unitPrice": 57.55,
//     "minimumItemThreshold": 15,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model60.pdf",
//     "partNumber": "PN60",
//     "notes": "Notes for product 60",
//     "unitsOnHand": 85
//   },
//   {
//     "productImage": "https://example.com/images/product61.jpg",
//     "description": "High-quality product 61 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "HomeGoods",
//     "itemName": "Product 61 Name",
//     "model": "Model61",
//     "sku": "SKU61",
//     "dimensions": {
//       "length": 18.93,
//       "width": 7.07,
//       "height": 5.29
//     },
//     "weight": 174.7,
//     "barCode": "668655878362",
//     "unitCost": 44.27,
//     "unitPrice": 89.32,
//     "minimumItemThreshold": 10,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model61.pdf",
//     "partNumber": "PN61",
//     "notes": "Notes for product 61",
//     "unitsOnHand": 15
//   },
//   {
//     "productImage": "https://example.com/images/product62.jpg",
//     "description": "High-quality product 62 with ergonomic design and long battery life.",
//     "category": "Furniture",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 62 Name",
//     "model": "Model62",
//     "sku": "SKU62",
//     "dimensions": {
//       "length": 14.19,
//       "width": 7.81,
//       "height": 4.22
//     },
//     "weight": 257.99,
//     "barCode": "173210647715",
//     "unitCost": 18.53,
//     "unitPrice": 59.56,
//     "minimumItemThreshold": 11,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model62.pdf",
//     "partNumber": "PN62",
//     "notes": "Notes for product 62",
//     "unitsOnHand": 69
//   },
//   {
//     "productImage": "https://example.com/images/product63.jpg",
//     "description": "High-quality product 63 with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "FurniCo",
//     "itemName": "Product 63 Name",
//     "model": "Model63",
//     "sku": "SKU63",
//     "dimensions": {
//       "length": 12.49,
//       "width": 14.87,
//       "height": 8.72
//     },
//     "weight": 109.9,
//     "barCode": "720464213684",
//     "unitCost": 31.06,
//     "unitPrice": 50.39,
//     "minimumItemThreshold": 10,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model63.pdf",
//     "partNumber": "PN63",
//     "notes": "Notes for product 63",
//     "unitsOnHand": 28
//   },
//   {
//     "productImage": "https://example.com/images/product64.jpg",
//     "description": "High-quality product 64 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 64 Name",
//     "model": "Model64",
//     "sku": "SKU64",
//     "dimensions": {
//       "length": 15.27,
//       "width": 6.87,
//       "height": 6.58
//     },
//     "weight": 281.79,
//     "barCode": "314339978062",
//     "unitCost": 40.45,
//     "unitPrice": 46.07,
//     "minimumItemThreshold": 14,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model64.pdf",
//     "partNumber": "PN64",
//     "notes": "Notes for product 64",
//     "unitsOnHand": 13
//   },
//   {
//     "productImage": "https://example.com/images/product65.jpg",
//     "description": "High-quality product 65 with ergonomic design and long battery life.",
//     "category": "Furniture",
//     "manufacturer": "FurniCo",
//     "itemName": "Product 65 Name",
//     "model": "Model65",
//     "sku": "SKU65",
//     "dimensions": {
//       "length": 13.22,
//       "width": 9.21,
//       "height": 3.43
//     },
//     "weight": 253.18,
//     "barCode": "956236349797",
//     "unitCost": 16.08,
//     "unitPrice": 91.2,
//     "minimumItemThreshold": 11,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model65.pdf",
//     "partNumber": "PN65",
//     "notes": "Notes for product 65",
//     "unitsOnHand": 24
//   },
//   {
//     "productImage": "https://example.com/images/product66.jpg",
//     "description": "High-quality product 66 with ergonomic design and long battery life.",
//     "category": "Toys",
//     "manufacturer": "FurniCo",
//     "itemName": "Product 66 Name",
//     "model": "Model66",
//     "sku": "SKU66",
//     "dimensions": {
//       "length": 13.77,
//       "width": 6.82,
//       "height": 8.76
//     },
//     "weight": 349.17,
//     "barCode": "307455599012",
//     "unitCost": 48.6,
//     "unitPrice": 55.66,
//     "minimumItemThreshold": 7,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model66.pdf",
//     "partNumber": "PN66",
//     "notes": "Notes for product 66",
//     "unitsOnHand": 28
//   },
//   {
//     "productImage": "https://example.com/images/product67.jpg",
//     "description": "High-quality product 67 with ergonomic design and long battery life.",
//     "category": "Furniture",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 67 Name",
//     "model": "Model67",
//     "sku": "SKU67",
//     "dimensions": {
//       "length": 19.92,
//       "width": 11.02,
//       "height": 6.16
//     },
//     "weight": 262.66,
//     "barCode": "986640988449",
//     "unitCost": 15.58,
//     "unitPrice": 35.31,
//     "minimumItemThreshold": 6,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model67.pdf",
//     "partNumber": "PN67",
//     "notes": "Notes for product 67",
//     "unitsOnHand": 62
//   },
//   {
//     "productImage": "https://example.com/images/product68.jpg",
//     "description": "High-quality product 68 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "FurniCo",
//     "itemName": "Product 68 Name",
//     "model": "Model68",
//     "sku": "SKU68",
//     "dimensions": {
//       "length": 13.38,
//       "width": 10.58,
//       "height": 5.11
//     },
//     "weight": 219.74,
//     "barCode": "291119062515",
//     "unitCost": 34.21,
//     "unitPrice": 41.23,
//     "minimumItemThreshold": 13,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Electronics"
//     ],
//     "specSheet": "https://example.com/specs/model68.pdf",
//     "partNumber": "PN68",
//     "notes": "Notes for product 68",
//     "unitsOnHand": 19
//   },
//   {
//     "productImage": "https://example.com/images/product69.jpg",
//     "description": "High-quality product 69 with ergonomic design and long battery life.",
//     "category": "Home Appliances",
//     "manufacturer": "ToyMakers",
//     "itemName": "Product 69 Name",
//     "model": "Model69",
//     "sku": "SKU69",
//     "dimensions": {
//       "length": 19.51,
//       "width": 5.27,
//       "height": 4.09
//     },
//     "weight": 316.64,
//     "barCode": "507050006294",
//     "unitCost": 32.5,
//     "unitPrice": 42.5,
//     "minimumItemThreshold": 15,
//     "tags": [
//       "wireless",
//       "ergonomic",
//       "product",
//       "Office"
//     ],
//     "specSheet": "https://example.com/specs/model69.pdf",
//     "partNumber": "PN69",
//     "notes": "Notes for product 69",
//     "unitsOnHand": 81
//   }])