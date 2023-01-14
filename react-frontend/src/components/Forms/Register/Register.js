import React from "react";
import Card from "../../Card/Card";
import classes from "./register.module.css";
import { CiHome } from "react-icons/ci";
import { FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className={`container ${classes.register}`}>
      <Card>
        <div className={classes.form}>
          <div className={classes.home}>
            <Link to="/">
              <CiHome size={25}></CiHome>
            </Link>
          </div>
          <div className={classes.register_icon}>
            <FiUserPlus size={40}></FiUserPlus>
          </div>
          <br />
          <h2>Register</h2>
          <br />
          <form>
            <input type="text" placeholder="👤 Name" required name="name" />
            <input
              type="email"
              placeholder=" 📧 E-mail address"
              required
              name="email"
            />
            <input
              type="password"
              placeholder="⦁⦁⦁ Password"
              required
              name="password"
            />
            <input
              type="password"
              placeholder="⦁⦁⦁ Confirm your password"
              required
              name="password"
            />
            <button type="submit" className={classes.btn}>
              Submit
            </button>
          </form>
          <br />
          <span className="action-call">
            <p>Already a member? &nbsp;</p>
            <Link to="/login">Click here to login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
