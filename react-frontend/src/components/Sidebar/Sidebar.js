import React, { useState } from "react";
import Card from "../Card/Card";
import "./sidebar.css";
import { SideBarItem } from "./SideBarItem";
import { Link } from "react-router-dom";
import { CgWindows } from "react-icons/cg";

const Sidebar = ({ children }) => {
  return (
    <div className="sidebar">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 sm-1 mt-3 p-2">
            <Link to="/">
              <h3>Kountit</h3>
            </Link>
          </div>
        </div>
        <div className="col-lg-9 md-6 sm-11">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
