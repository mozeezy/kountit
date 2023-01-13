import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Forms/Register/Register";
import Login from "./components/Forms/Login/Login";
import Forgot from "./components/Forms/Forgot/Forgot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
