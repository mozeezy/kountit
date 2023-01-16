import React from "react";
import Card from "../../Card/Card";
import classes from "../Login/login.module.css";
import { CiHome } from "react-icons/ci";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";

const Forgot = () => {
  return (
    <div className={`container ${classes.login}`}>
      <Card>
        <div className={classes.form}>
          <div className={classes.home}>
            <Link to="/">
              <CiHome size={25}></CiHome>
            </Link>
          </div>
          <div className={classes.icon}>
            <MdPassword size={40}></MdPassword>
          </div>
          <br />
          <h2>Forgot Password Form</h2>
          <br />
          <form>
            <input
              type="email"
              placeholder="📧 E-mail address"
              required
              name="email"
            />
            <button type="submit" className="btn btn-outline-info">
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

export default Forgot;
