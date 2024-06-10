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
//     "_id": {
//         "$oid": "6647cadc9ad024116bc95845"
//     },
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
//     "_id": {
//         "$oid": "6647ca2642a8577015c15688"
//     },
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
//     "_id": {
//         "$oid": "6647eb309ed642684cd47878"
//     },
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

use('Customers')
db.createCollection('current')
db.current.insertOne({
    "facilityName": "Current Facility",
    "state": "CA",
    "city": "San Diego",
    "zip": "92078",
    "phone": "000-000-0000",
    "facilityID": "CAVN001",
    "product": "REA",
    "productVersion": 1.5,
    "installationDate": "2024-05-22T21:43:50.874Z",
    "stagingDeadline": "2024-05-22T21:43:50.874Z",
    "assemblyDeadline": "2024-05-22T21:43:50.874Z",
    "assemblyDate": "2024-05-22T21:43:50.874Z",
    "QADate": "2024-05-22T21:43:50.874Z",
    "shippingDate": "2024-05-22T21:43:50.874Z",
    "transmitters": 5,
    "sparesTransmitters": 1,
    "CMSs": 1,
    "headlessCMSs": 0,
    "MEDs": 1,
    "displays": {
        "27": 2,
        "29": 1,
        "31": 0
    },
    "addionalContacts": [
        {
            "name": "Jane Doe",
            "phone": "123-456-7890",
            "email": ""
        }
    ],
    "notes": ["This is a note for the current facility."],
    "website": "https://example.com",
    "buildingFloorWing": "Building 1, Floor 2, W",
    "contractWith": "TechBrand",
    "contractSigned": null,
    "wifi": [{
        "ssid": "TechBrand",
        "password": "password"
    }],
    "facilityMapURL": ["https://example.com/facility-map"],
    "mapHasCMS": true,
    "mapLayoutPhoto":[],
    "powerCables": [
        {
            "length": 6,
            "quantity": 5
        }
    ],
    "roomList": [
        "114 - A",
        "114 - B"
    ],
    "transmitterSketch": "https://example.com/transmitter-sketch",
    "CMSDisplaySoftwareFile" : "https://example.com/cms-display-software-file",
    "radioSoftwareFile": "https://example.com/radio-software-file",
    "radioType": "Single",
    "MEDModel": "TechMED",
    "MEDSoftwareVersion": 1.0,
    "CMSAssembly": [
        {
            "CMSID": "A",
            "assembled": true,
            "configured": true,
            "qualityAssured": true,
            "wifiMacAddress": "00:00:00:00:00:00",
            "ethernetMacAddress": "00:00:00:00:00:00",
            "assetID": "00000001",
            "ventHoleDrilled": true,
            "CMSTurnedOn": true,
            "caseClosed": true,
            "hasCPUHeatSink": true,
            "launcherInstalled": true,
            "frequencySet": true,
            "frequency": "123.456",
            "otherQA":[{
                "QA": "QA1",
                "date": "2024-05-22T21:43:50.874Z",
                "verified": true
            }],
            "monitor": true,
            "alarm": true,
            "clears": true,
            "disconnects": true,
            "shippingMethod": "mail",
            "shippingChecklistItems": {
                "quantityOfTransmitters": 6,
                "quantityOfiQMounts": 1,
                "quantityOfCMSs": 1,
                "quantityOfHeadlessCMSs": 0,
                "quantityOfMEDs": 1,
                "numberOfChargers": 1,
                "quantityOfDisplays": {
                    "27": 2,
                    "29": 1,
                    "31": 0
                },
                "mountTypesIncluded": {
                    "wall": 1,
                    "articulating": 0,
                    "floor": 0
                },
                "cordsIncluded": {
                    "6": 5,
                    "12": 0
                },
                "hardwareIncluded": true,
                "batteriesIncluded": true,
                "securityScrewIncluded": true,
                "documentationIncluded": true,
                "installGuideIncluded": true
            },
            "trackingNumbers": ["123456"],
            "shipDate": "2024-05-22T21:43:50.874Z",
            "clientNotifiedOfShipment": true,
            "clientRecievedPackages": true,
            "shippingContentOk": true,
            "shippinhRecievedDate": "2024-05-22T21:43:50.874Z",
            "remotedInstallSteps": {
                "photosEmailed": true,
                "configFilesInProduction": true,
                "correctRadioSignal": true,
                "verifyEthernetWifi": true,
                "noErrorsInTerminal": true,
                "correctLogVersion": true,
                "oldLogsDeleted": true,
                "logsSuccessfullyWritten": true,
                "sparesRemoved": true,
                "maintenanceDateSet": true,
                "signalStrengthAcceptable": true,
                "MEDsConnectedProperly": true,
                "WeavedInstalledProperly": true,
                "hostnameIsCorrect": true,
                "NTPActive": true,
                "allOtherIssuesClear": true
            },
            "followUp": {
                "adminEmailCorrect": true,
                "inBillingSystem": true,
                "adminFileEmailed": true,
                "quickRefEmailed": true,
                "auditChecklistEmailed": true,
                "trainningScheduled": true,
                "LVISUpdated": true,
                "clientBinderUpdated": true,
                "fileManifestInFillingCabinet": true,
                "activatedReports": true,
                "oneMonthCheckup": true,
                "oneMonthCheckupNotes": "None",
                "oneWeekCheckup": true,
                "oneWeekCheckupNotes": "None"
            }
        }
    ],
    "MEDAsssembly": [
        {
            "MEDID": "AA",
            "configured": false,
            "assetID": "00000001",
            "completionDue": "2024-05-22T21:43:50.874Z",
            "qualityAssured": true
        }
    ],
    "transmitterAssembly": [
        {
            "serialNumber": "14010000001",
            "room": "101 - a",
            "assetTag": "00000001",
            "bracket": "140100000001",
            "configured": true,
            "labeled": true,
            "tested": true,
            "qualityAssured": true,
            "hasBattery": true,
            "programmed": true,
            "remoteSoftwareActive": true
        }
    ],
    "qualityAssuranceDate": "2024-05-22T21:43:50.874Z"
})
// db.createCollection('former')
// db.createCollection('prospects')
// db.prospects.insertOne({
// })
