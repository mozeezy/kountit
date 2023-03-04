import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { LoggedIn, LoggedOut } from "../Authorize/Authorize";

const NavBar = () => {
  return (
    <div>
      {" "}
      <nav
        className="navbar navbar-expand-lg p-4 m-3 fixed-top bg-light shadow"
        style={{ borderRadius: "80px" }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <h4 data-testid="navbar-text" className="fw-bold">Kountit.</h4>
          </Link>

          <div>
            <ul className="navbar-nav ms-auto d-flex flex-row">
              <LoggedOut>
                <li className="nav-item">
                  <Link
                    className="nav-link btn btn-outline-info me-3 p-4"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </LoggedOut>
              <LoggedOut>
                <li className="nav-item">
                  <Link className="nav-link btn btn-info p-4" to="/login">
                    Login
                  </Link>
                </li>
              </LoggedOut>
              <LoggedIn>
                <li className="nav-item">
                  <Link className="nav-link btn btn-info p-4" to="/dashboard">
                    View Dashboard
                  </Link>
                </li>
              </LoggedIn>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
