import React from "react";
import useRedirectLogout from "../../hooks/useRedirectLogout";
import Card from "../Card/Card";

const Profile = () => {
  useRedirectLogout("/login");
  return (
    <div>
      <Card>
        <h1>Profile</h1>
      </Card>
    </div>
  );
};

export default Profile;
