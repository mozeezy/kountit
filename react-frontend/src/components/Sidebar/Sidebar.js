import React from "react";
import Card from "../Card/Card";
import "./sidebar.css";
import { TbLetterK } from "react-icons/tb";

const Sidebar = ({ children }) => {
  return (
    <div className="sidebar_container">
      <Card className="sidebar_container_item">
        <div className="dashboard_icon">
          <TbLetterK size={30} />
        </div>
        <h2>Kountit</h2>
      </Card>
      <main className="children_container">{children}</main>
    </div>
  );
};

export default Sidebar;
