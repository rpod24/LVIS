// use('configs');

// db.createCollection("Facility")
// db.createCollection("Group")
// db.createCollection("Room")
// db.createCollection("Location")
// db.createCollection("CMS")
// db.createCollection("MED")
// db.createCollection("Monitor")
// db.createCollection("ConfigAlert")
// db.createCollection("ConfigCMS")
// db.createCollection("ConfigMED")

// db.Facility.insertOne({
//     "PartitionKey": "CAVN001",
//     "RowKey": "",
//     "FacilityID": "CAVN001",
//     "Name": "California Ventilator Hospital",
//     "ShortName": "Vent Hospital",
//     "Address1": "101 Highway Drive",
//     "Address2": "",
//     "City": "San Diego",
//     "State": "CA",
//     "Zip": "92078",
//     "TimeZone": "PST",
//     "Country": "USA",
//     "Coordinates": "{'lat': 12.34567890, 'lon': 12.34567890}",
//     "Phone": "000-000-0000",
//     "PrimaryContact": "1234567890",
//     "Product": "REA",
//     "CMSVersion": "",
//     "Status": "",
//     "ServiceStatus": "",
//     "ServiceDetail": "",
//     "ServiceHistory": "[['2024-05-22T21:43:50.874Z', 'null']]",
//     "LastRecordDT": "",
//     "UpdateFromDT": "",
//     "StartQueue": "",
//     "Dirty": false,
//     "Locked": false,
// });
// db.Group.insertOne({
//     "PartitionKey": "CAVN001",
//     "RowKey": "GR01",
//     "FacilityID": "CAVN001",
//     "GroupID": "GR01",
//     "Name": "Full Group Name",
//     "ShortName": "Group",
//     "ServiceHistory": "[['2024-05-22T21:43:50.874Z', 'null']]",
//     "Installation": "Installed",
//     "Spare": false,
//     "LastRecordDT": "",
//     "UpdateFromDT": "",
// });
// db.Room.insertOne({
//     "PartitionKey": "CAVN001",
//     "RowKey": "CAVN001_001",
//     "FacilityID": "CAVN001",
//     "GroupID": "GR01",
//     "RoomID": "001",
//     "ServiceHistory": "[['2024-05-22T21:43:50.874Z', 'null']]",
//     "Spare": false,
// });
// db.Location.insertOne({
//     "PartitionKey": "CAVN001",
//     "RowKey": "",
//     "GroupID": "GR01",
//     "RoomID": "001",
//     "LocationID": "101",
//     "LocationSN": "1029",
//     "ServiceHistory": "[['2024-05-22T21:43:50.874Z', 'null']]",
//     "Spare": false,
//     "Portable": false
// });
// db.CMS.insertOne({
//     "PartitionKey": "CAVN001",
//     "RowKey": "CAVN001_GR01_A",
//     "FacilityID": "CAVN001",
//     "GroupID": "GR01",
//     "CMS": "A",
//     "ConfigID": "All",
//     "HWVersion": "",
//     "OSVersion": "",
//     "SWVersion": "",
//     "PTVersion": "",
//     "RadioVersion": "",
//     "LastBootDT": "",
//     "LastSyncedDT": "",
//     "LastSignal": "",
//     "TimeOffset": "",
//     "Status": ""
// });
// db.MED.insertOne({
//     "PartitionKey": "CAVN001",
//     "RowKey": "AA",
//     "FacilityID": "CAVN001",
//     "MedID": "AA",
//     "ConfigID": "All",
//     "HWType": "",
//     "HWVersion": "",
//     "OSVersion": "",
//     "SWVersion": "",
//     "LastBootDT": "",
//     "Status": ""
// });
// db.Monitor.insertOne({
//     "PartitionKey": "CAVN001",
//     "RowKey": "142100001",
//     "Timestamp": "Datetime",
//     "LastGroupID": "GR01",
//     "LastLocationID": "",
//     "MonitorID": "0001",
//     "MonitorSN": "142100001",
//     "ServiceHistory": "[['2024-05-22T21:43:50.874Z', 'null']]",
//     "Model": "LinQvue REA",
//     "HWVersion": "",
//     "SWVersion": "",
//     "BatteryState": "",
//     "LastBattery": "",
//     "LastTxID": "",
//     "LastRecordDT": "",
//     "LastSequence": "",
//     "LastSequenceDT": "",
//     "SignalCMS": "",
//     "Status": "",
//     "ServiceDetail": "",
//     "UpdateFromDT": ""
// });
// db.ConfigAlert.insertOne({
//     "AlertMin": {
//         "PartitionKey": "CAVN001",
//         "RowKey": "AM001",
//         "DefinitionType": "AlertMin",
//         "Shift": "All",
//         "EquipmentType": "Facility",
//         "ID": "",
//         "AlertFilter": "All",
//         "DevFilter": "All",
//         "Enabled": true,
//         "Seconds": -1,
//         "SecondsFromStart": 0,
//         "SecondsFromClear": -1,
//         "Color1": "",
//         "Color2": "",
//         "Blinks": false,
//         "SortLast": false,
//         "Tone": "",
//         "Repeats": false,
//         "Volume": -1,
//         "AlertCount": -1,
//         "Timeout": -1
//     },
//     "Timeout": {
//         "PartitionKey": "CAVN001",
//         "RowKey": "TO001",
//         "DefinitionType": "Timeout",
//         "Shift": "All",
//         "EquipmentType": "Facility",
//         "ID": "",
//         "AlertFilter": "All",
//         "DevFilter": "All",
//         "Enabled": true,
//         "Seconds": -1,
//         "SecondsFromStart": -1,
//         "SecondsFromClear": 0,
//         "Color1": "",
//         "Color2": "",
//         "Blinks": false,
//         "SortLast": false,
//         "Tone": "",
//         "Repeats": false,
//         "Volume": -1,
//         "AlertCount": -1,
//         "Timeout": -1
//     },
//     "Activity": {
//         "PartitionKey": "CAVN001",
//         "RowKey": "TO001",
//         "DefinitionType": "ActivityWarning",
//         "Shift": "All",
//         "EquipmentType": "Facility",
//         "ID": "",
//         "AlertFilter": "All",
//         "DevFilter": "All",
//         "Enabled": true,
//         "Seconds": 5,
//         "SecondsFromStart": -1,
//         "SecondsFromClear": -1,
//         "Color1": "",
//         "Color2": "",
//         "Blinks": false,
//         "SortLast": false,
//         "Tone": "",
//         "Repeats": false,
//         "Volume": -1,
//         "AlertCount": -1,
//         "Timeout": -1
//     },
//     "Elevation": [
//         {
//             "PartitionKey": "CAVN001",
//             "RowKey": "EL001",
//             "DefinitionType": "Timeout",
//             "Shift": "All",
//             "EquipmentType": "Facility",
//             "ID": "",
//             "AlertFilter": "All",
//             "DevFilter": "All",
//             "Enabled": true,
//             "Seconds": 5,
//             "SecondsFromStart": -1,
//             "SecondsFromClear": -1,
//             "Color1": "yellow",
//             "Color2": "dark_yellow",
//             "Blinks": true,
//             "SortLast": false,
//             "Tone": "Short",
//             "Repeats": false,
//             "Volume": 64,
//             "AlertCount": 1,
//             "Timeout": 5
//         },
//         {
//             "PartitionKey": "CAVN001",
//             "RowKey": "EL002",
//             "DefinitionType": "Timeout",
//             "Shift": "All",
//             "EquipmentType": "Facility",
//             "ID": "",
//             "AlertFilter": "All",
//             "DevFilter": "All",
//             "Enabled": true,
//             "Seconds": 10,
//             "SecondsFromStart": -1,
//             "SecondsFromClear": -1,
//             "Color1": "yellow",
//             "Color2": "dark_yellow",
//             "Blinks": true,
//             "SortLast": false,
//             "Tone": "Short",
//             "Repeats": false,
//             "Volume": 64,
//             "AlertCount": 1,
//             "Timeout": 15
//         }
//     ]
// });
// db.ConfigCMS.insertOne({
//     "PartitionKey": "CAVN001",
//     "RowKey": "CAVN001_CMS_Main",
//     "FacilityID": "CAVN001",
//     "ShowGroupOnly": false,
//     "ShowLocationPane": false,
//     "ShowEmptyRooms": false,
//     "ShowAllStatus": false,
//     "ShowSpares": false,
//     "StatusDirection": "Down",
//     "ColumnLeveling": false,
//     "DefaultVolume": 64,
//     "PlayConnectTones": false,
//     "PlayDCConnectTones": false,
//     "PlayLocConnectTones": false,
//     "UseMobileWarn": false,
//     "RecentAlertPeriod": 10,
//     "ShowResponse": false,
//     "ResponseTarget": 10,
//     "CustomPort": "AUX",
//     "DisableScreen": false,
//     "VendorMessage": "",
//     "SyncTimeout": 30,
//     "SyncInterval": 30,
//     "SyncFailToOffline": 15,
//     "FullSyncInterval": 40,
//     "CheckInPeriod": 30
// });
// db.ConfigMED.insertOne({
//     "PartitionKey": "CAVN001",
//     "RowKey": "CAVN001_MED_Main",
//     "FacilityID": "CAVN001",
//     "GroupIDs": "All",
//     "DisableSettings": "[]",
//     "Brightness": "75",
//     "MaxEscalation": false,
//     "Notification": 30,
//     "Vibration": true,
//     "Volume": 100,
//     "Ucode": "0001",
//     "SUCode": "0002",
//     "Acode": "0003"
//   });

