import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Forms/Register/Register";
import Login from "./components/Forms/Login/Login";
import Forgot from "./components/Forms/Forgot/Forgot";
import Reset from "./components/Forms/Reset/Reset";
import Sidebar from "./components/Sidebar/Sidebar";
import Body from "./components/Body/Body";
import MainDashboard from "./components/mainDashboard/MainDashboard";

function App() {
  return (
    <BrowserRouter>
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
              <Body>
                <MainDashboard />
              </Body>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
