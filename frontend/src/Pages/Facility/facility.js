import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../PageCSS/customerPage.css";
import { BASE_URL } from "../../defaults";
// Facility:
// {
//   "PartitionKey": "String",
//   "RowKey": "String",
//   "Timestamp": "Datetime",
//   "FacilityID": "String",
//   "Name": "String",
//   "ShortName": "String",
//   "Address1": "String",
//   "Address2": "String",
//   "City": "String",
//   "State": "String",
//   "Zip": "String",
//   "TimeZone": "String",
//   "Country": "String",
//   "Coordinates": "String",
//   "Phone": "String",
//   "PrimaryContact": "String",
//   "Product": "String",
//   "CMSVersion": "String",
//   "Status": "String",
//   "ServiceStatus": "String",
//   "ServiceDetail": "String",
//   "ServiceHistory": "String",
//   "LastRecordDT": "String",
//   "UpdateFromDT": "String",
//   "StartQueue": "String",
//   "Dirty": "Boolean",
//   "Locked": "Boolean",
// }


// Group
// {
//   "PartitionKey": "String",
//   "RowKey": "String",
//   "Timestamp": "Datetime",
//   "FacilityID": "String",
//   "GroupID": "String",
//   "Name": "String",
//   "ShortName": "String",
//   "ServiceHistory": "String",
//   "Installation": "String",
//   "Spare": "Boolean",
//   "LastRecordDT": "String",
//   "UpdateFromDT": "String",
// }

// Room:
// {
//   "PartitionKey": "String",
//   "RowKey": "String",
//   "Timestamp": "Datetime",
//   "FacilityID": "String",
//   "GroupID": "String",
//   "RoomID": "String",
//   "ServiceHistory": "String",
//   "Spare": "Boolean"
// }


// Location
// {
//   "PartitionKey": "String",
//   "RowKey": "String",
//   "Timestamp": "Datetime",
//   "GroupID": "String",
//   "RoomID": "String",
//   "LocationID": "String",
//   "LocationSN": "String",
//   "ServiceHistory": "String",
//   "Spare": "Boolean",
//   "Portable": "Boolean"
// }

// CMS
// {
//   "PartitionKey": "String",
//   "RowKey": "String",
//   "Timestamp": "Datetime",
//   "FacilityID": "String",
//   "GroupID": "String",
//   "CMS": "String",
//   "ConfigID": "String",
//   "HWVersion": "String",
//   "OSVersion": "String",
//   "SWVersion": "String",
//   "PTVersion": "String",
//   "RadioVersion": "String",
//   "LastBootDT": "String",
//   "LastSyncedDT": "String",
//   "LastSignal": "String",
//   "TimeOffset": "Double",
//   "Status": "String"
// }

// MED:
// {
//   "PartitionKey": "String",
//   "RowKey": "String",
//   "Timestamp": "Datetime",
//   "FacilityID": "String",
//   "MedID": "String",
//   "ConfigID": "String",
//   "HWType": "String",
//   "HWVersion": "String",
//   "OSVersion": "String",
//   "SWVersion": "String",
//   "LastBootDT": "String",
//   "Status": "String"
// }

// Monitor:
// {
//   "PartitionKey": "String",
//   "RowKey": "String",
//   "Timestamp": "Datetime",
//   "LastGroupID": "String",
//   "LastLocationID": "String",
//   "MonitorID": "String",
//   "MonitorSN": "String",
//   "ServiceHistory": "String",
//   "Model": "String",
//   "HWVersion": "String",
//   "SWVersion": "String",
//   "BatteryState": "String",
//   "LastBattery": "Double",
//   "LastTxID": "String",
//   "LastRecordDT": "String",
//   "LastSequence": "String",
//   "LastSequenceDT": "String",
//   "SignalCMS": "String",
//   "Status": "String",
//   "ServiceDetail": "String",
//   "UpdateFromDT": "String"
// }

// CMS Config:
// {
//   "PartitionKey": "String",
//   "RowKey": "String",
//   "Timestamp": "Datetime",
//   "FacilityID": "String",
//   "ShowGroupOnly": "Boolean",
//   "ShowLocationPane": "Boolean",
//   "ShowEmptyRooms": "Boolean",
//   "ShowAllStatus": "Boolean",
//   "ShowSpares": "Boolean",
//   "StatusDirection": "String",
//   "ColumnLeveling": "Boolean",
//   "DefaultVolume": "Int32",
//   "PlayConnectTones": "Boolean",
//   "PlayDCConnectTones": "Boolean",
//   "PlayLocConnectTones": "Boolean",
//   "UseMobileWarn": "Boolean",
//   "RecentAlertPeriod": "Int32",
//   "ShowResponse": "Boolean",
//   "ResponseTarget": "Int32",
//   "CustomPort": "String",
//   "DisableScreen": "Boolean",
//   "VendorMessage": "String",
//   "SyncTimeout": "Int32",
//   "SyncInterval": "Int32",
//   "SyncFailToOffline": "Int32",
//   "FullSyncInterval": "Int32",
//   "CheckInPeriod": "Int32"
// }

// MED Config:
// {
//   "PartitionKey": "String",
//   "RowKey": "String",
//   "Timestamp": "Datetime",
//   "FacilityID": "String",
//   "GroupIDs": "String",
//   "DisableSettings": "Boolean",
//   "Brightness": "Int32",
//   "MaxEscalation": "Boolean",
//   "Notification": "Int32",
//   "Vibration": "Boolean",
//   "Volume": "Int32",
//   "Ucode": "Int32",
//   "SUCode": "Int32",
//   "Acode": "Int32"
// }

