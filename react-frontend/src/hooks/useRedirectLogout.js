import { useEffect } from "react";
import { SET_LOGIN } from "../redux/features/user/userSlice";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { checkLoginStatus } from "../api/apiServer";
import { toast } from "react-toastify";

const useRedirectLogout = (url) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectUser = async () => {
      // This returns a boolean to determine whether the user is logged in (true) or not(false)
      const isUserLoggedIn = await checkLoginStatus();
      dispatch(SET_LOGIN(isUserLoggedIn));

      if (!isUserLoggedIn) {
        toast.info("This session has expired. Please login to continue.");
        navigate(url);
        return;
      }
    };
    redirectUser();
  }, [dispatch, navigate, url]);
};

export default useRedirectLogout;
