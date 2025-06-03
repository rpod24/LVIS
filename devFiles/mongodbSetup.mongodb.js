// ===========================================================
//  MongoDB Playground seed file for the LVIS staff‑utility DB
//  -----------------------------------------------------------
//  ‑ Creates one sample document in every collection, using the
//    “externalRef” and “lastSync” fields needed for Azure‑SQL
//    bidirectional sync.
//  ‑ Run in VS Code’s MongoDB Playground (or `mongosh`).
//  ‑ Adjust database name, IDs, or drop the DB first if you wish.
// ===========================================================

use('lvis_dev');               // <‑‑ change if you prefer another DB
// db.dropDatabase();         // uncomment to start with a clean slate

const created = new Date('2025‑05‑13T17:00:00Z');
const fromSql = new Date('2025‑05‑13T16:58:45Z');

// ---------- 1. facilities ----------
db.facilities.insertOne({
  facilityId: 'CAVN000',
  name:       'Hansen, Pratt and Ramirez',
  shortName:  'Hansen, Pr',
  address: {
    line1:   '0496 Kellie Wells',
    line2:   '',
    city:    'Port Dorothy',
    state:   'MN',
    zip:     '59274',
    country: 'USA'
  },
  coordinates: { lat: 12.34567890, lon: 12.34567890 },
  phone:          '000-000-0000',
  timeZone:       'PST',
  product: {
    code:    'REA',
    version: '1.5',
    cmsVersion: ''
  },

  status: '',
  serviceStatus: {
    level:  '',
    detail: '',
    history: [
      [ISODate('2024-05-22T21:43:50.874Z'), null]
    ]
  },
  lastRecordDt:   null,
  updateFromDt:   null,
  startQueue:     '',
  dirty:  false,
  locked: false,
  contacts: [
    {
      name:  'John Doe',
      role:  'IT',
      email: 'john@foo.com',
      phone: '123-456-7890',
      primary: true
    },
    {
      name:   '',
      role:   'PrimaryContact',
      email:  '',
      phone:  '1234567890',
      primary: false
    }
  ],
  meta: {
    createdAt:  created,
    updatedAt:  created,
    updatedBy:  'r.odonnell',
    schema:     1,
    externalRef: {
      system: 'azure-sql',
      table:  'Facilities',
      id:     'CAVN000'
    },
    lastSync: {
      toSql:   null,
      fromSql: null,
      state:   'in_sync'
    }
  }
});

// ---------- 2. groups ----------
db.groups.insertOne({
  facilityId: 'CAVN001',
  groupId: 'GR01',
  name: 'South Wing',
  ShortName: "South",
  installation: 'installed',
  ServiceHistory: "[['2024-05-22T21:43:50.874Z', 'null']]",
  spare: false,
  LastRecordDT: "",
  UpdateFromDT: "",
  meta: {
    createdAt: created,
    updatedAt: created,
    updatedBy: 'r.odonnell',
    schema: 1,
    externalRef: { system: 'azure-sql', table: 'FacilityGroups', id: 913 },
    lastSync: { toSql: null, fromSql, state: 'in_sync' }
  }
});

// ---------- 3. rooms ----------
db.rooms.insertOne({
  facilityId: 'CAVN001',
  RowKey: "CAVN001_001",
  groupId: 'GR01',
  roomId: '001',
  portable: false,
  hasExtDc: false,
  hasNc: false,
  ServiceHistory: "[['2024-05-22T21:43:50.874Z', 'null']]",
  locationSn: '1029',
  spare: false,
  meta: {
    createdAt: created,
    updatedAt: created,
    updatedBy: 'r.odonnell',
    schema: 1,
    externalRef: { system: 'azure-sql', table: 'FacilityRooms', id: 5401 },
    lastSync: { toSql: null, fromSql, state: 'in_sync' }
  }
});

