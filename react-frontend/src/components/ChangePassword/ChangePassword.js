import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import classes from "../Forms/Register/register.module.css";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { toast } from "react-toastify";
import { changePassword } from "../../api/apiServer";

const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const [formData, setFormData] = useState(initialState);

  const { oldPassword, newPassword, confirmPassword } = formData;

  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitChangePassword = async (event) => {
    event.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("Please fill in the required fields.");
    }

    if (newPassword === oldPassword) {
      return toast.info(
        "The new password matches the old password that's already in use "
      );
    }

    if (newPassword.length < 8) {
      return toast.error("Your password is less than 8 characters long.");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Both password fields do not match.");
    }

    const data = {
      oldPassword,
      newPassword,
    };
    try {
      const response = await changePassword(data);
      toast.success(response);
      setFormData("");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <div className="change_pass_container">
        <div className={classes.form}>
          <div className={classes.icon}>
            {<CgArrowsExchangeAlt size={40} />}
          </div>
          <br />
          <h2>Change Password</h2>
          <br />
          <form onSubmit={submitChangePassword}>
            <input
              type="password"
              placeholder="⦁⦁⦁ Old Password"
              name="oldPassword"
              value={oldPassword}
              onChange={handleOnChange}
            />
            <input
              type="password"
              placeholder=" ⦁⦁⦁ New Password"
              name="newPassword"
              value={newPassword}
              onChange={handleOnChange}
            />
            <input
              type="password"
              placeholder="⦁⦁⦁ Confirm New Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
            />

            <button type="submit" className="btn btn-outline-info">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default ChangePassword;
