import { Link } from "react-router-dom";
import "./home.css";
import headerIMG from "../../assets/inventory_solution.jpeg";

const Home = () => {
  return (
    <div>
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
              <li className="nav-item">
                <Link className="btn btn-outline-info me-3" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-info" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div id="main-section" className="section-padding">
        <div className="container">
          <div className="row align-items-center gy-4">
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
    </div>
  );
};

export default Home;
