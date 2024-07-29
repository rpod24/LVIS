//Page to generate a new prospect, requires just a facility name, product, and product version to create a new prospect

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import "../../PageCSS/customerPage.css";
import { BASE_URL } from "../../defaults";

function NewManifest() {
  const [facilityName, setFacilityName] = useState("");
  const [product, setProduct] = useState("REA");
  const [productVersion, setProductVersion] = useState("1.0");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    var newProspect = {
      "facilityName": facilityName,
      "state": "",
      "city": "",
      "zip": "",
      "address": "",
      "phone": "",
      "facilityID": "",
      "product": product,
      "productVersion": productVersion,
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
      "mounts": 0,
      "displays": [
        {
          "display": "TechDisplay",
          "quantity": 0,
          "size": 27
        },
        {
          "display": "TechDisplay",
          "quantity": 0,
          "size": 29
        },
        {
          "display": "TechDisplay",
          "quantity": 0,
          "size": 31
        }
      ],
      "contacts": [
        {
          "name": "",
          "email": "",
          "phone": ""
        }
      ],
      "notes": [],
      "website": "",
      "wifi": [
        {
          "ssid": "",
          "password": ""
        }
      ],
      "facilityMapURL": [
        ""
      ],
      "mapHasCMS": true,
      "mapLayoutPhoto": [
        ""
      ],
      "powerCables": [
      ],
      "roomList": [
        {
          "room": ""
        }
      ],
      "transmitterSketch": "",
      "CMSDisplaySoftwareFile": "",
      "radioSoftwareFile": "",
      "radioType": "",
      "MEDModel": "",
      "MEDSoftwareVersion": 0,
      "normallyOpen": false,
      "nextStep": "None",
      "CMSAssembly": [
      ],
      "MEDAssembly": [
      ],
      "transmitterAssembly": [
      ],
      "qualityAssurance": {
        "preshipping": [
        ],
        "followUp": [
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
        "quantityOfDisplays": {
        },
        "mountTypesIncluded": {
          "wall": 0,
          "articulating": 0,
          "floor": 0
        },
        "cordsIncluded": {
        },
        "hardwareIncluded": false,
        "batteriesIncluded": false,
        "securityScrewIncluded": false,
        "documentationIncluded": false,
        "installGuideIncluded": false
      },
      "trackingNumbers": [
      ],
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
      "status": "Pending"
    };
    event.preventDefault();
    try {
      const response = await axios.post(`http://${BASE_URL}/manifest`, newProspect);
      console.log(response);
      navigate(`/Manifest/${response.data._id}`);
    }
    catch (error) {
      console.error("There was an error creating the prospect!", error);
    }
  }

  return (
    <Container>
      <Form className="new-prospect-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formFacilityName">
          <Form.Label>Facility Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Facility Name"
            value={facilityName}
            required={true}
            onChange={(e) => setFacilityName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formProduct">
          <Form.Label>Product</Form.Label>
          {/* Drop down with options for REA, ScrubTrax */}
          <Form.Control
            as="select"
            value={product}
            required={true}
            onChange={(e) => setProduct(e.target.value)}
          >
            <option value="REA">REA</option>
            <option value="ScrubTrax">ScrubTrax</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formProductVersion">
          <Form.Label>Product Version</Form.Label>
          {/* Dropdown with options for 1.0, 1.5, 2.0 */}
          <Form.Control
            as="select"
            value={productVersion}
            required={true}
            onChange={(e) => setProductVersion(e.target.value)}
          >
            <option value="1.0">1.0</option>
            <option value="1.5">1.5</option>
            <option value="2.0">2.0</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}


export default NewManifest;