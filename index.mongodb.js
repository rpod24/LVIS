/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('support');
// db.createCollection('tickets');

// db.tickets.insertOne({
//     "status": "open",
//     "date": "2024-05-17T12:34:56Z",
//     "modifiedBy": "John Doe",
//     "facilityName": "Main Facility",
//     "facilityType": "Warehouse",
//     "supportTicketNumber": 0,
//     "problem": "Network outage",
//     "contactMethod": "email",
//     "email": "contact@example.com",
//     "phoneNumber": "123-456-7890",
//     "voicemail": "Customer left a voicemail regarding the network issue.",
//     "needToFollowUp": true,
//     "timeOfVoicemail": "2024-05-17T08:00:00Z",
//     "nameOfCaller": "Jane Smith",
//     "problemSubCategory": "Internet",
//     "notes": [
//         {
//             "note": "Initial report of the issue.",
//             "date": "2024-05-17T09:00:00Z",
//             "person": "John Doe"
//         },
//         {
//             "note": "Checked the network settings, everything seems fine.",
//             "date": "2024-05-17T10:00:00Z",
//             "person": "Jane Smith"
//         }
//     ]
// })
// Create a new index in the collection.
//create a text index on all the string fields of the following:
// "status": "open",
//     "date": "2024-05-17T12:34:56Z",
//     "modifiedBy": "John Doe",
//     "facilityName": "Main Facility",
//     "facilityType": "Warehouse",
//     "supportTicketNumber": 0,
//     "problem": "Network outage",
//     "contactMethod": "email",
//     "email": "contact@example.com",
//     "phoneNumber": "123-456-7890",
//     "voicemail": "Customer left a voicemail regarding the network issue.",
//     "needToFollowUp": true,
//     "timeOfVoicemail": "2024-05-17T08:00:00Z",
//     "nameOfCaller": "Jane Smith",
//     "problemSubCategory": "Internet",
//     "notes": [
//         {
//             "note": "Initial report of the issue.",
//             "date": "2024-05-17T09:00:00Z",
//             "person": "John Doe"
//         },
//         {
//             "note": "Checked the network settings, everything seems fine.",
//             "date": "2024-05-17T10:00:00Z",
//             "person": "Jane Smith"
//         }
//     ]

// db.tickets.createIndex({
//     status: 'text',
//     date: 'text',
//     modifiedBy: 'text',
//     facilityName: 'text',
//     facilityType: 'text',
//     supportTicketNumber: 'text',
//     problem: 'text',
//     contactMethod: 'text',
//     email: 'text',
//     phoneNumber: 'text',
//     voicemail: 'text',
//     timeOfVoicemail: 'text',
//     nameOfCaller: 'text',
//     problemSubCategory: 'text',
//     notes: 'text',
// });


// db.tickets.dropIndex("modifiedBy_text");


db.tickets.createIndex({
    date: 1,
    modifiedBy: 1,
    facilityName: 1,
    supportTicketNumber: 1,
    problem: 1,
});

// db.tickets.createIndex({
//     modifiedBy: 'text',
// });

// db.tickets.createIndex({
//     facilityName: 'text',
// });

// db.tickets.createIndex({
//     facilityType: 'text',
// });

// db.tickets.createIndex({
//     supportTicketNumber: 'text',
// });

// db.tickets.createIndex({
//     problem: 'text',
// });

// db.tickets.createIndex({
//     contactMethod: 'text',
// });

// db.tickets.createIndex({
//     email: 'text',
// });

// db.tickets.createIndex({
//     phoneNumber: 'text',
// });

// db.tickets.createIndex({
//     voicemail: 'text',
// });

// db.tickets.createIndex({
//     timeOfVoicemail: 'text',
// });

// db.tickets.createIndex({
//     nameOfCaller: 'text',
// });

// db.tickets.createIndex({
//     problemSubCategory: 'text',
// });

// db.tickets.createIndex({
//     notes: 'text',
// });
