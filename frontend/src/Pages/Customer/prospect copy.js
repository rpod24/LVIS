import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../PageCSS/customerPage.css'
import { BASE_URL } from "../../defaults";

function Prospect() {
    const param = useParams();
    const [customerData, setCustomerData] = useState(null);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const fetchFacility = async () => {
            try {
                const url = `http://${BASE_URL}/customers/${param.id}`;
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
                            <h1>Facility Info</h1>
                            <p>Facility Name: {customerData.facilityName}</p>
                            <p>Address: {customerData.address}</p>
                            <p>City: {customerData.city}</p>
                            <p>State: {customerData.state}</p>
                            <p>Zip Code: {customerData.zip}</p>
                            <p>Phone: {customerData.phone}</p>
                            <p>Facility ID: {customerData.facilityID}</p>
                            <p>Product: {customerData.product}</p>
                            <p>Product Version: {customerData.productVersion}</p>
                            <p>Installation Date: {customerData.installationDate}</p>
                            <p>Staging Deadline: {customerData.stagingDeadline}</p>
                            <p>Assembly Deadline: {customerData.assemblyDeadline}</p>
                            <p>Assembly Date: {customerData.assemblyDate}</p>
                            <p>QA Date: {customerData.QADate}</p>
                            <p>Shipping Date: {customerData.shippingDate}</p>
                            {/* <p>Transmitters: <input>{customerData.transmitters}</input></p> */}
                            {/* create a field where there is a label transmitters and an editable field to input text with a default of customerData.transmitters */}
                            
                        </div>
                    );
                case 1:
                    return (
                        <div>
                            <h1>Equipment</h1>
                            <p>Equipment Type: {customerData.equipment_type}</p>
                            <p>Equipment Quantity: {customerData.equipment_quantity}</p>
                            <p>Equipment Description: {customerData.equipment_description}</p>
                        </div>
                    );
                case 2:
                    return (
                        <div>
                            <h1>Quality Assurance</h1>
                            <p>QA Contact: {customerData.qa_contact}</p>
                            <p>QA Phone: {customerData.qa_phone}</p>
                            <p>QA Email: {customerData.qa_email}</p>
                        </div>
                    );
                case 3:
                    return (
                        <div>
                            <h1>Shipping</h1>
                            <p>Shipping Contact: {customerData.shipping_contact}</p>
                            <p>Shipping Phone: {customerData.shipping_phone}</p>
                            <p>Shipping Email: {customerData.shipping_email}</p>
                        </div>
                    );
                case 4:
                    return (
                        <div>
                            <h1>Installation</h1>
                            <p>Installation Contact: {customerData.installation_contact}</p>
                            <p>Installation Phone: {customerData.installation_phone}</p>
                            <p>Installation Email: {customerData.installation_email}</p>
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


// {
//     "_id": {
//       "$oid": "666c9fc4b0b7a600a7d908da"
//     },
//     "facilityName": "Full Facility",
//     "state": "CA",
//     "city": "San Marcos",
//     "zip": "92078",
//     "address": "1234 Example St.",
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
//       "31": 1
//     },
//     "contacts": [
//       {
//         "name": "John Doe",
//         "phone": "123-456-7890",
//         "email": "email@example.com",
//         "iqReport": true
//       }
//     ],
//     "notes": [],
//     "website": "https://example.com",
//     "wifi": [
//       {
//         "ssid": "SSID",
//         "password": "password"
//       }
//     ],
//     "facilityMapURL": [
//       "https://example.com/facility-map"
//     ],
//     "mapHasCMS": true,
//     "mapLayoutPhoto": [
//       "https://example.com/map-layout-photo"
//     ],
//     "powerCables": [
//       {
//         "length": 6,
//         "quantity": 3
//       }
//     ],
//     "roomList": [
//       "101 - A",
//       "101 - B"
//     ],
//     "transmitterSketch": "https://example.com/transmitter-sketch",
//     "CMSDisplaySoftwareFile": "https://example.com/cms-display-software-file",
//     "radioSoftwareFile": "https://example.com/radio-software-file",
//     "radioType": "Single",
//     "MEDModel": "TechMED",
//     "MEDSoftwareVersion": 1,
//     "normallyOpen": false,
//     "nextStep": "N/A",
//     "CMSAssembly": [
//       {
//         "CMSID": "A",
//         "assembled": true,
//         "configured": true,
//         "wifiMacAddress": "00:00:00:00:00:00",
//         "ethernetMacAddress": "00:00:00:00:00:00",
//         "assetID": "00000001",
//         "frequency": "123.456",
//         "qualityAssured": true,
//         "QA": [
//           {
//             "QA": "Quality Assurance 1",
//             "date": "2024-05-22T21:43:50.874Z",
//             "verified": true
//           }
//         ]
//       }
//     ],
//     "MEDAsssembly": [
//       {
//         "MEDID": "AA",
//         "configured": true,
//         "assetID": "00001",
//         "completionDue": "2024-05-22T21:43:50.874Z",
//         "qualityAssured": true,
//         "QA": [
//           {
//             "QA": "Quality Assurance 1",
//             "date": "2024-05-22T21:43:50.874Z",
//             "verified": true
//           }
//         ]
//       }
//     ],
//     "transmitterAssembly": [
//       {
//         "serialNumber": "14010000001",
//         "room": "101 - A",
//         "assetTag": "00000001",
//         "bracket": "140100000001",
//         "configured": true,
//         "labeled": true,
//         "tested": true,
//         "qualityAssured": true,
//         "QA": [
//           {
//             "QA": "QA1",
//             "date": "2024-05-22T21:43:50.874Z",
//             "verified": true
//           }
//         ]
//       },
//       {
//         "serialNumber": "14010000002",
//         "room": "101 - B",
//         "assetTag": "00000002",
//         "bracket": "140100000002",
//         "configured": true,
//         "labeled": true,
//         "tested": true,
//         "qualityAssured": true,
//         "QA": [
//           {
//             "QA": "QA1",
//             "date": "2024-05-22T21:43:50.874Z",
//             "verified": true
//           }
//         ]
//       }
//     ],
//     "qualityAssurance": {
//       "preshipping": [
//         {
//           "qa": "QA1",
//           "status": true,
//           "date": "2024-05-22T21:43:50.874Z"
//         }
//       ],
//       "followUp": [
//         {
//           "qa": "QA1",
//           "status": true,
//           "date": "2024-05-22T21:43:50.874Z"
//         }
//       ]
//     },
//     "qualityAssuranceDate": "2024-05-22T21:43:50.874Z",
//     "qaApprovedStaffMember": "John Doe",
//     "shippingMethod": "mail",
//     "shippingChecklistItems": {
//       "quantityOfTransmitters": 2,
//       "quantityOfiQMounts": 2,
//       "quantityOfCMSs": 1,
//       "quantityOfHeadlessCMSs": 0,
//       "quantityOfMEDs": 0,
//       "numberOfChargers": 0,
//       "quantityOfDisplays": {
//         "31": 1
//       },
//       "mountTypesIncluded": {
//         "wall": 0,
//         "articulating": 1,
//         "floor": 0
//       },
//       "cordsIncluded": {
//         "6": 3
//       },
//       "hardwareIncluded": true,
//       "batteriesIncluded": true,
//       "securityScrewIncluded": true,
//       "documentationIncluded": true,
//       "installGuideIncluded": true
//     },
//     "trackingNumbers": [
//       "123456"
//     ],
//     "shipDate": "2024-05-22T21:43:50.874Z",
//     "contractInfo": {
//       "vent": "Ventalator Brand",
//       "rent": false,
//       "installationDates": {
//         "start": "2024-05-22T21:43:50.874Z",
//         "end": ""
//       },
//       "warrentyEnd": "2025-05-22T21:43:50.874Z",
//       "rentalEnd": "",
//       "endOfFirmco": "",
//       "endOfServiceContract": "",
//       "owner": "Owner Name",
//       "contractWith": "TechBrand",
//       "contractSigned": false
//     },
//     "status": "Pending"
//   }