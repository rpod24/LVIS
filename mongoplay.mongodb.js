use('configs');

db.createCollection("Facility")
db.createCollection("Group")
db.createCollection("Room")
db.createCollection("Location")
db.createCollection("CMS")
db.createCollection("MED")
db.createCollection("Monitor")
db.createCollection("ConfigAlert")
db.createCollection("ConfigCMS")
db.createCollection("ConfigMED")

db.Facility.insertOne({
    "PartitionKey": "CAVN001",
    "RowKey": "",
    "FacilityID": "CAVN001",
    "Name": "California Ventilator Hospital",
    "ShortName": "Vent Hospital",
    "Address1": "101 Highway Drive",
    "Address2": "",
    "City": "San Diego",
    "State": "CA",
    "Zip": "92078",
    "TimeZone": "PST",
    "Country": "USA",
    "Coordinates": "{'lat': 12.34567890, 'lon': 12.34567890}",
    "Phone": "000-000-0000",
    "PrimaryContact": "1234567890",
    "Product": "REA",
    "CMSVersion": "",
    "Status": "",
    "ServiceStatus": "",
    "ServiceDetail": "",
    "ServiceHistory": "[['2024-05-22T21:43:50.874Z', 'null']]",
    "LastRecordDT": "",
    "UpdateFromDT": "",
    "StartQueue": "",
    "Dirty": false,
    "Locked": false,
});
db.Group.insertOne({
    "PartitionKey": "CAVN001",
    "RowKey": "GR01",
    "FacilityID": "CAVN001",
    "GroupID": "GR01",
    "Name": "Full Group Name",
    "ShortName": "Group",
    "ServiceHistory": "[['2024-05-22T21:43:50.874Z', 'null']]",
    "Installation": "Installed",
    "Spare": false,
    "LastRecordDT": "",
    "UpdateFromDT": "",
});
db.Room.insertOne({
    "PartitionKey": "CAVN001",
    "RowKey": "CAVN001_001",
    "FacilityID": "CAVN001",
    "GroupID": "GR01",
    "RoomID": "001",
    "ServiceHistory": "[['2024-05-22T21:43:50.874Z', 'null']]",
    "Spare": false,
});
db.Location.insertOne({
    "PartitionKey": "CAVN001",
    "RowKey": "",
    "GroupID": "GR01",
    "RoomID": "001",
    "LocationID": "101",
    "LocationSN": "1029",
    "ServiceHistory": "[['2024-05-22T21:43:50.874Z', 'null']]",
    "Spare": false,
    "Portable": false
});
db.CMS.insertOne({
    "PartitionKey": "CAVN001",
    "RowKey": "CAVN001_GR01_A",
    "FacilityID": "CAVN001",
    "GroupID": "GR01",
    "CMS": "A",
    "ConfigID": "All",
    "HWVersion": "",
    "OSVersion": "",
    "SWVersion": "",
    "PTVersion": "",
    "RadioVersion": "",
    "LastBootDT": "",
    "LastSyncedDT": "",
    "LastSignal": "",
    "TimeOffset": "",
    "Status": ""
});
db.MED.insertOne({
    "PartitionKey": "CAVN001",
    "RowKey": "AA",
    "FacilityID": "CAVN001",
    "MedID": "AA",
    "ConfigID": "All",
    "HWType": "",
    "HWVersion": "",
    "OSVersion": "",
    "SWVersion": "",
    "LastBootDT": "",
    "Status": ""
});
db.Monitor.insertOne({
    "PartitionKey": "CAVN001",
    "RowKey": "142100001",
    "Timestamp": "Datetime",
    "LastGroupID": "GR01",
    "LastLocationID": "",
    "MonitorID": "0001",
    "MonitorSN": "142100001",
    "ServiceHistory": "[['2024-05-22T21:43:50.874Z', 'null']]",
    "Model": "LinQvue REA",
    "HWVersion": "",
    "SWVersion": "",
    "BatteryState": "",
    "LastBattery": "",
    "LastTxID": "",
    "LastRecordDT": "",
    "LastSequence": "",
    "LastSequenceDT": "",
    "SignalCMS": "",
    "Status": "",
    "ServiceDetail": "",
    "UpdateFromDT": ""
});
db.ConfigAlert.insertOne({
    "AlertMin": {
        "PartitionKey": "CAVN001",
        "RowKey": "AM001",
        "DefinitionType": "AlertMin",
        "Shift": "All",
        "EquipmentType": "Facility",
        "ID": "",
        "AlertFilter": "All",
        "DevFilter": "All",
        "Enabled": true,
        "Seconds": -1,
        "SecondsFromStart": 0,
        "SecondsFromClear": -1,
        "Color1": "",
        "Color2": "",
        "Blinks": false,
        "SortLast": false,
        "Tone": "",
        "Repeats": false,
        "Volume": -1,
        "AlertCount": -1,
        "Timeout": -1
    },
    "Timeout": {
        "PartitionKey": "CAVN001",
        "RowKey": "TO001",
        "DefinitionType": "Timeout",
        "Shift": "All",
        "EquipmentType": "Facility",
        "ID": "",
        "AlertFilter": "All",
        "DevFilter": "All",
        "Enabled": true,
        "Seconds": -1,
        "SecondsFromStart": -1,
        "SecondsFromClear": 0,
        "Color1": "",
        "Color2": "",
        "Blinks": false,
        "SortLast": false,
        "Tone": "",
        "Repeats": false,
        "Volume": -1,
        "AlertCount": -1,
        "Timeout": -1
    },
    "Activity": {
        "PartitionKey": "CAVN001",
        "RowKey": "TO001",
        "DefinitionType": "ActivityWarning",
        "Shift": "All",
        "EquipmentType": "Facility",
        "ID": "",
        "AlertFilter": "All",
        "DevFilter": "All",
        "Enabled": true,
        "Seconds": 5,
        "SecondsFromStart": -1,
        "SecondsFromClear": -1,
        "Color1": "",
        "Color2": "",
        "Blinks": false,
        "SortLast": false,
        "Tone": "",
        "Repeats": false,
        "Volume": -1,
        "AlertCount": -1,
        "Timeout": -1
    },
    "Elevation": [
        {
            "PartitionKey": "CAVN001",
            "RowKey": "EL001",
            "DefinitionType": "Timeout",
            "Shift": "All",
            "EquipmentType": "Facility",
            "ID": "",
            "AlertFilter": "All",
            "DevFilter": "All",
            "Enabled": true,
            "Seconds": 5,
            "SecondsFromStart": -1,
            "SecondsFromClear": -1,
            "Color1": "yellow",
            "Color2": "dark_yellow",
            "Blinks": true,
            "SortLast": false,
            "Tone": "Short",
            "Repeats": false,
            "Volume": 64,
            "AlertCount": 1,
            "Timeout": 5
        },
        {
            "PartitionKey": "CAVN001",
            "RowKey": "EL002",
            "DefinitionType": "Timeout",
            "Shift": "All",
            "EquipmentType": "Facility",
            "ID": "",
            "AlertFilter": "All",
            "DevFilter": "All",
            "Enabled": true,
            "Seconds": 10,
            "SecondsFromStart": -1,
            "SecondsFromClear": -1,
            "Color1": "yellow",
            "Color2": "dark_yellow",
            "Blinks": true,
            "SortLast": false,
            "Tone": "Short",
            "Repeats": false,
            "Volume": 64,
            "AlertCount": 1,
            "Timeout": 15
        }
    ]
});
db.ConfigCMS.insertOne({
    "PartitionKey": "CAVN001",
    "RowKey": "CAVN001_CMS_Main",
    "FacilityID": "CAVN001",
    "ShowGroupOnly": false,
    "ShowLocationPane": false,
    "ShowEmptyRooms": false,
    "ShowAllStatus": false,
    "ShowSpares": false,
    "StatusDirection": "Down",
    "ColumnLeveling": false,
    "DefaultVolume": 64,
    "PlayConnectTones": false,
    "PlayDCConnectTones": false,
    "PlayLocConnectTones": false,
    "UseMobileWarn": false,
    "RecentAlertPeriod": 10,
    "ShowResponse": false,
    "ResponseTarget": 10,
    "CustomPort": "AUX",
    "DisableScreen": false,
    "VendorMessage": "",
    "SyncTimeout": 30,
    "SyncInterval": 30,
    "SyncFailToOffline": 15,
    "FullSyncInterval": 40,
    "CheckInPeriod": 30
});
db.ConfigMED.insertOne({
    "PartitionKey": "CAVN001",
    "RowKey": "CAVN001_MED_Main",
    "FacilityID": "CAVN001",
    "GroupIDs": "All",
    "DisableSettings": "[]",
    "Brightness": "75",
    "MaxEscalation": false,
    "Notification": 30,
    "Vibration": true,
    "Volume": 100,
    "Ucode": "0001",
    "SUCode": "0002",
    "Acode": "0003"
  });

