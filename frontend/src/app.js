import TopNav from "./Components/Navbar/Navbar";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Current from './Pages/Customer/current';
import Former from './Pages/Customer/former';
import Prospects from './Pages/Customer/prospects';
import NewTicket from './Pages/Support/new_ticket';
import ViewTickets from './Pages/Support/view_tickets';
import Ticket from './Pages/Support/view_ticket';
import Wiki from './Pages/wiki';
import Inventory from "./Pages/Inventory/inventory";
import Admin from "./Pages/admin";
import Configuration from "./Pages/configuration";
import Login from "./Pages";
import Home from "./Pages/home";
import ViewFacilities from "./Pages/Facility/facility_list";
import Facility from "./Pages/Facility/facility";
import Prospect from "./Pages/Customer/prospect";
import './App.css';
import Currents from "./Pages/Customer/currents";
import NewProspect from "./Pages/Customer/newProspect";

const App = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  return (
    <div className="App">
      {!isHomeRoute && <TopNav />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Customer/Current" element={<Currents />} />
        <Route path="/Customer/Prospects" element={<Prospects />} />
        <Route path="/Customer/:id" element={<Prospect />} />
        <Route path="/Customer/Former" element={<Former />} />
        <Route path="/Customer/New" element={<NewProspect />} />
        <Route path="/Support/CreateTicket" element={<NewTicket />} />
        {/* <Route path="/view-ticket/:id" component={<ViewTicket />} /> */}
        <Route path="/Support/Ticket/:id" element={<Ticket />} />
        {/* <Route path="/view" component={<Ticket />} /> */}
        <Route path="/Support/Tickets" element={<ViewTickets />} />
        <Route path="/Configuration" element={<Configuration />} />
        <Route path="/Wiki" element={<Wiki />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Facilities" element={<ViewFacilities />} />
        <Route path="/Facility/:id" element={<Facility />} />
      </Routes>
    </div>
  );
};

const RootApp = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default RootApp;
