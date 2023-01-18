import React, { useState } from "react";
import Card from "../../Card/Card";
import classes from "./login.module.css";
import { CiLogin, CiHome } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { checkEmailFormat, loginUser } from "../../../api/apiServer";
import Loader from "../../Loader/Loader";
import {
  SET_LOGIN,
  SET_USERNAME,
} from "../../../redux/features/user/userSlice";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialState);

  const { email, password } = user;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill in the required fields.");
    }

    if (!checkEmailFormat(email)) {
      return toast.error("Please enter a valid email.");
    }
    const data = {
      email,
      password,
    };

    setLoading(true);

    try {
      const userData = await loginUser(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_USERNAME(userData.name));
      navigate("/dashboard");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${classes.login}`}>
      {loading ? (
        <Loader />
      ) : (
        <Card>
          <div className={classes.form}>
            <div className={classes.home}>
              <Link to="/">
                <CiHome size={25}></CiHome>
              </Link>
            </div>
            <div className={classes.icon}>
              <CiLogin size={40}></CiLogin>
            </div>
            <br />
            <h2>Login</h2>
            <br />
            <form onSubmit={login}>
              <input
                type="email"
                placeholder="📧 E-mail address"
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
              <button type="submit" className="btn btn-outline-info">
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
      )}
    </div>
  );
};

export default Login;
