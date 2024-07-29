import TopNav from "./Components/Navbar/Navbar";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Former from './Pages/Customer/former';
import Prospects from './Pages/Customer/prospects';
import NewTicket from './Pages/Support/new_ticket';
import ViewTickets from './Pages/Support/view_tickets';
import Ticket from './Pages/Support/view_ticket';
import Wiki from './Pages/Wiki/Wiki';
import Inventory from "./Pages/Inventory/inventory";
import Admin from "./Pages/admin";
import Login from "./Pages";
import Home from "./Pages/home";
import ViewFacilities from "./Pages/Facility/facility_list";
import Facility from "./Pages/Facility/facility";
import './App.css';
import Active from "./Pages/Customer/active";
import NewManifest from "./Pages/Customer/newManifest";
import WikiProduct from "./Pages/Wiki/WikiProduct";
import NewWikiProduct from "./Pages/Wiki/NewWikiProduct";
import Assembly from "./Pages/Customer/assembly";
import ManifestProspect from "./Pages/Customer/manifest/manifest_prospect";
import ManifestAssembly from "./Pages/Customer/manifest/manifest_assembly";
import ManifestActive from "./Pages/Customer/manifest/manifest_active";

const App = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  return (
    <div className="App">
      {/* <Helmet> */}

        {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
      {/* </Helmet> */}
      {!isHomeRoute && <TopNav />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Manifest/Active" element={<Active />} />
        <Route path="/Manifest/Active/:id" element={<ManifestActive />} />
        <Route path="/Manifest/Assembly" element={<Assembly />} />
        <Route path="/Manifest/Assembly/:id" element={<ManifestAssembly />} />
        <Route path="/Manifest/Prospects" element={<Prospects />} />
        <Route path="/Manifest/Prospects/:id" element={<ManifestProspect />} />
        <Route path="/Manifest/Former" element={<Former />} />
        <Route path="/Manifest/New" element={<NewManifest />} />

        <Route path="/Support/CreateTicket" element={<NewTicket />} />
        <Route path="/Support/Ticket/:id" element={<Ticket />} />
        <Route path="/Support/Tickets" element={<ViewTickets />} />

        <Route path="/Configuration" element={<ViewFacilities />} />
        <Route path="/Wiki" element={<Wiki />} />
        <Route path="/Wiki/New" element={<NewWikiProduct />} />
        <Route path="/Wiki/:id" element={<WikiProduct />} />

        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Configuration" element={<ViewFacilities />} />
        <Route path="/Configuration/:id" element={<Facility />} />
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
