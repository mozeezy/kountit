import React from "react";
import classes from "./header.module.css";

const Header = () => {
  return (
    <div className={classes.header_container}>
      <h3 style={{ paddingRight: "1rem", marginTop: "1rem" }}>
        <span>Welcome, Mohamed </span>
      </h3>
      <button className={classes.btn}>Logout</button>
      <hr />
    </div>
  );
};

export default Header;
