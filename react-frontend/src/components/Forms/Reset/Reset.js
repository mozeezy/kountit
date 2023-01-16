import React from "react";
import Card from "../../Card/Card";
import classes from "../Login/login.module.css";
import { CiHome } from "react-icons/ci";
import { RxReset } from "react-icons/rx";
import { Link } from "react-router-dom";

const Reset = () => {
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
            <RxReset size={40}></RxReset>
          </div>
          <br />
          <h2>Reset Password Form</h2>
          <br />
          <form>
            <input
              type="password"
              placeholder="⦁⦁⦁ New Password"
              required
              name="password"
            />
            <input
              type="password"
              placeholder="⦁⦁⦁ Confirm New Password"
              required
              name="newPassword"
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

export default Reset;
