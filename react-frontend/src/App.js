import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Forms/Register/Register";
import Login from "./components/Forms/Login/Login";
import Forgot from "./components/Forms/Forgot/Forgot";
import Reset from "./components/Forms/Reset/Reset";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import AddProduct from "./components/addProduct/AddProduct";
import Profile from "./components/Profile/Profile";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader/Loader";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkLoginStatus } from "../src/api/apiServer";
import { SET_LOGIN } from "./redux/features/user/userSlice";
import ProductDetails from "./components/Product/ProductDetails";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function isUserLoggedIn() {
      const result = await checkLoginStatus();
      console.log(result);
      dispatch(SET_LOGIN(result));
    }
    isUserLoggedIn();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Dashboard />
            </Sidebar>
          }
        />
        <Route
          path="/add-product"
          element={
            <Sidebar>
              <AddProduct />
            </Sidebar>
          }
        />

        <Route
          path="/profile"
          element={
            <Sidebar>
              <Profile />
            </Sidebar>
          }
        />
        <Route
          path="/product-details/:id"
          element={
            <Sidebar>
              <ProductDetails />
            </Sidebar>
          }
        />
        <Route path="/loader" element={<Loader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
