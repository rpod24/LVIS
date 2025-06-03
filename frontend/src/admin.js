//Create a react component that will display the admin page, which will allow the admin to create other pages using templates and components.

import React from 'react';
import { Helmet } from "react-helmet";
import TopNav from "./Components/Navbar/Navbar";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      <Helmet>
        <title>Admin Page</title>
      </Helmet>
      <TopNav />
    </div>
  );
};

const RootAdmin = () => {
    return (
        <Router>
        <Admin />
        </Router>
    );
    };
export default RootAdmin;