import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';
// import { BsSearch } from 'react-icons/bs';

import './navbarStyle.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function TopNav() {
  const location = useLocation();
  const [showCustomerInfo, setShowCustomerInfo] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnterCustomerInfoDropDown = () => setShowCustomerInfo(true);
  const handleMouseLeaveCustomerInfoDropDown = () => setShowCustomerInfo(false);

  const handleMouseEnterSupportDropDown = () => setShowSupport(true);
  const handleMouseLeaveSupportDropDown = () => setShowSupport(false);

  const [location1, setLocation1] = useState("");
  const [location2, setLocation2] = useState("");

  useEffect(() => {
    setLocation1(location.pathname.split("/")[1]);
    setLocation2(location.pathname.split("/")[2]);
  }, []);

  const handleCustomerInfoClick = (event) => {
    event.preventDefault();
    navigate('/Manifest/Active');
    setLocation1("Manifest"); 
    setLocation2("Active");
  };

  const handleSupportClick = (event) => {
    event.preventDefault();
    navigate('/Support/CreateTicket'); 
    setLocation1("Support"); 
    setLocation2("");
  };

  const handleRouteDisplay = (event) => {
    event.preventDefault();
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'flexStart', 'marginLeft': '10px' }}
      >
        <p>LVIS</p>
        <p>{location1}</p>
        <p>{location2}</p>
      </div>
      <Container>
        <Navbar.Brand href="/home">LVIS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title={
                <span className="dropdown-title" onClick={handleCustomerInfoClick}>
                  Manifest
                </span>
              }
              id="basic-nav-dropdown"
              show={showCustomerInfo}
              onMouseEnter={handleMouseEnterCustomerInfoDropDown}
              onMouseLeave={handleMouseLeaveCustomerInfoDropDown}
            >
              <NavDropdown.Item as={Link} to="/Manifest/Active" onClick={() => { setLocation1("Manifest"); setLocation2("Active"); }}>Active</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Manifest/Assembly" onClick={() => { setLocation1("Manifest"); setLocation2("Assembly"); }}>In Progress</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Manifest/Prospects" onClick={() => { setLocation1("Manifest"); setLocation2("Prospects"); }}>Prospects</NavDropdown.Item>
              {/* <NavDropdown.Item as={Link} to="/Customer/Former">Former</NavDropdown.Item> */}
            </NavDropdown>
            <NavDropdown
              title={
                <span className="dropdown-title" onClick={handleSupportClick}>
                  Support
                </span>
              }
              id="basic-nav-dropdown"
              show={showSupport}
              onMouseEnter={handleMouseEnterSupportDropDown}
              onMouseLeave={handleMouseLeaveSupportDropDown}
            >
              <NavDropdown.Item as={Link} to="/Support/CreateTicket" onClick={() => { setLocation1("Tickets"); setLocation2("Creating Ticket"); }}>Open a Ticket</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Support/Tickets" onClick={() => { setLocation1("Tickets"); setLocation2(""); }}>View Tickets</NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link href="/Configuration">Configuration</Nav.Link> */}
            <Nav.Link href="/Configuration" onClick={() => { setLocation1("Configuration"); setLocation2(""); }}>Configuration</Nav.Link>
            <Nav.Link href="/Wiki" onClick={() => { setLocation1("Wiki"); setLocation2(""); }}>Product Wiki</Nav.Link>
            <Nav.Link href="/Inventory" onClick={() => { setLocation1("Inventory"); setLocation2(""); }}>Inventory</Nav.Link>
            <Nav.Link href="/Marketing" onClick={() => { setLocation1("Marketing"); setLocation2(""); }}>Marketing</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {/* <Form inline className="d-flex">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">
            <BsSearch />
          </Button>
        </Form> */}
      </Container>
    </Navbar>
  );
}

export default TopNav;