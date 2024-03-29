import React, { useState } from "react";
import Card from "../Card/Card";
import "./sidebar.css";
import { SideBarItem } from "./SideBarItem";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { logoutUser } from "../../api/apiServer";
import { selectName, SET_LOGIN } from "../../redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHome } from "react-icons/ai";
import Footer from "../Footer/Footer";

const Sidebar = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div
        className="sidebar_container"
        style={{ display: isOpen ? "initial" : "none" }}
      >
        <Card className="sidebar_card">
          <div className="sidebar_title">
            <h2>Kountit</h2>
          </div>
          <div className="sidebar_user">
            <FaUserCircle size={30} className="sidebar_user_icon" />
            <h2 className="sidebar_user_text">
              Welcome, &nbsp; <span className="sidebar_user_name">{name}</span>
            </h2>
          </div>
          <div className="sidebar_menu_items_container">
            <ul className="sidebar_menu_items">
              {SideBarItem.map((value, index) => (
                <Link
                  to={value.path}
                  style={{ textDecoration: "none" }}
                  key={index}
                >
                  <li
                    className="btn btn-lg btn-primary mb-4"
                    key={index}
                    id={window.location.pathname === value.path ? "active" : ""}
                  >
                    <div className="sidebar_items">
                      {value.icon}
                      <div className="sidebar_text">{value.title}</div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="logout_icon">
            <Link
              to="/logout"
              className="btn btn-lg btn-primary"
              onClick={logout}
            >
              <IoMdLogOut />
            </Link>
            <Link
              to="/"
              className="btn btn-lg btn-primary"
              style={{ marginLeft: "0.5rem" }}
            >
              <AiOutlineHome />
            </Link>
          </div>
        </Card>
      </div>
      <div id="hamburger_icon">
        <button
          className="btn btn-lg btn-primary"
          type="button"
          onClick={toggle}
        >
          <RxHamburgerMenu size={20} />
        </button>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
