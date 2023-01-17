import React, { useState } from "react";
import Card from "../Card/Card";
import "./sidebar.css";
import { SideBarItem } from "./SideBarItem";
import { Link } from "react-router-dom";
import { CgWindows } from "react-icons/cg";
import NavDash from "../NavDash/NavDash";

const Sidebar = ({ children }) => {
  return (
    <div className="sidebar">
      <NavDash />
    </div>
  );
};

export default Sidebar;