// use('inventory')
// db.createCollection('products')
// db.createCollection('inventory')
// db.products.insertOne({
//     "productImage": "https://example.com/images/product123.jpg",
//     "description": "High-quality wireless mouse with ergonomic design and long battery life.",
//     "category": "Electronics",
//     "manufacturer": "TechBrand",
//     "itemName": "Wireless Ergonomic Mouse",
//     "model": "TechMouseX100",
//     "sku": "123456",
//     "dimensions": {
//         "length": 12,
//         "width": 7.5,
//         "height": 4
//     },
//     "weight": 150,
//     "barCode": "123456789012",
//     "unitCost": 20,
//     "unitPrice": 35.99,
//     "minimumItemThreshold": 10,
//     "tags": [
//         "wireless",
//         "ergonomic",
//         "mouse",
//         "electronics",
//         "TechBrand"
//     ],
//     "specSheet": "https://example.com/specs/techmousex100.pdf",
//     "partNumber": "TMX100-PN",
//     "notes": "Compatible with both Windows and Mac OS.",
//     "unitsOnHand": 50
// })

// db.inventory.insertOne({
//     "product_sku": "123456",
//     "date": {
//         "$date": "2024-05-17T21:20:38.748Z"
//     },
//     "lot_number": "123456",
//     "tracking_number": "789012",
//     "tracking_vendor": "vendor",
//     "destination": "destination",
//     "invoice": "invoice",
//     "units_in": 10,
//     "units_out": 5
// }
// );