// ---------- 4. devices ----------
db.cmsDevices.insertOne({
  deviceId     : 'CMS-20251001',
  version      : 1,
  facilityId   : 'CAVN001',
  groupId      : 'GR01',
  roomId       : null,
  serialNumber : 'CMS20251001',
  cmsLabel     : 'A',
  configId     : 'All',

  hwVersion    : '',
  osVersion    : '',
  swVersion    : '',
  ptVersion    : '',
  radioVersion : '',

  lastBootDT   : '',
  lastSyncedDT : '',
  lastSignal   : '',
  timeOffset   : '',
  status       : '',

  battery      : null,
  lastSequence : null,

  configs: {
    showGroupOnly      : false,
    showLocationPane   : false,
    showEmptyRooms     : false,
    showAllStatus      : false,
    showSpares         : false,
    statusDirection    : 'Down',
    columnLeveling     : false,
    defaultVolume      : 64,
    playConnectTones   : false,
    playDCConnectTones : false,
    playLocConnectTones: false,
    useMobileWarn      : false,
    recentAlertPeriod  : 10,
    showResponse       : false,
    responseTarget     : 10,
    customPort         : 'AUX',
    disableScreen      : false,
    vendorMessage      : '',
    syncTimeout        : 30,
    syncInterval       : 30,
    syncFailToOffline  : 15,
    fullSyncInterval   : 40,
    checkInPeriod      : 30
  },

  meta: {
    createdAt  : created,
    updatedAt  : created,
    updatedBy  : 'r.odonnell',
    schema     : 1,
    externalRef: { system:'azure-sql', table:'CMSDevices', id:'CMS-20251001' },
    lastSync   : { toSql:null, fromSql, state:'in_sync' }
  }
});

db.devices.insertOne({
  deviceId: '142100001',
  type: 'monitor',
  facilityId: 'CAVN001',
  groupId: 'GR01',
  roomId: '001',
  model: 'LinQvue REA',
  hwVersion: '1.0',
  swVersion: '2.3.1',
  serialNumber: '142100001',
  status: 'in_service',
  battery: { lastPercentage: 80, lastChanged: new Date('2025‑05‑11T23:00:00Z') },
  lastSequence: { id: 'ABC123', at: new Date('2025‑05‑13T16:55:00Z') },
  settings: { displayBrightness: 80, soundMuted: false, disableAlarms: [] },
  meta: {
    createdAt: created,
    updatedAt: created,
    updatedBy: 'r.odonnell',
    schema: 1,
    externalRef: { system: 'azure-sql', table: 'Devices', id: 142100001 },
    lastSync: { toSql: null, fromSql, state: 'in_sync' }
  }
});

// ---------- 5. deviceConfigs ----------
db.deviceConfigs.insertOne({
  deviceId: '142100001',
  type: 'CMS',
  version: 3,
  payload: { exampleKey: 'exampleValue' },   // ⬅ replace with real blob
  effectiveFrom: new Date('2025‑05‑12T00:00:00Z'),
  meta: {
    createdAt: created,
    updatedAt: created,
    updatedBy: 'r.odonnell',
    schema: 1,
    externalRef: { system: 'azure-sql', table: 'DeviceConfigs', id: { deviceId: 142100001, version: 3 } },
    lastSync: { toSql: null, fromSql, state: 'in_sync' }
  }
});

// ---------- 6. alertDefs (Mongo‑only) ----------
db.alertDefs.insertOne({
  alertCode: 'AL001',
  description: 'Loss of signal',
  min: { seconds: 0,  color: '#FF0000', tone: 'long' },
  timeout: { seconds: 30, color: '#FFAA00' },
  escalations: [
    { after: 5,  color: '#FFFF00', tone: 'short' },
    { after: 15, color: '#FFA500', tone: 'short' }
  ],
  meta: {
    createdAt: created,
    updatedAt: created,
    updatedBy: 'r.odonnell',
    schema: 1,
    externalRef: null,
    lastSync: { toSql: null, fromSql: null, state: 'in_sync' }
  }
});

