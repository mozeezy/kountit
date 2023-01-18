import React, { useState } from "react";
import Card from "../../Card/Card";
import classes from "../Login/login.module.css";
import { CiHome } from "react-icons/ci";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { checkEmailFormat, forgotPassword } from "../../../api/apiServer";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (event) => {
    setEmail(event.target.value);
  };

  const forgotPass = async (event) => {
    event.preventDefault();
    if (!email) {
      return toast.error("Please fill in the required fields");
    }
    if (!checkEmailFormat(email)) {
      return toast.error("Please enter a valid email address.");
    }

    const data = {
      email,
    };

    try {
      await forgotPassword(data);
      setEmail("");
    } catch (error) {
      console.log(error);
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
            <MdPassword size={40}></MdPassword>
          </div>
          <br />
          <h2>Forgot Password Form</h2>
          <br />
          <form onSubmit={forgotPass}>
            <input
              type="email"
              placeholder="📧 E-mail address"
              name="email"
              value={email}
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

export default Forgot;
