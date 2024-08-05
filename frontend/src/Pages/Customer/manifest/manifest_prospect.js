import React, { useEffect, useState, useRef } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../../PageCSS/customerPage.css";
import { TRANSMITTER, CMS, MED } from "../../../defaults";
import { BASE_URL } from "../../../defaults";
import "../../../PageCSS/validation.css";

function ManifestProspect() {
    const param = useParams();
    const [updateState, setUpdateState] = useState(false);
    const [customerData, setCustomerData] = useState(null);
    // const [customerData, setCustomerData] = useState({
    //     _id: "",
    //     facilityName: "-1",
    //     state: "",
    //     city: "",
    //     zip: "",
    //     address: "",
    //     phone: "",
    //     facilityID: "",
    //     product: "",
    //     productVersion: -1,
    //     installationDate: "",
    //     stagingDeadline: "",
    //     assemblyDeadline: "",
    //     assemblyDate: "",
    //     QADate: "",
    //     shippingDate: "",
    //     transmitters: 0,
    //     sparesTransmitters: 0,
    //     CMSs: 0,
    //     headlessCMSs: 0,
    //     MEDs: 0,
    //     displays: {},
    //     contacts: [],
    //     notes: [],
    //     website: "",
    //     wifi: [],
    //     facilityMapURL: [],
    //     mapHasCMS: false,
    //     mapLayoutPhoto: [],
    //     powerCables: [],
    //     roomList: [],
    //     transmitterSketch: "",
    //     CMSDisplaySoftwareFile: "",
    //     radioSoftwareFile: "",
    //     radioType: "",
    //     MEDModel: "",
    //     MEDSoftwareVersion: -1,
    //     normallyOpen: false,
    //     nextStep: "",
    //     CMSAssembly: [],
    //     MEDAssembly: [],
    //     transmitterAssembly: [],
    //     qualityAssurance: {
    //         preshipping: [
    //             {
    //                 qa: "",
    //                 status: false,
    //                 date: "",
    //             },
    //         ],
    //         followUp: [
    //             {
    //                 qa: "",
    //                 status: false,
    //                 date: "",
    //             },
    //         ],
    //     },
    //     qualityAssuranceDate: "",
    //     qaApprovedStaffMember: "",
    //     shippingMethod: "",
    //     quantityOfTransmitters: 0,
    //     quantityOfiQMounts: 0,
    //     quantityOfCMSs: 0,
    //     quantityOfHeadlessCMSs: 0,
    //     quantityOfMEDs: 0,
    //     numberOfChargers: 0,
    //     quantityOfDisplays: 0,
    //     mountTypesIncluded: {
    //         wall: 0,
    //         articulating: 0,
    //         floor: 0,
    //     },
    //     cordsIncluded: {},
    //     hardwareIncluded: false,
    //     batteriesIncluded: false,
    //     securityScrewIncluded: false,
    //     documentationIncluded: false,
    //     installGuideIncluded: false,
    //     trackingNumbers: [{ number: "123456" }],
    //     shipDate: "",
    //     contractInfo: {
    //         vent: "",
    //         rent: false,
    //         installationDates: {
    //             start: "",
    //             end: "",
    //         },
    //         warrentyEnd: "",
    //         rentalEnd: "",
    //         endOfFirmco: "",
    //         endOfServiceContract: "",
    //         owner: "",
    //         contractWith: "",
    //         contractSigned: false,
    //     },
    //     status: "",
    // });
    const [page, setPage] = useState(
        window.localStorage.getItem("manifestId") === param.id ? Number(window.localStorage.getItem("page")) :
            1
    );

    useEffect(() => {
        const fetchFacility = async () => {
            try {
                const url = `http://${BASE_URL}/manifest/${param.id}`;
                const response = await axios.get(url);
                // while(customerData.productVersion === -1){
                setCustomerData(response.data);
                //     console.log("waiting");
                // }
                state(response.data);
            } catch (error) {
                console.error(
                    "There was an error fetching the facilities data!",
                    error
                );
            }
        };
        fetchFacility();
    }, [param.id]);

    const state = (data) => {
        console.log(data);
        var newCustomerData = {
            ...data
        };
        var page2 = page;
        if (updateState) {
            setUpdateState(false);
        }
        else {
            setUpdateState(true);
        }
        console.log(customerData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `http://${BASE_URL}/manifest/${param.id}`,
                customerData
            );
        } catch (error) {
            console.error("There was an error creating the ticket!", error);
        }
    };

    const updateDatabase = async () => {
        try {
            await axios.post(
                `http://${BASE_URL}/manifest/${param.id}`,
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

    const handleClick = (pageNumber) => {
        setPage(pageNumber);
        window.localStorage.setItem("page", pageNumber);
        window.localStorage.setItem("manifestId", param.id);
        console.log(customerData);
    };


    const [inputValidity, setInputValidity] = useState({
        phone: true,
        zip: true,
        email: true,
    });

    const validateInput = (name, value) => {
        let isValid = true;
        switch (name) {
            case "phone":
                isValid = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(value);
                break;
            case "zip":
                isValid = /^[0-9]{5}$/.test(value);
                break;
            case "email":
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
            default:
                break;
        }
        setInputValidity((prevValidity) => ({
            ...prevValidity,
            [name]: isValid,
        }));
    };

    const pageGen = () => {
        if (customerData === null) {
            return <div>Loading...</div>;
        }
        // else if (true) {
        //     return (
        //         <div>
        //             <form onSubmit={handleSubmit}>
        //                 <label>Facility Name: {updateState? "test" : "false"} </label>
        //                 <input
        //                     name="facilityName"
        //                     onChange={handleChange}
        //                     className={"inputText" + (customerData.facilityName == "" ? " required" : "")}
        //                     type="text"
        //                     defaultValue={customerData!=null? customerData.facilityName:""}
        //                 ></input>
        //                 <br />
        //                 <label>City: </label>
        //                 <input
        //                     name="city"
        //                     onChange={handleChange}
        //                     className={"inputText" + (customerData.facilityName == "" ? " required" : "")}
        //                     type="text"
        //                     defaultValue={customerData!=null? customerData.city:""}
        //                 ></input>
        //                 <button>Save Changes</button>
        //             </form>
        //         </div>
        //     );
        // }
        switch (page) {
            case 1:
                return (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label>Facility Name: {updateState ? "test" : "false"} </label>
                            <input
                                name="facilityName"
                                onChange={handleChange}
                                className={"inputText" + (customerData.facilityName == "" ? " required" : "")}
                                type="text"
                                defaultValue={customerData != null ? customerData.facilityName : ""}
                            ></input>
                            <br />
                            <label>State: </label>
                            <select
                                name="state"
                                onChange={handleChange}
                                className={"inputText" + (customerData.state == "" ? " required" : "")}
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
                                className={"inputText" + (customerData.city == "" ? " required" : "")}
                                type="text"
                                defaultValue={customerData.city}
                            ></input>
                            <label>Zip: </label>
                            <input
                                name="zip"
                                onChange={handleChange}
                                className={"inputText" + (customerData.zip == "" ? " required" : "")}
                                type="number"
                                defaultValue={customerData.zip}
                            ></input>
                            <label>Address: </label>
                            <input
                                name="address"
                                onChange={handleChange}
                                className={"inputText" + (customerData.address == "" ? " required" : "")}
                                type="text"
                                defaultValue={customerData.address}
                            ></input>
                            <br />
                            <label>Phone: </label>
                            <input
                                name="phone"
                                onChange={handleChange}
                                type="tel"
                                defaultValue={customerData.phone}
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                maxLength={12}
                                className={`inputText ${customerData.phone == "" ? 'required' : ''}`}
                            ></input>
                            <br />
                            <label>Website: </label>
                            <input
                                name="website"
                                onChange={handleChange}
                                className={"inputText" + (customerData.website == "" ? " warning" : "")}
                                type="url"
                                defaultValue={customerData.website}
                            ></input>
                            <br />
                            <label>Product: </label>
                            <select
                                name="product"
                                onChange={handleChange}
                                className={"inputText" + (customerData.product == "" ? " required" : "")}
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
                                        className={"inputText" + (customerData.productVersion == "" ? " required" : "")}
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
                                        className={"inputText" + (customerData.productVersion == "" ? " required" : "")}
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
                                className={"inputText" + (customerData.facilityID == "" ? " warning" : "")}
                                type="text"
                                defaultValue={customerData != null ? customerData.facilityID : ""}
                            ></input>
                            <br />
                            <label>Installation Date: </label>
                            <input
                                name="installationDate"
                                onChange={handleChange}
                                className={"inputText" + (customerData.installationDate == "" ? " warning" : "")}
                                type="datetime-local"
                                step="60"
                                defaultValue={customerData.installationDate}
                            ></input>
                            <br /><br />
                            <div>
                                <div className="inline long">
                                    <label className="inline normal">Transmitters: </label>
                                    <input
                                        name="transmitters"
                                        onChange={handleSpecialChange}
                                        className={"inputText short" + (customerData.transmitters == "" ? " required" : "")}
                                        type="number"
                                        defaultValue={customerData.transmitters}
                                        min={0}
                                        max={1000}
                                    ></input>
                                </div>
                                <label>Spares Transmitters: </label>
                                <input
                                    name="sparesTransmitters"
                                    onChange={handleSpecialChange}
                                    className={"inputText" + (customerData.sparesTransmitters == "" ? " required" : "")}
                                    type="number"
                                    defaultValue={customerData.sparesTransmitters}
                                    min={0}
                                    max={1000}
                                ></input>
                            </div>
                            <div>
                                <div className="inline long">
                                    <label className="inline normal">CMSs: </label>
                                    <input
                                        name="CMSs"
                                        onChange={handleSpecialChange}
                                        className={"inputText short" + (customerData.CMSs == "" ? " required" : "")}
                                        type="number"
                                        defaultValue={customerData.CMSs}
                                        min={0}
                                        max={1000}
                                    ></input>
                                </div>
                                <label>Headless CMSs: </label>
                                <input
                                    name="headlessCMSs"
                                    onChange={handleSpecialChange}
                                    className={"inputText" + (customerData.headlessCMSs == "" ? " required" : "")}
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
                                        className={"inputText short" + (customerData.MEDs == "" ? " required" : "")}
                                        type="number"
                                        defaultValue={customerData.MEDs}
                                    ></input>
                                </div>
                                <label>Number of Brackets: </label>
                                <input
                                    name="mounts"
                                    onChange={handleChange}
                                    className={"inputText" + (customerData.mounts == "" ? " required" : "")}
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
                                        className={"inputText" + (index==0? contact.name == "" ? " required" : "" : "")}
                                        type="text"
                                        value={contact.name}
                                        onChange={handleIncreasableArrayChange}
                                    />
                                    <label>Email: </label>
                                    <input
                                        name="email"
                                        id="contacts"
                                        className={"inputText" + (index==0? contact.name == "" ? " required" : "" : "")}
                                        type="email"
                                        value={contact.email}
                                        onChange={handleIncreasableArrayChange}
                                    />
                                    <label>Phone: </label>
                                    <input
                                        name="phone"
                                        id="contacts"
                                        className={"inputText" + (index==0? contact.name == "" ? " required" : "" : "")}
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
                                className={"inputText" + (customerData.nextStep == "" ? " warning" : "")}
                                type="text"
                                defaultValue={customerData.nextStep}
                            ></input>
                            <br />
                            <br />
                            <button
                                onClick={() => {
                                    var newCustomerData = customerData;
                                    newCustomerData.status = "Assembly";
                                    setCustomerData(newCustomerData);
                                    updateDatabase();
                                }}
                            >
                                Approve Manifest
                            </button>
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
                                                        className={"inputText" + (customerData.facilityName == "" ? " required" : "")}
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
        };
    }
    return (
        <div className="splitSides">
            <div className="sidebar">
                <Sidebar>
                    <Menu>
                        <MenuItem onClick={() => handleClick(1)} id="sideMenuOption1">
                            Facility Info
                        </MenuItem>
                        <MenuItem onClick={() => handleClick(2)} id="sideMenuOption2">
                            Rooms
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
            event.preventDefault(); // Prevent the default behavior of Enter key
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
                    // let columnIndex = Array.prototype.indexOf.call(currentRow.children, activeElement);
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

export default ManifestProspect;