// use('support')
// db.createCollection('tickets')
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

// use('sensitive_data')
// db.createCollection('users')
// db.users.insertOne({
//     "username": "",
//     "password": {
//       "$binary": {
//         "base64": "JDJiJDEyJHl5V1Vrb3luWm1CQUg4NUtJSkJoNGVheThiV3V6LkJ6LnplMDJucEZvbVQ1emNYZnc3NHdh",
//         "subType": "00"
//       }
//     },
//     "permissions": 2,
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IiIsInBlcm1pc3Npb24iOjIsImV4cCI6MTcyMDUyMzA4N30.3GL7kwAsRg74GimBkuM8LWEDKK9xvLnr9JRWsfYVmYs"
//   });

use('manifest')
db.createCollection('manifest')
// db.customers.insertOne()
// db.customers.insertOne({
//     "facilityName": "Required",
//     "state": "Required",
//     "city": "",
//     "zip": "",
//     "phone": "",
//     "facilityID": "",
//     "product": "Required",
//     "productVersion": 0,
//     "installationDate": "",
//     "stagingDeadline": "",
//     "assemblyDeadline": "",
//     "assemblyDate": "",
//     "QADate": "",
//     "shippingDate": "",
//     "transmitters": 0,
//     "sparesTransmitters": 0,
//     "CMSs": 0,
//     "headlessCMSs": 0,
//     "MEDs": 0,
//     "displays": {
//     },
//     "contacts": [
//     ],
//     "notes": [
//     ],
//     "website": "",
//     "wifi": [
//     ],
//     "facilityMapURL": [
//     ],
//     "mapHasCMS": false,
//     "mapLayoutPhoto": [],
//     "powerCables": [
//     ],
//     "roomList": [
//     ],
//     "transmitterSketch": "",
//     "CMSDisplaySoftwareFile": "",
//     "radioSoftwareFile": "",
//     "radioType": "",
//     "MEDModel": "",
//     "MEDSoftwareVersion": -1,
//     "normallyOpen": false,
//     "nextStep": "",
//     "CMSAssembly": [
//     ],
//     "MEDAsssembly": [
//     ],
//     "transmitterAssembly": [
//     ],
//     "qualityAssurance": {
//         "preshipping": [
//             {
//                 "qa": "QA1",
//                 "status": false,
//                 "date": ""
//             }
//         ],
//         "followUp": [
//             {
//                 "qa": "QA1",
//                 "status": false,
//                 "date": ""
//             }
//         ]
//     },
//     "qualityAssuranceDate": "",
//     "qaApprovedStaffMember": "",
//     "shippingMethod": "",
//     "shippingChecklistItems": {
//         "quantityOfTransmitters": 0,
//         "quantityOfiQMounts": 0,
//         "quantityOfCMSs": 0,
//         "quantityOfHeadlessCMSs": 0,
//         "quantityOfMEDs": 0,
//         "numberOfChargers": 0,
//         "quantityOfDisplays": {},
//         "mountTypesIncluded": {
//             "wall": 0,
//             "articulating": 0,
//             "floor": 0
//         },
//         "cordsIncluded": {},
//         "hardwareIncluded": false,
//         "batteriesIncluded": false,
//         "securityScrewIncluded": false,
//         "documentationIncluded": false,
//         "installGuideIncluded": false
//     },
//     "trackingNumbers": [],
//     "shipDate": "",
//     "contractInfo": {
//         "vent": "",
//         "rent": false,
//         "installationDates": {
//             "start": "",
//             "end": ""
//         },
//         "warrentyEnd": "",
//         "rentalEnd": "",
//         "endOfFirmco": "",
//         "endOfServiceContract": "",
//         "owner": "",
//         "contractWith": "",
//         "contractSigned": false
//     },
//     "status": "Pending"
// })
// db.customers.insertOne({
//     "facilityName": "Full Facility",
//     "state": "CA",
//     "city": "San Marcos",
//     "zip": "92078",
//     "phone": "000-000-0000",
//     "facilityID": "CAVN001",
//     "product": "REA",
//     "productVersion": 1.5,
//     "installationDate": "2024-05-22T21:43:50.874Z",
//     "stagingDeadline": "2024-05-22T21:43:50.874Z",
//     "assemblyDeadline": "2024-05-22T21:43:50.874Z",
//     "assemblyDate": "2024-05-22T21:43:50.874Z",
//     "QADate": "2024-05-22T21:43:50.874Z",
//     "shippingDate": "2024-05-22T21:43:50.874Z",
//     "transmitters": 2,
//     "sparesTransmitters": 0,
//     "CMSs": 1,
//     "headlessCMSs": 0,
//     "MEDs": 1,
//     "displays": {
//         "31": 1
//     },
//     "contacts": [
//         {
//             "name": "John Doe",
//             "phone": "123-456-7890",
//             "email": "email@example.com",
//             "iqReport": true
//         }
//     ],
//     "notes": [
//     ],
//     "website": "https://example.com",
//     "wifi": [
//         {
//             "ssid": "SSID",
//             "password": "password"
//         }
//     ],
//     "facilityMapURL": [
//         "https://example.com/facility-map"
//     ],
//     "mapHasCMS": true,
//     "mapLayoutPhoto": [
//         "https://example.com/map-layout-photo"
//     ],
//     "powerCables": [
//         {
//             "length": 6,
//             "quantity": 3
//         }
//     ],
//     "roomList": [
//         "101 - A",
//         "101 - B"
//     ],
//     "transmitterSketch": "https://example.com/transmitter-sketch",
//     "CMSDisplaySoftwareFile": "https://example.com/cms-display-software-file",
//     "radioSoftwareFile": "https://example.com/radio-software-file",
//     "radioType": "Single",
//     "MEDModel": "TechMED",
//     "MEDSoftwareVersion": 1.0,
//     "normallyOpen": false,
//     "nextStep": "N/A",
//     "CMSAssembly": [
//         {
//             "CMSID": "A",
//             "assembled": true,
//             "configured": true,
//             "wifiMacAddress": "00:00:00:00:00:00",
//             "ethernetMacAddress": "00:00:00:00:00:00",
//             "assetID": "00000001",
//             "frequency": "123.456",
//             "qualityAssured": true,
//             "QA": [
//                 {
//                     "QA": "Quality Assurance 1",
//                     "date": "2024-05-22T21:43:50.874Z",
//                     "verified": true
//                 }
//             ]
//         }
//     ],
//     "MEDAsssembly": [
//         {
//             "MEDID": "AA",
//             "configured": true,
//             "assetID": "00001",
//             "completionDue": "2024-05-22T21:43:50.874Z",
//             "qualityAssured": true,
//             "QA": [
//                 {
//                     "QA": "Quality Assurance 1",
//                     "date": "2024-05-22T21:43:50.874Z",
//                     "verified": true
//                 }
//             ]
//         }
//     ],
//     "transmitterAssembly": [
//         {
//             "serialNumber": "14010000001",
//             "room": "101 - A",
//             "assetTag": "00000001",
//             "bracket": "140100000001",
//             "configured": true,
//             "labeled": true,
//             "tested": true,
//             "qualityAssured": true,
//             "QA": [
//                 {
//                     "QA": "QA1",
//                     "date": "2024-05-22T21:43:50.874Z",
//                     "verified": true
//                 }
//             ]
//         },
//         {
//             "serialNumber": "14010000002",
//             "room": "101 - B",
//             "assetTag": "00000002",
//             "bracket": "140100000002",
//             "configured": true,
//             "labeled": true,
//             "tested": true,
//             "qualityAssured": true,
//             "QA": [
//                 {
//                     "QA": "QA1",
//                     "date": "2024-05-22T21:43:50.874Z",
//                     "verified": true
//                 }
//             ]
//         }
//     ],
//     "qualityAssurance": {
//         "preshipping": [
//             {
//                 "qa": "QA1",
//                 "status": true,
//                 "date": "2024-05-22T21:43:50.874Z"
//             }
//         ],
//         "followUp": [
//             {
//                 "qa": "QA1",
//                 "status": true,
//                 "date": "2024-05-22T21:43:50.874Z"
//             }
//         ]
//     },
//     "qualityAssuranceDate": "2024-05-22T21:43:50.874Z",
//     "qaApprovedStaffMember": "John Doe",
//     "shippingMethod": "mail",
//     "shippingChecklistItems": {
//         "quantityOfTransmitters": 2,
//         "quantityOfiQMounts": 2,
//         "quantityOfCMSs": 1,
//         "quantityOfHeadlessCMSs": 0,
//         "quantityOfMEDs": 0,
//         "numberOfChargers": 0,
//         "quantityOfDisplays": {
//             "31": 1
//         },
//         "mountTypesIncluded": {
//             "wall": 0,
//             "articulating": 1,
//             "floor": 0
//         },
//         "cordsIncluded": {
//             "6": 3
//         },
//         "hardwareIncluded": true,
//         "batteriesIncluded": true,
//         "securityScrewIncluded": true,
//         "documentationIncluded": true,
//         "installGuideIncluded": true
//     },
//     "trackingNumbers": ["123456"],
//     "shipDate": "2024-05-22T21:43:50.874Z",
//     "contractInfo": {
//         "vent": "Ventalator Brand",
//         "rent": false,
//         "installationDates": {
//             "start": "2024-05-22T21:43:50.874Z",
//             "end": ""
//         },
//         "warrentyEnd": "2025-05-22T21:43:50.874Z",
//         "rentalEnd": "",
//         "endOfFirmco": "",
//         "endOfServiceContract": "",
//         "owner": "Owner Name",
//         "contractWith": "TechBrand",
//         "contractSigned": false
//     },
//     "status": "Pending"
// })

