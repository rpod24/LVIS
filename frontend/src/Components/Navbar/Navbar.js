import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';
// import { BsSearch } from 'react-icons/bs';

import './navbarStyle.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TopNav() {
  const [showCustomerInfo, setShowCustomerInfo] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnterCustomerInfoDropDown = () => setShowCustomerInfo(true);
  const handleMouseLeaveCustomerInfoDropDown = () => setShowCustomerInfo(false);

  const handleMouseEnterSupportDropDown = () => setShowSupport(true);
  const handleMouseLeaveSupportDropDown = () => setShowSupport(false);

  const handleCustomerInfoClick = (event) => {
    event.preventDefault();
    navigate('/Customer/Current');
  };

  const handleSupportClick = (event) => {
    event.preventDefault();
    navigate('/Support/CreateTicket');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">LVIS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title={
                <span className="dropdown-title" onClick={handleCustomerInfoClick}>
                  Customer Info
                </span>
              }
              id="basic-nav-dropdown"
              show={showCustomerInfo}
              onMouseEnter={handleMouseEnterCustomerInfoDropDown}
              onMouseLeave={handleMouseLeaveCustomerInfoDropDown}
              >
              <NavDropdown.Item as={Link} to="/Customer/Current">Current</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Customer/Prospects">Prospects</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Customer/Former">Former</NavDropdown.Item>
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
              <NavDropdown.Item as={Link} to="/Support/CreateTicket">Open a Ticket</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Support/Tickets">View Tickets</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/Configuration">Configuration</Nav.Link>
            <Nav.Link href="/Facilities">Facilities</Nav.Link>
            <Nav.Link href="/Wiki">Product Wiki</Nav.Link>
            <Nav.Link href="/Inventory">Inventory</Nav.Link>
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