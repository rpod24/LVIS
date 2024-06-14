import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../PageCSS/customerPage.css'

function Prospect() {
    const param = useParams();
    const [customerData, setCustomerData] = useState({
        "facilityName": "",
        "state": "",
        "city": "",
        "zip": "",
        "address": "",
        "phone": "",
        "facilityID": "",
        "product": "",
        "productVersion": 0,
        "installationDate": "",
        "stagingDeadline": "",
        "assemblyDeadline": "",
        "assemblyDate": "",
        "QADate": "",
        "shippingDate": "",
        "transmitters": 0,
        "sparesTransmitters": 0,
        "CMSs": 0,
        "headlessCMSs": 0,
        "MEDs": 0,
        "displays": {
        },
        "contacts": [
        ],
        "notes": [
        ],
        "website": "",
        "wifi": [
        ],
        "facilityMapURL": [
        ],
        "mapHasCMS": false,
        "mapLayoutPhoto": [],
        "powerCables": [
        ],
        "roomList": [
        ],
        "transmitterSketch": "",
        "CMSDisplaySoftwareFile": "",
        "radioSoftwareFile": "",
        "radioType": "",
        "MEDModel": "",
        "MEDSoftwareVersion": -1,
        "normallyOpen": false,
        "nextStep": "",
        "CMSAssembly": [
        ],
        "MEDAsssembly": [
        ],
        "transmitterAssembly": [
        ],
        "qualityAssurance": {
            "preshipping": [
                {
                    "qa": "",
                    "status": false,
                    "date": ""
                }
            ],
            "followUp": [
                {
                    "qa": "",
                    "status": false,
                    "date": ""
                }
            ]
        },
        "qualityAssuranceDate": "",
        "qaApprovedStaffMember": "",
        "shippingMethod": "",
        "shippingChecklistItems": {
            "quantityOfTransmitters": 0,
            "quantityOfiQMounts": 0,
            "quantityOfCMSs": 0,
            "quantityOfHeadlessCMSs": 0,
            "quantityOfMEDs": 0,
            "numberOfChargers": 0,
            "quantityOfDisplays": {},
            "mountTypesIncluded": {
                "wall": 0,
                "articulating": 0,
                "floor": 0
            },
            "cordsIncluded": {},
            "hardwareIncluded": false,
            "batteriesIncluded": false,
            "securityScrewIncluded": false,
            "documentationIncluded": false,
            "installGuideIncluded": false
        },
        "trackingNumbers": [],
        "shipDate": "",
        "contractInfo": {
            "vent": "",
            "rent": false,
            "installationDates": {
                "start": "",
                "end": ""
            },
            "warrentyEnd": "",
            "rentalEnd": "",
            "endOfFirmco": "",
            "endOfServiceContract": "",
            "owner": "",
            "contractWith": "",
            "contractSigned": false
        },
        "status": ""
    });
    const [page, setPage] = useState(0);

    useEffect(() => {
        const fetchFacility = async () => {
            try {
                const url = `http://127.0.0.1:5000/customers/${param.id}`;
                console.log(url);
                const response = await axios.get(url);
                setCustomerData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('There was an error fetching the facilities data!', error);
            }
        };
        fetchFacility();
    }, [param.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:5000/customers/${param.id}`, customerData);
            console.log(response);
            console.log(response.data);
        } catch (error) {
            console.error('There was an error creating the ticket!', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCustomerData({
            ...customerData,
            [name]: type === 'checkbox' ? checked : value,
        });
        console.log(customerData);
    };

    const handleClick = (pageNumber) => {
        setPage(pageNumber);
    };

    const pageGen = () => {
        if (customerData === null) {
            return <div>Loading...</div>;
        }
        if (customerData.status === "Pending") {
            switch (page) {
                case 0:
                    return (
                        <div>
                            <form onSubmit={handleSubmit}>
                                <label>Facility Name: </label>
                                <input
                                    name="facilityName" onChange={handleChange} className='inputText' type="text" defaultValue={customerData.facilityName}></input>
                                <label>State: </label>
                                <select name="state" onChange={handleChange} className='inputText' type="text" defaultValue={customerData.state}>
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
                                {/* save change button */}
                                <button>Save Changes</button>
                            </form>
                        </div>
                    );
                case 1:
                    return (
                        <div>
                        </div>
                    );
                case 2:
                    return (
                        <div>
                        </div>
                    );
                case 3:
                    return (
                        <div>
                        </div>
                    );
                case 4:
                    return (
                        <div>
                        </div>
                    );
                default:
                    return (
                        <div>
                            <h1>Facility Info</h1>
                        </div>
                    );
            }
        }
    };

    return (
        <div className='splitSides'>
            <div className='sidebar'>
                <Sidebar>
                    <Menu>
                        <MenuItem onClick={() => handleClick(0)}> Facility Info </MenuItem>
                        <MenuItem onClick={() => handleClick(1)}> Equipment </MenuItem>
                        <MenuItem onClick={() => handleClick(2)}> Quality Assurance </MenuItem>
                        <MenuItem onClick={() => handleClick(3)}> Shipping </MenuItem>
                        <MenuItem onClick={() => handleClick(4)}> Installation </MenuItem>
                    </Menu>
                </Sidebar>
            </div>
            <div className='fullPage'>
                {/* <div className='center'>
                    <h1>Facility</h1>
                </div> */}
                {pageGen()}
            </div>
        </div>
    );
}

export default Prospect;