use('wiki')
db.createCollection('products')

// db.products.insertOne({
//     "name": "Wireless Ergonomic Mouse",
//     "description": "High-quality wireless mouse with ergonomic design and long battery life.",
//     "price": 35.99,
//     "manufacturer": "TechBrand",
//     "website": "https://example.com",
//     "category": "Electronics",
//     "images": [
//         "https://example.com/images/product123.jpg"
//     ],
//     "serialNumber": "123456",
//     "size": "12 x 7.5 x 4",
//     "monitorSize": "",
//     "length": 12,
//     "model": "TechMouseX100",
//     "version": "",
//     "weight": 150,
//     "color": "",
//     "specSheet": "https://example.com/specs/techmousex100.pdf",
//     "manual": "",
//     "notes": "",
//     "SKU": "TMX100-PN"
// })
db.products.insertOne({
    "name": "Wireless Keyboard",
    "description": "High-quality wireless keyboard with ergonomic design and long battery life.",
    "price": 49.99,
    "manufacturer": "TechBrand",
    "website": "https://example.com",
    "category": "Electronics",
    "images": [
        "https://thumbs.dreamstime.com/b/%D0%BF%D0%B5%D1%87%D0%B0%D1%82%D1%8C-201003176.jpg",
        "https://example.com/images/product456.jpg"
    ],
    "serialNumber": "789012",
    "size": "18 x 7.5 x 4",
    "monitorSize": "",
    "length": 18,
    "model": "TechKeyboardX100",
    "version": "",
    "weight": 200,
    "color": "",
    "specSheet": "https://example.com/specs/techkeyboardx100.pdf",
    "manual": "",
    "notes": "",
    "SKU": "TKX100-PN"
})