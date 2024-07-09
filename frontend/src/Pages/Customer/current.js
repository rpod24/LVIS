import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../PageCSS/customerPage.css";
import { TRANSMITTER, CMS, MED, BASE_URL } from "../../defaults";

function Current() {
  const param = useParams();
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
    MEDAsssembly: [],
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
    shippingChecklistItems: {
      quantityOfTransmitters: 0,
      quantityOfiQMounts: 0,
      quantityOfCMSs: 0,
      quantityOfHeadlessCMSs: 0,
      quantityOfMEDs: 0,
      numberOfChargers: 0,
      quantityOfDisplays: {},
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
    },
    trackingNumbers: [
      {"number": "123456"}],
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
    Number(window.localStorage.getItem("page")) || 0
  );

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const url = `http://${BASE_URL}/customers/${param.id}`;
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
  }, [param.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://${BASE_URL}/customers/${param.id}`,
        customerData
      );
    } catch (error) {
      console.error("There was an error creating the ticket!", error);
    }
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerData({
      ...customerData,
      [name]: type === "checkbox" ? checked : value,
    });
    console.log(customerData);
  };

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
      default:
        return;
      case "transmitters":
        newEl = TRANSMITTER;
        arr = customerData.transmitterAssembly;
        val = Number(value)+Number(customerData.sparesTransmitters);
        break;
      case "sparesTransmitters":
        newEl = TRANSMITTER;
        arr = customerData.transmitterAssembly;
        val = Number(value)+Number(customerData.transmitters);
        break;
      case "CMSs":
        newEl = CMS;
        arr = customerData.CMSAssembly;
        val = Number(value)+Number(customerData.headlessCMSs);
        break;
      case "headlessCMSs":
        newEl = CMS;
        arr = customerData.CMSAssembly;
        val = Number(value)+Number(customerData.CMSs);
        break;
      case "MEDs":
        newEl = MED;
        arr = customerData.MEDAsssembly;
        val = Number(value);
        break;
    }
    console.log(arr);
    console.log(val);
    console.log(arr.length);
    console.log(newEl);
    console.log(value);
    if (val > arr.length) {
      for (
        var i = arr.length;
        i <= val;
        i++
      ) {
        arr.push(newEl);
      }
    }
    else if (val < arr.length) {
      for (
        var i = arr.length;
        i > val;
        i--
      ) {
        arr.pop();
      }
    }
  };

  const handleIncreasableUpdatableArrayChange = (e) => {
    const { name, value, type, checked, id } = e.target;
    var { defaultValue } = e.target;
    const arrid = e.target.parentElement.id;
    let tempArr = [...customerData[id]];
    defaultValue = value;
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
    if (id == "roomList") {
      for (var i = 0; i < customerData.transmitterAssembly.length; i++) {
        if (customerData.transmitterAssembly[i].room == preEdit) {
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
    var { defaultValue } = e.target;
    const arrid = e.target.parentElement.id;
    let tempArr = [...customerData[id]];
    defaultValue = value;
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
    tempArr[arrid][name] = type === "checkbox" ? checked : value;
    setCustomerData({
      ...customerData,
      [id]: tempArr,
    });
    console.log(customerData);
  };

  const handleClick = (pageNumber) => {
    setPage(pageNumber);
    window.localStorage.setItem("page", pageNumber);
    console.log(customerData);
  };

  const pageGen = () => {
    console.log()
    console.log(customerData.status)
    if (customerData === null) {
      return <div>Loading...</div>;
    }
    if (customerData.status == "Active") {
      switch (page) {
        case 0:
          return <div>Loading...</div>;
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
                  <label>Number of Mounts: </label>
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
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      maxLength={12}
                      onChange={handleIncreasableArrayChange}
                    />
                  </div>
                ))}
                <button>Save Changes</button>
              </form>
            </div>
          );
        case 2:
          return (
            <div>
              <h1>Rooms</h1>
              <form onSubmit={handleSubmit}>
                <label>Room List: </label>
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
                <button>Save Changes</button>
              </form>
            </div>
          );
        case 3:
          return (
            <div>
              <h1>Equipment</h1>
              <form onSubmit={handleSubmit}>
                <label>CMS: </label>
                {customerData.CMSAssembly.map((CMS, index) => (
                  <div
                    key={`${index}-CMSAssembly`}
                    name={`${index}-CMSAssembly`}
                    id={index}
                  >
                    <input
                      name="CMSID"
                      id="CMSAssembly"
                      className="inputText"
                      key={`${index}-CMSID`}
                      type="text"
                      value={CMS.CMSID}
                      onChange={handleArrayChange}
                    />
                    <input
                      name="assembled"
                      id="CMSAssembly"
                      className="inputText"
                      key={`${index}-assembled`}
                      type="checkbox"
                      checked={CMS.assembled}
                      onChange={handleArrayChange}
                    />
                    <input
                      name="configured"
                      id="CMSAssembly"
                      className="inputText"
                      key={`${index}-configured`}
                      type="checkbox"
                      checked={CMS.configured}
                      onChange={handleArrayChange}
                    />
                    <input
                      name="wifiMacAddress"
                      id="CMSAssembly"
                      className="inputText"
                      key={`${index}-wifiMacAddress`}
                      type="text"
                      value={CMS.wifiMacAddress}
                      onChange={handleArrayChange}
                    />
                    <input
                      name="ethernetMacAddress"
                      id="CMSAssembly"
                      className="inputText"
                      key={`${index}-ethernetMacAddress`}
                      type="text"
                      value={CMS.ethernetMacAddress}
                      onChange={handleArrayChange}
                    />
                    <input
                      name="assetID"
                      id="CMSAssembly"
                      className="inputText"
                      key={`${index}-assetID`}
                      type="text"
                      value={CMS.assetID}
                      onChange={handleArrayChange}
                    />
                    <input
                      name="frequency"
                      id="CMSAssembly"
                      className="inputText"
                      key={`${index}-frequency`}
                      type="text"
                      value={CMS.frequency}
                      onChange={handleArrayChange}
                    />
                    <input
                      name="qualityAssured"
                      id="CMSAssembly"
                      className="inputText"
                      key={`${index}-qualityAssured`}
                      type="checkbox"
                      checked={CMS.qualityAssured}
                      onChange={handleArrayChange}
                    />
                  </div>
                ))}
                <br />
                <label>Transmitters: </label>
                {customerData.transmitterAssembly.map((transmitter, index) => (
                  <div
                    key={`${index}-transmitterAssembly`}
                    name={`${index}-transmitterAssembly`}
                    id={index}
                  >
                    <input
                      name="serialNumber"
                      id="transmitterAssembly"
                      className="inputText"
                      key={`${index}-serialNumber`}
                      about={`${index}-serialNumber`}
                      type="text"
                      value={transmitter.serialNumber}
                      onChange={handleArrayChange}
                    />
                    {/* <input
                      name="room"
                      id="transmitterAssembly"
                      className="inputText"
                      key={`${index}-room`}
                      type="text"
                      value={transmitter.room}
                      onChange={handleArrayChange}
                    /> */}
                    {/* dropdown below */}
                    <label>Room: </label>
                    <select
                      name="room"
                      onChange={handleArrayChange}
                      className="inputText"
                      type="text"
                      value={transmitter.room}
                      key={`${index}-room`}
                      about={`${index}-room`}
                      id="transmitterAssembly"
                    >
                      {/* <option value="Select Room">Select Room</option> */}
                      {customerData.roomList.map((room, index1) => (
                        <option
                          name="room"
                          id="transmitterAssembly"
                          key={`${index}-room-${index1}-${room.room}`}
                          className="inputText"
                          type="text"
                          value={room.room}
                        >
                          {room.room}
                        </option>
                      ))}
                    </select>
                    <input
                      name="assetTag"
                      id="transmitterAssembly"
                      className="inputText"
                      key={`${index}-assetTag`}
                      type="text"
                      value={transmitter.assetTag}
                      onChange={handleArrayChange}
                    />
                    <input
                      name="bracket"
                      id="transmitterAssembly"
                      className="inputText"
                      key={`${index}-bracket`}
                      type="text"
                      value={transmitter.bracket}
                      onChange={handleArrayChange}
                    />
                    <input
                      name="configured"
                      id="transmitterAssembly"
                      className="inputText"
                      key={`${index}-configured`}
                      type="checkbox"
                      checked={transmitter.configured}
                      onChange={handleArrayChange}
                    />
                    <input
                      name="labeled"
                      id="transmitterAssembly"
                      className="inputText"
                      key={`${index}-labeled`}
                      type="checkbox"
                      checked={transmitter.labeled}
                      onChange={handleArrayChange}
                    />
                    <input
                      name="tested"
                      id="transmitterAssembly"
                      className="inputText"
                      key={`${index}-tested`}
                      type="checkbox"
                      checked={transmitter.tested}
                      onChange={handleArrayChange}
                    />
                    <input
                      name="qualityAssured"
                      id="transmitterAssembly"
                      className="inputText"
                      key={`${index}-qualityAssured`}
                      type="checkbox"
                      checked={transmitter.qualityAssured}
                      onChange={handleArrayChange}
                    />
                  </div>
                ))}
                <br />
                <label>MEDs: </label>
                {customerData.MEDAsssembly.map((MED, index) => (
                  <div
                    key={`${index}-MEDAssembly`}
                    name={`${index}-MEDAssembly`}
                    id={index}
                  >
                    <input
                      name="MEDID"
                      id="MEDAssembly"
                      className="inputText"
                      key={`${index}-MEDID`}
                      type="text"
                      value={MED.MEDID}
                      onChange={handleArrayChange}
                    />
                    <input
                      name="configured"
                      id="MEDAssembly"
                      className="inputText"
                      key={`${index}-configured`}
                      type="checkbox"
                      checked={MED.configured}
                      onChange={handleArrayChange}
                    />
                    <input
                      name="assetID"
                      id="MEDAssembly"
                      className="inputText"
                      key={`${index}-assetID`}
                      type="text"
                      value={MED.assetID}
                      onChange={handleArrayChange}
                    />
                    <input
                      name="completionDue"
                      id="MEDAssembly"
                      className="inputText"
                      key={`${index}-completionDue`}
                      type="datetime-local"
                      value={MED.completionDue}
                      onChange={handleArrayChange}
                    />
                    <input
                      name="qualityAssured"
                      id="MEDAssembly"
                      className="inputText"
                      key={`${index}-qualityAssured`}
                      type="checkbox"
                      checked={MED.qualityAssured}
                      onChange={handleArrayChange}
                    />
                  </div>
                ))}
                <button>Save Changes</button>
              </form>
            </div>
          );
        case 4:
          return <div>4</div>;
        case 5:
          return <div>
            <form onSubmit={handleSubmit}>
              <label>Shipping Method: </label>
              <input
                name="shippingMethod"
                onChange={handleChange}
                className="inputText"
                type="text"
                defaultValue={customerData.shippingMethod}
              ></input>
              <br />
              <label>Shipping Date: </label>
              <input
                name="shipDate"
                onChange={handleChange}
                className="inputText"
                type="datetime-local"
                step="60"
                defaultValue={customerData.shipDate}
              ></input>
              <br />
              <label>Tracking Numbers: </label>
              {customerData.trackingNumbers.map((number, index) => (
                <div key={`${index}-trackingNumbers`} id={index}>
                  <input
                    name="number"
                    id="trackingNumbers"
                    className="inputText"
                    type="text"
                    value={number.number}
                    onChange={handleIncreasableArrayChange}
                  />
                </div>
              ))}
              <button>Save Changes</button>
            </form>
          </div>;
        case 6:
          return <div>6</div>;
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
            <MenuItem onClick={() => handleClick(1)}> Facility Info </MenuItem>
            <MenuItem onClick={() => handleClick(2)}> Rooms </MenuItem>
            <MenuItem onClick={() => handleClick(3)}> Equipment </MenuItem>
            {/* <MenuItem onClick={() => handleClick(4)}>Quality Assurance</MenuItem> */}
            <MenuItem onClick={() => handleClick(5)}> Shipping </MenuItem>
            <MenuItem onClick={() => handleClick(6)}> Installation </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <div className="fullPage">
        {/* <div className='center'>
                    <h1>Facility</h1>
                </div> */}
        {pageGen()}
      </div>
    </div>
  );
}

export default Current;
