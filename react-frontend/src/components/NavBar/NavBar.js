import React from "react";
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
            <h4 className="fw-bold">Kountit.</h4>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor03"
            aria-controls="navbarColor03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav ms-auto">
              <LoggedOut>
                <li className="nav-item">
                  <Link className="btn btn-outline-info me-3" to="/register">
                    Register
                  </Link>
                </li>
              </LoggedOut>
              <LoggedOut>
                <li className="nav-item">
                  <Link className="btn btn-info" to="/login">
                    Login
                  </Link>
                </li>
              </LoggedOut>
              <LoggedIn>
                <li className="nav-item">
                  <Link className="btn btn-info" to="/dashboard">
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
