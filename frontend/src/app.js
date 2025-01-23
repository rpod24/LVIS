import TopNav from "./Components/Navbar/Navbar";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <Helmet>
        <title>React App</title>
      </Helmet>
      <TopNav />
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
