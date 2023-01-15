import React from "react";
import Card from "../Card/Card";
import "./sidebar.css";
import { SideBarItem } from "./SideBarItem";
import { Link } from "react-router-dom";
import { CgWindows } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";

const Sidebar = ({ children }) => {
  return (
    <div className="sidebar">
      <Card className="sidebar_card">
        <h1>Kountit</h1>
        <div className="user_profile_container">
          <CgWindows size={35} className="user_icon" />
          <h3>Mohamed Mohamed</h3>
          <p style={{ color: "silver" }}>ID: 12345</p>
        </div>
        <ul className="sidebar_list">
          {SideBarItem.map((value, key) => {
            return (
              <Link to={value.path}>
                <li
                  key={key}
                  className="sidebar_item"
                  id={window.location.pathname === value.path ? "active" : ""}
                >
                  <div id="sidebar_icon">{value.icon}</div>
                  <div>{value.title}</div>
                </li>
              </Link>
            );
          })}
        </ul>
        <div id="logout">
          <button>
            <Link to="/">
              <IoMdLogOut size={20} />
            </Link>
          </button>
        </div>
      </Card>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