// ---------- 7. manifests ----------
db.manifests.insertOne({
  facilityId: 'CAVN001',
  shipDate: new Date('2025‑05‑10'),
  bom: {
    transmitters: 4,
    cms: 1,
    meds: 1,
    displays: [ { sku: 'TechDisplay‑27', qty: 1 } ]
  },
  qaChecks: [
    { code: 'preShip', ok: true, at: new Date('2025‑05‑09T18:00:00Z') }
  ],
  tracking: [ '1Z9999999999999999', '9400000000000000000000' ],
  status: 'shipped',
  meta: {
    createdAt: created,
    updatedAt: created,
    updatedBy: 'r.odonnell',
    schema: 1,
    externalRef: { system: 'azure-sql', table: 'ShipManifests', id: 702 },
    lastSync: { toSql: null, fromSql, state: 'in_sync' }
  }
});

// ---------- 8. customers ----------
db.customers.insertOne({
  customerId: 'CUS‑1007',
  name: 'Pinnacle Reseller Midwest',
  type: 'reseller',
  billing: { contact: 'Sarah Lane', email: 'sarah@pinnacle.com', terms: 'Net 30' },
  addresses: [
    { kind: 'office', line1: '123 Main', city: 'Omaha', state: 'NE', zip: '68102' }
  ],
  meta: {
    createdAt: created,
    updatedAt: created,
    updatedBy: 'r.odonnell',
    schema: 1,
    externalRef: { system: 'azure-sql', table: 'Customers', id: 'CUS‑1007' },
    lastSync: { toSql: null, fromSql, state: 'in_sync' }
  }
});

// ---------- 9. supportTickets ----------
db.supportTickets.insertOne({
  ticketNo: 2025_00042,
  facilityId: 'CAVN001',
  createdAt: new Date('2025‑05‑13T15:30:00Z'),
  status: 'open',
  problemCategory: 'hardware',
  problemSubCategory: 'CMS‑boot',
  caller: { name: 'Jane', method: 'email', email: 'jane@x.com' },
  notes: [
    { at: new Date('2025‑05‑13T15:32:00Z'), author: 'r.odonnell', text: 'Asked for log bundle.' }
  ],
  meta: {
    createdAt: created,
    updatedAt: created,
    updatedBy: 'r.odonnell',
    schema: 1,
    externalRef: { system: 'azure-sql', table: 'Tickets', id: 642 },
    lastSync: { toSql: null, fromSql, state: 'in_sync' }
  }
});

// ---------- 10. wikiItems ----------
db.wikiItems.insertOne({
  slug: 'cms‑boot‑loop',
  title: 'CMS Boot Loop Troubleshooting',
  body: 'If the device restarts continuously, check power rail voltage …',
  tags: [ 'cms', 'boot', 'troubleshooting' ],
  version: 2,
  meta: {
    createdAt: created,
    updatedAt: created,
    updatedBy: 'r.odonnell',
    schema: 1,
    externalRef: null,
    lastSync: { toSql: null, fromSql: null, state: 'in_sync' }
  }
});

// ---------- 11. inventory ----------
db.inventory.insertOne({
  facilityId: 'CAVN001',
  sku: 'LINQ‑TX‑V2',
  qtyOnHand: 12,
  lastCounted: new Date('2025‑05‑12T04:00:00Z'),
  meta: {
    createdAt: created,
    updatedAt: created,
    updatedBy: 'r.odonnell',
    schema: 1,
    externalRef: { system: 'azure-sql', table: 'Inventory', id: { facilityId: 'CAVN001', sku: 'LINQ‑TX‑V2' } },
    lastSync: { toSql: null, fromSql, state: 'in_sync' }
  }
});

print('✔  Sample data seeded.  Review with `db.getCollectionNames()` and `db.collection.find().pretty()`');