// AlertConfig:
// {
//   "AlertMin":{
//   "PartitionKey": "Partition data by facility LVIS n/a Static",
//   "RowKey": "Unique Key LVIS n/a Static",
//   "Timestamp": "Record modified datetime Azure n/a Modified",
//   "DefinitionType": "Alert configuration type LVIS Yes On Request",
//   "Shift": "Shift ID reference LVIS Yes On Request",
//   "EquipmentType": "Equipment level LVIS Yes On Request",
//   "ID": "Equipment ID reference LVIS Yes On Request",
//   "AlertFilter": "Alert type filter LVIS Yes On Request",
//   "DevFilter": "Device type filter LVIS Yes On Request",
//   "Enabled": "Enables feature LVIS Yes On Request",
//   "Seconds": "Alert duration value LVIS Yes On Request",
//   "SecondsFromStart": "Seconds from alert start LVIS Yes On Request",
//   "SecondsFromClear": "Seconds from alert clear signal LVIS Yes On Request",
//   "Color1": "Color reference LVIS Yes On Request",
//   "Color2": "Color reference LVIS Yes On Request",
//   "Blinks": "Causes alternation between color 1 and 2 LVIS Yes On Request",
//   "SortLast": "Causes alert to sort below other alerts LVIS Yes On Request",
//   "Tone": "Audio tone played with alert LVIS Yes On Request",
//   "Repeats": "Causes audio tone to repeat LVIS Yes On Request",
//   "Volume": "Sets audio tone volume LVIS Yes On Request",
//   "AlertCount": "Number of alerts LVIS Yes On Request",
//   "Timeout": "Seconds before timeout LVIS Yes On Request"
// },
// "Timeout":{
//   "PartitionKey": "Partition data by facility LVIS n/a Static",
//   "RowKey": "Unique Key LVIS n/a Static",
//   "Timestamp": "Record modified datetime Azure n/a Modified",
//   "DefinitionType": "Alert configuration type LVIS Yes On Request",
//   "Shift": "Shift ID reference LVIS Yes On Request",
//   "EquipmentType": "Equipment level LVIS Yes On Request",
//   "ID": "Equipment ID reference LVIS Yes On Request",
//   "AlertFilter": "Alert type filter LVIS Yes On Request",
//   "DevFilter": "Device type filter LVIS Yes On Request",
//   "Enabled": "Enables feature LVIS Yes On Request",
//   "Seconds": "Alert duration value LVIS Yes On Request",
//   "SecondsFromStart": "Seconds from alert start LVIS Yes On Request",
//   "SecondsFromClear": "Seconds from alert clear signal LVIS Yes On Request",
//   "Color1": "Color reference LVIS Yes On Request",
//   "Color2": "Color reference LVIS Yes On Request",
//   "Blinks": "Causes alternation between color 1 and 2 LVIS Yes On Request",
//   "SortLast": "Causes alert to sort below other alerts LVIS Yes On Request",
//   "Tone": "Audio tone played with alert LVIS Yes On Request",
//   "Repeats": "Causes audio tone to repeat LVIS Yes On Request",
//   "Volume": "Sets audio tone volume LVIS Yes On Request",
//   "AlertCount": "Number of alerts LVIS Yes On Request",
//   "Timeout": "Seconds before timeout LVIS Yes On Request"
// },
// "Activity":{
//   "PartitionKey": "Partition data by facility LVIS n/a Static",
//   "RowKey": "Unique Key LVIS n/a Static",
//   "Timestamp": "Record modified datetime Azure n/a Modified",
//   "DefinitionType": "Alert configuration type LVIS Yes On Request",
//   "Shift": "Shift ID reference LVIS Yes On Request",
//   "EquipmentType": "Equipment level LVIS Yes On Request",
//   "ID": "Equipment ID reference LVIS Yes On Request",
//   "AlertFilter": "Alert type filter LVIS Yes On Request",
//   "DevFilter": "Device type filter LVIS Yes On Request",
//   "Enabled": "Enables feature LVIS Yes On Request",
//   "Seconds": "Alert duration value LVIS Yes On Request",
//   "SecondsFromStart": "Seconds from alert start LVIS Yes On Request",
//   "SecondsFromClear": "Seconds from alert clear signal LVIS Yes On Request",
//   "Color1": "Color reference LVIS Yes On Request",
//   "Color2": "Color reference LVIS Yes On Request",
//   "Blinks": "Causes alternation between color 1 and 2 LVIS Yes On Request",
//   "SortLast": "Causes alert to sort below other alerts LVIS Yes On Request",
//   "Tone": "Audio tone played with alert LVIS Yes On Request",
//   "Repeats": "Causes audio tone to repeat LVIS Yes On Request",
//   "Volume": "Sets audio tone volume LVIS Yes On Request",
//   "AlertCount": "Number of alerts LVIS Yes On Request",
//   "Timeout": "Seconds before timeout LVIS Yes On Request"
// }
// ,
//   "Elevation":[
//   {
//   "PartitionKey": "Partition data by facility LVIS n/a Static",
//   "RowKey": "Unique Key LVIS n/a Static",
//   "Timestamp": "Record modified datetime Azure n/a Modified",
//   "DefinitionType": "Alert configuration type LVIS Yes On Request",
//   "Shift": "Shift ID reference LVIS Yes On Request",
//   "EquipmentType": "Equipment level LVIS Yes On Request",
//   "ID": "Equipment ID reference LVIS Yes On Request",
//   "AlertFilter": "Alert type filter LVIS Yes On Request",
//   "DevFilter": "Device type filter LVIS Yes On Request",
//   "Enabled": "Enables feature LVIS Yes On Request",
//   "Seconds": "Alert duration value LVIS Yes On Request",
//   "SecondsFromStart": "Seconds from alert start LVIS Yes On Request",
//   "SecondsFromClear": "Seconds from alert clear signal LVIS Yes On Request",
//   "Color1": "Color reference LVIS Yes On Request",
//   "Color2": "Color reference LVIS Yes On Request",
//   "Blinks": "Causes alternation between color 1 and 2 LVIS Yes On Request",
//   "SortLast": "Causes alert to sort below other alerts LVIS Yes On Request",
//   "Tone": "Audio tone played with alert LVIS Yes On Request",
//   "Repeats": "Causes audio tone to repeat LVIS Yes On Request",
//   "Volume": "Sets audio tone volume LVIS Yes On Request",
//   "AlertCount": "Number of alerts LVIS Yes On Request",
//   "Timeout": "Seconds before timeout LVIS Yes On Request"
//   }]
// }
function Facility() {
  const param = useParams();
  const [page, setPage] = useState(
    Number(window.localStorage.getItem("configurationPage")) || 0
  );
  const [CMS, setCMS] = useState([{
    PartitionKey: "",
    RowKey: "",
    Timestamp: "",
    FacilityID: "",
    GroupID: "",
    CMS: "",
    ConfigID: "",
    HWVersion: "",
    OSVersion: "",
    SWVersion: "",
    PTVersion: "",
    RadioVersion: "",
    LastBootDT: "",
    LastSyncedDT: "",
    LastSignal: "",
    TimeOffset: 0.0,
    Status: "",
  }]);
  const [ConfigAlert, setConfigAlert] = useState([{
    AlertMin: {
      PartitionKey: "",
      RowKey: "",
      Timestamp: "",
      DefinitionType: "",
      Shift: "",
      EquipmentType: "",
      ID: "",
      AlertFilter: "",
      DevFilter: "",
      Enabled: false,
      Seconds: 0,
      SecondsFromStart: 0,
      SecondsFromClear: 0,
      Color1: "",
      Color2: "",
      Blinks: false,
      SortLast: false,
      Tone: "",
      Repeats: false,
      Volume: 0,
      AlertCount: 0,
      Timeout: 0,
    },
    Timeout: {
      PartitionKey: "",
      RowKey: "",
      Timestamp: "",
      DefinitionType: "",
      Shift: "",
      EquipmentType: "",
      ID: "",
      AlertFilter: "",
      DevFilter: "",
      Enabled: false,
      Seconds: 0,
      SecondsFromStart: 0,
      SecondsFromClear: 0,
      Color1: "",
      Color2: "",
      Blinks: false,
      SortLast: false,
      Tone: "",
      Repeats: false,
      Volume: 0,
      AlertCount: 0,
      Timeout: 0,
    },
    Elevaton: [
      {
        PartitionKey: "",
        RowKey: "",
        Timestamp: "",
        DefinitionType: "",
        Shift: "",
        EquipmentType: "",
        ID: "",
        AlertFilter: "",
        DevFilter: "",
        Enabled: false,
        Seconds: 0,
        SecondsFromStart: 0,
        SecondsFromClear: 0,
        Color1: "",
        Color2: "",
        Blinks: false,
        SortLast: false,
        Tone: "",
        Repeats: false,
        Volume: 0,
        AlertCount: 0,
        Timeout: 0,
      },
      {
        PartitionKey: "",
        RowKey: "",
        Timestamp: "",
        DefinitionType: "",
        Shift: "",
        EquipmentType: "",
        ID: "",
        AlertFilter: "",
        DevFilter: "",
        Enabled: false,
        Seconds: 0,
        SecondsFromStart: 0,
        SecondsFromClear: 0,
        Color1: "",
        Color2: "",
        Blinks: false,
        SortLast: false,
        Tone: "",
        Repeats: false,
        Volume: 0,
        AlertCount: 0,
        Timeout: 0,
      },
    ],
  }]);
  const [ConfigCMS, setConfigCMS] = useState([{
    PartitionKey: "",
    RowKey: "",
    Timestamp: "",
    FacilityID: "",
    ShowGroupOnly: false,
    ShowLocationPane: false,
    ShowEmptyRooms: false,
    ShowAllStatus: false,
    ShowSpares: false,
    StatusDirection: "",
    ColumnLeveling: false,
    DefaultVolume: 0,
    PlayConnectTones: false,
    PlayDCConnectTones: false,
    PlayLocConnectTones: false,
    UseMobileWarn: false,
    RecentAlertPeriod: 0,
    ShowResponse: false,
    ResponseTarget: 0,
    CustomPort: "",
    DisableScreen: false,
    VendorMessage: "",
    SyncTimeout: 0,
    SyncInterval: 0,
    SyncFailToOffline: 0,
    FullSyncInterval: 0,
    CheckInPeriod: 0,
  }]);
  const [ConfigMED, setConfigMED] = useState([{
    PartitionKey: "",
    RowKey: "",
    Timestamp: "",
    FacilityID: "",
    GroupIDs: "",
    DisableSettings: false,
    Brightness: 0,
    MaxEscalation: false,
    Notification: 0,
    Vibration: false,
    Volume: 0,
    Ucode: 0,
    SUCode: 0,
    Acode: 0,
  }]);
  const [Facility, setFacility] = useState({
    PartitionKey: "",
    RowKey: "",
    Timestamp: "",
    FacilityID: "",
    Name: "",
    ShortName: "",
    Address1: "",
    Address2: "",
    City: "",
    State: "",
    Zip: "",
    TimeZone: "",
    Country: "",
    Coordinates: "",
    Phone: "",
    PrimaryContact: "",
    Product: "",
    CMSVersion: "",
    Status: "",
    ServiceStatus: "",
    ServiceDetail: "",
    ServiceHistory: "",
    LastRecordDT: "",
    UpdateFromDT: "",
    StartQueue: "",
    Dirty: false,
    Locked: false,
  });
  const [Group, setGroup] = useState([{
    PartitionKey: "",
    RowKey: "",
    Timestamp: "",
    FacilityID: "",
    GroupID: "",
    Name: "",
    ShortName: "",
    ServiceHistory: "",
    Installation: "",
    Spare: false,
    LastRecordDT: "",
    UpdateFromDT: "",
  }]);
  const [Location, setLocation] = useState([{
    PartitionKey: "",
    RowKey: "",
    Timestamp: "",
    GroupID: "",
    RoomID: "",
    LocationID: "",
    LocationSN: "",
    ServiceHistory: "",
    Spare: false,
    Portable: false,
  }]);
  const [MED, setMED] = useState([{
    PartitionKey: "",
    RowKey: "",
    Timestamp: "",
    FacilityID: "",
    MedID: "",
    ConfigID: "",
    HWType: "",
    HWVersion: "",
    OSVersion: "",
    SWVersion: "",
    LastBootDT: "",
    Status: "",
  }]);
  const [Monitor, setMonitor] = useState([{
    PartitionKey: "",
    RowKey: "",
    Timestamp: "",
    LastGroupID: "",
    LastLocationID: "",
    MonitorID: "",
    MonitorSN: "",
    ServiceHistory: "",
    Model: "",
    HWVersion: "",
    SWVersion: "",
    BatteryState: "",
    LastBattery: 0.0,
    LastTxID: "",
    LastRecordDT: "",
    LastSequence: "",
    LastSequenceDT: "",
    SignalCMS: "",
    Status: "",
    ServiceDetail: "",
    UpdateFromDT: "",
  }]);
  const [Room, setRoom] = useState([{
    PartitionKey: "",
    RowKey: "",
    Timestamp: "",
    FacilityID: "",
    GroupID: "",
    RoomID: "",
    ServiceHistory: "",
    Spare: false,
  }]);
  var facilityData;

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        var url = `http://${BASE_URL}/configuration/${param.id}`;
        console.log(url);
        facilityData = (await axios.get(url)).data;
        console.log(facilityData);
        setData(facilityData);
      } catch (error) {
        console.error(
          "There was an error fetching the facilities data!",
          error
        );
      }
    };
    fetchFacility();
  }, [param.id]);

  const setData = (facilityData) => {
        setFacility(facilityData.facility[0]);
        setCMS(facilityData.cms);
        setConfigAlert(facilityData.config_alerts);
        setConfigCMS(facilityData.config_cms);
        setConfigMED(facilityData.config_med);
        setGroup(facilityData.groups);
        setLocation(facilityData.locations);
        setRoom(facilityData.rooms);
        setMonitor(facilityData.monitors);
        setMED(facilityData.meds);
  }

  const handleClick = (pageNumber) => {
    setPage(pageNumber);
    window.localStorage.setItem("configurationPage", pageNumber);
  };

  const handleChange = (event) => {
    const { name, value, type, checked, id } = event.target;
    switch (page) {
      case 1:
        setFacility({ ...Facility, [name]: type === "checkbox" ? checked : value });
        break;
      case 2:
        setCMS({ ...CMS, [name]: type === "checkbox" ? checked : value });
        break;
      case 3:
        setGroup({ ...Group, [name]: type === "checkbox" ? checked : value });
        break;
      case 4:
        setLocation({ ...Location, [name]: type === "checkbox" ? checked : value });
        break;
      case 5:
        setRoom({ ...Room, [name]: type === "checkbox" ? checked : value });
        break;
      case 6:
        setMonitor({ ...Monitor, [name]: type === "checkbox" ? checked : value });
        break;
      case 7:
        setMED({ ...MED, [name]: type === "checkbox" ? checked : value });
        break;
      case 8:
        setConfigAlert({ ...ConfigAlert, [name]: type === "checkbox" ? checked : value });
        break;
      case 9:
        setConfigCMS({ ...ConfigCMS, [name]: type === "checkbox" ? checked : value });
        break;
      case 10:
        setConfigMED({ ...ConfigMED, [name]: type === "checkbox" ? checked : value });
        break;
    }
  };

  const handleSubmit = async (e) => {
    var res = null;
    e.preventDefault();
    try {
      switch (page) {
        case 1:
          res = await axios.post("tbdURL", Facility);
          break;
        case 2:
          res = await axios.post("tbdURL", CMS);
          break;
        case 3:
          res = await axios.post("tbdURL", Group);
          break;
        case 4:
          res = await axios.post("tbdURL", Location);
          break;
        case 5:
          res = await axios.post("tbdURL", Room);
          break;
        case 6:
          res = await axios.post("tbdURL", Monitor);
          break;
        case 7:
          res = await axios.post("tbdURL", MED);
          break;
        case 8:
          res = await axios.post("tbdURL", ConfigAlert);
          break;
        case 9:
          res = await axios.post("tbdURL", ConfigCMS);
          break;
        case 10:
          res = await axios.post("tbdURL", ConfigMED);
          break;
      }
      console.log(res);
      console.log(res.data);
    } catch (error) {
      console.error("There was an error submitting the data!", error);
    }
  };

  const pageGen = () => {
    switch (page) {
      default:
        return (
          <div>
            <h1>Facility</h1>
            <h2>{param.id}</h2>
          </div>
        );
      case 1:
        return (
          <div>
            <form onSubmit={handleChange}>
              <label>
                Facility ID:
                <input
                  type="text"
                  name="FacilityID"
                    className="inputText"
                  value={Facility.FacilityID}
                  onChange={handleChange}
                />
              </label>
              <label>
                Name:
                <input
                  type="text"
                  name="Name"
                    className="inputText"
                  value={Facility.Name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Short Name:
                <input
                  type="text"
                  name="ShortName"
                    className="inputText"
                  value={Facility.ShortName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Address 1:
                <input
                  type="text"
                  name="Address1"
                    className="inputText"
                  value={Facility.Address1}
                  onChange={handleChange}
                />
              </label>
              <label>
                Address 2:
                <input
                  type="text"
                  name="Address2"
                    className="inputText"
                  value={Facility.Address2}
                  onChange={handleChange}
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="City"
                    className="inputText"
                  value={Facility.City}
                  onChange={handleChange}
                />
              </label>
              <label>
                State:
                <input
                  type="text"
                  name="State"
                    className="inputText"
                  value={Facility.State}
                  onChange={handleChange}
                />
              </label>
              <label>
                Zip:
                <input
                  type="text"
                  name="Zip"
                    className="inputText"
                  value={Facility.Zip}
                  onChange={handleChange}
                />
              </label>
              <label>
                Time Zone:
                <input
                  type="text"
                  name="TimeZone"
                    className="inputText"
                  value={Facility.TimeZone}
                  onChange={handleChange}
                />
              </label>
              <label>
                Country:
                <input
                  type="text"
                  name="Country"
                    className="inputText"
                  value={Facility.Country}
                  onChange={handleChange}
                />
              </label>
              <label>
                Coordinates:
                <input
                  type="text"
                  name="Coordinates"
                    className="inputText"
                  value={Facility.Coordinates}
                  onChange={handleChange}
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  name="Phone"
                    className="inputText"
                  value={Facility.Phone}
                  onChange={handleChange}
                />
              </label>
              <label>
                Primary Contact:
                <input
                  type="text"
                  name="PrimaryContact"
                  value={Facility.PrimaryContact}
                  onChange={handleChange}
                />
              </label>
              <label>
                Product:
                <input
                  type="text"
                  name="Product"
                  value={Facility.Product}
                  onChange={handleChange}
                />
              </label>
              <label>
                CMS Version:
                <input
                  type="text"
                  name="CMSVersion"
                  value={Facility.CMSVersion}
                  onChange={handleChange}
                />
              </label>
              <label>
                Status:
                <input
                  type="text"
                  name="Status"
                  value={Facility.Status}
                  onChange={handleChange}
                />
              </label>
              <label>
                Service Status:
                <input
                  type="text"
                  name="ServiceStatus"
                  value={Facility.ServiceStatus}
                  onChange={handleChange}
                />
              </label>
              <label>
                Service Detail:
                <input
                  type="text"
                  name="ServiceDetail"
                  value={Facility.ServiceDetail}
                  onChange={handleChange}
                />
              </label>
              <label>
                Service History:
                <input
                  type="text"
                  name="ServiceHistory"
                  value={Facility.ServiceHistory}
                  onChange={handleChange}
                />
              </label>
              <label>
                Last Record DT:
                <input
                  type="text"
                  name="LastRecordDT"
                  value={Facility.LastRecordDT}
                  onChange={handleChange}
                />
              </label>
              <label>
                Update From DT:
                <input
                  type="text"
                  name="UpdateFromDT"
                  value={Facility.UpdateFromDT}
                  onChange={handleChange}
                />
              </label>
              <label>
                Start Queue:
                <input
                  type="text"
                  name="StartQueue"
                  value={Facility.StartQueue}
                  onChange={handleChange}
                />
              </label>
              <label>
                Dirty:
                <input
                  type="checkbox"
                  name="Dirty"
                  checked={Facility.Dirty}
                  onChange={handleChange}
                />
              </label>
              <label>
                Locked:
                <input
                  type="checkbox"
                  name="Locked"
                  checked={Facility.Locked}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        );
      case 2:
        // array for each cms
        return (
          <div>
            <form onSubmit={handleChange}>
              {/* array for each cms */}
              {CMS.map((cms, index) => (
                <div key={index} className="array">
                  <label>
                    Facility ID:
                    <input
                      type="text"
                      name="FacilityID"
                      value={cms.FacilityID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Group ID:
                    <input
                      type="text"
                      name="GroupID"
                      value={cms.GroupID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    CMS:
                    <input
                      type="text"
                      name="CMS"
                      value={cms.CMS}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Config ID:
                    <input
                      type="text"
                      name="ConfigID"
                      value={cms.ConfigID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    HW Version:
                    <input
                      type="text"
                      name="HWVersion"
                      value={cms.HWVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    OS Version:
                    <input
                      type="text"
                      name="OSVersion"
                      value={cms.OSVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    SW Version:
                    <input
                      type="text"
                      name="SWVersion"
                      value={cms.SWVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    PT Version:
                    <input
                      type="text"
                      name="PTVersion"
                      value={cms.PTVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Radio Version:
                    <input
                      type="text"
                      name="RadioVersion"
                      value={cms.RadioVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Boot DT:
                    <input
                      type="text"
                      name="LastBootDT"
                      value={cms.LastBootDT}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Synced DT:
                    <input
                      type="text"
                      name="LastSyncedDT"
                      value={cms.LastSyncedDT}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Signal:
                    <input
                      type="text"
                      name="LastSignal"
                      value={cms.LastSignal}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Time Offset:
                    <input
                      type="number"
                      name="TimeOffset"
                      value={cms.TimeOffset}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Status:
                    <input
                      type="text"
                      name="Status"
                      value={cms.Status}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              ))}
            </form>
          </div>
        );
      case 3:
        // array for each group
        return (
          <div>
            <form onSubmit={handleChange}>
              {/* array for each group */}
              {Group.map((group, index) => (
                <div key={index} className="array">
                  <label>
                    Facility ID:
                    <input
                      type="text"
                      name="FacilityID"
                      value={group.FacilityID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Group ID:
                    <input
                      type="text"
                      name="GroupID"
                      value={group.GroupID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Name:
                    <input
                      type="text"
                      name="Name"
                      value={group.Name}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Short Name:
                    <input
                      type="text"
                      name="ShortName"
                      value={group.ShortName}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Service History:
                    <input
                      type="text"
                      name="ServiceHistory"
                      value={group.ServiceHistory}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Installation:
                    <input
                      type="text"
                      name="Installation"
                      value={group.Installation}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Spare:
                    <input
                      type="checkbox"
                      name="Spare"
                      checked={group.Spare}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Record DT:
                    <input
                      type="text"
                      name="LastRecordDT"
                      value={group.LastRecordDT}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Update From DT:
                    <input
                      type="text"
                      name="UpdateFromDT"
                      value={group.UpdateFromDT}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              ))}
            </form>
          </div>
        );
      case 4:
        // array for each location
        return (
          <div>
            <form onSubmit={handleChange}>
              {/* array for each location */}
              {Location.map((location, index) => (
                <div key={index} className="array">
                  <label>
                    Group ID:
                    <input
                      type="text"
                      name="GroupID"
                      value={location.GroupID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Room ID:
                    <input
                      type="text"
                      name="RoomID"
                      value={location.RoomID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Location ID:
                    <input
                      type="text"
                      name="LocationID"
                      value={location.LocationID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Location SN:
                    <input
                      type="text"
                      name="LocationSN"
                      value={location.LocationSN}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Service History:
                    <input
                      type="text"
                      name="ServiceHistory"
                      value={location.ServiceHistory}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Spare:
                    <input
                      type="checkbox"
                      name="Spare"
                      checked={location.Spare}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Portable:
                    <input
                      type="checkbox"
                      name="Portable"
                      checked={location.Portable}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              ))}
            </form>
          </div>
        );
      case 5:
        // array for each room
        return (
          <div>
            <form onSubmit={handleChange}>
              {/* array for each room */}
              {Room.map((room, index) => (
                <div key={index} className="array">
                  <label>
                    Facility ID:
                    <input
                      type="text"
                      name="FacilityID"
                      value={room.FacilityID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Group ID:
                    <input
                      type="text"
                      name="GroupID"
                      value={room.GroupID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Room ID:
                    <input
                      type="text"
                      name="RoomID"
                      value={room.RoomID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Service History:
                    <input
                      type="text"
                      name="ServiceHistory"
                      value={room.ServiceHistory}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Spare:
                    <input
                      type="checkbox"
                      name="Spare"
                      checked={room.Spare}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              ))}
            </form>
          </div>
        );
      case 6:
        // array for each monitor
        return (
          <div>
            <form onSubmit={handleChange}>
              {/* array for each monitor */}
              {Monitor.map((monitor, index) => (
                <div key={index} className="array">
                  <label>
                    Last Group ID:
                    <input
                      type="text"
                      name="LastGroupID"
                      value={monitor.LastGroupID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Location ID:
                    <input
                      type="text"
                      name="LastLocationID"
                      value={monitor.LastLocationID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Monitor ID:
                    <input
                      type="text"
                      name="MonitorID"
                      value={monitor.MonitorID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Monitor SN:
                    <input
                      type="text"
                      name="MonitorSN"
                      value={monitor.MonitorSN}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Service History:
                    <input
                      type="text"
                      name="ServiceHistory"
                      value={monitor.ServiceHistory}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Model:
                    <input
                      type="text"
                      name="Model"
                      value={monitor.Model}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    HW Version:
                    <input
                      type="text"
                      name="HWVersion"
                      value={monitor.HWVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    SW Version:
                    <input
                      type="text"
                      name="SWVersion"
                      value={monitor.SWVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Battery State:
                    <input
                      type="text"
                      name="BatteryState"
                      value={monitor.BatteryState}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Battery:
                    <input
                      type="number"
                      name="LastBattery"
                      value={monitor.LastBattery}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Tx ID:
                    <input
                      type="text"
                      name="LastTxID"
                      value={monitor.LastTxID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Record DT:
                    <input
                      type="text"
                      name="LastRecordDT"
                      value={monitor.LastRecordDT}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Sequence:
                    <input
                      type="text"
                      name="LastSequence"
                      value={monitor.LastSequence}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Sequence DT:
                    <input
                      type="text"
                      name="LastSequenceDT"
                      value={monitor.LastSequenceDT}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Signal CMS:
                    <input
                      type="text"
                      name="SignalCMS"
                      value={monitor.SignalCMS}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Status:
                    <input
                      type="text"
                      name="Status"
                      value={monitor.Status}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Service Detail:
                    <input
                      type="text"
                      name="ServiceDetail"
                      value={monitor.ServiceDetail}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Update From DT:
                    <input
                      type="text"
                      name="UpdateFromDT"
                      value={monitor.UpdateFromDT}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              ))}
            </form>
          </div>
        );
      case 7:
        // array for each med
        return (
          <div>
            <form onSubmit={handleChange}>
              {/* array for each med */}
              {MED.map((med, index) => (
                <div key={index} className="array">
                  <label>
                    Facility ID:
                    <input
                      type="text"
                      name="FacilityID"
                      value={med.FacilityID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Med ID:
                    <input
                      type="text"
                      name="MedID"
                      value={med.MedID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Config ID:
                    <input
                      type="text"
                      name="ConfigID"
                      value={med.ConfigID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    HW Type:
                    <input
                      type="text"
                      name="HWType"
                      value={med.HWType}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    HW Version:
                    <input
                      type="text"
                      name="HWVersion"
                      value={med.HWVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    OS Version:
                    <input
                      type="text"
                      name="OSVersion"
                      value={med.OSVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    SW Version:
                    <input
                      type="text"
                      name="SWVersion"
                      value={med.SWVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Boot DT:
                    <input
                      type="text"
                      name="LastBootDT"
                      value={med.LastBootDT}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Status:
                    <input
                      type="text"
                      name="Status"
                      value={med.Status}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              ))}
            </form>
          </div>
        );
      case 8:
        // array for each config alert
        return (
          <div>
            <form onSubmit={handleChange}>
              {/* array for each config alert */}
              {ConfigAlert.map((configAlert, index) => (
                <div key={index} className="array">
                  <label>
                    Alert Min:
                    <input
                      type="text"
                      name="AlertMin"
                      value={configAlert.AlertMin}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Timeout:
                    <input
                      type="text"
                      name="Timeout"
                      value={configAlert.Timeout}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Elevation:
                    <input
                      type="text"
                      name="Elevation"
                      value={configAlert.Elevation}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              ))}
            </form>
          </div>
        );
      case 9:
        return (
          <div>
            <form onSubmit={handleChange}>
              <label>
                Facility ID:
                <input
                  type="text"
                  name="FacilityID"
                  value={ConfigCMS.FacilityID}
                  onChange={handleChange}
                />
              </label>
              <label>
                Show Group Only:
                <input
                  type="checkbox"
                  name="ShowGroupOnly"
                  checked={ConfigCMS.ShowGroupOnly}
                  onChange={handleChange}
                />
              </label>
              <label>
                Show Location Pane:
                <input
                  type="checkbox"
                  name="ShowLocationPane"
                  checked={ConfigCMS.ShowLocationPane}
                  onChange={handleChange}
                />
              </label>
              <label>
                Show Empty Rooms:
                <input
                  type="checkbox"
                  name="ShowEmptyRooms"
                  checked={ConfigCMS.ShowEmptyRooms}
                  onChange={handleChange}
                />
              </label>
              <label>
                Show All Status:
                <input
                  type="checkbox"
                  name="ShowAllStatus"
                  checked={ConfigCMS.ShowAllStatus}
                  onChange={handleChange}
                />
              </label>
              <label>
                Show Spares:
                <input
                  type="checkbox"
                  name="ShowSpares"
                  checked={ConfigCMS.ShowSpares}
                  onChange={handleChange}
                />
              </label>
              <label>
                Status Direction:
                <input
                  type="text"
                  name="StatusDirection"
                  value={ConfigCMS.StatusDirection}
                  onChange={handleChange}
                />
              </label>
              <label>
                Column Leveling:
                <input
                  type="checkbox"
                  name="ColumnLeveling"
                  checked={ConfigCMS.ColumnLeveling}
                  onChange={handleChange}
                />
              </label>
              <label>
                Default Volume:
                <input
                  type="number"
                  name="DefaultVolume"
                  value={ConfigCMS.DefaultVolume}
                  onChange={handleChange}
                />
              </label>
              <label>
                Play Connect Tones:
                <input
                  type="checkbox"
                  name="PlayConnectTones"
                  checked={ConfigCMS.PlayConnectTones}
                  onChange={handleChange}
                />
              </label>
              <label>
                Play DC Connect Tones:
                <input
                  type="checkbox"
                  name="PlayDCConnectTones"
                  checked={ConfigCMS.PlayDCConnectTones}
                  onChange={handleChange}
                />
              </label>
              <label>
                Play Loc Connect Tones:
                <input
                  type="checkbox"
                  name="PlayLocConnectTones"
                  checked={ConfigCMS.PlayLocConnectTones}
                  onChange={handleChange}
                />
              </label>
              <label>
                Use Mobile Warn:
                <input
                  type="checkbox"
                  name="UseMobileWarn"
                  checked={ConfigCMS.UseMobileWarn}
                  onChange={handleChange}
                />
              </label>
              <label>
                Recent Alert Period:
                <input
                  type="number"
                  name="RecentAlertPeriod"
                  value={ConfigCMS.RecentAlertPeriod}
                  onChange={handleChange}
                />
              </label>
              <label>
                Show Response:
                <input
                  type="checkbox"
                  name="ShowResponse"
                  checked={ConfigCMS.ShowResponse}
                  onChange={handleChange}
                />
              </label>
              <label>
                Response Target:
                <input
                  type="number"
                  name="ResponseTarget"
                  value={ConfigCMS.ResponseTarget}
                  onChange={handleChange}
                />
              </label>
              <label>
                Custom Port:
                <input
                  type="text"
                  name="CustomPort"
                  value={ConfigCMS.CustomPort}
                  onChange={handleChange}
                />
              </label>
              <label>
                Disable Screen:
                <input
                  type="checkbox"
                  name="DisableScreen"
                  checked={ConfigCMS.DisableScreen}
                  onChange={handleChange}
                />
              </label>
              <label>
                Vendor Message:
                <input
                  type="text"
                  name="VendorMessage"
                  value={ConfigCMS.VendorMessage}
                  onChange={handleChange}
                />
              </label>
              <label>
                Sync Timeout:
                <input
                  type="number"
                  name="SyncTimeout"
                  value={ConfigCMS.SyncTimeout}
                  onChange={handleChange}
                />
              </label>
              <label>
                Sync Interval:
                <input
                  type="number"
                  name="SyncInterval"
                  value={ConfigCMS.SyncInterval}
                  onChange={handleChange}
                />
              </label>
              <label>
                Sync Fail To Offline:
                <input
                  type="number"
                  name="SyncFailToOffline"
                  value={ConfigCMS.SyncFailToOffline}
                  onChange={handleChange}
                />
              </label>
              <label>
                Full Sync Interval:
                <input
                  type="number"
                  name="FullSyncInterval"
                  value={ConfigCMS.FullSyncInterval}
                  onChange={handleChange}
                />
              </label>
              <label>
                Check In Period:
                <input
                  type="number"
                  name="CheckInPeriod"
                  value={ConfigCMS.CheckInPeriod}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        );
      case 10:
        return (
          <div>
            <form onSubmit={handleChange}>
              <label>
                Facility ID:
                <input
                  type="text"
                  name="FacilityID"
                  value={ConfigMED.FacilityID}
                  onChange={handleChange}
                />
              </label>
              <label>
                Group IDs:
                <input
                  type="text"
                  name="GroupIDs"
                  value={ConfigMED.GroupIDs}
                  onChange={handleChange}
                />
              </label>
              <label>
                Disable Settings:
                <input
                  type="checkbox"
                  name="DisableSettings"
                  checked={ConfigMED.DisableSettings}
                  onChange={handleChange}
                />
              </label>
              <label>
                Brightness:
                <input
                  type="number"
                  name="Brightness"
                  value={ConfigMED.Brightness}
                  onChange={handleChange}
                />
              </label>
              <label>
                Max Escalation:
                <input
                  type="checkbox"
                  name="MaxEscalation"
                  checked={ConfigMED.MaxEscalation}
                  onChange={handleChange}
                />
              </label>
              <label>
                Notification:
                <input
                  type="number"
                  name="Notification"
                  value={ConfigMED.Notification}
                  onChange={handleChange}
                />
              </label>
              <label>
                Vibration:
                <input
                  type="checkbox"
                  name="Vibration"
                  checked={ConfigMED.Vibration}
                  onChange={handleChange}
                />
              </label>
              <label>
                Volume:
                <input
                  type="number"
                  name="Volume"
                  value={ConfigMED.Volume}
                  onChange={handleChange}
                />
              </label>
              <label>
                Ucode:
                <input
                  type="number"
                  name="Ucode"
                  value={ConfigMED.Ucode}
                  onChange={handleChange}
                />
              </label>
              <label>
                SUCode:
                <input
                  type="number"
                  name="SUCode"
                  value={ConfigMED.SUCode}
                  onChange={handleChange}
                />
              </label>
              <label>
                Acode:
                <input
                  type="number"
                  name="Acode"
                  value={ConfigMED.Acode}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        );
    }
  };

  return (
    <div className="splitSides">
      <div className="sidebar">
        <Sidebar>
          <Menu>
            <MenuItem onClick={() => handleClick(1)}> Facility </MenuItem>
            <MenuItem onClick={() => handleClick(2)}> CMS </MenuItem>
            <MenuItem onClick={() => handleClick(3)}> Group </MenuItem>
            <MenuItem onClick={() => handleClick(4)}> Location </MenuItem>
            <MenuItem onClick={() => handleClick(5)}> Room </MenuItem>
            <MenuItem onClick={() => handleClick(6)}> Monitor </MenuItem>
            <MenuItem onClick={() => handleClick(7)}> MED </MenuItem>
            <MenuItem onClick={() => handleClick(8)}> ConfigAlert </MenuItem>
            <MenuItem onClick={() => handleClick(9)}> ConfigCMS </MenuItem>
            <MenuItem onClick={() => handleClick(10)}> ConfigMED </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <div className="fullPage">{pageGen()}</div>
    </div>
  );
}

export default Facility;
