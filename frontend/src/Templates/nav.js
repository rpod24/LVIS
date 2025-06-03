import React from "react";
import { NavLink } from "react-router-dom";
import pages from "../page.json";
import "./nav.css";          // keep if you added custom rules

const navItems =
  pages.nav ?? pages.pages.map((p) => ({ label: p.title, id: p.id }));

const TopNav = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid px-3">
      <span className="navbar-brand fw-bold">LVIS Utility</span>

      {/* nav links */}
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {navItems.map((item) => (
          <li className="nav-item mx-2" key={item.id ?? "home"}>
            <NavLink
              to={item.id ? `/page/${item.id}` : "/"}
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active fw-bold" : "")
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

export default TopNav;
