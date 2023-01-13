import React from "react";
import Card from "../../Card/Card";
import classes from "./login.module.css";
import { CiLogin, CiHome } from "react-icons/ci";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={`container ${classes.login}`}>
      <Card>
        <div className={classes.form}>
          <div className={classes.home}>
            <Link to="/">
              <CiHome size={25}></CiHome>
            </Link>
          </div>
          <div className={classes.login_icon}>
            <CiLogin size={40}></CiLogin>
          </div>
          <h2>Login</h2>
          <form>
            <input
              type="text"
              placeholder="E-mail address"
              required
              name="email"
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
          <br />
          <Link to="/forgotpassword" className="forgot-password">
            Forgot Password?
          </Link>
          <br />
          <span className="action-call">
            <p>Not a member? &nbsp;</p>
            <Link to="/register">Click here to create an account</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
