//Page to generate a new prospect, requires just a facility name, product, and product version to create a new prospect

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import "../../PageCSS/customerPage.css";

function NewProspect() {
  const [facilityName, setFacilityName] = useState("");
  const [product, setProduct] = useState("");
  const [productVersion, setProductVersion] = useState("");
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
      const response = await axios.post("http://127.0.0.1:5000/customers", newProspect);
      console.log(response);
      navigate("/Customer/Prospects");
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
            onChange={(e) => setFacilityName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formProduct">
          <Form.Label>Product</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formProductVersion">
          <Form.Label>Product Version</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product Version"
            value={productVersion}
            onChange={(e) => setProductVersion(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}


export default NewProspect;