use('inventory')
db.createCollection('products')
db.createCollection('inventory')
db.products.insertOne({
    "_id": {
        "$oid": "6647cadc9ad024116bc95845"
    },
    "productImage": "https://example.com/images/product123.jpg",
    "description": "High-quality wireless mouse with ergonomic design and long battery life.",
    "category": "Electronics",
    "manufacturer": "TechBrand",
    "itemName": "Wireless Ergonomic Mouse",
    "model": "TechMouseX100",
    "sku": "123456",
    "dimensions": {
        "length": 12,
        "width": 7.5,
        "height": 4
    },
    "weight": 150,
    "barCode": "123456789012",
    "unitCost": 20,
    "unitPrice": 35.99,
    "minimumItemThreshold": 10,
    "tags": [
        "wireless",
        "ergonomic",
        "mouse",
        "electronics",
        "TechBrand"
    ],
    "specSheet": "https://example.com/specs/techmousex100.pdf",
    "partNumber": "TMX100-PN",
    "notes": "Compatible with both Windows and Mac OS.",
    "unitsOnHand": 50
})

db.inventory.insertOne({
    "_id": {
        "$oid": "6647ca2642a8577015c15688"
    },
    "product_sku": "123456",
    "date": {
        "$date": "2024-05-17T21:20:38.748Z"
    },
    "lot_number": "123456",
    "tracking_number": "789012",
    "tracking_vendor": "vendor",
    "destination": "destination",
    "invoice": "invoice",
    "units_in": 10,
    "units_out": 5
}
);


use('support')
db.createCollection('tickets')
db.tickets.insertOne({
    "_id": {
        "$oid": "6647eb309ed642684cd47878"
    },
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
})

use('sensitive_data')
db.createCollection('users')