import React from "react";
import useRedirectLogout from "../../hooks/useRedirectLogout";
import Card from "../Card/Card";

const Dashboard = () => {
  useRedirectLogout("/login");
  return (
    <div className="dashboard">
      <Card>
        <h1>Dashboard</h1>
      </Card>
    </div>
  );
};

export default Dashboard;
