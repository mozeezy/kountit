import React from "react";
import "./home.css";
import { TbLetterK } from "react-icons/tb";
import { Link } from "react-router-dom";
import headerIMG from "../../assets/inventory_solution.jpeg";

function Home() {
  return (
    <div id="home">
      <nav className="nav-bar--container">
        <Link to="/">
          <div className="logo">
            <TbLetterK size={40} />
          </div>
        </Link>

        <ul className="container--links">
          <li className="register">
            <Link to="/register">Register</Link>
          </li>
          <li>
            <button className="btn login-btn">
              <Link to="/login">Login</Link>
            </button>
          </li>
        </ul>
      </nav>

      <section className="container landing">
        <div className="landing-container">
          <article className="landing-text">
            <h2>
              Welcome to Kountit - an Inventory and Stock Management Solution
            </h2>
            <br />
            <p>
              Kountit is the go-to warehouse inventory management solution. By
              reducing the steps in managing inventory, Kountit allows
              businesses of any size to keep accurate track of inventory and
              stock and scale your business. Improve efficiency and save money
              with real-time inventory updates.{" "}
            </p>
            <br />
            <button className="btn">
              <Link to="/register" className="started-txt">
                Get Started
              </Link>
            </button>
          </article>

          <article className="landing-image">
            <img
              src={headerIMG}
              alt="Kountit"
              className="container landing-image"
            />
          </article>
        </div>
      </section>
    </div>
  );
}

export default Home;
