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
  const [CMS, setCMS] = useState([
    {
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
    },
  ]);
  const [ConfigAlert, setConfigAlert] = useState([
    {
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
    },
  ]);
  const [ConfigCMS, setConfigCMS] = useState([
    {
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
    },
  ]);
  const [ConfigMED, setConfigMED] = useState([
    {
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
    },
  ]);
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
  const [Group, setGroup] = useState([
    {
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
    },
  ]);
  const [Location, setLocation] = useState([
    {
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
    },
  ]);
  const [MED, setMED] = useState([
    {
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
    },
  ]);
  const [Monitor, setMonitor] = useState([
    {
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
    },
  ]);
  const [Room, setRoom] = useState([
    {
      PartitionKey: "",
      RowKey: "",
      Timestamp: "",
      FacilityID: "",
      GroupID: "",
      RoomID: "",
      ServiceHistory: "",
      Spare: false,
    },
  ]);
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
    setConfigAlert(facilityData.configAlerts);
    setConfigCMS(facilityData.configCMS);
    setConfigMED(facilityData.configMED);
    setGroup(facilityData.groups);
    setLocation(facilityData.locations);
    setRoom(facilityData.rooms);
    setMonitor(facilityData.monitors);
    setMED(facilityData.meds);
  };

  const handleClick = (pageNumber) => {
    setPage(pageNumber);
    window.localStorage.setItem("configurationPage", pageNumber);
  };

  const handleChange = (event) => {
    const { name, value, type, checked, id } = event.target;
    console.log(name, value, type, checked, id);
    switch (page) {
      case 1:
        setFacility({
          ...Facility,
          [name]: type === "checkbox" ? checked : value,
        });
        break;
      case 2:
        setCMS({ ...CMS, [name]: type === "checkbox" ? checked : value });
        break;
      case 3:
        setGroup({ ...Group, [name]: type === "checkbox" ? checked : value });
        break;
      case 4:
        setLocation({
          ...Location,
          [name]: type === "checkbox" ? checked : value,
        });
        break;
      case 5:
        setRoom({ ...Room, [name]: type === "checkbox" ? checked : value });
        break;
      case 6:
        setMonitor({
          ...Monitor,
          [name]: type === "checkbox" ? checked : value,
        });
        break;
      case 7:
        setMED({ ...MED, [name]: type === "checkbox" ? checked : value });
        break;
      case 8:
        if(id === "AlertMin"){
          setConfigAlert({
            ...ConfigAlert,
            [id]: {
              ...ConfigAlert[id],
              [name]: type === "checkbox" ? checked : value,
            },
          });
        } else if(id === "Timeout"){
          setConfigAlert({
            ...ConfigAlert,
            [id]: {
              ...ConfigAlert[id],
              [name]: type === "checkbox" ? checked : value,
            },
          });
        } else if(id === "Activity"){
          setConfigAlert({
            ...ConfigAlert,
            [id]: {
              ...ConfigAlert[id],
              [name]: type === "checkbox" ? checked : value,
            },
          });
        } else if(id === "Elevation"){
          setConfigAlert({
            ...ConfigAlert,
            [id]: {
              ...ConfigAlert[id],
              [name]: type === "checkbox" ? checked : value,
            },
          });
        }
        break;
      case 9:
        setConfigCMS({
          ...ConfigCMS,
          [name]: type === "checkbox" ? checked : value,
        });
        break;
      case 10:
        setConfigMED({
          ...ConfigMED,
          [name]: type === "checkbox" ? checked : value,
        });
        break;
    }
    handleSubmit(event);
  };

  const handleSubmit = async (e) => {
    var res = null;
    e.preventDefault();
    try {
      switch (page) {
        case 1:
          res = await axios.post(`http://${BASE_URL}/configuration/facility/${param.id}`, Facility);
          break;
        case 2:
          res = await axios.post(`http://${BASE_URL}/configuration/cms/${param.id}`, CMS);
          break;
        case 3:
          res = await axios.post(`http://${BASE_URL}/configuration/group/${param.id}`, Group);
          break;
        case 4:
          res = await axios.post(`http://${BASE_URL}/configuration/location/${param.id}`, Location);
          break;
        case 5:
          res = await axios.post(`http://${BASE_URL}/configuration/room/${param.id}`, Room);
          break;
        case 6:
          res = await axios.post(`http://${BASE_URL}/configuration/monitor/${param.id}`, Monitor);
          break;
        case 7:
          res = await axios.post(`http://${BASE_URL}/configuration/med/${param.id}`, MED);
          break;
        case 8:
          console.log(ConfigAlert)
          console.log(`http://${BASE_URL}/configuration/configAlert?configAlert_id=${param.id}`)
          res = await axios.post(`http://${BASE_URL}/configuration/configAlert?configAlert_id=${param.id}`, ConfigAlert[0]);
          break;
        case 9:
          res = await axios.post(`http://${BASE_URL}/configuration/configcms/${param.id}`, ConfigCMS);
          break;
        case 10:
          res = await axios.post(`http://${BASE_URL}/configuration/configmed/${param.id}`, ConfigMED);
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
        if (Facility === undefined) {
          return <div></div>;
        }
        return (
          <div>
            <form onSubmit={handleChange}>
              <label>
                Facility ID:
                <input
                  type="text"
                  name="FacilityID"
                  className="inputText"
                  defaultValue={Facility.FacilityID}
                  onChange={handleChange}
                />
              </label>
              <label>
                Name:
                <input
                  type="text"
                  name="Name"
                  className="inputText"
                  defaultValue={Facility.Name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Short Name:
                <input
                  type="text"
                  name="ShortName"
                  className="inputText"
                  defaultValue={Facility.ShortName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Address 1:
                <input
                  type="text"
                  name="Address1"
                  className="inputText"
                  defaultValue={Facility.Address1}
                  onChange={handleChange}
                />
              </label>
              <label>
                Address 2:
                <input
                  type="text"
                  name="Address2"
                  className="inputText"
                  defaultValue={Facility.Address2}
                  onChange={handleChange}
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="City"
                  className="inputText"
                  defaultValue={Facility.City}
                  onChange={handleChange}
                />
              </label>
              <label>
                State:
                <input
                  type="text"
                  name="State"
                  className="inputText"
                  defaultValue={Facility.State}
                  onChange={handleChange}
                />
              </label>
              <label>
                Zip:
                <input
                  type="text"
                  name="Zip"
                  className="inputText"
                  defaultValue={Facility.Zip}
                  onChange={handleChange}
                />
              </label>
              <label>
                Time Zone:
                <input
                  type="text"
                  name="TimeZone"
                  className="inputText"
                  defaultValue={Facility.TimeZone}
                  onChange={handleChange}
                />
              </label>
              <label>
                Country:
                <input
                  type="text"
                  name="Country"
                  className="inputText"
                  defaultValue={Facility.Country}
                  onChange={handleChange}
                />
              </label>
              <label>
                Coordinates:
                <input
                  type="text"
                  name="Coordinates"
                  className="inputText"
                  defaultValue={Facility.Coordinates}
                  onChange={handleChange}
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  name="Phone"
                  className="inputText"
                  defaultValue={Facility.Phone}
                  onChange={handleChange}
                />
              </label>
              <label>
                Primary Contact:
                <input
                  type="text"
                  name="PrimaryContact"
                  defaultValue={Facility.PrimaryContact}
                  onChange={handleChange}
                />
              </label>
              <label>
                Product:
                <input
                  type="text"
                  name="Product"
                  defaultValue={Facility.Product}
                  onChange={handleChange}
                />
              </label>
              <label>
                CMS Version:
                <input
                  type="text"
                  name="CMSVersion"
                  defaultValue={Facility.CMSVersion}
                  onChange={handleChange}
                />
              </label>
              <label>
                Status:
                <input
                  type="text"
                  name="Status"
                  defaultValue={Facility.Status}
                  onChange={handleChange}
                />
              </label>
              <label>
                Service Status:
                <input
                  type="text"
                  name="ServiceStatus"
                  defaultValue={Facility.ServiceStatus}
                  onChange={handleChange}
                />
              </label>
              <label>
                Service Detail:
                <input
                  type="text"
                  name="ServiceDetail"
                  defaultValue={Facility.ServiceDetail}
                  onChange={handleChange}
                />
              </label>
              <label>
                Service History:
                <input
                  type="text"
                  name="ServiceHistory"
                  defaultValue={Facility.ServiceHistory}
                  onChange={handleChange}
                />
              </label>
              <label>
                Last Record DT:
                <input
                  type="text"
                  name="LastRecordDT"
                  defaultValue={Facility.LastRecordDT}
                  onChange={handleChange}
                />
              </label>
              <label>
                Update From DT:
                <input
                  type="text"
                  name="UpdateFromDT"
                  defaultValue={Facility.UpdateFromDT}
                  onChange={handleChange}
                />
              </label>
              <label>
                Start Queue:
                <input
                  type="text"
                  name="StartQueue"
                  defaultValue={Facility.StartQueue}
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
        if (Facility === undefined) {
          return <div></div>;
        }
        return (
          <div>
            <form onSubmit={handleChange}>
              {CMS.map((cms, index) => (
                <div key={index} className="array">
                  <label>
                    Facility ID:
                    <input
                      type="text"
                      name="FacilityID"
                      defaultValue={cms.FacilityID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Group ID:
                    <input
                      type="text"
                      name="GroupID"
                      defaultValue={cms.GroupID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    CMS:
                    <input
                      type="text"
                      name="CMS"
                      defaultValue={cms.CMS}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Config ID:
                    <input
                      type="text"
                      name="ConfigID"
                      defaultValue={cms.ConfigID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    HW Version:
                    <input
                      type="text"
                      name="HWVersion"
                      defaultValue={cms.HWVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    OS Version:
                    <input
                      type="text"
                      name="OSVersion"
                      defaultValue={cms.OSVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    SW Version:
                    <input
                      type="text"
                      name="SWVersion"
                      defaultValue={cms.SWVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    PT Version:
                    <input
                      type="text"
                      name="PTVersion"
                      defaultValue={cms.PTVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Radio Version:
                    <input
                      type="text"
                      name="RadioVersion"
                      defaultValue={cms.RadioVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Boot DT:
                    <input
                      type="text"
                      name="LastBootDT"
                      defaultValue={cms.LastBootDT}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Synced DT:
                    <input
                      type="text"
                      name="LastSyncedDT"
                      defaultValue={cms.LastSyncedDT}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Signal:
                    <input
                      type="text"
                      name="LastSignal"
                      defaultValue={cms.LastSignal}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Time Offset:
                    <input
                      type="number"
                      name="TimeOffset"
                      defaultValue={cms.TimeOffset}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Status:
                    <input
                      type="text"
                      name="Status"
                      defaultValue={cms.Status}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              ))}
            </form>
          </div>
        );
      case 3:
        if (Facility === undefined) {
          return <div></div>;
        }
        return (
          <div>
            <form onSubmit={handleChange}>
              {Group.map((group, index) => (
                <div key={index} className="array">
                  <label>
                    Facility ID:
                    <input
                      type="text"
                      name="FacilityID"
                      defaultValue={group.FacilityID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Group ID:
                    <input
                      type="text"
                      name="GroupID"
                      defaultValue={group.GroupID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Name:
                    <input
                      type="text"
                      name="Name"
                      defaultValue={group.Name}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Short Name:
                    <input
                      type="text"
                      name="ShortName"
                      defaultValue={group.ShortName}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Service History:
                    <input
                      type="text"
                      name="ServiceHistory"
                      defaultValue={group.ServiceHistory}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Installation:
                    <input
                      type="text"
                      name="Installation"
                      defaultValue={group.Installation}
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
                      defaultValue={group.LastRecordDT}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Update From DT:
                    <input
                      type="text"
                      name="UpdateFromDT"
                      defaultValue={group.UpdateFromDT}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              ))}
            </form>
          </div>
        );
      case 4:
        if (Facility === undefined) {
          return <div></div>;
        }
        return (
          <div>
            <form onSubmit={handleChange}>
              {Location.map((location, index) => (
                <div key={index} className="array">
                  <label>
                    Group ID:
                    <input
                      type="text"
                      name="GroupID"
                      defaultValue={location.GroupID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Room ID:
                    <input
                      type="text"
                      name="RoomID"
                      defaultValue={location.RoomID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Location ID:
                    <input
                      type="text"
                      name="LocationID"
                      defaultValue={location.LocationID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Location SN:
                    <input
                      type="text"
                      name="LocationSN"
                      defaultValue={location.LocationSN}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Service History:
                    <input
                      type="text"
                      name="ServiceHistory"
                      defaultValue={location.ServiceHistory}
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
        if (Facility === undefined) {
          return <div></div>;
        }
        return (
          <div>
            <form onSubmit={handleChange}>
              {Room.map((room, index) => (
                <div key={index} className="array">
                  <label>
                    Facility ID:
                    <input
                      type="text"
                      name="FacilityID"
                      defaultValue={room.FacilityID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Group ID:
                    <input
                      type="text"
                      name="GroupID"
                      defaultValue={room.GroupID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Room ID:
                    <input
                      type="text"
                      name="RoomID"
                      defaultValue={room.RoomID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Service History:
                    <input
                      type="text"
                      name="ServiceHistory"
                      defaultValue={room.ServiceHistory}
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
        if (Facility === undefined) {
          return <div></div>;
        }
        return (
          <div>
            <form onSubmit={handleChange}>
              {Monitor.map((monitor, index) => (
                <div key={index} className="array">
                  <label>
                    Last Group ID:
                    <input
                      type="text"
                      name="LastGroupID"
                      defaultValue={monitor.LastGroupID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Location ID:
                    <input
                      type="text"
                      name="LastLocationID"
                      defaultValue={monitor.LastLocationID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Monitor ID:
                    <input
                      type="text"
                      name="MonitorID"
                      defaultValue={monitor.MonitorID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Monitor SN:
                    <input
                      type="text"
                      name="MonitorSN"
                      defaultValue={monitor.MonitorSN}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Service History:
                    <input
                      type="text"
                      name="ServiceHistory"
                      defaultValue={monitor.ServiceHistory}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Model:
                    <input
                      type="text"
                      name="Model"
                      defaultValue={monitor.Model}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    HW Version:
                    <input
                      type="text"
                      name="HWVersion"
                      defaultValue={monitor.HWVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    SW Version:
                    <input
                      type="text"
                      name="SWVersion"
                      defaultValue={monitor.SWVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Battery State:
                    <input
                      type="text"
                      name="BatteryState"
                      defaultValue={monitor.BatteryState}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Battery:
                    <input
                      type="number"
                      name="LastBattery"
                      defaultValue={monitor.LastBattery}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Tx ID:
                    <input
                      type="text"
                      name="LastTxID"
                      defaultValue={monitor.LastTxID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Record DT:
                    <input
                      type="text"
                      name="LastRecordDT"
                      defaultValue={monitor.LastRecordDT}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Sequence:
                    <input
                      type="text"
                      name="LastSequence"
                      defaultValue={monitor.LastSequence}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Sequence DT:
                    <input
                      type="text"
                      name="LastSequenceDT"
                      defaultValue={monitor.LastSequenceDT}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Signal CMS:
                    <input
                      type="text"
                      name="SignalCMS"
                      defaultValue={monitor.SignalCMS}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Status:
                    <input
                      type="text"
                      name="Status"
                      defaultValue={monitor.Status}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Service Detail:
                    <input
                      type="text"
                      name="ServiceDetail"
                      defaultValue={monitor.ServiceDetail}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Update From DT:
                    <input
                      type="text"
                      name="UpdateFromDT"
                      defaultValue={monitor.UpdateFromDT}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              ))}
            </form>
          </div>
        );
      case 7:
        if (Facility === undefined) {
          return <div></div>;
        }
        return (
          <div>
            <form onSubmit={handleChange}>
              {MED.map((med, index) => (
                <div key={index} className="array">
                  <label>
                    Facility ID:
                    <input
                      type="text"
                      name="FacilityID"
                      defaultValue={med.FacilityID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Med ID:
                    <input
                      type="text"
                      name="MedID"
                      defaultValue={med.MedID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Config ID:
                    <input
                      type="text"
                      name="ConfigID"
                      defaultValue={med.ConfigID}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    HW Type:
                    <input
                      type="text"
                      name="HWType"
                      defaultValue={med.HWType}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    HW Version:
                    <input
                      type="text"
                      name="HWVersion"
                      defaultValue={med.HWVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    OS Version:
                    <input
                      type="text"
                      name="OSVersion"
                      defaultValue={med.OSVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    SW Version:
                    <input
                      type="text"
                      name="SWVersion"
                      defaultValue={med.SWVersion}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Boot DT:
                    <input
                      type="text"
                      name="LastBootDT"
                      defaultValue={med.LastBootDT}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Status:
                    <input
                      type="text"
                      name="Status"
                      defaultValue={med.Status}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              ))}
            </form>
          </div>
        );
      case 8:
        if (Facility === undefined) {
          return <div></div>;
        }
        // array for each config alert
        return (
          // {
          //   "_id": {
          //     "$oid": "667071218badf127ae5af491"
          //   },
          //   "PartitionKey": "CAVN001",
          //   "RowKey": "AL001",
          //   "Description": "Alert 1",
          //   "AlertMin": {
          //     "PartitionKey": "CAVN001",
          //     "RowKey": "AM001",
          //     "DefinitionType": "AlertMin",
          //     "Shift": "All",
          //     "EquipmentType": "Facility",
          //     "ID": "",
          //     "AlertFilter": "All",
          //     "DevFilter": "All",
          //     "Enabled": true,
          //     "Seconds": -1,
          //     "SecondsFromStart": 0,
          //     "SecondsFromClear": -1,
          //     "Color1": "",
          //     "Color2": "",
          //     "Blinks": false,
          //     "SortLast": false,
          //     "Tone": "",
          //     "Repeats": false,
          //     "Volume": -1,
          //     "AlertCount": -1,
          //     "Timeout": -1
          //   },
          //   "Timeout": {
          //     "PartitionKey": "CAVN001",
          //     "RowKey": "TO001",
          //     "DefinitionType": "Timeout",
          //     "Shift": "All",
          //     "EquipmentType": "Facility",
          //     "ID": "",
          //     "AlertFilter": "All",
          //     "DevFilter": "All",
          //     "Enabled": true,
          //     "Seconds": -1,
          //     "SecondsFromStart": -1,
          //     "SecondsFromClear": 0,
          //     "Color1": "",
          //     "Color2": "",
          //     "Blinks": false,
          //     "SortLast": false,
          //     "Tone": "",
          //     "Repeats": false,
          //     "Volume": -1,
          //     "AlertCount": -1,
          //     "Timeout": -1
          //   },
          //   "Activity": {
          //     "PartitionKey": "CAVN001",
          //     "RowKey": "TO001",
          //     "DefinitionType": "ActivityWarning",
          //     "Shift": "All",
          //     "EquipmentType": "Facility",
          //     "ID": "",
          //     "AlertFilter": "All",
          //     "DevFilter": "All",
          //     "Enabled": true,
          //     "Seconds": 5,
          //     "SecondsFromStart": -1,
          //     "SecondsFromClear": -1,
          //     "Color1": "",
          //     "Color2": "",
          //     "Blinks": false,
          //     "SortLast": false,
          //     "Tone": "",
          //     "Repeats": false,
          //     "Volume": -1,
          //     "AlertCount": -1,
          //     "Timeout": -1
          //   },
          //   "Elevation": [
          //     {
          //       "PartitionKey": "CAVN001",
          //       "RowKey": "EL001",
          //       "DefinitionType": "Timeout",
          //       "Shift": "All",
          //       "EquipmentType": "Facility",
          //       "ID": "",
          //       "AlertFilter": "All",
          //       "DevFilter": "All",
          //       "Enabled": true,
          //       "Seconds": 5,
          //       "SecondsFromStart": -1,
          //       "SecondsFromClear": -1,
          //       "Color1": "yellow",
          //       "Color2": "dark_yellow",
          //       "Blinks": true,
          //       "SortLast": false,
          //       "Tone": "Short",
          //       "Repeats": false,
          //       "Volume": 64,
          //       "AlertCount": 1,
          //       "Timeout": 5
          //     },
          //     {
          //       "PartitionKey": "CAVN001",
          //       "RowKey": "EL002",
          //       "DefinitionType": "Timeout",
          //       "Shift": "All",
          //       "EquipmentType": "Facility",
          //       "ID": "",
          //       "AlertFilter": "All",
          //       "DevFilter": "All",
          //       "Enabled": true,
          //       "Seconds": 10,
          //       "SecondsFromStart": -1,
          //       "SecondsFromClear": -1,
          //       "Color1": "yellow",
          //       "Color2": "dark_yellow",
          //       "Blinks": true,
          //       "SortLast": false,
          //       "Tone": "Short",
          //       "Repeats": false,
          //       "Volume": 64,
          //       "AlertCount": 1,
          //       "Timeout": 15
          //     }
          //   ]
          // }
          <div>
            <form onSubmit={handleChange}>
              {ConfigAlert? ConfigAlert.map((configAlert, index) => (
                <div key={index} className="array">
                  <table>
                    <thead>
                      <tr>
                        <th colSpan="2">Config Alert {index + 1}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Description:</td>
                        <td>
                          <input
                            type="text"
                            name="Description"
                            defaultValue={configAlert.Description}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <label>Alert Min:</label>
                  <table>
                    <thead>
                      <tr>
                        <th>Shift</th>
                        <th>Equipment Type</th>
                        <th>ID</th>
                        <th>Alert Filter</th>
                        <th>Dev Filter</th>
                        <th>Enabled</th>
                        <th>Seconds From Start</th>
                        <th>Seconds From Clear</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            name="Shift"
                            defaultValue={configAlert.AlertMin!= null? configAlert.AlertMin.Shift!=null? configAlert.AlertMin.Shift: "" : ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="EquipmentType"
                            defaultValue={configAlert.AlertMin.EquipmentType ? configAlert.AlertMin.EquipmentType : ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="ID"
                            defaultValue={configAlert.AlertMin.ID? configAlert.AlertMin.ID : ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="AlertFilter"
                            defaultValue={configAlert.AlertMin.AlertFilter? configAlert.AlertMin.AlertFilter : ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="DevFilter"
                            defaultValue={configAlert.AlertMin.DevFilter? configAlert.AlertMin.DevFilter : ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name="Enabled"
                            checked={configAlert.AlertMin.Enabled ? configAlert.AlertMin.Enabled : false}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="SecondsFromStart"
                            defaultValue={configAlert.AlertMin.SecondsFromStart? configAlert.AlertMin.SecondsFromStart : ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="SecondsFromClear"
                            defaultValue={configAlert.AlertMin.SecondsFromClear? configAlert.AlertMin.SecondsFromClear : ""}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <label>Timeout:</label>
                  <table>
                    <thead>
                      <tr>
                        <th>Shift</th>
                        <th>Equipment Type</th>
                        <th>ID</th>
                        <th>Alert Filter</th>
                        <th>Dev Filter</th>
                        <th>Enabled</th>
                        <th>Seconds From Start</th>
                        <th>Seconds From Clear</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            name="Shift"
                            defaultValue={configAlert.AlertMin.Shift? configAlert.AlertMin.Shift: ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="EquipmentType"
                            defaultValue={configAlert.Timeout.EquipmentType? configAlert.Timeout.EquipmentType: ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="ID"
                            defaultValue={configAlert.Timeout.ID? configAlert.Timeout.ID : ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="AlertFilter"
                            defaultValue={configAlert.Timeout.AlertFilter? configAlert.Timeout.AlertFilter : ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="DevFilter"
                            defaultValue={configAlert.Timeout.DevFilter? configAlert.Timeout.DevFilter : ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name="Enabled"
                            checked={configAlert.Timeout.Enabled? configAlert.Timeout.Enabled : false}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="SecondsFromStart"
                            defaultValue={configAlert.Timeout.SecondsFromStart? configAlert.Timeout.SecondsFromStart : ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="SecondsFromClear"
                            defaultValue={configAlert.Timeout.SecondsFromClear? configAlert.Timeout.SecondsFromClear : ""}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <label>Activity Warning:</label>
                  <table>
                    <thead>
                      <tr>
                        <th>Shift</th>
                        <th>Equipment Type</th>
                        <th>ID</th>
                        <th>Alert Filter</th>
                        <th>Dev Filter</th>
                        <th>Enabled</th>
                        <th>Seconds</th>
                        <th>Alert Count</th>
                        <th>Timeout</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            name="Shift"
                            defaultValue={configAlert.AlertMin!= null? configAlert.AlertMin.Shift!=null? configAlert.AlertMin.Shift: "" : ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="EquipmentType"
                            defaultValue={configAlert.Timeout.EquipmentType? configAlert.Timeout.EquipmentType: ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="ID"
                            defaultValue={configAlert.Activity?configAlert.Activity.ID? configAlert.Activity.ID : "":""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="AlertFilter"
                            defaultValue={configAlert.Activity? configAlert.Activity.AlertFilter? configAlert.Activity.AlertFilter : "": ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="DevFilter"
                            defaultValue={configAlert.Activity? configAlert.Activity.DevFilter? configAlert.Activity.DevFilter : "": ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name="Enabled"
                            checked={configAlert.Activity? configAlert.Activity.Enabled? configAlert.Activity.Enabled : false : false}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="Seconds"
                            defaultValue={configAlert.Activity? configAlert.Activity.Seconds? configAlert.Activity.Seconds : "": ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="AlertCount"
                            defaultValue={configAlert.Activity? configAlert.Activity.AlertCount? configAlert.Activity.AlertCount : "": ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="Timeout"
                            defaultValue={configAlert.Activity? configAlert.Activity.Timeout? configAlert.Activity.Timeout : "": ""}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <label>Elevation:</label>
                  {configAlert.Elevation? configAlert.Elevation.map((elevation, elevationIndex) => (
                    <table key={elevationIndex}>
                      <thead>
                        <tr>
                          <th>Shift</th>
                          <th>Equipment Type</th>
                          <th>ID</th>
                          <th>Alert Filter</th>
                          <th>Dev Filter</th>
                          <th>Seconds</th>
                          <th>Color 1</th>
                          <th>Color 2</th>
                          <th>Blinks</th>
                          <th>SortLast</th>
                          <th>Tone</th>
                          <th>Repeats</th>
                          <th>Volume</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              type="text"
                              name="Shift"
                              defaultValue={elevation.Shift? elevation.Shift : ""}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="EquipmentType"
                              defaultValue={configAlert.Timeout.EquipmentType? configAlert.Timeout.EquipmentType: ""}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="ID"
                              defaultValue={elevation.ID? elevation.ID : ""}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="AlertFilter"
                              defaultValue={elevation.AlertFilter}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="DevFilter"
                              defaultValue={elevation.DevFilter}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="Seconds"
                              defaultValue={elevation.Seconds}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="Color1"
                              defaultValue={elevation.Color1}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="Color2"
                              defaultValue={elevation.Color2}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              name="Blinks"
                              checked={elevation.Blinks}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              name="SortLast"
                              checked={elevation.SortLast}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="Tone"
                              defaultValue={elevation.Tone}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              name="Repeats"
                              checked={elevation.Repeats}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="Volume"
                              defaultValue={elevation.Volume}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )): null}
                </div>
              )): null}
            </form>
          </div>
        );
      case 9:
        if (Facility === undefined) {
          return <div></div>;
        }
        return (
          <div>
            <form onSubmit={handleChange}>
              <label>
                Facility ID:
                <input
                  type="text"
                  name="FacilityID"
                  defaultValue={ConfigCMS.FacilityID}
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
                  defaultValue={ConfigCMS.StatusDirection}
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
                  defaultValue={ConfigCMS.DefaultVolume}
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
                  defaultValue={ConfigCMS.RecentAlertPeriod}
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
                  defaultValue={ConfigCMS.ResponseTarget}
                  onChange={handleChange}
                />
              </label>
              <label>
                Custom Port:
                <input
                  type="text"
                  name="CustomPort"
                  defaultValue={ConfigCMS.CustomPort}
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
                  defaultValue={ConfigCMS.VendorMessage}
                  onChange={handleChange}
                />
              </label>
              <label>
                Sync Timeout:
                <input
                  type="number"
                  name="SyncTimeout"
                  defaultValue={ConfigCMS.SyncTimeout}
                  onChange={handleChange}
                />
              </label>
              <label>
                Sync Interval:
                <input
                  type="number"
                  name="SyncInterval"
                  defaultValue={ConfigCMS.SyncInterval}
                  onChange={handleChange}
                />
              </label>
              <label>
                Sync Fail To Offline:
                <input
                  type="number"
                  name="SyncFailToOffline"
                  defaultValue={ConfigCMS.SyncFailToOffline}
                  onChange={handleChange}
                />
              </label>
              <label>
                Full Sync Interval:
                <input
                  type="number"
                  name="FullSyncInterval"
                  defaultValue={ConfigCMS.FullSyncInterval}
                  onChange={handleChange}
                />
              </label>
              <label>
                Check In Period:
                <input
                  type="number"
                  name="CheckInPeriod"
                  defaultValue={ConfigCMS.CheckInPeriod}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        );
      case 10:
        if (Facility === undefined) {
          return <div></div>;
        }
        return (
          <div>
            <form onSubmit={handleChange}>
              <label>
                Facility ID:
                <input
                  type="text"
                  name="FacilityID"
                  defaultValue={ConfigMED.FacilityID}
                  onChange={handleChange}
                />
              </label>
              <label>
                Group IDs:
                <input
                  type="text"
                  name="GroupIDs"
                  defaultValue={ConfigMED.GroupIDs}
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
                  defaultValue={ConfigMED.Brightness}
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
                  defaultValue={ConfigMED.Notification}
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
                  defaultValue={ConfigMED.Volume}
                  onChange={handleChange}
                />
              </label>
              <label>
                Ucode:
                <input
                  type="number"
                  name="Ucode"
                  defaultValue={ConfigMED.Ucode}
                  onChange={handleChange}
                />
              </label>
              <label>
                SUCode:
                <input
                  type="number"
                  name="SUCode"
                  defaultValue={ConfigMED.SUCode}
                  onChange={handleChange}
                />
              </label>
              <label>
                Acode:
                <input
                  type="number"
                  name="Acode"
                  defaultValue={ConfigMED.Acode}
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
