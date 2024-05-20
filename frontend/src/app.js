import TopNav from "./Components/Navbar/Navbar";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Current from './Pages/Customer/current';
import Former from './Pages/Customer/former';
import Prospects from './Pages/Customer/prospects';
import NewTicket from './Pages/Support/new_ticket';
import ViewTickets from './Pages/Support/view_tickets';
import Wiki from './Pages/wiki';
import Inventory from "./Pages/Inventory/inventory";
import Admin from "./Pages/admin";
import Configuration from "./Pages/configuration";
import Front from "./Pages";
import Home from "./Pages/home";
import './App.css';

const App = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  return (
    <div className="App">
      {!isHomeRoute && <TopNav />}
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Customer/Current" element={<Current />} />
        <Route path="/Customer/Prospects" element={<Prospects />} />
        <Route path="/Customer/Former" element={<Former />} />
        <Route path="/Support/CreateTicket" element={<NewTicket />} />
        <Route path="/Support/Tickets" element={<ViewTickets />} />
        <Route path="/Configuration" element={<Configuration />} />
        <Route path="/Wiki" element={<Wiki />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Admin" element={<Admin />} />
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
