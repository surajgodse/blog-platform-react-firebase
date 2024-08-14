import logo from './logo.svg';
import './App.css';
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
