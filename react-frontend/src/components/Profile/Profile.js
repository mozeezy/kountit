import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../api/apiServer";
import useRedirectLogout from "../../hooks/useRedirectLogout";
import {
  SAVE_USERDATA,
  SET_USERNAME,
} from "../../redux/features/user/userSlice";
import Card from "../Card/Card";
import "./profile.css";

import { FaUserCircle } from "react-icons/fa";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const Profile = () => {
  useRedirectLogout("/login");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    async function getProfile() {
      const response = await getUserInfo();
      console.log(response);
      setProfile(response);
      setLoading(false);
      await dispatch(SAVE_USERDATA(response));
      await dispatch(SET_USERNAME(response.name));
    }
    getProfile();
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="profile_container">
          <Card className="profile_card">
            <FaUserCircle size={200} />
            <div className="fields_container">
              <span className="badge rounded-pill bg-info">
                UserID: {profile?._id}
              </span>
              <span className="badge rounded-pill bg-info">
                Name: {profile?.name}{" "}
              </span>
              <span className="badge rounded-pill bg-info">
                Email Address: {profile?.email}
              </span>
            </div>
            <Link to="/change-password" style={{ textDecoration: "none" }}>
              <button type="button" className="btn btn-info">
                Change Password
              </button>
            </Link>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Profile;
