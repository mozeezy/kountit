import React, { useState } from "react";
import Card from "../../Card/Card";
import classes from "./register.module.css";
import { CiHome } from "react-icons/ci";
import { FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkEmailFormat, registerUser } from "../../../api/apiServer";
import { useDispatch } from "react-redux";
import {
  SET_LOGIN,
  SET_USERNAME,
} from "../../../redux/features/user/userSlice";
import Loader from "../../Loader/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialState);

  const { name, email, password, confirmPassword } = user;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const register = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      return toast.error("Please fill in the required fields.");
    }

    if (!checkEmailFormat(email)) {
      return toast.error("Please enter a valid email.");
    }

    if (password.length < 8) {
      return toast.error("Your password is less than 8 characters long.");
    }

    if (password !== confirmPassword) {
      return toast.error("Both password fields do not match.");
    }

    const data = {
      name,
      email,
      password,
    };

    setLoading(true);
    try {
      const userData = await registerUser(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_USERNAME(userData.name));
      navigate("/dashboard");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${classes.register}`}>
      {loading ? (
        <Loader />
      ) : (
        <Card>
          <div className={classes.form}>
            <div className={classes.home}>
              <Link to="/">
                <CiHome size={20}></CiHome>
              </Link>
            </div>
            <div className={classes.icon}>
              <FiUserPlus size={40}></FiUserPlus>
            </div>
            <br />
            <h2>Register</h2>
            <br />
            <form onSubmit={register}>
              <input
                type="text"
                placeholder="👤 Name"
                name="name"
                value={name}
                onChange={handleOnChange}
              />
              <input
                type="email"
                placeholder=" 📧 E-mail address"
                name="email"
                value={email}
                onChange={handleOnChange}
              />
              <input
                type="password"
                placeholder="⦁⦁⦁ Password"
                name="password"
                value={password}
                onChange={handleOnChange}
              />
              <input
                type="password"
                placeholder="⦁⦁⦁ Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
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
      )}
    </div>
  );
};

export default Register;
