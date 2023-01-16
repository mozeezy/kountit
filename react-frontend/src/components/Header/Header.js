import React from "react";
import { Link } from "react-router-dom";
import headerIMG from "../../assets/inventory_solution.jpeg";
import "./header.css";

const Header = () => {
  return (
    <div id="main-section" className="section-padding linebreak">
      <div className="container">
        <div className="row align-items-center gy-2">
          <div className="col-lg-6">
            <img src={headerIMG} className="img-fluid" alt="kountit" />
          </div>
          <div className="col-lg-6">
            <h1 className="fw-bold display-6">
              Welcome to Kountit
              <br />
              <span className="text-info">
                {" "}
                Inventory and Stock Management Solution
              </span>
            </h1>
            <p>
              Kountit is the go-to warehouse inventory management solution. By
              reducing the steps in managing inventory, Kountit allows
              businesses of any size to keep accurate track of inventory and
              stock and scale your business. Improve efficiency and save money
              with real-time inventory updates.{" "}
            </p>
            <Link to="/dashboard" className="btn btn-outline-info">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
