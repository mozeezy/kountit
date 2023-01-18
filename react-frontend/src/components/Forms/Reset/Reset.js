import React, { useState } from "react";
import Card from "../../Card/Card";
import classes from "../Login/login.module.css";
import { CiHome } from "react-icons/ci";
import { RxReset } from "react-icons/rx";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../../api/apiServer";

const initialState = {
  password: "",
  newPassword: "",
};

const Reset = () => {
  const [user, setUser] = useState(initialState);

  const { password, newPassword } = user;

  const { resetToken } = useParams();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const sendReset = async (event) => {
    event.preventDefault();

    if (!password || !newPassword) {
      return toast.error("Please fill in the missing fields.");
    }

    if (password.length < 8) {
      return toast.error(
        "Your password is less than 8 characters long. Please consider a longer password."
      );
    }

    if (password != newPassword) {
      return toast.error("Your passwords do not match. Please try again.");
    }

    const data = {
      password,
      newPassword,
    };

    try {
      const userData = await resetPassword(data, resetToken);
      toast.success(userData.message);
    } catch (error) {
      toast.error(error);
    }
  };

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
          <form onSubmit={sendReset}>
            <input
              type="password"
              placeholder="⦁⦁⦁ New Password"
              name="password"
              value={password}
              onChange={handleOnChange}
            />
            <input
              type="password"
              placeholder="⦁⦁⦁ Confirm New Password"
              name="newPassword"
              value={newPassword}
              onChange={handleOnChange}
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
