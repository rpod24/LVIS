import React, { useEffect, useState, useRef } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../../PageCSS/customerPage.css";
import { TRANSMITTER, CMS, MED } from "../../../defaults";
import { BASE_URL } from "../../../defaults";

function ManifestActive() {
  const param = useParams();
  const inputRef = useRef([]);
  const inputRef2 = useRef([]);
  const inputRef3 = useRef([]);
  const inputRef4 = useRef([]);
  const navigate = useNavigate();

  const [isShiftDown, setIsShiftDown] = useState(false);
  const [customerData, setCustomerData] = useState({
    facilityName: "",
    state: "",
    city: "",
    zip: "",
    address: "",
    phone: "",
    facilityID: "",
    product: "",
    productVersion: 0,
    installationDate: "",
    stagingDeadline: "",
    assemblyDeadline: "",
    assemblyDate: "",
    QADate: "",
    shippingDate: "",
    transmitters: 0,
    sparesTransmitters: 0,
    CMSs: 0,
    headlessCMSs: 0,
    MEDs: 0,
    displays: {},
    contacts: [],
    notes: [],
    website: "",
    wifi: [],
    facilityMapURL: [],
    mapHasCMS: false,
    mapLayoutPhoto: [],
    powerCables: [],
    roomList: [],
    transmitterSketch: "",
    CMSDisplaySoftwareFile: "",
    radioSoftwareFile: "",
    radioType: "",
    MEDModel: "",
    MEDSoftwareVersion: -1,
    normallyOpen: false,
    nextStep: "",
    CMSAssembly: [],
    MEDAssembly: [],
    transmitterAssembly: [],
    qualityAssurance: {
      preshipping: [
        {
          qa: "",
          status: false,
          date: "",
        },
      ],
      followUp: [
        {
          qa: "",
          status: false,
          date: "",
        },
      ],
    },
    qualityAssuranceDate: "",
    qaApprovedStaffMember: "",
    shippingMethod: "",
    quantityOfTransmitters: 0,
    quantityOfiQMounts: 0,
    quantityOfCMSs: 0,
    quantityOfHeadlessCMSs: 0,
    quantityOfMEDs: 0,
    numberOfChargers: 0,
    quantityOfDisplays: 0,
    mountTypesIncluded: {
      wall: 0,
      articulating: 0,
      floor: 0,
    },
    cordsIncluded: {},
    hardwareIncluded: false,
    batteriesIncluded: false,
    securityScrewIncluded: false,
    documentationIncluded: false,
    installGuideIncluded: false,
    trackingNumbers: [{ number: "" }],
    shipDate: "",
    contractInfo: {
      vent: "",
      rent: false,
      installationDates: {
        start: "",
        end: "",
      },
      warrentyEnd: "",
      rentalEnd: "",
      endOfFirmco: "",
      endOfServiceContract: "",
      owner: "",
      contractWith: "",
      contractSigned: false,
    },
    status: "",
  });
  const [page, setPage] = useState(
    window.localStorage.getItem("manifestId") === param.id ? Number(window.localStorage.getItem("page")) :
      1
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const url = `http://${BASE_URL}/manifest/${param.id}`;
        const response = await axios.get(url);
        setCustomerData(response.data);
      } catch (error) {
        console.error(
          "There was an error fetching the facilities data!",
          error
        );
      }
    };
    fetchFacility();
    const handleKeyDown = (event) => {
      if (event.key === 'Shift') {
        setIsShiftDown(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'Shift') {
        setIsShiftDown(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [param.id]);

  const handleSpecialChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerData({
      ...customerData,
      [name]: type === "checkbox" ? checked : Number(value),
    });
    console.log(value);
    console.log(customerData);
    var newEl = null;
    var arr = null;
    var val = null;
    switch (name) {
      case "transmitters":
        newEl = TRANSMITTER;
        arr = customerData.transmitterAssembly;
        val = Number(value) + Number(customerData.sparesTransmitters);
        break;
      case "sparesTransmitters":
        newEl = TRANSMITTER;
        arr = customerData.transmitterAssembly;
        val = Number(value) + Number(customerData.transmitters);
        break;
      case "CMSs":
        newEl = CMS;
        arr = customerData.CMSAssembly;
        val = Number(value) + Number(customerData.headlessCMSs);
        break;
      case "headlessCMSs":
        newEl = CMS;
        arr = customerData.CMSAssembly;
        val = Number(value) + Number(customerData.CMSs);
        break;
      case "MEDs":
        newEl = MED;
        arr = customerData.MEDAssembly;
        val = Number(value);
        break;
      default:
        return;
    }
    if (val > arr.length) {
      for (var i = arr.length; i <= val; i++) {
        arr.push(newEl);
      }
    } else if (val < arr.length) {
      for (var j = arr.length; j > val; j--) {
        arr.pop();
      }
    }
  };


  const handleMouseEnter = (index) => {
    if (isShiftDown) {
      inputRef.current[index].checked = !inputRef.current[index].checked;
      handleArrayChange({ "target": inputRef.current[index] });
    }
  };
  const handleMouseEnter2 = (index) => {
    if (isShiftDown) {
      inputRef2.current[index].checked = !inputRef2.current[index].checked;
      handleArrayChange({ "target": inputRef2.current[index] });
    }
  };
  const handleMouseEnter3 = (index) => {
    if (isShiftDown) {
      inputRef3.current[index].checked = !inputRef3.current[index].checked;
      handleArrayChange({ "target": inputRef3.current[index] });
    }
  };
  const handleMouseEnter4 = (index) => {
    if (isShiftDown) {
      inputRef4.current[index].checked = !inputRef4.current[index].checked;
      handleArrayChange({ "target": inputRef4.current[index] });
    }
  };

  const autoAssignRooms = () => {
    var roomList = customerData.roomList;

    for (var i = 0; i < customerData.transmitterAssembly.length; i++) {
      if (roomList.length > i) {
        customerData.transmitterAssembly[i].room = roomList[i].room;
        console.log(roomList[i].room);
        console.log(customerData.transmitterAssembly[i]);
      }
    }
    setCustomerData({
      ...customerData,
      roomList: roomList,
    });
  };

  const autoGenerateMedIDs = () => {
    var medID = "AA";
    var data = customerData.MEDAssembly;
    for (var i = 0; i < data.length; i++) {
      data[i].MEDID = medID;
      if (medID[1] === "Z") {
        medID = String.fromCharCode(medID.charCodeAt(0) + 1) + "A";
      } else {
        medID = medID[0] + String.fromCharCode(medID.charCodeAt(1) + 1);
      }
    }
    setCustomerData({
      ...customerData,
      MEDAssembly: data,
    });
  };

  const handleClick = (pageNumber) => {
    setPage(pageNumber);
    window.localStorage.setItem("page", pageNumber);
    window.localStorage.setItem("manifestId", param.id);
    console.log(customerData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerData({
      ...customerData,
      [name]: type === "checkbox" ? checked : value,
    });
    console.log(customerData);
  };

  const handleIncreasableUpdatableArrayChange = (e) => {
    const { name, value, type, checked, id } = e.target;
    const arrid = e.target.parentElement.id;
    let tempArr = [...customerData[id]];
    e.target.defaultValue = value;
    const preEdit = tempArr[arrid][name];
    tempArr[arrid][name] = type === "checkbox" ? checked : value;
    if (
      Number(arrid) === Number(tempArr.length - 1) &&
      !allFieldsEmpty(tempArr[arrid])
    ) {
      tempArr.push(generateEmptyJSON(tempArr[arrid]));
    } else if (
      allFieldsEmpty(tempArr[arrid]) &&
      Number(arrid) !== Number(tempArr.length - 1)
    ) {
      tempArr.splice(arrid, 1);
    }
    if (id === "roomList") {
      for (var i = 0; i < customerData.transmitterAssembly.length; i++) {
        if (customerData.transmitterAssembly[i].room === preEdit) {
          customerData.transmitterAssembly[i].room = tempArr[arrid].room;
        }
      }
    }
    setCustomerData({
      ...customerData,
      [id]: tempArr,
    });
    console.log(customerData);
  };

  const handleIncreasableArrayChange = (e) => {
    const { name, value, type, checked, id } = e.target;
    const arrid = e.target.parentElement.id;
    let tempArr = [...customerData[id]];
    e.target.defaultValue = value;
    tempArr[arrid][name] = type === "checkbox" ? checked : value;
    if (
      Number(arrid) === Number(tempArr.length - 1) &&
      !allFieldsEmpty(tempArr[arrid])
    ) {
      tempArr.push(generateEmptyJSON(tempArr[arrid]));
    } else if (
      allFieldsEmpty(tempArr[arrid]) &&
      Number(arrid) !== Number(tempArr.length - 1)
    ) {
      tempArr.splice(arrid, 1);
    }
    setCustomerData({
      ...customerData,
      [id]: tempArr,
    });
    console.log(customerData);
  };

  const handleArrayChange = (e) => {
    const { name, value, type, checked, id } = e.target;
    const arrid = e.target.parentElement.id;
    let tempArr = customerData[id];
    console.log(tempArr);
    console.log(arrid);
    console.log(tempArr[arrid]);
    console.log(name);
    console.log(tempArr[arrid][name]);
    tempArr[arrid][name] = type === "checkbox" ? checked : value;
    setCustomerData({
      ...customerData,
      [id]: tempArr,
    });
    console.log(customerData);
  };

  const allFieldsEmpty = (arr) => {
    var s = true;
    Object.keys(arr).forEach((element) => {
      if (arr[element] !== "") {
        s = false;
        return;
      }
    });
    return s;
  };

  const generateEmptyJSON = (arr) => {
    let temp = {};
    Object.keys(arr).forEach((element) => {
      temp[element] = "";
    });
    return temp;
  };

  const handleSubmit = async (e) => {
    setIsEditing(false);
    e.preventDefault();
    try {
      await axios.post(
        `http://${BASE_URL}/manifest/${param.id}`,
        customerData
      );
    } catch (error) {
      console.error("There was an error updating the manifest!", error);
    }
  };

  const updateManifest = async () => {
    try {
      await axios.post(
        `http://${BASE_URL}/manifest/${param.id}`,
        customerData
      );
    } catch (error) {
      console.error("There was an error updating the manifest!", error);
    }
  };

  const pageGen = () => {
    console.log(customerData);
    if (customerData === null) {
      return <div>Loading...</div>;
    }

    if (isEditing) {
      switch (page) {
        case 1:
          return (
            <div>
              <form onSubmit={handleSubmit}>
                <label>Facility Name: </label>
                <input
                  name="facilityName"
                  onChange={handleChange}
                  className="inputText"
                  type="text"
                  defaultValue={customerData.facilityName}
                ></input>
                <br />
                <label>State: </label>
                <select
                  name="state"
                  onChange={handleChange}
                  className="inputText"
                  type="text"
                  defaultValue={customerData.state}
                >
                  <option value="AL">Select One</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
                <label>City: </label>
                <input
                  name="city"
                  onChange={handleChange}
                  className="inputText"
                  type="text"
                  defaultValue={customerData.city}
                ></input>
                <label>Zip: </label>
                <input
                  name="zip"
                  onChange={handleChange}
                  className="inputText"
                  type="number"
                  defaultValue={customerData.zip}
                ></input>
                <label>Address: </label>
                <input
                  name="address"
                  onChange={handleChange}
                  className="inputText"
                  type="text"
                  defaultValue={customerData.address}
                ></input>
                <br />
                <label>Phone: </label>
                <input
                  name="phone"
                  onChange={handleChange}
                  className="inputText"
                  type="tel"
                  defaultValue={customerData.phone}
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  maxLength={12}
                ></input>
                <br />
                <label>Website: </label>
                <input
                  name="website"
                  onChange={handleChange}
                  className="inputText"
                  type="url"
                  defaultValue={customerData.website}
                ></input>
                <br />
                <label>Product: </label>
                <select
                  name="product"
                  onChange={handleChange}
                  className="inputText"
                  type="text"
                  defaultValue={customerData.product}
                >
                  <option value="REA">REA</option>
                  <option value="ScrubTrax">ScrubTrax</option>
                </select>
                {customerData.product === "REA" ? (
                  <div>
                    <label>Product Version: </label>
                    <select
                      name="productVersion"
                      onChange={handleChange}
                      className="inputText"
                      type="number"
                      defaultValue={customerData.productVersion}
                    >
                      <option value={1.0}>1.0</option>
                      <option value={1.5}>1.5</option>
                      <option value={2.0}>2.0</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label>Product Version: </label>
                    <select
                      name="productVersion"
                      onChange={handleChange}
                      className="inputText"
                      type="number"
                      defaultValue={customerData.productVersion}
                    >
                      <option value={0}>0.0</option>
                      <option value={1}>1.0</option>
                      <option value={2}>Other</option>
                    </select>
                  </div>
                )}
                <label>Facility ID: </label>
                <input
                  name="facilityID"
                  onChange={handleChange}
                  className="inputText"
                  type="text"
                  defaultValue={customerData.facilityID}
                ></input>
                <br />
                <br />
                <label>Installation Date: </label>
                <input
                  name="installationDate"
                  onChange={handleChange}
                  className="inputText"
                  type="datetime-local"
                  step="60"
                  defaultValue={customerData.installationDate}
                ></input>
                <label>Staging Deadline: </label>
                <input
                  name="stagingDeadline"
                  onChange={handleChange}
                  className="inputText"
                  type="datetime-local"
                  step="60"
                  defaultValue={customerData.stagingDeadline}
                ></input>
                <br />
                <label>Assembly Deadline: </label>
                <input
                  name="assemblyDeadline"
                  onChange={handleChange}
                  className="inputText"
                  type="datetime-local"
                  step="60"
                  defaultValue={customerData.assemblyDeadline}
                ></input>
                <label>Assembly Date: </label>
                <input
                  name="assemblyDate"
                  onChange={handleChange}
                  className="inputText"
                  type="datetime-local"
                  step="60"
                  defaultValue={customerData.assemblyDate}
                ></input>
                <br />
                <label>QA Date: </label>
                <input
                  name="QADate"
                  onChange={handleChange}
                  className="inputText"
                  type="datetime-local"
                  step="60"
                  defaultValue={customerData.QADate}
                ></input>
                <label>Shipping Date: </label>
                <input
                  name="shippingDate"
                  onChange={handleChange}
                  className="inputText"
                  type="datetime-local"
                  step="60"
                  defaultValue={customerData.shippingDate}
                ></input>
                <br />
                <br />
                <div>
                  <div className="inline long">
                    <label className="inline normal">Transmitters: </label>
                    <input
                      name="transmitters"
                      onChange={handleSpecialChange}
                      className="inputText short"
                      type="number"
                      defaultValue={customerData.transmitters}
                    ></input>
                  </div>
                  <label>Spares Transmitters: </label>
                  <input
                    name="sparesTransmitters"
                    onChange={handleSpecialChange}
                    className="inputText"
                    type="number"
                    defaultValue={customerData.sparesTransmitters}
                  ></input>
                </div>
                <div>
                  <div className="inline long">
                    <label className="inline normal">CMSs: </label>
                    <input
                      name="CMSs"
                      onChange={handleSpecialChange}
                      className="inputText short"
                      type="number"
                      defaultValue={customerData.CMSs}
                    ></input>
                  </div>
                  <label>Headless CMSs: </label>
                  <input
                    name="headlessCMSs"
                    onChange={handleSpecialChange}
                    className="inputText"
                    type="number"
                    defaultValue={customerData.headlessCMSs}
                  ></input>
                </div>
                <div>
                  <div className="inline long">
                    <label className="inline normal">MEDs: </label>
                    <input
                      name="MEDs"
                      onChange={handleSpecialChange}
                      className="inputText short"
                      type="number"
                      defaultValue={customerData.MEDs}
                    ></input>
                  </div>
                  <label>Number of Brackets: </label>
                  <input
                    name="mounts"
                    onChange={handleChange}
                    className="inputText"
                    type="number"
                    defaultValue={customerData.mounts}
                  ></input>
                </div>
                <br />
                <label>Contacts: </label>
                {customerData.contacts.map((contact, index) => (
                  <div key={`${index}-contact.name`} id={index}>
                    <label>Name: </label>
                    <input
                      name="name"
                      id="contacts"
                      className="inputText"
                      type="text"
                      value={contact.name}
                      onChange={handleIncreasableArrayChange}
                    />
                    <label>Email: </label>
                    <input
                      name="email"
                      id="contacts"
                      className="inputText"
                      type="email"
                      value={contact.email}
                      onChange={handleIncreasableArrayChange}
                    />
                    <label>Phone: </label>
                    <input
                      name="phone"
                      id="contacts"
                      className="inputText"
                      type="tel"
                      value={contact.phone}
                      pattern="([0-9]{3}-[0-9]{3}-[0-9]{4})( ext [0-9]{0,8})?"
                      maxLength={12}
                      onChange={handleIncreasableArrayChange}
                    />
                  </div>
                ))}
                <br />
                <label>Next Step: </label>
                <input
                  name="nextStep"
                  onChange={handleChange}
                  className="inputText"
                  type="text"
                  defaultValue={customerData.nextStep}
                ></input>
                <br />
                <br />
                <button>Save Changes</button>
              </form>
            </div>
          );

        case 2:
          return (
            <div>
              <h1>Rooms</h1>
              <form onSubmit={handleSubmit}>
                <table>
                  <thead>
                    <th>Room List</th>
                    <th>Room Number</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <label>Room List: </label>
                      </td>
                      <td>
                        {customerData.roomList.map((room, index2) => (
                          <div
                            key={`${index2}-roomList`}
                            name={`${index2}-roomList`}
                            id={index2}
                          >
                            <input
                              name="room"
                              id="roomList"
                              className="inputText"
                              type="text"
                              value={room.room}
                              onChange={handleIncreasableUpdatableArrayChange}
                            />
                          </div>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button>Save Changes</button>
              </form>
            </div>
          );

        case 3:
          return (
            <div>
              <h1>Equipment</h1>
              <form onSubmit={handleSubmit}>
                <table>
                  <thead>
                    <th>Equipment</th>
                    <th>Power Cable</th>
                    <th>Monitor</th>
                    <th>Monitor Power Cable</th>
                    <th>Monitor SN</th>
                    <th>Monitor Mount</th>
                    <th>HW Version</th>
                    <th>HDMI Length</th>
                    <th>Sliced Power Supply</th>
                    <th>Radio Software</th>
                    <th>Assembled</th>
                    <th>Configured</th>
                    <th>Wifi MAC Address 0</th>
                    <th>Wifi MAC Address 1</th>
                    <th>Ethernet MAC Address</th>
                    <th>Asset ID</th>
                    <th>Frequency</th>
                    <th>Quality Assured</th>
                    <th>QA Initals</th>
                  </thead>
                  <tbody>
                    {customerData.CMSAssembly.map((CMS, index) => (
                      <tr
                        key={`${index}-CMSAssembly`}
                        name={`${index}-CMSAssembly`}
                        id={index}
                      >
                        <td>
                          <label>CMS: </label>
                        </td>
                        <td id={index}>
                          <input
                            name="powerCable"
                            id="CMSAssembly"
                            className="inputText"
                            type="text"
                            value={CMS.powerCable}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="monitor"
                            id="CMSAssembly"
                            className="inputText"
                            type="text"
                            value={CMS.monitor}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="monitorPowerCable"
                            id="CMSAssembly"
                            className="inputText"
                            type="text"
                            value={CMS.monitorPowerCable}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="monitorSN"
                            id="CMSAssembly"
                            className="inputText"
                            type="text"
                            value={CMS.monitorSN}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="monitorMount"
                            id="CMSAssembly"
                            className="inputText"
                            type="text"
                            value={CMS.monitorMount}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="HWVersion"
                            id="CMSAssembly"
                            className="inputText"
                            type="text"
                            value={CMS.HWVersion}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="HDMIlength"
                            id="CMSAssembly"
                            className="inputText"
                            type="text"
                            value={CMS.HDMIlength}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="slicedPowerSupply"
                            id="CMSAssembly"
                            className="inputText"
                            type="text"
                            value={CMS.slicedPowerSupply}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="radioSoftware"
                            id="CMSAssembly"
                            className="inputText"
                            type="text"
                            value={CMS.radioSoftware}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="assembled"
                            id="CMSAssembly"
                            className="inputText"
                            type="checkbox"
                            checked={CMS.assembled}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="configured"
                            id="CMSAssembly"
                            className="inputText"
                            type="checkbox"
                            checked={CMS.configured}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="wifiMacAddress"
                            id="CMSAssembly"
                            className="inputText"
                            type="text"
                            value={CMS.wifiMacAddress}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="wifiMacAddress"
                            id="CMSAssembly"
                            className="inputText"
                            type="text"
                            value={CMS.wifiMacAddress}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="ethernetMacAddress"
                            id="CMSAssembly"
                            className="inputText"
                            type="text"
                            value={CMS.ethernetMacAddress}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="assetID"
                            id="CMSAssembly"
                            className="inputText"
                            type="text"
                            value={CMS.assetID}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="frequency"
                            id="CMSAssembly"
                            className="inputText"
                            type="text"
                            value={CMS.frequency}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="qualityAssured"
                            id="CMSAssembly"
                            className="inputText"
                            type="checkbox"
                            checked={CMS.qualityAssured}
                            onChange={handleArrayChange}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <table>
                  <thead>
                    <th>Transmitters</th>
                    <th>Serial Number</th>
                    <th>
                      Room
                      <button onClick={autoAssignRooms}>Auto Assign</button>
                    </th>
                    <th>Asset Tag</th>
                    <th>Bracket</th>
                    <th>Configured</th>
                    <th>Labeled</th>
                    <th>Tested</th>
                    <th>Quality Assured</th>
                  </thead>
                  <tbody>
                    {customerData.transmitterAssembly.map(
                      (transmitter, index) => (
                        <tr
                          key={`${index}-transmitterAssembly`}
                          name={`${index}-transmitterAssembly`}
                          id={index}
                        >
                          <td>
                            <label>Transmitters: </label>
                          </td>
                          <td id={index}>
                            <input
                              name="serialNumber"
                              id="transmitterAssembly"
                              className="inputText"
                              type="text"
                              value={transmitter.serialNumber}
                              onChange={handleArrayChange}
                            />
                          </td>
                          <td id={index}>
                            <label>Room: </label>
                            <select
                              name="room"
                              onChange={handleArrayChange}
                              className="inputText"
                              value={transmitter.room}
                              id="transmitterAssembly"
                            >
                              {customerData.roomList.map((room, index1) => (
                                <option
                                  key={`${index}-room-${index1}-${room.room}`}
                                  className="inputText"
                                  value={room.room}
                                >
                                  {room.room}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td id={index}>
                            <input
                              name="assetTag"
                              id="transmitterAssembly"
                              className="inputText"
                              type="text"
                              value={transmitter.assetTag}
                              onChange={handleArrayChange}
                            />
                          </td>
                          <td id={index}>
                            <input
                              name="bracket"
                              id="transmitterAssembly"
                              className="inputText"
                              type="text"
                              value={transmitter.bracket}
                              onChange={handleArrayChange}
                            />
                          </td>
                          <td id={index}>
                            <input
                              name="configured"
                              id="transmitterAssembly"
                              className="inputText"
                              type="checkbox"
                              checked={transmitter.configured}
                              onChange={handleArrayChange}
                              ref={(el) => (inputRef.current[index] = el)}
                              onMouseEnter={() => handleMouseEnter(index)}
                            />
                          </td>
                          <td id={index}>
                            <input
                              name="labeled"
                              id="transmitterAssembly"
                              className="inputText"
                              type="checkbox"
                              checked={transmitter.labeled}
                              onChange={handleArrayChange}
                              ref={(el) => (inputRef2.current[index] = el)}
                              onMouseEnter={() => handleMouseEnter2(index)}
                            />
                          </td>
                          <td id={index}>
                            <input
                              name="tested"
                              id="transmitterAssembly"
                              className="inputText"
                              type="checkbox"
                              checked={transmitter.tested}
                              onChange={handleArrayChange}
                              ref={(el) => (inputRef3.current[index] = el)}
                              onMouseEnter={() => handleMouseEnter3(index)}
                            />
                          </td>
                          <td id={index}>
                            <input
                              name="qualityAssured"
                              id="transmitterAssembly"
                              className="inputText"
                              type="checkbox"
                              checked={transmitter.qualityAssured}
                              onChange={handleArrayChange}
                              ref={(el) => (inputRef4.current[index] = el)}
                              onMouseEnter={() => handleMouseEnter4(index)}
                            />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>

                <table>
                  <thead>
                    <th>
                      MEDs
                      <button onClick={autoGenerateMedIDs}>Generate IDs</button>
                    </th>
                    <th>MED ID</th>
                    <th>Configured</th>
                    <th>Asset ID</th>
                    <th>Model</th>
                    <th>OS Version</th>
                    <th>App Version</th>
                    <th>Group ID</th>
                    <th></th>
                    <th>Completion Due</th>
                    <th>QA</th>
                    <th>QA By</th>
                  </thead>
                  <tbody>
                    {customerData.MEDAssembly.map((MED, index) => (
                      <tr
                        key={`${index}-MEDAssembly`}
                        name={`${index}-MEDAssembly`}
                        id={index}
                      >
                        <td id={index}>
                          <label>MEDs: </label>
                        </td>
                        <td id={index}>
                          MED-
                          <input
                            name="MEDID"
                            id="MEDAssembly"
                            className="inputText"
                            type="text"
                            value={MED.MEDID}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="configured"
                            id="MEDAssembly"
                            className="inputText"
                            type="checkbox"
                            key={index}
                            checked={MED.configured}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="assetID"
                            id="MEDAssembly"
                            className="inputText"
                            type="text"
                            key={index}
                            value={MED.assetID}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="completionDue"
                            id="MEDAssembly"
                            className="inputText"
                            type="datetime-local"
                            key={index}
                            value={MED.completionDue}
                            onChange={handleArrayChange}
                          />
                        </td>
                        <td id={index}>
                          <input
                            name="qualityAssured"
                            id="MEDAssembly"
                            className="inputText"
                            type="checkbox"
                            key={index}
                            checked={MED.qualityAssured}
                            onChange={handleArrayChange}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <label>Wifi: </label>
                {customerData.wifi.map((wifi, index) => (
                  <div key={`${index}-wifi`} id={index}>
                    <label>SSID: </label>
                    <input
                      name="ssid"
                      id="wifi"
                      className="inputText"
                      type="text"
                      value={wifi.ssid}
                      onChange={handleIncreasableArrayChange}
                    />
                    <label>Password: </label>
                    <input
                      name="password"
                      id="wifi"
                      className="inputText"
                      type="text"
                      value={wifi.password}
                      onChange={handleIncreasableArrayChange}
                    />
                  </div>
                ))}
                <label>Transmitter Sketch: </label>
                <input
                  name="transmitterSketch"
                  onChange={handleChange}
                  className="inputText"
                  type="text"
                  defaultValue={customerData.transmitterSketch}
                ></input>
                <label>CMS Display Software File: </label>
                <input
                  name="CMSDisplaySoftwareFile"
                  onChange={handleChange}
                  className="inputText"
                  type="text"
                  defaultValue={customerData.CMSDisplaySoftwareFile}
                ></input>
                <label>Radio Software File: </label>
                <input
                  name="radioSoftwareFile"
                  onChange={handleChange}
                  className="inputText"
                  type="text"
                  defaultValue={customerData.radioSoftwareFile}
                ></input>
                <label>Radio Type: </label>
                <input
                  name="radioType"
                  onChange={handleChange}
                  className="inputText"
                  type="text"
                  defaultValue={customerData.radioType}
                ></input>
                <label>MED Model: </label>
                <input
                  name="MEDModel"
                  onChange={handleChange}
                  className="inputText"
                  type="text"
                  defaultValue={customerData.MEDModel}
                ></input>
                <label>MED Software Version: </label>
                <input
                  name="MEDSoftwareVersion"
                  onChange={handleChange}
                  className="inputText"
                  type="number"
                  defaultValue={customerData.MEDSoftwareVersion}
                ></input>
                <label>Normally Open: </label>
                <input
                  name="normallyOpen"
                  onChange={handleChange}
                  className="inputText"
                  type="checkbox"
                  checked={customerData.normallyOpen}
                ></input>
                <br></br>
                <label>Display Sketch: </label>
                <br></br>
                <button>Save Changes</button>
              </form>
            </div>
          );
        case 4:
          return (
            <div>
              <form onSubmit={handleSubmit}>
                <div></div>
                <h1>Shipping</h1>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label>Shipping Method: </label>
                      </td>
                      <td>
                        <input
                          name="shippingMethod"
                          onChange={handleChange}
                          className="inputText"
                          type="text"
                          defaultValue={customerData.shippingMethod}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Shipping Date: </label>
                      </td>
                      <td>
                        <input
                          name="shipDate"
                          onChange={handleChange}
                          className="inputText"
                          type="datetime-local"
                          step="60"
                          defaultValue={customerData.shipDate}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Tracking Numbers: </label>
                      </td>
                      <td>
                        {customerData.trackingNumbers.map((number, index) => (
                          <div key={`${index}-trackingNumbers`} id={index}>
                            <input
                              name={index}
                              id="trackingNumbers"
                              className="inputText"
                              type="text"
                              value={number}
                              onChange={handleIncreasableArrayChange}
                            />
                          </div>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <label>Shipping Checklist: </label>
                <label>Quantity of Transmitters: </label>
                <input
                  name="quantityOfTransmitters"
                  onChange={handleChange}
                  className="inputText"
                  type="number"
                  defaultValue={customerData.quantityOfTransmitters}
                ></input>
                <label>Quantity of iQ Mounts: </label>
                <input
                  name="quantityOfiQMounts"
                  onChange={handleChange}
                  className="inputText"
                  type="number"
                  defaultValue={customerData.quantityOfiQMounts}
                ></input>
                <label>Quantity of CMSs: </label>
                <input
                  name="quantityOfCMSs"
                  onChange={handleChange}
                  className="inputText"
                  type="number"
                  defaultValue={customerData.quantityOfCMSs}
                ></input>
                <label>Quantity of Headless CMSs: </label>
                <input
                  name="quantityOfHeadlessCMSs"
                  onChange={handleChange}
                  className="inputText"
                  type="number"
                  defaultValue={customerData.quantityOfHeadlessCMSs}
                ></input>
                <label>Quantity of MEDs: </label>
                <input
                  name="quantityOfMEDs"
                  onChange={handleChange}
                  className="inputText"
                  type="number"
                  defaultValue={customerData.quantityOfMEDs}
                ></input>
                <label>Number of Chargers: </label>
                <input
                  name="numberOfChargers"
                  onChange={handleChange}
                  className="inputText"
                  type="number"
                  defaultValue={customerData.numberOfChargers}
                ></input>
                <label>Quantity of Displays: </label>
                <input
                  name="quantityOfDisplays"
                  onChange={handleChange}
                  className="inputText"
                  type="number"
                  defaultValue={customerData.quantityOfDisplays}
                ></input>
                <label>Quantity of Articulating Mounts</label>
                <input
                  name="articulating"
                  onChange={handleChange}
                  className="inputText"
                  type="number"
                  defaultValue={customerData.articulating}
                ></input>
                <label>Quantity of Wall Mounts</label>
                <input
                  name="wall"
                  onChange={handleChange}
                  className="inputText"
                  type="number"
                  defaultValue={customerData.wall}
                ></input>
                <label>Quantity of Floor Mounts</label>
                <input
                  name="floor"
                  onChange={handleChange}
                  className="inputText"
                  type="number"
                  defaultValue={customerData.floor}
                ></input>
                <label>Hardware Included</label>
                <input
                  name="hardwareIncluded"
                  onChange={handleChange}
                  className="inputText"
                  type="checkbox"
                  checked={customerData.hardwareIncluded}
                ></input>
                <label>Batteries Included</label>
                <input
                  name="batteriesIncluded"
                  onChange={handleChange}
                  className="inputText"
                  type="checkbox"
                  checked={customerData.batteriesIncluded}
                ></input>
                <label>Security Screw Included</label>
                <input
                  name="securityScrewIncluded"
                  onChange={handleChange}
                  className="inputText"
                  type="checkbox"
                  checked={customerData.securityScrewIncluded}
                ></input>
                <label>Instructions Included</label>
                <input
                  name="documentationIncluded"
                  onChange={handleChange}
                  className="inputText"
                  type="checkbox"
                  checked={customerData.documentationIncluded}
                ></input>
                <label>Installation Guide Included</label>
                <input
                  name="installGuideIncluded"
                  onChange={handleChange}
                  className="inputText"
                  type="checkbox"
                  checked={customerData.installGuideIncluded}
                ></input>
                <br />
                <button>Save Changes</button>
              </form>
            </div>
          );
        case 5:
          //Installations
          return (
            <div>
              <label>Install Info:</label>
              <button
                onClick={() => {
                  var newCustomerData = customerData;
                  newCustomerData.status = "Former";
                  setCustomerData(newCustomerData);
                  updateManifest();
                }}
              >
                Deactivate Customer
              </button>
              <form onSubmit={handleSubmit}>
                <button>Save Changes</button>
              </form>
            </div>
          );
        default:
          console.log(page);
          return (
            <div>
              <h1>Facility Info...</h1>
            </div>
          );
      }
    }







    else {
      switch (page) {
        case 1:
          return (
            <div>
              <form>
                <label>Facility Name: </label>
                <p>{customerData.facilityName}</p>
                <label>State: </label>
                <p>{customerData.state}</p>
                <label>City: </label>
                <p>{customerData.city}</p>
                <label>Zip: </label>
                <p>{customerData.zip}</p>
                <label>Address: </label>
                <p>{customerData.address}</p>
                <br />
                <label>Phone: </label>
                <input
                  name="phone"
                  onChange={handleChange}
                  className="inputText"
                  type="tel"
                  defaultValue={customerData.phone}
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  maxLength={12}
                  readonly
                ></input>
                <br />
                <label>Website: </label>
                <input
                  name="website"
                  onChange={handleChange}
                  className="inputText"
                  type="url"
                  defaultValue={customerData.website}
                  readonly
                ></input>
                <br />
                <label>Product: </label>
                <p
                >{customerData.product}</p>
                <p>
                {customerData.productVersion}
                </p>
                <br />
                <label>Installation Date: </label>
                <input
                  name="installationDate"
                  onChange={handleChange}
                  className="inputText"
                  type="datetime-local"
                  step="60"
                  defaultValue={customerData.installationDate}
                  readOnly
                ></input>
                <label>Staging Deadline: </label>
                <input
                  name="stagingDeadline"
                  onChange={handleChange}
                  className="inputText"
                  type="datetime-local"
                  step="60"
                  defaultValue={customerData.stagingDeadline}
                  readOnly
                ></input>
                <br />
                <label>Assembly Deadline: </label>
                <input
                  name="assemblyDeadline"
                  onChange={handleChange}
                  className="inputText"
                  type="datetime-local"
                  step="60"
                  defaultValue={customerData.assemblyDeadline}
                  readOnly
                ></input>
                <label>Assembly Date: </label>
                <input
                  name="assemblyDate"
                  onChange={handleChange}
                  className="inputText"
                  type="datetime-local"
                  step="60"
                  defaultValue={customerData.assemblyDate}
                  readOnly
                ></input>
                <br />
                <label>QA Date: </label>
                <input
                  name="QADate"
                  onChange={handleChange}
                  className="inputText"
                  type="datetime-local"
                  step="60"
                  defaultValue={customerData.QADate}
                  readOnly
                ></input>
                <label>Shipping Date: </label>
                <input
                  name="shippingDate"
                  onChange={handleChange}
                  className="inputText"
                  type="datetime-local"
                  step="60"
                  defaultValue={customerData.shippingDate}
                  readOnly
                ></input>
                <br />
                <br />
                <div>
                  <div className="inline long">
                    <label className="inline normal">Transmitters: </label>
                    <p>{customerData.transmitters}</p>
                  </div>
                  <label>Spares Transmitters: </label>
                  <p>{customerData.sparesTransmitters}</p>
                </div>
                <div>
                  <div className="inline long">
                    <label className="inline normal">CMSs: </label>
                    <p>{customerData.CMSs}</p>
                  </div>
                  <label>Headless CMSs: </label>
                  <p>{customerData.headlessCMSs}</p>
                </div>
                <div>
                  <div className="inline long">
                    <label className="inline normal">MEDs: </label>
                    <p>{customerData.MEDs}</p>
                  </div>
                  <label>Number of Brackets: </label>
                  <p>{customerData.mounts}</p>
                </div>
                <br />
                <label>Contacts: </label>
                {customerData.contacts.map((contact, index) => (
                  contact.name+contact.email+contact.phone!=""?<div key={`${index}-contact.name`} id={index}>
                    <label>Name: </label>
                    <p>{contact.name}</p>
                    <label>Email: </label>
                    <p>{contact.email}</p>
                    <label>Phone: </label>
                    <p>{contact.phone}</p>
                  </div>:
                  null
                ))}
                <br />
                <label>TODO: </label>
                <input
                  name="nextStep"
                  onChange={handleChange}
                  className="inputText"
                  type="text"
                  defaultValue={customerData.nextStep}
                ></input>
                <br />
                <br />
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={() => navigate("/Configuration/"+customerData.facilityID)}>Go To Configuration</button>
              </form>
            </div>
          );

        case 2:
          return (
            <div>
              <h1>Rooms</h1>
              <form>
                <table>
                  <thead>
                    <th>Room List</th>
                    <th>Room Number</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <label>Room List: </label>
                      </td>
                      <td>
                        {customerData.roomList.map((room, index2) => (
                          <div
                            key={`${index2}-roomList`}
                            name={`${index2}-roomList`}
                            id={index2}
                          >
                            <p>{room.room}</p>
                          </div>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button onClick={() => setIsEditing(true)}>Edit</button>
              </form>
            </div>
          );

        case 3:
          return (
            <div>
              <h1>Equipment</h1>
              <form>
                <table>
                  <thead>
                    <th>Equipment</th>
                    <th>Power Cable</th>
                    <th>Monitor</th>
                    <th>Monitor Power Cable</th>
                    <th>Monitor SN</th>
                    <th>Monitor Mount</th>
                    <th>HW Version</th>
                    <th>HDMI Length</th>
                    <th>Sliced Power Supply</th>
                    <th>Radio Software</th>
                    <th>Assembled</th>
                    <th>Configured</th>
                    <th>Wifi MAC Address 0</th>
                    <th>Wifi MAC Address 1</th>
                    <th>Ethernet MAC Address</th>
                    <th>Asset ID</th>
                    <th>Frequency</th>
                    <th>Quality Assured</th>
                    <th>QA Initals</th>
                  </thead>
                  <tbody>
                    {customerData.CMSAssembly.map((CMS, index) => (
                      <tr
                        key={`${index}-CMSAssembly`}
                        name={`${index}-CMSAssembly`}
                        id={index}
                      >
                        <td>
                          <label>CMS: </label>
                        </td>
                        <td id={index}>
                        <p>{CMS.powerCable}</p>
                        </td>
                        <td id={index}>
                          <p>{CMS.monitor}</p>
                        </td>
                        <td id={index}>
                          <p>{CMS.monitorPowerCable}</p>
                        </td>
                        <td id={index}>
                          <p>{CMS.monitorSN}</p>
                        </td>
                        <td id={index}>
                          <p>{CMS.monitorMount}</p>
                        </td>
                        <td id={index}>
                          <p>{CMS.HWVersion}</p>
                        </td>
                        <td id={index}>
                          <p>{CMS.HDMIlength}</p>
                        </td>
                        <td id={index}>
                          <p>{CMS.slicedPowerSupply}</p>
                        </td>
                        <td id={index}>
                          <p>{CMS.radioSoftware}</p>
                        </td>
                        <td id={index}>
                          <p>{CMS.assembled}</p>
                        </td>
                        <td id={index}>
                          <p>{CMS.configured}</p>
                        </td>
                        <td id={index}>
                          <p>{CMS.wifiMacAddress}</p>
                        </td>
                        <td id={index}>
                          <p>{CMS.wifiMacAddress}</p>
                        </td>
                        <td id={index}>
                          <p>{CMS.ethernetMacAddress}</p>
                        </td>
                        <td id={index}>
                          <p>{CMS.assetID}</p>
                        </td>
                        <td id={index}>
                          <p>{CMS.frequency}</p>
                        </td>
                        <td id={index}>
                          <p>{CMS.qualityAssured}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <table>
                  <thead>
                    <th>Transmitters</th>
                    <th>Serial Number</th>
                    <th>
                      Room
                    </th>
                    <th>Asset Tag</th>
                    <th>Bracket</th>
                    <th>Configured</th>
                    <th>Labeled</th>
                    <th>Tested</th>
                    <th>Quality Assured</th>
                  </thead>
                  <tbody>
                    {customerData.transmitterAssembly.map(
                      (transmitter, index) => (
                        <tr
                          key={`${index}-transmitterAssembly`}
                          name={`${index}-transmitterAssembly`}
                          id={index}
                        >
                          <td>
                            <label>Transmitters: </label>
                          </td>
                          <td id={index}>
                            <p>{transmitter.serialNumber}</p>
                          </td>
                          <td id={index}>
                            <label>Room: </label>
                            <p>{transmitter.room}</p>
                          </td>
                          <td id={index}>
                            <p>{transmitter.assetTag}</p>
                          </td>
                          <td id={index}>
                            <p>{transmitter.bracket}</p>
                          </td>
                          <td id={index}>
                            <p>{transmitter.configured}</p>
                          </td>
                          <td id={index}>
                            <p>{transmitter.labeled}</p>
                          </td>
                          <td id={index}>
                            <p>{transmitter.tested}</p>
                          </td>
                          <td id={index}>
                            <p>{transmitter.qualityAssured}</p>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>

                <table>
                  <thead>
                    <th>
                      MEDs
                      <button onClick={autoGenerateMedIDs}>Generate IDs</button>
                    </th>
                    <th>MED ID</th>
                    <th>Configured</th>
                    <th>Asset ID</th>
                    <th>Model</th>
                    <th>OS Version</th>
                    <th>App Version</th>
                    <th>Group ID</th>
                    <th></th>
                    <th>Completion Due</th>
                    <th>QA</th>
                    <th>QA By</th>
                  </thead>
                  <tbody>
                    {customerData.MEDAssembly.map((MED, index) => (
                      <tr
                        key={`${index}-MEDAssembly`}
                        name={`${index}-MEDAssembly`}
                        id={index}
                      >
                        <td id={index}>
                          <label>MEDs: </label>
                        </td>
                        <td id={index}>
                          MED-
                          <p>{MED.MEDID}</p>
                        </td>
                        <td id={index}>
                          <p>{MED.configured}</p>
                        </td>
                        <td id={index}>
                          <p>{MED.assetID}</p>
                        </td>
                        <td id={index}>
                          <p>{MED.completionDue}</p>
                        </td>
                        <td id={index}>
                          <p>{MED.qualityAssured}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <label>Wifi: </label>
                {customerData.wifi.map((wifi, index) => (
                  <div key={`${index}-wifi`} id={index}>
                    <label>SSID: </label>
                    <p>{wifi.ssid}</p>
                    <label>Password: </label>
                    <p>{wifi.password}</p>
                  </div>
                ))}
                <label>Transmitter Sketch: </label>
                <p>{customerData.transmitterSketch}</p>
                <label>CMS Display Software File: </label>
                <p>{customerData.CMSDisplaySoftwareFile}</p>
                <label>Radio Software File: </label>
                <p>{customerData.radioSoftwareFile}</p>
                <label>Radio Type: </label>
                <p>{customerData.radioType}</p>
                <label>MED Model: </label>
                <p>{customerData.MEDModel}</p>
                <label>MED Software Version: </label>
                <p>{customerData.MEDSoftwareVersion}</p>
                <label>Normally Open: </label>
                <p>{customerData.normallyOpen}</p>
                <br></br>
                <label>Display Sketch: </label>
                <br></br>
                <button onClick={() => setIsEditing(true)}>Edit</button>
              </form>
            </div>
          );
        case 4:
          return (
            <div>
              <form>
                <div></div>
                <h1>Shipping</h1>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label>Shipping Method: </label>
                      </td>
                      <td>
                        <p>{customerData.shippingMethod}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Shipping Date: </label>
                      </td>
                      <td>
                        <p>{customerData.shipDate}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Tracking Numbers: </label>
                      </td>
                      <td>
                        {customerData.trackingNumbers.map((number, index) => (
                          <div key={`${index}-trackingNumbers`} id={index}>
                            <p>{number}</p>
                          </div>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <label>Shipping Checklist: </label>
                <label>Quantity of Transmitters: </label>
                <p>{customerData.quantityOfTransmitters}</p>
                <label>Quantity of iQ Mounts: </label>
                <p>{customerData.quantityOfiQMounts}</p>
                <label>Quantity of CMSs: </label>
                <p>{customerData.quantityOfCMSs}</p>
                <label>Quantity of Headless CMSs: </label>
                <p>{customerData.quantityOfHeadlessCMSs}</p>
                <label>Quantity of MEDs: </label>
                <p>{customerData.quantityOfMEDs}</p>
                <label>Number of Chargers: </label>
                <p>{customerData.numberOfChargers}</p>
                <label>Quantity of Displays: </label>
                <p>{customerData.quantityOfDisplays}</p>
                <label>Quantity of Articulating Mounts</label>
                <p>{customerData.articulating}</p>
                <label>Quantity of Wall Mounts</label>
                <p>{customerData.wall}</p>
                <label>Quantity of Floor Mounts</label>
                <p>{customerData.floor}</p>
                <label>Hardware Included</label>
                <p>{customerData.hardwareIncluded}</p>
                <label>Batteries Included</label>
                <p>{customerData.batteriesIncluded}</p>
                <label>Security Screw Included</label>
                <p>{customerData.securityScrewIncluded}</p>
                <label>Instructions Included</label>
                <p>{customerData.documentationIncluded}</p>
                <label>Installation Guide Included</label>
                <p>{customerData.installGuideIncluded}</p>
                <br />
                <button onClick={() => setIsEditing(true)}>Edit</button>
              </form>
            </div>
          );
        case 5:
          //Installations
          return (
            <div>
              <label>Install Info:</label>
              <button
                onClick={() => {
                  var newCustomerData = customerData;
                  newCustomerData.status = "Former";
                  setCustomerData(newCustomerData);
                  updateManifest();
                }}
              >
                Deactivate Customer
              </button>
              <form>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              </form>
            </div>
          );
        default:
          console.log(page);
          return (
            <div>
              <h1>Facility Info...</h1>
            </div>
          );
      }
    }
  };

  return (
    <div className="splitSides">
      <div className="sidebar">
        <Sidebar>

          <Menu>
            <MenuItem onClick={() => handleClick(1)} id="sideMenuOption1" className={page === 1 ? 'selected-menu-item' : 'menu-item'}>
              Facility Info
            </MenuItem>
            <MenuItem onClick={() => handleClick(2)} id="sideMenuOption2" className={page === 2 ? 'selected-menu-item' : 'menu-item'}>
              Rooms
            </MenuItem>
            <MenuItem onClick={() => handleClick(3)} id="sideMenuOption3" className={page === 3 ? 'selected-menu-item' : 'menu-item'}>
              Equipment
            </MenuItem>
            <MenuItem onClick={() => handleClick(4)} id="sideMenuOption4" className={page === 4 ? 'selected-menu-item' : 'menu-item'}>
              Shipping
            </MenuItem>
            <MenuItem onClick={() => handleClick(5)} id="sideMenuOption5" className={page === 5 ? 'selected-menu-item' : 'menu-item'}>
              Installation
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <div className="fullPage">
        {pageGen()}
      </div>
    </div>
  );
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    try {
      console.log("Enter");
      event.preventDefault(); 
      console.log("Enter");
      let activeElement = document.activeElement;
      console.log(activeElement.tagName);
      if (
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "SELECT") &&
        activeElement.parentElement.tagName === "TD"
      ) {
        console.log("Enter key pressed");

        let currentRow = activeElement.parentElement.parentElement;
        var index = Array.prototype.indexOf.call(
          currentRow.children,
          activeElement.parentElement
        );
        let columnIndex = Array.prototype.indexOf.call(
          activeElement.parentElement.children,
          activeElement
        );
        let nextRow =
          currentRow.nextElementSibling.children[index].children[columnIndex];
        console.log(currentRow);
        console.log(nextRow);
        if (nextRow) {
          nextRow.focus();
        }
      } else if (
        activeElement.tagName === "INPUT" &&
        activeElement.parentElement.tagName === "DIV"
      ) {
        let currentRow = activeElement.parentElement;
        let nextRow = currentRow.nextElementSibling;
        if (nextRow) {
          let columnIndex = Array.prototype.indexOf.call(
            currentRow.children,
            activeElement
          );
          nextRow.children[columnIndex].focus();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
});

export default ManifestActive;
